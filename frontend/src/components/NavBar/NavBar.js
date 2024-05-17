import { useState, useEffect } from 'react';

// STYLES
import { NavBarBackground, NavContent, NavLinkContainer, NavLink, NavSpacer } from './NavBar.style';

// COMPONENTS
import { Burger } from './Burger';
import { Heading } from '../Heading/Heading';

export const NavBar = () => {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <NavBarBackground open={open}>
        <NavContent onMouseLeave={() => setOpen(false)}>
          <Burger open={open} setOpen={setOpen} />
          <NavSpacer />
          <Heading white>FinWise</Heading>
          <NavLinkContainer open={open}>
            <NavLink to={'/'} open={open} onClick={() => setOpen(false)}>
              Link 1
            </NavLink>
            <NavLink to={'/'} open={open} onClick={() => setOpen(false)}>
              Link 2
            </NavLink>
          </NavLinkContainer>
        </NavContent>
      </NavBarBackground>
      <div style={{ height: '60px' }} />
    </>
  );
};
