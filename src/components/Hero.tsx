import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, MapPin, Shield, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';

interface HeroProps {
  onStartPlanning: () => void;
}

// Floating particles component for adventure atmosphere
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/10"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Hero({ onStartPlanning }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Video Background with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        {/* Fallback Image (shows while video loads) */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundImage: 'url(/images/hero/main.jpg)' }}
        />

        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero/main.jpg"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: 'scale(1.1)' }}
        >
          {/* Free adventure stock video - Coverr/Pexels format */}
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/90 via-[#0A2540]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-[#0A2540]/30 opacity-80" />

        {/* Animated gradient shimmer */}
        <div className="absolute inset-0 hero-gradient-shimmer opacity-30" />
      </motion.div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Content with parallax fade */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-24"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8744F]/20 text-[#E8744F] text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md border border-[#E8744F]/30 hero-badge-glow">
              Expediciones Personalizadas
            </span>
          </motion.div>

          <motion.h1
            className="text-display text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[1.05] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tu libertad tiene un mapa. <br />
            <motion.span
              className="text-[#E8744F] inline-block"
              animate={{
                textShadow: [
                  '0 0 20px rgba(232,116,79,0)',
                  '0 0 40px rgba(232,116,79,0.3)',
                  '0 0 20px rgba(232,116,79,0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Nosotros lo trazamos.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-white/80 mb-12 font-light leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Diseñamos expediciones a medida por los Parques Nacionales de EE.UU.
            Logística impecable, rutas expertas y soporte total para que tú solo te preocupes por el camino.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              onClick={onStartPlanning}
              size="lg"
              className="bg-[#E8744F] hover:bg-[#d65a35] text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-2xl transition-all hover:scale-105 group hero-cta-glow"
            >
              Cotizar Mi Aventura
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => {
                const element = document.getElementById('video-showcase');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-8 text-xl font-bold rounded-2xl backdrop-blur-sm transition-all group"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Ver Videos
            </Button>
          </motion.div>

          {/* Trust Badges with enhanced animation */}
          <motion.div
            className="mt-16 flex flex-wrap gap-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { icon: Compass, label: 'Rutas Expertas' },
              { icon: Shield, label: 'Soporte 24/7' },
              { icon: MapPin, label: 'Logística Total' },
            ].map((badge, index) => (
              <motion.div
                key={badge.label}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05, x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{ delay: 1.4 + index * 0.15 }}
              >
                <badge.icon className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wider uppercase">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - enhanced */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.span
          className="text-white/40 text-xs tracking-widest uppercase"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Explora
        </motion.span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
