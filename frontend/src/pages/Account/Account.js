import React from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { Heading } from '../../components/Heading/Heading';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/Card/Card';

export const Account = () => {
  const { accountType } = useParams();

  return (
    <PageLayout linkText="Accounts" linkLocation={'/accounts'}>
      <Card>
        <Heading>{accountType}</Heading>
      </Card>
    </PageLayout>
  );
};
