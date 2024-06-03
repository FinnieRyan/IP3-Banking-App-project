import { useContext } from 'react';
import { AuthUserContext } from '../contexts/contexts';

export const useAuthUser = () => {
  const {
    isLoading,
    setIsLoading,
    accessToken,
    setAccessToken,
    user,
    setUser,
  } = useContext(AuthUserContext);

  const clearAuthUser = () => {
    setAccessToken(null);
    setUser(null);
    setIsLoading(false);
  };

  return {
    isLoading,
    setIsLoading,
    accessToken,
    setAccessToken,
    user,
    setUser,
    clearAuthUser,
  };
};
