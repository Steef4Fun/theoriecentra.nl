"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 p-4 z-50">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4">
          <p className="text-sm text-muted-foreground flex-grow">
            Wij gebruiken cookies om uw surfervaring te verbeteren en het verkeer op de site te analyseren. Lees ons{" "}
            <Link href="/privacybeleid" className="underline hover:text-primary">
              privacybeleid
            </Link>{" "}
            voor meer informatie.
          </p>
          <Button onClick={handleAccept} className="w-full md:w-auto flex-shrink-0">
            Accepteren
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}