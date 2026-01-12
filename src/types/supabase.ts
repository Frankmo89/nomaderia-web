// ============================================
// NOMADERIA: Tipos TypeScript para Supabase
// Propósito: Type-safety en toda la app
// Optimiza: Autocomplete en VS Code + menos bugs
// ============================================

// ============================================
// EVENTOS QUE TRACKEAMOS
// ============================================
export type EventType = 
  // Navegación
  | 'page_view'
  | 'scroll_to_section'
  
  // Hero
  | 'hero_cta_click'              // "Cotizar Mi Aventura"
  | 'hero_secondary_click'        // "Ver Destinos"
  
  // Calculadora
  | 'calculator_start'
  | 'calculator_destination_select'
  | 'calculator_duration_change'
  | 'calculator_people_change'
  | 'calculator_accommodation_select'
  | 'calculator_complete'
  
  // Chat
  | 'chat_opened'
  | 'chat_closed'
  | 'chat_message_sent'
  | 'chat_quick_reply_clicked'
  | 'chat_completed'
  
  // Leads
  | 'email_form_submit'
  | 'whatsapp_click'
  
  // Contenido
  | 'article_view'
  | 'gallery_view'
  | 'route_view';

// ============================================
// TABLA: interactions
// ============================================
export interface Interaction {
  id: string;
  session_id: string;
  user_id?: string;
  event_type: EventType;
  event_data?: {
    // Ejemplos de datos que puedes guardar:
    destination?: string;
    budget?: number;
    duration?: number;
    cta_text?: string;
    article_title?: string;
    [key: string]: any;
  };
  page_url: string;
  referrer?: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  created_at: string;
}

// ============================================
// TABLA: chat_sessions
// ============================================
export interface ChatSession {
  id: string;
  user_id?: string;
  lead_id?: string;
  started_at: string;
  completed_at?: string;
  status: 'active' | 'abandoned' | 'completed';
  total_messages: number;
  conversion_score?: number;  // 0-100
  metadata?: {
    browser?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    device?: string;
    location?: string;
  };
}

// ============================================
// TABLA: chat_messages
// ============================================
export interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'bot';
  message: string;
  message_type: 'text' | 'quick_reply' | 'calculator_result' | 'media';
  metadata?: {
    // Datos extraídos del mensaje
    destination?: string;
    budget?: number;
    dates?: string;
    people?: number;
    accommodation?: string;
  };
  created_at: string;
}

// ============================================
// TABLA: leads (expandida)
// ============================================
export interface Lead {
  id: string;
  
  // Info contacto
  name?: string;
  email?: string;
  phone?: string;
  
  // Tracking
  source: 'chat' | 'calculator' | 'form' | 'whatsapp';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  
  // Info del viaje
  preferred_destination?: string;
  budget_range?: string;
  travel_dates?: string;  // formato ISO: "2026-03-15,2026-03-18"
  party_size?: number;
  accommodation_type?: 'camping' | 'hotel' | 'rv';
  
  // CRM
  lead_score?: number;  // 0-100
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'closed_won' | 'closed_lost';
  last_interaction_at?: string;
  
  created_at: string;
  updated_at?: string;
}

// ============================================
// TABLA: analytics_daily
// ============================================
export interface AnalyticsDaily {
  date: string;  // formato: "2026-01-12"
  total_visits: number;
  unique_visitors: number;
  calculator_starts: number;
  calculator_completions: number;
  leads_generated: number;
  conversion_rate: number;  // 0-100
  avg_session_duration: number;  // segundos
  top_destinations: {
    name: string;
    count: number;
  }[];
  updated_at: string;
}

// ============================================
// HELPERS DE TIPADO
// ============================================

// Para insertar nuevo interaction (sin id/created_at)
export type NewInteraction = Omit<Interaction, 'id' | 'created_at'>;

// Para insertar nuevo lead
export type NewLead = Omit<Lead, 'id' | 'created_at' | 'updated_at'>;

// Para actualizar lead
export type UpdateLead = Partial<Omit<Lead, 'id' | 'created_at'>>;
