import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Text,
  Heading,
  Section,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface RescheduleConfirmationEmailProps {
  name: string;
  courseName: string;
  oldCourseDate: string;
  newCourseDate: string;
  newCourseTime: string;
  location: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const RescheduleConfirmationEmail = ({
  name,
  courseName,
  oldCourseDate,
  newCourseDate,
  newCourseTime,
  location,
}: RescheduleConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Je cursus is succesvol verzet</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.png`}
          width="180"
          height="40"
          alt="Theoriecentra.nl"
          style={logo}
        />
        <Heading style={heading}>Cursus Verzet</Heading>
        <Text style={paragraph}>
          Beste {name},
        </Text>
        <Text style={paragraph}>
          Je inschrijving voor de {courseName} is succesvol verzet van {oldCourseDate} naar een nieuwe datum.
        </Text>
        <Section style={box}>
          <Heading as="h2" style={subheading}>Nieuwe Cursusdetails</Heading>
          <Text style={item}><strong>Cursus:</strong> {courseName}</Text>
          <Text style={item}><strong>Nieuwe Datum:</strong> {newCourseDate}</Text>
          <Text style={item}><strong>Tijd:</strong> {newCourseTime}</Text>
          <Text style={item}><strong>Locatie:</strong> {location}</Text>
        </Section>
        <Text style={paragraph}>
          We zien je graag op de nieuwe datum!
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Theoriecentra.nl | Vragen? Antwoord op deze e-mail.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default RescheduleConfirmationEmail;

// Styles
const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 0 48px', marginBottom: '64px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
const box = { padding: '0 24px', margin: '16px 0' };
const logo = { margin: '0 auto', padding: '20px 0' };
const heading = { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' as const, color: '#1a202c', padding: '0 24px' };
const subheading = { fontSize: '18px', fontWeight: 'bold', color: '#2d3748', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' };
const paragraph = { color: '#4a5568', fontSize: '16px', lineHeight: '24px', textAlign: 'left' as const, padding: '0 24px' };
const item = { ...paragraph, padding: '0', margin: '4px 0' };
const hr = { borderColor: '#e2e8f0', margin: '20px 0' };
const footer = { color: '#a0aec0', fontSize: '12px', lineHeight: '16px', textAlign: 'center' as const };