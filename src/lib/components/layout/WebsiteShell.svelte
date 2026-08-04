<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type WebsiteShellProps = {
		children: Snippet;
		class?: string;
	};

	let { children, class: className }: WebsiteShellProps = $props();
</script>

<div class="min-h-svh bg-background text-foreground">
	<main class={cn('mx-auto w-full max-w-xl px-4 py-10', 'sm:px-6 sm:py-16', 'lg:py-20', className)}>
		{@render children()}
	</main>
</div>
