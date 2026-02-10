# Setup de Integraciones - Landing Page Nomadería

Esta guía te llevará paso a paso por la configuración de las 3 integraciones principales: **Calendly**, **Mailchimp** y **Stripe**.

## 📋 Pre-requisitos

- Acceso al repositorio y archivo `.env`
- Acceso a Supabase (ya configurado)
- Tarjeta de crédito para Stripe (aunque no se cobre)

## ⏱️ Tiempo Total Estimado: 45 minutos

---

## 1️⃣ Calendly (15 minutos)

### ¿Qué es Calendly?
Herramienta para agendar llamadas automáticamente, sin emails de ida y vuelta.

### Paso a Paso

#### 1.1 Crear Cuenta
1. Ve a [calendly.com](https://calendly.com)
2. Click en "Sign Up"
3. Usa tu email profesional (ej: `hola@nomaderia.com`)
4. Plan **Free** es suficiente para empezar

#### 1.2 Configurar Evento
1. En el dashboard, click en "Create Event"
2. Selecciona "One-on-One"
3. **Configuración básica**:
   - **Event name**: "Consulta Gratuita de Aventura"
   - **Duration**: 30 minutos
   - **Location**: Google Meet (o Zoom)
   
4. **Personalización**:
   - **Event color**: Naranja (#E8744F)
   - **Description**: 
     ```
     Conversaremos sobre tus planes de aventura y cómo podemos 
     ayudarte a hacerlos realidad. Sin compromiso.
     
     En esta llamada:
     - Entenderemos tu perfil de viajero
     - Recomendaremos expediciones ideales
     - Resolveremos todas tus dudas
     - Explicaremos el proceso de reserva
     ```

5. **Disponibilidad**:
   - Configura tus horas disponibles
   - Recomendado: Lun-Vie 9AM-6PM (tu zona horaria)
   - Buffer time: 15 min entre llamadas

6. **Preguntas** (Invitee Questions):
   - Nombre ✅
   - Email ✅
   - Agregar: "¿Qué expedición te interesa?" (text)
   - Agregar: "¿Nivel de experiencia?" (select: Principiante, Intermedio, Avanzado)

#### 1.3 Copiar URL
1. Click en "Copy Link" de tu evento
2. La URL será algo como: `https://calendly.com/nomaderia/consulta-aventura`

#### 1.4 Agregar a .env
```env
VITE_CALENDLY_URL=https://calendly.com/nomaderia/consulta-aventura
```

#### 1.5 Notificaciones (Opcional pero recomendado)
1. Settings → Notifications
2. Activa confirmaciones automáticas por email
3. Activa recordatorios 24h y 1h antes

✅ **Test**: Abre tu landing page y prueba agendar una llamada

---

## 2️⃣ Mailchimp (15 minutos)

### ¿Qué es Mailchimp?
Plataforma de email marketing para gestionar suscriptores y enviar newsletters.

### Paso a Paso

#### 2.1 Crear Cuenta
1. Ve a [mailchimp.com](https://mailchimp.com)
2. Click en "Sign Up Free"
3. Plan **Free**: hasta 500 contactos (suficiente para empezar)
4. Completa el perfil de tu negocio

#### 2.2 Crear Audience
1. En el menú, ve a "Audience"
2. Click en "Create Audience"
3. **Configuración**:
   - **Audience name**: "Nomadería Newsletter"
   - **Default from email**: `hola@nomaderia.com`
   - **Default from name**: "Nomadería"
   - **Remind people**: "Recibiste este email porque te suscribiste en nomaderia.com"

#### 2.3 Configurar Form
1. Audience → Signup forms → Embedded forms
2. En el código HTML que aparece, busca la línea que dice `<form action="`
3. Copia SOLO la URL del action (ejemplo):
   ```
   https://nomaderia.us21.list-manage.com/subscribe/post?u=abc123&id=def456
   ```

#### 2.4 Personalizar Campos
1. Audience → Settings → Audience fields and *|MERGE|* tags
2. Asegúrate que existan:
   - EMAIL (obligatorio - ya existe)
   - FNAME (First Name - agrega si no existe)

#### 2.5 Agregar a .env
```env
VITE_MAILCHIMP_FORM_URL=https://nomaderia.us21.list-manage.com/subscribe/post?u=abc123&id=def456
```

#### 2.6 Configurar Bienvenida (Opcional)
1. Campaigns → Create Campaign → Automated
2. Selecciona "Welcome new subscribers"
3. Crea email de bienvenida:
   - **Subject**: "¡Bienvenido a la comunidad Nomadería! 🏔️"
   - **Content**: Presenta la marca, comparte primer tip de viaje

✅ **Test**: Suscríbete desde tu landing page con un email de prueba

---

## 3️⃣ Stripe (15 minutos)

### ¿Qué es Stripe?
Plataforma de pagos online. Usaremos Payment Links (sin código).

### Paso a Paso

#### 3.1 Crear Cuenta
1. Ve a [stripe.com](https://stripe.com)
2. Click en "Start now"
3. Completa información de tu negocio
4. **Importante**: Activa tu cuenta (sube documentos requeridos)
5. Mientras esperas activación, usa "Test Mode"

#### 3.2 Crear Productos
1. Products → Add product
2. Para cada expedición, crea un producto con **30% del precio**:

**Ejemplo: Patagonia W Trek ($1,850)**
- **Name**: "Depósito - Patagonia W Trek"
- **Description**: "Depósito del 30% para reservar tu lugar en Patagonia W Trek"
- **Price**: $555 USD (30% de $1,850)
- **Type**: One-time
- **Tax code**: Services

Repite para las 8 expediciones:
| Expedición | Precio Total | Depósito 30% |
|------------|-------------|--------------|
| Patagonia | $1,850 | $555 |
| Uyuni | $1,200 | $360 |
| Orizaba | $950 | $285 |
| Amazonas | $1,650 | $495 |
| Costa Rica | $1,950 | $585 |
| Atacama | $1,400 | $420 |
| Ciudad Perdida | $800 | $240 |
| Cotopaxi | $850 | $255 |

#### 3.3 Crear Payment Links
1. Para cada producto, click en los 3 puntos → "Create payment link"
2. **Configuración**:
   - **Quantity**: Fixed (1)
   - **Success message**: "¡Reserva confirmada! Te enviaremos un email con los próximos pasos."
   - **Collect customer info**: Email + Name
   - **Custom message**: 
     ```
     Al pagar el depósito, reservas tu lugar en esta expedición.
     El saldo restante se paga 30 días antes de la salida.
     Recibirás un email de confirmación con toda la información.
     ```

3. Click en "Create link"
4. Copia el link generado

#### 3.4 Actualizar Expediciones
Abre `src/data/landing/expeditions.ts` y agrega los payment links:

```typescript
{
  id: 'patagonia-w-trek',
  name: 'Patagonia W Trek',
  // ... otros campos
  stripePaymentLink: 'https://buy.stripe.com/test_abc123' // <-- Agregar aquí
}
```

#### 3.5 Agregar Link General a .env
```env
VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/test_abc123
```
(Este es el link por defecto si una expedición no tiene link específico)

#### 3.6 Configurar Webhooks (Avanzado - Opcional)
Para recibir notificaciones de pagos en Supabase:

1. Developers → Webhooks → Add endpoint
2. **Endpoint URL**: Tu endpoint (ej: `https://tu-api.com/webhook/stripe`)
3. **Events**: 
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Implementar endpoint que guarde en Supabase

✅ **Test**: 
1. En modo Test, usa tarjeta de prueba: `4242 4242 4242 4242`
2. Fecha: cualquier futura
3. CVC: cualquier 3 dígitos
4. Click en "Reservar Ahora" en una expedición

---

## 4️⃣ Verificación Final

### Checklist de Testing

```
✅ Calendly
  [ ] Modal se abre al click en "Agendar Llamada"
  [ ] Puedo seleccionar fecha y hora
  [ ] Recibo email de confirmación
  [ ] Se ve con los colores de Nomadería

✅ Mailchimp
  [ ] Modal se abre al click en newsletter signup
  [ ] Puedo ingresar nombre y email
  [ ] Recibo mensaje de éxito
  [ ] Email aparece en Mailchimp Audience
  [ ] Recibo email de bienvenida (si configuraste)

✅ Stripe
  [ ] Modal de expedición muestra precio correcto
  [ ] Click en "Reservar Ahora" abre Stripe
  [ ] Puedo hacer pago de prueba (test mode)
  [ ] Recibo confirmación en pantalla
  [ ] Pago aparece en Stripe Dashboard
```

---

## 🔧 Troubleshooting

### Problema: Calendly no se muestra
**Solución**:
- Verifica que `VITE_CALENDLY_URL` está en `.env`
- Reinicia el servidor de desarrollo
- Verifica que la URL no tiene espacios

### Problema: Mailchimp da error "CORS"
**Solución**:
- Esto es normal con `mode: 'no-cors'`
- El email SÍ se guarda en Mailchimp
- Verifica en tu Audience

### Problema: Stripe link no funciona
**Solución**:
- Asegúrate de estar en Test Mode mientras pruebas
- Verifica que el link comienza con `https://buy.stripe.com/`
- Revisa que el producto existe en Stripe

### Problema: Build falla después de agregar links
**Solución**:
```bash
npm run build
# Si hay errores de TypeScript, ignora (son warnings)
```

---

## 📊 Monitoreo y Métricas

### En Calendly
- Dashboard → Analytics
- Métricas: Llamadas agendadas, tasa de cancelación, no-shows

### En Mailchimp
- Reports → Audience growth
- Métricas: Nuevos suscriptores, tasa de apertura, clicks

### En Stripe
- Home → Recent payments
- Métricas: Pagos exitosos, monto total, conversión

---

## 🚀 Ir a Producción

### Cuando estés listo:

1. **Calendly**: Nada que cambiar (ya está en prod)

2. **Mailchimp**: Nada que cambiar (ya está en prod)

3. **Stripe**: 
   - Toggle de "Test Mode" a "Live Mode"
   - Re-crear los Payment Links en modo Live
   - Actualizar `.env` con los nuevos links
   - Completar activación de cuenta Stripe (documentos)

4. **Supabase**:
   - Ejecutar migración de newsletter_subscribers
   - Verificar que RLS policies están activas

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la documentación oficial de cada servicio
2. Verifica la consola del navegador (F12) para errores
3. Prueba en modo incógnito
4. Revisa que todas las variables de entorno están correctas

---

## ✅ Checklist de Lanzamiento

```
Pre-lanzamiento:
[ ] Calendly configurado y testeado
[ ] Mailchimp configurado y testeado
[ ] Stripe configurado y testeado
[ ] Todas las variables de entorno en producción
[ ] Imágenes reales agregadas
[ ] Textos revisados (typos, gramática)
[ ] Migración de Supabase ejecutada
[ ] Probado en mobile, tablet, desktop
[ ] Analytics configurado (GA4, etc.)

Post-lanzamiento:
[ ] Monitorear primeros signups de newsletter
[ ] Revisar primeras llamadas agendadas
[ ] Verificar primeros pagos
[ ] Ajustar según feedback de usuarios
```

---

**¡Estás listo para recibir tus primeros clientes aventureros!** 🎉🏔️

Para más información, consulta:
- **LANDING_PAGE_GUIDE.md** - Guía técnica
- **IMPLEMENTATION_STRATEGY.md** - Estrategia completa
