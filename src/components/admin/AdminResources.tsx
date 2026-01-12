import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, FileText, MessageSquare, X, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type ResourceType = 'articles' | 'testimonials' | 'gallery';

export default function AdminResources() {
  const [activeTab, setActiveTab] = useState<ResourceType>('articles');
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadItems();
  }, [activeTab]);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await (supabase
        .from(activeTab) as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems((data as any) || []);
    } catch (error) {
      console.error(`Error loading ${activeTab}:`, error);
    }
    setIsLoading(false);
  };

  const handleAddItem = async () => {
    try {
      const { data, error } = await (supabase
        .from(activeTab) as any)
        .insert([formData])
        .select();

      if (error) throw error;
      if (data) {
        setItems([data[0], ...items]);
        setShowForm(false);
        setFormData({});
      }
    } catch (error) {
      console.error(`Error adding to ${activeTab}:`, error);
      alert('Error al agregar item. Revisa los campos.');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;
    try {
      const { error } = await (supabase
        .from(activeTab) as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error(`Error deleting from ${activeTab}:`, error);
    }
  };

  const renderForm = () => {
    if (activeTab === 'articles') {
      return (
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Título del Artículo"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white w-full"
            onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
          />
          <input
            type="text"
            placeholder="URL de Imagen"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white w-full"
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
          <textarea
            placeholder="Extracto (breve descripción)"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white h-24 w-full"
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />
          <textarea
            placeholder="Contenido (Markdown o Texto)"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white h-48 w-full"
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Categoría"
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white w-full"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tiempo lectura"
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white w-full"
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
            />
          </div>
        </div>
      );
    }

    if (activeTab === 'testimonials') {
      return (
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Nombre del Cliente"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white w-full"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ubicación (ej: Tijuana, BC)"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white w-full"
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <textarea
            placeholder="Testimonio"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white h-32 w-full"
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL de Foto de Perfil"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white w-full"
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>
      );
    }

    if (activeTab === 'gallery') {
      return (
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Título de la Foto"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white w-full"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL de la Imagen"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white w-full"
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
          <input
            type="text"
            placeholder="Categoría (ej: Yosemite)"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white w-full"
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <textarea
            placeholder="Descripción"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white h-24 w-full"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-1">Contenido</h2>
          <p className="text-white/60 text-sm">Administra lo que tus clientes ven en la web</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#E8744F] hover:bg-[#d65a35] text-white rounded-xl font-bold transition-all w-full md:w-auto"
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? 'Cancelar' : 'Nuevo Elemento'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-white text-xl font-bold mb-6">Agregar a {activeTab}</h3>
          {renderForm()}
          <div className="mt-8">
            <button
              onClick={handleAddItem}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-[#E8744F] hover:bg-[#d65a35] text-white rounded-xl font-bold transition-all"
            >
              <Save className="w-5 h-5" />
              Guardar en Base de Datos
            </button>
          </div>
        </div>
      )}

      {/* Tabs - Scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: 'articles', label: 'Artículos', icon: FileText },
          { id: 'testimonials', label: 'Testimonios', icon: MessageSquare },
          { id: 'gallery', label: 'Galería', icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as ResourceType);
                setShowForm(false);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#E8744F] text-white shadow-lg shadow-[#E8744F]/20'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-12 text-white/60">Cargando...</div>
        ) : items.length === 0 ? (
          <div className="col-span-full text-center py-12 text-white/60 bg-white/5 rounded-2xl border border-white/10">
            No hay elementos registrados
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#E8744F]/30 transition-all group">
              {item.image_url && (
                <div className="h-48 overflow-hidden relative">
                  <img src={item.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2 truncate">
                  {item.title || item.name || 'Sin título'}
                </h3>
                <p className="text-white/60 text-sm line-clamp-2 mb-6 h-10">
                  {item.excerpt || item.text || item.description || 'Sin descripción'}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-xs text-[#E8744F] font-bold uppercase tracking-widest">
                    {item.category || item.location || 'General'}
                  </span>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
