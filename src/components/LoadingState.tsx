import { motion } from 'framer-motion';
import { Mountain } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-[#F8F6F3] noise-texture flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="mb-8 flex justify-center"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Mountain className="w-24 h-24 text-[#2D5F3F]" />
        </motion.div>

        <h2 className="text-display text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">
          Creando Tu Aventura
        </h2>

        <p className="text-xl text-[#2C3E50]/70 mb-8">
          Nuestra IA está trazando el viaje perfecto para ti...
        </p>

        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-[#E8744F]"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
