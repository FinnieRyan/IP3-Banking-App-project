import React, { useContext, useEffect, useState } from 'react';
import { AccountsContext, AuthUserContext } from '../contexts/contexts';
import { getAccounts } from '../api/accounts';

export const AccountsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accountsData, setAccountsData] = useState(null);
  const {
    user,
    accessToken,
    isLoading: isAuthUserLoading,
  } = useContext(AuthUserContext);

  // Fetch accounts data when the user is loaded
  useEffect(() => {
    const fetchAccountsData = async () => {
      setIsLoading(true);
      if (!accessToken) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await getAccounts(user?.id, accessToken);
        setAccountsData(data);
      } catch (error) {
        console.error('Error fetching accounts data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!isAuthUserLoading && !accountsData) {
      fetchAccountsData();
    }
  }, [isAuthUserLoading, accountsData, accessToken, user?.id]);

  return (
    <AccountsContext.Provider
      value={{ isLoading, setIsLoading, accountsData, setAccountsData }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
