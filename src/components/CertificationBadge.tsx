import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';

export default function CertificationBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-green-500"
    >
      <div className="relative">
        <Award className="w-6 h-6 text-green-600" />
        <CheckCircle className="w-4 h-4 text-green-600 absolute -top-1 -right-1 bg-white rounded-full" />
      </div>
      <div className="text-left">
        <div className="text-xs text-slate-600 font-semibold">Agente Certificado</div>
        <div className="text-sm text-slate-900 font-bold">Travel Agent Training 2025</div>
      </div>
    </motion.div>
  );
}
