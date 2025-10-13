import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PrivacyContent from './privacyContent';
import Navbar from 'src/components/homepage/navbar';
import Footer from 'src/components/homepage/footer';

export default function PrivacyPolicy() {
  return (
    <Box sx={{ bgcolor: '#fff' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 15 }}>
        <Typography sx={{ mb: 2 }} variant="h4" component="div">
        PRIVACY POLICY — LinkLoft Last Updated: October 2025
        </Typography>
        <Typography color="text.secondary" variant="body2" component="div">
          <PrivacyContent />
        </Typography>
      </Container>
      <Footer />
    </Box>
  );
}