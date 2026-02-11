import { motion } from 'framer-motion';
import { Mountain, Calendar, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onBookCall: () => void;
  onViewExpeditions: () => void;
}

export default function HeroSection({ onBookCall, onViewExpeditions }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero/main.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/90 via-[#0A2540]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8744F]/20 text-[#E8744F] text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md border border-[#E8744F]/30">
              Expediciones en Latinoamérica
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[1.05] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          >
            Vive la aventura <br />
            <span className="text-[#E8744F]">que te mereces</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-white/80 mb-12 font-light leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
          >
            Expediciones premium diseñadas para digital nomads que buscan 
            experiencias auténticas en los destinos más espectaculares de Latinoamérica.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap gap-6 mb-12 text-white/70"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2">
              <Mountain className="w-5 h-5 text-[#E8744F]" />
              <span className="text-sm">Guías certificados</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#E8744F]" />
              <span className="text-sm">Grupos pequeños</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#E8744F]" />
              <span className="text-sm">Pago seguro</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
          >
            <Button
              onClick={onViewExpeditions}
              size="lg"
              className="bg-[#E8744F] hover:bg-[#E8744F]/90 text-white px-8 py-6 text-lg font-semibold shadow-xl shadow-[#E8744F]/20"
            >
              Ver Expediciones
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              onClick={onBookCall}
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md px-8 py-6 text-lg font-semibold"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Agendar Llamada
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="mt-12 flex items-center gap-4 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 border-2 border-[#0A2540] backdrop-blur-sm"
                />
              ))}
            </div>
            <p className="text-sm">
              <span className="text-white font-semibold">+500 aventureros</span> han confiado en nosotros
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
