import axios from 'axios';

export const getAccounts = async (userId, authCode) => {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/accounts/${userId}`,
      {
        headers: {
          'x-auth-token': `${authCode}`,
        },
      }
    );
    console.log('getAccounts', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving accounts:', error);
    throw error;
  }
};
