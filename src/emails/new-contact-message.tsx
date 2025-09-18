import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Heading,
  Section,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface NewContactMessageEmailProps {
  name: string;
  email: string;
  message: string;
}

export const NewContactMessageEmail = ({ name, email, message }: NewContactMessageEmailProps) => (
  <Html>
    <Head />
    <Preview>Nieuw contactformulier bericht van {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Nieuw Bericht via Contactformulier</Heading>
        <Section style={box}>
          <Text style={item}><strong>Naam:</strong> {name}</Text>
          <Text style={item}><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></Text>
          <Hr style={hr} />
          <Text style={item}><strong>Bericht:</strong></Text>
          <Text style={messageBox}>{message.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default NewContactMessageEmail;

// Styles
const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 0 48px', borderRadius: '8px' };
const box = { padding: '0 24px' };
const heading = { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' as const, color: '#1a202c', padding: '0 24px' };
const item = { color: '#4a5568', fontSize: '16px', lineHeight: '24px', margin: '4px 0' };
const messageBox = { ...item, padding: '12px', backgroundColor: '#f6f9fc', borderRadius: '4px', border: '1px solid #e2e8f0' };
const hr = { borderColor: '#e2e8f0', margin: '16px 0' };