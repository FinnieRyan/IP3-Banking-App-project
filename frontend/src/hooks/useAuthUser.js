import { useContext, useEffect, useState } from 'react'; // import useState
import { AuthUserContext } from '../contexts/contexts';
import { getSessionData } from '../helpers/sessionHandlers';

export const useAuthUser = () => {
  const {
    isLoading,
    setIsLoading,
    accessToken,
    setAccessToken,
    user,
    setUser,
  } = useContext(AuthUserContext);

  const [error, setError] = useState(null);

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
        setError('Failed to fetch session data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, accessToken, user, error };
};
