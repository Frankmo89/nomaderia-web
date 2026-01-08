export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'destinos' | 'tips' | 'equipo';
  date: string;
  readTime: string;
  image: string;
  slug: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Guía Completa: Qué Llevar a Yosemite en Invierno',
    excerpt: 'Aprende qué equipo es esencial para disfrutar de Yosemite en invierno sin pasar frío ni cometer errores costosos.',
    category: 'tips',
    date: '8 de enero de 2026',
    readTime: '5 min',
    image: '/images/destinations/yosemite.jpg',
    slug: 'guia-yosemite-invierno',
    content: '/src/articles/guia-yosemite-invierno.md'
  },
  {
    id: '2',
    title: '5 Errores Que Cometí en Mi Primer Viaje a Yosemite',
    excerpt: 'Mi experiencia real llevando a mis papás a Yosemite. Los errores que cometí para que tú no los repitas.',
    category: 'destinos',
    date: '8 de enero de 2026',
    readTime: '4 min',
    image: '/images/destinations/yosemite.jpg',
    slug: '5-errores-yosemite',
    content: '/src/articles/5-errores-yosemite.md'
  },
  {
    id: '3',
    title: 'Presupuesto Real: ¿Cuánto Cuesta Yosemite desde Tecate?',
    excerpt: 'Desglose detallado de costos reales para un viaje de 3 días a Yosemite desde Baja California.',
    category: 'tips',
    date: '8 de enero de 2026',
    readTime: '6 min',
    image: '/images/destinations/yosemite.jpg',
    slug: 'presupuesto-yosemite-tecate',
    content: '/src/articles/presupuesto-yosemite-tecate.md'
  },
  {
    id: '4',
    title: 'Cruzar la Frontera: ¿Tecate o San Ysidro?',
    excerpt: 'Análisis de rutas y tiempos para elegir la mejor frontera según tu destino. Ahorra horas de manejo.',
    category: 'tips',
    date: '8 de enero de 2026',
    readTime: '5 min',
    image: '/images/blog/frontera.jpg',
    slug: 'frontera-tecate-vs-san-ysidro',
    content: '/src/articles/frontera-tecate-vs-san-ysidro.md'
  },
  {
    id: '5',
    title: 'Permisos y Reservaciones en Yosemite: Guía Completa 2026',
    excerpt: 'Todo lo que necesitas saber sobre Recreation.gov, reservaciones de entrada y permisos especiales.',
    category: 'tips',
    date: '8 de enero de 2026',
    readTime: '7 min',
    image: '/images/destinations/yosemite.jpg',
    slug: 'permisos-reservaciones-yosemite',
    content: '/src/articles/permisos-reservaciones-yosemite.md'
  }
];
