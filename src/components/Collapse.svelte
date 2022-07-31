<script>
	export let collapsed;
	const toggle = () => (collapsed = !collapsed);
</script>

<collapse on:click={toggle}>
	{#if collapsed}
		<!-- Arrow down -->
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><path
				stroke="white"
				fill="white"
				d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"
			/></svg
		>
	{/if}

	{#if !collapsed}
		<!-- Arrow up -->
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
				stroke="white"
				fill="white"
				d="M 17.418 14.908 C 17.69 15.176 18.127 15.176 18.397 14.908 C 18.667 14.64 18.668 14.207 18.397 13.939 L 10.489 6.109 C 10.219 5.841 9.782 5.841 9.51 6.109 L 1.602 13.939 C 1.332 14.207 1.332 14.64 1.602 14.908 C 1.873 15.176 2.311 15.176 2.581 14.908 L 10 7.767 L 17.418 14.908 Z"
			/>
		</svg>
	{/if}
</collapse>

<style>
	collapse {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		padding-right: 5px;
	}

	collapse > svg {
		color: white;
	}
</style>
