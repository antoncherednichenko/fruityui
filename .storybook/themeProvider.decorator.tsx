
import { ThemeProvider } from '../src/providers/ThemeProvider';

export const withThemeProvider = (Story, context) => (
  <>
    <Story {...context} />
  </>
);
