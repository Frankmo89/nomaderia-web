import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, RotateCcw, ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormData } from './AdventureForm';

interface ItineraryData {
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

interface ItineraryResultsProps {
  formData: FormData;
  itineraryData?: ItineraryData | null;
  onRestart: () => void;
}

export default function ItineraryResults({ formData, itineraryData, onRestart }: ItineraryResultsProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const handleWhatsAppContact = () => {
    const message = `¡Hola Francisco! Acabo de terminar de planear mi aventura a ${formData.primarydestination} en Nomadería. Me gustaría platicar sobre el presupuesto y los siguientes pasos. Mi nombre es ${formData.clientname}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/18588996802?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="min-h-screen bg-[#F8F6F3] py-24 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">🏔️</span>
          </div>
          
          <h1 className="text-display text-4xl md:text-6xl font-black text-[#0A2540] mb-6">
            {itineraryData?.titulo || '¡Aventura Recibida!'}
          </h1>
          
          <p className="text-xl text-[#2C3E50]/80 mb-12 leading-relaxed max-w-2xl mx-auto">
            "Aquí nadie se pierde... nomás se encuentra."
            <br /><br />
            Estamos trazando tu ruta y calculando el mejor presupuesto para tu viaje a <strong>{formData.primarydestination}</strong>. Te contactaremos por WhatsApp o email en menos de 24 horas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={handleWhatsAppContact}
              size="lg"
              className="bg-[#2D5F3F] hover:bg-[#E8744F] text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-xl transition-all hover:scale-105"
            >
              <MessageCircle className="w-6 h-6 mr-2" />
              Hablar por WhatsApp
            </Button>
            
            <Button
              onClick={onRestart}
              variant="outline"
              size="lg"
              className="border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white px-10 py-8 text-xl font-bold rounded-2xl transition-all"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Explorar más destinos
            </Button>
          </div>
        </motion.div>

        {/* Mock Itinerary Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-left"
        >
          <h2 className="text-2xl font-bold text-[#0A2540] mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#E8744F]" />
            Tu borrador de aventura
          </h2>
          
          <Card className="bg-white border-0 shadow-xl rounded-3xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Destino</p>
                  <p className="text-xl font-bold text-[#0A2540]">{formData.primarydestination}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Duración</p>
                  <p className="text-xl font-bold text-[#0A2540]">{formData.tripduration} días</p>
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((day) => (
                  <div key={day} className="border border-gray-100 rounded-2xl p-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedDay(expandedDay === day ? null : day)}
                    >
                      <p className="font-bold text-[#0A2540]">Día {day}: Exploración y Ruta</p>
                      <ChevronDown className={`w-5 h-5 text-[#E8744F] transition-transform ${expandedDay === day ? 'rotate-180' : ''}`} />
                    </div>
                    {expandedDay === day && (
                      <div className="mt-4 text-gray-600 text-sm">
                        Estamos personalizando las actividades de este día basadas en tu nivel de fitness ({formData.fitnesslevel}) y estilo de viaje ({formData.tripstyle}).
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-[#F8F6F3] rounded-2xl border-l-4 border-[#E8744F]">
                <p className="text-[#0A2540] font-medium italic">
                  "Estamos revisando la disponibilidad de permisos para tus fechas y optimizando el presupuesto de {formData.budgetusdperperson} para que rinda al máximo."
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
