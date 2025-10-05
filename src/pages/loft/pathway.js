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
  InputAdornment
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React from 'react';

const Page = () => {
  const [links, setLinks] = React.useState([
    { title: '', url: '', type: 'text', image: '' },
    { title: '', url: '', type: 'text', image: '' }
  ]);

  const uploadRef1 = React.useRef(null);
  const uploadRef2 = React.useRef(null);
  const getRef = (i) => (i === 0 ? uploadRef1 : uploadRef2);

  const updateLink = (index, field, value) => {
    setLinks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const onFilePick = (index) => (e) => {
    const file = e.target.files?.[0];
    if (file) updateLink(index, 'image', file.name);
  };

  const triggerUpload = (index) => () => {
    const ref = getRef(index);
    if (ref.current) ref.current.click();
  };

  return (
    <>
      <Head>
        <title>pathway | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{ backgroundColor: '#FDF1F6', minHeight: '100vh', p: { xs: 2, md: 2 } }}>
        <Container maxWidth="xl">
          {/* <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Loft Editor</Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#6B7280', mb : 2 }}>Loft Editor</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Loft Editor – Pathway</Typography> */}

          <Grid container spacing={3}>
            {/* Left: pathway preview image */}
            <Grid item xs={12} md={8} lg={8}>
            <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Loft Editor</Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#6B7280', mb : 2 }}>Loft Editor</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Loft Editor – Pathway</Typography>
              <Card sx={{ borderRadius: 3 }}>
                <Box sx={{
                  width: '100%',
                  height: '100%',
                  aspectRatio: '16 / 15',
                  backgroundImage: 'url(/pathway.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center'
                }} />
              </Card>
            </Grid>

            {/* Right: controls to add 2 links (title + url + type + upload) */}
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>PATHPORT LINKS</Typography>

                  <Stack spacing={2}>
                    {[0,1].map((idx) => (
                      <>
                      <Typography variant="caption" sx={{ color: '#6B7280' }}>Link {idx + 1}</Typography>
                      <Box key={idx}>
                        {/* <Typography variant="caption" sx={{ color: '#6B7280' }}>Link {idx}</Typography> */}
                        <TextField
                        label="Title"
                          // placeholder="Title"
                          size="small"
                          value={links[idx].title}
                          onChange={(e) => updateLink(idx, 'title', e.target.value)}
                          sx={{
                            mb:1,
                            '& .MuiInputBase-root': { alignItems: 'center' },
                            '& .MuiOutlinedInput-input': { textAlign: 'center', py: 1.25 }
                          }}
                          InputProps={{ startAdornment: (
                            <InputAdornment position="start"><TitleOutlinedIcon fontSize="small"/></InputAdornment>
                          )}}
                        />
                        <TextField
                          label="https://"
                          size="small"
                          value={links[idx].url}
                          onChange={(e) => updateLink(idx, 'url', e.target.value)}
                          sx={{
                            mt: 1,
                            '& .MuiInputBase-root': { alignItems: 'center' },
                            '& .MuiOutlinedInput-input': { textAlign: 'center', py: 1.25 }
                          }}
                          InputProps={{ startAdornment: (
                            <InputAdornment position="start"><LinkOutlinedIcon fontSize="small"/></InputAdornment>
                          )}}
                        />
                        <RadioGroup row value={links[idx].type} onChange={(e) => updateLink(idx, 'type', e.target.value)} sx={{ mt: 1 }}>
                          <FormControlLabel value="text" control={<Radio sx={{ '&.Mui-checked': { color: '#FF80C3' } }}/>} label="Text" />
                          <FormControlLabel value="image" control={<Radio sx={{ '&.Mui-checked': { color: '#FF80C3' } }}/>} label="Image + Text" />
                        </RadioGroup>
                        <TextField
                          fullWidth
                          label="Upload"
                          size="small"
                          value={links[idx].image}
                          onClick={triggerUpload(idx)}
                          sx={{
                            mt: 1,
                            cursor: 'pointer',
                            '& .MuiOutlinedInput-root': { cursor: 'pointer' },
                            '& .MuiInputBase-root': { alignItems: 'center' },
                            '& .MuiOutlinedInput-input': { textAlign: 'center', py: 1.25 }
                          }}
                          InputProps={{ readOnly: true, startAdornment: (
                            <InputAdornment position="start"><ImageOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/></InputAdornment>
                          )}}
                        />
                        <input ref={getRef(idx)} hidden type="file" accept="image/*" onChange={onFilePick(idx)} />
                        <Divider sx={{ my: 2 }} />
                      </Box>
                      </>
                    ))}

                    <Button fullWidth variant="contained" startIcon={<SaveOutlinedIcon/>} sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } }}>Save Loft</Button>
                    <Divider sx={{ my: 2 }} />
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


