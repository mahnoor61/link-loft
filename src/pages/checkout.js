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
  TextField,
  Avatar,Divider
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React from 'react';
import { useAuth } from 'src/hooks/use-auth';

const Page = () => {
  const { user } = useAuth();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const displayName = user?.username || user?.name || 'Jhon Smith';
  const email = user?.email || 'player@example.com';
  const rawPhoto = user?.profile_photo || '';
  const avatar = rawPhoto ? (rawPhoto.startsWith('http') ? rawPhoto : `${API_BASE_URL}${rawPhoto}`) : '/user.png';

  return (
    <>
      <Head>
        <title>Billing • Checkout | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{ backgroundColor: '#FDF1F6', minHeight: '100vh', p: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Billing</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Billings • Checkout</Typography>
          <Grid container spacing={3}>
            {/* Left: payment form */}
            <Grid item xs={12} md={8} lg={8}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>Payment Method</Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button variant="outlined" sx={{ textTransform: 'none', borderColor: '#FF80C3', color: '#FF80C3' }}>PayPal</Button>
                      <Button variant="outlined" sx={{ textTransform: 'none', borderColor: '#FF80C3', color: '#FF80C3' }}>G Pay</Button>
                      <Button variant="outlined" sx={{ textTransform: 'none', borderColor: '#FF80C3', color: '#FF80C3' }}>Apple Pay</Button>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>Or</Typography>
                    <TextField fullWidth size="small" label="Name on Card" defaultValue={displayName} />
                    <TextField fullWidth size="small" label="Card Number" />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField fullWidth size="small" label="MM / YY" />
                      <TextField fullWidth size="small" label="CVV" />
                    </Box>
                    <Button fullWidth variant="contained" sx={{ textTransform: 'none',background: '#001D2D', '&:hover': { background: '#12243D' } }}>Checkout</Button>
                    <Divider sx={{ my: 2 }} />
                  </Stack>
                </CardContent>
              </Card>
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
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>{email}</Typography>
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


