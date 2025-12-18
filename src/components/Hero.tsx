import { motion } from 'framer-motion';
import { ChevronDown, Map, Zap, DollarSign, Compass, Mountain, Palmtree, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface HeroProps {
  onStartPlanning: () => void;
}

export default function Hero({ onStartPlanning }: HeroProps) {
  const benefits = [
    {
      icon: Map,
      title: 'Itinerarios Personalizados',
      description: 'IA genera planes únicos adaptados a tu estilo de aventura',
    },
    {
      icon: Zap,
      title: 'Instantáneo',
      description: 'Tu plan completo listo en menos de 60 segundos',
    },
    {
      icon: DollarSign,
      title: 'Optimizado por Presupuesto',
      description: 'Desglose detallado de costos sin sorpresas',
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/50 via-[#0A2540]/30 to-[#0A2540]/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 sm:px-8 md:px-16 lg:px-24 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl text-center"
        >
          {/* Tagline */}
          <motion.p
            className="text-mono text-sm sm:text-base uppercase tracking-[0.3em] text-[#E8744F] font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Planificador de Aventuras con IA
          </motion.p>

          <motion.h1
            className="text-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-black text-white leading-[0.9] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Nomaderia
          </motion.h1>

          <motion.p
            className="text-heading text-xl sm:text-2xl md:text-3xl text-white/95 font-semibold mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Tu próxima aventura comienza aquí
          </motion.p>

          <motion.p
            className="text-lg sm:text-xl text-white/80 mb-14 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Genera itinerarios personalizados de aventura en segundos.
            <br className="hidden sm:block" />
            Desde montañas hasta playas, desiertos y selvas del mundo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={onStartPlanning}
              size="lg"
              className="bg-[#2D5F3F] hover:bg-[#E8744F] text-white px-12 sm:px-16 py-7 sm:py-8 text-lg sm:text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_rgba(232,116,79,0.4)] rounded-xl shadow-[0_4px_24px_rgba(45,95,63,0.3)]"
            >
              <Compass className="w-6 h-6 mr-3" />
              Planifica Tu Aventura
            </Button>
          </motion.div>
        </motion.div>

        {/* Benefits Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl w-full"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            >
              <Card className="bg-[#F8F6F3]/95 backdrop-blur-sm p-8 text-center hover:shadow-[0_8px_32px_rgba(10,37,64,0.12)] transition-all duration-300 hover:-translate-y-2 rounded-xl border-0">
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

        {/* Additional Images */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 max-w-5xl w-full"
        >
          <h2 className="text-heading text-3xl md:text-4xl font-bold text-white text-center mb-10">
            Explora Destinos Increíbles
          </h2>
          <div className="grid grid-cols-3 gap-5">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(10,37,64,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&q=80"
                alt="Senderismo en México"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(10,37,64,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80"
                alt="Camping"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(10,37,64,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80"
                alt="Escalada"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
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
