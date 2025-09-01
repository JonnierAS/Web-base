import { mergeConfig } from 'vite';
import path from 'path';

/** @type { import('storybook').StorybookConfig } */
export default {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook', '@storybook/addon-interactions'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
    });
  },

  docs: {
    autodocs: true,
  },
};
