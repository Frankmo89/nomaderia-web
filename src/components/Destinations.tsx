import { motion } from 'framer-motion';
import { ArrowRight, Mountain, TreePine, Waves, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DestinationsProps {
  onSelectDestination: (destination: string) => void;
}

export default function Destinations({ onSelectDestination }: DestinationsProps) {
  const destinations = [
    {
      name: 'Yosemite',
      tagline: 'Cataratas épicas y el icónico Half Dome',
      image: '/images/parks/yosemite/hero.webp',
      icon: Mountain,
      highlights: ['Half Dome', 'Yosemite Falls', 'El Capitan', 'Mirror Lake'],
      distance: '750 km desde Tijuana',
      bestTime: 'Marzo - Mayo, Sept - Oct',
      difficulty: 'Moderado',
    },
    {
      name: 'Gran Cañón',
      tagline: 'Una de las 7 maravillas naturales del mundo',
      image: '/images/parks/grand-canyon/hero.webp',
      icon: Waves,
      highlights: ['South Rim', 'Bright Angel Trail', 'Sunset Point', 'Desert View'],
      distance: '900 km desde Tijuana',
      bestTime: 'Marzo - Mayo, Sept - Nov',
      difficulty: 'Fácil a Difícil',
    },
    {
      name: 'Zion',
      tagline: 'Cañones rojos y aventuras verticales',
      image: '/images/parks/zion/hero.webp',
      icon: Sun,
      highlights: ['Angels Landing', 'The Narrows', 'Emerald Pools', 'Canyon Overlook'],
      distance: '1,100 km desde Tijuana',
      bestTime: 'Abril - Mayo, Sept - Oct',
      difficulty: 'Moderado a Difícil',
    },
    {
      name: 'Sequoia',
      tagline: 'Los árboles más grandes del planeta',
      image: '/images/parks/sequoia/hero.webp',
      icon: TreePine,
      highlights: ['General Sherman Tree', 'Moro Rock', 'Giant Forest', 'Tokopah Falls'],
      distance: '700 km desde Tijuana',
      bestTime: 'Mayo - Sept',
      difficulty: 'Fácil a Moderado',
    },
  ];

  return (
    <section className="py-24 px-6 sm:px-8 bg-[#F8F6F3]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-mono text-sm uppercase tracking-[0.3em] text-[#E8744F] font-medium mb-4">
            Nuestros Destinos
          </p>
          <h2 className="text-display text-4xl sm:text-5xl md:text-6xl font-black text-[#0A2540] mb-6">
            4 parques nacionales épicos
          </h2>
          <p className="text-xl text-[#2C3E50]/70 max-w-3xl mx-auto">
            Desde Baja California hasta las maravillas naturales de Estados Unidos.
            Cada destino es una aventura única diseñada para tu nivel y estilo.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(10,37,64,0.12)] hover:shadow-[0_16px_48px_rgba(10,37,64,0.2)] transition-all duration-500 border-0 h-full">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/40 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-6 right-6 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <destination.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title & Tagline */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-display text-4xl font-black text-white mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-lg text-white/90 font-medium">
                      {destination.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 bg-white">
                  {/* Quick Info */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-[#0A2540]/10">
                    <div>
                      <p className="text-xs text-[#2C3E50]/60 uppercase tracking-wider mb-1">Distancia</p>
                      <p className="text-sm font-bold text-[#0A2540]">{destination.distance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#2C3E50]/60 uppercase tracking-wider mb-1">Mejor Época</p>
                      <p className="text-sm font-bold text-[#0A2540]">{destination.bestTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#2C3E50]/60 uppercase tracking-wider mb-1">Dificultad</p>
                      <p className="text-sm font-bold text-[#0A2540]">{destination.difficulty}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <p className="text-xs text-[#2C3E50]/60 uppercase tracking-wider mb-3">Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-[#2D5F3F]/10 text-[#2D5F3F] text-sm font-medium rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => onSelectDestination(destination.name)}
                    className="w-full bg-[#2D5F3F] hover:bg-[#E8744F] text-white py-6 text-base font-bold transition-all duration-300 hover:scale-105 rounded-xl group"
                  >
                    Planear mi viaje a {destination.name}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-[#2C3E50]/70 mb-6">
            ¿No estás seguro cuál elegir? Déjanos ayudarte a encontrar tu aventura perfecta.
          </p>
          <Button
            onClick={() => onSelectDestination('all')}
            variant="outline"
            className="px-10 py-7 text-lg font-bold border-2 border-[#2D5F3F] text-[#2D5F3F] hover:bg-[#2D5F3F] hover:text-white transition-all duration-300 rounded-xl"
          >
            Ver todos los paquetes
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
