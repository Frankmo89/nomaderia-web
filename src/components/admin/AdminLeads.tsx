import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, DollarSign, TrendingUp, CheckCircle, Clock, AlertCircle, Calendar, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Lead {
  id: string;
  clientname: string;
  clientemail: string;
  phonewhatsapp: string;
  destination: string;
  budget: string;
  accommodation: string;
  fitness_level: string;
  travel_dates: string;
  status: 'new' | 'contacted' | 'planning' | 'traveling' | 'completed';
  created_at: string;
  psychography?: string;
  concerns?: string;
  additional_notes?: string;
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
      const { error } = await (supabase
        .from('leads') as any)
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
      const { data, error } = await (supabase
        .from('leads') as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads((data as any) || []);
    } catch (error) {
      console.error('Error loading leads:', error);
    }
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'contacted': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'planning': return <TrendingUp className="w-4 h-4 text-purple-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
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

  const filteredLeads = filter === 'all' ? leads : leads.filter(lead => lead.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-1">Gestión de Leads</h2>
          <p className="text-white/60 text-sm">Visualiza y gestiona tus clientes potenciales</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Total', value: leads.length, icon: User, color: 'text-[#E8744F]' },
          { label: 'Nuevos', value: leads.filter(l => l.status === 'new').length, icon: AlertCircle, color: 'text-yellow-500' },
          { label: 'En Plan', value: leads.filter(l => l.status === 'planning').length, icon: TrendingUp, color: 'text-purple-500' },
          { label: 'Éxito', value: leads.filter(l => l.status === 'completed').length, icon: CheckCircle, color: 'text-green-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</p>
              <stat.icon className={`w-4 h-4 ${stat.color} opacity-60`} />
            </div>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters - Scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['all', 'new', 'contacted', 'planning'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status ? 'bg-[#E8744F] text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {status === 'all' ? 'Todos' : getStatusLabel(status)}
          </button>
        ))}
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 text-center text-white/60">Cargando leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-white/60 bg-white/5 rounded-xl border border-white/10">
            No hay leads en esta categoría
          </div>
        ) : (
          <div className="grid gap-4">
            {/* Desktop Table Header */}
            <div className="hidden lg:grid lg:grid-cols-6 gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-t-xl text-white/60 text-xs font-bold uppercase tracking-wider">
              <div className="col-span-2">Cliente</div>
              <div>Destino</div>
              <div>Presupuesto</div>
              <div>Estado</div>
              <div className="text-right">Acción</div>
            </div>

            {filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-white/5 border border-white/10 rounded-xl lg:rounded-none lg:border-x lg:border-b p-5 lg:px-6 lg:py-4 hover:bg-white/10 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                  {/* Client Info */}
                  <div className="lg:col-span-2 space-y-1">
                    <div className="flex items-center justify-between lg:block">
                      <p className="text-white font-bold text-lg lg:text-base">{lead.clientname}</p>
                      <div className="lg:hidden">{getStatusIcon(lead.status)}</div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-white/60">
                      <a href={`mailto:${lead.clientemail}`} className="flex items-center gap-1 hover:text-[#E8744F]">
                        <Mail className="w-3 h-3" /> {lead.clientemail}
                      </a>
                      <a href={`https://wa.me/${lead.phonewhatsapp.replace(/\D/g,'')}`} className="flex items-center gap-1 hover:text-green-400">
                        <Phone className="w-3 h-3" /> {lead.phonewhatsapp}
                      </a>
                    </div>
                    {lead.psychography && (
                      <p className="text-xs text-[#E8744F] italic mt-2 bg-[#E8744F]/10 px-2 py-1 rounded inline-block">
                        Motivo: {lead.psychography}
                      </p>
                    )}
                  </div>

                  {/* Destination */}
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="w-4 h-4 text-[#E8744F]" />
                    <span className="text-sm font-medium">{lead.destination}</span>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center gap-2 text-white/80">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">{lead.budget}</span>
                  </div>

                  {/* Status (Desktop) */}
                  <div className="hidden lg:flex items-center gap-2">
                    {getStatusIcon(lead.status)}
                    <span className="text-white/80 text-sm">{getStatusLabel(lead.status)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0 border-t border-white/5 lg:border-0">
                    <div className="lg:hidden flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/40" />
                      <span className="text-xs text-white/40">{new Date(lead.created_at).toLocaleDateString()}</span>
                    </div>
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8744F] w-full lg:w-auto"
                    >
                      <option value="new">Nuevo</option>
                      <option value="contacted">Contactado</option>
                      <option value="planning">Planificando</option>
                      <option value="traveling">Viajando</option>
                      <option value="completed">Completado</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
