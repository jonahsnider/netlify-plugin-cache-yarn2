import type execa from 'execa';

interface NetlifyUtils {
	cache: {
		restore: (path: string, options?: Partial<{cwd: string}>) => Promise<boolean>;
		save: (path: string, options?: Partial<{digests: string[]; cwd: string; ttl: number}>) => Promise<boolean>;
	};
	run: typeof execa;
}

interface NetlifyInputs {
	/**
	 * Path to the Yarn lockfile.
	 * @default
	 * 'yarn.lock'
	 */
	yarn_lockfile_path: string;
}

interface NetlifyOpts {
	utils: NetlifyUtils;
	netlifyConfig: {build: {base: string}};
	inputs: NetlifyInputs;
}

/**
 * Get the cache folder Yarn is using.
 * @param utils - Netlify utils to use to run the script
 */
async function getCacheFolder(utils: NetlifyUtils): Promise<string> {
	return (await utils.run('yarn', ['config', 'get', 'cacheFolder'])).stdout;
}

module.exports = {
	// Restore file/directory cached in previous builds.
	// Does not do anything if:
	//  - the file/directory already exists locally
	//  - the file/directory has not been cached yet
	async onPreBuild({utils}: NetlifyOpts) {
		const cacheFolder = await getCacheFolder(utils);
		const success = await utils.cache.restore(cacheFolder);

		if (success) {
			console.log(`Restored ${cacheFolder}`);
		} else {
			console.log(`Couldn't restore ${cacheFolder}`);
		}
	},
	// Cache file/directory for future builds.
	// Does not do anything if:
	//  - the file/directory does not exist locally
	//  - the file/directory is already cached and its contents has not changed
	//    If this is a directory, this includes children's contents
	// Note that this will cache after the build, even if it fails, which fcould be unwanted behavior
	async onPostBuild({utils, inputs}: NetlifyOpts) {
		const cacheFolder = await getCacheFolder(utils);

		const success = await utils.cache.save(cacheFolder, {
			digests: [inputs.yarn_lockfile_path],
		});

		if (success) {
			console.log(`Saved ${cacheFolder}`);
		} else {
			console.log(`Couldn't save ${cacheFolder}`);
		}
	},
};
