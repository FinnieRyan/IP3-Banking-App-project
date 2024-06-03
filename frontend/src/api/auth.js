import { setSessionData } from '../helpers/sessionHandlers';

export const login = async (email, password) => {
  const response = await fetch('http://localhost:3500/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed!');
  }

  const data = await response.json();
  setSessionData('loginResponse', data);
  return data;
};
