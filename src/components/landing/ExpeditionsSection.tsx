import { motion } from 'framer-motion';
import { MapPin, Clock, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { expeditions, type Expedition } from '@/data/landing/expeditions';
import { useState } from 'react';

interface ExpeditionsSectionProps {
  onSelectExpedition: (expedition: Expedition) => void;
}

const difficultyColors = {
  'Fácil': 'bg-green-500',
  'Moderada': 'bg-yellow-500',
  'Desafiante': 'bg-orange-500',
  'Extrema': 'bg-red-500'
};

export default function ExpeditionsSection({ onSelectExpedition }: ExpeditionsSectionProps) {
  const [filter, setFilter] = useState<'all' | Expedition['difficulty']>('all');

  const filteredExpeditions = filter === 'all' 
    ? expeditions 
    : expeditions.filter(exp => exp.difficulty === filter);

  return (
    <section id="expeditions" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8744F]/10 text-[#E8744F] text-sm font-bold tracking-widest uppercase mb-4">
            Nuestras Expediciones
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A2540] mb-6">
            Aventuras que transforman vidas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expediciones cuidadosamente diseñadas para digital nomads que buscan 
            experiencias auténticas sin sacrificar comodidad ni seguridad.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-[#E8744F] hover:bg-[#E8744F]/90' : ''}
          >
            Todas
          </Button>
          <Button
            variant={filter === 'Fácil' ? 'default' : 'outline'}
            onClick={() => setFilter('Fácil')}
            className={filter === 'Fácil' ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            Fácil
          </Button>
          <Button
            variant={filter === 'Moderada' ? 'default' : 'outline'}
            onClick={() => setFilter('Moderada')}
            className={filter === 'Moderada' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
          >
            Moderada
          </Button>
          <Button
            variant={filter === 'Desafiante' ? 'default' : 'outline'}
            onClick={() => setFilter('Desafiante')}
            className={filter === 'Desafiante' ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            Desafiante
          </Button>
          <Button
            variant={filter === 'Extrema' ? 'default' : 'outline'}
            onClick={() => setFilter('Extrema')}
            className={filter === 'Extrema' ? 'bg-red-500 hover:bg-red-600' : ''}
          >
            Extrema
          </Button>
        </motion.div>

        {/* Expeditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExpeditions.map((expedition, index) => (
            <motion.div
              key={expedition.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-2xl transition-shadow duration-300 group cursor-pointer overflow-hidden">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{ 
                      backgroundImage: `url(${expedition.image})`,
                      backgroundColor: '#E8744F20'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`${difficultyColors[expedition.difficulty]} text-white border-0`}>
                      {expedition.difficulty}
                    </Badge>
                  </div>
                  
                  {/* Price */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
                      <p className="text-xs text-gray-600">Desde</p>
                      <p className="text-2xl font-bold text-[#E8744F]">
                        ${expedition.priceUSD.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl font-bold text-[#0A2540] group-hover:text-[#E8744F] transition-colors">
                        {expedition.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {expedition.location}, {expedition.country}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {expedition.duration}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {expedition.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Highlights</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {expedition.highlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#E8744F] mt-1">•</span>
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    onClick={() => onSelectExpedition(expedition)}
                    className="w-full bg-[#E8744F] hover:bg-[#E8744F]/90 text-white group-hover:shadow-lg transition-all"
                  >
                    Ver Detalles
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            ¿No encuentras la aventura perfecta para ti?
          </p>
          <Button size="lg" variant="outline" className="border-[#E8744F] text-[#E8744F] hover:bg-[#E8744F] hover:text-white">
            Crear Expedición Personalizada
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
