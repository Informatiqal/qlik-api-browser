<script>
	import { page } from '$app/stores';
	import { closeModal, openModal } from 'svelte-modals';
	import { definitions } from '../OpenAPI/saas.json';
	import { definitions as repoDefinitions } from '../OpenAPI/repo.json';
	import { definitions as proxyDefinitions } from '../OpenAPI/proxy.json';
	import ParameterInModal from './Parameters/ParameterInModal.svelte';
	import EnumInModal from './EnumInModal.svelte';
	// import { openAPI } from '../openAPI_data';
	// import Enum from './Enum.svelte';
	// import EnumModal from './EnumModal.svelte';

	export let isOpen;
	export let ref;
	export let modalsCount;
	// export let onOpenAnother;

	let definition = {};
	let refName = '';

	let padding = `${100 + modalsCount * 10}px`;

	refName = ref;

	if ($page.routeId.split('/')[0] == 'saas') definition = definitions[ref];
	if ($page.routeId.split('/')[0] == 'repository') definition = repoDefinitions[ref];
	if ($page.routeId.split('/')[0] == 'proxy') definition = proxyDefinitions[ref];

	const sortOrder = definition.required ? definition.required : [];

	const properties = definition.properties
		? Object.fromEntries(
				Object.entries(definition.properties).sort((a, b) => {
					if (!sortOrder.includes(b[0])) return -1;
					if (!sortOrder.includes(a[0])) return 1;
					return sortOrder.indexOf(a[0]) - sortOrder.indexOf(b[0]);
				})
		  )
		: [];

	function handleKeyUp(ev) {
		// console.log('test');
	}

	// function handleEnumClick(definition) {
	// 	openModal(EnumModal, {
	// 		definition
	// 	});
	// }
</script>

{#if isOpen}
	<div class="modal" style="--modal-count:{padding};" on:keydown={handleKeyUp}>
		<div class="modal__content" on:keydown={handleKeyUp}>
			<definition>
				<header>
					<name>
						{refName} ({modalsCount + 1})
					</name>
					<div class="modal__close" on:click={closeModal} title="Close">×</div>
				</header>

				{#if definition.properties}
					<properties>
						<property>
							<div class="title">NAME</div>
							<div class="title">TYPE</div>
							<div class="title">FORMAT</div>
							<div class="title">DESCRIPTION</div>
						</property>
						{#each Object.entries(properties) as property}
							<ParameterInModal
								definition={{ name: property[0], ...property[1] }}
								required={sortOrder.indexOf(property[0]) > -1 ? true : false}
							/>
							<!-- <property>
								{#if definition.required}
									<div class:required={definition.required.indexOf(property[0]) > -1}>
										{property[0]}
										{#if definition.required.indexOf(property[0]) > -1}
											<span>*</span>
										{/if}
									</div>
								{:else}
									<div>
										{property[0]}
									</div>
								{/if}

								<div>
									{#if property[1].type == 'array'}
										array[]
									{:else if property[1].hasOwnProperty('enum')}

									{:else if property[1].type}
										{property[1].type}
									{:else}
										object
									{/if}
								</div>

								{#if property[1].format}
									<div>{property[1].format}</div>
								{/if}

								{#if property[1].items && !property[1].items['$ref']}
									<div>{property[1].items.type}</div>
								{/if}

								{#if property[1].items && property[1].items['$ref']}
									<div
										class="definition"
										on:click={() =>
											onOpenAnother(property[1].items['$ref'].replace('#/components/schemas/', ''))}
									>
										{property[1].items['$ref'].replace('#/components/schemas/', '')}
									</div>
								{/if}

								{#if !property[1].format && !property[1].items}
									{#if property[1]['$ref']}
										<div
											class="definition"
											on:click={() =>
												onOpenAnother(property[1]['$ref'].replace('#/components/schemas/', ''))}
										>
											{property[1]['$ref'].replace('#/components/schemas/', '')}
										</div>
									{:else}
										<div>-</div>
									{/if}
								{/if}

								{#if property[1].description}
									<div title={property[1].description} class="description">
										{property[1].description}
									</div>
								{:else}
									<div />
								{/if}
							</property> -->
						{/each}
					</properties>
				{/if}

				{#if definition.type == 'array'}
					<properties>
						<property>
							<div class="title">NAME</div>
							<div class="title">TYPE</div>
							<div class="title">FORMAT</div>
							<div class="title">DESCRIPTION</div>
						</property>
						<ParameterInModal definition={{ name: refName, ...definition }} />
					</properties>
				{/if}

				{#if definition.enum}
					<EnumInModal data={definition} />
				{/if}
			</definition>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: baseline;
		justify-content: center;
		background: rgba(77, 77, 77, 0.7);
		z-index: 100;
	}

	.modal__content {
		border-radius: 4px;
		position: relative;
		background: #fff;
		background-color: #262626;
		color: white;
		margin-top: var(--modal-count, '100px');
		margin-left: var(--modal-count, '0px');
		margin-right: var(--modal-count, '0px');
		max-height: 80%;
		overflow: auto;
		max-width: 90%;
		min-width: 50%;
		overflow: hidden;
	}

	.modal__close {
		text-decoration: none;
		cursor: pointer;
		width: 25px;
		align-self: auto;
		font-size: 25px;
	}

	definition {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto auto;
		height: 100%;
	}

	header {
		grid-column: 1;
		grid-row: 1;
		height: 40px;
		background-color: #3563ae;
		display: flex;
		flex-direction: row;
		font-weight: bold;
	}

	name {
		font-weight: bold;
		font-size: 20px;
		padding-left: 10px;
		flex-grow: 1;
		align-self: center;
		color: white;
	}

	properties {
		grid-column: 1;
		grid-row: 2;
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 5px;
		overflow: auto;
	}

	property {
		/* display: flex; */
		display: grid;
		grid-template-columns: 2fr 2fr 2fr 5fr;
	}

	property > div:first-of-type {
		padding-right: 10px;
	}

	property > div {
		flex: 1;
	}

	/* .required > span {
		color: red;
		font-weight: normal;
	} */

	/* .required {
		font-weight: bold;
	}

	.required::after {
		color: rgba(255, 0, 0, 0.6);
		content: 'required';
		font-size: 10px;
		padding-left: 1px;
		position: relative;
		top: -6px;
		font-weight: normal;
	}

	.definition {
		color: #00ff86;
		text-decoration: underline dotted;
		text-underline-position: under;
		cursor: pointer;
	} */

	.title {
		font-weight: bold;
	}

	properties property:first-of-type {
		border-bottom: 1px solid;
	}

	/* .description {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	} */
</style>
