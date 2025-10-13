import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Content() {
  return (
    <>
      <Box sx={{ textAlign: 'justify', pl: 3, pr: 3, pt: 2 }}>
        {/* <Typography variant="h6" sx={{ fontWeight: 700 }}>
          TERMS & CONDITIONS — LinkLoft Company
        </Typography> */}
        <Typography sx={{ fontWeight: 700 }} color="text.secondary" variant="body2">
          Last Updated: October 2025
        </Typography>
        <Typography  sx={{ fontWeight: 700 }} color="text.secondary" variant="body2">
          Website: <a href="https://linkloft.me" target="_blank" rel="noopener noreferrer">https://linkloft.me</a>
        </Typography>
        <Typography  color="text.secondary" variant="body2" sx={{ mb: 2 , fontWeight: 700 }}>
          Contact: <a href="mailto:hi@linkloft.me">hi@linkloft.me</a>
        </Typography>

        <Typography color="text.secondary" variant="body1">
          Welcome to LinkLoft website (“we,” “our,” “us”). These Terms & Conditions (“Terms”) govern your access to and use of our website, app, and related services (collectively, the “Platform”). By creating an account or using LinkLoft, you agree to these Terms. Please read them carefully.
        </Typography>
        <br/>

        <Typography variant="body1"><b>Eligibility</b></Typography>
        <Typography color="text.secondary" variant="body1">
          You must be at least 18 years old, or 16 with the consent of a parent or legal guardian, to create an account or use LinkLoft. By using the Platform, you confirm that you meet these requirements and have the legal authority to agree to these Terms.
        </Typography>
        <br/>

        <Typography variant="body1"><b>Accounts and Access</b></Typography>
        <Typography color="text.secondary" variant="body1">
          When you register for a LinkLoft account, you agree to provide accurate and up-to-date information. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.
          <br/>
          LinkLoft reserves the right, at its sole discretion, to suspend, restrict, or permanently terminate any account at any time, with or without notice, for conduct that we believe violates these Terms, applicable laws, or our community standards, or for any other reason deemed necessary to protect the integrity or security of the Platform.
          <br/>
          By signing up, you consent to receive emails, messages, and/or push notifications from LinkLoft relating to your account activity, updates, promotions, or required legal notices. You may adjust your communication preferences at any time through your account settings or by contacting us directly.
        </Typography>
        <br/>

        <Typography variant="body1"><b>Free and Paid Plans</b></Typography>
        <Typography color="text.secondary" variant="body1">
          LinkLoft offers both free and premium subscription plans. Paid plans may include additional features such as custom themes, expanded link space, analytics, or advanced integrations. Payments are processed securely through trusted third-party providers such as Stripe, PayPal, and Google Pay. We do not store credit card details on our servers.
          <br/>
          All fees are displayed before purchase and are non-refundable unless otherwise required by law. You may cancel or downgrade your plan at any time; however, no prorated refunds are issued for partial billing periods.
        </Typography>
        <br/>

        <Typography variant="body1"><b>User Content</b></Typography>
        <Typography color="text.secondary" variant="body1">
          You own the content you upload, including text, images, videos, and links (“User Content”). By posting or uploading content to LinkLoft, you grant us a limited, non-exclusive, worldwide, royalty-free license to host, display, and distribute your content as needed to operate the Platform.
          <br/>
          You are solely responsible for your content and must ensure it does not:
        </Typography>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
          <li>Infringe on any third-party rights;</li>
          <li>Contain illegal, offensive, or adult material;</li>
          <li>Mislead, harass, or harm others.</li>
        </ul>
        <Typography color="text.secondary" variant="body1">
          We reserve the right to remove or restrict any content that violates these rules or that we deem inappropriate for the Platform.
        </Typography>
        <br/>

        <Typography variant="body1"><b>Third-Party Links & Payments</b></Typography>
        <Typography color="text.secondary" variant="body1">
          Your LinkLoft profile may include third-party payment or content links such as PayPal, Cash App, Zelle, Apple Pay, Google Pay, or Stripe. These services are not operated by LinkLoft. We are not responsible for third-party terms, security, or payment processing. Use them at your own discretion.
        </Typography>
        <br/>

        <Typography variant="body1"><b>Intellectual Property</b></Typography>
        <Typography color="text.secondary" variant="body1">
          All trademarks, designs, and content on LinkLoft (excluding user content) are the property of LinkLoft and protected by U.S. and international law. You may not copy, distribute, or modify any part of the Platform without our written consent.
        </Typography>
        <br/>

        <Typography variant="body1"><b>Limitation of Liability</b></Typography>
        <Typography color="text.secondary" variant="body1">
          LinkLoft is provided “as is” without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages resulting from your use of the Platform. While we work hard to ensure uptime and security, we cannot guarantee uninterrupted or error-free service.
        </Typography>
        <br/>

        <Typography variant="body1"><b>Termination</b></Typography>
        <Typography color="text.secondary" variant="body1">
          You may delete your account at any time through your dashboard. LinkLoft may, at its sole discretion, suspend, disable, or terminate your account or access to the Platform without prior notice if you violate these Terms, use LinkLoft in a harmful or unlawful manner, or engage in activity deemed detrimental to the company or its users.
          <br/>
          Upon termination, your right to use the Platform will immediately cease, and LinkLoft reserves the right to delete or restrict access to any data associated with your account, in accordance with applicable law and our Privacy Policy.
        </Typography>
        <br/>

        <Typography variant="body1"><b>Changes to These Terms</b></Typography>
        <Typography color="text.secondary" variant="body1">
          We may update these Terms occasionally. Updated versions will be posted on this page with a new “Last Updated” date. Your continued use of LinkLoft after updates means you accept the revised Terms.
        </Typography>
        <br/>

        <Typography variant="body1"><b>Governing Law</b></Typography>
        <Typography color="text.secondary" variant="body1">
          These Terms are governed by the laws of the State of Illinois, USA, without regard to conflict of law principles.
        </Typography>
        <br/>

        <Typography variant="body1"><b>Contact</b></Typography>
        <Typography color="text.secondary" variant="body1">
          For any questions regarding these Terms, please contact us at  <a href="https://linkloft.me" target="_blank" rel="noopener noreferrer">https://linkloft.me</a>
        </Typography>
      </Box>
    </>
  );
}