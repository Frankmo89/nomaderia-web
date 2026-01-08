import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, AlertCircle, Lightbulb, Heart } from 'lucide-react';

export default function MyYosemiteStory() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-orange-50 to-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full mb-4">
            <Heart className="w-5 h-5 text-orange-600" />
            <span className="text-orange-600 font-semibold">Historia Real</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Mi Viaje a Yosemite
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Así fue mi experiencia en marzo 2025 y por qué decidí crear Nomadería
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Detalles del Viaje */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Cuándo</div>
                  <div className="font-bold text-slate-900">Marzo 2025</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Con quién</div>
                  <div className="font-bold text-slate-900">Mis papás (60 años)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Desde</div>
                  <div className="font-bold text-slate-900">Tecate, BC</div>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                En marzo de 2025, llevé a mis papás (60 años) a Yosemite. Era su primera vez en un parque nacional de Estados Unidos. Pasé más de <strong>20 horas investigando</strong> para que ellos solo disfrutaran: rutas, permisos, alojamiento, qué llevar para la nieve, dónde comer...
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                El viaje fue <strong>perfecto</strong>. Ver a mis papás frente a las cataratas con nieve, caminando por Mirror Lake, sin preocupaciones... Eso no tiene precio.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Pero la planificación fue <strong>estresante y confusa</strong>. Cometí errores que me costaron tiempo y dinero. Ahí nació Nomadería: <strong>para que tú no cometas mis errores</strong>. Para que llegues preparado y solo disfrutes.
              </p>
            </div>
          </motion.div>

          {/* Galería de Fotos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
              <img
                src="/images/yosemite_real/1902DDEE-0B55-48C8-8F82-B4736F3C3371.jpg"
                alt="Yosemite en invierno"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-white font-semibold">Mirror Lake Trail</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
              <img
                src="/images/yosemite_real/20A04C1F-9C8F-4510-BD16-87C3BA73DD7C.jpg"
                alt="Nieve en Yosemite"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-white font-semibold">Yosemite Valley con Nieve</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
              <img
                src="/images/yosemite_real/9E1825B8-5EF7-42DD-B93C-698AE1C2B34B.jpg"
                alt="Lower Yosemite Falls"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-white font-semibold">Lower Yosemite Falls</span>
              </div>
            </div>
          </motion.div>

          {/* Lo Que Aprendí */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Errores que Cometí */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-red-50 border-2 border-red-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-500 p-2 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-red-900">Errores que Cometí</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">×</span>
                  <span className="text-red-900">No sabía que necesitaba cadenas de nieve en marzo. Tuve que comprarlas de emergencia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">×</span>
                  <span className="text-red-900">Reservé alojamiento muy tarde. Curry Village estaba casi lleno.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">×</span>
                  <span className="text-red-900">No investigué bien las rutas. Algunas estaban cerradas por nieve.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1">×</span>
                  <span className="text-red-900">Crucé por Tecate sin saber que San Ysidro era más rápido para este destino.</span>
                </li>
              </ul>
            </motion.div>

            {/* Lo Que Haría Diferente */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">Lo Que Haría Diferente</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span className="text-green-900">Reservar alojamiento con 2-3 meses de anticipación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span className="text-green-900">Rentar equipo de nieve ANTES de llegar (botas, chamarras).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span className="text-green-900">Verificar el estado de los trails en el sitio oficial del parque.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span className="text-green-900">Planear la ruta de manejo con apps como Waze para evitar tráfico.</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center mt-8 shadow-xl"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              No Cometas Mis Errores
            </h3>
            <p className="text-xl text-orange-100 mb-6 max-w-2xl mx-auto">
              Deja que mi experiencia (y mis errores) te ayuden a tener el viaje perfecto desde el primer intento.
            </p>
            <a
              href="/?start=form"
              className="inline-block bg-white hover:bg-slate-100 text-orange-600 font-bold py-4 px-8 rounded-lg transition-all shadow-lg"
            >
              Planea Tu Viaje Conmigo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
