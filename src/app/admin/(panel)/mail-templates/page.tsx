import { MailTemplatesClient } from "@/components/admin/mail-templates-client";

export default function MailTemplatesPage() {
  const templates = [
    { id: 'registration-confirmation', name: 'Bevestiging Inschrijving', description: 'Wordt verstuurd na een succesvolle betaling.' },
    { id: 'authorization-request', name: 'Verzoek tot Machtiging', description: 'Wordt verstuurd na de bevestiging.' },
    { id: 'new-registration-notification', name: 'Notificatie Nieuwe Inschrijving', description: 'Wordt verstuurd naar admins/cursusleiders.' },
    { id: 'cancellation-confirmation', name: 'Bevestiging Annulering', description: 'Wordt verstuurd na annulering door een admin.' },
    { id: 'reschedule-confirmation', name: 'Bevestiging Verzetten', description: 'Wordt verstuurd na verzetten door een admin.' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Mail Templates</h1>
      <p className="text-muted-foreground mb-6">Overzicht van alle transactionele e-mails. Bewerken is momenteel nog niet mogelijk.</p>
      <MailTemplatesClient templates={templates} />
    </div>
  );
}