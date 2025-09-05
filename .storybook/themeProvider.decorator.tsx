import React, { FC } from 'react';

import { FruityProvider } from '../packages/core/src';
import {
  ColorScheme,
  useColorScheme,
} from '../packages/core/src/providers/fruityProvider/FruityProvider';

const ThemeSelect: FC = () => {
  const { selectedColorScheme, setColorScheme } = useColorScheme();

  return (
    <select
      value={selectedColorScheme}
      onChange={(e) => {
        setColorScheme(e.target.value as ColorScheme);
      }}
    >
      <option value="light">light</option>
      <option value="dark">dark</option>
      <option value="system">system</option>
    </select>
  );
};

export const withThemeProvider = (Story, context) => (
  <FruityProvider defaultColorScheme="dark">
    <ThemeSelect />
    <Story {...context} />
  </FruityProvider>
);
