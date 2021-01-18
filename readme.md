# [Netlify Yarn 2 cache](https://app.netlify.com/plugins/netlify-plugin-cache-yarn2/install)

Save the Yarn 2 cache folder between Netlify builds.

[![add to netlify](https://img.shields.io/badge/add%20to-netlify-00AD9F)](https://app.netlify.com/plugins/netlify-plugin-cache-yarn2/install)
[![npm](https://img.shields.io/npm/v/netlify-plugin-cache-yarn2)](https://www.npmjs.com/package/netlify-plugin-cache-yarn2)
[![downloads per week](https://img.shields.io/npm/dw/netlify-plugin-cache-yarn2)](https://www.npmjs.com/package/netlify-plugin-cache-yarn2)
[![Build Status](https://github.com/pizzafox/netlify-cache-yarn2/workflows/CI/badge.svg)](https://github.com/pizzafox/netlify-cache-yarn2/actions)

A [Netlify build plugin](https://docs.netlify.com/configure-builds/build-plugins/).

## Usage

This is a Netlify build plugin, which will run during your Netlify builds. You can learn more about Netlify Build Plugins in the [Netlify docs](https://docs.netlify.com/configure-builds/build-plugins/).

If you want to manually install the plugin add the following lines to your `netlify.toml` file:

```toml
[[plugins]]
package = "netlify-plugin-cache-yarn2"
```

Next, from your project's base directory, use a package manager to add this plugin to `devDependencies` in `package.json`.

```sh
yarn add -D netlify-plugin-cache-yarn2
```

If you want to configure the plugin, you can do this in your `netlify.toml` file:

```toml
[[plugins]]
package = "netlify-plugin-cache-yarn2"
	[plugins.inputs]
	# The path to the Yarn lockfile
	# Default is yarn.lock
	build_dir_path = "frontend/yarn.lock"
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.
