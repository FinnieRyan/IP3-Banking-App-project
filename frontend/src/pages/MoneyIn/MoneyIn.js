import React from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { Heading } from '../../components/Heading/Heading';
import { Text } from '../../components/Text/Text';
import { Button } from '../../components/Button/Button';
import { Spacer } from '../../components/ContentLayout/Spacer';
import { useNavigate } from 'react-router-dom';
import { CopyableDetailCard } from '../../components/CopyableDetailCard/CopyableDetailCard';

export const MoneyIn = () => {
  const navigate = useNavigate();

  const navigateToTransferMoney = () => {
    navigate('/transfer-money');
  };

  return (
    <PageLayout heading="Pay money in">
      <Heading size={2} aria-label="Account Type">
        X Account
      </Heading>
      <Text>Never share account details with someone you don’t trust.</Text>
      <CopyableDetailCard showCopyButton label="Name" value="Name" />
      <CopyableDetailCard showCopyButton label="Sort code" value="10-10-10" />
      <CopyableDetailCard
        showCopyButton
        label="Account number"
        value="10223310"
      />
      <Spacer />
      <Button onClick={navigateToTransferMoney} aria-label="Done Button">
        Done
      </Button>
    </PageLayout>
  );
};
