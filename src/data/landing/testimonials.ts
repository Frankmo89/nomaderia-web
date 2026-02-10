export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  expedition: string;
  rating: number;
  text: string;
  image?: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Digital Nomad & Content Creator',
    location: 'Austin, Texas',
    expedition: 'Patagonia W Trek',
    rating: 5,
    text: 'Como nómada digital, he viajado por todo el mundo, pero la experiencia en Patagonia superó todas mis expectativas. El equipo fue profesional, la logística impecable y los momentos inolvidables. ¡100% recomendado!',
    image: '/images/testimonials/sarah.jpg',
    date: '2024-11-15'
  },
  {
    id: '2',
    name: 'Marco Fernández',
    role: 'Entrepreneur',
    location: 'Ciudad de México',
    expedition: 'Pico de Orizaba',
    rating: 5,
    text: 'Siempre quise conquistar el Pico de Orizaba pero no sabía por dónde empezar. El equipo me preparó perfectamente, el guía fue excepcional y logré mi sueño. Una experiencia transformadora que cambió mi perspectiva de lo que soy capaz de lograr.',
    image: '/images/testimonials/marco.jpg',
    date: '2024-10-08'
  },
  {
    id: '3',
    name: 'Julia Schneider',
    role: 'UX Designer',
    location: 'Berlin, Germany',
    expedition: 'Salar de Uyuni',
    rating: 5,
    text: 'The Salar de Uyuni was on my bucket list for years. The organization was perfect, our guide was knowledgeable and fun, and the landscapes were absolutely surreal. Worth every penny!',
    image: '/images/testimonials/julia.jpg',
    date: '2024-09-22'
  },
  {
    id: '4',
    name: 'Carlos Ruiz',
    role: 'Software Engineer',
    location: 'Barcelona, España',
    expedition: 'Ciudad Perdida Trek',
    rating: 5,
    text: 'Como desarrollador paso mucho tiempo frente a la pantalla. Este trek fue exactamente lo que necesitaba: desconexión total, naturaleza pura y un reto físico increíble. El equipo fue genial y la experiencia, única.',
    image: '/images/testimonials/carlos.jpg',
    date: '2024-08-30'
  },
  {
    id: '5',
    name: 'Amanda Chen',
    role: 'Marketing Manager',
    location: 'San Francisco, CA',
    expedition: 'Costa Rica Multideporte',
    rating: 5,
    text: 'Perfect blend of adventure and comfort! Every day was a new activity and the accommodations were great. The team really knows how to create an unforgettable experience. Already planning my next expedition with them!',
    image: '/images/testimonials/amanda.jpg',
    date: '2024-12-05'
  },
  {
    id: '6',
    name: 'Diego Vargas',
    role: 'Product Designer',
    location: 'Buenos Aires, Argentina',
    expedition: 'Inmersión Amazonas',
    rating: 5,
    text: 'La experiencia en el Amazonas fue mágica. Ver delfines rosados, dormir en un lodge en medio de la selva y aprender de las comunidades nativas fue increíble. El guía naturalista sabía absolutamente todo sobre la fauna y flora.',
    image: '/images/testimonials/diego.jpg',
    date: '2024-07-18'
  }
];

export const getAverageRating = (): number => {
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  return sum / testimonials.length;
};

export const getTestimonialsByExpedition = (expedition: string): Testimonial[] => {
  return testimonials.filter(t => t.expedition === expedition);
};
