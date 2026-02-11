# Guía de Implementación - Landing Page de Expediciones

## 📋 Resumen

Esta guía documenta la transformación de la plataforma Nomadería en una landing page profesional para vender expediciones de aventura en Latinoamérica, dirigida a digital nomads de 25-50 años.

## 🎯 Características Implementadas

### 1. **Landing Page Completa**
   - ✅ Hero Section profesional
   - ✅ Catálogo de 8 expediciones (USD 800-2000)
   - ✅ Sección "Por Qué Nosotros" 
   - ✅ Testimonios de clientes
   - ✅ FAQ con filtros por categoría
   - ✅ CTA Section final

### 2. **Integraciones de Terceros**
   - ✅ **Calendly**: Modal para agendar llamadas
   - ✅ **Mailchimp**: Captura de emails para newsletter
   - ✅ **Stripe**: Links de pago para reservas

### 3. **Expediciones Incluidas**

| Expedición | País | Duración | Precio | Dificultad |
|------------|------|----------|--------|------------|
| Patagonia W Trek | Chile | 5 días | $1,850 | Desafiante |
| Salar de Uyuni | Bolivia | 4 días | $1,200 | Moderada |
| Pico de Orizaba | México | 3 días | $950 | Extrema |
| Inmersión Amazonas | Perú | 6 días | $1,650 | Moderada |
| Costa Rica Multideporte | Costa Rica | 7 días | $1,950 | Moderada |
| Desierto de Atacama | Chile | 5 días | $1,400 | Moderada |
| Ciudad Perdida Trek | Colombia | 5 días | $800 | Desafiante |
| Volcán Cotopaxi | Ecuador | 3 días | $850 | Desafiante |

## 📁 Estructura de Archivos Creados

### Componentes de Landing
```
src/
├── components/landing/
│   ├── HeroSection.tsx              # Hero principal con CTAs
│   ├── ExpeditionsSection.tsx       # Catálogo de expediciones con filtros
│   ├── WhyUsSection.tsx            # 6 razones para elegirnos + stats
│   ├── TestimonialsSection.tsx     # 6 testimonios de clientes
│   ├── FAQSection.tsx              # 12 FAQs organizadas por categoría
│   ├── CTASection.tsx              # Call to action final
│   ├── CalendlyModal.tsx           # Modal de Calendly
│   ├── EmailCaptureModal.tsx       # Modal de suscripción Mailchimp
│   └── ExpeditionDetailModal.tsx   # Modal de detalle de expedición
```

### Datos
```
src/
├── data/landing/
│   ├── expeditions.ts    # 8 expediciones con detalles completos
│   ├── testimonials.ts   # 6 testimonios de clientes
│   └── faqs.ts          # 12 preguntas frecuentes
```

### Páginas
```
src/
├── pages/
│   └── LandingPage.tsx   # Página principal que integra todos los componentes
```

### Base de Datos
```
supabase/
└── migrations/
    └── 20260210_create_newsletter_table.sql  # Tabla para suscriptores
```

## ⚙️ Configuración

### 1. Variables de Entorno

Actualiza tu archivo `.env` con las siguientes variables:

```env
# Supabase (ya existente)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Calendly
VITE_CALENDLY_URL=https://calendly.com/your-username/30min

# Mailchimp
VITE_MAILCHIMP_FORM_URL=https://your-domain.us1.list-manage.com/subscribe/post?u=xxx&id=xxx

# Stripe
VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/your-payment-link
```

### 2. Configurar Calendly

1. Crea una cuenta en [Calendly](https://calendly.com)
2. Configura un evento de 30 minutos
3. Personaliza:
   - Nombre: "Consulta Gratuita de Aventura"
   - Duración: 30 minutos
   - Disponibilidad según tu horario
4. Copia la URL del evento y agrégala a `.env`

### 3. Configurar Mailchimp

1. Crea una cuenta en [Mailchimp](https://mailchimp.com)
2. Crea una lista de suscriptores
3. Ve a "Audience" → "Signup forms" → "Embedded forms"
4. Copia la URL del form action
5. Agrégala a `.env` como `VITE_MAILCHIMP_FORM_URL`

### 4. Configurar Stripe

#### Opción A: Payment Links (Recomendado - Más Simple)

1. Crea una cuenta en [Stripe](https://stripe.com)
2. Ve a "Products" → "Add Product"
3. Crea productos para tus expediciones:
   - Nombre: "Depósito Expedición [Nombre]"
   - Precio: 30% del precio total (ej: $555 para Patagonia)
4. Crea un Payment Link para cada producto
5. Agrega el link principal a `.env`

#### Opción B: Checkout personalizado (Más complejo)

Si necesitas más control, puedes implementar Stripe Checkout:
```bash
npm install @stripe/stripe-js
```

### 5. Ejecutar Migración de Base de Datos

En tu proyecto de Supabase:

1. Ve al SQL Editor
2. Copia el contenido de `supabase/migrations/20260210_create_newsletter_table.sql`
3. Ejecuta el script
4. Verifica que la tabla `newsletter_subscribers` se creó correctamente

## 🚀 Uso

### Rutas de la Aplicación

- `/` - Nueva landing page profesional
- `/old-home` - Home page anterior (backup)
- `/servicios` - Página de servicios
- `/admin` - Panel administrativo
- `/blog/:slug` - Posts del blog

### Navegación del Usuario

1. **Usuario llega a landing** → Ve hero con CTAs
2. **Scroll o click "Ver Expediciones"** → Ve catálogo de expediciones
3. **Filtra por dificultad** → Encuentra expedición ideal
4. **Click en expedición** → Modal con detalles completos
5. **Opciones:**
   - **Reservar Ahora** → Stripe payment link (depósito 30%)
   - **Consultar** → Calendly modal para agendar llamada
6. **Newsletter signup** → Mailchimp modal en CTA section

## 📊 Métricas y Conversión

### Eventos a Trackear

Para implementar tracking (Google Analytics, Facebook Pixel, etc.):

```typescript
// En cada acción importante:
- Click en "Ver Expediciones"
- Filtro de expediciones aplicado
- Modal de expedición abierto
- Click en "Reservar Ahora"
- Click en "Agendar Llamada"
- Newsletter signup completado
```

### Puntos de Conversión

1. **Newsletter Signup** (Soft conversion)
2. **Calendly Booking** (Medium conversion)
3. **Stripe Payment** (Hard conversion)

## 🎨 Personalización

### Colores

El diseño usa la paleta de colores existente de Nomadería:

```css
Primary: #E8744F (Coral/Naranja)
Dark: #0A2540 (Azul oscuro)
Background: #FFFFFF y gradientes
```

### Imágenes

Debes agregar imágenes reales en:

```
public/images/
├── hero/
│   └── main.jpg           # Hero background (1920x1080)
├── expeditions/
│   ├── patagonia.jpg      # (800x600)
│   ├── uyuni.jpg
│   ├── orizaba.jpg
│   ├── amazon.jpg
│   ├── costa-rica.jpg
│   ├── atacama.jpg
│   ├── lost-city.jpg
│   └── cotopaxi.jpg
└── testimonials/
    ├── sarah.jpg          # (400x400)
    ├── marco.jpg
    ├── julia.jpg
    ├── carlos.jpg
    ├── amanda.jpg
    └── diego.jpg
```

### Texto y Copy

Todos los textos están en español y pueden editarse en:
- `src/data/landing/expeditions.ts` - Expediciones
- `src/data/landing/testimonials.ts` - Testimonios
- `src/data/landing/faqs.ts` - FAQs
- Componentes individuales para secciones específicas

## 🔒 Seguridad

### RLS Policies

La tabla `newsletter_subscribers` tiene políticas de seguridad:
- Público puede insertar (suscribirse)
- Solo usuarios autenticados pueden ver todos los suscriptores

### Validación

- Emails validados en frontend y backend
- Prevención de duplicados en tabla
- Sanitización de inputs

## 📱 Responsive Design

Todos los componentes son completamente responsive:
- Mobile first approach
- Breakpoints: sm, md, lg, xl
- Probado en mobile, tablet, desktop

## ⚡ Performance

### Optimizaciones Implementadas

- Lazy loading de componentes
- Code splitting automático (Vite)
- Imágenes con lazy loading
- Animaciones optimizadas con Framer Motion
- React.memo donde apropiado

## 🐛 Troubleshooting

### Problema: Modal de Calendly no se muestra

**Solución**: Verifica que `VITE_CALENDLY_URL` está configurado correctamente en `.env`

### Problema: Newsletter signup falla

**Solución**: 
1. Verifica `VITE_MAILCHIMP_FORM_URL` en `.env`
2. Verifica que la tabla `newsletter_subscribers` existe
3. Revisa la consola para errores de Supabase

### Problema: Stripe payment link no funciona

**Solución**: Verifica que el link de Stripe está activo y configurado correctamente

## 📈 Próximos Pasos

### Mejoras Recomendadas

1. **Analytics**
   - Implementar Google Analytics 4
   - Facebook Pixel para remarketing
   - Hotjar para heat maps

2. **SEO**
   - Meta tags optimizados
   - Schema.org markup para expediciones
   - Sitemap XML

3. **Marketing**
   - Automatización de emails con Mailchimp
   - Secuencia de nurturing
   - Remarketing ads

4. **Funcionalidad**
   - Sistema de reviews
   - Calendario de disponibilidad
   - Multi-idioma (inglés/español)
   - Blog de aventuras

5. **Conversión**
   - A/B testing de CTAs
   - Exit-intent popups
   - Urgency indicators (plazas disponibles)

## 📞 Soporte

Para preguntas o problemas:
1. Revisa esta documentación
2. Revisa los comentarios en el código
3. Consulta la documentación de:
   - [React Calendly](https://www.npmjs.com/package/react-calendly)
   - [Mailchimp API](https://mailchimp.com/developer/)
   - [Stripe Payment Links](https://stripe.com/docs/payment-links)

---

**Creado por**: GitHub Copilot Agent
**Fecha**: Febrero 2026
**Versión**: 1.0
