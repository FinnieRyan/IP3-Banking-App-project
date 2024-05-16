// ICONS
import { FiExternalLink } from 'react-icons/fi';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

// STYLES
import { LinkContainer, LinkText } from './Link.style';

export const Link = ({ children, location, backLink, isExternal, inline }) => {
  return (
    <>
      {isExternal ? (
        <LinkContainer to={location} target="_blank" rel="noreferrer" inline={inline}>
          <FiExternalLink style={{ fontSize: '18px' }} />
          <LinkText> {children}</LinkText>
        </LinkContainer>
      ) : (
        <LinkContainer to={location} inline={inline}>
          {backLink ? (
            <LinkText>
              {!inline && <FiChevronLeft style={{ fontSize: '22px', verticalAlign: '-20%', marginLeft: '-2px' }} />}
              {children}
            </LinkText>
          ) : (
            <LinkText>
              {children}
              {!inline && <FiChevronRight style={{ fontSize: '22px', verticalAlign: '-20%', marginLeft: '-2px' }} />}
            </LinkText>
          )}
        </LinkContainer>
      )}
    </>
  );
};
