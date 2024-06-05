// React
import { useState, useEffect } from 'react';

// Router and Hooks
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useCustomer } from '../../hooks/useCustomer';
import { useAccounts } from '../../hooks/useAccounts';

// Components and Styles
import { Burger } from './Burger';
import { Link } from '../Link/Link';
import {
  NavBarBackground,
  NavContent,
  NavLinkContainer,
  NavLinkGroup,
  NavLogo,
  NavSpacer,
} from './NavBar.style';

// Assets and Helpers
import Logo from '../../common/assets/Logo.png';
import { removeSessionData } from '../../common/helpers/sessionHandlers';

export const NavBar = () => {
  const { clearAuthUser } = useAuthUser();
  const { clearCustomer } = useCustomer();
  const { clearAccounts, accountsData, isLoading } = useAccounts();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // close the burger menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 626) {
        setOpen(false);
      }
    };
    handleResize(); // call handleResize on mount
    window.addEventListener('resize', handleResize); // add event listener for resize

    return () => window.removeEventListener('resize', handleResize); // remove event listener on unmount
  }, []);

  useEffect(() => {
    setOpen(false); // close the burger menu when the route changes
  }, [location]);

  const logout = () => {
    removeSessionData('loginResponse');
    clearAuthUser();
    clearCustomer();
    clearAccounts();
  };

  return (
    <>
      <NavBarBackground open={open}>
        <NavContent onMouseLeave={() => setOpen(false)}>
          {location.pathname !== '/login' && (
            <Burger open={open} setOpen={setOpen} />
          )}
          <NavSpacer />
          <NavLogo
            src={Logo}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
            alt="FinWise Logo"
          />
          <NavLinkContainer open={open}>
            <Link white location="/">
              Home
            </Link>
            <Link white location="/accounts">
              Accounts
            </Link>
            {location.pathname !== '/login' && (
              <NavLinkGroup>
                {!isLoading &&
                  accountsData?.map((account) => (
                    <Link
                      key={account.id}
                      white
                      location={`/accounts/${account._id}`}
                    >
                      {account.accountType} Account
                    </Link>
                  ))}
                <Link white location="/transfer-money">
                  Transfer Money
                </Link>
              </NavLinkGroup>
            )}
            <Link white location="/login" onClick={logout}>
              Logout
            </Link>
          </NavLinkContainer>
        </NavContent>
      </NavBarBackground>
      <div style={{ height: '60px' }} />
    </>
  );
};
