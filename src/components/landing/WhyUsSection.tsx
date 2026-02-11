import { motion } from 'framer-motion';
import { Shield, Users, Award, Compass, HeartHandshake, Sparkles } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Seguridad Primero',
    description: 'Guías certificados internacionalmente, equipo de comunicación satelital y protocolos de seguridad estrictos en cada expedición.'
  },
  {
    icon: Users,
    title: 'Grupos Pequeños',
    description: 'Máximo 12 personas por grupo para garantizar atención personalizada y una experiencia más íntima con la naturaleza.'
  },
  {
    icon: Award,
    title: 'Experiencia Comprobada',
    description: 'Más de 500 expediciones exitosas y 95% de satisfacción. Nuestros clientes nos recomiendan con amigos y familia.'
  },
  {
    icon: Compass,
    title: 'Rutas Exclusivas',
    description: 'Acceso a destinos únicos y rutas menos transitadas. Diseñamos experiencias auténticas lejos del turismo masivo.'
  },
  {
    icon: HeartHandshake,
    title: 'Turismo Responsable',
    description: 'Trabajamos con comunidades locales, minimizamos nuestro impacto ambiental y contribuimos al desarrollo sostenible.'
  },
  {
    icon: Sparkles,
    title: 'Todo Incluido',
    description: 'Sin sorpresas ni costos ocultos. Sabes exactamente qué incluye tu expedición desde el primer momento.'
  }
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 px-6 bg-[#0A2540] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8744F]/20 text-[#E8744F] text-sm font-bold tracking-widest uppercase mb-4">
            Por Qué Elegirnos
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            La diferencia está en los detalles
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            No somos solo otra agencia de viajes. Somos aventureros apasionados 
            que diseñamos experiencias transformadoras con los más altos estándares.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 h-full border border-white/10 hover:border-[#E8744F]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#E8744F]/10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#E8744F] to-[#E8744F]/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#E8744F] transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-5xl font-black text-[#E8744F] mb-2">500+</div>
            <div className="text-white/60">Expediciones</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-[#E8744F] mb-2">95%</div>
            <div className="text-white/60">Satisfacción</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-[#E8744F] mb-2">8</div>
            <div className="text-white/60">Países</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-[#E8744F] mb-2">100%</div>
            <div className="text-white/60">Seguras</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
