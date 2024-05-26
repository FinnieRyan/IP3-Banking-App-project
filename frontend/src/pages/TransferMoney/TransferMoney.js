import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ActionCard } from '../../components/ActionCard/ActionCard';
import SquarePoundPersonSymbol from '../../assets/square-pound-person-symbol-x2.svg';
import SquarePoundAddSymbol from '../../assets/square-pound-add-symbol-x2.svg';
import SquareArrowsSymbol from '../../assets/square-arrows-symbol-x2.svg';

export const TransferMoney = () => {
  const navigate = useNavigate();

  const actionCardMoneyInNavigate = () => {
    navigate('/transfer-money/money-in');
  };
  const actionCardTransferAccountsNavigate = () => {
    navigate('/transfer-money/move-money');
  };
  const buttonPaySomeoneNavigate = () => {
    navigate('/transfer-money/pay-someone');
  };

  return (
    <PageLayout linkText="Accounts" linkLocation={'/accounts'} heading="Transfer Money">
      <ActionCard
        icon={SquarePoundAddSymbol}
        content="Pay money in"
        subContent="Add money to an account"
        onClick={actionCardMoneyInNavigate}
      />
      <ActionCard
        icon={SquareArrowsSymbol}
        content="Move money"
        subContent="Transfer money between accounts"
        onClick={actionCardTransferAccountsNavigate}
      />
      <ActionCard
        icon={SquarePoundPersonSymbol}
        content="Pay someone"
        subContent="By bank transfer"
        onClick={buttonPaySomeoneNavigate}
      />
    </PageLayout>
  );
};
