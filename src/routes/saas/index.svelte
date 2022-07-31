<!-- <script context="module">
	import * as api from '$lib/apis';

	export const load = async ({ params, fetch }) => {
		const ninjaData = await api.ninjaData();

		return {
			props: {
				ninjaData
			}
		};
	};
</script> -->
<script>
	// import { onMount, tick } from 'svelte';
	// import { goto } from '$app/navigation';

	// import { NinjaKeys } from 'ninja-keys';

	// export let ninjaData;
	// let NinjaKeys;
	// let ninja;
	// let ninjaKeys;
	// let methodData = undefined;
	// let urlPath = '';

	// $: if (ninjaKeys) {
	// 	ninja = ninjaKeys;
	// }

	// onMount(async () => {
	// 	const n = await import('ninja-keys');
	// 	NinjaKeys = n.NinjaKeys;
	// 	await tick();

	// 	await tick();
	// 	ninja.data = ninjaData;
	// 	ninja.open();
	// });

	// // let transition = true;
	// function handleSelected(event) {
	// 	if (!event.detail.action.parent) {
	// 		methodData = {};
	// 		urlPath = '';
	// 		ninjaKeys.open({ parent: `${event.detail.action.id}` });
	// 	}

	// 	if (event.detail.action.parent) {
	// 		urlPath = event.detail.action.id;
	// 		// transition = true;
	// 		methodData = { ...event.detail.action.data };
	// 		console.log(methodData);
	// 		// transition = false;
	// 		ninjaKeys.close();
	// 		goto(`/saas/${urlPath.replace(/\//g, '_')}`);
	// 	}

	// 	return true;
	// }
</script>

<!-- on:change={() => (transition = true)} -->

<!-- <ninja-keys
	on:selected={handleSelected}
	bind:this={ninjaKeys}
	placeholder="Qlik Sense SaaS REST API"
/> -->

<main>
	<!-- <header>
		<url-path>{urlPath}</url-path>
		<menu>
			<div on:click={() => window.location.reload()} title="Home">
				<HomeSVG />
			</div>
			<div on:click={() => ninja.open()} title="Show Endpoints (Ctrl+K or CMD+K)">
				<MenuSVG />
			</div>
		</menu>
	</header> -->
	<methods>
		<!-- {#each Object.entries(methodData) as objectData, index}
			{#if objectData[0] != 'Area'}
				<Method
					methodData={objectData[1]}
					httpMethod={objectData[0]}
					description={objectData[1]['description']}
					{index}
				/>
			{/if}
		{/each} -->
	</methods>
</main>
