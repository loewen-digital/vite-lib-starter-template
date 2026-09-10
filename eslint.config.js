import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import ts from 'typescript-eslint';

export default defineConfig(
	globalIgnores(['dist/']),
	js.configs.recommended,
	ts.configs.recommended,
	prettier,
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }]
		}
	}
);
