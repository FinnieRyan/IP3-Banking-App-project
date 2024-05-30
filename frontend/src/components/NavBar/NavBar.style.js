import styled from 'styled-components';

export const NavBarBackground = styled.nav`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;

  background-color: rgb(0 52 125 / 80%);
  backdrop-filter: blur(33px);
  -webkit-backdrop-filter: blur(33px);

  height: ${({ open }) => (open ? '100vh' : '60px')};
  width: 100%;
  min-width: ${({ theme }) => theme.sizes.ms};

  transition: all 0.5s ease-in-out;
`;

export const NavContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 2em;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.tablet};
  align-items: flex-start;
  margin: 0.75rem 0;

  padding: 0 20px;
`;

export const NavLogo = styled.img`
  height: 40px;
  object-fit: contain;
`;

export const NavSpacer = styled.div`
  flex-grow: 1;
`;

export const NavLinkContainer = styled.div`
  display: flex;
  gap: 2em;
  flex-direction: column;
  position: absolute;
  gap: 24px;
  width: 100%;
  height: ${({ open }) => (open ? '100vh' : 0)};
  margin-top: 60px;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-10px)')};
  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
`;

export const NavLinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-left: 1em;
`;
