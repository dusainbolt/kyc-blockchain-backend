module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['prettier', 'google'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'object-curly-spacing': 'off',
    'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
    indent: 'off',
    'comma-dangle': 'off',
    'quote-props': 'off',
    'space-before-function-paren': 'off',
    'max-len': 'off',
  },
};
