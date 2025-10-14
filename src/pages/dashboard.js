import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useAuth } from 'src/hooks/use-auth';
import { Chart } from 'src/components/chart';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const sparklineOptions = {
  chart: { sparkline: { enabled: true } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#AD2F91'],
  tooltip: { enabled: false },
  grid: { show: false }
};

const StatCard = ({ title, value, trendText, series }) => (
  <Card sx={{ borderRadius: 3, boxShadow: '0px 6px 20px rgba(0,0,0,0.04)' }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" sx={{ color: '#6B7280' }}>{title}</Typography>
        <Typography variant="subtitle1" sx={{ color: '#111827', fontWeight: 700 }}>{value}</Typography>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Chart options={sparklineOptions} series={[{ name: title, data: series }]} type="line" height={70}/>
      </Box>
      <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600 }}>
        {trendText}
      </Typography>
    </CardContent>
  </Card>
);

const TopLink = ({ icon, name, clicks, onClick }) => (
  <Card onClick={onClick} sx={{ borderRadius: 2, cursor: 'pointer', transition: 'transform .15s ease', '&:hover': { transform: 'translateY(-2px)' } }}>
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={icon} sx={{ width: 28, height: 28 }} />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>{name}</Typography>
          <Typography variant="caption" sx={{ color: '#6B7280' }}>{clicks} clicks</Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const RightPanel = () => {
  const { user } = useAuth();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const displayName = user?.profile_name || user?.username || user?.name || 'Guest User';
  const handle = user?.profile_name || 'Guest User';
  const rawPhoto = user?.profile_photo;
  const avatarSrc = rawPhoto ? (rawPhoto.startsWith('http') ? rawPhoto : `${API_BASE_URL}${rawPhoto}`) : '/user.png';
console.log("user", user);
  return (
    <Box sx={{
      position: 'sticky',
      top: 24,
      backgroundColor: '#FFFFFF',
      borderRadius: 2,
      p: 2,
      boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
      border: '1px solid #F3F4F6'
    }}>
      <Stack spacing={3}>
        <Card sx={{ textAlign: 'center', borderRadius: 3, boxShadow: 'none', border: '1px solid #F3F4F6' }}>
          <CardContent>
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
                  <Avatar src={avatarSrc} sx={{ width: 96, height: 96 }} />
                </Box>
              </Box>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{displayName}</Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#9CA3AF',
                display: 'inline-block',
                maxWidth: '100%',
                wordBreak: 'break-all',
                whiteSpace: 'normal',
                lineHeight: 1.2
              }}
            >
              linkloft.me/{handle}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: 3, overflow: 'hidden', p: 2, boxShadow: 'none', background: 'linear-gradient(180deg, #FF8FC7 0%, #FF7CBF 100%)' }}>
          <CardContent sx={{ position: 'relative' }}>
            {/* <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
              <CreditCardOutlinedIcon sx={{ color: '#FFFFFF' }} />
            </Box> */}
            <CreditCardOutlinedIcon sx={{ color: '#FFFFFF' }} />
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 800, mb: 0.5 }}>Plan Info:</Typography>
            <Typography variant="caption" sx={{ display: 'block', color: '#FFFFFF', opacity: 0.9, mb: 2 }}>Free Plan</Typography>
            <Link href="/billings" style={{ textDecoration: 'none' }}>
              <Button fullWidth sx={{
                backgroundColor: '#FFFFFF',
                color: '#001D2D',
                textTransform: 'none',
                borderRadius: 999,
                py: 0.8,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#F8FAFC', boxShadow: 'none' }
              }}>Upgrade</Button>
            </Link>
          </CardContent>
        </Card>
        <Stack spacing={2}>
          <Button fullWidth sx={{
            backgroundColor: '#0E1C2F',
            color: '#FFFFFF',
            textTransform: 'none',
            borderRadius: 2,
            py: 1.2,
            '&:hover': { backgroundColor: '#12243D' }
          }}>Preview Loft</Button>
          <Button fullWidth variant="outlined" sx={{
            textTransform: 'none',
            borderRadius: 2,
            py: 1.2,
            borderColor: '#0E1C2F',
            color: '#0E1C2F',
            '&:hover': { borderColor: '#12243D' }
          }}>Share Loft</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

const Page = () => {
  const { isAuthenticated, user } = useAuth();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const [topLinks, setTopLinks] = useState([
    { key: 'instagram', name: 'Instagram', icon: '/google.png', url: 'https://instagram.com', clicks: 0 },
    { key: 'youtube', name: 'Youtube', icon: '/google.png', url: 'https://youtube.com', clicks: 0 },
    { key: 'tiktok', name: 'TikTok', icon: '/google.png', url: 'https://tiktok.com', clicks: 0 }
  ]);

  const recordKeyFor = (key) => `${key}Clicks`;

  // Ensure a persistent anonymous clientId for unique counting across sessions
  const getClientId = () => {
    const key = 'll_client_id';
    let id = window.localStorage.getItem(key);
    if (!id) {
      id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem(key, id);
    }
    return id;
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch global unique stats (works regardless of auth)
        const globalResp = await axios.get(`${API_BASE_URL}/api/links/stats`);
        const global = globalResp?.data?.data || {};

        // Update UI with global unique counts
        setTopLinks((prev) => prev.map((l) => ({ ...l, clicks: Number(global[l.key] || 0) })));
      } catch (e) {
        // silent fail; keep defaults
      }
    };
    fetchCounts();
  }, [API_BASE_URL]);

  const handleTopLinkClick = async (link) => {
    try {
      // Open in new tab safely
      window.open(link.url, '_blank', 'noopener,noreferrer');

      // Optimistically update UI
      setTopLinks((prev) => prev.map((l) => l.key === link.key ? { ...l, clicks: (l.clicks || 0) + 1 } : l));

      // Persist per-user count (existing) if authenticated
      const token = window.localStorage.getItem('token');
      if (token) {
        const newCount = (topLinks.find((l) => l.key === link.key)?.clicks || 0) + 1;
        await axios.post(`${API_BASE_URL}/api/user/record/update-data`, {
          data: { [recordKeyFor(link.key)]: newCount }
        }, {
          headers: { 'Content-Type': 'application/json', 'x-access-token': token }
        });
      }

      // Also record a global unique click (works for guests as well)
      const clientId = getClientId();
      await axios.post(`${API_BASE_URL}/api/links/click`, { linkKey: link.key, clientId }, {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {
      // Rollback on error (optional: refetch)
      // console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Box component="main" sx={{
        backgroundColor: '#FDF1F6',
        minHeight: '100vh',
        py: { xs: 3, md: 6 }
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
              <Typography variant="overline" sx={{ color: '#6B7280' }}>Pages / Dashboard</Typography>
              <Typography variant="caption" sx={{ display: 'block', color: '#6B7280', mb: 2 }}>Dashboard</Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>WELCOME BACK</Typography>
              <Typography variant="subtitle1" sx={{ color: '#6B7280', mb: 3 }}>
                Hello, { (user?.profile_name || user?.username || user?.name) ? (user?.profile_name || user?.username || user?.name) : 'Demo User' } 👋
              </Typography>

              <Card sx={{ p: 2, borderRadius: 3, mb: 3 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: '#111827' }}
                    >
                      Profile Completion:
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={65}
                      sx={{ height: 8, borderRadius: 5 }}
                    />
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: '#6B7280', minWidth: 56, textAlign: 'right' }}
                  >
                    65%
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#0E1C2F',
                      textTransform: 'none',
                      borderRadius: 2,
                      px: 3,
                      '&:hover': { backgroundColor: '#12243D' }
                    }}
                  >
                    Complete Profile
                  </Button>
                </Stack>
              </Card>

              <Typography
                variant="subtitle2"
                sx={{ color: '#111827', fontWeight: 800, mb: 1 }}
              >
                LOFT STATS
              </Typography>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <StatCard title="Views" value="1,204" trendText="10+ more from last week" series={[10, 12, 9, 14, 18, 16, 20]} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <StatCard title="Likes" value="312" trendText="10+ more from last week" series={[5, 7, 6, 9, 8, 11, 13]} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <StatCard title="Followers" value="87" trendText="10+ more from last week" series={[2, 4, 3, 5, 7, 6, 9]} />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#111827', fontWeight: 800, mb: 1 }}
                >
                  Top Links:
                </Typography>
                <Grid
                  container
                  spacing={2}
                >
                  {topLinks.map((l) => (
                    <Grid
                      key={l.key}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                    >
                      <TopLink
                        icon={l.icon}
                        name={l.name}
                        clicks={l.clicks}
                        onClick={() => handleTopLinkClick(l)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              lg={4}
            >
              <RightPanel />
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


