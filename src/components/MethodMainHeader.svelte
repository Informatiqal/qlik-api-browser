<script>
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';

	import GithubSVG from '../svg/GitHub.svelte';
	import InfoSVG from '../svg/Info.svelte';
	import CommandSVG from '../svg/Command.svelte';
	import HomeSVG from '../svg/Home.svelte';

	const dispatch = createEventDispatcher();

	function openNinja() {
		dispatch('ninjaOpen', {});
	}

	function openNinjaWithArea(area) {
		area = area.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

		dispatch('ninjaOpen', { area });
	}

	let method = $page.params.method
		? `/${$page.params.method.replace(/_/g, '/').replace(/\(/g, '{').replace(/\)/g, '}')}`
		: '';

	// console.log(method);
</script>

<main-header>
	<div class="title">
		<div>
			<div class="home">
				<a href="/" title="Home"> <HomeSVG /></a>
			</div>
		</div>
		<div>
			{#if method}
				<div class="path">
					<div
						title="Show command palette. Or press Ctrl + K"
						on:click={openNinja}
						on:keydown={openNinja}
					>
						<CommandSVG />
					</div>
					<div>
						/{#if method.indexOf('.') > -1}
							<span
								class="method-area"
								on:click={() => openNinjaWithArea(method.split('.')[0].replace('/', ''))}
								on:keydown={() => openNinjaWithArea(method.split('.')[0].replace('/', ''))}
								>{method.replace('/', '').split('.')[0]}</span
							>.{method.split('.').splice(1).join('/')}
						{:else}
							<span
								class="method-area"
								on:click={() => openNinjaWithArea(method.split('/')[1])}
								on:keydown={() => openNinjaWithArea(method.split('/')[1])}
								>{method.split('/')[1]}</span
							>
							{#if method.split('/').splice(2).join('/')}
								/{method.split('/').splice(2).join('/')}
							{/if}
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<div title="About">
		<a href="/about" title="About">
			<InfoSVG />
		</a>
	</div>

	<div>
		<a
			aria-label="github"
			href="https://github.com/informatiqal/qlik-api-browser"
			title="Source code"
			target="_blank"
			rel="noreferrer"
		>
			<GithubSVG />
		</a>
	</div>
</main-header>

<style>
	.home {
		width: 30px;
	}

	main-header {
		display: grid;
		grid-template-columns: auto 30px 30px;
		gap: 15px;
		height: 80px;
	}

	.method-area {
		text-decoration: underline dotted #00ff86;
		text-underline-position: under;
		cursor: pointer;
	}

	.path {
		display: grid;
		grid-template-columns: 30px auto;
		gap: 10px;
	}

	.path > div:nth-child(1) {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		fill: #00ff86;
	}

	.title {
		display: flex;
	}

	.title > div:nth-child(1) {
		font-size: 1em;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
	}

	.title > div:nth-child(2) {
		font-size: 3em;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	main-header > div:nth-child(n + 2) {
		display: flex;
		align-content: center;
		align-items: center;
	}

	main-header > div:nth-child(2) {
		cursor: pointer;
	}
</style>
