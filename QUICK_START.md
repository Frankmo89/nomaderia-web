# 🚀 Quick Start: Prueba Completa del Sistema Nomadería

Esta guía rápida te llevará paso a paso para probar todo el sistema de base de datos de Nomadería con 10 clientes ficticios.

## ⏱️ Tiempo estimado: 10 minutos

---

## 📋 Checklist Rápido

```
[ ] 1. Configurar Supabase (2 min)
[ ] 2. Ejecutar migración (1 min)
[ ] 3. Configurar .env (1 min)
[ ] 4. Ejecutar script de prueba (1 min)
[ ] 5. Ver datos en admin panel (5 min)
```

---

## 🎯 Paso a Paso

### 1️⃣ Configurar Supabase (2 minutos)

**a) Crear proyecto en Supabase:**
- Ve a [supabase.com](https://supabase.com)
- Crea una cuenta o inicia sesión
- Crea un nuevo proyecto
- Espera a que se inicialice (~2 minutos)

**b) Obtener credenciales:**
- Ve a **Settings** → **API**
- Copia el **Project URL**
- Copia el **anon/public key**

---

### 2️⃣ Ejecutar Migración (1 minuto)

**a) Ir a SQL Editor:**
- En tu proyecto de Supabase
- Ve a **SQL Editor** en el menú lateral

**b) Crear la tabla:**
- Crea una nueva query
- Copia y pega el contenido de:
  ```
  supabase/migrations/20240102000000_create_leads_table.sql
  ```
- Haz clic en **RUN** o presiona `Ctrl + Enter`
- ✅ Deberías ver: "Success. No rows returned"

**c) Verificar:**
- Ve a **Table Editor**
- Deberías ver la tabla `leads` creada (vacía por ahora)

---

### 3️⃣ Configurar .env (1 minuto)

**a) Crear archivo .env:**
```bash
# En la raíz del proyecto
touch .env
```

**b) Agregar credenciales:**
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

Reemplaza con tus credenciales del paso 1.

---

### 4️⃣ Ejecutar Script de Prueba (1 minuto)

**a) Instalar dependencias (si no lo has hecho):**
```bash
npm install
```

**b) Ejecutar el script:**
```bash
npm run test:db
```

**c) Verificar salida:**

Deberías ver algo como:

```
🚀 INICIANDO PRUEBA DE CONECTIVIDAD CON SUPABASE
============================================================

📡 1. Verificando conexión con Supabase...
✅ Conexión exitosa con Supabase

📝 3. Insertando 10 clientes ficticios...
✅ 10 clientes insertados exitosamente

...

🎉 Todas las operaciones de base de datos funcionan correctamente!

📋 TABLA DE CLIENTES FICTICIOS INSERTADOS:
┌─────┬─────────────────────┬────────────────────────┬──────────────┬─────────────┐
│ No. │ Nombre              │ Destino                │ Presupuesto  │ Status      │
├─────┼─────────────────────┼────────────────────────┼──────────────┼─────────────┤
│   1 │ María González      │ Yosemite National Park │ $1500-2000   │ contacted   │
...
```

✅ Si ves esto, ¡la base de datos funciona perfectamente!

---

### 5️⃣ Ver Datos en Admin Panel (5 minutos)

**a) Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

**b) Abrir el navegador:**
- Ve a `http://localhost:5173`
- O la URL que te muestre Vite

**c) Acceder al panel admin:**
- Ve a `http://localhost:5173/admin`
- Verás la pantalla de login

**d) Iniciar sesión:**
- Contraseña: `nomaderia2025`
- Presiona "Acceder al Panel"

**e) Ver los clientes:**
- Ya estarás en la sección "Leads"
- Deberías ver los 10 clientes ficticios
- Verás estadísticas en la parte superior:
  - Total: 10
  - Nuevos: 4
  - En Plan: 3
  - Éxito: 0

**f) Explorar funcionalidades:**

1. **Ver detalles de un cliente:**
   - Busca "María González"
   - Verás su email, teléfono, destino, presupuesto, etc.

2. **Cambiar status:**
   - Haz clic en "Contactado" para cualquier cliente
   - El status se actualizará inmediatamente

3. **Filtrar:**
   - Usa los filtros en la parte superior
   - Cambia entre "Todos", "Nuevos", "En Plan"

4. **Verificar persistencia:**
   - Recarga la página (F5)
   - Los cambios que hiciste deberían persistir

---

## ✅ Verificación Final

### Checklist de Éxito

Marca cada item si funciona correctamente:

```
[ ] Script ejecutado sin errores
[ ] 10 clientes insertados en la base de datos
[ ] Panel admin carga correctamente
[ ] Puedo ver los 10 clientes en el panel
[ ] Estadísticas muestran números correctos
[ ] Puedo cambiar el status de un cliente
[ ] Los cambios persisten después de recargar
[ ] No hay errores en la consola del navegador
```

Si todos están marcados: **¡Felicidades! 🎉**

Todo el sistema de base de datos está funcionando correctamente.

---

## 🎯 Los 10 Clientes Ficticios

Para referencia rápida, estos son los clientes que deberías ver:

| # | Nombre | Destino | Budget |
|---|--------|---------|--------|
| 1 | María González | Yosemite | $1500-2000 |
| 2 | Carlos Ramírez | Sequoia | $2000-3000 |
| 3 | Ana Martínez | Death Valley | $1000-1500 |
| 4 | Roberto Silva | Grand Canyon | $3000-4000 |
| 5 | Laura Hernández | Joshua Tree | $800-1200 |
| 6 | Diego Torres | Zion | $2500-3500 |
| 7 | Sofía Méndez | Big Sur | $2000-2500 |
| 8 | Miguel Vargas | Lake Tahoe | $1800-2200 |
| 9 | Gabriela Ortiz | Mammoth Lakes | $1500-2000 |
| 10 | Fernando Castillo | San Diego | $500-800 |

---

## 🔍 Verificación en Supabase Dashboard

También puedes verificar directamente en Supabase:

1. Ve a [supabase.com](https://supabase.com)
2. Abre tu proyecto
3. Ve a **Table Editor**
4. Selecciona la tabla `leads`
5. Deberías ver los 10 registros

---

## ❌ Solución de Problemas

### Problema: Script falla con error de credenciales

**Solución:**
- Verifica que el archivo `.env` existe
- Verifica que las credenciales son correctas
- Asegúrate de no tener espacios alrededor del `=`

### Problema: Tabla no existe

**Solución:**
- Ejecuta nuevamente la migración SQL en Supabase
- Verifica en Table Editor que la tabla `leads` existe

### Problema: Panel admin no muestra datos

**Solución:**
- Verifica que ejecutaste el script correctamente
- Verifica en Supabase Table Editor que los datos existen
- Abre la consola del navegador (F12) y busca errores

### Problema: No puedo iniciar sesión en admin

**Solución:**
- La contraseña es exactamente: `nomaderia2025`
- No requiere email, solo contraseña

---

## 📚 Documentación Adicional

Para más detalles, consulta:

- **PRUEBA_BASE_DE_DATOS.md** - Documentación completa del sistema de pruebas
- **GUIA_NAVEGACION_ADMIN.md** - Guía detallada del panel admin
- **src/scripts/README.md** - Documentación del script de prueba

---

## 🎉 ¡Listo!

Si llegaste hasta aquí y todo funciona, has completado exitosamente:

✅ Verificación de conectividad con Supabase  
✅ Creación de estructura de base de datos  
✅ Inserción de 10 clientes ficticios  
✅ Navegación por el sistema completo  
✅ Prueba de operaciones CRUD  
✅ Validación de persistencia de datos  

**El sistema está 100% operativo y listo para usar con datos reales.** 🚀

---

## 🤝 Soporte

Si tienes problemas:

1. Revisa la documentación completa en **PRUEBA_BASE_DE_DATOS.md**
2. Verifica los logs del script
3. Revisa la consola del navegador (F12)
4. Verifica directamente en Supabase Dashboard

---

**Nomadería** - Tu Arquitecto de Aventuras 🏔️
