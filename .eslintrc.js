module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  'extends': [
    'plugin:vue/essential', 'plugin:vue/recommended', 'eslint:recommended'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
