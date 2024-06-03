import React, { useState } from 'react';
import { AccountsContext } from '../contexts/contexts';

export const AccountsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accountsData, setAccountsData] = useState(null);

  return (
    <AccountsContext.Provider
      value={{ isLoading, setIsLoading, accountsData, setAccountsData }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
