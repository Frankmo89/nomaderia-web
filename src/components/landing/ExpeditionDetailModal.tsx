import { motion } from 'framer-motion';
import { X, MapPin, Clock, TrendingUp, CheckCircle2, Calendar, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { type Expedition } from '@/data/landing/expeditions';

interface ExpeditionDetailModalProps {
  expedition: Expedition | null;
  isOpen: boolean;
  onClose: () => void;
  onBookCall: () => void;
}

const difficultyColors = {
  'Fácil': 'bg-green-500',
  'Moderada': 'bg-yellow-500',
  'Desafiante': 'bg-orange-500',
  'Extrema': 'bg-red-500'
};

export default function ExpeditionDetailModal({ 
  expedition, 
  isOpen, 
  onClose,
  onBookCall 
}: ExpeditionDetailModalProps) {
  if (!expedition) return null;

  const handlePayment = () => {
    // If expedition has a Stripe payment link, open it
    if (expedition.stripePaymentLink) {
      window.open(expedition.stripePaymentLink, '_blank');
    } else {
      // Otherwise, use a generic Stripe payment link (to be configured)
      const stripeLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK || '#';
      window.open(stripeLink, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Hero Image */}
        <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${expedition.image})`,
              backgroundColor: '#E8744F20'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`${difficultyColors[expedition.difficulty]} text-white border-0`}>
                {expedition.difficulty}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-0">
                <MapPin className="w-3 h-3 mr-1" />
                {expedition.country}
              </Badge>
            </div>
            <h2 className="text-3xl font-black mb-2">{expedition.name}</h2>
            <p className="text-white/90">{expedition.location}</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E8744F]" />
              <span>{expedition.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#E8744F]" />
              <span>Nivel: {expedition.difficulty}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-3">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">{expedition.description}</p>
          </div>

          <Separator />

          {/* Highlights */}
          <div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-3">Highlights</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {expedition.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#E8744F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Included */}
          <div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-3">¿Qué incluye?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {expedition.included.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Price & CTA */}
          <div className="bg-gradient-to-r from-[#E8744F]/10 to-[#E8744F]/5 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Precio por persona</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-[#E8744F]">
                    ${expedition.priceUSD.toLocaleString()}
                  </span>
                  <span className="text-gray-600">USD</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * No incluye vuelos internacionales ni seguro de viaje
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button
                  onClick={handlePayment}
                  size="lg"
                  className="bg-[#E8744F] hover:bg-[#E8744F]/90 text-white font-semibold px-8"
                >
                  <CreditCard className="mr-2 w-5 h-5" />
                  Reservar Ahora
                </Button>
                
                <Button
                  onClick={() => {
                    onClose();
                    onBookCall();
                  }}
                  size="lg"
                  variant="outline"
                  className="border-[#E8744F] text-[#E8744F] hover:bg-[#E8744F] hover:text-white font-semibold px-8"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Consultar
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>💡 Importante:</strong> Se requiere un depósito del 30% para confirmar tu reserva. 
              El saldo restante debe pagarse 30 días antes de la salida. 
              <button 
                onClick={onBookCall}
                className="text-[#E8744F] hover:underline ml-1"
              >
                Agenda una llamada
              </button> para conocer opciones de pago y disponibilidad.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
