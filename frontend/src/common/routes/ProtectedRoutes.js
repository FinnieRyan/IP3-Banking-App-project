// React Router
import { Navigate } from 'react-router-dom';

// Hooks
import { useAuthUser } from '../../hooks/useAuthUser';
import { useCustomer } from '../../hooks/useCustomer';
import { useAccounts } from '../../hooks/useAccounts';

// Components
import { Loading } from '../../components/Loading/Loading';

export const ProtectedRoute = ({ element }) => {
  const { isLoading: isAuthUserLoading, accessToken } = useAuthUser();
  const { isLoading: isCustomerLoading } = useCustomer();
  const { isLoading: isAccountsLoading } = useAccounts();

  if (isAuthUserLoading || isCustomerLoading || isAccountsLoading) {
    return <Loading />;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
