import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { resolve } from "path";

import { UserscriptPlugin } from "webpack-userscript";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
	entry: {
		"market-helpers": "./src/market-helpers.ts"
	},
	output: {
		path: resolve(__dirname, 'build')
	},
	resolve: {
		extensions: ["...", ".ts"]
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "ecmascript"
								}
							},
							env: { targets }
						}
					}
				]
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript"
								}
							},
							env: { targets }
						}
					}
				]
			}
		]
	},

	plugins: [
		new UserscriptPlugin({
			headers: {
				name: "sillymarket helpers!",
				namespace: "https://owo.me/",
				version: "0.0.1-[buildTime]",
				description: "helpers for sillymarket!",
				author: "nepeat",
				match: "https://sillypost.net/games/sillyexchange",
				grant: "none",
				icon: "https://www.google.com/s2/favicons?sz=64&domain=sillypost.net",
				updateURL: "https://raw.githubusercontent.com/nepeat/sillypost-userscripts/refs/heads/main/build/market-helpers.user.js",
				downloadURL: "https://raw.githubusercontent.com/nepeat/sillypost-userscripts/refs/heads/main/build/market-helpers.user.js",
			}
		}),
	],
	optimization: {
		minimizer: []
	},
	experiments: {
		css: true
	}
});
