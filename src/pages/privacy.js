import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { Paper } from '@mui/material';
import PrivacyContent from './privacyContent';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import TermsAndConditions from './terms';
import { NavbarContext } from '../contexts/navbar-context';
import { useContext } from 'react';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function PrivacyPolicy({ open, onClose }) {
  const { isOpen } = useContext(NavbarContext);
  const [openPrivacy, setOpenPrivacy] = React.useState(false);
  const handlePrivacyOpen = () => {
    setOpenPrivacy(true);
  };
  const handlePrivacyClose = () => {
    setOpenPrivacy(false);
  };

  return (
    <>
      {/*<span onClick={handlePrivacyOpen} style={{ cursor: 'pointer' }}>Privacy Policy</span><b*/}
      {/*style={{ color: '#EC821B', marginLeft: 5, marginRight: 5 }}>|</b>*/}
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        // open={openPrivacy}
        // onClose={handlePrivacyClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            backgroundColor: 'rgb(173, 47, 145)',
            // marginLeft: { md: '310px', lg: '310px', xl: '310px', sm: 0, xs: 0 },
            marginLeft: {
              md: isOpen ? '310px' : 0,
              lg: isOpen ? '310px' : 0,
              xl: isOpen ? '310px' : 0,
              sm: 0,
              xs: 0
            },
            border: '7px solid rgb(173, 47, 145)',
            borderRadius: '20px',
            width: {
              md: isOpen ? '75%' : '90%', // Change width dynamically
              lg: isOpen ? '75%' : '90%',
              xl: isOpen ? '75%' : '90%',
              sm: '100%',
              xs: '100%'
            },
            // width: { md: '75%', lg: '75%', xl: '75%', xs: '75%', sm: '75%' },
            '@media (min-width: 900px) and (max-width: 1330px)': {
              width: '60%'
            },
            '@media (min-width: 2130px)': {
              width: '80%'
            },
            height: '90%',
            mt: 5,
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#AD2F91' }}>
          <Toolbar sx={{ bgcolor: '#AD2F91' }}>
            <Typography
              sx={{
                ml: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                fontSize: { md: '2rem', lg: '2rem', xl: '2rem', sm: '1rem', xs: '1rem' }
              }} variant="h4" component="div">
              Privacy Policy and Cookie Policy
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper
          sx={{
            backgroundColor: '#FDE5D1',
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography color="text.secondary" variant="body2" sx={{ ml: 2, flex: 1 }}
                      component="div">
            <PrivacyContent/>
          </Typography>
        </Paper>
      </Dialog>

    </>
  );
}
// PrivacyPolicy.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );