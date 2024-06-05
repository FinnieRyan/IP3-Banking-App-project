// React and React Router
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { Button } from '../../components/Button/Button';
import { Text } from '../../components/Text/Text';
import { Heading } from '../../components/Heading/Heading';
import { Link } from '../../components/Link/Link';
import { Spacer } from '../../components/ContentLayout/Spacer';
import { GroupContent } from '../../components/ContentLayout/GroupContent';

// Assets
import { ReactComponent as OopsImg } from '../../common/assets/oops.svg';

export const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <PageLayout>
      <OopsImg style={{ width: '100%', height: '250px' }} />
      <Heading>Oops, this page is all tangled up!</Heading>
      <Text>
        We're sorry, but the page you're looking for doesn't seem to exist. You
        can use the button below or the menu bar to navigate back to the
        homepage.
      </Text>
      <GroupContent>
        <Text>Or check out some of our popular pages:</Text>
        <Link location="/accounts">Accounts</Link>
        <Link location="/transfer-money">Transfer money</Link>
      </GroupContent>
      <GroupContent>
        <Text>Still can't find what you're looking for?</Text>
        <Link isExternal location="/contact">
          Contact us
        </Link>
      </GroupContent>
      <Spacer />
      <Button onClick={handleClick}>Go back to home</Button>
    </PageLayout>
  );
};
