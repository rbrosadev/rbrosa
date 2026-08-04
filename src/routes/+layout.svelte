<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import WebsiteShell from '$lib/components/layout/WebsiteShell.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<WebsiteShell>
	{@render children()}
</WebsiteShell>
