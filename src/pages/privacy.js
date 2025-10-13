import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PrivacyContent from './privacyContent';

export default function PrivacyPolicy() {
  return (
    <Box sx={{ bgcolor: '#fff' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography sx={{ mb: 2 }} variant="h4" component="div">
        PRIVACY POLICY — LinkLoft Last Updated: October 2025
        </Typography>
        <Typography color="text.secondary" variant="body2" component="div">
          <PrivacyContent />
        </Typography>
      </Container>
    </Box>
  );
}