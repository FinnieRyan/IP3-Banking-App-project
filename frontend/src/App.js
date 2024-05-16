import { ThemeProvider } from 'styled-components';

// STYLES
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/Theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <h1>Hello world!</h1>
      <p>FinWise App</p>
      <a>Test link</a>
    </ThemeProvider>
  );
};
