# 🔧 Configuración de Nomadería Web

## Variables de Entorno

Este proyecto requiere las siguientes variables de entorno para funcionar correctamente.

### 📝 Configuración Local (Desarrollo)

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` y agrega tus credenciales:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://xikdlrujkfzhhrttwmug.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_sa4ttdvAhKoCD0haH6o4oA_XHU1p2bd
   
   # Resend Email Service
   VITE_RESEND_API_KEY=re_8mtW19Q1_DwkNJfH9CCkTY37iELMDsGsM
   ```

3. Reinicia el servidor de desarrollo:
   ```bash
   pnpm run dev
   ```

---

### 🚀 Configuración en Producción

#### Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega cada variable:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_RESEND_API_KEY`

#### Netlify

1. Ve a tu sitio en Netlify Dashboard
2. Site settings → Environment variables
3. Agrega cada variable con su valor

#### Otros Servicios

Consulta la documentación de tu servicio de hosting para agregar variables de entorno.

---

## 🔐 Seguridad

**⚠️ IMPORTANTE:**

- **NUNCA** subas el archivo `.env` a GitHub
- **NUNCA** compartas tus API keys públicamente
- El archivo `.env` está en `.gitignore` por seguridad
- Usa `.env.example` como plantilla (sin valores reales)

---

## 📧 Resend Email Service

### Obtener API Key

1. Crea cuenta en https://resend.com
2. Ve a "API Keys" en el dashboard
3. Crea una nueva API key
4. Copia la key (empieza con `re_...`)
5. Agrégala a tu `.env` como `VITE_RESEND_API_KEY`

### Configurar Dominio Personalizado (Opcional)

Para que los emails se envíen desde `hola@nomaderia.travel` en lugar de `onboarding@resend.dev`:

1. Ve a "Domains" en Resend
2. Agrega tu dominio: `nomaderia.travel`
3. Configura los registros DNS según las instrucciones
4. Verifica el dominio
5. Actualiza el código en `src/lib/emailService.ts`:
   ```typescript
   from: 'Nomadería <hola@nomaderia.travel>'
   ```

---

## 🗄️ Supabase Database

### Credenciales

Las credenciales de Supabase ya están configuradas en el `.env`:

- **Project ID:** xikdlrujkfzhhrttwmug
- **URL:** https://xikdlrujkfzhhrttwmug.supabase.co
- **Anon Key:** sb_publishable_sa4ttdvAhKoCD0haH6o4oA_XHU1p2bd

### Tablas Creadas

- `leads` - Leads capturados del formulario
- `hikes` - Información de rutas de senderismo
- `accommodations` - Opciones de alojamiento
- `itineraries` - Itinerarios generados

---

## 🔑 Admin Panel

**URL:** https://nomaderia.travel/admin  
**Password:** nomaderia2025

Para cambiar la contraseña, edita `src/components/AdminLogin.tsx`.

---

## 📱 WhatsApp Widget

**Número configurado:** +1 858 899 6802

Para cambiar el número, edita `src/components/WhatsAppWidget.tsx`.

---

## 🧪 Probar Emails Localmente

Ejecuta el script de prueba:

```bash
node test-email.js
```

Esto enviará emails de prueba a `nomaderia.travel@gmail.com`.

---

## 🆘 Soporte

Si tienes problemas con la configuración:

1. Verifica que todas las variables de entorno estén configuradas
2. Reinicia el servidor de desarrollo
3. Revisa la consola del navegador para errores
4. Verifica que las credenciales sean correctas

---

**Última actualización:** 7 de enero de 2026
