import styled from 'styled-components';

import { Link } from 'react-router-dom';

const smallNavBreakpoint = '768px';

export const NavBarBackground = styled.nav`
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.secondary};

  height: ${({ open }) => (open ? '100vh' : '60px')};
  width: 100%;
  padding: 0 20px;
  min-width: ${({ theme }) => theme.sizes.ms};

  box-shadow: ${({ open }) => (open ? '0 5px 25px 15px rgba(0, 15, 33, 0.5)' : 'none')};

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
`;

export const NavSpacer = styled.div`
  flex-grow: 1;
  @media (max-width: ${smallNavBreakpoint}) {
    display: none;
  }
`;

export const NavLinkContainer = styled.div`
  display: flex;
  gap: 2em;
  flex-direction: column;
  position: absolute;
  gap: 24px;
  width: 100%;
  height: 100vh;
  margin-top: 60px;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: all 0.3s ease-in-out;
`;

// this specifically styles a react router link to prevent the page reloading when the link is clicked
export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textWhite};
  cursor: pointer;
  /* on mobile disable links when burger menu closed */
  @media (max-width: ${smallNavBreakpoint}) {
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  }

  :hover {
    color: ${({ theme }) => theme.colors.textWhite};
  }
`;
