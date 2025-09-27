import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import Content from './termAndConditionContent';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { NavbarContext } from '../contexts/navbar-context';
import Page from './shop';
import { useContext } from 'react';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function TermsAndConditions({ open, onClose }) {
  const { isOpen } = useContext(NavbarContext);
  const [openTerms, setOpenTerms] = React.useState(false);
  const handleTermsOpen = () => {
    setOpenTerms(true);
  };
  const handleTermsClose = () => {
    setOpenTerms(false);
  };

  return (
    <>
      {/*<span onClick={handleTermsOpen} style={{ cursor: 'pointer' }}>Terms and Conditions</span>*/}
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        // open={openTerms}
        // onClose={handleTermsClose}
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
            <Typography sx={{
              ml: 2, display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              fontSize: { md: '2rem', lg: '2rem', xl: '2rem', sm: '1rem', xs: '1rem' }
            }} variant="h4" component="div">
              Terms and Conditions
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{
          backgroundColor: '#FDE5D1',
          flex: 1,
          overflowY: 'auto'
        }}>
          <Content/>
        </Paper>
      </Dialog>
    </>
  );
}
TermsAndConditions.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);