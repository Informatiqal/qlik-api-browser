<script context="module">
	import * as api from '$lib/apis';

	export const load = async ({ params, fetch }) => {
		const ninjaData = await api.ninjaData('proxy');

		return {
			props: {
				ninjaData,
				method: params.method
			}
		};
	};
</script>

<script>
	import { onMount, tick } from 'svelte';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	import Sidebar from '../../components/Sidebar.svelte';
	import MethodMainHeader from '../../components/MethodMainHeader.svelte';
	function openInfo() {}

	export let ninjaData;
	export let method;

	// console.log(ninjaData, method);

	let NinjaKeys;
	let ninja;
	let ninjaKeys;
	let methodData = undefined;
	let urlPath = '';

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
		<MethodMainHeader on:ninjaOpen={ninja.open()} />
		<!-- {/if} -->
	</div>

	{#if $page.routeId == 'proxy'}
		<placeholder>
			<div>QSEoW <span class="area">Proxy</span> REST API browser!</div>
			<div>
				Activate the command palette with <code>Ctrl+K</code> /
				<code>Cmd+K</code> or click
				<span class="link" on:click={() => ninja.open()}>HERE</span>
			</div>
		</placeholder>
	{/if}

	<!-- {#if $page.routeId == 'repository'} -->
	{#if $page.routeId != 'proxy'}
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
