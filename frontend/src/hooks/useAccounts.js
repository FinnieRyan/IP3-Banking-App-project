import { useContext } from 'react';
import { AccountsContext } from '../contexts/contexts';

export const useAccounts = () => {
  const { accountsData, setAccountsData, isLoading, setIsLoading } =
    useContext(AccountsContext);

  const getAccountById = (id) => {
    const account = accountsData?.find((account) => account._id === id);
    return account;
  };

  const clearAccounts = () => {
    setAccountsData(null);
    setIsLoading(true);
  };

  return { accountsData, isLoading, getAccountById, clearAccounts };
};
