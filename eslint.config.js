export default [
  {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:import/recommended',
      'plugin:jsx-a11y/recommended',
      'airbnb',
      'prettier',
    ],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: { react: { version: '18.2' } },
    plugins: ['react', 'react-refresh'],
    rules: {
      semi: 'error',
      'no-console': 'off',
      'prefer-const': 'warn',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'react-refresh/only-export-components': 'warn',
    },
  },
];
