const prettierPlugin = require('eslint-plugin-prettier');
const testingLibraryPlugin = require('eslint-plugin-testing-library');
const nextConfig = require('eslint-config-next');

module.exports = [
  {
    ignores: ['node_modules/', 'dist/', 'build/', '.next/'],
  },
  ...nextConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      semi: 'off',
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      'testing-library': testingLibraryPlugin,
    },
    rules: {
      ...testingLibraryPlugin.configs.react.rules,
    },
  },
];
