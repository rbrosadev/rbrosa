import path from 'node:path';

import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),

	js.configs.recommended,
	ts.configs.recommended,

	svelte.configs.recommended,

	prettierConfig,
	svelte.configs.prettier,

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},

		plugins: {
			prettier: prettierPlugin
		},

		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
			'prettier/prettier': 'error',
			'svelte/no-navigation-without-resolve': 'off'
		}
	},

	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],

		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	},

	{
		// Override or add rule settings here, such as:
		// 'svelte/button-has-type': 'error'
		rules: {}
	}
);
