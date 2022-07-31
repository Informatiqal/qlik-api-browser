<script>
	import { openModal, modals } from 'svelte-modals';
	import Modal from './DefinitionModal.svelte';
	import EnumModal from './EnumModal.svelte';

	export let response;
	const status = response[0];
	const data = response[1];
	const content = data.content ? data.content[Object.keys(data.content)[0]] : undefined;

	// console.log(content.schema);

	// import Modal from '../DefinitionModal.svelte';
	// import { getDefinitionData } from '../../data';

	$: activeModal = $modals.length;

	function handleClick() {
		if (content.schema?.['$ref']) {
			openModal(Modal, {
				ref: content.schema['$ref']
					.replace('#/components/schemas/', '')
					.replace('#/definitions/', ''),
				modalsCount: activeModal,
				onOpenAnother: (ref1) => {
					handleClick(ref1);
				}
			});
		}

		if (content.schema?.enum) {
			openModal(EnumModal, {
				ref: `${content.name}`,
				definition: definition,
				modalsCount: activeModal,
				onOpenAnother: (ref1) => {
					handleClick(ref1);
				}
			});
		}
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
	<div title={data.description ? data.description : data.status}>
		{status}
		{#if data.description}
			&nbsp;{data.description}
		{/if}
	</div>

	<div>
		{#if content && content.schema}
			{#if content.schema && !content.schema['$ref']}
				{#if content.schema.type == 'array'}
					array[]
				{:else}
					{content.schema.type}
				{/if}
			{/if}

			{#if content.schema['$ref']}
				<span on:click={() => handleClick()} class="definition"
					>{content.schema['$ref']
						.replace('#/components/schemas/', '')
						.replace('#/definitions/', '')}</span
				>
			{/if}

			{#if !content.schema['$ref'] && !content.schema.type}
				-
			{/if}
		{:else}
			<div />
		{/if}
	</div>

	{#if data.content && content.schema}
		{#if content.schema && content.schema['$ref']}
			<!-- <div
				class="definition"
				on:click={() =>
					handleClick(getDefinitionData(content.schema['$ref']))}
			>
				{getDefinitionData(content.schema['$ref'])}
			</div> -->
		{/if}

		<!-- {#if data.schema && data.schema.type && data.schema.type == "array" && !data.schema["$ref"]}
        <div>
          {#if data.schema.items}
            <span
              on:click={() =>
                handleClick(getDefinitionData(data.schema.items["$ref"]))}
              class="definition"
            >
              {getDefinitionData(data.schema.items["$ref"])}
            </span>
          {:else}
            {data.schema.items.type}
          {/if}
        </div>
      {/if}
  
      {#if data.schema && data.schema.type && data.schema.type != "array" && data.schema["$ref"]}
        <div>
          <span class="definition">
            {data.schema.items.type}
          </span>
        </div>
      {/if}
  
      {#if data.schema && data.schema.type && data.schema.type != "array" && !data.schema["$ref"]}
        <div>
          <span>          
            {data.schema.format}
          </span>
        </div>
      {/if} -->
	{:else}
		<div />
	{/if}
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
