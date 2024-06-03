import PropTypes from 'prop-types';

// ICONS
import { FiExternalLink } from 'react-icons/fi';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

// STYLES
import { LinkContainer } from './Link.style';

export const Link = ({
  children,
  location,
  backLink = false,
  isExternal = false,
  inline = false,
  white = false,
  ...props
}) => {
  return (
    <>
      {isExternal ? (
        <LinkContainer
          to={location}
          target="_blank"
          rel="noreferrer"
          inline={inline}
          $white={white}
          {...props}
        >
          <FiExternalLink style={{ fontSize: '18px' }} />
          {children}
        </LinkContainer>
      ) : (
        <>
          {backLink ? (
            <LinkContainer
              to={location}
              inline={inline}
              style={{ marginLeft: '-8px' }}
              $white={white}
              {...props}
            >
              {!inline && (
                <FiChevronLeft
                  style={{ fontSize: '24px', position: 'relative', top: '1px' }}
                />
              )}
              {children}
            </LinkContainer>
          ) : (
            <LinkContainer
              to={location}
              inline={inline}
              $white={white}
              {...props}
            >
              {children}
              {!inline && (
                <FiChevronRight
                  style={{ fontSize: '24px', position: 'relative', top: '1px' }}
                />
              )}
            </LinkContainer>
          )}
        </>
      )}
    </>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string.isRequired,
  backLink: PropTypes.bool,
  isExternal: PropTypes.bool,
  inline: PropTypes.bool,
  white: PropTypes.bool,
};
