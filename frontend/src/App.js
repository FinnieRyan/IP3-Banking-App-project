import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ThemeProvider } from 'styled-components';

// STYLES
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/Theme';
import './App.css';

// COMPONENTS
import { ScrollToTop } from './helpers/ScrollToTop';
import { NavBar } from './components/NavBar/NavBar';

// PAGES
import { NotFound } from './pages/NotFound/NotFound';
import { Home } from './pages/Home/Home';
import { Accounts } from './pages/Accounts/Accounts';
import { Account } from './pages/Account/Account';
import { TransferMoney } from './pages/TransferMoney/TransferMoney';
import { MoneyIn } from './pages/MoneyIn/MoneyIn';
import { MoveMoney } from './pages/MoveMoney/MoveMoney';
import { PaySomeone } from './pages/PaySomeone/PaySomeone';

const TransitionRoutes = () => {
  let location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={400}>
        <Routes location={location}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/:accountType" element={<Account />} />
          <Route path="/transfer-money" element={<TransferMoney />} />
          <Route
            path="/transfer-money/money-in/:account"
            element={<MoneyIn />}
          />
          <Route path="/transfer-money/move-money" element={<MoveMoney />} />
          <Route path="/transfer-money/pay-someone" element={<PaySomeone />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <ScrollToTop />
        <NavBar />
        <TransitionRoutes />
      </Router>
    </ThemeProvider>
  );
};
