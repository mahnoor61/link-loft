import { Box, Container, Grid, Stack, Typography } from '@mui/material';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

const images = [
  `${WEB_URL}/loft1.png`,
  `${WEB_URL}/loft2.png`,
  `${WEB_URL}/loft3.png`,
  `${WEB_URL}/loft4.png`
];

export default function SectionThree() {
  return (
    <>
    <Box sx={{
        backgroundColor: '#FFFBFA',
      // backgroundImage: `url(${WEB_URL}/bg.png)`,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center'

    }}>
    <Container maxWidth="lg" sx={{ height:'100%',
    py:10, 
      // minHeight:'100vh', 
      display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
      <Box alignItems="center" justifyContent="space-between" sx={{ mb: 3, width:'100%', display:'flex',  flexDirection:{xs:'column', md:'row'}, gap:{xs:2, md:0}}}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 , mb:3}} data-aos="zoom-in">Featured Lofts</Typography>
          <Typography color="text.secondary" data-aos="zoom-in" data-aos-delay="100">
            Get inspired by these featured lofts and start building yours today.
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer' , mt:{xs:2, md:0}, m:3}} data-aos="zoom-in" data-aos-delay="150">
          See more ↗
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {images.map((src, idx) => (
          <Grid item xs={12} sm={6} md={3} key={src}>
            <Box data-aos="zoom-in" data-aos-delay={idx * 100}
                 sx={{
                   borderRadius: 3,
                   overflow: 'hidden',
                   position: 'relative',
                   aspectRatio: '3 / 4',
                   backgroundColor: 'neutral.100',
                   transition: 'box-shadow .3s ease',
                   '&:hover img': { transform: 'scale(1.04)' },
                   '&:hover .overlay': { opacity: 0.2 },
                   '&:hover': { boxShadow: '0 8px 24px rgba(17,25,39,0.12)' }
                 }}>
              <Box
                component="img"
                src={src}
                alt={`Loft ${idx + 1}`}
                sx={{
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform .3s ease'
                }}
              />
              <Box className="overlay" sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.3))', opacity: 0.35, transition: 'opacity .3s ease', pointerEvents: 'none' }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
    
</>
  );
}


