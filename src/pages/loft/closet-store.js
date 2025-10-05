import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Divider,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import React from 'react';

const Page = () => {
  return (
    <>
      <Head>
        <title>Closet / Store | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{ backgroundColor: '#FDF1F6', minHeight: '100vh', p: { xs: 2, md: 2 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {/* Left preview */}
            <Grid item xs={12} md={8} lg={8}>
              <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Loft Editor</Typography>
              <Typography variant="caption" sx={{ display: 'block', color: '#6B7280', mb: 2 }}>Loft Editor</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Loft Editor – Closet</Typography>
              <Card sx={{ borderRadius: 3 }}>
                <Box sx={{
                  width: '100%',
                  aspectRatio: '16 / 15',
                  backgroundImage: 'url(/closett.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
              </Card>
            </Grid>

            {/* Right column */}
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <ClosetForm />
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


const ClosetForm = () => {
  const [items, setItems] = React.useState([
    '/closett.jpg',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=60'
  ]);
  const addRef = React.useRef(null);
  const fridgeRef = React.useRef(null);
  const [fridgeFile, setFridgeFile] = React.useState('');

  const onAddChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setItems((prev) => [url, ...prev]);
  };

  const onFridgeChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFridgeFile(f.name);
  };

  return (
    <>
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>CLOSET/STORE</Typography>

      <Typography variant="caption" sx={{ color: '#6B7280' }}>Store Items</Typography>
      <Grid container spacing={1.5} sx={{ mb: 1, mt: 0.5 }}>
        {items.map((img, idx) => (
          <Grid key={idx} item xs={6}>
            <Box sx={{ border: '1px solid #FAD0E5', borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ height: 84, overflow: 'hidden' }}>
                <img src={img} alt={`closet-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Box sx={{ p: 0.5 }}>
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 700 }}>{idx % 2 === 0 ? 'Jackets' : 'Handbags'}</Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>Curated collection</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button fullWidth variant="contained" sx={{mt:3, textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } }} onClick={() => addRef.current && addRef.current.click()}>+ Add Items</Button>
      <input ref={addRef} hidden type="file" accept="image/*" onChange={onAddChange} />

      <Divider sx={{ my: 2 }} />
      <Typography variant="caption" sx={{ color: '#6B7280', mb: 1, display: 'block' }}>Refrigerator</Typography>
      <TextField
        fullWidth
        size="small"
        label={fridgeFile || 'Upload'}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#FF80C3' },
            '&:hover fieldset': { borderColor: '#FF80C3' },
            '&.Mui-focused fieldset': { borderColor: '#FF80C3' }
          },
          '& .MuiInputBase-root': { alignItems: 'center' },
          '& .MuiOutlinedInput-input': { textAlign: 'center', py: 1.25 },
          cursor: 'pointer',
          '& .MuiOutlinedInput-root': { cursor: 'pointer' }
        }}
        InputProps={{ readOnly: true, startAdornment: (
          <InputAdornment position="start"><ImageOutlinedIcon fontSize="small"/></InputAdornment>
        )}}
        onClick={() => fridgeRef.current && fridgeRef.current.click()}
      />
      <input ref={fridgeRef} hidden type="file" accept="image/*" onChange={onFridgeChange} />
      <FormControlLabel control={<Checkbox sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#FF80C3' } }} />} label="Do not Show Room" />

      <Button fullWidth variant="contained" startIcon={<SaveOutlinedIcon/>} sx={{mt:3, textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } }} onClick={() => console.log('Closet form', { itemsCount: items.length, fridgeFile })}>Save Loft</Button>
      <Divider sx={{ my: 2 }} />
    </>
  );
};
