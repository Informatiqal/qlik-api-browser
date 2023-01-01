<script>
	import { openModal, modals } from 'svelte-modals';
	import Modal from '../DefinitionModal.svelte';
	import EnumModal from '../EnumModal.svelte';

	export let definition;
	// console.log(definition);

	$: activeModal = $modals.length;

	function handleClick() {
		if (definition.schema?.['$ref']) {
			openModal(Modal, {
				ref: definition.schema['$ref']
					.replace('#/components/schemas/', '')
					.replace('#/definitions/', ''),
				modalsCount: activeModal
				// onOpenAnother: (ref1) => {
				// 	handleClick(ref1);
				// }
			});
		}

		if (definition.schema?.enum) {
			openModal(EnumModal, {
				ref: `${definition.name}`,
				definition: definition,
				modalsCount: activeModal
				// onOpenAnother: (ref1) => {
				// 	handleClick(ref1);
				// }
			});
		}

		if (definition.schema?.items?.enum) {
			openModal(EnumModal, {
				// ref: `${definition.name}`,
				definition: definition
				// modalsCount: activeModal
				// onOpenAnother: (ref1) => {
				// 	handleClick(ref1);
				// }
			});
		}

		if (definition.schema?.items?.['$ref']) {
			openModal(Modal, {
				ref: definition.schema.items['$ref']
					.replace('#/components/schemas/', '')
					.replace('#/definitions/', ''),
				modalsCount: activeModal
				// onOpenAnother: (ref1) => {
				// 	handleClick(ref1);
				// }
			});
		}
	}
</script>

<parameter>
	{#if definition.name}
		<div class:required={definition.required}>
			{definition.name ? definition.name : '-'}
			{#if definition.required}
				<span>*</span>
			{/if}
		</div>

		<div class="type">
			{definition.type ? definition.type : definition.schema?.type ? definition.schema.type : ''}
		</div>
	{/if}

	{#if definition.schema && definition.schema.type == 'object'}
		{#each Object.entries(definition.schema.properties) as def}
			<div class:required={definition.schema?.required.includes(def[0])}>
				{def[0]}
				{#if definition.schema?.required.includes(def[0])}
					<span>*</span>
				{/if}
			</div>

			<div class="type">
				{def[1].type}
			</div>
		{/each}
	{/if}

	<div
		on:click={() => handleClick()}
		on:keydown={() => handleClick()}
		class:definition={definition.schema?.['$ref'] ||
			definition.schema?.enum ||
			definition.schema?.items?.enum ||
			definition.schema?.items?.['$ref']}
	>
		{definition.schema?.format ? definition.schema.format : ''}
		{definition.schema?.enum ? 'enum' : ''}
		{definition.schema?.['$ref']
			? definition.schema['$ref'].replace('#/components/schemas/', '').replace('#/definitions/', '')
			: ''}
		{definition.schema?.type == 'array' && definition.schema?.items.enum
			? definition.schema?.items.type
			: ''}
		{definition.schema?.type == 'array' && definition.schema?.items['$ref']
			? definition.schema.items['$ref']
					.replace('#/components/schemas/', '')
					.replace('#/definitions/', '')
			: ''}
	</div>
</parameter>

<style>
	parameter {
		display: grid;
		grid-template-columns: 2fr 1fr 2fr;
		padding-top: 5px;
	}

	.required > span {
		color: red;
		font-weight: normal;
		font-size: 20px;
	}

	.type {
		font-style: italic;
	}

	/* .required::after { */
	/* color: rgba(255, 0, 0, 0.6); */
	/* content: 'required'; */
	/* font-size: 10px; */
	/* padding-left: 1px; */
	/* position: relative; */
	/* top: -6px; */
	/* font-weight: normal; */
	/* } */

	.definition {
		color: #00ff86;
		text-decoration: underline dotted;
		text-underline-position: under;
		cursor: pointer;
	}
</style>
