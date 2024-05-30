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
import { login } from '../../api/Auth/Auth';

export const Login = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {
      email: !email ? 'Please enter your email.' : '',
      password: !password ? 'Please enter your password.' : '',
    };

    if (errors.email || errors.password) {
      setError(errors);
      return;
    }

    setIsLoading(true);
    login(email, password)
      .then((data) => {
        console.log(data);
        setSessionData('authorizationCode', data.authorizationCode);
        setIsLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <PageLayout heading="Log into your account">
      <Text>
        Enter you account details below to log into your FinWise account
      </Text>
      <Form onSubmit={handleSubmit}>
        {error.email && (
          <span style={{ color: theme.colors.warning, fontSize: '14px' }}>
            {error.email}
          </span>
        )}
        <InputField
          name="email"
          label="Email"
          value={email}
          onChange={handleChange}
          // type="email"
        />
        {error.password && (
          <span style={{ color: theme.colors.warning, fontSize: '14px' }}>
            {error.password}
          </span>
        )}
        <InputField
          name="password"
          label="Password"
          value={password}
          onChange={handleChange}
          type="password"
        />
        <Spacer />
        <Button>{isLoading ? 'Loading...' : 'Log in'}</Button>
      </Form>
    </PageLayout>
  );
};
