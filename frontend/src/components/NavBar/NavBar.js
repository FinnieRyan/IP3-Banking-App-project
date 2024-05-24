import { useState, useEffect } from 'react';

// STYLES
import { NavBarBackground, NavContent, NavLinkContainer, NavSpacer } from './NavBar.style';

// COMPONENTS
import { Burger } from './Burger';
import { Heading } from '../Heading/Heading';
import { Link } from '../Link/Link';

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
            <Link white={true}>Link 1</Link>
            <Link white>Link 2</Link>
          </NavLinkContainer>
        </NavContent>
      </NavBarBackground>
      <div style={{ height: '60px' }} />
    </>
  );
};
