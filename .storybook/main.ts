import path from "path";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { StorybookConfig } from '@storybook/react-webpack5';

const getAbsolutePath = (value: string) => path.dirname(require.resolve(path.join(value, 'package.json')));

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
    enableCrashReports: false,
  },

  addons: [],

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {}
  },

  docs: {
    autodocs: false,
  },

  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript'
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
          ],
        },
      },
    });

    config.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      plugins: [
        ...(config?.resolve?.plugins ?? []),
        new TsconfigPathsPlugin({
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
          configFile: path.join(__dirname, '../tsconfig.json'),
        }),
      ],
    };

    config.mode = 'development'

    return config;
  },

  typescript: {
    reactDocgen: false,
  },

  managerHead: (head) => `
    ${head}
    <base href="${process.env.NODE_ENV === 'production' ? '/fruityui/' : '/'}">
  `
};

export default config;