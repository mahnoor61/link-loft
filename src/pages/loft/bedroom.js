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
  Divider,
  Switch,
  FormControlLabel,
  Button,
  InputAdornment,
  Checkbox
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React from 'react';

const Page = () => {
  const art1Ref = React.useRef(null);
  const art2Ref = React.useRef(null);
  const musicRef = React.useRef(null);

  const pinkField = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#FF80C3' },
      '&:hover fieldset': { borderColor: '#FF80C3' },
      '&.Mui-focused fieldset': { borderColor: '#FF80C3' }
    },
    '& .MuiInputBase-root': { alignItems: 'center' },
    '& .MuiOutlinedInput-input': { textAlign: 'center', py: 1.25 }
  };
  return (
    <>
      <Head>
        <title>Bedroom | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{ backgroundColor: '#FDF1F6', minHeight: '100vh', p: { xs: 2, md: 2 } }}>
        <Container maxWidth="xl">
          {/* <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Loft Editor</Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#6B7280', mb: 2 }}>Loft Editor</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Loft Editor – Bedroom</Typography> */}

          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
            <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Loft Editor</Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#6B7280', mb: 2 }}>Loft Editor</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Loft Editor – Bedroom</Typography>
              <Card sx={{ borderRadius: 3 }}>
                <Box sx={{
                  width: '100%',
                  aspectRatio: '16 / 15',
                  backgroundImage: 'url(/bed.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
              </Card>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>BEDROOM SETUP</Typography>
                  <Stack spacing={1.5}>
                    <TextField
                      label="Laptop Link"
                      size="small"
                      sx={pinkField}
                      InputProps={{ startAdornment: (
                        <InputAdornment position="start"><LaptopMacOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/></InputAdornment>
                      )}}
                    />

                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>Wall Art 1</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      label="Image link"
                      sx={pinkField}
                      InputProps={{ startAdornment: (
                        <InputAdornment position="start"><ImageOutlinedIcon fontSize="small"/></InputAdornment>
                      ) }} />
                    <TextField
                      fullWidth
                      size="small"
                      label="Upload"
                      onClick={() => art1Ref.current && art1Ref.current.click()}
                      sx={{ ...pinkField, cursor: 'pointer', '& .MuiOutlinedInput-root': { cursor: 'pointer' } }}
                      InputProps={{ readOnly: true, startAdornment: (
                        <InputAdornment position="start"><ImageOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/></InputAdornment>
                      ) }} />
                    <input hidden ref={art1Ref} type="file" accept="image/*" />

                    <Typography variant="caption" sx={{ color: '#6B7280' }}>Wall Art 2</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      label="Image Link"
                      sx={pinkField}
                      InputProps={{ startAdornment: (
                        <InputAdornment position="start"><ImageOutlinedIcon fontSize="small"/></InputAdornment>
                      ) }} />
                    <TextField
                      fullWidth
                      size="small"
                      label="Upload"
                      onClick={() => art2Ref.current && art2Ref.current.click()}
                      sx={{ ...pinkField, cursor: 'pointer', '& .MuiOutlinedInput-root': { cursor: 'pointer' } }}
                      InputProps={{ readOnly: true, startAdornment: (
                        <InputAdornment position="start"><ImageOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/></InputAdornment>
                      ) }} />
                    <input hidden ref={art2Ref} type="file" accept="image/*" />

                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ position: 'relative' }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Music"
                        sx={pinkField}
                        InputProps={{ readOnly: true, startAdornment: (
                          <InputAdornment position="start"><MusicNoteOutlinedIcon fontSize="small"/></InputAdornment>
                        ) }} />
                      <Box sx={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)' }}>
                        <Switch sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF80C3' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF80C3' }, '& .MuiSwitch-track': { opacity: 1, backgroundColor: 'rgba(0,0,0,0.25)' } }} />
                      </Box>
                    </Box>
                    <TextField
                      fullWidth
                      size="small"
                      label="Upload"
                      onClick={() => musicRef.current && musicRef.current.click()}
                      sx={{ ...pinkField, cursor: 'pointer', '& .MuiOutlinedInput-root': { cursor: 'pointer' } }}
                      InputProps={{ readOnly: true, startAdornment: (
                        <InputAdornment position="start"><MusicNoteOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/></InputAdornment>
                      ) }} />
                    <input hidden ref={musicRef} type="file" accept="audio/*" />

                    <Stack>
                      <FormControlLabel control={<Checkbox sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#FF80C3' } }} defaultChecked />} label="Confirm rights" />
                      <FormControlLabel control={<Checkbox sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#FF80C3' } }} />} label="Do not Show Room" />
                    </Stack>

                    <Divider sx={{ my: 1 }} />
                    <Button fullWidth variant="contained" startIcon={<SaveOutlinedIcon/>} sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } }}>Save Loft</Button>
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


