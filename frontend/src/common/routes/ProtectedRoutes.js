import { Navigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import { Loading } from '../../components/Loading/Loading';
import { useCustomer } from '../../hooks/useCustomer';
import { useAccounts } from '../../hooks/useAccounts';

export const ProtectedRoute = ({ element }) => {
  const { isLoading: isAuthUserLoading, accessToken } = useAuthUser();
  const { isLoading: isCustomerLoading } = useCustomer();
  const { isLoading: isAccountsLoading } = useAccounts();
  console.log('isAuthUserLoading', isAuthUserLoading);
  console.log('isCustomerLoading', isCustomerLoading);
  console.log('isAccountsLoading', isAccountsLoading);

  if (isAuthUserLoading || isCustomerLoading || isAccountsLoading) {
    return <Loading />;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
