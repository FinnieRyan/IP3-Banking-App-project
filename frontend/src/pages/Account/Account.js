import React, { useState } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { Heading } from '../../components/Heading/Heading';
import { Card } from '../../components/Card/Card';
import { useAccounts } from '../../hooks/useAccounts';
import { useParams } from 'react-router-dom';
import { FaCircleInfo } from 'react-icons/fa6';
import { useTheme } from 'styled-components';
import { HR } from '../../components/HR/HR';
import { Text } from '../../components/Text/Text';
import { AccountDetailsContainer } from './Account.style';
import { MonthPicker } from '../../components/MonthPicker/MonthPicker';

export const Account = () => {
  const theme = useTheme();
  const { accountId } = useParams();
  const { getAccountById } = useAccounts();
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const date = new Date();
    return {
      name: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear(),
    };
  });
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const account = getAccountById(accountId);

  return (
    <PageLayout linkText="Accounts" linkLocation={'/accounts'}>
      <Card style={{ position: 'relative' }}>
        <FaCircleInfo
          style={{
            position: 'absolute',
            fontSize: '24px',
            top: '24px',
            right: '24px',
            color: theme.colors.grey,
            cursor: 'pointer',
          }}
          onClick={() => setShowAccountDetails(!showAccountDetails)}
        />
        <Heading>{account.accountType} Account</Heading>
        {showAccountDetails && (
          <>
            <AccountDetailsContainer>
              <Text size={5} color="grey" weight="medium">
                Account Number {account.accountNumber}
              </Text>
              <Text size={5} color="grey" weight="medium">
                Sort Code {account.sortCode}
              </Text>
            </AccountDetailsContainer>
            <HR />
          </>
        )}
        <Heading size={2}>£{account.balance}</Heading>
      </Card>
      <MonthPicker
        // startDate={account.createdAt}
        startDate="11/1/2022"
        onMonthChange={setSelectedMonth}
      />
      <Card>
        <Heading size={2}>{selectedMonth.name} overview</Heading>
      </Card>
    </PageLayout>
  );
};
