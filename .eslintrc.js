module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    semi: 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    'require-await': 'error',
  },
};
