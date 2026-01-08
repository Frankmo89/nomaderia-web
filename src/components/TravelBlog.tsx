import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { blogPosts as realBlogPosts } from '@/data/blogPosts';

interface BlogPost {
  id: string;
  title: string;
  category: 'destinos' | 'tips' | 'equipo';
  image: string;
  excerpt: string;
  readTime: string;
  slug: string;
}



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
    <section className="min-h-screen bg-[#F8F6F3] noise-texture py-24 px-6 sm:px-8">
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
            Inspiración y Conocimiento
          </p>
          <h2 className="text-display text-4xl sm:text-5xl md:text-6xl font-black text-[#0A2540] mb-6">
            Artículos de Aventura
          </h2>
          <p className="text-lg text-[#2C3E50]/70 max-w-2xl mx-auto">
            Guías, tips y testimonios de viajeros experimentados para inspirar tu próxima aventura
          </p>
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
                  : 'bg-white text-[#2C3E50] hover:bg-[#2D5F3F]/10 border border-gray-200'
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
              <Card className="bg-white rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(10,37,64,0.08)] hover:shadow-[0_8px_32px_rgba(10,37,64,0.12)] transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-[#E8744F]/10 text-[#E8744F] text-xs font-semibold rounded-full mb-3">
                    {getCategoryLabel(post.category)}
                  </span>

                  {/* Title */}
                  <h3 className="text-heading text-xl font-bold text-[#0A2540] mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#2C3E50]/70 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-[#2C3E50]/60">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  {/* Read More Link */}
                  <a 
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-4 text-[#2D5F3F] hover:text-[#E8744F] font-semibold text-sm transition-colors"
                  >
                    Leer más →
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <h3 className="text-display text-3xl md:text-4xl font-black text-[#0A2540] text-center mb-12">
            Lo Que Dicen Nuestros Aventureros
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Papá de Francisco (60 años)',
                location: 'Tecate, BC',
                text: 'Mi hijo Francisco nos llevó a Yosemite en marzo 2025. Fue nuestra primera vez en un parque nacional de Estados Unidos. Francisco pasó más de 20 horas investigando rutas, permisos y alojamientos para que nosotros solo disfrutaramos. Fue perfecto.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
              },
              {
                name: 'Mamá de Francisco (58 años)',
                location: 'Tecate, BC',
                text: 'Ver las cataratas de Yosemite con nieve fue mágico. Francisco nos preparó para todo: el frío, las rutas, dónde comer. No tuvimos que preocuparnos por nada. Ahora entiendo por qué creó Nomadería.',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white rounded-xl p-8 shadow-[0_4px_24px_rgba(10,37,64,0.08)] border-0">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-heading font-bold text-[#0A2540]">{testimonial.name}</h4>
                      <p className="text-sm text-[#2C3E50]/60 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#2C3E50]/80 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
