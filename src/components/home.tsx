import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from './Navigation';
import Hero from './Hero';
import Destinations from './Destinations';
import Gallery from './Gallery';
import TripCalculator from './TripCalculator';
import WhatsAppWidget from './WhatsAppWidget';
import MyYosemiteStory from './MyYosemiteStory';
import TravelBlog from './TravelBlog';
import AdventureForm, { FormData } from './AdventureForm';
import LoadingState from './LoadingState';
import ItineraryResults from './ItineraryResults';
import Footer from './Footer';
import { sendBothEmails } from '../lib/emailService';

export interface ItineraryData {
  itinerary_text?: string;
  equipment_needed?: string;
  budget_breakdown?: string;
  titulo?: string;
  contactos?: string;
  days?: Array<{
    day: number;
    title: string;
    location: string;
    activities: string[];
    accommodation: string;
    highlights: string[];
  }>;
}

type AppState = 'hero' | 'form' | 'loading' | 'results' | 'error';

export default function Home() {
  const [searchParams] = useSearchParams();
  const [appState, setAppState] = useState<AppState>('hero');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Check URL params to auto-start form
  useEffect(() => {
    if (searchParams.get('start') === 'form') {
      setAppState('form');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchParams]);

  const handleStartPlanning = () => {
    setAppState('form');
    setError(null);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleFormSubmit = async (data: FormData) => {
    setFormData(data);
    setIsSubmitting(true);
    setAppState('loading');
    setError(null);

    // 1. Guardar en Supabase (Persistencia real)
    try {
      const { supabase } = await import('../lib/supabase');
      const { error: supabaseError } = await supabase.from('leads').insert([{
        clientname: data.clientname,
        clientemail: data.clientemail,
        phonewhatsapp: data.phonewhatsapp,
        destination: data.primarydestination,
        budget: data.budgetusdperperson,
        accommodation: data.accommodationpreference,
        fitness_level: data.fitnesslevel,
        travel_dates: data.travelmonth || data.preferreddeparturedate,
        status: 'new'
      }]);

      if (supabaseError) {
        console.error('Error guardando en Supabase:', supabaseError);
        // No lanzamos error aquí para no bloquear el flujo si Supabase falla
      } else {
        console.log('Lead guardado exitosamente en Supabase');
      }
    } catch (err) {
      console.error('Error de conexión con Supabase:', err);
    }

    // 2. Enviar emails automáticos (confirmación al cliente + notificación a admin)
    try {
      const emailData = {
        clientname: data.clientname,
        clientemail: data.clientemail,
        phonewhatsapp: data.phonewhatsapp,
        destination: data.primarydestination,
        tripstartdate: data.preferreddeparturedate || data.travelmonth || 'Por definir',
        tripenddate: data.preferreddeparturedate ? 'Según duración' : 'Por definir',
        travelers: data.adultscount + data.childrencount,
        budgetrange: data.budgetusdperperson,
        leadsource: data.leadsource,
        leadsourceother: data.leadsourceother,
        comments: data.additionalnotes,
      };

      const emailResults = await sendBothEmails(emailData);
      
      if (emailResults.success) {
        console.log('✅ Emails enviados exitosamente');
      } else {
        console.error('⚠️ Error enviando emails:', {
          client: emailResults.client,
          admin: emailResults.admin
        });
      }
    } catch (emailError) {
      console.error('⚠️ Error en sistema de emails:', emailError);
      // No bloqueamos el flujo si los emails fallan
    }

    // 3. Mostrar mensaje de éxito al usuario
    setTimeout(() => {
      setItineraryData({
        titulo: `¡Gracias por confiar en Nomadería!`,
        itinerary_text: `Hola ${data.clientname.split(' ')[0]},\n\nTu solicitud para ${data.primarydestination} ha sido recibida exitosamente.\n\nYa estamos trabajando en tu itinerario personalizado y te contactaremos en las próximas 24 horas por WhatsApp o email.\n\n¿Tienes dudas? Escríbeme por WhatsApp: +1 858 899 6802\n\n"Aquí nadie se pierde... nomás se encuentra."\n\nFrancisco Alonso\nNomadería - Tu Arquitecto de Aventuras`,
      });
      setAppState('results');
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);

    // NOTA: El código de N8N se mantiene comentado por si lo necesitas en el futuro
    /*
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn('N8N webhook URL not configured');
      return;
    }
    try {
      const payload = {
        // Metadata
        submissionid: data.submissionid,
        leadscore: data.leadscore,
        
        // Sección 1: Contacto
        clientname: data.clientname,
        clientemail: data.clientemail,
        phonewhatsapp: data.phonewhatsapp,
        leadsource: data.leadsource,
        leadsourceother: data.leadsourceother,
        
        // Sección 2: Logística base
        departurecity: data.departurecity,
        departurecityother: data.departurecityother,
        docsstatus: data.docsstatus,
        vehicletype: data.vehicletype,
        
        // Sección 3: Destino
        primarydestination: data.primarydestination,
        secondarydestinations: data.secondarydestinations.join(', '),
        
        // Sección 4: Fechas y duración
        tripduration: data.tripduration,
        dateflexibility: data.dateflexibility,
        preferreddeparturedate: data.preferreddeparturedate,
        travelmonth: data.travelmonth,
        
        // Sección 5: Grupo y ritmo
        adultscount: data.adultscount,
        childrencount: data.childrencount,
        fitnesslevel: data.fitnesslevel,
        tripstyle: data.tripstyle,
        petsincluded: data.petsincluded,
        petsdetails: data.petsdetails,
        
        // Sección 6: Presupuesto y alojamiento
        budgetusdperperson: data.budgetusdperperson,
        accommodationpreference: data.accommodationpreference,
        
        // Sección 7: Notas
        additionalnotes: data.additionalnotes,
        
        // Timestamp
        submitted_at: new Date().toISOString(),
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Log the payload being sent for debugging
      console.log('Sending payload to N8N:', JSON.stringify(payload, null, 2));
      console.log('Webhook URL:', webhookUrl);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Sin detalles');
        console.error('Error response:', response.status, errorText);
        throw new Error(`Error del servidor (${response.status}): Revisa la configuración de tu workflow en N8N`);
      }

      // Get the response text first to handle empty responses
      const responseText = await response.text();
      console.log('Raw response from N8N:', responseText);
      
      // Check if response is empty
      if (!responseText || responseText.trim() === '') {
        console.warn('N8N returned empty response - using default success state');
        // If N8N returns empty but status is OK, show results with form data
        setItineraryData({
          titulo: `Tu Aventura en ${data.primarydestination}`,
          itinerary_text: 'Tu solicitud ha sido recibida exitosamente. Nuestro equipo te contactará pronto con los detalles personalizados de tu aventura.',
        });
        setAppState('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Try to parse JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        console.error('Response was:', responseText);
        throw new Error('La respuesta del servidor no es JSON válido. Verifica que el nodo "Respond to Webhook" en N8N esté configurado para devolver JSON.');
      }
      
      // Validate that we got a proper response
      if (!result || typeof result !== 'object') {
        throw new Error('Respuesta inválida del servidor');
      }
      
      console.log('Parsed itinerary data:', result);
      setItineraryData(result);
      setAppState('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error al generar itinerario:', err);
      
      // More descriptive error message
      let errorMessage = 'Error al conectar con el servidor';
      if (err instanceof Error) {
        if (err.message.includes('500')) {
          errorMessage = 'Error en el servidor N8N. Verifica que tu workflow tenga un nodo "Respond to Webhook" configurado correctamente.';
        } else if (err.message.includes('404')) {
          errorMessage = 'Webhook no encontrado. Verifica que la URL del webhook sea correcta y que el workflow esté activo.';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
        } else if (err.message.includes('Unexpected end of JSON') || err.message.includes('JSON válido')) {
          errorMessage = 'N8N no devolvió una respuesta JSON válida. Asegúrate de que tu workflow tenga un nodo "Respond to Webhook" al final que devuelva datos JSON.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setAppState('error');
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  const handleBackToHero = () => {
    setAppState('hero');
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToForm = () => {
    setAppState('form');
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setFormData(null);
    setItineraryData(null);
    setError(null);
    setAppState('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navigation onStartPlanning={handleStartPlanning} />

      {appState === 'hero' && (
        <>
          <Hero onStartPlanning={handleStartPlanning} />
          <div id="destinos">
           <Destinations onPlanTrip={handleStartPlanning} />
        <TripCalculator />
        <MyYosemiteStory />
        <Gallery />
        <WhatsAppWidget /> </div>
          <Gallery />
          <TravelBlog />
          <Footer />
        </>
      )}

      {appState === 'form' && (
        <div ref={formRef}>
          <AdventureForm 
            onSubmit={handleFormSubmit} 
            onBack={handleBackToHero}
            isLoading={isSubmitting}
          />
        </div>
      )}

      {appState === 'loading' && <LoadingState />}

      {appState === 'error' && (
        <section className="min-h-screen bg-[#F8F6F3] noise-texture py-24 px-6 sm:px-8 flex items-center justify-center">
          <div className="max-w-lg mx-auto text-center">
            <div className="text-6xl mb-6">😕</div>
            <h2 className="text-display text-3xl font-bold text-[#0A2540] mb-4">
              ¡Ups! Algo salió mal
            </h2>
            <p className="text-lg text-[#2C3E50]/70 mb-8">
              {error || 'No pudimos generar tu itinerario. Por favor intenta de nuevo.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBackToForm}
                className="bg-[#2D5F3F] hover:bg-[#E8744F] text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Intentar de Nuevo
              </button>
              <button
                onClick={handleBackToHero}
                className="border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </section>
      )}

      {appState === 'results' && formData && (
        <>
          <ItineraryResults 
            formData={formData} 
            itineraryData={itineraryData}
            onRestart={handleRestart} 
          />
          <Footer />
        </>
      )}
    </div>
  );
}
