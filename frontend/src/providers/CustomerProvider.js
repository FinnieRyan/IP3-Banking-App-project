import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext, CustomerContext } from '../contexts/contexts';
import { getCustomer } from '../api/customer';

export const CustomerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [customerData, setCustomerData] = useState(null);
  const {
    user,
    accessToken,
    isLoading: isAuthUserLoading,
  } = useContext(AuthUserContext);

  // Fetch customer data when the user is loaded
  useEffect(() => {
    const fetchCustomerData = async () => {
      setIsLoading(true);
      if (!accessToken) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await getCustomer(user?.username, accessToken);
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!isAuthUserLoading && !customerData) {
      fetchCustomerData();
    }
  }, [isAuthUserLoading, customerData, accessToken, user?.username]);

  return (
    <CustomerContext.Provider
      value={{ isLoading, setIsLoading, customerData, setCustomerData }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
