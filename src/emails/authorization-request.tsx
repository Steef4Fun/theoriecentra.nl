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
  Link,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface AuthorizationRequestEmailProps {
  name: string;
  instructorNumber: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const AuthorizationRequestEmail = ({
  name,
  instructorNumber,
}: AuthorizationRequestEmailProps) => (
  <Html>
    <Head />
    <Preview>Belangrijke actie vereist: machtig ons voor je theorie-examen.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo-straight.png`}
          width="200"
          height="40"
          alt="Theoriecentra.nl"
          style={logo}
        />
        <Heading style={heading}>Actie vereist, {name}!</Heading>
        <Text style={paragraph}>
          Om je theorie-examen voor je te kunnen reserveren, is het noodzakelijk dat je ons machtigt bij het CBR. Dit is een verplichte stap.
        </Text>
        <Section style={box}>
          <Heading as="h2" style={subheading}>Instructies voor Machtigen</Heading>
          <Text style={item}>1. Ga naar mijn.cbr.nl en log in met je DigiD.</Text>
          <Text style={item}>2. Kies voor 'Opleider machtigen'.</Text>
          <Text style={item}>3. Voer ons opleidernummer in: <strong>{instructorNumber}</strong></Text>
          <Text style={item}>4. Volg de verdere stappen om de machtiging te bevestigen.</Text>
        </Section>
        <Button style={button} href="https://www.cbr.nl/nl/rijschool-machtigen.htm">
          Ga naar Mijn CBR
        </Button>
        <Text style={paragraph}>
          Doe dit zo snel mogelijk om vertraging in het reserveren van je examen te voorkomen. Zonder een geldige machtiging kunnen wij het examen niet voor je inplannen.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Theoriecentra.nl | Vragen? Antwoord op deze e-mail.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default AuthorizationRequestEmail;

// Styles
const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 0 48px', marginBottom: '64px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
const box = { padding: '0 24px', margin: '16px 0' };
const logo = { margin: '0 auto', padding: '20px 0' };
const heading = { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' as const, color: '#1a202c', padding: '0 24px' };
const subheading = { fontSize: '18px', fontWeight: 'bold', color: '#2d3748', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' };
const paragraph = { color: '#4a5568', fontSize: '16px', lineHeight: '24px', textAlign: 'left' as const, padding: '0 24px' };
const item = { ...paragraph, padding: '0', margin: '8px 0' };
const button = { backgroundColor: '#221DB0', borderRadius: '0.75rem', color: '#fff', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' as const, display: 'block', padding: '14px 0', margin: '24px' };
const hr = { borderColor: '#e2e8f0', margin: '20px 0' };
const footer = { color: '#a0aec0', fontSize: '12px', lineHeight: '16px', textAlign: 'center' as const };