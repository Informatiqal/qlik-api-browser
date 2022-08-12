<script>
	import RepositorySVG from '../svg/Repository.svelte';
	import SaaSSVG from '../svg/Cloud.svelte';
	import ProxySVG from '../svg/Proxy.svelte';
	import RestSVG from '../svg/Rest.svelte';
	import ConnectionSVG from '../svg/Connection.svelte';
	import InfoSVG from '../svg/Info.svelte';
</script>

<home>
	<div>
		<title>
			<div>Qlik Sense API browser</div>
			<div class="unoficial">Unofficial</div>
		</title>
		<about><a href="/about" title="About"><InfoSVG /></a></about>
	</div>
	<div>
		<apis>
			<a class="saas" href="/saas" title="SaaS REST API">
				<div class="name">
					<div>SaaS REST API</div>
					<div><SaaSSVG /></div>
				</div>
				<div>SaaS</div>
			</a>
			<a class="repository" href="/repository" title="Repository QSEoW REST API">
				<div class="name">
					<div>Repository REST API</div>
					<div><RepositorySVG /></div>
				</div>
				<div>QSEoW</div>
			</a>
			<a class="proxy" href="/proxy" title="Proxy QSEoW REST API">
				<div class="name">
					<span>Proxy REST API</span>
					<div><ProxySVG /></div>
				</div>
				<div>QSEoW</div>
			</a>
			<a class="disabled engine-json" href="/engine-json" title="Engine QSEoW REST API">
				<div class="name">
					<span>Engine JSON-RPC</span>
					<div><ConnectionSVG /></div>
				</div>
				<div>QSEoW / SaaS</div>
			</a>
			<a class="disabled engine-rest" href="/engine" title="Engine QSEoW REST API">
				<div class="name">
					<span>Engine REST API</span>
					<div class="rest-svg"><RestSVG /></div>
				</div>
				<div>QSEoW</div>
			</a>
			<!-- <a class="disabled" href="/engine-json" title="Engine QSEoW REST API">
			Nebula API<br />(TBA)
			<div>QSEoW</div>
		</a> -->
		</apis>
	</div>
</home>

<svelte:head>
	<title>Qlik API Browser</title>
</svelte:head>

<style>
	home {
		height: 100%;
		display: grid;
		grid-template-rows: 150px auto;
		gap: 100px;
	}

	home > div:nth-child(1) {
		display: flex;
	}

	about {
		width: 30px;
	}

	/* home > div:nth-child(1) { */
	title {
		flex: 1;
		display: grid;
		grid-template-rows: auto auto;
		/* display: flex; */
		/* align-items: center; */
		/* justify-content: center; */
		font-size: 3.5em;
		font-weight: bold;
		text-align: center;
	}

	title > div:nth-child(1) {
		display: flex;
		align-items: center;
		justify-content: center;
		/* font-size: 2.5em; */
		/* font-weight: bold; */
	}

	apis {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 70px;
		padding: 40px;
		margin-bottom: 10%;

		/* display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 50px; */

		/* grid-template-areas:
			'saas repository proxy'
			'engine-rest engine-json'; */
	}

	apis > a {
		/* flex: 1 1 10%; */
		width: 300px;
		height: 200px;
		background-color: #1c355e;
		align-items: center;
		justify-content: center;
		display: flex;
		text-align: center;
		flex-direction: column;
		text-decoration: none !important;
		color: #cdbfd8;
		position: relative;
		border-radius: 10px;
		-webkit-box-shadow: 12px 5px 22px -8px #0b1525;
		box-shadow: 12px 5px 22px -8px #0b1525;
		transition: all 0.2s ease-in-out;
	}

	apis > a:hover {
		transform: scale(1.1);
	}

	apis > a > div:nth-child(1) {
		font-size: 1.4em;
		font-weight: bold;
		width: 80%;
		height: 50%;
	}

	apis > a > div:nth-child(2) {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 12px;
	}

	.disabled {
		pointer-events: none;
		background-color: transparent;
		border: 1px dashed;
		box-shadow: none;
	}

	/* .disabled > div:nth-child(1) {
		height: 30%;
	} */

	.name {
		display: grid;
		grid-template-rows: auto 60px;
		gap: 30px;
	}

	.name > div:nth-child(2) {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	/* .soon {
		font-size: 14px;
		font-weight: normal;
	} */

	.unoficial {
		font-size: 0.5em;
		font-weight: normal;
		color: #cdbfd8;
	}

	/* .rest-svg:nth-child(1) {
		border: 1px solid red;
		border-radius: 50%;
	} */

	/* .saas {
		grid-area: saas;
	}


	.proxy {
		grid-area: proxy;
	}

	.engine-rest {
		grid-area: engine-rest;
	}

	.engine-json {
		grid-area: engine-json;
	} */
</style>
