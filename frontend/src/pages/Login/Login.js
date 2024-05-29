import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { InputField } from '../../components/Input/InputField';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Input/Form';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <PageLayout heading="Log into your account">
      <Form onSubmit={handleSubmit}>
        <InputField label="Email" value={email} onChange={handleEmailChange} />
        <InputField
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          type="password"
        />

        <Button>Log in</Button>
      </Form>
    </PageLayout>
  );
};
