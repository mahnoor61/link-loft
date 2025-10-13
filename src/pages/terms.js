import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Content from './termAndConditionContent';

export default function TermsAndConditions() {
  return (
    <Box sx={{ bgcolor: '#fff' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography sx={{ mb: 2 }} variant="h4" component="div">
        TERMS & CONDITIONS — LinkLoft Company
        </Typography>
        <Content />
      </Container>
    </Box>
  );
}