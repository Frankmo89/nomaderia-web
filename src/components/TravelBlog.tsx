import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, Article } from '@/lib/supabase';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  readTime: string;
  location: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Guía Completa: Senderismo en la Patagonia',
    category: 'Destinos',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
    excerpt: 'Todo lo que necesitas saber para planear tu aventura en uno de los lugares más espectaculares del mundo.',
    readTime: '8 min',
    location: 'Patagonia, Argentina',
  },
  {
    id: 2,
    title: '10 Tips Esenciales para Acampar en Invierno',
    category: 'Tips de Viajero',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
    excerpt: 'Mantente seguro y cómodo en tus aventuras de camping durante la temporada fría.',
    readTime: '5 min',
    location: 'Tips Generales',
  },
  {
    id: 3,
    title: 'Equipo Esencial para Mochileros Principiantes',
    category: 'Equipo',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    excerpt: 'La lista definitiva de equipo que necesitas para tu primera aventura de mochilero.',
    readTime: '6 min',
    location: 'Guía de Equipo',
  },
  {
    id: 4,
    title: 'Escalada en Yosemite: Rutas para Todos los Niveles',
    category: 'Destinos',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
    excerpt: 'Descubre las mejores rutas de escalada en el icónico parque nacional de California.',
    readTime: '7 min',
    location: 'Yosemite, California',
  },
  {
    id: 5,
    title: 'Cómo Planear un Viaje de Aventura con Presupuesto Limitado',
    category: 'Tips de Viajero',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    excerpt: 'Estrategias probadas para vivir grandes aventuras sin gastar una fortuna.',
    readTime: '5 min',
    location: 'Tips Generales',
  },
  {
    id: 6,
    title: 'Aventuras en el Desierto: Valle de Guadalupe',
    category: 'Destinos',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    excerpt: 'Explora el desierto de Baja California y sus increíbles viñedos.',
    readTime: '6 min',
    location: 'Baja California, México',
  },
];

export default function TravelBlog() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      
      if (data && data.length > 0) {
        // Transform Supabase articles to BlogPost format
        const transformedArticles = data.map((article: Article, index: number) => ({
          id: index + 1,
          title: article.title,
          category: article.category,
          image: article.image_url,
          excerpt: article.excerpt,
          readTime: article.read_time,
          location: article.tags?.[0] || 'Aventura',
        }));
        setArticles(transformedArticles);
      } else {
        setArticles(mockBlogPosts);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles(mockBlogPosts);
    } finally {
      setLoading(false);
    }
  }

  const blogPosts = articles;

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F8F6F3] noise-texture py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-display text-4xl font-black text-[#0A2540]">
              Cargando artículos...
            </h2>
          </div>
        </div>
      </section>
    );
  }

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
          {['Todos', 'Destinos', 'Tips de Viajero', 'Equipo'].map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                category === 'Todos'
                  ? 'bg-[#2D5F3F] text-white'
                  : 'bg-white text-[#2C3E50] hover:bg-[#2D5F3F]/10 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
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
                    {post.category}
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
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{post.location}</span>
                    </div>
                  </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                location: 'Ciudad de México',
                text: 'El itinerario generado fue perfecto. Cada detalle estaba pensado y me ayudó a tener la mejor experiencia en Patagonia.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
              },
              {
                name: 'Carlos Ramírez',
                location: 'Monterrey',
                text: 'Como principiante, los tips contextuales me dieron la confianza que necesitaba para mi primera aventura de camping.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
              },
              {
                name: 'Ana Martínez',
                location: 'Guadalajara',
                text: 'La optimización del presupuesto fue increíble. Pude hacer más con menos dinero del que pensaba.',
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
