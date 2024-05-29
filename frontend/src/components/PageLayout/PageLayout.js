import PropTypes from 'prop-types'
import { Heading } from '../Heading/Heading'
import { Link } from '../Link/Link'
import { Container } from './PageLayout.style'

export const PageLayout = ({ children, heading, linkText, linkLocation }) => {
  return (
    <Container>
      {linkLocation && linkText && (
        <Link backLink location={linkLocation}>
          {linkText}
        </Link>
      )}
      {heading && <Heading>{heading}</Heading>}
      {children}
    </Container>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string,
  linkText: PropTypes.string,
  linkLocation: PropTypes.string,
};
