"use server";

import { Resend } from 'resend';
import RegistrationConfirmationEmail from '@/emails/registration-confirmation';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Registration, Course as PrismaCourse, Category, Location } from '@prisma/client';

const resend = new Resend(process.env.RESEND_API_KEY);

type FullRegistration = Registration & {
  course: (PrismaCourse & {
    category: Category | null;
    location: Location | null;
  }) | null;
};

export const sendRegistrationConfirmationEmail = async (registration: FullRegistration) => {
  if (!registration.course) {
    console.error("Kan bevestigingsmail niet verzenden: cursusgegevens ontbreken.");
    return;
  }

  const totalPrice = registration.course.basePrice.toNumber() + registration.course.examFee.toNumber();
  const depositPrice = registration.course.examFee.toNumber() + 20;
  const remainingPrice = totalPrice - depositPrice;

  const emailData = {
    name: registration.firstName,
    courseName: `${registration.course.category?.name} Theoriecursus`,
    courseDate: format(new Date(registration.course.courseDate), "eeee d MMMM yyyy", { locale: nl }),
    courseTime: `${registration.course.startTime.substring(0, 5)} - ${registration.course.endTime.substring(0, 5)}`,
    location: registration.course.location?.name || 'N/A',
    paymentDetails: registration.paymentOption === 'full'
      ? `Volledige betaling van €${totalPrice.toFixed(2)} is voldaan.`
      : `Aanbetaling van €${depositPrice.toFixed(2)} is voldaan. Het resterende bedrag van €${remainingPrice.toFixed(2)} dient contant betaald te worden op de cursusdag.`,
  };

  try {
    await resend.emails.send({
      from: 'Theoriecentra.nl <info@theoriecentra.chargehosting.com>',
      to: [registration.email],
      subject: 'Bevestiging van je inschrijving',
      react: RegistrationConfirmationEmail(emailData),
    });
    console.log(`Bevestigingsmail verzonden naar ${registration.email}`);
  } catch (error) {
    console.error('Fout bij verzenden van bevestigingsmail:', error);
  }
};