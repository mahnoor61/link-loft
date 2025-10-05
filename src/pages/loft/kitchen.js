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
  Button,
  InputAdornment,
  Checkbox,
  ImageList,
  ImageListItem
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React from 'react';

const ImageWithFallback = ({ base, alt, style, ...props }) => {
  const exts = ['.png', '.jpg', '.jpeg', '.webp'];
  const [idx, setIdx] = React.useState(0);
  const src = `${base}${exts[idx]}`;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setIdx((i) => (i + 1 < exts.length ? i + 1 : i))}
      style={style}
      {...props}
    />
  );
};

const Page = () => {
  const [recipes, setRecipes] = React.useState([
    { localBase: '/pasta', title: 'Baked pasta', note: 'A creamy and tangy delight' },
    { img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=60', title: 'Grilled skewers', note: 'Succulent morsels' },
    { localBase: '/browni', title: 'Nut brownie', note: 'Rich chocolate, crunch...' },
    { img: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&w=600&q=60', title: 'Dessert pancakes', note: 'With a maple-syrup drizzle' }
  ]);
  const addRecipeRef = React.useRef(null);
  const fridgeRef = React.useRef(null);
  const [fridgeFile, setFridgeFile] = React.useState('');

  const handleAddRecipe = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setRecipes((prev) => [{ img: url, title: file.name, note: 'Custom recipe' }, ...prev]);
  };

  const handleFridgeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setFridgeFile(file.name);
  };
  return (
    <>
      <Head>
        <title>Kitchen | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{ backgroundColor: '#FDF1F6', minHeight: '100vh', p: { xs: 2, md: 2 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {/* Left preview */}
            <Grid item xs={12} md={8} lg={8}>
              <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Loft Editor</Typography>
              <Typography variant="caption" sx={{ display: 'block', color: '#6B7280', mb: 2 }}>Loft Editor</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Loft Editor – Kitchen</Typography>
              <Card sx={{ borderRadius: 3 }}>
                <Box sx={{ width: '100%', aspectRatio: '16 / 15', position: 'relative' }}>
                  <ImageWithFallback
                    base="/kitchen"
                    alt="Kitchen preview"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              </Card>
            </Grid>

            {/* Right column matching screenshot */}
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>KITCHEN SETUP</Typography>

                  <Typography variant="caption" sx={{ color: '#6B7280', mb: 1, display: 'block' }}>Recipes</Typography>
                  {/* Default recipe cards (interactive) */}
                  <Grid container spacing={1.5} sx={{ mb: 1 }}>
                    {recipes.map((r, idx) => (
                      <Grid key={idx} item xs={6}>
                        <Box sx={{ border: '1px solid #FAD0E5', borderRadius: 2, overflow: 'hidden', height: 150, display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ height: 90, overflow: 'hidden' }}>
                            {r.localBase ? (
                              <ImageWithFallback base={r.localBase} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <img src={r.img} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
                          </Box>
                          <Box sx={{ p: 0.5, flexGrow: 1 }}>
                            <Typography variant="caption" sx={{ display: 'block', fontWeight: 700 }}>{r.title}</Typography>
                            <Typography variant="caption" sx={{ color: '#6B7280' }}>{r.note}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Button fullWidth variant="contained" sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } }} onClick={() => addRecipeRef.current && addRecipeRef.current.click()}>+ Add Recipe</Button>
                  <input ref={addRecipeRef} hidden type="file" accept="image/*" onChange={handleAddRecipe} />

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
                      <InputAdornment position="start"><ImageOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }}/></InputAdornment>
                    )}}
                    onClick={() => fridgeRef.current && fridgeRef.current.click()}
                  />
                  <input ref={fridgeRef} hidden type="file" accept="image/*" onChange={handleFridgeUpload} />

                  <Divider sx={{ my: 2 }} />
                  <Button fullWidth variant="contained" startIcon={<SaveOutlinedIcon/>} sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } }} onClick={() => console.log('Kitchen form', { recipesCount: recipes.length, fridgeFile })}>Save Loft</Button>
                  <Divider sx={{ my: 2 }} />
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


