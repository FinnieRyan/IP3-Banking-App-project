import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// STYLES
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/Theme';

// COMPONENTS
import { PageLayout } from './components/PageLayout/PageLayout';
import { Heading } from './components/Heading/Heading';
import { Link } from './components/Link/Link';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <PageLayout>
          <Heading size={1} displayAs={3}>
            Hello world!
          </Heading>
          <p>FinWise App</p>
          <Link>Test link</Link>
        </PageLayout>
      </Router>
    </ThemeProvider>
  );
};
