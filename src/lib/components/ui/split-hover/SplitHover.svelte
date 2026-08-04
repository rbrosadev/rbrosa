<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { SplitText as SplitTextType } from 'gsap/SplitText';

	import { ensureMotionCoreEase, registerPluginOnce } from '$lib/hooks/gsap';
	import { cn } from '$lib/utils';

	interface ComponentProps {
		children?: Snippet;
		class?: string;
		hoverTarget?: HTMLElement | null;
		[prop: string]: unknown;
	}

	let {
		children,
		class: className = '',
		hoverTarget = null,
		...restProps
	}: ComponentProps = $props();

	let gsap: typeof import('gsap').gsap | null = null;
	let SplitText: typeof SplitTextType | null = null;

	let ready = $state(false);

	onMount(async () => {
		const [{ gsap: gsapMod }, { SplitText: SplitTextMod }] = await Promise.all([
			import('gsap'),
			import('gsap/SplitText')
		]);

		gsap = gsapMod;
		SplitText = SplitTextMod;

		registerPluginOnce(SplitText);
		ensureMotionCoreEase();

		ready = true;
	});

	let wrapperRef: HTMLSpanElement | undefined;
	let originalSpan: HTMLSpanElement | undefined;
	let cloneSpan: HTMLSpanElement | undefined;

	let originalSplit: InstanceType<typeof SplitTextType> | null = null;
	let cloneSplit: InstanceType<typeof SplitTextType> | null = null;

	const attachWrapperRef = (node: HTMLSpanElement) => {
		wrapperRef = node;

		return () => {
			if (wrapperRef === node) wrapperRef = undefined;
		};
	};

	const attachOriginalSpan = (node: HTMLSpanElement) => {
		originalSpan = node;

		return () => {
			if (originalSpan === node) originalSpan = undefined;
		};
	};

	const attachCloneSpan = (node: HTMLSpanElement) => {
		cloneSpan = node;

		return () => {
			if (cloneSpan === node) cloneSpan = undefined;
		};
	};

	$effect(() => {
		if (!ready || !gsap || !SplitText) return;

		const node = hoverTarget ?? wrapperRef;

		if (!node || !originalSpan || !cloneSpan) return;

		const currentOriginalSpan = originalSpan;

		let timeline: ReturnType<typeof import('gsap').gsap.timeline> | null = null;

		const ctx = gsap.context(() => {
			originalSplit = SplitText!.create(currentOriginalSpan, {
				type: 'chars',
				charsClass: 'inline-block',

				onSplit: (self) => {
					const cloneNode = cloneSpan;

					if (!cloneNode) return;

					cloneSplit?.revert();

					cloneSplit = SplitText!.create(cloneNode, {
						type: 'chars',
						charsClass: 'inline-block'
					});

					gsap!.set(self.chars, {
						yPercent: 0
					});

					gsap!.set(cloneSplit.chars, {
						yPercent: 100
					});

					timeline?.kill();

					timeline = gsap!
						.timeline({
							paused: true
						})
						.to(
							self.chars,
							{
								yPercent: -100,
								stagger: 0.02,
								duration: 0.35,
								ease: 'motion-core-ease'
							},
							0
						)
						.to(
							cloneSplit.chars,
							{
								yPercent: 0,
								stagger: 0.02,
								duration: 0.35,
								ease: 'motion-core-ease'
							},
							0
						);

					return timeline;
				}
			});
		}, currentOriginalSpan);

		const handleEnter = () => timeline?.play();
		const handleLeave = () => timeline?.reverse();

		node.addEventListener('mouseenter', handleEnter);
		node.addEventListener('mouseleave', handleLeave);

		return () => {
			node.removeEventListener('mouseenter', handleEnter);
			node.removeEventListener('mouseleave', handleLeave);

			ctx.revert();

			originalSplit?.revert();
			cloneSplit?.revert();

			timeline?.kill();
		};
	});
</script>

<span
	{...restProps}
	class={cn(
		'font-inherit relative inline-flex overflow-hidden align-baseline leading-none text-inherit',
		className
	)}
	{@attach attachWrapperRef}
>
	<span {@attach attachOriginalSpan}>
		{@render children?.()}
	</span>

	<span {@attach attachCloneSpan} class="pointer-events-none absolute inset-0" aria-hidden="true">
		{@render children?.()}
	</span>
</span>
