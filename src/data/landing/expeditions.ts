export interface Expedition {
  id: string;
  name: string;
  location: string;
  country: string;
  duration: string;
  difficulty: 'Fácil' | 'Moderada' | 'Desafiante' | 'Extrema';
  priceUSD: number;
  description: string;
  highlights: string[];
  included: string[];
  image: string;
  stripePaymentLink?: string;
}

export const expeditions: Expedition[] = [
  {
    id: 'patagonia-w-trek',
    name: 'Patagonia W Trek',
    location: 'Torres del Paine',
    country: 'Chile',
    duration: '5 días / 4 noches',
    difficulty: 'Desafiante',
    priceUSD: 1850,
    description: 'Recorre uno de los trekkings más espectaculares del mundo. El circuito W te llevará por glaciares, lagos turquesa y las icónicas Torres del Paine.',
    highlights: [
      'Vista de las Torres del Paine al amanecer',
      'Glaciar Grey y navegación',
      'Valle del Francés',
      'Lago Pehoé y fauna patagónica'
    ],
    included: [
      'Guía certificado bilingüe',
      'Alojamiento en refugios',
      'Comidas incluidas',
      'Transporte desde/hacia Puerto Natales',
      'Equipo de seguridad'
    ],
    image: '/images/expeditions/patagonia.jpg'
  },
  {
    id: 'salar-uyuni',
    name: 'Salar de Uyuni Extremo',
    location: 'Salar de Uyuni',
    country: 'Bolivia',
    duration: '4 días / 3 noches',
    difficulty: 'Moderada',
    priceUSD: 1200,
    description: 'Explora el desierto de sal más grande del mundo. Un paisaje surrealista que parece de otro planeta, con lagunas de colores y volcanes.',
    highlights: [
      'Amanecer en el Salar infinito',
      'Isla Incahuasi (Isla del Pescado)',
      'Lagunas de colores (Verde, Colorada)',
      'Geysers Sol de Mañana',
      'Fotografía de perspectiva'
    ],
    included: [
      'Transporte 4x4',
      'Alojamiento (incluye hotel de sal)',
      'Todas las comidas',
      'Guía experto local',
      'Entrada a reservas'
    ],
    image: '/images/expeditions/uyuni.jpg'
  },
  {
    id: 'pico-orizaba',
    name: 'Cumbre del Pico de Orizaba',
    location: 'Pico de Orizaba',
    country: 'México',
    duration: '3 días / 2 noches',
    difficulty: 'Extrema',
    priceUSD: 950,
    description: 'Conquista el volcán más alto de México (5,636m). Técnica de alta montaña con crampones y piolet en el techo de México.',
    highlights: [
      'Cumbre del volcán más alto de México',
      'Técnica de glaciar',
      'Vista de dos océanos desde la cumbre',
      'Aclimatación en La Malinche'
    ],
    included: [
      'Guía de alta montaña certificado',
      'Equipo técnico (crampones, piolet, arnés)',
      'Alojamiento en refugio Piedra Grande',
      'Comidas',
      'Transporte desde Puebla'
    ],
    image: '/images/expeditions/orizaba.jpg'
  },
  {
    id: 'amazon-jungle',
    name: 'Inmersión Amazonas',
    location: 'Selva Amazónica',
    country: 'Perú',
    duration: '6 días / 5 noches',
    difficulty: 'Moderada',
    priceUSD: 1650,
    description: 'Adéntrate en el pulmón del planeta. Experimenta la biodiversidad más rica del mundo y conecta con comunidades nativas.',
    highlights: [
      'Navegación por el río Amazonas',
      'Avistamiento de fauna (monos, guacamayos, delfines rosados)',
      'Visita a comunidades nativas',
      'Trekking nocturno en la selva',
      'Pesca de pirañas'
    ],
    included: [
      'Alojamiento en lodge eco-friendly',
      'Todas las comidas',
      'Guía naturalista experto',
      'Transporte fluvial',
      'Excursiones diarias'
    ],
    image: '/images/expeditions/amazon.jpg'
  },
  {
    id: 'costa-rica-adventure',
    name: 'Costa Rica Multideporte',
    location: 'Varios parques nacionales',
    country: 'Costa Rica',
    duration: '7 días / 6 noches',
    difficulty: 'Moderada',
    priceUSD: 1950,
    description: 'Combina rafting, canopy, senderismo y surf en el paraíso de la aventura. Pura vida en su máxima expresión.',
    highlights: [
      'Rafting clase IV en río Pacuare',
      'Canopy en Monteverde',
      'Volcán Arenal y aguas termales',
      'Surf en playas del Pacífico',
      'Puentes colgantes en la selva nubosa'
    ],
    included: [
      'Alojamiento en hoteles boutique',
      'Comidas especificadas',
      'Todos los tours y actividades',
      'Equipo para actividades',
      'Transporte privado'
    ],
    image: '/images/expeditions/costa-rica.jpg'
  },
  {
    id: 'atacama-desert',
    name: 'Desierto de Atacama Astronómico',
    location: 'San Pedro de Atacama',
    country: 'Chile',
    duration: '5 días / 4 noches',
    priceUSD: 1400,
    description: 'Explora el desierto más árido del mundo bajo los cielos más limpios del planeta. Astronomía, geysers y lagunas altiplánicas.',
    highlights: [
      'Valle de la Luna al atardecer',
      'Geysers del Tatio al amanecer',
      'Lagunas Altiplánicas Miscanti y Miñiques',
      'Observación astronómica profesional',
      'Termas de Puritama'
    ],
    included: [
      'Alojamiento boutique',
      'Desayunos incluidos',
      'Tours grupales compartidos',
      'Sesión de astronomía con telescopio',
      'Traslados'
    ],
    image: '/images/expeditions/atacama.jpg'
  },
  {
    id: 'colombia-lost-city',
    name: 'Ciudad Perdida Trek',
    location: 'Sierra Nevada de Santa Marta',
    country: 'Colombia',
    duration: '5 días / 4 noches',
    difficulty: 'Desafiante',
    priceUSD: 800,
    description: 'Descubre la Ciudad Perdida, anterior a Machu Picchu. Trekking intenso por selva tropical hasta ruinas ancestrales.',
    highlights: [
      'Ciudad Perdida (Teyuna)',
      'Trekking por selva tropical',
      'Ríos y cascadas',
      'Comunidades indígenas Kogui',
      '1,200 escalones ancestrales'
    ],
    included: [
      'Guía indígena certificado',
      'Alojamiento en campamentos',
      'Todas las comidas',
      'Mulas para carga de equipaje',
      'Entrada al parque'
    ],
    image: '/images/expeditions/lost-city.jpg'
  },
  {
    id: 'ecuador-cotopaxi',
    name: 'Volcán Cotopaxi',
    location: 'Cotopaxi',
    country: 'Ecuador',
    duration: '3 días / 2 noches',
    difficulty: 'Desafiante',
    priceUSD: 850,
    description: 'Asciende uno de los volcanes activos más altos del mundo (5,897m). Técnica de glaciar en los Andes ecuatorianos.',
    highlights: [
      'Cumbre del Cotopaxi (5,897m)',
      'Técnica de crampones en glaciar',
      'Aclimatación en Rumiñahui',
      'Vistas de la Avenida de los Volcanes'
    ],
    included: [
      'Guía ASEGUIM certificado',
      'Equipo técnico completo',
      'Alojamiento en refugio José Ribas',
      'Comidas',
      'Transporte desde Quito'
    ],
    image: '/images/expeditions/cotopaxi.jpg'
  }
];

export const getExpeditionById = (id: string): Expedition | undefined => {
  return expeditions.find(exp => exp.id === id);
};

export const getExpeditionsByDifficulty = (difficulty: Expedition['difficulty']): Expedition[] => {
  return expeditions.filter(exp => exp.difficulty === difficulty);
};

export const getExpeditionsByPriceRange = (min: number, max: number): Expedition[] => {
  return expeditions.filter(exp => exp.priceUSD >= min && exp.priceUSD <= max);
};
