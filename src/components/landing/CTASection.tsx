import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onBookCall: () => void;
  onSubscribe: () => void;
}

export default function CTASection({ onBookCall, onSubscribe }: CTASectionProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#0A2540] via-[#0A2540] to-[#1a3a5a] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#E8744F] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E8744F] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Main CTA */}
          <div className="mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8744F]/20 text-[#E8744F] text-sm font-bold tracking-widest uppercase mb-6">
              ¿Listo para la aventura?
            </span>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Tu próxima gran historia <br />
              <span className="text-[#E8744F]">empieza aquí</span>
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Deja de soñar y empieza a vivir. Miles de aventureros ya confiaron en 
              nosotros para crear recuerdos inolvidables. Ahora es tu turno.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={onBookCall}
                size="lg"
                className="bg-[#E8744F] hover:bg-[#E8744F]/90 text-white px-8 py-6 text-lg font-semibold shadow-2xl shadow-[#E8744F]/30 group"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Agendar Llamada Gratuita
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md px-8 py-6 text-lg font-semibold"
                onClick={() => {
                  const expeditionsSection = document.getElementById('expeditions');
                  expeditionsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Ver Todas las Expediciones
              </Button>
            </div>
          </div>

          {/* Email Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-6 h-6 text-[#E8744F]" />
              <h3 className="text-2xl font-bold">Únete a nuestra comunidad</h3>
            </div>
            
            <p className="text-white/70 mb-6">
              Recibe tips de viaje, ofertas exclusivas y guías de destinos 
              directamente en tu inbox. Sin spam, solo aventura.
            </p>

            <Button
              onClick={onSubscribe}
              className="w-full sm:w-auto bg-white text-[#0A2540] hover:bg-white/90 font-semibold px-8 py-3"
            >
              Suscribirme al Newsletter
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 pt-12 border-t border-white/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-black text-[#E8744F] mb-2">500+</div>
                <div className="text-sm text-white/60">Expediciones Exitosas</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#E8744F] mb-2">95%</div>
                <div className="text-sm text-white/60">Satisfacción</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#E8744F] mb-2">24/7</div>
                <div className="text-sm text-white/60">Soporte</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#E8744F] mb-2">100%</div>
                <div className="text-sm text-white/60">Seguro</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
