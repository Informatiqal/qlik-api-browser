<script>
	import { openModal, modals } from 'svelte-modals';
	import Modal from './DefinitionModal.svelte';
	import EnumModal from './EnumModal.svelte';

	export let response;
	const status = '';
	const data = response.schema;
	const content = data.content ? data.content[Object.keys(data.content)[0]] : undefined;

	// console.log(response);

	// import Modal from '../DefinitionModal.svelte';
	// import { getDefinitionData } from '../../data';

	$: activeModal = $modals.length;

	function handleClick(ref) {
		// if (content.schema?.['$ref']) {
		// 	openModal(Modal, {
		// 		ref: content.schema['$ref']
		// 			.replace('#/components/schemas/', '')
		// 			.replace('#/definitions/', ''),
		// 		modalsCount: activeModal
		// 		// onOpenAnother: (ref1) => {
		// 		// 	handleClick(ref1);
		// 		// }
		// 	});
		// }

		// if (content.schema?.['$ref']) {
		openModal(Modal, {
			ref: ref.replace('#/components/schemas/', '').replace('#/definitions/', ''),
			modalsCount: activeModal
			// onOpenAnother: (ref1) => {
			// 	handleClick(ref1);
			// }
		});
		// }

		// if (content.schema?.enum) {
		// 	openModal(EnumModal, {
		// 		// ref: `${content.name}`,
		// 		definition: definition
		// 		// modalsCount: activeModal
		// 		// onOpenAnother: (ref1) => {
		// 		// 	handleClick(ref1);
		// 		// }
		// 	});
		// }
	}

	function handleClick1(ref) {
		openModal(Modal, {
			ref: ref,
			modalsCount: activeModal,
			onOpenAnother: (ref1) => {
				handleClick(ref1);
			}
		});
	}
</script>

<!-- <Modal bind:this={modal} /> -->

<response>
	{#if response.schema?.properties}
		{#each Object.entries(response.schema?.properties) as [key, value]}
			<div>{key}</div>
			<div>{value.type}</div>
			<div
				on:click={() => handleClick(value['$ref'])}
				on:keydown={() => handleClick(value['$ref'])}
				class:definition={value.schema?.['$ref'] ||
					value.schema?.enum ||
					value.schema?.items?.enum ||
					value.schema?.items?.['$ref'] ||
					value['$ref']}
			>
				{#if value['$ref']}
					{value['$ref'].replace('#/components/schemas/', '').replace('#/definitions/', '')}
				{/if}
			</div>
		{/each}
	{/if}
	<!-- <div title={response.name ? response.name : data.status}>
		{response.name}
		{#if data.description}
			&nbsp;{data.description}
		{/if}
	</div> -->

	<!-- <div>
		{#if response.schema}
			{#if response.schema && !response.schema['$ref']}
				{#if response.schema.type == 'array'}
					array[]
				{:else}
					{response.schema.type}
				{/if}
			{/if}

			{#if response.schema['$ref']}
				<span on:click={() => handleClick()} class="definition"
					>{response.schema['$ref']
						.replace('#/components/schemas/', '')
						.replace('#/definitions/', '')}</span
				>
			{/if}

			{#if !response.schema['$ref'] && !response.schema.type}
				-
			{/if}
		{:else}
			<div />
		{/if}
	</div> -->

	<!-- {#if data.content && content.schema}
		{#if content.schema && content.schema['$ref']}ref{/if}
	{:else}
		<div>asd </div>
	{/if} -->
</response>

<style>
	response {
		display: flex;
		flex-direction: row;
		padding: 10px 0px 10px 10px;
	}

	response > div:first-of-type {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	response > div {
		flex: 1;
		font-size: 1.12em;
	}

	.definition {
		color: #00ff86;
		text-decoration: underline dotted;
		text-underline-position: under;
		cursor: pointer;
	}
</style>
