import { Navigate } from 'react-router-dom';
import { getSessionData } from '../../helpers/sessionHandlers';

export const ProtectedRoute = ({ element }) => {
  const loginResponse = getSessionData('loginResponse');
  const isLoggedIn = loginResponse && loginResponse.accessToken;
  console.log('retrieved access token:', isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};
