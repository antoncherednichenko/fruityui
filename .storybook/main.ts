import type { StorybookConfig } from '@storybook/react-vite';
import { withoutVitePlugins } from '@storybook/builder-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-actions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  managerHead: (head) => `
    ${head}
    <base href="${process.env.NODE_ENV === 'production' ? '/fruityui/' : '/'}">
  `,
  viteFinal: async (config) => ({
    ...config,
    plugins: await withoutVitePlugins(config.plugins, ['vite:dts']), // skip dts plugin
  }),
};
export default config;