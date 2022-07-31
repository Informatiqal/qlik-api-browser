<script>
	import Collapse from './Collapse.svelte';
	import Stability from './Stability.svelte';
	import PathParams from './Parameters/PathParams.svelte';
	import QueryParams from './Parameters/QueryParams.svelte';
	import BodyParams from './Parameters/BodyParams.svelte';
	import HeaderParams from './Parameters/HeaderParams.svelte';
	import Response from './Response.svelte';

	export let methodType;
	export let methodData;
	export let index;

	const isDeprecated = methodData['x-qlik-deprecated'] || methodData.deprecated ? true : false;

	const queryParameters = methodData.parameters
		? methodData.parameters
				.filter((p) => p.in == 'query')
				.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
		: [];
	const pathParameters = methodData.parameters
		? methodData.parameters
				.filter((p) => p.in == 'path')
				.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
		: [];

	const bodyParameters1 = methodData.parameters
		? methodData.parameters.filter((p) => p.in == 'body')
		: [];
	const bodyParameters2 = methodData.requestBody
		? methodData.requestBody.content['application/json']
		: [];

	const bodyParameters =
		bodyParameters1.length > 0 ? bodyParameters1 : bodyParameters2?.schema ? bodyParameters2 : [];

	// console.log(bodyParameters1, bodyParameters2, bodyParameters);
	// console.log(bodyParameters, bodyParameters2);

	const headerParameters = methodData.parameters
		? methodData.parameters
				.filter((p) => p.in == 'header')
				.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
		: [];

	let collapsed = index == 0 ? false : true;
</script>

<method class:border={!collapsed}>
	<general class={methodType}>
		<http-method
			>{methodType.toUpperCase()}
			{#if isDeprecated}
				(deprecated)
			{/if}
		</http-method>
		<Stability stabilityHeader={methodData['x-qlik-stability']} />
		<Collapse bind:collapsed />
	</general>

	{#if !collapsed}
		<!-- <content transition:slide={{ duration: 300 }}> -->
		<content>
			<description>
				{#if methodData.description}
					{methodData.description}
				{/if}

				{#if methodData.summary}
					{methodData.summary}
				{/if}

				{#if !methodData.description && !methodData.summary}
					No description found
				{/if}
			</description>

			<parameters>
				<parameters-header>
					<div>Parameters</div>
				</parameters-header>
				<parameters-content>
					{#if pathParameters.length > 0}
						<PathParams {pathParameters} />
					{/if}
					{#if queryParameters.length > 0}
						<QueryParams {queryParameters} />
					{/if}
					{#if bodyParameters.length > 0 || bodyParameters.schema}
						<BodyParams {bodyParameters} />
					{/if}
					{#if headerParameters.length > 0}
						<HeaderParams {headerParameters} />
					{/if}
				</parameters-content>
			</parameters>

			<responses>
				<responses-header>
					<div>Responses</div>
				</responses-header>
				<response>
					{#if Object.entries(methodData.responses).length > 0}
						{#each Object.entries(methodData.responses) as response}
							<Response {response} />
						{/each}
					{/if}
				</response>
			</responses>

			<!-- {#if queryParameters.length > 0 || urlParameters.length > 0 || bodyParameters}
				<parameters>
					<parameters-header>
						<div>Parameters</div>
					</parameters-header>
					<types>
						{#if urlParameters.length > 0}
							<url class="parameters-container">
								<div>Path</div>
								<div>
									{#each urlParameters as parameter}
										<Parameter {parameter} />
									{/each}
								</div>
							</url>
						{/if}
						{#if queryParameters.length > 0}
							<query class="parameters-container">
								<div class="title">Query</div>
								<div>
									{#each queryParameters as parameter}
										<Parameter {parameter} />
										<QueryParameters {parameter} />
									{/each}
								</div>
							</query>
						{/if}
						{#if methodType != 'get' && methodType != 'delete'}
							{#if bodyParameters}
								<request-body>
									<div>Body</div>
									<div>
										{#each bodyParameters as parameter}
											{#if bodyParameters.schema}
												<Parameter parameter={bodyParameters} />
											{/if}
										{/each}
									</div>
								</request-body>
							{/if}
						{/if}
					</types>
				</parameters>
			{/if} -->

			<!-- {#if Object.entries(methodData.responses).length > 0}
				<responses>
					<responses-header>
						<div>Responses</div>
					</responses-header>
					<response>
						<response-header>
							<div>Status</div>
							<div>Type</div>
							<div>Format</div>
						</response-header>
						{#each Object.entries(methodData.responses) as response}
							<Response {response} />
						{/each}
					</response>
				</responses>
			{/if} -->
		</content>
	{/if}
</method>

<style>
	method {
		display: grid;
		grid-template-rows: 60px auto;
	}

	general {
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 10px;
	}

	.experimental {
		color: red;
	}

	content {
		display: grid;
		grid-template-rows: auto auto;
		font-size: 14px;
		/* border-left: 1px solid; */
		/* border-right: 1px solid; */
		/* border-bottom: 1px solid; */
		/* border-color: #49cc90; */
		/* gap: 10px; */
	}

	.post {
		/* background-color: rgb(102, 217, 229); */
		background-color: #1c355e;
		color: rgb(102, 217, 229);
	}

	.get {
		background-color: #1c355e;
		/* background: linear-gradient(90deg, rgba(166, 226, 46, 1) 0%, rgba(255, 255, 255, 1) 100%); */
		/* color: black; */
		color: rgb(166, 226, 46);
	}

	.put {
		color: rgb(184, 138, 245);
		background-color: #1c355e;
		/* color: black; */
	}

	.delete {
		color: rgb(253, 108, 161);
		background-color: #1c355e;
		/* color: black; */
	}

	.patch {
		color: rgb(239, 143, 36);
		background-color: #1c355e;
	}

	.border {
		border: 3px solid #1c355e;
	}

	.deprecated {
		background-color: rgb(110, 110, 110);
		color: black;
	}

	http-method {
		display: flex;
		align-items: center;
		padding-left: 10px;
		font-size: 24px;
		font-weight: bold;
	}

	parameters {
		display: grid;
		grid-template-rows: 40px auto;
		/* gap: 10px; */
	}

	parameters-content {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		/* grid-template-columns: 1fr; */
		gap: 10px;
		grid-column: 1 / span 2;
		padding: 10px;
	}

	parameters-header {
		grid-row: 1;
		grid-column: 1 / span 2;
		font-size: 20px;
		background-color: #243939;
		display: flex;
		align-items: center;
	}

	parameters-header > div {
		padding-left: 10px;
	}

	/* url {
		flex-grow: 1;
	}

	url > div:first-of-type {
		border-bottom: 1px solid #353535;
	}

	query {
		flex-grow: 1;
	}

	query > div:first-of-type {
		border-bottom: 1px solid #353535;
	}

	request-body {
		flex-grow: 1;
	}

	request-body > div:first-of-type {
		border-bottom: 1px solid #353535;
	} */

	.parameters-container {
		display: grid;
		grid-template-rows: 20px auto;
	}

	responses {
		display: grid;
		grid-template-rows: 40px auto;
	}

	responses-header {
		font-size: 20px;
		background-color: #243939;
		display: flex;
		align-items: center;
	}

	responses-header > div {
		padding-left: 10px;
	}

	/* response {
		padding-left: 10px;
	}

	response-header {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #353535;
	}

	response-header > div {
		flex: 1;
	} */

	.title {
		font-weight: bold;
	}

	description {
		/* min-height: 30px; */
		padding: 10px;
	}
</style>
