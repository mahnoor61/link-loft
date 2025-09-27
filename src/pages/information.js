import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import {
  Box,
  Paper
} from '@mui/material';
import AboutUsContent from './aboutUsContent';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Information() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleClickOpen}>
        <img src={`${WEB_URL}/info.png`} width="30" style={{ cursor: 'pointer' }}/>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        // color="black"
        // paperprops is used in dialogue for styling
        PaperProps={{
          sx: {
            backgroundColor: ' rgb(173, 47, 145)',
            marginLeft: { md: '310px', lg: '310px', xl: '310px', sm: 0, xs: 0 },
            border: '7px solid rgb(173, 47, 145)',
            borderRadius: '20px',
            width: { md: '75%', lg: '75%', xl: '75%', xs: '75%', sm: '75%' },
            '@media (min-width: 900px) and (max-width: 1330px)': {
              width: '60%'
            },
            '@media (min-width: 2130px)': {
              width: '80%'
            },
            height: '90%',
            mt: 5
          }
        }}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#AD2F91' }}>
          <Toolbar sx={{ bgcolor: '#AD2F91' }}>
            <Typography sx={{
              ml: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              fontSize: { md: '2rem', lg: '2rem', xl: '2rem', sm: '1rem', xs: '1rem' }
            }} variant="h4" component="div">
              About Us
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper
          sx={{
            backgroundColor: '#FDE5D1'   ,
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Typography color="text.secondary"
                      variant="body2" sx={{ ml: {md: 2 ,lg:2, xl:2, xs:1, sm:1}, flex: 1, p: 2 }} component="div">
            <AboutUsContent/>
          </Typography>
        </Paper>
      </Dialog>
    </>
  );
}
