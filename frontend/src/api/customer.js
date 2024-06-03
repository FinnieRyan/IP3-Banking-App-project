import axios from 'axios';

export const getCustomer = async (username, authCode) => {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/customers/${username}`,
      {
        headers: {
          'x-auth-token': `${authCode}`,
        },
      }
    );
    console.log('getCustomer', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving customer:', error);
    throw error;
  }
};
