'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { userSchema } from '@/lib/validators';

// This needs to be a server client with SERVICE_ROLE_KEY to perform admin actions
const createSupabaseAdminClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    "https://mmuhtwhyldvvgcclobuz.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key here
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
};

export async function createUser(values: z.infer<typeof userSchema>) {
  const supabase = createSupabaseAdminClient();
  
  const { data: user, error } = await supabase.auth.admin.createUser({
    email: values.email,
    password: values.password,
    email_confirm: true, // Auto-confirm email
  });

  if (error) {
    return { error: error.message };
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      role: values.role,
      instructor_number: values.role === 'instructor' ? values.instructor_number : null,
    })
    .eq('id', user.user.id);

  if (profileError) {
    // If profile update fails, it's best to delete the created user to avoid orphaned auth users
    await supabase.auth.admin.deleteUser(user.user.id);
    return { error: `Failed to set profile: ${profileError.message}` };
  }

  return { error: null };
}

export async function updateUser(userId: string, values: z.infer<typeof userSchema>) {
    const supabase = createSupabaseAdminClient();

    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            role: values.role,
            instructor_number: values.role === 'instructor' ? values.instructor_number : null,
        })
        .eq('id', userId);

    if (profileError) {
        return { error: profileError.message };
    }

    return { error: null };
}

export async function deleteUser(userId: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}