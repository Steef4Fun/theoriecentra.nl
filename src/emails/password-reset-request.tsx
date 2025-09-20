import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Text,
  Heading,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface PasswordResetRequestEmailProps {
  resetLink: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const PasswordResetRequestEmail = ({ resetLink }: PasswordResetRequestEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset je wachtwoord voor Theoriecentra.nl</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo-straight.png`}
          width="200"
          height="40"
          alt="Theoriecentra.nl"
          style={logo}
        />
        <Heading style={heading}>Wachtwoord Resetten</Heading>
        <Text style={paragraph}>
          We hebben een verzoek ontvangen om je wachtwoord te resetten. Klik op de knop hieronder om een nieuw wachtwoord in te stellen.
        </Text>
        <Button style={button} href={resetLink}>
          Reset Wachtwoord
        </Button>
        <Text style={paragraph}>
          Deze link is 1 uur geldig. Als je dit verzoek niet hebt gedaan, kun je deze e-mail veilig negeren.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetRequestEmail;

// Styles
const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 0 48px', borderRadius: '8px' };
const logo = { margin: '0 auto', padding: '20px 0' };
const heading = { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' as const, color: '#1a202c' };
const paragraph = { color: '#4a5568', fontSize: '16px', lineHeight: '24px', textAlign: 'center' as const, padding: '0 24px' };
const button = { backgroundColor: '#221DB0', borderRadius: '0.75rem', color: '#fff', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' as const, display: 'block', padding: '14px 0', margin: '24px' };