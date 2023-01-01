import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		})
		// prerender: {
		// 	default: true,
		// 	crawl: true,
		// 	enabled: true
		// },
		// trailingSlash: 'always'
	}
};

export default config;
