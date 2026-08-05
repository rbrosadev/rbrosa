<script lang="ts">
	import { discord } from '$lib/stores/discord';
	import { fade } from 'svelte/transition';
	import vinylImg from '$lib/assets/vinyl.webp';
	import wood from '$lib/assets/woodgrain.png';
	import { ClockIcon } from 'phosphor-svelte';

	const spotify = $derived($discord?.spotify);
	const isSpotify = $derived(!!spotify);

	const activity = $derived($discord?.activities?.find((item) => item.type !== 2));

	function resolveDiscordImage(image?: string, applicationId?: string) {
		if (!image) return null;
		if (image.startsWith('mp:external/')) {
			const parts = image.split('/https/');
			return parts[1] ? `https://${parts[1]}` : null;
		}
		return applicationId
			? `https://cdn.discordapp.com/app-assets/${applicationId}/${image}.png`
			: null;
	}

	const activityImage = $derived(
		resolveDiscordImage(activity?.assets?.large_image, activity?.application_id)
	);

	const coverImage = $derived(spotify?.image ?? activityImage ?? null);

	const activityName = $derived(isSpotify ? spotify?.song : (activity?.name ?? 'Online'));

	// spotify: uma linha (artista). presences normais: details + state, cada um na sua linha
	const activityLine1 = $derived(isSpotify ? spotify?.artist : activity?.details);
	const activityLine2 = $derived(
		isSpotify ? null : (activity?.state ?? (!activity?.details ? $discord?.username : null))
	);

	let elapsed = $state('');

	$effect(() => {
		if (isSpotify || !activity?.timestamps?.start) {
			elapsed = '';
			return;
		}
		const start = activity.timestamps.start;
		const update = () => {
			const seconds = Math.floor((Date.now() - start) / 1000);
			const hours = Math.floor(seconds / 3600);
			const minutes = Math.floor((seconds % 3600) / 60);
			const secs = seconds % 60;
			elapsed =
				hours > 0
					? `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
					: `${minutes}:${String(secs).padStart(2, '0')}`;
		};
		update();
		const timer = setInterval(update, 1000);
		return () => clearInterval(timer);
	});

	let spotifyElapsed = $state(0);
	let spotifyDuration = $state(0);

	$effect(() => {
		if (!spotify?.start || !spotify?.end) {
			spotifyElapsed = 0;
			spotifyDuration = 0;
			return;
		}
		const update = () => {
			spotifyElapsed = Date.now() - spotify.start;
			spotifyDuration = spotify.end - spotify.start;
		};
		update();
		const timer = setInterval(update, 1000);
		return () => clearInterval(timer);
	});

	const spotifyProgress = $derived(
		spotifyDuration ? Math.min(100, (spotifyElapsed / spotifyDuration) * 100) : 0
	);

	function formatTime(ms: number) {
		const seconds = Math.floor(ms / 1000);
		return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
	}
</script>

{#if $discord}
	<section class="relative mt-14 w-full max-w-md">
		<div
			class="relative h-24 overflow-hidden rounded-lg border border-black/10 shadow-sm sm:h-28 md:h-32"
		>
			<div
				class="absolute inset-0 scale-110 bg-cover bg-center"
				style={`background-image:url(${wood})`}
			></div>

			<div
				class="absolute inset-0 bg-linear-to-r from-[#d6a56a]/80 via-[#c9924f]/60 to-black/20"
			></div>

			<div class="relative z-10 px-4 pt-4">
				<p class="max-w-[70%] truncate text-xs font-medium text-black sm:text-sm">
					{activityName}
				</p>

				{#if activityLine1}
					<p class="max-w-[70%] truncate text-xs text-black/60 sm:text-sm">
						{activityLine1}
					</p>
				{/if}

				{#if activityLine2}
					<p class="max-w-[70%] truncate text-xs text-black/60 sm:text-sm">
						{activityLine2}
					</p>
				{/if}

				{#if isSpotify && spotifyDuration}
					<div class="mt-2 max-w-[70%]">
						<div class="flex justify-between text-[10px] text-black/50">
							<span>{formatTime(spotifyElapsed)}</span>
							<span>{formatTime(spotifyDuration)}</span>
						</div>
						<div class="mt-1 h-1 rounded-full bg-black/20">
							<div
								class="h-full rounded-full bg-black/70 transition-all"
								style={`width:${spotifyProgress}%`}
							></div>
						</div>
					</div>
				{:else if elapsed}
					<div class="mt-1 flex items-center gap-1 text-xs text-black/50">
						<ClockIcon class="size-3" weight="regular" />
						<span>{elapsed}</span>
					</div>
				{/if}
			</div>
		</div>

		{#if isSpotify}
			<div
				class="absolute -top-2 -right-3 z-20 size-32 md:size-36"
				in:fade={{ duration: 300 }}
				out:fade={{ duration: 200 }}
			>
				<div class="animate-vinyl size-full">
					<img src={vinylImg} alt="Vinyl" class="size-full" />
					{#if coverImage}
						<img
							src={coverImage}
							alt={spotify?.song}
							class="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover md:size-24"
						/>
					{/if}
				</div>
			</div>
			{:else if coverImage}
				<div
					class="absolute top-2 right-2 z-20 size-14 overflow-hidden rounded-xl border border-black/10 bg-black/85 p-2 shadow-md sm:size-16 md:size-20"
					in:fade={{ duration: 300 }}
					out:fade={{ duration: 200 }}
				>
					<img src={coverImage} alt={activityName} class="size-full rounded-lg object-contain" />
				</div>
			{/if}
	</section>
{/if}
