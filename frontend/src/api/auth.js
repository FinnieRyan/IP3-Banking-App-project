import axios from 'axios';
import { setSessionData } from '../common/helpers/sessionHandlers';

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3500/auth/login', {
      email,
      password,
    });
    console.log('login', response.data);
    setSessionData('loginResponse', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed!');
  }
};
