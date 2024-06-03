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

export const Accounts = () => {
  const { accountsData } = useAccounts();
  const navigate = useNavigate();

  return (
    <PageLayout linkText="Home" linkLocation={'/'} heading="Accounts">
      <GroupContent>
        {accountsData &&
          accountsData.map((account) => (
            <ActionCard
              key={account._id}
              icon={
                account.accountType === 'Current'
                  ? SquarePoundSymbol
                  : BankNoteSymbol
              }
              content={`${account.accountType} Account`}
              subContent={`£${account.balance}`}
              onClick={() => navigate(`/accounts/${account._id}`)}
            />
          ))}
      </GroupContent>
      <Spacer />
      <Button onClick={() => navigate('/transfer-money')}>
        Transfer Money
        <FiPlus style={{ fontSize: '32px', marginRight: '-6px' }} />
      </Button>
    </PageLayout>
  );
};
