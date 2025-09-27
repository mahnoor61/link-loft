import Link from 'next/link';
import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

export default function Navbar() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  const navLinks = [
    { label: 'Home', href: '/', active: true },
    { label: 'Explore', href: '/' },
    { label: 'Pricing', href: '/' },
    { label: 'About', href: '/' }
  ];

  return (
    <>
      {/* Top navbar */}
      <AppBar position="fixed" color="transparent" elevation={1}
              sx={{ backgroundColor: '#FFFFFF', borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Toolbar disableGutters>
          <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Left: brand */}
            <Link href="/" style={{ textDecoration: 'none' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <img src={`${WEB_URL}/logo.png`} alt="Logo" style={{ height: 32, cursor: 'pointer' }} />
            </Stack>
            </Link>
            {/* Center: desktop links */}
            <Stack direction="row" spacing={{ xs: 1, sm: 3 }} alignItems="center"
                   sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, justifyContent: 'center' }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
                  <Typography variant="body2"
                              sx={{
                                fontWeight: 600,
                                borderBottom: '2px solid transparent',
                                ...(link.active
                                  ? {
                                    color: theme.palette.success.main,
                                    borderBottom: `2px solid ${theme.palette.neutral[300]}`
                                  }
                                  : {
                                    '&:hover': {
                                      borderBottom: `2px solid ${theme.palette.neutral[300]}`
                                    }
                                  })
                              }}>
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>

            {/* Right: desktop actions */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button variant="text" size="small"
                        sx={{
                          backgroundColor: 'transparent',
                          color: theme.palette.text.primary,
                          borderRadius: 999,
                          '&:hover': { backgroundColor: 'transparent', color: theme.palette.success.main }
                        }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="small"
                        sx={{
                          backgroundColor: 'transparent',
                          borderRadius: 999,
                          border: `1px solid ${theme.palette.neutral[300]}`,
                          color: theme.palette.text.primary,
                          '&:hover': { backgroundColor: theme.palette.action.hover }
                        }}
                >
                  Sign Up
                </Button>
              </Link>
            </Stack>

            {/* Mobile menu button (right) */}
            <IconButton onClick={toggleMobile} sx={{ display: { xs: 'inline-flex', md: 'none' }, ml: 'auto' }} aria-label="Open navigation menu">
              <MenuIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobile} PaperProps={{ sx: { width: 280 } }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 2 }}>
          <img src={`${WEB_URL}/logo.png`} alt="Logo" style={{ height: 28 }} />
        </Stack>
        <Divider />
        <List>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
              <ListItemButton onClick={toggleMobile} selected={!!link.active}
                              sx={{
                                '&:hover': { backgroundColor: 'transparent' },
                                '&.Mui-selected': {
                                  color: theme.palette.success.main,
                                  backgroundColor: 'transparent'
                                }
                              }}
              >
                <ListItemText primaryTypographyProps={{ fontWeight: 600 }} primary={link.label} />
              </ListItemButton>
            </Link>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1}>
            <Link href="/login" style={{ textDecoration: 'none', width: '100%' }}>
              <Button
                variant="text"
                fullWidth
                sx={{
                  borderRadius: 999,
                  '&:hover': { color: theme.palette.success.main, backgroundColor: 'transparent' }
                }}
              >
                Login
              </Button>
            </Link>
            <Link href="/verify_login" style={{ textDecoration: 'none', width: '100%' }}>
              <Button variant="outlined" fullWidth sx={{
                backgroundColor: 'transparent',
                borderRadius: 999,
                border: `1px solid ${theme.palette.neutral[300]}`,
                color: theme.palette.text.primary,
                '&:hover': { backgroundColor: theme.palette.action.hover }
              }}>Sign Up</Button>
            </Link>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}


