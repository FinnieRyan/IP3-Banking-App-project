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
        <>
          {backLink ? (
            <LinkContainer to={location} inline={inline}>
              {!inline && <FiChevronLeft style={{ fontSize: '24px' }} />}
              <LinkText>{children}</LinkText>
            </LinkContainer>
          ) : (
            <LinkContainer to={location} inline={inline}>
              <LinkText>{children}</LinkText>
              {!inline && <FiChevronRight style={{ fontSize: '24px' }} />}
            </LinkContainer>
          )}
        </>
      )}
    </>
  );
};
