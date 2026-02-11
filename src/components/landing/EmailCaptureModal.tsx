import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailCaptureModal({ isOpen, onClose }: EmailCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mailchimp integration using embedded form
      // Note: Using no-cors mode means we can't read the response status.
      // The Supabase insert below acts as our primary success indicator.
      // For production, consider using Mailchimp's API for better error handling.
      const formData = new FormData();
      formData.append('EMAIL', email);
      formData.append('FNAME', name);

      // Use Mailchimp's embedded form URL (to be configured)
      const mailchimpUrl = import.meta.env.VITE_MAILCHIMP_FORM_URL;

      if (mailchimpUrl) {
        // Submit to Mailchimp (fire-and-forget due to no-cors)
        await fetch(mailchimpUrl, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        });
      }

      // Save to Supabase for backup and tracking
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('newsletter_subscribers').insert([
        {
          email,
          name,
          source: 'landing_page',
          subscribed_at: new Date().toISOString()
        }
      ]);

      toast({
        title: "¡Bienvenido a bordo! 🎉",
        description: "Te hemos enviado un email de confirmación. Revisa tu bandeja de entrada.",
      });

      setEmail('');
      setName('');
      onClose();
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al suscribirte. Por favor intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0A2540] flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#E8744F]" />
            Únete a la comunidad
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Recibe tips exclusivos de aventura, ofertas especiales y guías de destinos 
            directamente en tu inbox. Sin spam, solo inspiración para tu próximo viaje.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#E8744F] hover:bg-[#E8744F]/90 text-white font-semibold py-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Suscribiendo...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Suscribirme al Newsletter
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Al suscribirte, aceptas recibir emails de Nomadería. 
            Puedes darte de baja en cualquier momento.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
