// import Link from 'next/link';
// import { Box, Button, Container, Stack, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

// export default function SectionOne() {
//   const theme = useTheme();

//   return (
//     <Box sx={{
//       backgroundColor: '#FFFBFA',
//       // backgroundImage: `url(${WEB_URL}/bg.png)`,
//       // backgroundRepeat: 'no-repeat',
//       // backgroundSize: 'cover',
//       height:'100%',
//       position:'relative',
//       // minHeight:'100vh',
//       backgroundPosition: 'center',
//        overflowX: 'hidden',
//       py: { xs: 0, md: 10 }
//     }}>

//       <Box
//       sx={{display: {md:'block', xs:'none'}}}
//         // sx={{
//         //   position: 'absolute',
//         //   top: '10%',
//         //   right: 0,
//         //   display: { xs: 'none', md: 'block' },
//         //   // height: '100%',
//         //   // width: { xs: '100vw', md: '35vw' },
//         //   borderRadius: 3,
         
//         // }}
//          data-aos="fade-left"
//       > 
//         <img src={`${WEB_URL}/p1.png`} alt="Living room" style={{ width: '50%', position:'absolute', right: 0}} />
//       </Box>
//       <Container maxWidth="lg">
//         <Box sx={{height:'100%' ,py:10,display: 'flex', alignItems: 'center' }}>
//           <Box data-aos="zoom-out" >
//             <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
//               Welcome to
//             </Typography>
//             <Typography variant="h1" sx={{ fontWeight: 900, lineHeight: 1.05, mb: 2, color: theme.palette.text.primary }}>
//               LinkLoft
//             </Typography>
//             <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 520 }}>
//               Your Virtual 360° Link Hub. Create a 360° loft, add your links, and share everywhere.
//             </Typography>
//             <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
//               <Link href="/" style={{ textDecoration: 'none' }}>
//                 <Button size="large" variant="contained"
//                         sx={{
//                           borderRadius: 999,
//                           backgroundColor: theme.palette.text.primary,
//                           color: '#FFFFFF',
//                           '&:hover': {
//                             backgroundColor: theme.palette.text.primary,
//                             color: '#FFFFFF'
//                           }
//                         }}
//                 >
//                   Try A Loft
//                 </Button>
//               </Link>
//               <Link href="/signup" style={{ textDecoration: 'none' }}>
//                 <Button size="large" variant="outlined">Signup for Free</Button>
//               </Link>
//             </Stack>
//           </Box>
//         </Box>
//         <Box
//         sx={{
//           // position: 'absolute',
//           // top: '10%',
//           // right: 0,
//           display: { xs: 'block', md: 'none' },
//           // height: '100%',
//           // width: { xs: '100vw', md: '45vw' },
//           borderRadius: 3,
         
//         }}
//         data-aos="fade-left"
//       >
//         <img src={`${WEB_URL}/p1.png`} alt="Living room" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
//       </Box>
//       </Container>
//     </Box>
//   );
// }





import Link from 'next/link';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

export default function SectionOne() {
  const theme = useTheme();

  return (
    <Box sx={{
      backgroundColor: '#FFFBFA',
      height:'100%',
      position:'relative',
      backgroundPosition: 'center',
      overflowX: 'hidden',
      py: { xs: 6, md: 12 }
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left column: content */}
          <Grid item xs={12} md={6}>
            <Box data-aos="zoom-out">
              <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                Welcome to
              </Typography>
              <Typography variant="h1" sx={{ fontWeight: 900, lineHeight: 1.05, mb: 2, color: theme.palette.text.primary }}>
                LinkLoft
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 520 }}>
                Your Virtual 360° Link Hub. Create a 360° loft, add your links, and share everywhere.
              </Typography>
              <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <Button size="large" variant="contained"
                          sx={{
                            borderRadius: 999,
                            backgroundColor: theme.palette.text.primary,
                            color: '#FFFFFF',
                            '&:hover': {
                              backgroundColor: theme.palette.text.primary,
                              color: '#FFFFFF'
                            }
                          }}
                  >
                    Try A Loft
                  </Button>
                </Link>
                <Link href="/signup" style={{ textDecoration: 'none' }}>
                  <Button size="large" variant="outlined">Signup for Free</Button>
                </Link>
              </Stack>
            </Box>
          </Grid>

          {/* Right column: image */}
          <Grid item xs={12} md={6}>
            <Box data-aos="fade-left" sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <img src={`${WEB_URL}/p1.png`} alt="Living room" style={{ width: '100%', maxWidth: 520 }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


