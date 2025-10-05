import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Grid,
  Typography,
  Card,
  Stack,
  Avatar
} from '@mui/material';
import { useAuth } from '../hooks/use-auth';
import { useEffect } from 'react';
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
export default function LoadingScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { name, username, avatar, email: qEmail } = router.query;

  // Resolve display fields with priority: authenticated user -> query params -> defaults
  const displayName = (user?.username || user?.name)
    || (typeof name === 'string' && name.length > 0 ? decodeURIComponent(name) : 'Profile Name');

  const handle = user?.username
    ? `@${user.username}`
    : (typeof username === 'string' && username.length > 0 ? `@${decodeURIComponent(username).replace(/^@/, '')}` : '@player');

  const email = user?.email
    || (typeof qEmail === 'string' && qEmail.length > 0 ? decodeURIComponent(qEmail) : 'player@example.com');

  const rawPhoto = user?.profile_photo
    || (typeof avatar === 'string' && avatar.length > 0 ? decodeURIComponent(avatar) : '');
  const avatarSrc = rawPhoto ? (rawPhoto.startsWith('http') ? rawPhoto : `${API_BASE_URL}${rawPhoto}`) : '/loft3.png';

  // After 10 seconds, redirect based on auth state
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/dashboard');
      } else {
        router.replace('/');
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Loading | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box
        component="main"
        sx={{
             backgroundImage: `url(${WEB_URL}/loadingscreen.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 6 },
        //   background: 'linear-gradient(180deg, #0B2731 0%, #1A1F3A 45%, #2A0F22 100%)',
        //   position: 'relative',
        //   overflow: 'hidden'
        }}
      >
        <Grid data-aos="zoom-in" container spacing={4} alignItems="center">
          {/* Left content */}
          <Grid item xs={12} md={7}>
            <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Box sx={{ height: 70, width: { xs: '60%', md: '40%' }, maxWidth: 520, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                <img src="/hd.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
                <Typography variant="h2" sx={{ color: '#FFFFFF', fontWeight: 700 }}>Welcome to</Typography>
                <Typography variant="h3" sx={{ color: '#FFFFFF', fontWeight: 700, mt:'0 !important' }}>
                  {displayName}
                  {"'"}s LOFT
                </Typography>
            
              <Box>
                <Typography sx={{ color: '#FFFFFF', opacity: 0.9, fontSize: 30, mb: 1, textAlign: { xs: 'center', md: 'center' } }}>Loading</Typography>
                {/* Striped animated progress bar */}
                <Box
                  sx={{
                    width: 280,
                    height: 8,
                    borderRadius: 8,
                    backgroundImage: 'repeating-linear-gradient(45deg, #FF80C3 0 12px,rgb(7, 7, 7) 12px 24px)',
                    backgroundSize: '28px 28px',
                    animation: 'barberpole 1.2s linear infinite',
                    boxShadow: '0 0 0 2px rgba(255,128,195,0.4) inset'
                  }}
                />
              </Box>
            </Stack>
          </Grid>

          {/* Right profile card */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                width: 300,
                height: 350,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                backdropFilter: 'blur(4px)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
              elevation={0}
            >
              <Stack spacing={1.2} alignItems="center">
                <Avatar src={avatarSrc} alt="avatar" sx={{ width: 120, height: 120 }} />
                <Stack spacing={0} alignItems="center">
                  <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>{displayName}</Typography>
                  {/* <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>{handle}</Typography> */}
                  <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>{email}</Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* keyframes */}
        <style jsx global>{`
          @keyframes barberpole {
            from { background-position: 0 0; }
            to { background-position: 28px 0; }
          }
        `}</style>
      </Box>
    </>
  );
}


