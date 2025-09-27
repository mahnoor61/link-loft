import { useCallback, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SideNav } from './side-nav';
import { NavbarContext } from '../../contexts/navbar-context';
import { Box } from '@mui/material';

let SIDE_NAV_WIDTH = '308px';

// export const Layout = withAuthGuard((props) => {
export const Layout = (props) => {

  const { isOpen } = useContext(NavbarContext);

  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    [pathname]
  );

  return (
    <>
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          maxWidth: '100%',
          flexDirection: 'column',
          width: { md: '100%', lg: '100%', xl: '100%', xs: '101%', sm: '101%' },
          '@media (max-width: 912px)': {
            width: '101%'
          },
          paddingLeft: {
            md: isOpen ? SIDE_NAV_WIDTH : 0,
            lg: isOpen ? SIDE_NAV_WIDTH : 0,
            xl: isOpen ? SIDE_NAV_WIDTH : 0
          },
          /* Smartphones */
          '@media (max-width: 767px)': {
            paddingLeft: 0
          },
          /* Tablets */
          '@media (min-width: 768px) and (max-width: 1024px)': {
            paddingLeft: 0
          },
          /* Small laptops */
          '@media (min-width: 1024px) and (max-width: 1200px)': {
            paddingLeft: 0
          },
          /* Desktops and large laptops */
          ' @media (min-width: 1200px)': {
            paddingLeft: isOpen ? SIDE_NAV_WIDTH : 0
          },
          /* Ultra-wide monitors */
          '@media (min-width: 2560px)': {
            paddingLeft: isOpen ? SIDE_NAV_WIDTH : 0
          }
        }}>
        {children}
      </Box>
    </>
  );
};
