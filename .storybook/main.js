module.exports = {
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/preset-typescript'
  ],
  stories: ['../stories/*.stories.tsx'],
};
