import React, { useEffect, useState } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { Heading } from '../../components/Heading/Heading';
import { Card } from '../../components/Card/Card';
import { useAccounts } from '../../hooks/useAccounts';
import { useParams } from 'react-router-dom';
import { HR } from '../../components/HR/HR';
import { Text } from '../../components/Text/Text';
import { AccountDetailsContainer, InfoIcon } from './Account.style';
import { MonthPicker } from '../../components/MonthPicker/MonthPicker';
import { ExpensesBars } from '../../components/ExpensesBars/ExpensesBars';
import { DaySeparator } from '../../components/DaySeparator/DaySeparator';
import { useTheme } from 'styled-components';
import { getDatesForMonth } from '../../helpers/getDatesForMonth';
import { GroupContent } from '../../components/ContentLayout/GroupContent';

export const Account = () => {
  const theme = useTheme();
  const { accountId } = useParams();
  const { getAccountById } = useAccounts();
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const account = getAccountById(accountId);

  // For the dates and date picker
  const date = new Date();
  const [selectedMonth, setSelectedMonth] = useState({
    name: date.toLocaleString('default', { month: 'long' }),
    month: date.getMonth(),
    year: date.getFullYear(),
  });
  const [dates, setDates] = useState([]);
  useEffect(() => {
    if (selectedMonth.month !== undefined && selectedMonth.year !== undefined) {
      setDates(getDatesForMonth(selectedMonth.month, selectedMonth.year));
    }
  }, [selectedMonth]);

  return (
    <PageLayout linkText="Accounts" linkLocation={'/accounts'}>
      <Card style={{ position: 'relative' }}>
        <InfoIcon onClick={() => setShowAccountDetails(!showAccountDetails)} />
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
        startDate={account.createdAt}
        onMonthChange={setSelectedMonth}
      />
      <Card>
        <Heading size={2}>{selectedMonth.name} overview</Heading>
        <ExpensesBars
          expenses={[
            {
              label: 'Income',
              value: Math.floor(Math.random() * 10001),
              color: theme.colors.success,
            },
            {
              label: 'Spent',
              value: Math.floor(Math.random() * 10001),
              color: theme.colors.warning,
            },
          ]}
        />
      </Card>
      <GroupContent>
        {[...dates].reverse().map((date, index) => (
          <DaySeparator
            key={index}
            date={date.toLocaleDateString('en-GB', {
              // weekday: 'short',
              day: '2-digit',
              month: 'short',
            })}
          />
        ))}
      </GroupContent>
    </PageLayout>
  );
};
