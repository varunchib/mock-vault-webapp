import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // .wrangler holds generated dev/deploy bundles (our own source, already
  // linted, concatenated with vendor code). Linting them reported ~110 phantom
  // no-undef errors that reappeared after every `wrangler dev` run.
  globalIgnores(['dist', 'node_modules', '.wrangler']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
  // Build-time scripts run in Node, not the browser — they legitimately use
  // console/process/fetch, which the browser-globals block above doesn't define.
  {
    files: ['scripts/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: { sourceType: 'module' },
    },
  },
])
