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

export default function LoadingScreen() {
  const router = useRouter();
  const { name, username, avatar } = router.query;

  const displayName = typeof name === 'string' && name.length > 0 ? name : 'Profile Name';
  const handle = typeof username === 'string' && username.length > 0 ? `@${username.replace(/^@/, '')}` : '@sophiefortune';
  const avatarSrc = typeof avatar === 'string' && avatar.length > 0 ? avatar : '/loft3.png';

  return (
    <>
      <Head>
        <title>Loading | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 6 },
          background: 'linear-gradient(180deg, #0B2731 0%, #1A1F3A 45%, #2A0F22 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Left content */}
          <Grid item xs={12} md={7}>
            <Stack spacing={4} sx={{ alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
              <Box>
                <img src="/logo3.png" alt="Logo" style={{ height: 56 }} />
              </Box>
              <Box>
                <Typography variant="h3" sx={{ color: '#FFFFFF', fontWeight: 700 }}>Welcome to</Typography>
                <Typography variant="h3" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                  {displayName}
                  {"'"}s LOFT
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: '#FFFFFF', opacity: 0.9, fontSize: 20, mb: 1 }}>Loading</Typography>
                {/* Striped animated progress bar */}
                <Box
                  sx={{
                    width: 280,
                    height: 8,
                    borderRadius: 8,
                    backgroundImage: 'repeating-linear-gradient(45deg, #FF80C3 0 12px, #FFFFFF 12px 24px)',
                    backgroundSize: '28px 28px',
                    animation: 'barberpole 1.2s linear infinite',
                    boxShadow: '0 0 0 2px rgba(255,128,195,0.4) inset'
                  }}
                />
              </Box>
            </Stack>
          </Grid>

          {/* Right profile card */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Card
              sx={{
                width: 320,
                height: 360,
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
              <Stack spacing={2} alignItems="center">
                <Avatar src={avatarSrc} alt="avatar" sx={{ width: 120, height: 120 }} />
                <Stack spacing={0} alignItems="center">
                  <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>Sophie Fortune</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{handle}</Typography>
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


