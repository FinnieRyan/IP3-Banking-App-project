import axios from 'axios';
import { setSessionData } from '../helpers/sessionHandlers';

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3500/auth/login', {
      email,
      password,
    });
    const data = response.data;
    console.log('login', data);
    setSessionData('loginResponse', data);
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed!');
  }
};
