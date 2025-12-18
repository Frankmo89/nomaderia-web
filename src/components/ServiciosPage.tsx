import { motion } from 'framer-motion';
import { Check, X, FileText, Video, ClipboardCheck, MapPin, Users, PawPrint, Clock, Car, Mountain, Calendar } from 'lucide-react';
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
  const scrollToAsesoria = () => {
    const element = document.getElementById('asesoria-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] noise-texture">
      <Navigation onStartPlanning={onStartForm} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/70 via-[#0A2540]/50 to-[#F8F6F3]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-mono text-sm uppercase tracking-[0.3em] text-[#E8744F] font-medium mb-6">
              Servicios Nomaderia
            </p>
            <h1 className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Escapadas a Parques Nacionales, sin romperte la cabeza con la logística
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-10">
              Te ayudo a planear roadtrips realistas desde Tijuana, Tecate, Mexicali o San Diego a parques como Yosemite, Grand Canyon, Zion y más.
            </p>
            <Button
              onClick={scrollToAsesoria}
              className="bg-[#2D5F3F] hover:bg-[#E8744F] text-white px-10 py-7 text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_rgba(232,116,79,0.4)] rounded-xl"
            >
              Quiero mi asesoría
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Lo que hago Section */}
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
              Lo que hago
            </h2>
            <p className="text-lg text-[#2C3E50]/70 max-w-2xl mx-auto">
              Tres formas de ayudarte a planear tu aventura
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tarjeta 1 - Itinerario gratis */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-white p-8 rounded-xl shadow-[0_4px_24px_rgba(10,37,64,0.08)] h-full border-0">
                <div className="w-14 h-14 bg-[#2D5F3F]/10 rounded-full flex items-center justify-center mb-6">
                  <FileText className="w-7 h-7 text-[#2D5F3F]" />
                </div>
                <h3 className="text-heading text-xl font-bold text-[#0A2540] mb-4">
                  Itinerario general gratis (automático)
                </h3>
                <ul className="space-y-3 text-[#2C3E50]/80">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#2D5F3F] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Llenas el cuestionario Nomaderia.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#2D5F3F] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Recibes un itinerario general con días, destinos sugeridos y tips básicos.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#2D5F3F] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ideal para tener una primera idea del viaje.</span>
                  </li>
                </ul>
                <Button
                  onClick={onStartForm}
                  variant="outline"
                  className="w-full mt-8 py-6 text-[#2D5F3F] border-[#2D5F3F] hover:bg-[#2D5F3F] hover:text-white transition-all"
                >
                  Llenar cuestionario
                </Button>
              </Card>
            </motion.div>

            {/* Tarjeta 2 - Asesoría 1:1 (Destacada) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              id="asesoria-section"
            >
              <Card className="bg-[#0A2540] p-8 rounded-xl shadow-[0_8px_32px_rgba(10,37,64,0.2)] h-full border-0 relative overflow-hidden">
                <Badge className="absolute top-4 right-4 bg-[#E8744F] text-white hover:bg-[#E8744F]">
                  Servicio recomendado
                </Badge>
                <div className="w-14 h-14 bg-[#2D5F3F] rounded-full flex items-center justify-center mb-6">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-heading text-xl font-bold text-white mb-4">
                  Asesoría 1:1 personalizada
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#E8744F] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Sesión en línea para revisar tu itinerario general y ajustarlo a tu realidad.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#E8744F] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Calculamos tiempos de manejo reales desde tu ciudad y cruce.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#E8744F] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ajustamos actividades según tu condición física, estilo de viaje y mascotas.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#E8744F] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Te vas con un plan claro de qué reservar y en qué orden.</span>
                  </li>
                </ul>
                <Button
                  onClick={onStartForm}
                  className="w-full mt-8 py-6 bg-[#E8744F] hover:bg-[#E8744F]/90 text-white font-bold transition-all"
                >
                  Quiero mi asesoría
                </Button>
              </Card>
            </motion.div>

            {/* Tarjeta 3 - Próximamente */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white/60 p-8 rounded-xl shadow-[0_4px_24px_rgba(10,37,64,0.05)] h-full border-0 relative">
                <Badge className="absolute top-4 right-4 bg-[#2C3E50]/20 text-[#2C3E50]">
                  Próximamente
                </Badge>
                <div className="w-14 h-14 bg-[#2C3E50]/10 rounded-full flex items-center justify-center mb-6">
                  <ClipboardCheck className="w-7 h-7 text-[#2C3E50]/50" />
                </div>
                <h3 className="text-heading text-xl font-bold text-[#2C3E50]/50 mb-4">
                  Más adelante
                </h3>
                <ul className="space-y-3 text-[#2C3E50]/50">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#2C3E50]/30 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Plantillas avanzadas en Travefy, mapas interactivos y guías descargables.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#2C3E50]/30 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Por ahora me enfoco en asesorías 1:1.</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cómo funciona Section */}
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
              Cómo funciona la asesoría
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Tres pasos simples para tener tu viaje planeado
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Paso 1 */}
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
                  Cuestionario
                </h3>
                <p className="text-white/80 text-lg">
                  Llenas el formulario Nomaderia con tu destino, fechas, presupuesto, quién viaja y desde dónde sales (TJ, Tecate, Mexicali o San Diego). El sistema genera un itinerario general automático.
                </p>
              </div>
            </motion.div>

            {/* Paso 2 */}
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
                  Llamada de asesoría
                </h3>
                <p className="text-white/80 text-lg">
                  En una videollamada revisamos juntos tu itinerario, ajustamos tiempos de manejo, elegimos las mejores noches de hospedaje y definimos qué hacer cada día según tu ritmo y tu presupuesto.
                </p>
              </div>
            </motion.div>

            {/* Paso 3 */}
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
                  Plan listo para reservar
                </h3>
                <p className="text-white/80 text-lg">
                  Te entrego un plan claro y ordenado para que tú mismo puedas reservar hospedaje, entradas a parques y actividades sin perder tiempo comparando opciones infinitas.
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
              Agendar mi asesoría
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Para quién es Section */}
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
              ¿Para quién es Nomaderia?
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
                    <span>Quieres que alguien compre todo por ti (yo te entrego el plan, tú reservas).</span>
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

      {/* Sobre Nomaderia Section */}
      <section className="py-24 px-6 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display text-4xl sm:text-5xl font-black text-[#0A2540] mb-8 text-center">
              Quién está detrás de Nomaderia
            </h2>

            <div className="space-y-6 text-lg text-[#2C3E50] leading-relaxed">
              <p>
                Nomaderia nace para ayudar a viajeros de la frontera a dejar de improvisar sus viajes a parques nacionales de Estados Unidos.
              </p>
              <p>
                Conozco de primera mano lo que significa salir desde Tijuana, Tecate, Mexicali o San Diego: cruces, tiempos de manejo, temporadas, nieve, calor y restricciones en parques.
              </p>
              <p>
                Mi objetivo es que aproveches al máximo tus días libres, sin subestimar distancias ni llegar reventado al hotel.
              </p>
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
                Quiero mi asesoría
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
