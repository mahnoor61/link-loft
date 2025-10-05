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
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  InputAdornment,
  Checkbox
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React from 'react';

const Page = () => {
  const [youtubeLink, setYoutubeLink] = React.useState('');
  const [mediaWallFile, setMediaWallFile] = React.useState('');
  const [extraImages, setExtraImages] = React.useState([]);
  const [weather, setWeather] = React.useState('none');
  const [hideRoom, setHideRoom] = React.useState(false);

  const uploadRef = React.useRef(null);
  const addImageRef = React.useRef(null);

  const pinkField = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#FF80C3' },
      '&:hover fieldset': { borderColor: '#FF80C3' },
      '&.Mui-focused fieldset': { borderColor: '#FF80C3' }
    },
    '& .MuiInputBase-root': { alignItems: 'center' },
    '& .MuiOutlinedInput-input': { textAlign: 'center', py: 1.25 }
  };

  const onUploadChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setMediaWallFile(file.name);
  };

  const onAddImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setExtraImages((prev) => [...prev, file.name]);
  };

  const handleSave = () => {
    console.log('Media Room form:', { youtubeLink, mediaWallFile, extraImages, weather, hideRoom });
  };

  return (
    <>
      <Head>
        <title>Media Room | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{ backgroundColor: '#FDF1F6', minHeight: '100vh', p: { xs: 2, md: 2 } }}>
        <Container maxWidth="xl">
          {/* Headings */}
          <Grid container spacing={3}>
            {/* Left preview */}
            <Grid item xs={12} md={8} lg={8}>
              <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Loft Editor</Typography>
              <Typography variant="caption" sx={{ display: 'block', color: '#6B7280', mb: 2 }}>Loft Editor</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Loft Editor – Media Room</Typography>
              <Card sx={{ borderRadius: 3 }}>
                <Box sx={{
                  width: '100%',
                  aspectRatio: '16 / 15',
                  backgroundImage: 'url(/media.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
              </Card>
            </Grid>

            {/* Right controls - follow screenshot styling */}
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>MEDIA ROOM</Typography>

                  <Stack spacing={2}>
                    {/* Movie Screen Embedded Url */}
                    <TextField
                      label="YouTube Link"
                      size="small"
                      value={youtubeLink}
                      onChange={(e) => setYoutubeLink(e.target.value)}
                      sx={pinkField}
                      InputProps={{ startAdornment: (
                        <InputAdornment position="start"><SlideshowOutlinedIcon fontSize="small"/></InputAdornment>
                      )}}
                    />

                    {/* Media wall upload */}
                    <TextField
                      fullWidth
                      size="small"
                      label="Upload"
                      value={mediaWallFile}
                      onClick={() => uploadRef.current && uploadRef.current.click()}
                      sx={{
                       
                        
                        ...pinkField,
                        cursor: 'pointer',
                        '& .MuiOutlinedInput-root': { cursor: 'pointer' }
                      }}
                      InputProps={{ readOnly: true, startAdornment: (
                        <InputAdornment position="start"><ImageOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/></InputAdornment>
                      )}}
                    />
                    <input ref={uploadRef} hidden type="file" accept="image/*" onChange={onUploadChange} />
                    <Button  fullWidth variant="contained" onClick={() => addImageRef.current && addImageRef.current.click()} startIcon={<SaveOutlinedIcon/>} sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } }}>Add Image</Button>
                    {/* <Button variant="outlined" size="small"  sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } , cursor: 'pointer'}} onClick={() => addImageRef.current && addImageRef.current.click()}>+ Add Image</Button> */}
                    <input ref={addImageRef} hidden type="file" accept="image/*" onChange={onAddImageChange} />
                    {extraImages.length > 0 && (
                      <Typography variant="caption" sx={{ color: '#6B7280' }}>{extraImages.length} image(s) added</Typography>
                    )}

                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>Weather Effect:</Typography>
                    <Stack spacing={1}>
                      {['none', 'snow', 'rain'].map((val) => (
                        <Box
                          key={val}
                          onClick={() => setWeather(val)}
                          sx={{
                            border: '1px solid',
                            borderColor: weather === val ? '#FF80C3' : '#FAD0E5',
                            borderRadius: 1.5,
                            px: 2,
                            py: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                          }}
                        >
                          <Typography sx={{ color: '#6B7280' }}>
                            {val === 'none' ? 'None' : val.charAt(0).toUpperCase() + val.slice(1)}
                          </Typography>
                          <Radio
                            checked={weather === val}
                            onChange={() => setWeather(val)}
                            sx={{ p: 0.5, '&.Mui-checked': { color: '#FF80C3' } }}
                          />
                        </Box>
                      ))}
                    </Stack>
                    <FormControlLabel control={<Checkbox checked={hideRoom} onChange={(e) => setHideRoom(e.target.checked)} sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#FF80C3' } }} />} label="Do not Show Room" />

                    <Button onClick={handleSave} fullWidth variant="contained" startIcon={<SaveOutlinedIcon/>} sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } }}>Save Loft</Button>
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


