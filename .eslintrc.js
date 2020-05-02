module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-console': 0,
    'react/button-has-type': 0,
    'react/no-array-index-key': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-no-target-blank': 0,
    'react/forbid-prop-types': 0,
  }
};
