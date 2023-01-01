<script>
	import { page } from '$app/stores';
	import { closeModal, openModal } from 'svelte-modals';
	import { definitions } from '../OpenAPI/saas.json';
	import { definitions as repoDefinitions } from '../OpenAPI/repo.json';
	import { definitions as proxyDefinitions } from '../OpenAPI/proxy.json';
	import { components as engineJsonDefinitions } from '../OpenAPI/engine-rpc.json';
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

	if ($page.route.id.split('/')[1] == 'saas') definition = definitions[ref];
	if ($page.route.id.split('/')[1] == 'repository') definition = repoDefinitions[ref];
	if ($page.route.id.split('/')[1] == 'proxy') definition = proxyDefinitions[ref];
	if ($page.route.id.split('/')[1] == 'engine-json')
		definition = engineJsonDefinitions.schemas[ref];

	// console.log(definition);

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
		if (ev.key == 'Escape') closeModal();
	}

	// function handleEnumClick(definition) {
	// 	openModal(EnumModal, {
	// 		definition
	// 	});
	// }
</script>

<svelte:window on:keydown={handleKeyUp} />

{#if isOpen}
	<div class="modal" style="--modal-count:{padding};" on:keydown={handleKeyUp}>
		<div class="modal__content">
			<definition>
				<header>
					<name>
						{refName} ({modalsCount + 1})
					</name>
					<div class="modal__close" on:click={closeModal} on:keydown={closeModal} title="Close">
						×
					</div>
				</header>

				{#if definition.properties}
					<properties>
						<properties-header>
							<div>
								<div class="title">NAME</div>
								<div class="title">TYPE</div>
								<div class="title">FORMAT</div>
								<div class="title">DESCRIPTION</div>
							</div>
						</properties-header>
						<properties-content>
							{#each Object.entries(properties) as property}
								<ParameterInModal
									definition={{ name: property[0], ...property[1] }}
									required={sortOrder.indexOf(property[0]) > -1 ? true : false}
								/>
							{/each}
						</properties-content>
					</properties>
				{/if}

				{#if definition.type == 'array'}
					<properties>
						<properties-header>
							<div>
								<div class="title">NAME</div>
								<div class="title">TYPE</div>
								<div class="title">FORMAT</div>
								<div class="title">DESCRIPTION</div>
							</div>
						</properties-header>
						<properties-content>
							<ParameterInModal definition={{ name: refName, ...definition }} required={false} />
						</properties-content>
					</properties>
				{/if}

				{#if definition.enum}
					<EnumInModal data={definition} />
				{/if}

				{#if definition.allOf}
					<properties>
						<properties-header>
							<div>
								<div class="title">NAME</div>
								<div class="title">TYPE</div>
								<div class="title">FORMAT</div>
								<div class="title">DESCRIPTION</div>
							</div>
						</properties-header>
						<properties-content>
							{#each definition.allOf as def}
								{#if def['$ref']}
									<ParameterInModal definition={{ name: def['$ref'].split('/').at(-1), ...def }} />
								{/if}

								{#if def.type && def.type == 'object'}
									{#each Object.entries(def.properties) as property}
										<ParameterInModal
											definition={{ name: property[0], ...property[1] }}
											required={sortOrder.indexOf(property[0]) > -1 ? true : false}
										/>
									{/each}
								{/if}
							{/each}
						</properties-content>
					</properties>
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
		overflow: hidden;
		max-width: 90%;
		min-width: 50%;
		overflow: hidden;
		height: 600px;
		overflow: hidden;
		/* height: 100%; */
		/* height: min-max(); */
		/* max-height: 80%; */
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
		grid-template-rows: 60px auto;
		height: 100%;
		overflow: hidden;
		height: 100%;
	}

	header {
		grid-column: 1;
		grid-row: 1;
		height: 60px;
		background-color: #3563ae;
		display: flex;
		flex-direction: row;
		font-weight: bold;
	}

	header > div {
		display: flex;
		align-items: center;
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
		gap: 15px;
		overflow: auto;
	}

	properties-header > div {
		/* display: flex; */
		display: grid;
		grid-template-columns: 2fr 2fr 2fr 4fr;
		letter-spacing: 5px;
		background-color: #2c6255;
		height: 40px;
	}

	properties-header > div > div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	properties-content {
		overflow: auto;
		display: grid;
		grid-template-rows: auto;
		/* gap: 10px; */
	}

	/* property > div:first-of-type {
		padding-right: 10px;
	}

	property > div {
		flex: 1;
	} */

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

	/* properties property:first-of-type {
		border-bottom: 1px solid;
	} */

	/* .description {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	} */
</style>
