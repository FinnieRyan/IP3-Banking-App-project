import { useEffect, useContext } from 'react';
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

  const fetchCustomerData = async () => {
    setIsLoading(true);
    try {
      const data = await getCustomer(user?.username, accessToken);
      setCustomerData(data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.username && !isAuthUserLoading) {
      fetchCustomerData();
    }
  }, [user]);

  return { customerData, isLoading, fetchCustomerData };
};
