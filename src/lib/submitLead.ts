
import { supabase } from './supabase';
import type { NewLead } from '@/types/supabase';
import type { FormData } from '@/components/AdventureForm';

// Utilidades de validación y sanitización
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9\-+()\s]{7,20}$/;
const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.'-]{2,60}$/;
const MAX_EMAIL_LENGTH = 120;
const MAX_NAME_LENGTH = 60;
const MAX_PHONE_LENGTH = 20;
const MAX_BUDGET_LENGTH = 20;
const MAX_DEST_LENGTH = 80;

function sanitizeString(str?: string, maxLength = 100): string | undefined {
  if (!str) return undefined;
  // Elimina caracteres de control y recorta
  return str.replace(/[<>"'`\\]/g, '').slice(0, maxLength).trim() || undefined;
}

function validateEmail(email?: string): string | undefined {
  if (!email) return undefined;
  const trimmed = email.trim().toLowerCase().slice(0, MAX_EMAIL_LENGTH);
  if (!EMAIL_REGEX.test(trimmed)) return undefined;
  return trimmed;
}

function validatePhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  const trimmed = phone.trim().slice(0, MAX_PHONE_LENGTH);
  if (!PHONE_REGEX.test(trimmed)) return undefined;
  return trimmed;
}

function validateName(name?: string): string | undefined {
  if (!name) return undefined;
  const trimmed = name.trim().slice(0, MAX_NAME_LENGTH);
  if (!NAME_REGEX.test(trimmed)) return undefined;
  return trimmed;
}

function mapAccommodation(pref?: string): NewLead['accommodation_type'] | undefined {
  if (!pref) return undefined;
  if (pref.startsWith('camping')) return 'camping';
  if (pref === 'hoteles' || pref === 'lodges' || pref === 'mixto') return 'hotel';
  if (pref === 'rv') return 'rv';
  return undefined;
}

function readUtmFromLocation(): { utm_source?: string; utm_medium?: string; utm_campaign?: string } {
  try {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') ?? undefined,
      utm_medium: params.get('utm_medium') ?? undefined,
      utm_campaign: params.get('utm_campaign') ?? undefined,
    };
  } catch {
    return {};
  }
}


export async function submitLeadToSupabase(formData: FormData): Promise<void> {
  // Validar y sanitizar datos
  const name = validateName(formData.clientname);
  const email = validateEmail(formData.clientemail);
  const phone = validatePhone(formData.phonewhatsapp);
  const preferred_destination = sanitizeString(formData.primarydestination, MAX_DEST_LENGTH);
  const budget_range = sanitizeString(formData.budgetusdperperson, MAX_BUDGET_LENGTH);
  const travel_dates = sanitizeString(
    formData.preferreddeparturedate || formData.travelmonth,
    40
  );
  const party_size = (formData.adultscount || 0) + (formData.childrencount || 0);
  const utm = readUtmFromLocation();

  // Rechazar si datos críticos no son válidos
  if (!email) throw new Error('Correo electrónico inválido.');
  if (name && name.length < 2) throw new Error('Nombre inválido.');

  const newLead: NewLead = {
    name,
    email,
    phone,
    source: 'form',
    utm_source: sanitizeString(utm.utm_source, 40),
    utm_medium: sanitizeString(utm.utm_medium, 40),
    utm_campaign: sanitizeString(utm.utm_campaign, 40),
    preferred_destination,
    budget_range,
    travel_dates,
    party_size: party_size || undefined,
    accommodation_type: mapAccommodation(formData.accommodationpreference),
    lead_score: typeof formData.leadscore === 'number' ? formData.leadscore : undefined,
    status: 'new',
    last_interaction_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase.from('leads').insert([newLead]);
    if (error) {
      // Re-throw para que el llamador pueda notificar/registrar
      console.error('Supabase insert error (leads):', error);
      throw error;
    }
    return;
  } catch (err) {
    // log y rethrow
    console.error('submitLeadToSupabase failed:', err);
    throw err;
  }
}
