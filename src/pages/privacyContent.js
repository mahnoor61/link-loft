import React from 'react';
import { Typography, Box } from '@mui/material';

export default function PrivacyContent() {
  return (
    <Box sx={{ textAlign: 'justify', pl: 1, pr: 2.5, pt: 2 }}>
      {/* <Typography variant="h6" sx={{ fontWeight: 700 }}>
        PRIVACY POLICY — LinkLoft
      </Typography> */}
      <Typography color="text.secondary" variant="body2">
        Last Updated: October 2025
      </Typography>
      <Typography color="text.secondary" variant="body2">
        Website: <a href="https://linkloft.me" target="_blank" rel="noopener noreferrer">https://linkloft.me</a>
      </Typography>
      <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
        Contact: <a href="mailto:hi@linkloft.me">hi@linkloft.me</a>
      </Typography>

      <Typography color="text.secondary" variant="body1">
        At LinkLoft, your privacy and trust are important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
      </Typography>
      <br/>

      <Typography variant="body1"><b>Information We Collect</b></Typography>
      <Typography color="text.secondary" variant="body1">
        We collect information when you:
      </Typography>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>Create an account (name, email, password, or login via Google)</li>
        <li>Subscribe or make purchases (billing name, email, payment details processed by third parties)</li>
        <li>Upload content (images, links, videos, and custom backgrounds)</li>
        <li>Use the Platform (device type, browser, and usage analytics)</li>
      </ul>
      <Typography color="text.secondary" variant="body1">
        We do not store full credit card numbers. All payments are handled securely by Stripe, PayPal, and Google Pay under their own privacy policies.
      </Typography>
      <br/>

      <Typography variant="body1"><b>How We Use Your Information</b></Typography>
      <Typography color="text.secondary" variant="body1">
        We use your data to:
      </Typography>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>Operate and personalize your LinkLoft profile</li>
        <li>Process payments and manage subscriptions</li>
        <li>Improve our services and user experience</li>
        <li>Send account-related notifications, updates, and marketing emails (you may opt out at any time)</li>
        <li>Prevent fraud and ensure platform security</li>
      </ul>
      <Typography color="text.secondary" variant="body1">
        By registering for a LinkLoft account, you consent to receive transactional emails, system alerts, and service-related communications that are necessary for account management and security.
      </Typography>
      <br/>

      <Typography variant="body1"><b>Sharing of Information</b></Typography>
      <Typography color="text.secondary" variant="body1">
        We may share limited information with trusted partners for:
      </Typography>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>Payment processing (Stripe, PayPal, Google Pay)</li>
        <li>Analytics and performance tracking</li>
        <li>Cloud hosting and technical operations</li>
      </ul>
      <Typography color="text.secondary" variant="body1">
        We never sell your personal data to advertisers or third parties.
      </Typography>
      <br/>

      <Typography variant="body1"><b>Cookies & Tracking</b></Typography>
      <Typography color="text.secondary" variant="body1">
        LinkLoft uses cookies and similar technologies to remember preferences, enable login, and improve functionality. You can disable cookies through your browser settings, but some features may not function properly.
      </Typography>
      <br/>

      <Typography variant="body1"><b>Data Storage & Security</b></Typography>
      <Typography color="text.secondary" variant="body1">
        Your data is stored securely using encrypted cloud servers. We take reasonable technical and organizational measures to protect against unauthorized access, loss, or misuse.
      </Typography>
      <br/>

      <Typography variant="body1"><b>Your Rights</b></Typography>
      <Typography color="text.secondary" variant="body1">
        Depending on your location, you may have the right to:
      </Typography>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>Access, correct, or delete your personal information</li>
        <li>Withdraw consent for marketing emails</li>
        <li>Request a copy of your data</li>
      </ul>
      <Typography color="text.secondary" variant="body1">
        To exercise these rights, contact us at hi@linkloft.me.
      </Typography>
      <br/>

      <Typography variant="body1"><b>Children’s Privacy</b></Typography>
      <Typography color="text.secondary" variant="body1">
        LinkLoft is not directed toward children under 16. We do not knowingly collect personal information from minors without parental consent.
      </Typography>
      <br/>

      <Typography variant="body1"><b>Changes to This Policy</b></Typography>
      <Typography color="text.secondary" variant="body1">
        We may update this Privacy Policy as our services evolve. Updates will be posted on this page with a new “Last Updated” date.
      </Typography>
      <br/>

      <Typography variant="body1"><b>Contact</b></Typography>
      <Typography color="text.secondary" variant="body1">
        For questions about privacy or data use, email hi@linkloft.me.
      </Typography>
      <br/>

      <Typography color="text.secondary" variant="body2">
        © 2025 LinkLoft. All rights reserved. | <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a>
      </Typography>
    </Box>
  );
}
