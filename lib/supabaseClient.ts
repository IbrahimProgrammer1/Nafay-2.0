import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

function assertValidUrl(value?: string) {
  if (!value || value === 'undefined') {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  }
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL must be http or https');
    }
    return value;
  } catch {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is invalid');
  }
}

function assertValidKey(value?: string) {
  if (!value || value === 'undefined') {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  }
  return value;
}

const validatedUrl = assertValidUrl(supabaseUrl);
const validatedAnonKey = assertValidKey(supabaseAnonKey);

export const supabaseClient = createClient(validatedUrl, validatedAnonKey, {
  auth: {
    persistSession: false,
    detectSessionInUrl: false,
  },
});

export type SupabaseClient = typeof supabaseClient;

