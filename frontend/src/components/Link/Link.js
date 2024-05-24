import PropTypes from 'prop-types'

// ICONS
import { FiExternalLink } from 'react-icons/fi'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'

// STYLES
import { LinkContainer, LinkText } from './Link.style'

export const Link = ({
  children,
  location,
  backLink = false,
  isExternal = false,
  inline = false,
  white = false,
}) => {
  return (
    <>
      {isExternal ? (
        <LinkContainer
          to={location}
          target="_blank"
          rel="noreferrer"
          inline={inline}
          white={white}
        >
          <FiExternalLink style={{ fontSize: '18px' }} />
          <LinkText> {children}</LinkText>
        </LinkContainer>
      ) : (
        <>
          {backLink ? (
            <LinkContainer
              to={location}
              inline={inline}
              style={{ marginLeft: '-8px' }}
              white={white}
            >
              {!inline && <FiChevronLeft style={{ fontSize: '24px' }} />}
              <LinkText>{children}</LinkText>
            </LinkContainer>
          ) : (
            <LinkContainer to={location} inline={inline} white={white}>
              <LinkText>{children}</LinkText>
              {!inline && <FiChevronRight style={{ fontSize: '24px' }} />}
            </LinkContainer>
          )}
        </>
      )}
    </>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string.isRequired,
  backLink: PropTypes.bool,
  isExternal: PropTypes.bool,
  inline: PropTypes.bool,
  white: PropTypes.bool,
}
