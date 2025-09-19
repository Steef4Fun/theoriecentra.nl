"use server";

import { Resend } from 'resend';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Registration, Course, Category, Location, User } from '@prisma/client';
import prisma from './prisma';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = 'Theoriecentra.nl <info@theoriecentra.chargehosting.com>';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

type FullRegistration = Registration & {
  course: (Course & {
    category: Category | null;
    location: Location | null;
    instructor: User | null;
  }) | null;
};

async function sendEmail(to: string[], subject: string, html: string) {
  try {
    await resend.emails.send({ from: fromEmail, to, subject, html });
    await prisma.mailLog.create({
      data: { recipient: to.join(', '), subject, htmlBody: html, status: 'sent' },
    });
  } catch (error) {
    console.error(`Fout bij verzenden van e-mail "${subject}" naar ${to.join(', ')}:`, error);
    await prisma.mailLog.create({
      data: {
        recipient: to.join(', '),
        subject,
        htmlBody: html,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });
  }
}

async function sendTemplatedEmail(templateName: string, recipient: string | string[], data: Record<string, any>) {
  const template = await prisma.mailTemplate.findUnique({ where: { name: templateName } });
  if (!template) {
    console.error(`Mail template "${templateName}" niet gevonden.`);
    return;
  }

  let subject = template.subject;
  let htmlBody = template.htmlBody;

  for (const key in data) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    subject = subject.replace(regex, data[key]);
    htmlBody = htmlBody.replace(regex, data[key]);
  }

  const to = Array.isArray(recipient) ? recipient : [recipient];
  await sendEmail(to, subject, htmlBody);
}

export const sendRegistrationEmails = async (registration: FullRegistration) => {
  if (!registration.course) return;

  // 1. Confirmation to student
  const totalPrice = registration.course.basePrice + registration.course.examFee;
  const depositPrice = registration.course.examFee + 20;
  const remainingPrice = totalPrice - depositPrice;
  const confirmationData = {
    name: registration.firstName,
    courseName: `${registration.course.category?.name} Theoriecursus`,
    courseDate: format(new Date(registration.course.courseDate), "eeee d MMMM yyyy", { locale: nl }),
    courseTime: `${registration.course.startTime.substring(0, 5)} - ${registration.course.endTime.substring(0, 5)}`,
    location: registration.course.location?.name || 'N/A',
    paymentDetails: registration.paymentOption === 'full'
      ? `Volledige betaling van €${totalPrice.toFixed(2)} is voldaan.`
      : `Aanbetaling van €${depositPrice.toFixed(2)} is voldaan. Het resterende bedrag van €${remainingPrice.toFixed(2)} dient contant betaald te worden op de cursusdag.`,
  };
  await sendTemplatedEmail('registration-confirmation', registration.email, confirmationData);

  // 2. Authorization request to student
  const authData = {
    name: registration.firstName,
    instructorNumber: registration.course.instructorNumber,
  };
  await sendTemplatedEmail('authorization-request', registration.email, authData);

  // 3. Notification to admin/instructor
  const setting = await prisma.setting.findUnique({ where: { key: 'sendAdminNotifications' } });
  const sendToAdmins = setting?.value === 'true';
  
  const recipients = new Set<string>();
  if (registration.course.instructor?.email) {
    recipients.add(registration.course.instructor.email);
  }

  if (sendToAdmins) {
    const admins = await prisma.user.findMany({ where: { role: 'admin' } });
    admins.forEach(admin => {
      if (admin.email) {
        recipients.add(admin.email);
      }
    });
  }

  if (recipients.size > 0) {
    const notificationData = {
      studentName: `${registration.firstName} ${registration.lastName}`,
      courseName: `${registration.course.category?.name} Theoriecursus`,
      courseDate: format(new Date(registration.course.courseDate), "d MMMM yyyy", { locale: nl }),
      registrationId: registration.id,
    };
    await sendTemplatedEmail('new-registration-notification', Array.from(recipients), notificationData);
  }
};

export const sendCancellationEmail = async (registration: FullRegistration) => {
  if (!registration.course) return;
  const data = {
    name: registration.firstName,
    courseName: `${registration.course.category?.name} Theoriecursus`,
    courseDate: format(new Date(registration.course.courseDate), "d MMMM yyyy", { locale: nl }),
  };
  await sendTemplatedEmail('cancellation-confirmation', registration.email, data);
};

export const sendRescheduleEmail = async (registration: FullRegistration, oldCourseDate: Date) => {
    if (!registration.course) return;
    const data = {
        name: registration.firstName,
        courseName: `${registration.course.category?.name} Theoriecursus`,
        oldCourseDate: format(oldCourseDate, "d MMMM yyyy", { locale: nl }),
        newCourseDate: format(new Date(registration.course.courseDate), "d MMMM yyyy", { locale: nl }),
        newCourseTime: `${registration.course.startTime.substring(0, 5)} - ${registration.course.endTime.substring(0, 5)}`,
        location: registration.course.location?.name || 'N/A',
    };
    await sendTemplatedEmail('reschedule-confirmation', registration.email, data);
};

export const sendPasswordSetupEmail = async (user: User, token: string) => {
  if (!user.email) return;
  const setupLink = `${appUrl}/auth/set-password?token=${token}`;
  await sendTemplatedEmail('password-setup-invitation', user.email, { setupLink });
};

export const sendPasswordResetEmail = async (user: User, token: string) => {
  if (!user.email) return;
  const resetLink = `${appUrl}/auth/set-password?token=${token}`;
  await sendTemplatedEmail('password-reset-request', user.email, { resetLink });
};