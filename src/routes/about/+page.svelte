<script>
	import HomeSVG from '../../svg/Home.svelte';
</script>

<svelte:head>
	<title>Qlik API Browser - About</title>
</svelte:head>

<about>
	<about-header>
		<div><a href="/" title="Home"><HomeSVG /></a></div>
		<div>ABOUT</div>
	</about-header>
	<about-content>
		<about-general-info
			><code>Qlik Sense API browser</code> is not affiliated with Qlik</about-general-info
		>
		<about-sources>
			<about-sources-head>DATA SOURCES</about-sources-head>
			<ul>
				<li>
					<span>SaaS REST API</span>
					<br />
					<div>
						Data scrapping
						<a href="https://qlik.dev/apis/#rest" target="_blank" rel="noreferrer">qlik.dev</a>. The
						script and the raw data files can be found
						<a
							href="https://github.com/countnazgul/download-qlik-saas-api-definitions"
							title="GitHub Repo"
							target="_blank"
							rel="noreferrer">here</a
						>
					</div>
				</li>
				<li>
					<span>Engine JSON-RPC API</span>
					<br />
					<div>
						Data scrapping
						<a href="https://qlik.dev/apis/json-rpc/qix" target="_blank" rel="noreferrer"
							>qlik.dev</a
						>. The script and the raw data files can be found
						<a
							href="https://github.com/countnazgul/download-qlik-saas-api-definitions/tree/main/data"
							title="GitHub Repo"
							target="_blank"
							rel="noreferrer">here</a
						>
					</div>
				</li>
				<li>
					<span>Repository REST API</span>
					<br />
					<div>
						Sourced from Repository API itself by calling
						<code>/qrs/about/openapi/main</code> endpoint and its based on QSEoW
						<a
							href="https://github.com/countnazgul/download-qlik-saas-api-definitions/tree/main/data"
							target="_blank"
							title="GitHub Repo"
							rel="noreferrer">May 2022 Patch 11</a
						>
					</div>
				</li>
				<li>
					<span>Proxy REST API</span>
					<br />
					<div>
						Sourced from Proxy API itself by calling <code>/qps/about/about/openapi</code> endpoint
						and its based on QSEoW
						<a
							href="https://github.com/countnazgul/download-qlik-saas-api-definitions/tree/main/data"
							target="_blank"
							title="GitHub Repo"
							rel="noreferrer">May 2022 Patch 11</a
						>
					</div>
				</li>
			</ul>
		</about-sources>
		<about-contacts>
			<about-contacts-header>CONTACTS</about-contacts-header>

			<contacts-details>
				<div>Home Page</div>
				<div>
					<a href="https://informatiqal.com" target="_blank" rel="noreferrer"
						>https://informatiqal.com</a
					>
				</div>
				<div>Twitter</div>
				<div>
					<a href="https://twitter.com/informatiqal" target="_blank" rel="noreferrer"
						>@informatiqal</a
					>
				</div>
				<div>GitHub</div>
				<div>
					<a href="https://github.com/Informatiqal/" target="_blank" rel="noreferrer"
						>https://github.com/Informatiqal</a
					>
				</div>
				<div>Mail</div>
				<div>info (at) informatiqal (dot) com</div>
			</contacts-details>
		</about-contacts>
	</about-content>
</about>

<style>
	about {
		margin: 40px;
		height: 100%;
		display: grid;
		grid-template-rows: 100px auto;
		gap: 50px;
	}

	about-header {
		display: flex;
		border-bottom: 1px dashed;
	}

	about-header > div:nth-child(1) {
		width: 30px;
		cursor: pointer;
		align-items: center;
	}

	about-header > div:nth-child(2) {
		font-size: 4em;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		letter-spacing: 15px;
	}

	about-content {
		display: grid;
		grid-template-rows: max-content max-content max-content;
		gap: 30px;
	}

	about-general-info {
		font-size: 1.5em;
	}

	about-sources-head {
		font-size: 1.7em;
		color: #00ff86;
	}

	ul,
	li {
		list-style-type: none;
	}

	li {
		padding-bottom: 30px;
	}

	li > span:nth-child(1) {
		font-size: 1.4em;
	}

	li > div:nth-child(3) {
		padding-top: 10px;
		padding-left: 20px;
		font-size: 16px;
	}

	about-contacts-header {
		font-size: 1.7em;
		color: #00ff86;
	}

	contacts-details {
		padding-left: 40px;
		padding-top: 20px;
		display: grid;
		grid-template-columns: 100px auto;
		grid-template-rows: auto auto auto auto;
		gap: 10px;
	}

	code {
		color: #cdbfd8;
	}

	a {
		text-decoration: underline dotted;
		color: #00ff86;
	}
</style>
