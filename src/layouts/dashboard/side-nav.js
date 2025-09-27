import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Stack,
  Typography,
  Grid,
  Button
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { SideNavItem } from './side-nav-item';
import * as React from 'react';
import { usePopover } from 'src/hooks/use-popover';
import { Layout as AuthLayout } from '../auth/layout';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Information from '../../pages/information';
import TermsAndConditions from '../../pages/terms';
import PrivacyPolicy from '../../pages/privacy';
import { useAudioContext } from '../../utils/audioContext';
import { NavbarContext } from '../../contexts/navbar-context';
import { useGameInstance } from '../../contexts/game-context';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

export const SideNav = () => {
  const { isSoundOn, toggleSound } = useAudioContext();
  const { instance } = useGameInstance();

  // console.log('useGameInstance() instance: ', instance);

  const { isAuthenticated, signOut } = useAuth();
  const pathname = usePathname();
  const accountPopover = usePopover();
  const [bar, setBar] = React.useState(false);

  const { isOpen: navExpand, toggleNavbar } = useContext(NavbarContext);

  const [accountPopoverOpen, setAccountPopoverOpen] = React.useState(true);
  const router = useRouter();
// info dialogue box stat and functions
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
// privacy policy and terms and conditions dialogue:
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const handlePrivacyOpen = () => {
    setOpenPrivacy(true);
  };

  const handlePrivacyClose = () => {
    setOpenPrivacy(false);
  };

  const handleTermsOpen = () => {
    setOpenTerms(true);
  };

  const handleTermsClose = () => {
    setOpenTerms(false);
  };

  //expand navabr
  console.log("instance",instance);
  const clearPlayerPref = async () => {
    const logout = await toast.loading('Logging out....');
    if (instance) {
      console.log('instance', instance);
      instance.SendMessage('NetworkAPIManager', 'DeleteAllPlayerPref');
    }
    localStorage.removeItem('token');
    // localStorage.clear();
    toast.dismiss(logout);
    setTimeout(() => {
      router.replace('/login');
    }, 500);
    // window.location.reload();

  };
  // unity function call
  const handleToggleSound = () => {
    toggleSound();
    if (instance) {
      instance.SendMessage('NetworkAPIManager',
        'soundControl',
        JSON.stringify({ soundState: isSoundOn ? 0 : 1 }));
    }
  };

  useEffect(() => {
    if (instance) {
      instance.SendMessage('NetworkAPIManager',
        'soundControl',
        JSON.stringify({ soundState: isSoundOn ? 1 : 0 }));
    }
  }, [instance]);

  const items = [
    {
      // title: 'Game',
      activeTitle: (<img src={`${WEB_URL}/GameOrange.svg`} alt="game" width="100%" height="22"/>),
      disableTitle: (<img src={`${WEB_URL}/Gamepink.svg`} alt="game" width="100%" height="22"/>),
      path: '/',
      icon: (
        <img src={`${WEB_URL}/game.png`} alt="game" width="30"/>
      )
    }
  ];

  if (isAuthenticated) {
    items.push(
      {
        // title: 'Account',
        activeTitle: (
          <img src={`${WEB_URL}/accountOrange.svg`} alt="account" width="100%" height="22"/>),
        disableTitle: (
          <img src={`${WEB_URL}/accountPink.svg`} alt="account" width="100%" height="22"/>),
        path: '/account',
        icon: (
          <img src={`${WEB_URL}/user.png`} alt="account" width="30"/>
        )
      },
      {
        // title: 'Shop',
        activeTitle: (<img src={`${WEB_URL}/shopOrange.svg`} alt="shop" width="100%" height="22"/>),
        disableTitle: (<img src={`${WEB_URL}/shopPink.svg`} alt="shop" width="100%" height="22"/>),
        path: '/shop',
        icon: (
          <img src={`${WEB_URL}/shopIcon.png`} alt="shop" width="30"/>
        )

      },
      {
        // title: 'Logout',
        activeTitle: (
          <img src={`${WEB_URL}/LogoutOrange.svg`} alt="logout" width="100%" height="22"/>),
        disableTitle: (
          <img src={`${WEB_URL}/LogoutPink.svg`} alt="logout" width="100%" height="22"/>),
        // path: '/',
        icon: (
          <img src={`${WEB_URL}/logout.png`} alt="logout" width="30"/>
        ),
        onClick: function () {
          signOut();
          clearPlayerPref();
        }
      }
    );
  } else {
    items.push(
      {
        // title: 'Login',
        activeTitle: (
          <img src={`${WEB_URL}/loginOrange.svg`} alt="login" width="100%" height="22"/>),
        disableTitle: (
          <img src={`${WEB_URL}/loginPink.svg`} alt="login" width="100%" height="22"/>),
        path: '/login',
        icon: (
          <img src={`${WEB_URL}/Login.png`} alt="login" width="30"/>
        )
      }
    );
  }

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: '#ED811A'
        }
      }}
    >
      {/*navbar box*/}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%'
        }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start'
        }}>
          <Box onClick={handleClickOpen}>
            <Information/>
          </Box>
          {/*expand menu icon*/}
          <Box sx={{ width: '100%', textAlign: 'right' }}
               onClick={toggleNavbar}>
            <img src={`${WEB_URL}/expandMenu3.png`} alt="menu expand" width="30"
                 style={{ cursor: 'pointer' }}/>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              pb: 2
            }}
          >
            <Logo/>
          </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
          <img src={`${WEB_URL}/wendycrash.png`}
               width="90%"/>
        </Box>
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item, index) => (
              <SideNavItem
                key={index}
                active={item.path === pathname}
                path={item.path}
                icon={item.icon}
                activeTitle={item.activeTitle}
                disableTitle={item.disableTitle}
                onClick={item.onClick}
              />
            ))}
            <Button onClick={handleToggleSound}>
              <Box sx={{ display: 'flex', justifyContent: 'space- between', width: '100%' }}>
                <img style={{ marginLeft: '7px' }}
                     src={`${WEB_URL}/sound${isSoundOn ? 'On' : 'Off'}.png`} alt="sound control"
                     width="25"/>
                <img style={{ marginRight: '74px' }}
                     src={`${WEB_URL}/sound${isSoundOn ? 'OnPink' : 'OffOrange'}.svg`}
                     alt="sound control" width="100%" height="22"/>
              </Box>
            </Button>
          </Stack>
        </Box>
        <Box sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'auto'
        }}>
          <Typography sx={{
            display: 'flex',
            color: '#AD2F91',
            fontFamily: 'Tahoma',
            fontSize: { xs: '13px', sm: '13px', md: '13px', lg: '13px', xl: '13px' },
            '@media (min-width: 1201px) and (max-height: 1353px)': {
              fontSize: '13px'
            },
            // Override fontSize for specific screen sizes
            '@media (min-width: 1280px) and (max-height: 800px)': {
              display: 'flex'
            },
            '@media (min-width: 1203px) and (max-height: 1360px)': {
              fontSize: '13px'
            },
            width: 'auto'
          }}>
            <span onClick={handlePrivacyOpen} style={{ cursor: 'pointer' }}>Privacy Policy</span><b
            style={{ color: '#EC821B', marginLeft: 5, marginRight: 5 }}>|</b> <span
            onClick={handleTermsOpen} style={{ cursor: 'pointer' }}>Terms and Conditions</span>

            <PrivacyPolicy open={openPrivacy} onClose={handlePrivacyClose}/>
            <TermsAndConditions open={openTerms} onClose={handleTermsClose}/>

            {/*<Box onClick={handlePrivacyOpen}>*/}
            {/*  <PrivacyPolicy/>*/}
            {/*</Box>*/}
            {/*<Box onClick={handleTermsOpen}>*/}
            {/*  <TermsAndConditions/>*/}
            {/*</Box>*/}
          </Typography>
        </Box>
      </Box>
    </Scrollbar>
  );
  return (
    <>
      <Grid container className="Sidebar"
      >
        {
          !navExpand && (
            <img
              src={`${WEB_URL}/expandMenu4.png`}
              alt="menu expand"
              width="30"
              style={{ cursor: 'pointer', position: 'absolute' }}
              onClick={toggleNavbar}
            />
          )
        }
        <Drawer
          anchor="left"
          onClose={toggleNavbar}
          open={navExpand}
          PaperProps={{
            sx: {
              backgroundColor: 'rgb(253,229,209)',
              border: '7px solid rgb(173, 47, 145)',
              borderRadius: router.pathname === '/' ? '0' : '0 20px 20px 0',
              width: 310
            }
          }}
          variant="persistent"
        >
          {content}
        </Drawer>
      </Grid>
    </>
  );
};
SideNav.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);
SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};