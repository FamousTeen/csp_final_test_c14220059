'use server';

import { redirect } from 'next/navigation';
import type { AuthFormState } from '@/lib/auth/types';
import { createClient } from '@/utils/supabase/server';

const MIN_PASSWORD_LENGTH = 6;

const formatError = (message: string): AuthFormState => ({
  error: message,
});

const sanitize = (value: FormDataEntryValue | null) =>
  typeof value === 'string' ? value.trim() : '';

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = sanitize(formData.get('email'));
  const password = sanitize(formData.get('password'));

  if (!email || !password) {
    return formatError('Email dan password wajib diisi.');
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return formatError(
      `Password minimal ${MIN_PASSWORD_LENGTH} karakter untuk keamanan akun.`,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return formatError(error.message);
  }

  redirect('/login');
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = sanitize(formData.get('email'));
  const password = sanitize(formData.get('password'));

  if (!email || !password) {
    return formatError('Email dan password wajib diisi.');
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return formatError(error.message);
  }

  redirect('/dashboard');
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout gagal:', error.message);
    return;
  }

  redirect('/login');
}