import { Navigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import { Loading } from '../../components/Loading/Loading';

export const ProtectedRoute = ({ element }) => {
  const { isLoading, accessToken } = useAuthUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
