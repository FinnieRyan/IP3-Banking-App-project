import React from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { Heading } from '../../components/Heading/Heading';

export const Account = () => {
  return (
    <PageLayout linkText="Accounts" linkLocation={'/accounts'}>
      <Heading>Account</Heading>
    </PageLayout>
  );
};
