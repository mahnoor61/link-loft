import { Box, Container, Typography , Grid} from '@mui/material';
import Link from 'next/link';
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

export default function SectionTwo() {

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100%',
        py: 10,
        // minHeight:'100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
   
            <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 1 }} data-aos="zoom-in">
              How it Works
            </Typography>
            <Typography align="center" color="text.secondary" sx={{ mb: { xs: 6, md: 8 } }} data-aos="zoom-in" data-aos-delay="100">
              Your interactive loft is just a few clicks away.
            </Typography>

            <Grid container spacing={{ xs: 3, md: 6 }}>
              <Grid item xs={12} md={4}>
                <Link href="/signup" style={{ textDecoration: 'none' }}>
                  <Box data-aos="zoom-in" sx={{ textAlign: 'center', p: { xs: 3, md: 5 }, borderRadius: 3, transition: 'transform .2s ease, box-shadow .2s ease', willChange: 'transform', '&:hover': { boxShadow: '0 8px 24px rgba(17,25,39,0.12)', transform: 'translateY(-2px)' }, cursor: 'pointer' }} data-aos-delay="0">
                    {/* <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', backgroundColor: 'rgba(173,47,145,0.08)', mb: 2 }}> */}
                      <img src={`${WEB_URL}/group.png`} alt="Create" style={{ width: 56, height: 56 }} />
                    {/* </Box> */}
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Create</Typography>
                    <Typography variant="body2" color="text.secondary">Sign up and get your own virtual loft.</Typography>
                  </Box>
                </Link>
              </Grid>

              <Grid item xs={12} md={4}>
                {/* <Box sx={{
                  textAlign: 'center',
                  p: { xs: 3, md: 5 },
                  borderRadius: 3,
                  boxShadow: '0 8px 24px rgba(17,25,39,0.06)'
                }}> */}
                <Box data-aos="zoom-in" sx={{ textAlign: 'center', cursor: 'pointer', p: { xs: 3, md: 5 }, borderRadius: 3, transition: 'transform .2s ease, box-shadow .2s ease', willChange: 'transform', '&:hover': { boxShadow: '0 8px 24px rgba(17,25,39,0.12)', transform: 'translateY(-2px)' } }} data-aos-delay="150">
                  {/* <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', backgroundColor: 'rgba(173,47,145,0.08)', mb: 2 }}> */}
                    <img src={`${WEB_URL}/design.png`} alt="Customize" style={{ width: 56, height: 56 }} />
                  {/* </Box> */}
                 
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Customize</Typography>
                  <Typography variant="body2" color="text.secondary">Add links, media, and make it yours.</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box data-aos="zoom-in" sx={{ textAlign: 'center', cursor: 'pointer',p: { xs: 3, md: 5 }, borderRadius: 3, transition: 'transform .2s ease, box-shadow .2s ease', willChange: 'transform', '&:hover': { boxShadow: '0 8px 24px rgba(17,25,39,0.12)', transform: 'translateY(-2px)' } }} data-aos-delay="300">
                  {/* <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', backgroundColor: 'rgba(173,47,145,0.08)', mb: 2 }}> */}
                    <img src={`${WEB_URL}/Vector.png`} alt="Share" style={{ width: 56, height: 56 }} />
                  {/* </Box> */}
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Share</Typography>
                  <Typography variant="body2" color="text.secondary">Publish and let others explore your space.</Typography>
                </Box>
              </Grid>
            </Grid>
    
      

    </Container>
  );
}


