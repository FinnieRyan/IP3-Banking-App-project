import React, { useEffect, useState } from 'react';
import { AuthUserContext } from '../contexts/contexts';
import { getSessionData } from '../common/helpers/sessionHandlers';

export const AuthUserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch session data when the component mounts
  useEffect(() => {
    const fetchSessionData = async () => {
      setIsLoading(true);
      try {
        const loginResponse = await getSessionData('loginResponse');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthUserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        accessToken,
        setAccessToken,
        user,
        setUser,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};
