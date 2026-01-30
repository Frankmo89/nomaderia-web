import { supabase } from './supabase';
import type { NewLead } from '@/types/supabase';
import type { FormData } from '@/components/AdventureForm';

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
  // Build payload matching NewLead (see src/types/supabase.ts)
  const party_size = (formData.adultscount || 0) + (formData.childrencount || 0);
  const travel_dates = formData.preferreddeparturedate
    ? formData.preferreddeparturedate
    : formData.travelmonth
      ? formData.travelmonth
      : undefined;

  const utm = readUtmFromLocation();

  const newLead: NewLead = {
    // contacto
    name: formData.clientname || undefined,
    email: formData.clientemail || undefined,
    phone: formData.phonewhatsapp || undefined,

    // tracking / origen
    source: 'form',
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,

    // info de viaje
    preferred_destination: formData.primarydestination || undefined,
    budget_range: formData.budgetusdperperson || undefined,
    travel_dates: travel_dates || undefined,
    party_size: party_size || undefined,
    accommodation_type: mapAccommodation(formData.accommodationpreference),

    // crm / metadata
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

    // opcional: data contiene la fila insertada (incluye id y created_at)
    return;
  } catch (err) {
    // log y rethrow
    console.error('submitLeadToSupabase failed:', err);
    throw err;
  }
}
