import { motion } from 'framer-motion';
import { Check, X, FileText, Video, ClipboardCheck, MapPin, Users, PawPrint, Clock, Car, Mountain, Calendar, Sparkles, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from './Navigation';
import Footer from './Footer';

interface ServiciosPageProps {
  onStartForm: () => void;
  calendarUrl?: string;
}

export default function ServiciosPage({ onStartForm, calendarUrl = '#agendar' }: ServiciosPageProps) {
  const scrollToPackages = () => {
    const element = document.getElementById('paquetes-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const packages = [
    {
      name: 'Explorador',
      price: 199,
      tagline: 'Tu plan de aventura digital completo',
      description: 'Perfecto para el viajero independiente que quiere un plan sólido pero prefiere reservar por su cuenta.',
      features: [
        { icon: Video, text: 'Consulta inicial de 30 minutos', highlight: false },
        { icon: FileText, text: 'Itinerario digital día por día (PDF)', highlight: false },
        { icon: Mountain, text: 'Rutas de hiking curadas para tu nivel', highlight: false },
        { icon: ClipboardCheck, text: 'Checklist de reservas con links directos', highlight: false },
        { icon: Car, text: 'Guía de cruce de frontera y logística', highlight: false },
        { icon: MapPin, text: 'Opciones de alojamiento (camping, RV, hotel)', highlight: false },
      ],
      notIncluded: [
        'Sesión de reservas en vivo',
        'Soporte por WhatsApp',
        'Gestión de reservas',
      ],
      cta: 'Quiero este paquete',
      recommended: false,
    },
    {
      name: 'Compañero',
      price: 299,
      originalPrice: 299,
      founderPrice: 199,
      tagline: 'Tu plan maestro, con nuestra asistencia en cada paso',
      description: 'El paquete más popular. Incluye todo lo anterior PLUS una sesión en vivo para asegurar tus reservas críticas juntos.',
      features: [
        { icon: Check, text: 'Todo lo del Paquete Explorador', highlight: false },
        { icon: Sparkles, text: 'Sesión de Reservas en Vivo (1 hora)', highlight: true },
        { icon: ClipboardCheck, text: 'Checklist de equipo personalizado', highlight: false },
        { icon: Users, text: 'Guía de comidas y restaurantes', highlight: false },
        { icon: MapPin, text: 'Mapa digital de Google Maps personalizado', highlight: false },
        { icon: Clock, text: 'Soporte por WhatsApp (12h pre-viaje)', highlight: false },
      ],
      notIncluded: [
        'Gestión delegada de reservas',
        'Soporte en tiempo real durante viaje',
      ],
      cta: 'Quiero este paquete',
      recommended: true,
    },
    {
      name: 'Nómada',
      price: 449,
      tagline: 'Tú solo manejas. Nosotros nos encargamos del resto',
      description: 'Full concierge service. Gestionamos tus reservas y te damos soporte en tiempo real durante todo el viaje.',
      features: [
        { icon: Check, text: 'Todo lo del Paquete Compañero', highlight: false },
        { icon: Heart, text: 'Gestión de Reservas Delegada', highlight: true },
        { icon: Shield, text: 'Soporte WhatsApp en tiempo real (durante viaje)', highlight: true },
        { icon: Users, text: 'Concierge de restaurantes', highlight: false },
        { icon: Mountain, text: 'Playlists de Spotify curadas para el road trip', highlight: false },
        { icon: Video, text: 'Llamada pre-viaje de 30 minutos', highlight: false },
      ],
      notIncluded: [],
      cta: 'Quiero este paquete',
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F3] noise-texture">
      <Navigation onStartPlanning={onStartForm} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/parks/yosemite/valley.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/80 via-[#0A2540]/60 to-[#F8F6F3]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-mono text-sm uppercase tracking-[0.3em] text-[#E8744F] font-medium mb-6">
              Nuestros Paquetes
            </p>
            <h1 className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Escapadas a Parques Nacionales, sin romperte la cabeza con la logística
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-10">
              Te ayudo a planear roadtrips realistas desde Tijuana, Tecate, Mexicali o San Diego a parques como Yosemite, Grand Canyon, Zion y más.
            </p>
            <Button
              onClick={scrollToPackages}
              className="bg-[#E8744F] hover:bg-[#E8744F]/90 text-white px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_rgba(232,116,79,0.4)] rounded-xl"
            >
              Ver Paquetes
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Founder Offer Banner */}
      <section className="py-6 px-6 sm:px-8 bg-[#2D5F3F]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white text-lg sm:text-xl font-bold">
            🎯 <span className="text-[#E8744F]">Oferta Fundador:</span> Paquete Compañero a $199 USD (valor $299) • Solo 3 espacios disponibles
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section id="paquetes-section" className="py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-4xl sm:text-5xl font-black text-[#0A2540] mb-4">
              Elige tu aventura
            </h2>
            <p className="text-lg text-[#2C3E50]/70 max-w-2xl mx-auto">
              Tres niveles de servicio diseñados para diferentes estilos de viajero
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={pkg.recommended ? 'lg:scale-105' : ''}
              >
                <Card className={`p-8 rounded-2xl h-full border-0 relative overflow-hidden ${
                  pkg.recommended 
                    ? 'bg-[#0A2540] shadow-[0_12px_48px_rgba(10,37,64,0.3)]' 
                    : 'bg-white shadow-[0_8px_32px_rgba(10,37,64,0.1)]'
                }`}>
                  {pkg.recommended && (
                    <Badge className="absolute top-6 right-6 bg-[#E8744F] text-white hover:bg-[#E8744F] text-sm px-4 py-1">
                      Recomendado
                    </Badge>
                  )}

                  {/* Header */}
                  <div className="mb-8">
                    <h3 className={`text-heading text-3xl font-black mb-2 ${
                      pkg.recommended ? 'text-white' : 'text-[#0A2540]'
                    }`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-sm mb-6 ${
                      pkg.recommended ? 'text-white/80' : 'text-[#2C3E50]/70'
                    }`}>
                      {pkg.tagline}
                    </p>
                    
                    {/* Price */}
                    <div className="mb-4">
                      {pkg.founderPrice ? (
                        <div>
                          <div className="flex items-baseline gap-3">
                            <span className={`text-5xl font-black ${
                              pkg.recommended ? 'text-[#E8744F]' : 'text-[#2D5F3F]'
                            }`}>
                              ${pkg.founderPrice}
                            </span>
                            <span className={`text-2xl line-through ${
                              pkg.recommended ? 'text-white/40' : 'text-[#2C3E50]/40'
                            }`}>
                              ${pkg.originalPrice}
                            </span>
                          </div>
                          <p className={`text-sm mt-1 ${
                            pkg.recommended ? 'text-[#E8744F]' : 'text-[#2D5F3F]'
                          }`}>
                            Precio de fundador
                          </p>
                        </div>
                      ) : (
                        <span className={`text-5xl font-black ${
                          pkg.recommended ? 'text-[#E8744F]' : 'text-[#2D5F3F]'
                        }`}>
                          ${pkg.price}
                        </span>
                      )}
                      <span className={`text-lg ml-2 ${
                        pkg.recommended ? 'text-white/60' : 'text-[#2C3E50]/60'
                      }`}>
                        USD
                      </span>
                    </div>

                    <p className={`text-sm leading-relaxed ${
                      pkg.recommended ? 'text-white/80' : 'text-[#2C3E50]/70'
                    }`}>
                      {pkg.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <p className={`text-xs uppercase tracking-wider mb-4 font-bold ${
                      pkg.recommended ? 'text-white/60' : 'text-[#2C3E50]/60'
                    }`}>
                      Incluye:
                    </p>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                            feature.highlight 
                              ? 'text-[#E8744F]' 
                              : pkg.recommended 
                                ? 'text-[#2D5F3F]' 
                                : 'text-[#2D5F3F]'
                          }`} />
                          <span className={`text-sm ${
                            feature.highlight ? 'font-bold' : ''
                          } ${
                            pkg.recommended ? 'text-white/90' : 'text-[#2C3E50]'
                          }`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Included */}
                  {pkg.notIncluded.length > 0 && (
                    <div className="mb-8 pb-8 border-t border-white/10">
                      <p className={`text-xs uppercase tracking-wider mb-4 font-bold mt-6 ${
                        pkg.recommended ? 'text-white/60' : 'text-[#2C3E50]/60'
                      }`}>
                        No incluye:
                      </p>
                      <ul className="space-y-2">
                        {pkg.notIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <X className={`w-4 h-4 mr-3 mt-0.5 flex-shrink-0 ${
                              pkg.recommended ? 'text-white/30' : 'text-[#2C3E50]/30'
                            }`} />
                            <span className={`text-sm ${
                              pkg.recommended ? 'text-white/50' : 'text-[#2C3E50]/50'
                            }`}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <Button
                    onClick={onStartForm}
                    className={`w-full py-7 text-base font-bold transition-all duration-300 hover:scale-105 rounded-xl ${
                      pkg.recommended
                        ? 'bg-[#E8744F] hover:bg-[#E8744F]/90 text-white'
                        : 'bg-[#2D5F3F] hover:bg-[#E8744F] text-white'
                    }`}
                  >
                    {pkg.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 sm:px-8 bg-[#0A2540]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-4xl sm:text-5xl font-black text-white mb-4">
              Cómo funciona
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Tres pasos simples para tener tu viaje planeado
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-start gap-6"
            >
              <div className="w-16 h-16 bg-[#2D5F3F] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-black text-white">1</span>
              </div>
              <div>
                <h3 className="text-heading text-2xl font-bold text-white mb-3">
                  Consulta Inicial
                </h3>
                <p className="text-white/80 text-lg">
                  Llenas el formulario con tu destino, fechas, presupuesto, quién viaja y desde dónde sales. En una videollamada de 30 minutos entendemos tu estilo de viaje y tus expectativas.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-start gap-6"
            >
              <div className="w-16 h-16 bg-[#E8744F] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-black text-white">2</span>
              </div>
              <div>
                <h3 className="text-heading text-2xl font-bold text-white mb-3">
                  Diseñamos Tu Plan
                </h3>
                <p className="text-white/80 text-lg">
                  Creamos tu Plan de Aventura Digital personalizado con itinerario día por día, rutas de hiking, opciones de alojamiento, guía de frontera y toda la logística necesaria.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-start gap-6"
            >
              <div className="w-16 h-16 bg-[#2D5F3F] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-black text-white">3</span>
              </div>
              <div>
                <h3 className="text-heading text-2xl font-bold text-white mb-3">
                  Aseguramos Tus Reservas (Paquete Compañero y Nómada)
                </h3>
                <p className="text-white/80 text-lg">
                  En una sesión en vivo te ayudamos a hacer las reservas críticas (campings, permisos) o las gestionamos por ti. Luego solo queda disfrutar tu aventura.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Button
              onClick={onStartForm}
              className="bg-[#E8744F] hover:bg-[#E8744F]/90 text-white px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105 rounded-xl"
            >
              Empezar mi aventura
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="py-24 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-4xl sm:text-5xl font-black text-[#0A2540] mb-4">
              ¿Para quién es Nomadería?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Ideal para ti */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-[#2D5F3F]/5 p-8 rounded-xl border-2 border-[#2D5F3F]/20 h-full">
                <h3 className="text-heading text-2xl font-bold text-[#2D5F3F] mb-6 flex items-center">
                  <Check className="w-8 h-8 mr-3" />
                  Ideal para ti si:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start text-[#2C3E50]">
                    <MapPin className="w-5 h-5 text-[#2D5F3F] mr-3 mt-1 flex-shrink-0" />
                    <span>Vives en Tijuana, Tecate, Mexicali o San Diego.</span>
                  </li>
                  <li className="flex items-start text-[#2C3E50]">
                    <Mountain className="w-5 h-5 text-[#2D5F3F] mr-3 mt-1 flex-shrink-0" />
                    <span>Quieres visitar parques como Yosemite, Grand Canyon, Zion, Joshua Tree o Bryce.</span>
                  </li>
                  <li className="flex items-start text-[#2C3E50]">
                    <Car className="w-5 h-5 text-[#2D5F3F] mr-3 mt-1 flex-shrink-0" />
                    <span>Te preocupa el tiempo real de manejo, cruces fronterizos, I-94, niños o mascotas.</span>
                  </li>
                  <li className="flex items-start text-[#2C3E50]">
                    <Clock className="w-5 h-5 text-[#2D5F3F] mr-3 mt-1 flex-shrink-0" />
                    <span>Prefieres que alguien con experiencia te diga qué es razonable en 3–7 días.</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* No es para ti */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-[#E8744F]/5 p-8 rounded-xl border-2 border-[#E8744F]/20 h-full">
                <h3 className="text-heading text-2xl font-bold text-[#E8744F] mb-6 flex items-center">
                  <X className="w-8 h-8 mr-3" />
                  No es para ti si:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start text-[#2C3E50]">
                    <Users className="w-5 h-5 text-[#E8744F] mr-3 mt-1 flex-shrink-0" />
                    <span>Buscas tours masivos en autobús o viajes todo incluido.</span>
                  </li>
                  <li className="flex items-start text-[#2C3E50]">
                    <ClipboardCheck className="w-5 h-5 text-[#E8744F] mr-3 mt-1 flex-shrink-0" />
                    <span>Quieres que alguien compre todo por ti (yo te entrego el plan, tú reservas, excepto en Paquete Nómada).</span>
                  </li>
                  <li className="flex items-start text-[#2C3E50]">
                    <Car className="w-5 h-5 text-[#E8744F] mr-3 mt-1 flex-shrink-0" />
                    <span>No estás dispuesto a manejar varias horas al día cuando es necesario.</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display text-4xl sm:text-5xl font-black text-[#0A2540] mb-8 text-center">
              Quién está detrás de Nomadería
            </h2>

            <div className="space-y-6 text-lg text-[#2C3E50] leading-relaxed">
              <p>
                Soy <strong>Francisco Molina</strong>, agente de viajes certificado y fundador de Nomadería.
              </p>
              <p>
                Nomadería nace para ayudar a viajeros de la frontera a dejar de improvisar sus viajes a parques nacionales de Estados Unidos.
              </p>
              <p>
                Conozco de primera mano lo que significa salir desde <strong>Tecate, Baja California</strong>: cruces, tiempos de manejo, temporadas, nieve, calor y restricciones en parques. He vivido la experiencia de planear mal un viaje y llegar reventado al hotel.
              </p>
              <p>
                Mi objetivo es que aproveches al máximo tus días libres, sin subestimar distancias ni llegar agotado.
              </p>
              <p className="font-bold text-[#2D5F3F] text-xl italic">
                "Aquí nadie se pierde… nomás se encuentra."
              </p>
            </div>

            {/* Certification Badge - Enhanced Visibility */}
            <div className="mt-16 relative">
              <div className="absolute -top-4 -left-4 bg-[#E8744F] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest z-10 shadow-lg">
                Garantía de Profesionalismo
              </div>
              <div className="bg-white border-2 border-[#2D5F3F]/10 rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(45,95,63,0.1)] flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0 relative group">
                  <div className="absolute inset-0 bg-[#2D5F3F] rounded-xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <img 
                    src="/images/about/certificado.jpg" 
                    alt="Certificado Travel Agent - Francisco Molina" 
                    className="w-48 h-auto object-contain rounded-xl shadow-2xl relative z-10 border border-white"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 text-[#2D5F3F] font-bold text-sm uppercase tracking-widest mb-4">
                    <span className="w-8 h-px bg-[#2D5F3F]"></span>
                    Agente de Viajes Certificado
                  </div>
                  <h4 className="text-display text-3xl font-black text-[#0A2540] mb-4 leading-tight">
                    Francisco Molina
                  </h4>
                  <p className="text-lg text-[#2C3E50]/80 leading-relaxed mb-6">
                    Certificación oficial en <strong>Travel Agent Training</strong> por ed2go - Cengage Group (Mayo 2025). Esta formación me permite ofrecerte una planificación profesional, segura y optimizada para tu aventura.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="bg-[#2D5F3F]/5 px-4 py-2 rounded-lg text-[#2D5F3F] text-sm font-bold border border-[#2D5F3F]/10">
                      ✓ Experto en Logística
                    </div>
                    <div className="bg-[#2D5F3F]/5 px-4 py-2 rounded-lg text-[#2D5F3F] text-sm font-bold border border-[#2D5F3F]/10">
                      ✓ Especialista en Parques Nacionales
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-[#F8F6F3] rounded-xl p-8">
              <h3 className="text-heading text-xl font-bold text-[#0A2540] mb-6">
                Lo que más disfruto planear:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center text-[#2C3E50]">
                  <Calendar className="w-6 h-6 text-[#2D5F3F] mr-4" />
                  <span>Escapadas de 3 días a Zion, Grand Canyon o Yosemite.</span>
                </li>
                <li className="flex items-center text-[#2C3E50]">
                  <Users className="w-6 h-6 text-[#2D5F3F] mr-4" />
                  <span>Roadtrips familiares con niños y paradas pensadas.</span>
                </li>
                <li className="flex items-center text-[#2C3E50]">
                  <PawPrint className="w-6 h-6 text-[#2D5F3F] mr-4" />
                  <span>Viajes con mascotas donde realmente puedan disfrutar.</span>
                </li>
              </ul>
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={onStartForm}
                className="bg-[#2D5F3F] hover:bg-[#E8744F] text-white px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105 rounded-xl"
              >
                Empezar mi aventura
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
