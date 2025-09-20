import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { render } from '@react-email/render';
import RegistrationConfirmationEmail from '../src/emails/registration-confirmation';
import AuthorizationRequestEmail from '../src/emails/authorization-request';
import NewRegistrationNotificationEmail from '../src/emails/new-registration-notification';
import CancellationConfirmationEmail from '../src/emails/cancellation-confirmation';
import RescheduleConfirmationEmail from '../src/emails/reschedule-confirmation';
import { PasswordSetupInvitationEmail } from '../src/emails/password-setup-invitation';
import { PasswordResetRequestEmail } from '../src/emails/password-reset-request';

const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file');
  }

  console.log(`Checking for admin user: ${adminEmail}`);
  const adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log(`Admin user ${adminEmail} created successfully.`);
  } else {
    console.log(`Admin user ${adminEmail} already exists.`);
  }

  // Seed mail templates
  console.log('Seeding mail templates...');
  const templates = [
    {
      name: 'registration-confirmation',
      description: 'Wordt verstuurd na een succesvolle betaling.',
      subject: 'Bevestiging van je inschrijving',
      component: RegistrationConfirmationEmail({
        name: '{{name}}',
        courseName: '{{courseName}}',
        courseDate: '{{courseDate}}',
        courseTime: '{{courseTime}}',
        location: '{{location}}',
        paymentDetails: '{{paymentDetails}}',
      }),
    },
    {
      name: 'authorization-request',
      description: 'Wordt verstuurd na de bevestiging.',
      subject: 'Belangrijke actie: Machtig ons voor je examen',
      component: AuthorizationRequestEmail({
        name: '{{name}}',
        instructorNumber: '{{instructorNumber}}',
      }),
    },
    {
      name: 'new-registration-notification',
      description: 'Wordt verstuurd naar admins/cursusleiders.',
      subject: 'Nieuwe inschrijving: {{studentName}}',
      component: NewRegistrationNotificationEmail({
        studentName: '{{studentName}}',
        courseName: '{{courseName}}',
        courseDate: '{{courseDate}}',
        registrationId: '{{registrationId}}',
      }),
    },
    {
      name: 'cancellation-confirmation',
      description: 'Wordt verstuurd na annulering door een admin.',
      subject: 'Bevestiging van je annulering',
      component: CancellationConfirmationEmail({
        name: '{{name}}',
        courseName: '{{courseName}}',
        courseDate: '{{courseDate}}',
      }),
    },
    {
      name: 'reschedule-confirmation',
      description: 'Wordt verstuurd na verzetten door een admin.',
      subject: 'Je cursus is succesvol verzet',
      component: RescheduleConfirmationEmail({
        name: '{{name}}',
        courseName: '{{courseName}}',
        oldCourseDate: '{{oldCourseDate}}',
        newCourseDate: '{{newCourseDate}}',
        newCourseTime: '{{newCourseTime}}',
        location: '{{location}}',
      }),
    },
    {
      name: 'password-setup-invitation',
      description: 'Wordt verstuurd als een admin een gebruiker aanmaakt zonder wachtwoord.',
      subject: 'Stel je wachtwoord in voor Theoriecentra.nl',
      component: PasswordSetupInvitationEmail({
        setupLink: '{{setupLink}}',
      }),
    },
    {
      name: 'password-reset-request',
      description: 'Wordt verstuurd na een "wachtwoord vergeten" verzoek.',
      subject: 'Reset je wachtwoord voor Theoriecentra.nl',
      component: PasswordResetRequestEmail({
        resetLink: '{{resetLink}}',
      }),
    },
  ];

  for (const t of templates) {
    const htmlBody = render(t.component);
    const existingTemplate = await prisma.mailTemplate.findUnique({
      where: { name: t.name },
    });

    const templateData = {
      name: t.name,
      description: t.description,
      subject: t.subject,
      htmlBody: htmlBody,
    };

    if (existingTemplate) {
      await prisma.mailTemplate.update({
        where: { name: t.name },
        data: templateData,
      });
    } else {
      await prisma.mailTemplate.create({
        data: templateData,
      });
    }
  }
  console.log(`${templates.length} mail templates seeded successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });