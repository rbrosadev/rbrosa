<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import cursor from '$lib/assets/cursor.cur';
	import { discord } from '$lib/stores/discord';
</script>

<section class="flex flex-col gap-5">
	<Avatar.Root class="relative size-12 shrink-0 sm:size-14">
		{#if $discord?.avatar}
			<Avatar.Image
				src={`https://cdn.discordapp.com/avatars/${$discord.id}/${$discord.avatar}.png?size=128`}
				alt={$discord.username}
			/>
		{:else}
			<Avatar.Fallback>RB</Avatar.Fallback>
		{/if}

		{#if $discord}
			<span
				class={`
					absolute
					right-0
					bottom-0
					size-3.5
					rounded-full
					border-2
					border-background
					shadow-sm

					${
						$discord.status === 'online'
							? 'bg-emerald-500'
							: $discord.status === 'idle'
								? 'bg-amber-400'
								: $discord.status === 'dnd'
									? 'bg-red-500'
									: 'bg-zinc-500'
					}
				`}
			></span>
		{/if}
	</Avatar.Root>

	<div class="w-full max-w-md">
		<h1 class="font-serif text-xl leading-tight sm:text-2xl">Oi, eu sou o Ribeiro!</h1>

		<p class="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
			Gosto de tecnologia, programação e de criar coisas novas para a web.
		</p>

		<p class="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
			Nas horas vagas gosto de desenvolver projetos, jogar, assistir filmes e séries, principalmente
			de
			<span class="horror" style={`--cursor: url(${cursor})`}> TERROR </span>.
		</p>
	</div>
</section>
