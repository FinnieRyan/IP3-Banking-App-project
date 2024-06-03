import React, { useState } from 'react';
import { AuthUserContext } from '../contexts/contexts';

export const AuthUserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

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
