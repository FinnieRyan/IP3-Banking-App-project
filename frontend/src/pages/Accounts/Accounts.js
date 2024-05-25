import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ActionCard } from '../../components/ActionCard/ActionCard';
import { Button } from '../../components/Button/Button';
import { Spacer } from '../../components/ContentLayout/Spacer';
import SquarePoundSymbol from '../../assets/square-pound-symbol.svg';

export const Accounts = () => {
  return (
    <PageLayout linkText="Home" linkLocation={'/'} heading="Accounts">
      <ActionCard icon={SquarePoundSymbol} content="Current Account" subContent="£X" />
      <Spacer />
      <Button>
        Transactions <FiPlus style={{ fontSize: '32px', marginRight: '-6px' }} />
      </Button>
    </PageLayout>
  );
};
