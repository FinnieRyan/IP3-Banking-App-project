import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ActionCard } from '../../components/ActionCard/ActionCard';
import { Button } from '../../components/Button/Button';
import { Spacer } from '../../components/ContentLayout/Spacer';
import SquarePoundSymbol from '../../assets/square-pound-symbol-x2.svg';
import { useNavigate } from 'react-router-dom';

export const Accounts = () => {
  const navigate = useNavigate();

  const actionCardCurrentAccountNavigate = () => {
    navigate('/accounts/current');
  };
  return (
    <PageLayout linkText="Home" linkLocation={'/'} heading="Accounts">
      <ActionCard
        icon={SquarePoundSymbol}
        content="Current Account"
        subContent="£X"
        action={actionCardCurrentAccountNavigate}
      />
      <ActionCard
        icon={SquarePoundSymbol}
        content="Savings Account"
        subContent="£X"
        action={actionCardCurrentAccountNavigate}
      />
      <ActionCard
        icon={SquarePoundSymbol}
        content="Mortgage"
        subContent="£X"
        action={actionCardCurrentAccountNavigate}
      />
      <Spacer />
      <Button>
        Transactions <FiPlus style={{ fontSize: '32px', marginRight: '-6px' }} />
      </Button>
    </PageLayout>
  );
};
