import React from 'react';
import {
  Typography,
  Box
} from '@mui/material';

export default function AboutUsContent() {
  return (
    <Box sx={{ textAlign: 'justify', pl: { md:- 0.1, xs:0, sm:0 }, pr: 1 }}>
      <Typography color="text.secondary" variant="body1">
        <b>PT Media Duta Dunia</b> is a dynamic and innovative media company dedicated to delivering
        cutting-edge content and creative solutions across multiple platforms. Founded on the
        principles of creativity and excellence, we aim to establish ourselves as a leader in the
        industry, driving meaningful engagement and delivering impactful digital products that
        resonate with diverse audiences.
      </Typography>
      <br/>
      <Typography color="text.secondary" variant="body1">
        <Typography variant="body1"><b>Our Mission</b></Typography>
        <br/>
        <Typography>
          Our mission is to connect people through powerful storytelling and to be at the forefront
          of the media landscape by producing high-quality content that informs, entertains, and
          inspires. We aim to be a trusted source of digital experiences, creating value for our
          audience, clients, and partners.
        </Typography>
        <br/>
        <Typography variant="body1"><b>Our Vision</b></Typography>
        <br/>
        <Typography>
          We envision a world where media transcends boundaries and connects communities. We strive
          to be the go-to media company that keeps pace with the rapid changes in the digital age
          and sets new standards for innovation and excellence in content creation and distribution.
        </Typography>
        <br/>
        <Typography variant="body1"><b>What We Do</b></Typography>
        <Typography>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li>
              <b>Content Creation:</b> We produce engaging, high-quality content that captures
              audiences&apos; attention.
            </li>
            <li>
              <b>Digital Media Solutions:</b> We offer comprehensive digital media services and
              content
              distribution to help brands and businesses effectively reach their target audiences.
            </li>
            <li>
              <b>Broadcast: </b> Our expertise extends to traditional media channels, where we
              deliver
              compelling stories through digital productions.
            </li>
          </ul>
        </Typography>
        <Typography variant="body1"><b>Our Values</b></Typography>
        <Typography>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li>
              <b> Innovation:</b> We embrace change and continuously seek new ways to enhance our
              content and services.
            </li>
            <li>
              <b>Excellence:</b> We strive for excellence in every aspect of our work, from content
              creation to client service.
            </li>
            <li>
              <b>Collaboration:</b> We believe in the power of teamwork and collaboration within our
              company and with our partners and clients.
            </li>
          </ul>
        </Typography>
        <br/>
        <Typography variant="body1"><b>Our Team</b></Typography>
        <br/>
        <Typography>
          Our team at PT Media Duta Dunia is composed of passionate and talented professionals who
          bring a wealth of experience and creativity to the table. From content creators to digital
          strategists, our team is dedicated to delivering exceptional results and positively
          impacting our audience and clients.
        </Typography>
        <br/>
        <Typography>
          <b> PT Media Duta Dunia</b>
          <br/>
          <br/>
          Jl. Kertanegara No. 16, Jakarta 12110 Indonesia
        </Typography>
        <br/>
        <Typography>
          If you have any feedback, questions, or complaints, contact us at <b>info@ravtel.com.</b>
        </Typography>
        <br/>
      </Typography>
    </Box>
  );
}
