// ============================================
// NOMADERIA: Hook de Tracking
// Propósito: Rastrear TODAS las interacciones
// Uso: const { trackEvent } = useTracking();
// ============================================

import { useEffect, useCallback, useRef, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { EventType, NewInteraction } from '@/types/supabase';

// ============================================
// UTILIDADES
// ============================================

// Generar/obtener session_id persistente
const getSessionId = (): string => {
  // SSR guard - solo funciona en el navegador
  if (typeof window === 'undefined') {
    return 'ssr-temp-id';
  }
  
  // Persiste durante toda la sesión del browser
  let sessionId = sessionStorage.getItem('nomaderia_session_id');
  
  if (!sessionId) {
    // Generar nuevo UUID con fallback para navegadores antiguos
    // El fallback es suficiente para IDs de sesión (no necesita ser criptográfico)
    sessionId = crypto?.randomUUID?.() || 
      `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('nomaderia_session_id', sessionId);
  }
  
  return sessionId;
};

// Detectar tipo de dispositivo
const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  // SSR guard
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Extraer parámetros UTM de la URL
const getUtmParams = () => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  };
};

// ============================================
// HOOK PRINCIPAL
// ============================================

export const useTracking = () => {
  const sessionId = getSessionId();
  const hasTrackedPageView = useRef(false);
  
  // Memoizar UTM params para evitar parsear la URL en cada evento
  const utmParams = useMemo(() => getUtmParams(), []);

  // Función para trackear eventos generales
  const trackEvent = useCallback(async (
    eventType: EventType,
    eventData?: Record<string, any>
  ) => {
    // SSR guard - solo trackear en el navegador
    if (typeof window === 'undefined') return;
    
    try {
      // Obtener usuario si está logueado
      // Nota: Verificamos 'auth' in supabase porque el mock client no tiene auth
      // Esta es una solución temporal hasta tener un cliente Supabase real configurado
      let userId: string | undefined;
      if ('auth' in supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        userId = user?.id;
      }
      
      const interaction: NewInteraction = {
        session_id: sessionId,
        user_id: userId,
        event_type: eventType,
        event_data: {
          ...eventData,
          ...utmParams,  // Incluir UTM params (memoizados)
        },
        page_url: window.location.href,
        referrer: document.referrer || undefined,
        device_type: getDeviceType(),
      };

      const { error } = await supabase
        .from('interactions')
        .insert(interaction);

      if (error) {
        console.error('Tracking error:', error);
      }
    } catch (error) {
      // No bloquear la app si falla tracking
      console.error('Tracking failed:', error);
    }
  }, [sessionId, utmParams]);

  // Helper específico para page views
  const trackPageView = useCallback(() => {
    // SSR guard
    if (typeof window === 'undefined') return;
    
    trackEvent('page_view', {
      title: document.title,
      path: window.location.pathname,
    });
  }, [trackEvent]);

  // Track page view automático al montar componente (solo una vez)
  useEffect(() => {
    if (!hasTrackedPageView.current) {
      trackPageView();
      hasTrackedPageView.current = true;
    }
  }, [trackPageView]);

  return { 
    trackEvent, 
    trackPageView,
    sessionId 
  };
};
