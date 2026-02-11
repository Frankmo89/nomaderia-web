import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { X, Camera, Video } from 'lucide-react';

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  type: 'photo' | 'video';
  videoId?: string;
  span?: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const items: GalleryItem[] = [
    {
      src: '/images/yosemite_real/1902DDEE-0B55-48C8-8F82-B4736F3C3371.jpg',
      alt: 'Yosemite en Invierno',
      title: 'Yosemite en Invierno',
      subtitle: 'Experiencia Real',
      type: 'photo',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      src: '/images/yosemite_real/20A04C1F-9C8F-4510-BD16-87C3BA73DD7C.jpg',
      alt: 'Vistas del Valle',
      title: 'Vistas del Valle',
      subtitle: 'Yosemite Valley',
      type: 'photo',
    },
    {
      src: '/images/parks/grand-canyon/hero.jpg',
      alt: 'Grand Canyon',
      title: 'Grand Canyon',
      subtitle: 'Amanecer en el borde',
      type: 'video',
      videoId: 'RBaKqFGxGas',
    },
    {
      src: '/images/yosemite_real/9E1825B8-5EF7-42DD-B93C-698AE1C2B34B.jpg',
      alt: 'Rutas de Hiking',
      title: 'Rutas de Hiking',
      subtitle: 'Senderos expertos',
      type: 'photo',
    },
    {
      src: '/images/yosemite_real/D1BB8215-0EA7-4724-90F1-19BED08D947C.jpg',
      alt: 'Nieve en Yosemite',
      title: 'Nieve en Yosemite',
      subtitle: 'Aventura invernal',
      type: 'photo',
    },
    {
      src: '/images/yosemite_real/IMG_F5DB6838-A4C0-415A-8B3A-D145616F2D1C.jpeg',
      alt: 'Explorando el Parque',
      title: 'Explorando el Parque',
      subtitle: 'Tu próximo destino',
      type: 'photo',
      span: 'md:col-span-2',
    },
    {
      src: '/images/parks/zion/hero.jpg',
      alt: 'Zion Canyon',
      title: 'Zion Canyon',
      subtitle: 'Cañones verticales',
      type: 'video',
      videoId: 'KL6TsNvB1HA',
    },
    {
      src: '/images/yosemite_real/b3cf4908-e7b7-4e6c-b3dd-10a70fc79f40.jpg',
      alt: 'Momentos Nomadería',
      title: 'Momentos Nomadería',
      subtitle: 'Recuerdos reales',
      type: 'photo',
    },
  ];

  const handleItemClick = (item: GalleryItem) => {
    if (item.type === 'video' && item.videoId) {
      setSelectedVideo(item.videoId);
    } else {
      setSelectedImage(item.src);
    }
  };

  return (
    <>
      <section ref={sectionRef} className="py-24 px-6 sm:px-8 bg-[#0A2540] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#E8744F]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2D5F3F]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with counter */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-mono text-sm uppercase tracking-[0.3em] text-[#E8744F] font-medium mb-4">
              Galería de Inspiración
            </p>
            <h2 className="text-display text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              Tu próxima aventura te espera
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Desde las cataratas de Yosemite hasta los cañones rojos de Zion.
              Cada imagen es una promesa de aventura.
            </p>
            {/* Stats */}
            <motion.div
              className="flex justify-center gap-12 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 text-white/50">
                <Camera className="w-4 h-4" />
                <span className="text-sm">6 fotos reales</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Video className="w-4 h-4" />
                <span className="text-sm">2 videos</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Masonry Gallery Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]"
            style={{ y: parallaxY }}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className={`group relative overflow-hidden rounded-xl cursor-pointer gallery-item-shine ${item.span || ''}`}
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Video indicator */}
                {item.type === 'video' && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-[#E8744F] rounded-full flex items-center justify-center video-play-pulse">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Info overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400"
                >
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.subtitle}</p>
                </motion.div>

                {/* Corner accent on hover */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[3px] border-l-[3px] border-[#E8744F] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-400 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[3px] border-r-[3px] border-[#E8744F] opacity-0 group-hover:opacity-100 group-hover:w-8 group-hover:h-8 transition-all duration-400 rounded-br-xl" />
              </motion.div>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-2xl sm:text-3xl font-bold text-[#E8744F] italic max-w-3xl mx-auto">
              "La montaña no espera. Nosotros te ayudamos a llegar preparado."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Photo Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#E8744F] transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      {/* Video Lightbox */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#E8744F] transition-colors z-10"
            onClick={() => setSelectedVideo(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
