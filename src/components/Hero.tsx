import { motion } from 'framer-motion';
import { ChevronDown, Compass, MapPin, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CertificationBadge from './CertificationBadge';

interface HeroProps {
  onStartPlanning: () => void;
}

export default function Hero({ onStartPlanning }: HeroProps) {
  const benefits = [
    {
      icon: Compass,
      title: 'Basado en Experiencia Real',
      description: 'Itinerarios probados en primera persona, no copiados de internet',
    },
    {
      icon: Sparkles,
      title: 'Personalizado a Tu Ritmo',
      description: 'Ajustamos cada día según tu nivel de fitness y estilo de viaje',
    },
    {
      icon: Shield,
      title: 'Transparencia Total',
      description: 'Desglose detallado de costos sin sorpresas ni comisiones ocultas',
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero/main.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/60 via-[#0A2540]/50 to-[#0A2540]/90" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 sm:px-8 md:px-16 lg:px-24 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl text-center"
        >
          {/* Certification Badge */}
          <div className="mb-6">
            <CertificationBadge />
          </div>

          {/* Tagline */}
          <motion.p
            className="text-mono text-sm sm:text-base uppercase tracking-[0.3em] text-[#E8744F] font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Tu Arquitecto de Aventuras
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            className="text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Diseñamos tu viaje perfecto a{' '}
            <span className="text-[#E8744F]">Parques Nacionales</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-heading text-xl sm:text-2xl md:text-3xl text-white/95 font-semibold mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Desde Tecate, Baja California hasta Yosemite, Zion y Grand Canyon
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Planificación personalizada por un agente de viajes certificado con experiencia real.
            <br className="hidden sm:block" />
            Tú solo manejas y disfrutas. Nosotros nos encargamos del resto.
          </motion.p>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-12"
          >
            <p className="text-2xl sm:text-3xl font-bold text-[#E8744F] italic">
              "Aquí nadie se pierde… nomás se encuentra."
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button
              onClick={onStartPlanning}
              size="lg"
              className="bg-[#E8744F] hover:bg-[#E8744F]/90 text-white px-12 sm:px-16 py-7 sm:py-8 text-lg sm:text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_rgba(232,116,79,0.5)] rounded-xl shadow-[0_4px_24px_rgba(232,116,79,0.3)]"
            >
              <Compass className="w-6 h-6 mr-3" />
              Planear Mi Aventura
            </Button>
            <Button
              onClick={() => {
                const element = document.getElementById('destinos');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              size="lg"
              variant="outline"
              className="border-2 border-white/80 text-white hover:bg-white/10 hover:border-white px-12 sm:px-16 py-7 sm:py-8 text-lg sm:text-xl font-bold transition-all duration-300 rounded-xl backdrop-blur-sm"
            >
              <MapPin className="w-6 h-6 mr-3" />
              Ver Destinos
            </Button>
          </motion.div>

          {/* Founder Offer Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="inline-block"
          >
            <div className="bg-[#2D5F3F] text-white px-6 py-3 rounded-full shadow-[0_4px_24px_rgba(45,95,63,0.4)]">
              <p className="text-sm sm:text-base font-bold">
                🎯 Oferta Fundador: Paquete Compañero a <span className="text-[#E8744F]">$199 USD</span> (valor $299) • Solo 3 espacios
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Benefits Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl w-full"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            >
              <Card className="bg-white/95 backdrop-blur-sm p-8 text-center hover:shadow-[0_12px_40px_rgba(10,37,64,0.15)] transition-all duration-300 hover:-translate-y-2 rounded-xl border-0 h-full">
                <div className="w-16 h-16 bg-[#2D5F3F]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <benefit.icon className="w-8 h-8 text-[#2D5F3F]" />
                </div>
                <h3 className="text-heading text-xl font-bold text-[#0A2540] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#2C3E50]/70 text-base leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6, repeat: Infinity, repeatType: 'reverse' }}
      >
        <ChevronDown className="w-10 h-10 text-white/60" />
      </motion.div>
    </section>
  );
}
