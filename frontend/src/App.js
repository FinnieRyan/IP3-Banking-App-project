import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// STYLES
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/Theme';

// COMPONENTS
import { ScrollToTop } from './helpers/ScrollToTop';
import { NavBar } from './components/NavBar/NavBar';

// PAGES
import NotFound from './pages/NotFound/NotFound';
import { Home } from './pages/Home/Home';
import { Accounts } from './pages/Accounts/Accounts';
import { Account } from './pages/Account/Account';
import { TransferMoney } from './pages/TransferMoney/TransferMoney';
import { MoneyIn } from './pages/MoneyIn/MoneyIn';
import { MoveMoney } from './pages/MoveMoney/MoveMoney';
import { PaySomeone } from './pages/PaySomeone/PaySomeone';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/:accountType" element={<Account />} />
          <Route path="/transfer-money" element={<TransferMoney />} />
          <Route path="/transfer-money/money-in/:account" element={<MoneyIn />} />
          <Route path="/transfer-money/move-money" element={<MoveMoney />} />
          <Route path="/transfer-money/pay-someone" element={<PaySomeone />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
