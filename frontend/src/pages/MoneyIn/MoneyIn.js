// React and React Router
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Components
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { Heading } from '../../components/Heading/Heading';
import { Text } from '../../components/Text/Text';
import { Button } from '../../components/Button/Button';
import { Spacer } from '../../components/ContentLayout/Spacer';
import { CopyableDetailCard } from '../../components/CopyableDetailCard/CopyableDetailCard';
import { Loading } from '../../components/Loading/Loading';

// Hooks
import { useAccounts } from '../../hooks/useAccounts';
import { useCustomer } from '../../hooks/useCustomer';

export const MoneyIn = () => {
  const { accountId } = useParams();
  const { getAccountById } = useAccounts();
  const { customerData } = useCustomer();
  const navigate = useNavigate();

  const account = getAccountById(accountId);

  const navigateToTransferMoney = () => {
    navigate('/transfer-money');
  };

  if (!account) {
    return <Loading />;
  }

  return (
    <PageLayout heading="Pay money in">
      <Heading size={2} aria-label="Account Type">
        {account.accountType} Account details
      </Heading>
      <Text>Never share account details with someone you don’t trust.</Text>
      <CopyableDetailCard
        showCopyButton
        label="Name"
        value={`${customerData.forename} ${customerData.surname}`}
      />
      <CopyableDetailCard
        showCopyButton
        label="Sort code"
        value={account.sortCode}
      />
      <CopyableDetailCard
        showCopyButton
        label="Account number"
        value={account.accountNumber}
      />
      <Spacer />
      <Button onClick={navigateToTransferMoney} aria-label="Done Button">
        Done
      </Button>
    </PageLayout>
  );
};
