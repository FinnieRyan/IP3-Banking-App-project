import PropTypes from 'prop-types';
import { Heading } from '../Heading/Heading';
import { Link } from '../Link/Link';
import { Container } from './PageLayout.style';

export const PageLayout = ({ children }) => {
  return (
    <Container>
      <Link backLink>Back link</Link>
      <Heading>App heading</Heading>
      {children}
    </Container>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
