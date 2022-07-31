<script>
	import { Modals, closeModal, openModal } from 'svelte-modals';
	function handleKeyUp(ev) {
		console.log(ev);
	}
</script>

<Modals>
	<div on:keyup={handleKeyUp} slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<div>
	<slot />
</div>

<style>
	:global(body) {
		background-color: #262626;
		color: white;
		height: 100vh;
		padding: 0px;
		margin: 0px;
		overflow: hidden;
		font-family: Roboto, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	:global(body > div) {
		height: 100%;
		margin: 20px 40px 40px 10px;
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	div {
		height: 100%;
	}
</style>
