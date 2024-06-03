import { Navigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';

export const ProtectedRoute = ({ element }) => {
  const { isLoading, accessToken } = useAuthUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return accessToken ? element : <Navigate to="/login" replace />;
};
