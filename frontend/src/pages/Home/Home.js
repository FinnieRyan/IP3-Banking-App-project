import React from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { GroupContent } from '../../components/ContentLayout/GroupContent';
import { Card } from '../../components/Card/Card';
import { Heading } from '../../components/Heading/Heading';
import { Text } from '../../components/Text/Text';
import { Link } from '../../components/Link/Link';
import { ActionCard } from '../../components/ActionCard/ActionCard';
import { useNavigate } from 'react-router-dom';
import SquarePoundSymbol from '../../assets/square-pound-symbol-x2.svg';
import { useCustomer } from '../../hooks/useCustomer';
import { useAccounts } from '../../hooks/useAccounts';

export const Home = () => {
  const navigate = useNavigate();
  const { customerData } = useCustomer();
  const { accountsData } = useAccounts();

  const actionCardNavigate = () => {
    navigate('/accounts/current');
  };

  console.log('accountsData', accountsData);

  return (
    <PageLayout>
      <Card>
        <Heading>
          Welcome back, <br /> {customerData?.forename}
        </Heading>
      </Card>
      <GroupContent>
        <Heading size={5}>Quick links</Heading>
        {accountsData &&
          accountsData.map((account) => (
            <ActionCard
              key={account.id}
              icon={SquarePoundSymbol}
              content={account.accountType}
              subContent={`£${account.balance}`}
              onClick={() => navigate(`/accounts/${account.accountType}`)}
            />
          ))}
        {/* <ActionCard
          icon={SquarePoundSymbol}
          content="Current Account"
          subContent="£X"
          onClick={actionCardNavigate}
        /> */}
        <Link location="/accounts">View all accounts</Link>
      </GroupContent>
      <GroupContent>
        <Heading size={5}>Your money</Heading>
        <Card>
          <Heading size={2}>Today at a glance</Heading>
          <Text>
            So far you have spent <strong>£X</strong> today
          </Text>
        </Card>
        <Card>
          <Heading size={2}>X overview</Heading>
          <Text>
            So far you this month you have spent <br /> <strong>£X</strong>
          </Text>
          <Heading size={3}>Trends in your spending</Heading>
          <Text>Graph</Text>
        </Card>
      </GroupContent>
    </PageLayout>
  );
};
