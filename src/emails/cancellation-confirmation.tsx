import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Text,
  Heading,
} from '@react-email/components';
import * as React from 'react';

interface CancellationConfirmationEmailProps {
  name: string;
  courseName: string;
  courseDate: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const CancellationConfirmationEmail = ({
  name,
  courseName,
  courseDate,
}: CancellationConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Bevestiging van je annulering</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.png`}
          width="180"
          height="40"
          alt="Theoriecentra.nl"
          style={logo}
        />
        <Heading style={heading}>Annulering Bevestigd</Heading>
        <Text style={paragraph}>
          Beste {name},
        </Text>
        <Text style={paragraph}>
          Hierbij bevestigen we dat je inschrijving voor de <strong>{courseName}</strong> op <strong>{courseDate}</strong> succesvol is geannuleerd.
        </Text>
        <Text style={paragraph}>
          Eventuele terugbetalingen worden verwerkt volgens onze annuleringsvoorwaarden. Mocht je vragen hebben, neem dan gerust contact met ons op.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default CancellationConfirmationEmail;

// Styles
const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 48px', marginBottom: '64px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
const logo = { margin: '0 auto', padding: '20px 0' };
const heading = { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' as const, color: '#1a202c' };
const paragraph = { color: '#4a5568', fontSize: '16px', lineHeight: '24px', textAlign: 'left' as const };