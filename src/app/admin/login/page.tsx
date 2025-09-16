"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
      <div className="w-full max-w-sm p-8">
        <div className="mb-8 text-center">
          <Image src="/logo-light.png" alt="Logo" width={200} height={40} className="mx-auto" />
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="dark"
          localization={{
            variables: {
              sign_in: {
                email_label: 'E-mailadres',
                password_label: 'Wachtwoord',
                button_label: 'Inloggen',
                loading_button_label: 'Bezig met inloggen...',
                social_provider_text: 'Inloggen met {{provider}}',
                link_text: 'Al een account? Log in',
              },
              sign_up: {
                email_label: 'E-mailadres',
                password_label: 'Wachtwoord',
                button_label: 'Registreren',
                loading_button_label: 'Bezig met registreren...',
                social_provider_text: 'Registreer met {{provider}}',
                link_text: 'Nog geen account? Registreer',
              },
              forgotten_password: {
                email_label: 'E-mailadres',
                password_label: 'Wachtwoord',
                button_label: 'Verstuur instructies',
                loading_button_label: 'Bezig...',
                link_text: 'Wachtwoord vergeten?',
              },
            },
          }}
        />
      </div>
    </div>
  );
}