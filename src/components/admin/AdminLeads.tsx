import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, DollarSign, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Lead {
  id: string;
  clientname: string;
  clientemail: string;
  phonewhatsapp: string;
  destination: string;
  budget: string;
  accommodation: string;
  fitnessLevel: string;
  travelDates: string;
  status: 'new' | 'contacted' | 'planning' | 'traveling' | 'completed';
  created_at: string;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'planning'>('all');

  useEffect(() => {
    loadLeads();
  }, []);

  const updateLeadStatus = async (id: string, newStatus: Lead['status']) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        // Map snake_case from DB to camelCase for component
        const mappedLeads = data.map((lead: any) => ({
          ...lead,
          fitnessLevel: lead.fitness_level,
          travelDates: lead.travel_dates
        }));
        setLeads(mappedLeads);
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    }
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'contacted':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'planning':
        return <TrendingUp className="w-4 h-4 text-purple-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      new: 'Nuevo',
      contacted: 'Contactado',
      planning: 'Planificando',
      traveling: 'Viajando',
      completed: 'Completado',
    };
    return labels[status] || status;
  };

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-white text-3xl font-bold mb-2">Gestión de Leads</h2>
        <p className="text-white/60">Visualiza y gestiona todos los clientes potenciales</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Total de Leads</p>
              <p className="text-white text-3xl font-bold">{leads.length}</p>
            </div>
            <Mail className="w-10 h-10 text-[#E8744F] opacity-20" />
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Nuevos</p>
              <p className="text-white text-3xl font-bold">{leads.filter(l => l.status === 'new').length}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">En Planificación</p>
              <p className="text-white text-3xl font-bold">{leads.filter(l => l.status === 'planning').length}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Completados</p>
              <p className="text-white text-3xl font-bold">{leads.filter(l => l.status === 'completed').length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {['all', 'new', 'contacted', 'planning'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === status
                ? 'bg-[#E8744F] text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {status === 'all' ? 'Todos' : status === 'new' ? 'Nuevos' : status === 'contacted' ? 'Contactados' : 'Planificando'}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-white/60">Cargando leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-white/60">No hay leads en esta categoría</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Nombre</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Contacto</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Destino</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Presupuesto</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Estado</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{lead.clientname}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-white/80 text-sm flex items-center gap-2">
                          <Mail className="w-4 h-4" /> {lead.clientemail}
                        </p>
                        <p className="text-white/60 text-sm flex items-center gap-2">
                          <Phone className="w-4 h-4" /> {lead.phonewhatsapp}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white/80 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {lead.destination}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white/80 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" /> {lead.budget}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(lead.status)}
                        <span className="text-white/80 text-sm">{getStatusLabel(lead.status)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-[#E8744F]"
                      >
                        <option value="new">Nuevo</option>
                        <option value="contacted">Contactado</option>
                        <option value="planning">Planificando</option>
                        <option value="traveling">Viajando</option>
                        <option value="completed">Completado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
