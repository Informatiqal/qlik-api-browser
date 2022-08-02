<script>
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';

	import GithubSVG from '../svg/GitHub.svelte';
	// import InfoSVG from '../svg/Info.svelte';
	import CloudSVG from '../svg/Cloud.svelte';
	import RepositorySVG from '../svg/Repository.svelte';
	import ProxySVG from '../svg/Proxy.svelte';
	import MenuSVG from '../svg/Menu.svelte';
	import HomeSVG from '../svg/Home.svelte';

	// export let title;
	// export let ninja;

	// $: if (ninja) dispatch('ninjaOpen', { ninjaVisible: ninja.visible });

	const dispatch = createEventDispatcher();

	function openNinja() {
		dispatch('ninjaOpen', {});
	}

	let method = $page.params.method
		? `/${$page.params.method.replace(/_/g, '/').replace(/\(/g, '{').replace(/\)/g, '}')}`
		: '';
	// let apiArea = $page.routeId.split('/')[0];
</script>

<main-header>
	<div class="title">
		<div>
			<div class="home">
				<a href="/" title="Home"> <HomeSVG /></a>
			</div>
			<!-- {#if apiArea == 'saas'}
				<CloudSVG />
			{/if}

			{#if apiArea == 'repository'}
				<RepositorySVG />
			{/if}

			{#if apiArea == 'proxy'}
				<ProxySVG />
			{/if} -->
		</div>
		<div>{method}</div>
	</div>

	<div title="Show command palette. Or press Ctrl + K" on:click={openNinja}>
		<MenuSVG />
	</div>
	<!-- <div>
        <a href="/" title="Home"> <HomeSVG /></a>
    </div> -->

	<div>
		<a
			aria-label="github"
			href="https://github.com/informatiqal/qlik-api-browser"
			title="Source code"
			target="_blank"
		>
			<GithubSVG />
		</a>
	</div>
	<!-- <div on:click={() => dispatch('openInfo', {})} style="cursor: pointer;" title="About">
		<InfoSVG />
	</div> -->
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
		/* border-bottom: 1px solid; */
	}

	/* main-header > div:nth-child(1) { */
	/* display: flex; */
	/* justify-content: center; */
	/* font-weight: bold; */
	/* font-size: 3em; */
	/* } */

	.title {
		display: flex;
	}

	.title > div:nth-child(1) {
		font-size: 1em;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		/* height: 40px; */
	}

	.title > div:nth-child(2) {
		font-size: 3em;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		/* height: 3em; */
		/* text-align: center; */
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
