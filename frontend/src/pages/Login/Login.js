import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { InputField } from '../../components/Input/InputField';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Input/Form';
import { Text } from '../../components/Text/Text';
import { useTheme } from 'styled-components';
import { Spacer } from '../../components/ContentLayout/Spacer';
import { setSessionData } from '../../helpers/sessionHandlers';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError((prevError) => ({ ...prevError, email: '' }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError((prevError) => ({ ...prevError, password: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setError((prevError) => ({
        ...prevError,
        email: 'Please enter your email.',
      }));
      return;
    }
    if (!password) {
      setError((prevError) => ({
        ...prevError,
        password: 'Please enter your password.',
      }));
      return;
    }

    setIsLoading(true);
    // Add login logic here
    setSessionData('isLoggedIn', 'true'); // replace this with correct info
    // need to handle if the details are incorrect to send error back to the UI
    setIsLoading(false);
    navigate('/');
  };

  return (
    <PageLayout heading="Log into your account">
      <Text>
        Enter you account details below to log into your FinWise account
      </Text>
      <Form onSubmit={handleSubmit}>
        {error.email && (
          <span style={{ color: theme.colors.warning }}>{error.email}</span>
        )}
        <InputField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          type="email"
        />
        {error.password && (
          <span style={{ color: theme.colors.warning }}>{error.password}</span>
        )}
        <InputField
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          type="password"
        />
        <Spacer />
        <Button>{isLoading ? 'Loading...' : 'Log in'}</Button>
      </Form>
    </PageLayout>
  );
};
