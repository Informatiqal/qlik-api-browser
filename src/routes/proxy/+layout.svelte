<script>
	import { onMount, tick } from 'svelte';
	import { goto, beforeNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import Sidebar from '../../components/Sidebar.svelte';
	import MethodMainHeader from '../../components/MethodMainHeader.svelte';
	function openInfo() {}

	export let data;

	let ninjaData = data.ninjaData;
	let method = data.method;

	beforeNavigate(() => {
		loaded = false;
	});

	afterNavigate(() => {
		loaded = true;
	});

	let NinjaKeys;
	let ninja;
	let ninjaKeys;
	let methodData = undefined;
	let urlPath = '';
	let loaded = false;

	$: if (ninjaKeys) {
		ninja = ninjaKeys;
	}

	onMount(async () => {
		const n = await import('ninja-keys');
		NinjaKeys = n.NinjaKeys;
		await tick();
		ninja.data = ninjaData;

		// await tick();

		if (!method) ninja.open();
		if (method) loaded = true;
	});

	// $: console.log(ninjaKeys?.visible);

	// let transition = true;
	async function handleSelected(event) {
		if (!event.detail.action.parent) {
			methodData = {};
			urlPath = '';
			ninjaKeys.open({ parent: `${event.detail.action.id}` });
		}

		if (event.detail.action.parent) {
			urlPath = event.detail.action.id;
			// transition = true;
			methodData = { ...event.detail.action.data };
			// console.log(methodData);
			// transition = false;
			// console.log(urlPath.replace(/\//g, '_'));
			ninjaKeys.close();
			await tick();
			// console.log(encodeURI(urlPath));
			// invalidate();
			win.location = `/proxy/${urlPath.replace(/\//g, '_')}`;
			// goto(`/proxy/${urlPath.replace(/\//g, '_')}`, { replaceState: true });
			// window.href = `/saas/${urlPath.replace(/\//g, '_')}`;
		}

		return true;
	}

	function openNinja(ev) {
		if (ev.detail.area) {
			ninja.open({ parent: ev.detail.area });
		} else {
			ninja.open();
		}
	}
</script>

<svelte:head>
	<title>Proxy - Qlik API Browser</title>
</svelte:head>

<ninja-keys
	on:selected={handleSelected}
	bind:this={ninjaKeys}
	placeholder="Qlik Sense Proxy REST API"
/>

<!-- {#if ninja && !ninja.visible} -->
<!-- title={'Qlik Proxy REST API'}
{ninja} -->
<div class="test">
	<div class="header">
		{#if loaded != false}
			<MethodMainHeader on:ninjaOpen={openNinja} />
		{/if}
		<!-- {/if} -->
	</div>

	{#if $page.route.id == 'proxy'}
		<placeholder>
			<div>QSEoW <span class="area">Proxy</span> REST API browser!</div>
			<div>
				Activate the command palette with <code>Ctrl+K</code> /
				<code>Cmd+K</code> or click
				<span class="link" on:click={openNinja} on:keydown={openNinja}>HERE</span>
			</div>
		</placeholder>
	{/if}

	<!-- {#if $page.routeId == 'repository'} -->
	{#if $page.route.id != 'proxy' && loaded != false}
		<div class="slot">
			<slot />
		</div>
	{/if}

	<div class="sidebar">
		<Sidebar active={'proxy'} />
	</div>
</div>

<!-- {/if} -->
<style>
	.area {
		color: #00ff86;
		text-decoration: underline dotted;
	}

	.test {
		display: grid;
		grid-template-columns: 50px auto;
		grid-template-rows: 80px auto;
		height: 100%;
		overflow: hidden;
	}

	.header {
		grid-column: 1 / span 2;
		grid-row: 1;
	}

	.slot {
		grid-column: 2;
		grid-row: 2;
		height: 100%;
		overflow: hidden;
		margin-left: 20px;
	}

	.sidebar {
		grid-row: 2;
		grid-column: 1;
		margin-top: 10px;
	}

	placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		flex-direction: column;
		height: 50%;
		width: 100%;
		gap: 50px;
		grid-column: 2;
		grid-row: 2;
	}

	placeholder > div:nth-child(1) {
		font-size: 1.5em;
		font-weight: bold;
	}

	placeholder > div:nth-child(2) {
		text-align: center;
	}

	code {
		/* background-color: black; */
		border-radius: 10px;
		border: 1px solid;
		/* padding: 3px; */
	}

	.link {
		cursor: pointer;
		color: blue;
	}

	ninja-keys {
		--ninja-width: 900px;
		--ninja-modal-background: #262626;
		--ninja-selected-background: #059848;
		--ninja-text-color: #fff;
		--ninja-footer-background: #fff;
		--ninja-placeholder-color: #fff;
		--ninja-font-family: monospace;
	}
</style>
