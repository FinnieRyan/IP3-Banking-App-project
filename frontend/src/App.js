// React and Router
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Styles and Themes
import { GlobalStyles } from './common/styles/GlobalStyles';
import { theme } from './common/styles/Theme';
import './App.css';

// Components and Helpers
import { ScrollToTop } from './common/helpers/ScrollToTop';
import { NavBar } from './components/NavBar/NavBar';

// Providers
import { AuthUserProvider } from './providers/AuthUserProvider';
import { CustomerProvider } from './providers/CustomerProvider';
import { AccountsProvider } from './providers/AccountsProvider';

// Routes
import { AppRoutes } from './AppRoutes';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthUserProvider>
        <CustomerProvider>
          <AccountsProvider>
            <GlobalStyles />
            <Router>
              <ScrollToTop />
              <NavBar />
              <AppRoutes />
            </Router>
          </AccountsProvider>
        </CustomerProvider>
      </AuthUserProvider>
    </ThemeProvider>
  );
};
