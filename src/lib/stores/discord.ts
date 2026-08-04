import { writable } from 'svelte/store';
import { PUBLIC_DISCORD_ID } from '$env/static/public';

import { connectLanyard, type DiscordPresence } from '$lib/services/lanyard';

export const discord = writable<DiscordPresence | null>(null);

connectLanyard(PUBLIC_DISCORD_ID, (data) => {
	discord.set(data);
});
