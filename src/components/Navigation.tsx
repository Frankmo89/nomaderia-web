import { motion } from 'framer-motion';
import { Mountain } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onStartPlanning: () => void;
}

export default function Navigation({ onStartPlanning }: NavigationProps) {
  const location = useLocation();
  const isServiciosPage = location.pathname === '/servicios';

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A2540]/95 backdrop-blur-lg border-b border-white/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <Mountain className="w-8 h-8 text-[#E8744F]" />
          <span className="text-display text-2xl font-bold text-white tracking-tight">Nomaderia</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/servicios"
            className={`text-white/80 hover:text-white transition-colors font-medium hidden sm:block ${
              isServiciosPage ? 'text-[#E8744F]' : ''
            }`}
          >
            Servicios
          </Link>
          <Button
            onClick={onStartPlanning}
            variant="ghost"
            className="border border-white/20 text-white hover:bg-[#2D5F3F] hover:border-[#2D5F3F] hover:text-white transition-all duration-300 px-6 py-2 rounded-lg font-medium"
          >
            Comenzar
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
