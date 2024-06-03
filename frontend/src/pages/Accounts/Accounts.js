import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { ActionCard } from '../../components/ActionCard/ActionCard';
import { Button } from '../../components/Button/Button';
import { Spacer } from '../../components/ContentLayout/Spacer';
import SquarePoundSymbol from '../../assets/square-pound-symbol-x2.svg';
import BankNoteSymbol from '../../assets/bank-note-symbol-x2.svg';
import { useNavigate } from 'react-router-dom';
import { GroupContent } from '../../components/ContentLayout/GroupContent';
import { useAccounts } from '../../hooks/useAccounts';
import { Loading } from '../../components/Loading/Loading';

export const Accounts = () => {
  const { accountsData, isLoading } = useAccounts();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageLayout linkText="Home" linkLocation={'/'} heading="Accounts">
      <GroupContent>
        {accountsData &&
          accountsData.map((account) => (
            <ActionCard
              key={account.id}
              icon={
                account.accountType === 'Current'
                  ? SquarePoundSymbol
                  : BankNoteSymbol
              }
              content={account.accountType}
              subContent={`£${account.balance}`}
              onClick={() =>
                navigate(`/accounts/${account.accountType.toLowerCase()}`)
              }
            />
          ))}
      </GroupContent>
      <Spacer />
      <Button onClick={() => navigate('/transfer-money')}>
        Transfer Money{' '}
        <FiPlus style={{ fontSize: '32px', marginRight: '-6px' }} />
      </Button>
    </PageLayout>
  );
};
