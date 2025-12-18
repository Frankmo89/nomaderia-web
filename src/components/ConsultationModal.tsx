import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare, CheckCircle, Loader2, X } from 'lucide-react';
import { es } from 'date-fns/locale';
import { format, addDays, isBefore, isWeekend, startOfToday } from 'date-fns';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  tripDetails?: {
    destination?: string;
    duration?: string;
    budget?: number;
  };
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: Date | undefined;
  time: string;
  notes: string;
}

const timeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

export default function ConsultationModal({
  isOpen,
  onClose,
  clientName = '',
  clientEmail = '',
  clientPhone = '',
  tripDetails,
}: ConsultationModalProps) {
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: clientName,
    email: clientEmail,
    phone: clientPhone,
    date: undefined,
    time: '',
    notes: '',
  });

  const today = startOfToday();
  const maxDate = addDays(today, 60);

  const isDateDisabled = (date: Date) => {
    return isBefore(date, today) || isWeekend(date) || isBefore(maxDate, date);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.date !== undefined &&
      formData.time !== ''
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);

    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

    const payload = {
      type: 'consultation_booking',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date ? format(formData.date, 'yyyy-MM-dd') : '',
      time: formData.time,
      notes: formData.notes,
      trip_details: tripDetails,
      formatted_date: formData.date ? format(formData.date, "EEEE d 'de' MMMM, yyyy", { locale: es }) : '',
    };

    try {
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Error al enviar la solicitud');
        }
      }

      setStep('success');
    } catch (error) {
      console.error('Error booking consultation:', error);
      alert('Hubo un error al agendar tu asesoría. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      date: undefined,
      time: '',
      notes: '',
    });
    onClose();
  };

  const goToConfirm = () => {
    if (isFormValid()) {
      setStep('confirm');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#F8F6F3] border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0A2540] font-display flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-[#E8744F]" />
            Agendar Asesoría Personalizada
          </DialogTitle>
          <DialogDescription className="text-[#2C3E50]/70">
            Reserva una llamada con nuestros expertos en aventuras para planificar tu viaje perfecto.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 mt-4"
            >
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#0A2540] uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-[#E8744F]" />
                  Información de Contacto
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#2C3E50]">Nombre completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tu nombre"
                      className="bg-white border-[#0A2540]/20 focus:border-[#E8744F]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#2C3E50]">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="tu@email.com"
                      className="bg-white border-[#0A2540]/20 focus:border-[#E8744F]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#2C3E50]">WhatsApp / Teléfono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+52 686 123 4567"
                    className="bg-white border-[#0A2540]/20 focus:border-[#E8744F]"
                  />
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#0A2540] uppercase tracking-wider flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#E8744F]" />
                  Selecciona Fecha y Hora
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-[0_4px_24px_rgba(10,37,64,0.08)]">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateSelect}
                      disabled={isDateDisabled}
                      locale={es}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <Label className="text-[#2C3E50]">Horario disponible</Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) => handleInputChange('time', value)}
                    >
                      <SelectTrigger className="bg-white border-[#0A2540]/20">
                        <SelectValue placeholder="Selecciona un horario" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#E8744F]" />
                              {slot} hrs (Hora del Pacífico)
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {formData.date && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#2D5F3F]/10 rounded-lg p-3 mt-4"
                      >
                        <p className="text-sm text-[#2D5F3F] font-medium">
                          📅 {format(formData.date, "EEEE d 'de' MMMM", { locale: es })}
                          {formData.time && ` a las ${formData.time} hrs`}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-[#2C3E50] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#E8744F]" />
                  Notas adicionales (opcional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="¿Hay algo específico que te gustaría discutir en la llamada?"
                  className="bg-white border-[#0A2540]/20 focus:border-[#E8744F] min-h-[80px]"
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={goToConfirm}
                disabled={!isFormValid()}
                className="w-full bg-[#2D5F3F] hover:bg-[#E8744F] text-white py-6 text-lg font-semibold disabled:opacity-50"
              >
                Continuar
              </Button>
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 mt-4"
            >
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_24px_rgba(10,37,64,0.08)]">
                <h3 className="text-lg font-bold text-[#0A2540] mb-4">Confirma tu reserva</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-[#E8744F] mt-0.5" />
                    <div>
                      <p className="text-sm text-[#2C3E50]/60">Nombre</p>
                      <p className="font-medium text-[#0A2540]">{formData.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#E8744F] mt-0.5" />
                    <div>
                      <p className="text-sm text-[#2C3E50]/60">Email</p>
                      <p className="font-medium text-[#0A2540]">{formData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#E8744F] mt-0.5" />
                    <div>
                      <p className="text-sm text-[#2C3E50]/60">WhatsApp</p>
                      <p className="font-medium text-[#0A2540]">{formData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="w-5 h-5 text-[#E8744F] mt-0.5" />
                    <div>
                      <p className="text-sm text-[#2C3E50]/60">Fecha y hora</p>
                      <p className="font-medium text-[#0A2540]">
                        {formData.date && format(formData.date, "EEEE d 'de' MMMM, yyyy", { locale: es })}
                        {' '}a las {formData.time} hrs
                      </p>
                    </div>
                  </div>

                  {formData.notes && (
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-[#E8744F] mt-0.5" />
                      <div>
                        <p className="text-sm text-[#2C3E50]/60">Notas</p>
                        <p className="font-medium text-[#0A2540]">{formData.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep('form')}
                  variant="outline"
                  className="flex-1 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white py-6"
                >
                  Volver
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-[#2D5F3F] hover:bg-[#234A31] text-white py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Agendando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Confirmar Reserva
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 bg-[#2D5F3F] rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-[#0A2540] mb-2">
                ¡Asesoría Agendada!
              </h3>
              <p className="text-[#2C3E50]/70 mb-6">
                Hemos reservado tu cita para el{' '}
                <span className="font-semibold text-[#0A2540]">
                  {formData.date && format(formData.date, "d 'de' MMMM", { locale: es })}
                </span>{' '}
                a las{' '}
                <span className="font-semibold text-[#0A2540]">{formData.time} hrs</span>
              </p>

              <div className="bg-[#FF6B35]/10 rounded-xl p-4 mb-6">
                <p className="text-sm text-[#E8744F] font-medium mb-2">
                  📧 Recibirás un email de confirmación en:
                </p>
                <p className="text-[#0A2540] font-semibold">{formData.email}</p>
              </div>

              <div className="bg-[#2D5F3F]/10 rounded-xl p-4 mb-6">
                <p className="text-sm text-[#2D5F3F] font-medium mb-2">
                  📱 También te contactaremos por WhatsApp:
                </p>
                <p className="text-[#0A2540] font-semibold">{formData.phone}</p>
              </div>

              <Button
                onClick={handleClose}
                className="bg-[#0A2540] hover:bg-[#0A2540]/90 text-white px-8 py-6"
              >
                Cerrar
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
