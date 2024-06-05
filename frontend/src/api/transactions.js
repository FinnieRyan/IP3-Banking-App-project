import axios from 'axios';

export const getTransactions = async (authCode, accountId) => {
  try {
    const response = await axios.get(
      `http://localhost:5001/api/transactions/${accountId}`,
      {
        headers: {
          'x-auth-token': `${authCode}`,
        },
      }
    );
    console.log('getTransactions', response.data);
  } catch (error) {
    console.error('Error retrieving transactions for this account:', error);
    throw error;
  }
};
