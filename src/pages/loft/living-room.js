import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import React from 'react';

const Page = () => {
  const [laptopLink, setLaptopLink] = React.useState('');
  const [wallArt1, setWallArt1] = React.useState('');
  const [wallArt2, setWallArt2] = React.useState('');
  const [socials, setSocials] = React.useState([
    { icon: <FacebookOutlinedIcon fontSize="small"/>, url: '' },
    { icon: <PublicOutlinedIcon fontSize="small"/>, url: '' }
  ]);
  const [tvEnabled, setTvEnabled] = React.useState(false);
  const [tvLogo, setTvLogo] = React.useState('');

  // Refs for file inputs so only buttons open the picker
  const wallArt1Ref = React.useRef(null);
  const wallArt2Ref = React.useRef(null);
  const tvLogoRef = React.useRef(null);

  const onUpload = (setter) => (e) => {
    const file = e.target.files?.[0];
    if (file) setter(file.name);
  };

  const addSocial = () => setSocials((prev) => ([...prev, { icon: <PublicOutlinedIcon fontSize="small" />, url: '' }]));
  const updateSocial = (idx, url) => setSocials((prev) => prev.map((s, i) => i === idx ? { ...s, url } : s));

  return (
    <>
      <Head>
        <title>Living Room | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{ backgroundColor: '#FDF1F6', minHeight: '100vh', p: { xs: 2, md: 2 } }}>
        <Container maxWidth="xl">
          {/* <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Loft Editor</Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#6B7280', mb: 2 }}>Loft Editor</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Loft Editor – Living Room</Typography> */}

          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
            <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Loft Editor</Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#6B7280', mb: 2 }}>Loft Editor</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Loft Editor – Living Room</Typography>
              <Card sx={{ borderRadius: 3 }}>
                <Box sx={{
                  width: '100%',
                  aspectRatio: '16 / 15',
                  height: '100%',
                  backgroundImage: 'url(/living.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  // borderRadius: 3
                }} />
              </Card>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ borderRadius: 3}}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>LIVING ROOM EDITOR</Typography>

                  <Stack spacing={1.5}>
                    <TextField
                      label="Laptop Link"
                      value={laptopLink}
                      onChange={(e) => setLaptopLink(e.target.value)}
                      size="small"
                      sx={{
                        cursor: 'pointer',
                        // '& .MuiOutlinedInput-root': {
                        //   '& fieldset': { borderColor: '#FF80C3' },
                        //   '&:hover fieldset': { borderColor: '#FF80C3' },
                        //   '&.Mui-focused fieldset': { borderColor: '#FF80C3' }
                        // }
                      }}
                      InputProps={{ startAdornment: (
                        <InputAdornment position="start"><LaptopMacOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/></InputAdornment>
                      )}}
                    />

                    <Divider sx={{ my: 1 }}/>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        fullWidth
                        size="small"
                        label="Wall Art 1"
                        value={wallArt1}
                        onClick={() => wallArt1Ref.current && wallArt1Ref.current.click()}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <ImageOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/>
                            </InputAdornment>
                          )
                        }}
                       
                      />
                      <input hidden ref={wallArt1Ref} type="file" accept="image/*" onChange={onUpload(setWallArt1)} />
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        fullWidth
                        size="small"
                        label="Wall Art 2"
                        value={wallArt2}
                        onClick={() => wallArt2Ref.current && wallArt2Ref.current.click()}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <ImageOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/>
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#FF80C3' },
                            '&:hover fieldset': { borderColor: '#FF80C3' },
                            '&.Mui-focused fieldset': { borderColor: '#FF80C3' }
                          }
                        }}
                      />
                      <input hidden ref={wallArt2Ref} type="file" accept="image/*" onChange={onUpload(setWallArt2)} />
                    </Stack>

                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#6B7280' }}>LinkPod (Social Grid)</Typography>
                    {socials.map((s, idx) => (
                      <TextField
                        key={idx}
                        size="small"
                        placeholder="https://"
                        value={s.url}
                        onChange={(e) => updateSocial(idx, e.target.value)}
                        InputProps={{ startAdornment: (
                          <InputAdornment position="start">{s.icon}</InputAdornment>
                        )}}
                      />
                    ))}
                    <Button onClick={addSocial} startIcon={<AddOutlinedIcon/>} variant="contained" size="small" sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } }}>Add Socials</Button>

                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#6B7280' }}>TV SCREEN</Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={tvEnabled}
                          onChange={(e) => setTvEnabled(e.target.checked)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF80C3' },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF80C3' },
                            '& .MuiSwitch-track': { opacity: 1, backgroundColor: 'rgba(0,0,0,0.25)' }
                          }}
                        />
                      }
                      label="Enable"
                    />
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TextField
                        fullWidth
                        size="small"
                        label="Upload Image/Logo"
                        value={tvLogo}
                        onClick={() => tvLogoRef.current && tvLogoRef.current.click()}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <ImageOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/>
                            </InputAdornment>
                          )
                        }}
                        disabled={!tvEnabled}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#FF80C3' },
                            '&:hover fieldset': { borderColor: '#FF80C3' },
                            '&.Mui-focused fieldset': { borderColor: '#FF80C3' }
                          }
                        }}
                      />
                      <input hidden ref={tvLogoRef} type="file" accept="image/*" onChange={onUpload(setTvLogo)} />
                    </Stack>

                    <Divider sx={{ my: 1 }} />
                   
                   <Button fullWidth variant="contained" startIcon={<SaveOutlinedIcon/>} sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' },}}>Save Loft</Button>
                   <Divider sx={{ my: 1 }} />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;


