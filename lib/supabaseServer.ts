import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

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

function assertValidKey(value?: string, envName = 'SUPABASE_SERVICE_ROLE_KEY') {
  if (!value || value === 'undefined') {
    throw new Error(`${envName} is not set`);
  }
  return value;
}

const validatedUrl = assertValidUrl(supabaseUrl);
const validatedServiceRoleKey = assertValidKey(supabaseServiceRoleKey);

export function getSupabaseServiceRoleClient() {
  return createClient(validatedUrl, validatedServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        'X-Client-Info': 'nafay-ecommerce-admin',
      },
    },
  });
}

