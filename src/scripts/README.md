# Test de Conectividad de Base de Datos Supabase

Este script prueba la conexión con Supabase creando 10 clientes ficticios y navegando por la base de datos para verificar que todo funciona correctamente.

## 🎯 Propósito

- Verificar la conectividad con Supabase
- Crear 10 clientes ficticios con datos realistas
- Probar operaciones CRUD (Crear, Leer, Actualizar)
- Validar filtros y búsquedas
- Generar un reporte completo de las operaciones

## 📋 Pre-requisitos

1. Tener una cuenta de Supabase activa
2. Tener un proyecto de Supabase creado
3. Tener las credenciales de conexión (URL y Anon Key)

## 🛠️ Configuración

### 1. Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto (si no existe) con tus credenciales de Supabase:

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

### 2. Aplicar migraciones

Asegúrate de que la tabla `leads` existe en tu base de datos. Puedes aplicar las migraciones en Supabase:

1. Ve a tu proyecto en Supabase
2. Navega a SQL Editor
3. Ejecuta el contenido del archivo `supabase/migrations/20240102000000_create_leads_table.sql`

O si tienes Supabase CLI instalado:

```bash
npx supabase db push
```

## 🚀 Ejecución

### Opción 1: Con npm (Recomendado)

```bash
npm run test:db
```

### Opción 2: Con Node directamente

```bash
node src/scripts/testDatabaseConnection.mjs
```

## 📊 Qué hace el script

El script ejecuta las siguientes operaciones en orden:

1. **Verificar conexión** - Comprueba que Supabase esté accesible
2. **Limpiar datos previos** - Elimina datos de pruebas anteriores
3. **Insertar 10 clientes** - Crea 10 registros de clientes ficticios
4. **Consultar todos los leads** - Lee todos los registros de la tabla
5. **Filtrar por status** - Muestra cantidad de leads por cada status
6. **Agrupar por destino** - Muestra los destinos más populares
7. **Actualizar un lead** - Cambia el status de un cliente
8. **Buscar por email** - Busca un cliente específico por email
9. **Mostrar resumen** - Presenta un resumen de todas las operaciones
10. **Mostrar tabla** - Imprime una tabla formateada con los clientes

## 🧪 Clientes Ficticios

El script crea 10 clientes con datos variados:

| Cliente | Destino | Budget | Status |
|---------|---------|--------|--------|
| María González | Yosemite National Park | $1500-2000 | new |
| Carlos Ramírez | Sequoia National Park | $2000-3000 | contacted |
| Ana Martínez | Death Valley | $1000-1500 | planning |
| Roberto Silva | Grand Canyon | $3000-4000 | new |
| Laura Hernández | Joshua Tree | $800-1200 | contacted |
| Diego Torres | Zion National Park | $2500-3500 | planning |
| Sofía Méndez | Big Sur | $2000-2500 | new |
| Miguel Vargas | Lake Tahoe | $1800-2200 | contacted |
| Gabriela Ortiz | Mammoth Lakes | $1500-2000 | planning |
| Fernando Castillo | San Diego Beaches | $500-800 | new |

## ✅ Salida Esperada

Si todo funciona correctamente, verás:

```
🚀 INICIANDO PRUEBA DE CONECTIVIDAD CON SUPABASE
============================================================

📡 1. Verificando conexión con Supabase...
✅ Conexión exitosa con Supabase

📝 3. Insertando 10 clientes ficticios...
✅ 10 clientes insertados exitosamente

📊 4. Consultando todos los leads...
✅ Total de leads en la base de datos: 10

🔍 5. Navegando por diferentes filtros...
  📌 Status "new": 4 leads
  📌 Status "contacted": 3 leads
  📌 Status "planning": 3 leads

...

🎉 Todas las operaciones de base de datos funcionan correctamente!
```

## ❌ Solución de Problemas

### Error: Variables de entorno no configuradas

```
❌ Error: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY deben estar configuradas
```

**Solución:** Asegúrate de crear el archivo `.env` con tus credenciales.

### Error: Tabla 'leads' no existe

```
❌ Error de conexión: relation "public.leads" does not exist
```

**Solución:** Ejecuta la migración `20240102000000_create_leads_table.sql` en Supabase SQL Editor.

### Error: Permission denied

```
❌ Error al insertar clientes: permission denied for table leads
```

**Solución:** Verifica que las políticas RLS (Row Level Security) estén configuradas correctamente en Supabase.

## 🔐 Seguridad

- Este script usa credenciales públicas (Anon Key) que son seguras para el frontend
- Los clientes ficticios usan emails de prueba que no existen
- Los datos pueden ser eliminados sin afectar datos reales

## 📝 Notas

- Los clientes ficticios se eliminan automáticamente en cada ejecución
- El script NO afecta otros datos en la base de datos
- Puedes ejecutar el script múltiples veces sin problemas

## 🤝 Soporte

Si tienes problemas, verifica:
1. Credenciales de Supabase correctas
2. Proyecto de Supabase activo
3. Tabla `leads` creada correctamente
4. Políticas RLS configuradas
