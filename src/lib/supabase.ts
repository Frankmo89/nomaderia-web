// ============================================
// NOMADERIA: Cliente Supabase
// Propósito: Conexión a tu backend
// ============================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Estas variables vienen de .env (usando Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client that returns empty data when Supabase is not configured
const createMockClient = () => ({
  from: () => ({
    select: () => ({
      order: () => ({
        limit: () => Promise.resolve({ data: null, error: null })
      })
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
  }),
});

export const supabase: SupabaseClient | ReturnType<typeof createMockClient> = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
        db: {
          schema: 'public'
        },
        global: {
          headers: {
            'X-Client-Info': 'nomaderia-web'
          }
        }
      })
    : createMockClient() as any;

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  read_time: string;
  category: string;
  tags: string[];
  published_at: string;
  created_at: string;
  updated_at: string;
}
