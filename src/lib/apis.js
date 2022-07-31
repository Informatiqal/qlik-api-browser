import * as saas from '../OpenAPI/saas.json';
import * as repo from '../OpenAPI/repo.json';
import * as proxy from '../OpenAPI/proxy.json';

function getMethodData(method, api) {
	if (api == 'saas') {
		const d = saas.paths[`/v1/${method}`];
		const d1 = saas.paths[`/${method}`];

		if (d) return d;
		if (d1) return d1;

		return undefined;
	}

	if (api == 'repo') return repo.paths[`/${method}`];
	if (api == 'proxy') return proxy.paths[`/${method}`];
}

export function get(method, api) {
	return {
		data: getMethodData(method, api)
	};
}

export async function methodsData(realMethodName, area) {
	const a = await get(realMethodName, area);

	if (a.data == undefined)
		return {
			status: 404,
			error: new Error(`Not found: ${realMethodName}`)
		};

	const sortOrder = ['get', 'post', 'put', 'delte', 'patch'];
	// const sortOrder = ['post', 'get', 'put', 'delte', 'patch'];

	const ordered = await Object.fromEntries(
		Object.entries(a.data).sort((a, b) => {
			if (!sortOrder.includes(a[0])) return 1;
			if (!sortOrder.includes(b[0])) return -1;
			return sortOrder.indexOf(a[0]) - sortOrder.indexOf(b[0]);
		})
	);

	return ordered;
}

export function ninjaData(api) {
	const areas = [];
	const areasList = new Set();
	const data = [];

	let apiData = [];
	if (api == 'saas') apiData = saas.paths;
	if (api == 'repo') apiData = repo.paths;
	if (api == 'proxy') apiData = proxy.paths;

	Object.entries(apiData).map(([key, value]) => {
		// temp.push(key.length);
		const area = key
			.replace('/v1', '')
			.split('/')[1]
			.replace('-', ' ')
			.split(' ')
			.map((word) => {
				// console.log(word);
				return word[0].toUpperCase() + word.substring(1);
			})
			.join(' ');
		apiData[key]['Area'] = area;

		areasList.add(area);
		areas.push({ area, value, path: key });
	});

	// console.log(Math.max(...temp));

	Array.from(areasList).map((area) => {
		let a = area.replace('/v1', '').replace('/', '');
		data.push({
			id: `${a}`,
			title: `${a} ...`
		});
	});

	Array.from(areasList).map((area) => {
		const localData = areas
			.filter((a) => a.area == area)
			.map((c) => {
				const methods = Object.keys(c.value);
				methods.pop();
				const methodsConcat = methods.join(', ').toUpperCase();

				// const emptySpace = "\u00A0".repeat(100 - c.path.length);
				// console.log(
				//   c.path,
				//   c.path.length,
				//   emptySpace.length,
				//   emptySpace.length + c.path.length
				// );

				// "".pa GET, PUT, POST, DELETE

				// console.log(c.path.padEnd(100, "\u00A0").length);

				data.push({
					id: `${c.path.replace('/v1', '').replace('/', '')}`,
					title: `${c.path
						.replace('/v1', '')
						.replace('/', '')
						.padEnd(95, '\u00A0')}${methodsConcat}`,
					parent: c.area.replace('/v1', '').replace('/', ''),
					data: { ...c.value }
					// icon: `<img src="images/get_post.png" alt="background image" class="ninja-icon"/>`,
				});
			});
	});

	return data;
}
