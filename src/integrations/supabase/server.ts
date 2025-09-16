import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createSupabaseServerClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    "https://mmuhtwhyldvvgcclobuz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdWh0d2h5bGR2dmdjY2xvYnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY2MDcsImV4cCI6MjA3MzQ0MjYwN30.CLcZBrdYv0U_ug_YB7nFnv4F8FjhF-zvj2Uc3MGNyWI",
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            await (await cookieStore).set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            await (await cookieStore).set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}