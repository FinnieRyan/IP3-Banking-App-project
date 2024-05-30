import { Navigate } from 'react-router-dom';
import { getSessionData } from '../../helpers/sessionHandlers';

export const ProtectedRoute = ({ element }) => {
  const isLoggedIn = getSessionData('isLoggedIn');

  return isLoggedIn ? element : <Navigate to="/login" replace />;
};
