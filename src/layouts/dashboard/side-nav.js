import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Stack,
  Typography,
  Grid,
  Button,
  Collapse,
  Divider
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { SideNavItem } from './side-nav-item';
import * as React from 'react';
import { usePopover } from 'src/hooks/use-popover';
import { Layout as AuthLayout } from '../auth/layout';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Information from '../../pages/information';
import TermsAndConditions from '../../pages/terms';
import PrivacyPolicy from '../../pages/privacy';
import { useAudioContext } from '../../utils/audioContext';
import { NavbarContext } from '../../contexts/navbar-context';
import { useGameInstance } from '../../contexts/game-context';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

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
      title: 'Dashboard',
      path: '/dashboard',
      icon: (<DashboardOutlinedIcon sx={{ fontSize: 22, color: 'inherit' }}/>)
    },
    {
      title: 'Billings',
      path: '/billings',
      icon: (<ReceiptLongOutlinedIcon sx={{ fontSize: 22, color: 'inherit' }}/>)
    }
  ];
  // Mark Billings as active when on checkout as well
  const normalizedPathname = pathname === '/checkout' ? '/billings' : pathname;

  const [loftOpen, setLoftOpen] = React.useState(true);
  const isLoftRoute = typeof pathname === 'string' && pathname.startsWith('/loft/');
  const loftChildren = [
    { title: 'Living Room', path: '/loft/living-room', icon: (<WeekendOutlinedIcon sx={{ fontSize: 22, color: 'inherit' }}/>) },
    { title: 'Pathway', path: '/loft/pathway', icon: (<EmojiObjectsOutlinedIcon sx={{ fontSize: 22, color: 'inherit' }}/>) },
    { title: 'Bedroom', path: '/loft/bedroom', icon: (<BedOutlinedIcon sx={{ fontSize: 22, color: 'inherit' }}/>) },
    { title: 'Media Room', path: '/loft/media-room', icon: (<MovieOutlinedIcon sx={{ fontSize: 22, color: 'inherit' }}/>) },
    { title: 'Kitchen', path: '/loft/kitchen', icon: (<RestaurantOutlinedIcon sx={{ fontSize: 22, color: 'inherit' }}/>) },
    { title: 'Closet/Store', path: '/loft/closet-store', icon: (<Inventory2OutlinedIcon sx={{ fontSize: 22, color: 'inherit' }}/>) }
  ];

  // if (isAuthenticated) {
  //   items.push(
  //     {
  //       title: 'Account',
  //       // activeTitle: (
  //       //   <img src={`${WEB_URL}/accountOrange.svg`} alt="account" width="100%" height="22"/>),
  //       // disableTitle: (
  //       //   <img src={`${WEB_URL}/accountPink.svg`} alt="account" width="100%" height="22"/>),
  //       path: '/account',
  //       // icon: (
  //       //   <img src={`${WEB_URL}/user.png`} alt="account" width="30"/>
  //       // )
  //     },
  //     {
  //       title: 'Account',
  //       // activeTitle: (
  //       //   <img src={`${WEB_URL}/accountOrange.svg`} alt="account" width="100%" height="22"/>),
  //       // disableTitle: (
  //       //   <img src={`${WEB_URL}/accountPink.svg`} alt="account" width="100%" height="22"/>),
  //       path: '/account',
  //       // icon: (
  //       //   <img src={`${WEB_URL}/user.png`} alt="account" width="30"/>
  //       // )
  //     },
  //     {
  //       title: 'Account',
  //       // activeTitle: (
  //       //   <img src={`${WEB_URL}/accountOrange.svg`} alt="account" width="100%" height="22"/>),
  //       // disableTitle: (
  //       //   <img src={`${WEB_URL}/accountPink.svg`} alt="account" width="100%" height="22"/>),
  //       path: '/account',
  //       // icon: (
  //       //   <img src={`${WEB_URL}/user.png`} alt="account" width="30"/>
  //       // )
  //     },
  //   );
  // } else {
  //   items.push(
  //     {
  //       title: 'Account',
  //       // activeTitle: (
  //       //   <img src={`${WEB_URL}/accountOrange.svg`} alt="account" width="100%" height="22"/>),
  //       // disableTitle: (
  //       //   <img src={`${WEB_URL}/accountPink.svg`} alt="account" width="100%" height="22"/>),
  //       path: '/account',
  //       // icon: (
  //       //   <img src={`${WEB_URL}/user.png`} alt="account" width="30"/>
  //       // )
  //     },
  //   );
  // }

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: '#FF80C3'
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 2 }}>
          {/* <Logo height={20}/> */}
          <Link href="/" style={{ display: 'inline-flex' }}>
            <img src="/hd.png" alt="Logo" style={{ width: '50%', cursor: 'pointer' }} />
          </Link>
          <Box onClick={toggleNavbar} sx={{ cursor: 'pointer' }}>
            <ChevronLeftIcon sx={{ color: '#FF80C3' }}/>
          </Box>
        </Box>
        {/* <Box sx={{ px: 2, pt: 1, pb: 2 }}>
          <Typography variant="caption" sx={{ color: '#93C5FD' }}>Pages</Typography>
        </Box> */}
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 1
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
            {/* Top-level: Dashboard */}
            {items.slice(0,1).map((item, index) => (
              <SideNavItem
                key={index}
                active={item.path === normalizedPathname}
                path={item.path}
                icon={item.icon}
                title={item.title}
                onClick={item.onClick}
              />
            ))}

            {/* Loft Editor dropdown */}
            <li>
              <Button
                onClick={() => setLoftOpen((prev) => !prev)}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  color: '#E5E7EB',
                  width: '100%',
                  px: '12px',
                  py: '8px',
                  backgroundColor: 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255,128,195,0.15)' }
                }}
              >
                <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: '#E5E7EB' }}>
                  <DesignServicesOutlinedIcon sx={{ fontSize: 22, color: '#FF80C3' }}/>
                </Box>
                <Typography variant="body2" sx={{ color: '#E5E7EB', fontWeight: 700}}>
                  Loft Editor
                </Typography>
                {loftOpen ? <ExpandLessIcon sx={{ color: '#FF80C3' }}/> : <ExpandMoreIcon sx={{ color: '#FF80C3' }}/>}
              </Button>
            </li>
            <Collapse in={loftOpen} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 3 }}>
                {loftChildren.map((child, idx) => (
                  <SideNavItem
                    key={`loft-${idx}`}
                    active={child.path && normalizedPathname === child.path}
                    path={child.path}
                    icon={child.icon}
                    title={child.title}
                  />
                ))}
              </Box>
            </Collapse>

            {/* Remaining items */}
            {items.slice(1).map((item, index) => (
              <SideNavItem
                key={`rest-${index}`}
                active={item.path === normalizedPathname}
                path={item.path}
                icon={item.icon}
                title={item.title}
                onClick={item.onClick}
              />
            ))}
            {/* <Button onClick={handleToggleSound}>
              <Box sx={{ display: 'flex', justifyContent: 'space- between', width: '100%' }}>
                <img style={{ marginLeft: '7px' }}
                     src={`${WEB_URL}/sound${isSoundOn ? 'On' : 'Off'}.png`} alt="sound control"
                     width="25"/>
                <img style={{ marginRight: '74px' }}
                     src={`${WEB_URL}/sound${isSoundOn ? 'OnPink' : 'OffOrange'}.svg`}
                     alt="sound control" width="100%" height="22"/>
              </Box>
            </Button> */}
          </Stack>
        </Box>
        <Box sx={{ px: 2, pb: 2 }}>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 1 }} />
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {isAuthenticated ? (
              <SideNavItem
                icon={<LogoutOutlinedIcon sx={{ fontSize: 22, color: 'inherit' }}/>} 
                title="Logout"
                onClick={() => { try { signOut(); } finally { router.replace('/'); } }}
              />
            ) : (
              <SideNavItem
                icon={<LoginOutlinedIcon sx={{ fontSize: 22, color: 'inherit' }}/>} 
                title="Login"
                onClick={() => router.replace('/login')}
              />
            )}
          </Stack>
        </Box>
        {/* <Box sx={{ p: 2 }}>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }}/>
          <Typography sx={{ color: '#9CA3AF', mt: 2 }} variant="caption">
            <span onClick={handlePrivacyOpen} style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <b style={{ color: '#EC821B', marginLeft: 5, marginRight: 5 }}>|</b>
            <span onClick={handleTermsOpen} style={{ cursor: 'pointer' }}>Terms and Conditions</span>
          </Typography>
          <PrivacyPolicy open={openPrivacy} onClose={handlePrivacyClose}/>
          <TermsAndConditions open={openTerms} onClose={handleTermsClose}/>
        </Box> */}
      </Box>
    </Scrollbar>
  );
  return (
    <>
      <Grid container className="Sidebar"
      >
        { !navExpand && (
          <ChevronRightIcon
              onClick={toggleNavbar}
            sx={{
              position: 'absolute',
              cursor: 'pointer',
              color: '#FF80C3',
              fontSize: 28
            }}
          />
        )}
        <Drawer
          anchor="left"
          onClose={toggleNavbar}
          open={navExpand}
          PaperProps={{
            sx: {
              backgroundColor: '#001D2D',
              border: '0',
              borderRadius: 0,
              width: 300
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