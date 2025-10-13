import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

const plans = [
  {
    name: 'Free',
    subtitle: 'Free Package',
    price: '0',
    ctaVariant: 'contained'
  },
  {
    name: 'Premium',
    subtitle: 'Enjoy Premium Access',
    price: '4.99',
    ctaVariant: 'outlined'
  },
  {
    name: 'Pro',
    subtitle: 'Enjoy Unlimited Access',
    price: '9.99',
    ctaVariant: 'outlined'
  }
];

const features = [
  ['2 rooms', '3 rooms', 'All rooms'],
  ['Ads', 'No ads (living)', 'No ads'],
  ['Text Pathport', 'Image Pathport (limited)', 'Unlimited links'],
  ['No music', 'Preset music', 'Upload music']
];

export default function SectionFour() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 10, height:'100%'}}>
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography variant="h3" sx={{ fontWeight: 800 , mb:3}} data-aos="zoom-in">
          Pricing Plans
        </Typography>
        <Typography color="text.secondary" data-aos="zoom-in" data-aos-delay="100">
          Start with free trial. No credit card needed. Cancel at anytime.
        </Typography>
      </Box>

      {/* Plans */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 4, md: 6 } }}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={plan.name}>
            <Box
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              sx={{
                p: { xs: 3, md: 4 },
                height: '100%',
                borderRadius: 3,
                // backgroundColor: 'white !important',
                border: `1px solid ${theme.palette.neutral[200]}`,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                transition: 'transform .2s ease, box-shadow .2s ease',
                willChange: 'transform',
                '&:hover': { boxShadow: '0 8px 24px rgba(17,25,39,0.12)', transform: 'translateY(-2px)' }
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{plan.name}</Typography>
              <Typography variant="caption" color="text.secondary">{plan.subtitle}</Typography>
              <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="baseline" sx={{ my: 1 }}>
                <Typography>$</Typography>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>{plan.price}</Typography>
              </Stack>
              <Box sx={{ mt: 1, m:3 }}>
                <Link href="/billings" style={{ textDecoration: 'none' }}>
                  <Button variant={plan.ctaVariant} size="large" sx={{ borderRadius: 999, 
                    // ...(plan.ctaVariant === 'contained' && { '&:hover': { backgroundColor: 'primary.main' } })
                     }}>
                    Get Started
                  </Button>
                </Link>
              </Box>
              <Box sx={{ mt: 2, borderTop: `1px solid ${theme.palette.neutral[200]}` }}>
                {features.map((row, rowIndex) => (
                  <Box
                    key={rowIndex}
                    sx={{
                      py: 1.25,
                      borderTop: rowIndex === 0 ? 'none' : `1px solid ${theme.palette.neutral[200]}`
                    }}
                  >
                    <Typography variant="body2">{row[index]}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}


