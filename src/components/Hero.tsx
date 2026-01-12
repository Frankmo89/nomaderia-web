import { motion } from 'framer-motion';
import { Compass, MapPin, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onStartPlanning: () => void;
}

export default function Hero({ onStartPlanning }: HeroProps) {
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
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8744F]/20 text-[#E8744F] text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md border border-[#E8744F]/30">
              Expediciones Personalizadas
            </span>
          </motion.div>

          <motion.h1
            className="text-display text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[1.05] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tu libertad tiene un mapa. <br />
            <span className="text-[#E8744F]">Nosotros lo trazamos.</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-white/80 mb-12 font-light leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Diseñamos expediciones a medida por los Parques Nacionales de EE.UU. 
            Logística impecable, rutas expertas y soporte total para que tú solo te preocupes por el camino.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              onClick={onStartPlanning}
              size="lg"
              className="bg-[#E8744F] hover:bg-[#d65a35] text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-2xl transition-all hover:scale-105 group"
            >
              Cotizar Mi Aventura
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={() => {
                const element = document.getElementById('destinos');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-8 text-xl font-bold rounded-2xl backdrop-blur-sm transition-all"
            >
              Ver Destinos
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="mt-16 flex flex-wrap gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="flex items-center gap-2 text-white">
              <Compass className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">Rutas Expertas</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">Soporte 24/7</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider uppercase">Logística Total</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
