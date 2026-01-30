import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Star, Quote, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { blogPosts as realBlogPosts } from '@/data/blogPosts';

const testimonials = [
  {
    name: 'Ramiro Mendoza',
    location: 'Monterrey, NL',
    text: 'Pensé que conocía Yosemite, pero la ruta que me armaron me llevó a lugares que no salen en Google. La logística de los permisos fue un alivio total.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    name: 'Sofía Garza',
    location: 'Tijuana, BC',
    text: 'Viajar sola por los parques de Utah me daba miedo, pero tener el soporte de Nomadería 24/7 me dio la seguridad que necesitaba. ¡Fue épico!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    name: 'Beto Villarreal',
    location: 'Chihuahua, CH',
    text: 'La mejor inversión para mi viaje familiar. No perdimos ni un minuto investigando rutas; todo estaba listo. El plan perrón cumplió al 100%.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
  },
];

export default function TravelBlog() {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'destinos' | 'tips' | 'equipo'>('todos');

  const filteredPosts = selectedCategory === 'todos' 
    ? realBlogPosts 
    : realBlogPosts.filter(post => post.category === selectedCategory);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      destinos: 'Destinos',
      tips: 'Tips de Viajero',
      equipo: 'Equipo'
    };
    return labels[category] || category;
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-24">
        
        {/* Manifesto Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-mono text-[#E8744F] font-bold tracking-widest uppercase mb-6">Nuestro Manifiesto</h2>
            <p className="text-display text-4xl md:text-6xl font-black text-[#0A2540] leading-tight mb-10">
              Creemos en el viaje lento, en el respeto a lo indómito y en encontrar el silencio.
            </p>
            <div className="grid md:grid-cols-2 gap-12 text-lg text-[#2C3E50]/70 leading-relaxed">
              <p>
                Nomadería no es una agencia de viajes tradicional. Somos exploradores diseñando para exploradores. 
                Entendemos que el valor de un viaje no está en cuántos kilómetros recorres, sino en cuántas veces te detienes a respirar.
              </p>
              <p>
                Nuestra misión es eliminar la fricción de la logística para que tú puedas conectar con la naturaleza. 
                Rutas probadas, permisos gestionados y la libertad de saber que tienes un experto respaldándote.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Blog Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-mono text-sm uppercase tracking-[0.3em] text-[#E8744F] font-medium mb-4">
              Inspiración y Conocimiento
            </p>
            <h2 className="text-display text-4xl sm:text-5xl md:text-6xl font-black text-[#0A2540] mb-6">
              Artículos de Aventura
            </h2>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {[
              { label: 'Todos', value: 'todos' },
              { label: 'Destinos', value: 'destinos' },
              { label: 'Tips de Viajero', value: 'tips' },
              { label: 'Equipo', value: 'equipo' }
            ].map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value as any)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-[#2D5F3F] text-white'
                    : 'bg-[#F8F6F3] text-[#2C3E50] hover:bg-[#2D5F3F]/10 border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(10,37,64,0.08)] hover:shadow-[0_8px_32px_rgba(10,37,64,0.12)] transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <span className="inline-block px-3 py-1 bg-[#E8744F]/10 text-[#E8744F] text-xs font-semibold rounded-full mb-3">
                      {getCategoryLabel(post.category)}
                    </span>
                    <h3 className="text-heading text-xl font-bold text-[#0A2540] mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#2C3E50]/70 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#2C3E50]/60">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <a 
                      href={`/blog/${post.slug}`}
                      className="inline-block mt-6 font-bold text-sm text-[#2D5F3F] transition-all hover:text-[#E8744F] focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 active:scale-95 hover:scale-105 hover:shadow-xl outline-none"
                    >
                      Leer más →
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-display text-4xl md:text-5xl font-black text-[#0A2540] mb-4">
                Comunidad <span className="text-[#E8744F]">Nómada</span>
              </h2>
              <p className="text-xl text-[#2C3E50]/60">Lo que dicen quienes ya trazaron su ruta con nosotros.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 text-[#E8744F] font-bold cursor-pointer group"
            >
              Ver todas las historias <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 bg-[#F8F6F3] border-0 shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl relative group h-full flex flex-col">
                  <Quote className="absolute top-6 right-8 w-12 h-12 text-[#E8744F]/10 group-hover:text-[#E8744F]/20 transition-colors" />
                  
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-[#E8744F] text-[#E8744F]" />
                    ))}
                  </div>

                  <p className="text-[#2C3E50] text-lg italic mb-8 flex-grow leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-[#0A2540]">{testimonial.name}</h4>
                      <p className="text-sm text-[#E8744F] font-medium">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
