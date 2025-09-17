import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Text,
  Heading,
  Link,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface NewRegistrationNotificationProps {
  studentName: string;
  courseName: string;
  courseDate: string;
  registrationId: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const NewRegistrationNotificationEmail = ({
  studentName,
  courseName,
  courseDate,
  registrationId,
}: NewRegistrationNotificationProps) => (
  <Html>
    <Head />
    <Preview>Nieuwe inschrijving: {studentName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.png`}
          width="180"
          height="40"
          alt="Theoriecentra.nl"
          style={logo}
        />
        <Heading style={heading}>Nieuwe Inschrijving</Heading>
        <Text style={paragraph}>
          Er is een nieuwe inschrijving binnengekomen.
        </Text>
        <Text style={item}><strong>Leerling:</strong> {studentName}</Text>
        <Text style={item}><strong>Cursus:</strong> {courseName}</Text>
        <Text style={item}><strong>Datum:</strong> {courseDate}</Text>
        <Button 
          style={button} 
          href={`${baseUrl}/admin/aanmeldingen/${registrationId}`}
        >
          Bekijk in Beheerpaneel
        </Button>
      </Container>
    </Body>
  </Html>
);

export default NewRegistrationNotificationEmail;

// Styles
const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 48px', marginBottom: '64px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
const logo = { margin: '0 auto', padding: '20px 0' };
const heading = { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' as const, color: '#1a202c' };
const paragraph = { color: '#4a5568', fontSize: '16px', lineHeight: '24px', textAlign: 'center' as const };
const item = { ...paragraph, textAlign: 'left' as const, margin: '4px 0' };
const button = { backgroundColor: '#221DB0', borderRadius: '0.75rem', color: '#fff', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' as const, display: 'block', width: '100%', padding: '12px' };