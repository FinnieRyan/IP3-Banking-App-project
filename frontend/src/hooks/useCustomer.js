import { useContext } from 'react';
import { CustomerContext } from '../contexts/contexts';

export const useCustomer = () => {
  const { customerData, setCustomerData, isLoading, setIsLoading } =
    useContext(CustomerContext);

  const clearCustomer = () => {
    setCustomerData(null);
    setIsLoading(true);
  };

  return { customerData, isLoading, clearCustomer };
};
