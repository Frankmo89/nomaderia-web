export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'booking' | 'preparation' | 'safety' | 'payments';
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: '¿Qué nivel de experiencia necesito?',
    answer: 'Cada expedición tiene su nivel de dificultad claramente indicado. Ofrecemos aventuras desde nivel Fácil (sin experiencia previa necesaria) hasta Extrema (requiere experiencia técnica en alta montaña). Nuestros guías te prepararán y acompañarán en todo momento.',
    category: 'general'
  },
  {
    id: '2',
    question: '¿Qué incluye el precio de la expedición?',
    answer: 'El precio incluye: guía certificado, alojamiento especificado, comidas indicadas, transporte durante la expedición, equipo técnico necesario, y permisos de entrada. NO incluye: vuelos internacionales, seguro de viaje, propinas, ni comidas no especificadas.',
    category: 'payments'
  },
  {
    id: '3',
    question: '¿Cómo funciona el proceso de reserva?',
    answer: '1) Selecciona tu expedición y fecha, 2) Paga un depósito del 30% mediante Stripe, 3) Recibes confirmación y guía de preparación, 4) Agenda una llamada con tu guía, 5) Paga el saldo 30 días antes de la salida. ¡Así de simple!',
    category: 'booking'
  },
  {
    id: '4',
    question: '¿Qué pasa si necesito cancelar?',
    answer: 'Política de cancelación: Más de 60 días antes: reembolso del 80% del depósito. Entre 30-60 días: reembolso del 50%. Menos de 30 días: sin reembolso. Recomendamos contratar seguro de viaje con cobertura de cancelación.',
    category: 'booking'
  },
  {
    id: '5',
    question: '¿Las expediciones son grupales o privadas?',
    answer: 'Ofrecemos ambas opciones. Las expediciones grupales tienen máximo 12 personas y salen en fechas fijas. Las expediciones privadas pueden organizarse cualquier día del año para grupos de 4+ personas. Contáctanos para opciones personalizadas.',
    category: 'general'
  },
  {
    id: '6',
    question: '¿Necesito equipo especial?',
    answer: 'Depende de la expedición. Para trekkings básicos solo necesitas ropa adecuada y botas. Para expediciones técnicas (alta montaña), proporcionamos equipo técnico (crampones, piolet, arnés). Te enviamos una lista detallada al confirmar tu reserva.',
    category: 'preparation'
  },
  {
    id: '7',
    question: '¿Qué tan seguras son las expediciones?',
    answer: 'La seguridad es nuestra prioridad #1. Todos nuestros guías tienen certificaciones internacionales (WFR, UIAGM, etc.), llevamos equipo de comunicación satelital, botiquín de emergencia, y seguro de rescate. Evaluamos condiciones climáticas constantemente.',
    category: 'safety'
  },
  {
    id: '8',
    question: '¿Puedo ir solo o debo ir en grupo?',
    answer: '¡Puedes ir solo! Muchos de nuestros viajeros son personas solas que se unen a grupos. Es una excelente forma de conocer gente con intereses similares. También ofrecemos expediciones privadas si prefieres ir con tu propio grupo.',
    category: 'general'
  },
  {
    id: '9',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos pagos con tarjeta de crédito/débito mediante Stripe (Visa, Mastercard, American Express). Para grupos grandes, aceptamos transferencias bancarias. Los pagos son seguros y procesados en USD.',
    category: 'payments'
  },
  {
    id: '10',
    question: '¿Necesito seguro de viaje?',
    answer: 'SÍ, es obligatorio tener seguro de viaje que cubra: actividades de aventura, asistencia médica, evacuación de emergencia y cancelación de viaje. Podemos recomendarte opciones de seguros especializados en aventura.',
    category: 'safety'
  },
  {
    id: '11',
    question: '¿Cuál es la mejor época para cada destino?',
    answer: 'Cada expedición tiene su temporada óptima. Patagonia: Oct-Mar. Amazonas: May-Oct (temporada seca). Alta montaña (Orizaba, Cotopaxi): Nov-Mar. Salar de Uyuni: Abr-Oct para piso seco, Ene-Mar para efecto espejo. Consulta cada expedición para detalles.',
    category: 'preparation'
  },
  {
    id: '12',
    question: '¿Cómo me preparo físicamente?',
    answer: 'Te enviamos un plan de entrenamiento personalizado al reservar. En general: expediciones Fáciles requieren caminar 3-5 horas/día, Moderadas 5-7 horas, Desafiantes 7-9 horas con desnivel, Extremas requieren entrenamiento de alta montaña previo.',
    category: 'preparation'
  }
];

export const getFAQsByCategory = (category: FAQ['category']): FAQ[] => {
  return faqs.filter(faq => faq.category === category);
};
