<script>
	import GithubSVG from '../../svg/GitHub.svelte';
	import InfoSVG from '../../svg/Info.svelte';
	import MenuSVG from '../../svg/Menu.svelte';
	import HomeSVG from '../../svg/Home.svelte';

	function openInfo() {}
</script>

<main-header>
	<div>
		<span>Qlik Engine REST API</span>
	</div>

	<div><a href="/" title="Home"> <HomeSVG /></a></div>
	<div><MenuSVG /></div>

	<div>
		<a
			aria-label="github"
			href="https://github.com/countnazgul/qlik-repo-browser"
			title="Source code"
		>
			<GithubSVG />
		</a>
	</div>
	<div on:click={openInfo} style="cursor: pointer;" title="About">
		<InfoSVG />
	</div>
</main-header>
<slot />

<style>
	main-header {
		display: grid;
		grid-template-columns: auto 20px 20px 20px 20px;
		gap: 15px;
		border-bottom: 1px solid;
	}

	main-header > div:nth-child(1) {
		display: flex;
		justify-content: center;
		font-weight: bold;
		font-size: 2.25em;
	}

	main-header > div:nth-child(n + 2) {
		display: flex;
		align-content: center;
		align-items: center;
	}
</style>
