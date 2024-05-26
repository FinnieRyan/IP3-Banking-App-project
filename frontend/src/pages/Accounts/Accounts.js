import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ActionCard } from '../../components/ActionCard/ActionCard';
import { Button } from '../../components/Button/Button';
import { Spacer } from '../../components/ContentLayout/Spacer';
import SquarePoundSymbol from '../../assets/square-pound-symbol-x2.svg';
import BankNote from '../../assets/bank-note-symbol-x2.svg';
import { useNavigate } from 'react-router-dom';

export const Accounts = () => {
  const navigate = useNavigate();

  const actionCardCurrentAccountNavigate = () => {
    navigate('/accounts/current');
  };
  const actionCardSavingsNavigate = () => {
    navigate('/accounts/savings');
  };
  const buttonTransferMoneyNavigate = () => {
    navigate('/transfer-money');
  };

  return (
    <PageLayout linkText="Home" linkLocation={'/'} heading="Accounts">
      <ActionCard
        icon={SquarePoundSymbol}
        content="Current Account"
        subContent="£X"
        onClick={actionCardCurrentAccountNavigate}
      />
      <ActionCard icon={BankNote} content="Savings" subContent="£X" onClick={actionCardSavingsNavigate} />
      <Spacer />
      <Button onClick={buttonTransferMoneyNavigate}>
        Transfer Money <FiPlus style={{ fontSize: '32px', marginRight: '-6px' }} />
      </Button>
    </PageLayout>
  );
};
