import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute = ({ element }) => {
  const { isLoading, accessToken } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return accessToken ? element : <Navigate to="/login" replace />;
};
