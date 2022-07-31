<script>
	import { closeModal } from 'svelte-modals';
	import EnumInModal from './EnumInModal.svelte';

	export let isOpen;
	export let definition;
</script>

{#if isOpen}
	<div class="modal">
		<div class="modal__content">
			<definition>
				<header>
					<name>
						{definition.name}
					</name>
					<div class="modal__close" on:click={closeModal} title="Close">×</div>
				</header>

				{#if definition.schema.enum}
					<EnumInModal data={definition.schema} />
				{/if}
			</definition>
		</div>
	</div>
{/if}

<style>
	definition {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto auto;
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

	.modal__close {
		text-decoration: none;
		cursor: pointer;
		width: 25px;
		align-self: auto;
		font-size: 25px;
	}

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
		margin-top: 100px;
		margin-left: 0px;
		margin-right: 0px;
		max-height: 80%;
		overflow: auto;
		max-width: 90%;
		min-width: 50%;
	}
</style>
