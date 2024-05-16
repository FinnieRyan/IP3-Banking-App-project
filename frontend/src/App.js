import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// STYLES
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/Theme';

import { Link } from './components/Link/Link';
import { PageLayout } from './components/PageLayout/PageLayout';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        {/* <Routes> */}
        <PageLayout>
          <h1>Hello world!</h1>
          <p>FinWise App</p>
          <Link>Test link</Link>
        </PageLayout>
        {/* </Routes> */}
      </Router>
    </ThemeProvider>
  );
};
