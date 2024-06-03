import { useEffect, useContext, useState } from 'react';
import { getAccounts } from '../api/accounts';
import { AuthUserContext, AccountsContext } from '../contexts/contexts';

export const useAccounts = () => {
  const { accountsData, setAccountsData, isLoading, setIsLoading } =
    useContext(AccountsContext);
  const {
    user,
    accessToken,
    isLoading: isAuthUserLoading,
  } = useContext(AuthUserContext);
  const [error, setError] = useState(null);

  const fetchAccountsData = async () => {
    setIsLoading(true);
    setError(null);
    if (!accessToken) {
      setError('No access token');
      setIsLoading(false);
      return;
    }
    try {
      const data = await getAccounts(user?.id, accessToken);
      setAccountsData(data);
    } catch (error) {
      console.error('Error fetching accounts data:', error);
      setError(error.message); // set error state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.username && !isAuthUserLoading) {
      fetchAccountsData();
    }
  }, [user, isAuthUserLoading]);

  const getAccountById = (id) => {
    console.log('id', id);
    const account = accountsData?.find((account) => account._id === id);
    return account;
  };

  const clearAccounts = () => {
    setAccountsData(null);
    setIsLoading(true);
  };

  return { accountsData, isLoading, error, getAccountById, clearAccounts };
};
