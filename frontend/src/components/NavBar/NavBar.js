import { useState, useEffect } from 'react';

// STYLES
import { NavBarBackground, NavContent, NavLinkContainer, NavSpacer } from './NavBar.style';

// COMPONENTS
import { Burger } from './Burger';
import { Heading } from '../Heading/Heading';
import { Link } from '../Link/Link';
import { useLocation, useNavigate } from 'react-router-dom';

export const NavBar = () => {
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

  return (
    <>
      <NavBarBackground open={open}>
        <NavContent onMouseLeave={() => setOpen(false)}>
          <Burger open={open} setOpen={setOpen} />
          <NavSpacer />
          <Heading color="white" onClick={() => navigate('/')}>
            FinWise
          </Heading>
          {open && (
            <NavLinkContainer open={open}>
              <Link white location="/">
                Home
              </Link>
              <Link white location="/accounts">
                Accounts
              </Link>
            </NavLinkContainer>
          )}
        </NavContent>
      </NavBarBackground>
      <div style={{ height: '60px' }} />
    </>
  );
};
