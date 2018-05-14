module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'react/jsx-filename-extension': 0,
    'no-console': 0,
    'function-paren-newline': 0,
    'linebreak-style': 0,
  },
  globals: {
    document: 1,
  },
};
