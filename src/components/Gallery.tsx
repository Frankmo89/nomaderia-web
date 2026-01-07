import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: '/images/yosemite_real/1902DDEE-0B55-48C8-8F82-B4736F3C3371.jpg',
      alt: 'Yosemite en Invierno',
      title: 'Yosemite en Invierno',
      subtitle: 'Experiencia Real',
    },
    {
      src: '/images/yosemite_real/20A04C1F-9C8F-4510-BD16-87C3BA73DD7C.jpg',
      alt: 'Vistas del Valle',
      title: 'Vistas del Valle',
      subtitle: 'Yosemite',
    },
    {
      src: '/images/yosemite_real/9E1825B8-5EF7-42DD-B93C-698AE1C2B34B.jpg',
      alt: 'Rutas de Hiking',
      title: 'Rutas de Hiking',
      subtitle: 'Aventura',
    },
    {
      src: '/images/yosemite_real/D1BB8215-0EA7-4724-90F1-19BED08D947C.jpg',
      alt: 'Nieve en Yosemite',
      title: 'Nieve en Yosemite',
      subtitle: 'Logística',
    },
    {
      src: '/images/yosemite_real/IMG_F5DB6838-A4C0-415A-8B3A-D145616F2D1C.jpeg',
      alt: 'Explorando el Parque',
      title: 'Explorando el Parque',
      subtitle: 'Personalizado',
    },
    {
      src: '/images/yosemite_real/b3cf4908-e7b7-4e6c-b3dd-10a70fc79f40.jpg',
      alt: 'Momentos Nomadería',
      title: 'Momentos Nomadería',
      subtitle: 'Encuentros',
    },
    {
      src: '/images/parks/grand-canyon/hero.jpg',
      alt: 'Grand Canyon',
      title: 'Grand Canyon',
      subtitle: 'Próximamente',
    },
    {
      src: '/images/parks/zion/hero.jpg',
      alt: 'Zion Canyon',
      title: 'Zion',
      subtitle: 'Próximamente',
    },
  ];

  return (
    <>
      <section className="py-24 px-6 sm:px-8 bg-[#0A2540]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-2xl sm:text-3xl font-bold text-[#E8744F] italic max-w-3xl mx-auto">
              "La montaña no te espera. Pero nosotros sí te ayudamos a llegar preparado."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#E8744F] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </>
  );
}
