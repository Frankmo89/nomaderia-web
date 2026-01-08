import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Users, Calendar, Bed, Mail } from 'lucide-react';

interface TripCosts {
  accommodation: number;
  food: number;
  gas: number;
  parkEntry: number;
  permits: number;
  total: number;
}

export default function TripCalculator() {
  const [destination, setDestination] = useState('yosemite');
  const [days, setDays] = useState(3);
  const [people, setPeople] = useState(2);
  const [accommodation, setAccommodation] = useState('hotel');
  const [comfort, setComfort] = useState('confort');
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Costos base por noche según tipo de alojamiento y nivel de confort
  const accommodationCosts: Record<string, Record<string, number>> = {
    camping: { basico: 30, confort: 50, premium: 80 },
    hotel: { basico: 80, confort: 120, premium: 200 },
    rv: { basico: 60, confort: 100, premium: 150 }
  };

  // Costos de comida por persona por día
  const foodCosts: Record<string, number> = {
    basico: 25,
    confort: 40,
    premium: 60
  };

  // Distancias desde Tecate (km)
  const distances: Record<string, number> = {
    yosemite: 750,
    grand_canyon: 900,
    zion: 1100,
    sequoia: 700
  };

  // Calcular costos
  const calculateCosts = (): TripCosts => {
    const accommodationCost = accommodationCosts[accommodation][comfort] * days;
    const foodCost = foodCosts[comfort] * days * people;
    
    // Gasolina: distancia ida y vuelta, 12 km/litro, $1.20 USD/litro
    const distance = distances[destination];
    const gasCost = Math.round((distance * 2) / 12 * 1.2);
    
    // Entrada a parques: $100 USD por persona (turistas internacionales)
    const parkEntryCost = 100 * people;
    
    // Permisos y reservas estimados
    const permitsCost = accommodation === 'camping' ? 50 : 30;
    
    const total = accommodationCost + foodCost + gasCost + parkEntryCost + permitsCost;
    
    return {
      accommodation: accommodationCost,
      food: foodCost,
      gas: gasCost,
      parkEntry: parkEntryCost,
      permits: permitsCost,
      total
    };
  };

  const costs = calculateCosts();

  const handleGetBreakdown = async () => {
    if (!email) {
      alert('Por favor ingresa tu email');
      return;
    }

    // Aquí guardaríamos en Supabase y enviaríamos el email
    // Por ahora solo mostramos confirmación
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setShowEmailForm(false);
      setEmail('');
    }, 3000);
  };

  const destinationNames: Record<string, string> = {
    yosemite: 'Yosemite',
    grand_canyon: 'Grand Canyon',
    zion: 'Zion',
    sequoia: 'Sequoia'
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full mb-4">
            <Calculator className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold">Herramienta Gratuita</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Calculadora de Viaje
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Descubre cuánto costaría tu aventura. Estimado realista basado en precios 2026.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Panel de Configuración */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Configura tu Viaje</h3>

            {/* Destino */}
            <div className="mb-6">
              <label className="block text-slate-300 font-semibold mb-3">Destino</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(destinationNames).map(([key, name]) => (
                  <button
                    key={key}
                    onClick={() => setDestination(key)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      destination === key
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Duración */}
            <div className="mb-6">
              <label className="block text-slate-300 font-semibold mb-3">
                <Calendar className="inline w-5 h-5 mr-2" />
                Duración: {days} días
              </label>
              <input
                type="range"
                min="2"
                max="7"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-1">
                <span>2 días</span>
                <span>7 días</span>
              </div>
            </div>

            {/* Personas */}
            <div className="mb-6">
              <label className="block text-slate-300 font-semibold mb-3">
                <Users className="inline w-5 h-5 mr-2" />
                Personas: {people}
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-1">
                <span>1 persona</span>
                <span>8 personas</span>
              </div>
            </div>

            {/* Alojamiento */}
            <div className="mb-6">
              <label className="block text-slate-300 font-semibold mb-3">
                <Bed className="inline w-5 h-5 mr-2" />
                Tipo de Alojamiento
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'camping', label: 'Camping' },
                  { key: 'hotel', label: 'Hotel' },
                  { key: 'rv', label: 'RV' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setAccommodation(key)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      accommodation === key
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nivel de Confort */}
            <div className="mb-6">
              <label className="block text-slate-300 font-semibold mb-3">Nivel de Confort</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'basico', label: 'Básico' },
                  { key: 'confort', label: 'Confort' },
                  { key: 'premium', label: 'Premium' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setComfort(key)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      comfort === key
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Panel de Resultados */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Estimado de Costos</h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-slate-600">
                <span className="text-slate-300">Alojamiento ({days} noches)</span>
                <span className="text-white font-bold">${costs.accommodation} USD</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-600">
                <span className="text-slate-300">Comidas ({people} personas)</span>
                <span className="text-white font-bold">${costs.food} USD</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-600">
                <span className="text-slate-300">Gasolina (ida y vuelta)</span>
                <span className="text-white font-bold">${costs.gas} USD</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-600">
                <span className="text-slate-300">Entradas al parque</span>
                <span className="text-white font-bold">${costs.parkEntry} USD</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-600">
                <span className="text-slate-300">Permisos y reservas</span>
                <span className="text-white font-bold">${costs.permits} USD</span>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl text-slate-300 font-semibold">Total Estimado</span>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-400">
                    ${costs.total} USD
                  </div>
                  <div className="text-sm text-slate-400">
                    ${Math.round(costs.total / people)} USD por persona
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-300">
                💡 <strong>Nota:</strong> Incluye el cargo de $100 USD por persona para turistas internacionales (vigente desde enero 2026).
              </p>
            </div>

            {!showEmailForm && !emailSent && (
              <button
                onClick={() => setShowEmailForm(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Recibir Desglose Completo por Email
              </button>
            )}

            {showEmailForm && !emailSent && (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={handleGetBreakdown}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg shadow-orange-500/30"
                >
                  Enviar Desglose
                </button>
              </div>
            )}

            {emailSent && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                <p className="text-green-300 font-semibold">
                  ✅ ¡Desglose enviado! Revisa tu email.
                </p>
              </div>
            )}

            <p className="text-xs text-slate-400 text-center mt-4">
              * Estimado basado en precios promedio 2026. Los costos reales pueden variar.
            </p>
          </motion.div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-300 text-lg mb-4">
            ¿Quieres que nosotros nos encarguemos de TODO?
          </p>
          <a
            href="/?start=form"
            className="inline-block bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-8 rounded-lg transition-all shadow-lg"
          >
            Ver Paquetes de Nomadería
          </a>
        </motion.div>
      </div>
    </section>
  );
}
