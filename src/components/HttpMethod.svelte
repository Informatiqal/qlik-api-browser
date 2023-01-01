<script>
	import Collapse from './Collapse.svelte';
	import Stability from './Stability.svelte';
	import PathParams from './Parameters/PathParams.svelte';
	import QueryParams from './Parameters/QueryParams.svelte';
	import BodyParams from './Parameters/BodyParams.svelte';
	import EngineBodyParams from './Parameters/EngineBodyParams.svelte';
	import HeaderParams from './Parameters/HeaderParams.svelte';
	import Response from './Response.svelte';
	import ResponseEngineJson from './ResponseEngineJson.svelte';

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

	const engineParams = methodData.params?.length > 0 ? methodData.params : [];

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
					{#if engineParams.length > 0}
						<EngineBodyParams bodyParameters={engineParams} />
					{/if}
				</parameters-content>
			</parameters>

			<responses>
				<responses-header>
					<div>Responses</div>
				</responses-header>
				<response>
					{#if methodData.result}
						<ResponseEngineJson response={methodData.result} />
					{/if}

					{#if methodData.responses}
						{#if Object.entries(methodData.responses).length > 0}
							{#each Object.entries(methodData.responses) as response}
								<Response {response} />
							{/each}
						{/if}
					{/if}
				</response>
			</responses>
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
	}

	.post {
		background-color: #1c355e;
		color: rgb(102, 217, 229);
	}

	.get {
		background-color: #1c355e;
		color: rgb(166, 226, 46);
	}

	.WebSocket {
		background-color: #1c355e;
		color: rgb(166, 226, 46);
	}

	.put {
		color: rgb(184, 138, 245);
		background-color: #1c355e;
	}

	.delete {
		color: rgb(253, 108, 161);
		background-color: #1c355e;
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
	}

	parameters-content {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
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

	.title {
		font-weight: bold;
	}

	description {
		padding: 10px;
	}
</style>
