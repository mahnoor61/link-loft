import Head from 'next/head';
import { Box, Toolbar, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from '../components/homepage/navbar';
import SectionOne from '../components/homepage/section-one';
import SectionTwo from '../components/homepage/section-two';
import SectionThree from '../components/homepage/section-three';
import SectionFour from '../components/homepage/section-four';
import Footer from '../components/homepage/footer';

export default function Homepage() {

  return (
    <>
      <Head>
        <title>Homepage | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Navbar />
      <Toolbar />
      <Box >
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </Box>
      <Footer />
    </>
  );
}


