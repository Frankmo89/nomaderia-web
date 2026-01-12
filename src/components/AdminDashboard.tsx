import { useState } from 'react';
import { LogOut, Users, MapPin, BookOpen, Settings, Menu, X } from 'lucide-react';
import AdminLeads from './admin/AdminLeads';
import AdminItineraries from './admin/AdminItineraries';
import AdminResources from './admin/AdminResources';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'leads' | 'itineraries' | 'resources' | 'settings'>('leads');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'itineraries', label: 'Itinerarios', icon: MapPin },
    { id: 'resources', label: 'Contenido', icon: BookOpen },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  const ActiveComponent = () => {
    switch (activeTab) {
      case 'leads': return <AdminLeads />;
      case 'itineraries': return <AdminItineraries />;
      case 'resources': return <AdminResources />;
      default: return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <h2 className="text-white text-2xl font-bold mb-6">Configuración</h2>
          <p className="text-white/60">Sección de configuración en desarrollo...</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A2540] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-[#0A2540] border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-50">
        <h2 className="font-display text-xl font-bold text-white">NOMADERÍA</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/70 hover:text-white"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Sidebar (Desktop) / Overlay Menu (Mobile) */}
      <aside className={`
        fixed inset-0 z-40 bg-[#0A2540] transition-transform duration-300 md:relative md:translate-x-0 md:w-64 md:border-r md:border-white/10
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Desktop Logo */}
          <div className="hidden md:block p-8 border-b border-white/10">
            <h2 className="font-display text-2xl font-bold text-white">NOMADERÍA</h2>
            <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#E8744F] text-white shadow-lg shadow-[#E8744F]/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-white/10">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <ActiveComponent />
        </div>
      </main>

      {/* Mobile Menu Overlay Background */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
