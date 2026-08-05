type LanyardEvent = {
	op: number;
	t?: string;
	d?: LanyardData;
};

type LanyardData = {
	discord_user: {
		id: string;
		username: string;
		discriminator: string;
		avatar: string | null;
	};

	discord_status: 'online' | 'idle' | 'dnd' | 'offline';

	activities: LanyardActivity[];

	spotify?: {
		timestamps?: {
			start: number;
			end: number;
		};

		song: string;

		artist: string;

		album: string;

		album_art_url: string;

		track_id: string;
	};
};

export type LanyardActivity = {
	name: string;

	type: number;

	application_id?: string;

	details?: string;

	state?: string;

	timestamps?: {
		start?: number;

		end?: number;
	};

	assets?: {
		large_image?: string;

		large_text?: string;

		small_image?: string;

		small_text?: string;
	};

	party?: {
		id?: string;

		size?: [number, number];
	};

	buttons?: string[];
};

export type DiscordPresence = {
	id: string;

	username: string;

	discriminator: string;

	avatar: string | null;

	status: 'online' | 'idle' | 'dnd' | 'offline';

	activities: LanyardActivity[];

	spotify?: {
		song: string;

		artist: string;

		album: string;

		image: string;

		start: number;

		end: number;

		trackId: string;
	};

	listeningToSpotify: boolean;
};

let socket: WebSocket | null = null;

export function connectLanyard(userId: string, callback: (data: DiscordPresence) => void) {
	if (socket) {
		return;
	}

	socket = new WebSocket('wss://api.lanyard.rest/socket');

	socket.onopen = () => {
		console.log('Lanyard connected');

		socket?.send(
			JSON.stringify({
				op: 2,

				d: {
					subscribe_to_id: userId
				}
			})
		);
	};

	socket.onmessage = (event) => {
		const message = JSON.parse(event.data) as LanyardEvent;

		if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
			if (message.d) {
				callback(parsePresence(message.d));
			}
		}
	};

	socket.onerror = (error) => {
		console.error('Lanyard error', error);
	};

	socket.onclose = () => {
		console.log('Lanyard disconnected');

		socket = null;

		setTimeout(() => {
			connectLanyard(userId, callback);
		}, 5000);
	};
}

function parsePresence(data: LanyardData): DiscordPresence {
	return {
		id: data.discord_user.id,

		username: data.discord_user.username,

		discriminator: data.discord_user.discriminator,

		avatar: data.discord_user.avatar,

		status: data.discord_status,

		activities: data.activities ?? [],

		listeningToSpotify: Boolean(data.spotify),

		spotify: data.spotify
			? {
					song: data.spotify.song,

					artist: data.spotify.artist,

					album: data.spotify.album,

					image: data.spotify.album_art_url,

					start: data.spotify.timestamps?.start ?? Date.now(),

					end: data.spotify.timestamps?.end ?? Date.now(),

					trackId: data.spotify.track_id
				}
			: undefined
	};
}
