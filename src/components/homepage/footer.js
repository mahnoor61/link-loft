import NextLink from 'next/link';
import { Box, Container, Divider, Link, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: '#fffbfa', height: '100%', minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            LinkLoft
          </Typography>

          <Stack direction="row" spacing={{ xs: 2, md: 4 }}>
            <Link component={NextLink} href="/" underline="none" color="text.primary" sx={{ '&:hover': { color: '#AD2F91' } }}>About</Link>
            <Link component={NextLink} href="/" underline="none" color="text.primary" sx={{ '&:hover': { color: '#AD2F91' } }}>Help Center</Link>
            <Link component={NextLink} href="/" underline="none" color="text.primary" sx={{ '&:hover': { color: '#AD2F91' } }}>Resources</Link>
            <Link component={NextLink} href="/" underline="none" color="text.primary" sx={{ '&:hover': { color: '#AD2F91' } }}>Contact</Link>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3, borderColor: theme.palette.neutral ? theme.palette.neutral[200] : 'divider' }} />

        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Copyright @2025 Linkloft. All Rights Reserved.
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <Link component={NextLink} href="/terms" underline="none" color="text.secondary" sx={{ '&:hover': { color: '#AD2F91' } }}>Terms & Conditions</Link>
            <Typography variant="caption" color="text.secondary">~</Typography>
            <Link component={NextLink} href="/privacy" underline="none" color="text.secondary" sx={{ '&:hover': { color: '#AD2F91' } }}>Privacy Policy</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}


