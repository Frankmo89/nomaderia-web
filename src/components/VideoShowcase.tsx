import { motion } from 'framer-motion';
import { Play, Mountain, TreePine, Waves } from 'lucide-react';
import { useState } from 'react';

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  youtubeId: string;
  thumbnail: string;
  icon: typeof Mountain;
  duration: string;
}

const adventureVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Yosemite en Invierno',
    subtitle: 'Cascadas congeladas y senderos nevados',
    youtubeId: 'eOsKFOrW5RI',
    thumbnail: '/images/parks/yosemite/hero.jpg',
    icon: Mountain,
    duration: '4:32',
  },
  {
    id: '2',
    title: 'Grand Canyon al Amanecer',
    subtitle: 'Los colores que no verás en fotos',
    youtubeId: 'RBaKqFGxGas',
    thumbnail: '/images/parks/grand-canyon/hero.jpg',
    icon: Waves,
    duration: '3:47',
  },
  {
    id: '3',
    title: 'Zion: Angels Landing',
    subtitle: 'La ruta más vertical del suroeste',
    youtubeId: 'KL6TsNvB1HA',
    thumbnail: '/images/parks/zion/hero.jpg',
    icon: Mountain,
    duration: '5:21',
  },
  {
    id: '4',
    title: 'Sequoia: Gigantes Milenarios',
    subtitle: 'Caminando entre los árboles más grandes del planeta',
    youtubeId: 'QHLq03MhgDE',
    thumbnail: '/images/parks/sequoia/hero.jpg',
    icon: TreePine,
    duration: '3:15',
  },
];

function VideoCard({ video, index, onPlay }: { video: VideoItem; index: number; onPlay: (id: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(video.id)}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Thumbnail */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/30 to-transparent" />

        {/* Animated border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-[#E8744F]/0 group-hover:border-[#E8744F]/50 transition-colors duration-500"
          animate={isHovered ? { boxShadow: '0 0 30px rgba(232,116,79,0.3)' } : { boxShadow: '0 0 0px rgba(232,116,79,0)' }}
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E8744F] rounded-full flex items-center justify-center shadow-2xl"
            whileHover={{ scale: 1.15 }}
            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
          >
            <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="white" />
          </motion.div>
        </div>

        {/* Duration badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-xs font-mono">{video.duration}</span>
        </div>

        {/* Icon badge */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
          <video.icon className="w-5 h-5 text-white" />
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={false}
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{video.title}</h3>
            <p className="text-white/70 text-sm">{video.subtitle}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const activeVideoData = adventureVideos.find(v => v.id === activeVideo);

  return (
    <>
      <section id="video-showcase" className="py-24 px-6 sm:px-8 bg-[#0A2540] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 topo-pattern opacity-30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8744F]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2D5F3F]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.p
              className="text-mono text-sm uppercase tracking-[0.3em] text-[#E8744F] font-medium mb-4"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Experiencias en Video
            </motion.p>
            <h2 className="text-display text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              Siente la aventura{' '}
              <span className="text-[#E8744F]">antes de vivirla</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Descubre en video los destinos que diseñamos para ti.
              Cada ruta, cada vista, cada momento que te espera.
            </p>
          </motion.div>

          {/* Featured Video - Large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <VideoCard
              video={adventureVideos[0]}
              index={0}
              onPlay={setActiveVideo}
            />
          </motion.div>

          {/* Secondary Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adventureVideos.slice(1).map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index + 1}
                onPlay={setActiveVideo}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-2xl sm:text-3xl font-bold text-white/90 italic max-w-3xl mx-auto mb-2">
              "No cuentes los kilómetros.{' '}
              <span className="text-[#E8744F]">Cuenta las historias.</span>"
            </p>
            <p className="text-white/40 text-sm tracking-wider uppercase mt-4">- Nomaderia</p>
          </motion.div>
        </div>
      </section>

      {/* Video Lightbox */}
      {activeVideo && activeVideoData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl aspect-video relative"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoData.youtubeId}?autoplay=1&rel=0`}
              title={activeVideoData.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-2xl"
            />
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-sm tracking-wider uppercase transition-colors"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
