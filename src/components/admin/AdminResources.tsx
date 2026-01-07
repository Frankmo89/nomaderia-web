import { useState, useEffect } from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Resource {
  id: string;
  type: 'hike' | 'accommodation' | 'logistics';
  name: string;
  destination: string;
  details: string;
  link?: string;
}

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'hike' | 'accommodation' | 'logistics'>('hike');

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const { data: hikes } = await supabase.from('hikes').select('*');
      const { data: accs } = await supabase.from('accommodations').select('*');
      
      const allResources: Resource[] = [
        ...(hikes?.map(h => ({ ...h, type: 'hike' as const })) || []),
        ...(accs?.map(a => ({ ...a, type: 'accommodation' as const })) || []),
      ];
      
      setResources(allResources);
    } catch (error) {
      console.error('Error loading resources:', error);
    }
    setIsLoading(false);
  };
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    details: '',
    link: '',
  });

  const handleAddResource = async () => {
    if (formData.name && formData.destination) {
      try {
        const table = activeTab === 'hike' ? 'hikes' : activeTab === 'accommodation' ? 'accommodations' : null;
        if (!table) return;

        const { data, error } = await supabase
          .from(table)
          .insert([formData])
          .select();

        if (error) throw error;

        if (data) {
          const newResource: Resource = {
            ...data[0],
            type: activeTab,
          };
          setResources([newResource, ...resources]);
        }
        
        setFormData({ name: '', destination: '', details: '', link: '' });
        setShowForm(false);
      } catch (error) {
        console.error('Error adding resource:', error);
      }
    }
  };

  const handleDeleteResource = async (id: string, type: string) => {
    try {
      const table = type === 'hike' ? 'hikes' : type === 'accommodation' ? 'accommodations' : null;
      if (!table) return;

      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setResources(resources.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const filteredResources = resources.filter(r => r.type === activeTab);

  const tabLabels = {
    hike: 'Rutas de Hiking',
    accommodation: 'Alojamientos',
    logistics: 'Logística',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white text-3xl font-bold mb-2">Base de Recursos</h2>
          <p className="text-white/60">Gestiona tu biblioteca de rutas, alojamientos y logística</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-[#E8744F] hover:bg-[#d65a35] text-white rounded-lg font-medium transition-all"
        >
          <Plus className="w-5 h-5" />
          Nuevo Recurso
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-white text-xl font-bold mb-4">Agregar Nuevo Recurso - {tabLabels[activeTab]}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              <option value="General">General</option>
            </select>
            <textarea
              placeholder="Detalles"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="md:col-span-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#E8744F] resize-none h-20"
            />
            <input
              type="url"
              placeholder="Link (opcional)"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="md:col-span-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#E8744F]"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddResource}
              className="px-6 py-2 bg-[#E8744F] hover:bg-[#d65a35] text-white rounded-lg font-medium transition-all"
            >
              Agregar
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

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['hike', 'accommodation', 'logistics'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab
                ? 'bg-[#E8744F] text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-12 text-white/60">
            No hay recursos en esta categoría
          </div>
        ) : (
          filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#E8744F]/30 transition-all">
              <h3 className="text-white font-bold text-lg mb-2">{resource.name}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-white/60 text-sm">
                  <span className="font-semibold">Destino:</span> {resource.destination}
                </p>
                <p className="text-white/60 text-sm">{resource.details}</p>
              </div>
              <div className="flex gap-2">
                {resource.link && resource.link !== '#' && (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visitar
                  </a>
                )}
                <button 
                  onClick={() => handleDeleteResource(resource.id, resource.type)}
                  className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
