// React Router and React Transition Group
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Styles
import './App.css';

// Pages
import { NotFound } from './pages/NotFound/NotFound';
import { Home } from './pages/Home/Home';
import { Accounts } from './pages/Accounts/Accounts';
import { Account } from './pages/Account/Account';
import { TransferMoney } from './pages/TransferMoney/TransferMoney';
import { MoneyIn } from './pages/MoneyIn/MoneyIn';
import { MoveMoney } from './pages/MoveMoney/MoveMoney';
import { PaySomeone } from './pages/PaySomeone/PaySomeone';
import { Login } from './pages/Login/Login';

// Routes
import { ProtectedRoute } from './common/routes/ProtectedRoutes';

export const AppRoutes = () => {
  let location = useLocation();

  return (
    // This is the transition group that will animate the routes
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={400}>
        <Routes location={location}>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/accounts"
            element={<ProtectedRoute element={<Accounts />} />}
          />
          <Route
            path="/accounts/:accountId"
            element={<ProtectedRoute element={<Account />} />}
          />
          <Route
            path="/transfer-money"
            element={<ProtectedRoute element={<TransferMoney />} />}
          />
          <Route
            path="/transfer-money/money-in/:accountId"
            element={<ProtectedRoute element={<MoneyIn />} />}
          />
          <Route
            path="/transfer-money/move-money"
            element={<ProtectedRoute element={<MoveMoney />} />}
          />
          <Route
            path="/transfer-money/pay-someone"
            element={<ProtectedRoute element={<PaySomeone />} />}
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};
