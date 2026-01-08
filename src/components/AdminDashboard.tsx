import { useState } from 'react';
import { LogOut, Users, MapPin, BookOpen, Settings } from 'lucide-react';
import AdminLeads from './admin/AdminLeads';
import AdminItineraries from './admin/AdminItineraries';
import AdminResources from './admin/AdminResources';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'leads' | 'itineraries' | 'resources' | 'settings'>('leads');

  const tabs = [
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'itineraries', label: 'Itinerarios', icon: MapPin },
    { id: 'resources', label: 'Recursos', icon: BookOpen },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A2540]">
      {/* Header */}
      <header className="bg-[#0A2540] border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-2xl font-bold text-white">
              NOMADERÍA
            </h2>
            <h1 className="text-white font-bold text-xl">Panel de Administración</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#E8744F]/10 hover:bg-[#E8744F]/20 text-[#E8744F] rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0A2540] border-r border-white/10 min-h-[calc(100vh-80px)]">
          <nav className="p-6 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#E8744F] text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'leads' && <AdminLeads />}
          {activeTab === 'itineraries' && <AdminItineraries />}
          {activeTab === 'resources' && <AdminResources />}
          {activeTab === 'settings' && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-white text-2xl font-bold mb-6">Configuración</h2>
              <p className="text-white/60">Sección de configuración en desarrollo...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
