import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/**
 * ESLint 9 flat config.
 *
 * The project had ESLint 9 and its plugins installed but no config file, so
 * `npm run lint` failed outright. This restores linting rather than pinning
 * back to the legacy .eslintrc format.
 */
export default [
  { ignores: ['dist/**', 'dist-ssr/**', 'node_modules/**'] },

  // Application source — browser environment.
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Without this, core no-unused-vars cannot see that `<Foo />` uses `Foo`
      // and reports every imported component as unused.
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
    },
  },

  // The SSR entry legitimately exports a render function alongside components;
  // it is never part of a Fast Refresh boundary.
  {
    files: ['src/entry-server.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },

  // Build scripts — Node environment, and console output is the point.
  {
    files: ['scripts/**/*.mjs', '*.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.node },
      parserOptions: { sourceType: 'module' },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
