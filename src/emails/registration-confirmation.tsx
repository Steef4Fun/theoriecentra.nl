import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Heading,
} from '@react-email/components';
import * as React from 'react';

interface RegistrationConfirmationEmailProps {
  name: string;
  courseName: string;
  courseDate: string;
  courseTime: string;
  location: string;
  paymentDetails: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const RegistrationConfirmationEmail = ({
  name,
  courseName,
  courseDate,
  courseTime,
  location,
  paymentDetails,
}: RegistrationConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Je inschrijving voor de theoriecursus is bevestigd!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.png`}
          width="180"
          height="40"
          alt="Theoriecentra.nl"
          style={logo}
        />
        <Heading style={heading}>Bedankt voor je inschrijving, {name}!</Heading>
        <Text style={paragraph}>
          Je plek voor de theoriecursus is succesvol gereserveerd. We kijken ernaar uit je te helpen slagen.
        </Text>
        <Section style={box}>
          <Heading as="h2" style={subheading}>Cursusdetails</Heading>
          <Text style={item}><strong>Cursus:</strong> {courseName}</Text>
          <Text style={item}><strong>Datum:</strong> {courseDate}</Text>
          <Text style={item}><strong>Tijd:</strong> {courseTime}</Text>
          <Text style={item}><strong>Locatie:</strong> {location}</Text>
        </Section>
        <Section style={box}>
          <Heading as="h2" style={subheading}>Betalingsdetails</Heading>
          <Text style={item}>{paymentDetails}</Text>
        </Section>
        <Text style={paragraph}>
          <strong>Belangrijk:</strong> Binnenkort ontvang je een aparte e-mail met instructies om ons te machtigen voor het CBR theorie-examen. Houd je inbox in de gaten!
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Theoriecentra.nl | Vragen? Antwoord op deze e-mail of neem contact op via onze website.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default RegistrationConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
};

const box = {
  padding: '0 24px',
  margin: '16px 0',
};

const logo = {
  margin: '0 auto',
  padding: '20px 0',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  color: '#1a202c',
  padding: '0 24px',
};

const subheading = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#2d3748',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '8px',
  marginBottom: '16px',
};

const paragraph = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  padding: '0 24px',
};

const item = {
  ...paragraph,
  padding: '0',
  margin: '4px 0',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '20px 0',
};

const footer = {
  color: '#a0aec0',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
};