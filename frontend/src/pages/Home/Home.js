import React from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { GroupContent } from '../../components/ContentLayout/GroupContent';
import { Card } from '../../components/Card/Card';
import { Heading } from '../../components/Heading/Heading';
import { Text } from '../../components/Text/Text';
import { Link } from '../../components/Link/Link';
import { ActionCard } from '../../components/ActionCard/ActionCard';
import { useNavigate } from 'react-router-dom';
import pound from '../../assets/pound.svg';

export const Home = () => {
  const navigate = useNavigate();

  const actionCardNavigate = () => {
    navigate('/accounts/current');
  };

  return (
    <PageLayout>
      <Card>
        <Heading>
          Welcome back, <br /> Name
        </Heading>
      </Card>
      <GroupContent>
        <Heading size={5}>Quick links</Heading>
        <ActionCard icon={pound} content="Current Account" subContent="£X" action={actionCardNavigate} />
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
            So far you have spent <strong>£X</strong> this month
          </Text>
          <Heading size={3}>Trends in your spending</Heading>
        </Card>
      </GroupContent>
    </PageLayout>
  );
};
