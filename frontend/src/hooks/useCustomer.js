import { useEffect, useContext, useState } from 'react';
import { getCustomer } from '../api/customer';
import { AuthUserContext, CustomerContext } from '../contexts/contexts';

export const useCustomer = () => {
  const { customerData, setCustomerData, isLoading, setIsLoading } =
    useContext(CustomerContext);
  const {
    user,
    accessToken,
    isLoading: isAuthUserLoading,
  } = useContext(AuthUserContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      setIsLoading(true);
      setError(null);
      if (!accessToken) {
        setError('No access token');
        setIsLoading(false);
        return;
      }
      try {
        const data = await getCustomer(user?.username, accessToken);
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setError(error.message); // set error state
      } finally {
        setIsLoading(false);
      }
    };
    if (!isAuthUserLoading) {
      fetchCustomerData();
    }
  }, [accessToken, user]);

  const clearCustomer = () => {
    setCustomerData(null);
    setIsLoading(true);
  };

  return { customerData, isLoading, error, clearCustomer };
};
