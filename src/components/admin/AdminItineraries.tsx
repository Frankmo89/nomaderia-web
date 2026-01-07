import { useState } from 'react';
import { Plus, Edit2, Trash2, Download } from 'lucide-react';

interface Itinerary {
  id: string;
  title: string;
  destination: string;
  days: number;
  difficulty: string;
  created_at: string;
}

export default function AdminItineraries() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([
    {
      id: '1',
      title: 'Yosemite 3 Días - Clásico',
      destination: 'Yosemite',
      days: 3,
      difficulty: 'Fácil a Moderado',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Grand Canyon 4 Días - Aventurero',
      destination: 'Grand Canyon',
      days: 4,
      difficulty: 'Moderado',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    days: 3,
    difficulty: 'Moderado',
  });

  const handleAddItinerary = () => {
    if (formData.title && formData.destination) {
      const newItinerary: Itinerary = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString(),
      };
      setItineraries([newItinerary, ...itineraries]);
      setFormData({ title: '', destination: '', days: 3, difficulty: 'Moderado' });
      setShowForm(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white text-3xl font-bold mb-2">Gestión de Itinerarios</h2>
          <p className="text-white/60">Crea y gestiona plantillas de itinerarios reutilizables</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-[#E8744F] hover:bg-[#d65a35] text-white rounded-lg font-medium transition-all"
        >
          <Plus className="w-5 h-5" />
          Nuevo Itinerario
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-white text-xl font-bold mb-4">Crear Nuevo Itinerario</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Título del itinerario"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#E8744F]"
            />
            <select
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#E8744F]"
            >
              <option value="">Selecciona destino</option>
              <option value="Yosemite">Yosemite</option>
              <option value="Grand Canyon">Grand Canyon</option>
              <option value="Zion">Zion</option>
              <option value="Sequoia">Sequoia</option>
            </select>
            <input
              type="number"
              min="1"
              max="14"
              value={formData.days}
              onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#E8744F]"
            />
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#E8744F]"
            >
              <option value="Fácil">Fácil</option>
              <option value="Moderado">Moderado</option>
              <option value="Difícil">Difícil</option>
              <option value="Fácil a Moderado">Fácil a Moderado</option>
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddItinerary}
              className="px-6 py-2 bg-[#E8744F] hover:bg-[#d65a35] text-white rounded-lg font-medium transition-all"
            >
              Crear
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Itineraries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#E8744F]/30 transition-all">
            <h3 className="text-white font-bold text-lg mb-2">{itinerary.title}</h3>
            <div className="space-y-2 mb-4">
              <p className="text-white/60 text-sm">
                <span className="font-semibold">Destino:</span> {itinerary.destination}
              </p>
              <p className="text-white/60 text-sm">
                <span className="font-semibold">Duración:</span> {itinerary.days} días
              </p>
              <p className="text-white/60 text-sm">
                <span className="font-semibold">Dificultad:</span> {itinerary.difficulty}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium transition-all">
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-sm font-medium transition-all">
                <Download className="w-4 h-4" />
                Descargar
              </button>
              <button className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
