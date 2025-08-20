// .storybook/main.js
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  staticDirs: ['../public'],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: async (viteConfig) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Alias "@"
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias || {}),
      '@': path.resolve(__dirname, '../src'),
    };

    // (Opcional) plugin Tailwind si usás @tailwindcss/vite
    try {
      const { default: tailwindcss } = await import('@tailwindcss/vite');
      viteConfig.plugins = [...(viteConfig.plugins || []), tailwindcss()];
    } catch {
      // si no lo tenés, no pasa nada
    }

    return viteConfig;
  },
};

export default config;
