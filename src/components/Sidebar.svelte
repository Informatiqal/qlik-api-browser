<script>
	// import { page } from '$app/stores';

	import SaasSVG from '../svg/Cloud.svelte';
	import RepoSVG from '../svg/Repository.svelte';
	import ProxySVG from '../svg/Proxy.svelte';
	import EngineJsonSVG from '../svg/Connection.svelte';

	export let active;
</script>

<sidebar>
	<div class:active={active == 'saas'}>
		<a href="/saas" title="SaaS REST API">
			<SaasSVG />
		</a>
	</div>

	<div class:active={active == 'repository'}>
		<a class="padding1" href="/repository" title="Repository REST API">
			<RepoSVG />
		</a>
	</div>

	<div class:active={active == 'proxy'}>
		<a class="padding2" href="/proxy" title="Proxy REST API">
			<ProxySVG />
		</a>
	</div>

	<div class:active={active == 'engine-json'}>
		<a href="/engine-json" title="Engine JSON API">
			<EngineJsonSVG />
		</a>
	</div>
</sidebar>

<style>
	div {
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease-in-out;
	}

	a {
		width: 40px;
	}

	div:hover {
		transform: scale(1.1);
	}

	sidebar {
		display: grid;
		grid-template-rows: 60px 60px 60px;
		gap: 30px;
		height: 200px;
	}

	.active {
		/* background-color: #545e48; */
		background-color: #3f423b;
		border: 1px solid #00ff86;
		border-radius: 50%;
		/* -webkit-box-shadow: 12px 5px 22px -8px #0b1525; */
		/* box-shadow: 12px 5px 22px -8px #0b1525; */
	}

	.padding1 {
		padding-top: 4px;
		padding-left: 2px;
	}

	.padding2 {
		padding-top: 8px;
	}
</style>
