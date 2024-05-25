import React from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ActionCard } from '../../components/ActionCard/ActionCard';
import { Button } from '../../components/Button/Button';
import pound from '../../assets/pound.svg';
import { Spacer } from '../../components/ContentLayout/Spacer';
import { FiPlus } from 'react-icons/fi';

export const Accounts = () => {
  return (
    <PageLayout linkText="Home" linkLocation={'/'} heading="Accounts">
      <ActionCard icon={pound} content="Current Account" subContent="£X" />
      <Spacer />
      <Button>
        Transactions <FiPlus style={{ fontSize: '32px', marginRight: '-5px' }} />
      </Button>
    </PageLayout>
  );
};
