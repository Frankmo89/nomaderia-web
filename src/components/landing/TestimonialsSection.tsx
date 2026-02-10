import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '@/data/landing/testimonials';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
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
            Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A2540] mb-6">
            Lo que dicen nuestros aventureros
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Historias reales de personas que confiaron en nosotros para vivir 
            la aventura de sus vidas.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-[#E8744F]/20">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-[#E8744F]/20 mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#E8744F] text-[#E8744F]" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>

                  {/* Expedition */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm font-semibold text-[#E8744F]">
                      {testimonial.expedition}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-[#E8744F] text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-[#0A2540]">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-gradient-to-r from-[#E8744F] to-[#E8744F]/80 rounded-2xl p-12 text-white text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-white text-white" />
                ))}
              </div>
              <div className="text-4xl font-black mb-2">4.9/5</div>
              <div className="text-white/90">Calificación promedio</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">98%</div>
              <div className="text-white/90">Nos recomendarían</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">500+</div>
              <div className="text-white/90">Aventureros felices</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
