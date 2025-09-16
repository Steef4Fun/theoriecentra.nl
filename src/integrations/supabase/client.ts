import { createBrowserClient } from '@supabase/ssr'

// NOTE: This is a client-side only client.
// Do not use in server components or server actions.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)