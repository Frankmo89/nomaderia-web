import { InlineWidget } from 'react-calendly';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export default function CalendlyModal({ isOpen, onClose, url }: CalendlyModalProps) {
  // Use environment variable - must be configured before use
  const calendlyUrl = url || import.meta.env.VITE_CALENDLY_URL;

  if (!calendlyUrl) {
    console.error('Calendly URL not configured. Please set VITE_CALENDLY_URL in your environment variables.');
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0A2540]">
            Agenda tu llamada gratuita
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Selecciona el día y hora que mejor te convenga. Hablaremos sobre tus 
            planes de aventura y cómo podemos ayudarte a hacerlos realidad.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <InlineWidget 
            url={calendlyUrl}
            styles={{
              height: '700px',
              minWidth: '100%'
            }}
            pageSettings={{
              backgroundColor: 'ffffff',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: 'E8744F',
              textColor: '0A2540'
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
