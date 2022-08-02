<script>
	import { openModal, modals } from 'svelte-modals';
	import Modal from '../DefinitionModal.svelte';

	export let definition;
	export let required;

	$: activeModal = $modals.length;

	function handleClick(paramType) {
		// console.log(paramType);
		if (paramType == 'ref')
			openModal(Modal, {
				ref: definition['$ref'].replace('#/components/schemas/', '').replace('#/definitions/', ''),
				modalsCount: activeModal,
				onOpenAnother: (ref1) => {
					handleClick(ref1);
				}
			});

		if (paramType == 'array')
			openModal(Modal, {
				ref: definition.items?.['$ref']
					.replace('#/components/schemas/', '')
					.replace('#/definitions/', ''),
				modalsCount: activeModal,
				onOpenAnother: (ref1) => {
					handleClick(ref1);
				}
			});

		if (paramType == 'enum') {
			openModal(Modal, {
				ref: `${definition.name}`,
				modalsCount: activeModal,
				onOpenAnother: (ref1) => {
					handleClick(ref1);
				}
			});
		}
	}
</script>

<parameter>
	<!-- Name -->
	<div class:required title={definition.name}>
		{definition.name ? definition.name : '-'}
		{#if required}
			<span>*</span>
		{/if}
	</div>

	<!-- Type -->
	<div>
		<div>
			{definition.schema?.type ? definition.schema.type : ''}
		</div>

		<div>
			{definition.type ? definition.type : ''}
		</div>

		<div class:definition={definition['$ref']} on:click={() => handleClick('ref')}>
			{definition['$ref']
				? definition['$ref'].replace('#/components/schemas/', '').replace('#/definitions/', '')
				: ''}
		</div>
	</div>

	<div>
		{#if definition.schema?.format}
			{definition.schema?.format}
		{/if}

		{#if definition.schema?.enum}
			<span class="definition">enum</span>
		{/if}

		{#if definition.schema?.['$ref']}
			<span
				class="definition"
				on:click={() => handleClick('ref')}
				title={definition.schema['$ref']
					.replace('#/components/schemas/', '')
					.replace('#/definitions/', '')}
				>{definition.schema['$ref']
					.replace('#/components/schemas/', '')
					.replace('#/definitions/', '')}</span
			>
		{/if}

		<!-- {#if definition['$ref']}
			<span class="definition" on:click={() => handleClick('ref')}
				>{definition['$ref'].replace('#/components/schemas/', '')}</span
			>
		{/if} -->

		{#if definition.type == 'array'}
			{#if definition.items?.['$ref']}
				<span
					class="definition"
					on:click={() => handleClick('array')}
					title={definition.items?.['$ref']
						.replace('#/components/schemas/', '')
						.replace('#/definitions/', '')}
				>
					{definition.items?.['$ref']
						.replace('#/components/schemas/', '')
						.replace('#/definitions/', '')}
				</span>
			{/if}

			{#if definition.type && !definition.items?.['$ref']}
				{definition.items.type}
			{/if}
		{/if}
	</div>

	<div class="description" title={definition.description}>
		<!-- <div class="text"> -->
		{definition.description ? definition.description : ''}
		<!-- </div> -->
	</div>
</parameter>

<style>
	parameter {
		display: grid;
		grid-template-columns: 2fr 2fr 2fr 4fr;
		height: 30px;
		padding: 5px;
		/* gap: 20px; */
	}

	/* parameter > div { */
	/* display: flex; */
	/* align-items: center; */
	/* } */

	parameter > div:nth-child(1) {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	parameter > div:nth-child(2) {
		font-style: italic;
		display: flex;
		justify-content: center;
		display: flex;
		align-items: center;
		/* font-size: 14px; */
		/* white-space: nowrap; */
		/* text-overflow: ellipsis; */
		/* overflow: hidden; */
	}

	parameter > div:nth-child(3) {
		/* white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-style: italic;
		display: inline-block !important; */
		/* display: flex; */
		/* justify-content: center; */
		font-style: italic;
		display: flex;
		justify-content: center;
		display: flex;
		align-items: center;
	}

	parameter:hover {
		background-color: #3563ae;
	}

	.required > span {
		color: red;
		font-weight: normal;
		font-size: 20px;
	}

	.required::after {
		color: rgba(255, 0, 0, 0.6);
		/* content: 'required'; */
		/* font-size: 10px; */
		/* padding-left: 1px; */
		/* position: relative; */
		/* top: -6px; */
		/* font-weight: normal; */
	}

	.definition {
		color: #00ff86;
		text-decoration: underline dotted;
		text-underline-position: under;
		cursor: pointer;
	}

	.description {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		/* display: flex; */
		/* align-items: center; */
	}
</style>
