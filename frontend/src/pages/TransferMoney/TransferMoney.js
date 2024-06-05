// React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ActionCard } from '../../components/ActionCard/ActionCard';
import { AccountsModal } from '../../components/AccountsModal/AccountsModal';

// Assets
import SquarePoundPersonSymbol from '../../common/assets/square-pound-person-symbol-x2.svg';
import SquarePoundAddSymbol from '../../common/assets/square-pound-add-symbol-x2.svg';
import SquareArrowsSymbol from '../../common/assets/square-arrows-symbol-x2.svg';

// Hooks
import { useAccounts } from '../../hooks/useAccounts';

export const TransferMoney = () => {
  const { accountsData } = useAccounts();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const actionCardMoneyInNavigate = () => {
    setShowModal(true);
  };
  const actionCardTransferAccountsNavigate = () => {
    navigate('/transfer-money/move-money');
  };
  const actionCardPaySomeoneNavigate = () => {
    navigate('/transfer-money/pay-someone');
  };

  return (
    <PageLayout
      linkText="Accounts"
      linkLocation={'/accounts'}
      heading="Transfer Money"
    >
      {showModal && (
        <AccountsModal
          heading="Pay money into?"
          description="Which account would you like to pay money into?"
          onClose={() => setShowModal(false)}
          accounts={accountsData}
        />
      )}
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
        onClick={actionCardPaySomeoneNavigate}
      />
    </PageLayout>
  );
};
