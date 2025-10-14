import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button, Avatar
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React from 'react';
import { useAuth } from 'src/hooks/use-auth';

const plans = [
  { name: 'Free', price: '$ 0', features: ['2 rooms', 'Ads', 'Text Pathway', 'No music'], cta: 'Get Started' },
  { name: 'Premium', price: '$ 4.99', features: ['3 rooms', 'No ads (living)', 'Image Pathway (limited)', 'Preset music'], cta: 'Get Started' },
  { name: 'Pro', price: '$ 9.99', features: ['All rooms', 'Recipes', 'Atmosphere Control', 'Upload music'], cta: 'Get Started' }
];

const Page = () => {
  const { user } = useAuth();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const displayName = user?.profile_name || user?.username || user?.name || 'Guest User';
  const handle = user?.profile_name || 'Guest User';
  const rawPhoto = user?.profile_photo || '';
  const avatar = rawPhoto ? (rawPhoto.startsWith('http') ? rawPhoto : `${API_BASE_URL}${rawPhoto}`) : '/user.png';

  return (
    <>
      <Head>
        <title>Billings | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{ backgroundColor: '#FDF1F6', minHeight: '100vh', p: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Billing</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Billings</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8} sx={{ display: 'flex' }}>
              <Box sx={{ borderRadius: 3, backgroundColor: 'transparent', flex: 1, height: '100%' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    {plans.map((p, i) => (
                      <Grid key={i} item xs={12} md={4}>
                        <Box sx={{
                          border: '1px solid #FAD0E5',
                          borderRadius: 2,
                          p: 2,
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          background: 'white',
                          height: '100%'
                        }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>{p.name}</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>{p.price}</Typography>
                          <Button variant="contained" href="/checkout" sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' }, mb: 2 }}>{p.cta}</Button>
                          <Stack spacing={1}>
                            {p.features.map((f, idx) => (
                              <Box key={idx} sx={{ borderTop: '1px solid #F3E0EA', pt: 1, color: '#6B7280', fontSize: 13 }}>{f}</Box>
                            ))}
                          </Stack>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Box>
            </Grid>

            {/* Right: profile summary column */}
            <Grid item xs={12} md={4} lg={4}>
              <Stack spacing={2} sx={{ background: 'white', p: 2,      borderRadius: 2 }}>
                <Box sx={{ borderRadius: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{
                width: 108,
                height: 108,
                borderRadius: '50%',
                background: 'conic-gradient(from 180deg, #FF81C4, #AD2F91)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: '3px'
              }}>
                <Box sx={{
                  width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Avatar src={avatar} sx={{ width: 96, height: 96 }} />
                </Box>
              </Box>
            </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{displayName}</Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>linkloft.me/{handle}</Typography>
                  </Box>
                </Box>
                <Card sx={{ borderRadius: 3, p: 2, background: 'linear-gradient(180deg, #FF8FC7 0%, #FF7CBF 100%)', color: 'white' }}>
                  <CardContent>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'white' }}>Plan Info:</Typography>
                    <Box sx={{ mt: 1, borderRadius: 2, background: 'linear-gradient(180deg, #FF8FC7 0%, #FF7CBF 100%)', color: 'white' }}>
                      Free Plan
                      <Button fullWidth sx={{ mt: 1, background: '#FFFFFF', color: '#001D2D', textTransform: 'none', borderRadius: 999, '&:hover': { background: '#F8FAFC' } }}>Upgrade</Button>
                    </Box>
                  </CardContent>
                </Card>
                <Button fullWidth variant="contained" sx={{ textTransform: 'none', background: '#001D2D', '&:hover': { background: '#12243D' } }}>Preview Loft</Button>
                <Button fullWidth variant="contained" sx={{ textTransform: 'none', background: '#001D2D', color: 'white', '&:hover': { background: '#12243D' } }}>Share Loft</Button>
              </Stack>
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


