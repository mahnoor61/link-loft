import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Content from './termAndConditionContent';
import Navbar from 'src/components/homepage/navbar';
import Footer from 'src/components/homepage/footer';

export default function TermsAndConditions() {
  return (
    <Box sx={{ bgcolor: '#fff' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 15 }}>
        <Typography sx={{ mb: 2 }} variant="h4" component="div">
        TERMS & CONDITIONS — LinkLoft Company
        </Typography>
        <Content />
      </Container>
      <Footer />
    </Box>
  );
}