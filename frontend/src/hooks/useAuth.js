import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/contexts';
import { getSessionData } from '../helpers/sessionHandlers';

export const useAuth = () => {
  const {
    isLoading,
    setIsLoading,
    accessToken,
    setAccessToken,
    user,
    setUser,
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchSessionData = () => {
      try {
        const loginResponse = getSessionData('loginResponse');
        if (loginResponse) {
          setAccessToken(loginResponse.accessToken);
          setUser(loginResponse.user);
        }
      } catch (error) {
        console.error('Failed to fetch session data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionData();
  }, [setAccessToken, setIsLoading, setUser]);

  return { isLoading, accessToken, setAccessToken, user, setUser };
};
