"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Status = "loading" | "success" | "failed" | "pending" | "error";

function StatusDisplay() {
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("registration_id");
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!registrationId) {
      setStatus("error");
      setErrorMessage("Geen inschrijvings-ID gevonden in de link.");
      return;
    }

    let isMounted = true;
    let intervalId: number | undefined;

    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/get-payment-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ registrationId }),
        });
        
        const data = await response.json();

        if (!isMounted) return;

        if (!response.ok || !data.payment_status) {
          throw new Error(data.error || "Kon de status niet ophalen.");
        }

        let currentStatus: Status;
        switch (data.payment_status) {
          case "paid":
            currentStatus = "success";
            break;
          case "pending":
            currentStatus = "pending";
            break;
          case "failed":
          case "expired":
          case "canceled":
            currentStatus = "failed";
            break;
          default:
            currentStatus = "pending";
        }
        
        setStatus(currentStatus);

        if (currentStatus !== 'pending') {
          if (intervalId) clearInterval(intervalId);
        }
      } catch (error) {
        if (!isMounted) return;
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Kon de status van de inschrijving niet ophalen.");
        if (intervalId) clearInterval(intervalId);
      }
    };

    fetchStatus();
    intervalId = window.setInterval(fetchStatus, 3000);

    const timeoutId = setTimeout(() => {
      if (isMounted && (status === 'pending' || status === 'loading')) {
        if (intervalId) clearInterval(intervalId);
        setStatus("error");
        setErrorMessage("Het controleren van de status duurt te lang. Controleer je e-mail voor een definitieve bevestiging of neem contact op.");
      }
    }, 30000); // 30 seconds timeout

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [registrationId, status]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <CardTitle className="mt-4">Status wordt gecontroleerd...</CardTitle>
            <p className="text-muted-foreground mt-2">Een ogenblik geduld, we verifiëren je betaling.</p>
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle className="h-12 w-12 text-green-500" />
            <CardTitle className="mt-4">Inschrijving geslaagd!</CardTitle>
            <p className="text-muted-foreground mt-2">Je betaling is succesvol verwerkt. Je ontvangt spoedig een bevestiging per e-mail.</p>
            <Button asChild className="mt-6">
              <Link href="/cursussen">Bekijk meer cursussen</Link>
            </Button>
          </>
        );
      case "pending":
        return (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <CardTitle className="mt-4">Betaling wordt verwerkt</CardTitle>
            <p className="text-muted-foreground mt-2">De betaling is nog niet definitief. Deze pagina wordt automatisch bijgewerkt. Je ontvangt een e-mail zodra de status bekend is.</p>
          </>
        );
      case "failed":
        return (
          <>
            <XCircle className="h-12 w-12 text-destructive" />
            <CardTitle className="mt-4">Betaling mislukt</CardTitle>
            <p className="text-muted-foreground mt-2">Er is iets misgegaan met de betaling. Je inschrijving is niet voltooid.</p>
            <Button asChild className="mt-6">
              <Link href="/cursussen">Probeer het opnieuw</Link>
            </Button>
          </>
        );
      case "error":
        return (
          <>
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <CardTitle className="mt-4">Fout opgetreden</CardTitle>
            <p className="text-muted-foreground mt-2">{errorMessage || "Er is een onbekende fout opgetreden."}</p>
            <Button asChild className="mt-6">
              <Link href="/contact">Neem contact op</Link>
            </Button>
          </>
        );
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardContent className="flex flex-col items-center text-center pt-6">
            {renderContent()}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

export default function StatusPageWrapper() {
  return (
    <Suspense fallback={<div>Laden...</div>}>
      <StatusDisplay />
    </Suspense>
  );
}