import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from './Navigation';
import Hero from './Hero';
import SectionDivider from './SectionDivider';
import Destinations from './Destinations';
import VideoShowcase from './VideoShowcase';
import Gallery from './Gallery';
import TripCalculator from './TripCalculator';
import WhatsAppWidget from './WhatsAppWidget';
import MyYosemiteStory from './MyYosemiteStory';
import TravelBlog from './TravelBlog';
import AdventureForm, { FormData } from './AdventureForm';
import LoadingState from './LoadingState';
import ItineraryResults from './ItineraryResults';
import Footer from './Footer';
import { logger } from '../lib/logger';

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
      } else {
        logger.log('Lead guardado exitosamente en Supabase');
      }
    } catch (err) {
      console.error('Error de conexión con Supabase:', err);
    }

    // 2. Mostrar mensaje de éxito al usuario
    setTimeout(() => {
      setItineraryData({
        titulo: `¡Gracias por confiar en Nomadería!`,
        itinerary_text: `Hola ${data.clientname.split(' ')[0]},\n\nTu solicitud para ${data.primarydestination} ha sido recibida exitosamente.\n\nYa estamos trabajando en tu itinerario personalizado y te contactaremos en las próximas 24 horas por WhatsApp o email.\n\n¿Tienes dudas? Escríbeme por WhatsApp: +1 858 899 6802\n\n"Aquí nadie se pierde... nomás se encuentra."\n\nFrancisco Alonso\nNomadería - Tu Arquitecto de Aventuras`,
      });
      setAppState('results');
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
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

          {/* Mountain divider: Hero -> Destinations */}
          <SectionDivider variant="mountain" fromColor="#0A2540" toColor="#F8F6F3" />

          <div id="destinos">
            <Destinations onSelectDestination={handleStartPlanning} />
          </div>

          {/* Wave divider: Destinations -> Video Showcase */}
          <SectionDivider variant="wave" fromColor="#F8F6F3" toColor="#0A2540" />

          <VideoShowcase />

          {/* Canyon divider: Video -> Story */}
          <SectionDivider variant="canyon" fromColor="#0A2540" toColor="#F8F6F3" flip />

          <MyYosemiteStory />

          {/* Mountain divider: Story -> Calculator */}
          <SectionDivider variant="mountain" fromColor="#F8F6F3" toColor="#0f172a" />

          <TripCalculator />

          {/* Wave divider: Calculator -> Gallery */}
          <SectionDivider variant="wave" fromColor="#0f172a" toColor="#0A2540" />

          <Gallery />

          {/* Canyon divider: Gallery -> Blog */}
          <SectionDivider variant="canyon" fromColor="#0A2540" toColor="#ffffff" flip />

          <TravelBlog />

          {/* Mountain divider: Blog -> Footer */}
          <SectionDivider variant="mountain" fromColor="#ffffff" toColor="#0A2540" />

          <Footer />
          <WhatsAppWidget />
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
            <div className="text-6xl mb-6">:/</div>
            <h2 className="text-display text-3xl font-bold text-[#0A2540] mb-4">
              Algo salió mal
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
