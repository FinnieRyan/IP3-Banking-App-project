import React, { useState } from 'react';
import { CustomerContext } from '../contexts/contexts';

export const CustomerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [customerData, setCustomerData] = useState(null);

  return (
    <CustomerContext.Provider
      value={{ isLoading, setIsLoading, customerData, setCustomerData }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
