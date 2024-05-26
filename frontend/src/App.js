import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// STYLES
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/Theme';

// PAGES
import { Home } from './pages/Home/Home';
import { Accounts } from './pages/Accounts/Accounts';
import { Account } from './pages/Account/Account';
import { TransferMoney } from './pages/TransferMoney/TransferMoney';
import NotFound from './pages/NotFound/NotFound';

// COMPONENTS
import { NavBar } from './components/NavBar/NavBar';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/:accountType" element={<Account />} />
          <Route path="/transfer-money" element={<TransferMoney />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
