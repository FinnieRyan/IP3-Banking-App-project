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
import { login } from '../../api/auth';

export const Login = () => {
  const theme = useTheme();
  const [formFields, setFormFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    api: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: '', api: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formFields;
    const newErrors = {
      email: !email ? 'Please enter your email.' : '',
      password: !password ? 'Please enter your password.' : '',
    };

    if (newErrors.email || newErrors.password) {
      setErrors((prevState) => ({ ...prevState, ...newErrors }));
      return;
    }

    setIsLoading(true);
    login(email, password)
      .then((data) => {
        console.log(data);
        setSessionData('loginResponse', data);
        setIsLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setErrors((prevState) => ({
          ...prevState,
          api: 'Login failed. Please check your email and password.',
        }));
      });
  };

  return (
    <PageLayout heading="Log into your account">
      <Text>
        Enter you account details below to log into your FinWise account
      </Text>
      <Form onSubmit={handleSubmit} id="login-form">
        {errors.api && (
          <span style={{ color: theme.colors.warning, fontSize: '14px' }}>
            {errors.api}
          </span>
        )}
        {errors.email && (
          <span style={{ color: theme.colors.warning, fontSize: '14px' }}>
            {errors.email}
          </span>
        )}
        <InputField
          name="email"
          label="Email"
          value={formFields.email}
          onChange={handleChange}
          type="email"
        />
        {errors.password && (
          <span style={{ color: theme.colors.warning, fontSize: '14px' }}>
            {errors.password}
          </span>
        )}
        <InputField
          name="password"
          label="Password"
          value={formFields.password}
          onChange={handleChange}
          type="password"
        />
      </Form>
      <Spacer />
      <Button disabled={isLoading} form="login-form">
        {isLoading ? 'Loading...' : 'Log in'}
      </Button>
    </PageLayout>
  );
};
