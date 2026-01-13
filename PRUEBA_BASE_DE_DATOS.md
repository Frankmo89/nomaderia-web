# Prueba de Conectividad de Base de Datos - Nomadería

## 📋 Resumen

Este documento describe el sistema de pruebas implementado para verificar la conectividad con Supabase y poblar la base de datos con 10 clientes ficticios.

## 🎯 Objetivo

El objetivo de esta prueba es:
1. ✅ Verificar que la conexión con Supabase funciona correctamente
2. ✅ Crear la estructura de la tabla `leads` si no existe
3. ✅ Insertar 10 clientes ficticios con datos realistas
4. ✅ Navegar por la base de datos probando diferentes operaciones (SELECT, INSERT, UPDATE, DELETE)
5. ✅ Validar que todas las operaciones CRUD funcionan correctamente

## 📁 Archivos Creados

### 1. Migración de Base de Datos
- **Ubicación:** `supabase/migrations/20240102000000_create_leads_table.sql`
- **Propósito:** Crear la tabla `leads` con todos los campos necesarios
- **Características:**
  - Campos para información de contacto (nombre, email, teléfono)
  - Campos para detalles del viaje (destino, presupuesto, fechas, etc.)
  - Sistema de estados (new, contacted, planning, traveling, completed)
  - Índices para optimizar consultas
  - Row Level Security (RLS) configurado
  - Trigger para actualizar `updated_at` automáticamente

### 2. Script de Prueba (JavaScript/ESM)
- **Ubicación:** `src/scripts/testDatabaseConnection.mjs`
- **Propósito:** Script ejecutable con Node.js para probar la base de datos
- **Características:**
  - No requiere compilación
  - Usa módulos ES6
  - Carga variables de entorno con dotenv
  - Salida colorizada y formateada en consola

### 3. Script de Prueba (TypeScript)
- **Ubicación:** `src/scripts/testDatabaseConnection.ts`
- **Propósito:** Versión TypeScript del script (requiere tsx o compilación)
- **Características:**
  - Type-safety completo
  - Misma funcionalidad que la versión .mjs

### 4. Documentación del Script
- **Ubicación:** `src/scripts/README.md`
- **Propósito:** Guía detallada de uso del script de prueba

## 🚀 Instrucciones de Uso

### Paso 1: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
# En la raíz del proyecto
touch .env
```

Agrega tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

**¿Dónde encuentro estas credenciales?**
1. Ve a [supabase.com](https://supabase.com)
2. Abre tu proyecto
3. Ve a Settings > API
4. Copia la "URL" y la "anon/public" key

### Paso 2: Aplicar Migración en Supabase

Hay dos formas de aplicar la migración:

#### Opción A: Usando Supabase Dashboard (Recomendado para testing)
1. Ve a tu proyecto en Supabase
2. Navega a **SQL Editor**
3. Copia y pega el contenido de `supabase/migrations/20240102000000_create_leads_table.sql`
4. Ejecuta el script

#### Opción B: Usando Supabase CLI (Si ya tienes el CLI configurado)
```bash
npx supabase db push
```

### Paso 3: Ejecutar el Script de Prueba

```bash
# Opción 1: Usando npm script
npm run test:db

# Opción 2: Directamente con Node
node src/scripts/testDatabaseConnection.mjs
```

## 📊 Resultados Esperados

### Salida del Script

Cuando el script se ejecuta correctamente, verás:

```
🚀 INICIANDO PRUEBA DE CONECTIVIDAD CON SUPABASE
============================================================
URL: https://tu-proyecto.supabase.co
Key: eyJhbGc...
============================================================

📡 1. Verificando conexión con Supabase...
✅ Conexión exitosa con Supabase

🧹 2. Limpiando datos de prueba anteriores...
✅ Datos de prueba anteriores eliminados

📝 3. Insertando 10 clientes ficticios...
✅ 10 clientes insertados exitosamente

Clientes creados:
  1. María González - Yosemite National Park (new)
  2. Carlos Ramírez - Sequoia National Park (contacted)
  3. Ana Martínez - Death Valley (planning)
  4. Roberto Silva - Grand Canyon (new)
  5. Laura Hernández - Joshua Tree (contacted)
  6. Diego Torres - Zion National Park (planning)
  7. Sofía Méndez - Big Sur (new)
  8. Miguel Vargas - Lake Tahoe (contacted)
  9. Gabriela Ortiz - Mammoth Lakes (planning)
  10. Fernando Castillo - San Diego Beaches (new)

📊 4. Consultando todos los leads...
✅ Total de leads en la base de datos: 10

🔍 5. Navegando por diferentes filtros...
  📌 Status "new": 4 leads
  📌 Status "contacted": 3 leads
  📌 Status "planning": 3 leads
  📌 Status "traveling": 0 leads
  📌 Status "completed": 0 leads

🗺️  6. Agrupando por destinos populares...
  Destinos más solicitados:
    • Yosemite National Park: 1 cliente(s)
    • Sequoia National Park: 1 cliente(s)
    • Death Valley: 1 cliente(s)
    • Grand Canyon: 1 cliente(s)
    • Joshua Tree: 1 cliente(s)

✏️  7. Probando actualización de lead...
✅ Lead actualizado: María González ahora tiene status "contacted"

🔎 8. Probando búsqueda por email...
✅ Lead encontrado: María González

📈 9. RESUMEN DE LA PRUEBA
============================================================
✅ Conexión a Supabase: EXITOSA
✅ Inserción de datos: EXITOSA (10 registros)
✅ Consulta de datos: EXITOSA (10 registros totales)
✅ Actualización de datos: EXITOSA
✅ Búsqueda de datos: EXITOSA

🎉 Todas las operaciones de base de datos funcionan correctamente!

============================================================

📋 TABLA DE CLIENTES FICTICIOS INSERTADOS:

┌─────┬─────────────────────┬────────────────────────┬──────────────┬─────────────┐
│ No. │ Nombre              │ Destino                │ Presupuesto  │ Status      │
├─────┼─────────────────────┼────────────────────────┼──────────────┼─────────────┤
│   1 │ María González      │ Yosemite National Park │ $1500-2000   │ contacted   │
│   2 │ Carlos Ramírez      │ Sequoia National Park  │ $2000-3000   │ contacted   │
│   3 │ Ana Martínez        │ Death Valley           │ $1000-1500   │ planning    │
│   4 │ Roberto Silva       │ Grand Canyon           │ $3000-4000   │ new         │
│   5 │ Laura Hernández     │ Joshua Tree            │ $800-1200    │ contacted   │
│   6 │ Diego Torres        │ Zion National Park     │ $2500-3500   │ planning    │
│   7 │ Sofía Méndez        │ Big Sur                │ $2000-2500   │ new         │
│   8 │ Miguel Vargas       │ Lake Tahoe             │ $1800-2200   │ contacted   │
│   9 │ Gabriela Ortiz      │ Mammoth Lakes          │ $1500-2000   │ planning    │
│  10 │ Fernando Castillo   │ San Diego Beaches      │ $500-800     │ new         │
└─────┴─────────────────────┴────────────────────────┴──────────────┴─────────────┘

✨ Script finalizado exitosamente
```

### Verificar en Supabase Dashboard

Después de ejecutar el script, puedes verificar los datos en Supabase:

1. Ve a tu proyecto en Supabase
2. Navega a **Table Editor**
3. Selecciona la tabla `leads`
4. Deberías ver los 10 clientes ficticios insertados

## 👥 Clientes Ficticios Creados

El script crea 10 clientes con perfiles diversos:

| # | Nombre | Destino | Budget | Status | Perfil |
|---|--------|---------|--------|--------|--------|
| 1 | María González | Yosemite | $1500-2000 | new | Aventurera, primera vez camping |
| 2 | Carlos Ramírez | Sequoia | $2000-3000 | contacted | Fotógrafo amateur |
| 3 | Ana Martínez | Death Valley | $1000-1500 | planning | Familia con niños |
| 4 | Roberto Silva | Grand Canyon | $3000-4000 | new | Ejecutivo, 3 días |
| 5 | Laura Hernández | Joshua Tree | $800-1200 | contacted | Escaladora boulder |
| 6 | Diego Torres | Zion | $2500-3500 | planning | Senderismo extremo |
| 7 | Sofía Méndez | Big Sur | $2000-2500 | new | Luna de miel |
| 8 | Miguel Vargas | Lake Tahoe | $1800-2200 | contacted | Deportes acuáticos |
| 9 | Gabriela Ortiz | Mammoth Lakes | $1500-2000 | planning | Mochilera experimentada |
| 10 | Fernando Castillo | San Diego | $500-800 | new | Surfista fin de semana |

## 🔍 Operaciones Probadas

El script prueba las siguientes operaciones:

1. **SELECT** - Consultar todos los registros
2. **INSERT** - Insertar 10 registros en lote
3. **UPDATE** - Actualizar el status de un cliente
4. **DELETE** - Limpiar datos de pruebas anteriores
5. **WHERE** - Filtrar por status y email
6. **ORDER BY** - Ordenar por fecha de creación
7. **LIMIT** - Limitar resultados en consultas

## ❌ Solución de Problemas

### Error: Variables de entorno no configuradas

**Síntoma:**
```
❌ Error: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY deben estar configuradas
```

**Solución:**
- Verifica que el archivo `.env` exista en la raíz del proyecto
- Verifica que tenga las variables correctas
- Asegúrate de que no haya espacios alrededor del `=`

### Error: Tabla no existe

**Síntoma:**
```
❌ Error de conexión: relation "public.leads" does not exist
```

**Solución:**
- Ejecuta la migración en Supabase SQL Editor
- Verifica que la tabla se creó en **Table Editor**

### Error: Permission denied

**Síntoma:**
```
❌ Error al insertar clientes: permission denied for table leads
```

**Solución:**
- Verifica que las políticas RLS estén configuradas
- La migración incluye políticas para permitir inserts públicos
- Ejecuta nuevamente el script de migración

## 📝 Notas Importantes

- ✅ Los clientes ficticios usan emails de prueba que no existen
- ✅ El script elimina automáticamente datos de pruebas anteriores
- ✅ Los datos NO afectan otros registros en la base de datos
- ✅ Puedes ejecutar el script múltiples veces sin problemas
- ✅ El script usa la clave pública (anon key) que es segura para frontend

## 🔐 Seguridad

- Las credenciales en `.env` NO deben ser compartidas públicamente
- El archivo `.env` está en `.gitignore` por seguridad
- La anon key permite operaciones públicas seguras
- Las políticas RLS protegen los datos en Supabase

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## ✅ Checklist de Verificación

Antes de ejecutar el script, verifica que:

- [ ] Tienes una cuenta de Supabase activa
- [ ] Creaste un proyecto en Supabase
- [ ] Obtuviste la URL y anon key del proyecto
- [ ] Creaste el archivo `.env` con las credenciales
- [ ] Ejecutaste la migración para crear la tabla `leads`
- [ ] Instalaste las dependencias con `npm install`

## 🎉 Conclusión

Este sistema de pruebas te permite:
- Verificar rápidamente la conectividad con Supabase
- Validar que la estructura de la base de datos es correcta
- Tener datos de prueba para desarrollo
- Navegar y entender cómo funciona la base de datos

¡Todo listo para empezar a trabajar con datos reales! 🚀
