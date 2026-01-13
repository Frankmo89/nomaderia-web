# Guía de Navegación: Admin Panel de Nomadería

## 🎯 Objetivo

Esta guía te muestra cómo navegar por el panel de administración de Nomadería para visualizar los 10 clientes ficticios creados por el script de prueba.

## 📍 Ruta de Acceso

El panel de administración está disponible en:
```
http://localhost:5173/admin
```

(O la URL de tu deployment seguida de `/admin`)

## 🔐 Acceso al Panel

### Paso 1: Iniciar la Aplicación

```bash
# En la raíz del proyecto
npm run dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:5173`

### Paso 2: Navegar al Admin

1. Abre tu navegador
2. Ve a `http://localhost:5173/admin`
3. Verás la pantalla de login del Admin Panel

### Paso 3: Iniciar Sesión

**Credenciales:**
- **Contraseña:** `nomaderia2025`

No se requiere email, solo contraseña.

## 🗺️ Navegación del Panel Admin

### Estructura del Panel

El panel tiene 4 secciones principales:

```
┌─────────────────────────────────────────────┐
│  NOMADERÍA                                  │
│  Admin Panel                                │
├─────────────────────────────────────────────┤
│  👥 Leads          ← Aquí verás clientes   │
│  🗺️  Itinerarios                            │
│  📚 Contenido                               │
│  ⚙️  Configuración                          │
├─────────────────────────────────────────────┤
│  🚪 Cerrar Sesión                           │
└─────────────────────────────────────────────┘
```

### Sección de Leads (Clientes)

Esta es la sección donde verás los 10 clientes ficticios.

#### Estadísticas en la Parte Superior

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│   Total     │   Nuevos    │  En Plan    │    Éxito    │
│     10      │      4      │      3      │      0      │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

- **Total:** Número total de leads en la base de datos
- **Nuevos:** Leads con status "new"
- **En Plan:** Leads con status "planning"
- **Éxito:** Leads con status "completed"

#### Tabla de Leads

Cada lead muestra:

```
┌────────────────────────────────────────────────────┐
│ María González                              [new]  │
│ 📧 maria.gonzalez@email.com                        │
│ 📱 +52 664 123 4567                                │
│ 🗺️  Yosemite National Park                         │
│ 💰 $1500-2000                                       │
│ 🏕️  camping | 💪 moderado                          │
│ 📅 2026-03-15                                       │
│                                                    │
│ [Nuevo] [Contactado] [Planificando] [Viajando]    │
└────────────────────────────────────────────────────┘
```

**Campos visibles:**
- Nombre del cliente
- Email de contacto
- Teléfono/WhatsApp
- Destino solicitado
- Presupuesto
- Tipo de alojamiento y nivel de fitness
- Fechas de viaje
- Botones para cambiar el status

#### Cambiar Status de un Lead

Puedes actualizar el status de cualquier cliente haciendo clic en los botones:
- **Nuevo** → Marca como nuevo lead
- **Contactado** → Marca como contactado
- **Planificando** → Marca como en planificación
- **Viajando** → Marca como viajando actualmente

## 🔍 Cómo Verificar los Clientes Ficticios

### Método 1: En el Panel Admin

1. Inicia sesión en `/admin`
2. Ve a la sección "Leads"
3. Deberías ver los 10 clientes ficticios listados
4. Busca nombres como:
   - María González (Yosemite)
   - Carlos Ramírez (Sequoia)
   - Ana Martínez (Death Valley)
   - Roberto Silva (Grand Canyon)
   - Laura Hernández (Joshua Tree)
   - Diego Torres (Zion)
   - Sofía Méndez (Big Sur)
   - Miguel Vargas (Lake Tahoe)
   - Gabriela Ortiz (Mammoth Lakes)
   - Fernando Castillo (San Diego)

### Método 2: En Supabase Dashboard

1. Ve a [supabase.com](https://supabase.com)
2. Abre tu proyecto
3. Navega a **Table Editor**
4. Selecciona la tabla `leads`
5. Verás todos los registros en formato tabla
6. Puedes filtrar, ordenar y buscar

### Método 3: Usando la Consola del Navegador

1. Abre DevTools (F12)
2. Ve a la pestaña Console
3. Ejecuta:

```javascript
// Ver todos los leads
const { data, error } = await supabase
  .from('leads')
  .select('*')
  .order('created_at', { ascending: false });

console.table(data);
```

## 📊 Vista Detallada de Cada Cliente

### María González
- **Destino:** Yosemite National Park
- **Presupuesto:** $1500-2000
- **Alojamiento:** Camping
- **Nivel:** Moderado
- **Perfil:** Aventurera, le encanta la naturaleza
- **Preocupación:** Primera vez acampando en USA

### Carlos Ramírez
- **Destino:** Sequoia National Park
- **Presupuesto:** $2000-3000
- **Alojamiento:** Hotel
- **Nivel:** Alto
- **Perfil:** Fotógrafo amateur, busca vistas épicas
- **Interés:** Fotografía nocturna

### Ana Martínez
- **Destino:** Death Valley
- **Presupuesto:** $1000-1500
- **Alojamiento:** RV
- **Nivel:** Bajo
- **Perfil:** Familia con niños pequeños
- **Nota:** Viaja con 2 niños menores de 5 años

### Roberto Silva
- **Destino:** Grand Canyon
- **Presupuesto:** $3000-4000
- **Alojamiento:** Hotel
- **Nivel:** Moderado
- **Perfil:** Ejecutivo buscando desconexión
- **Preocupación:** Solo tiene 3 días

### Laura Hernández
- **Destino:** Joshua Tree
- **Presupuesto:** $800-1200
- **Alojamiento:** Camping
- **Nivel:** Alto
- **Perfil:** Escaladora, busca rutas de boulder
- **Nota:** Ya conoce el parque

### Diego Torres
- **Destino:** Zion National Park
- **Presupuesto:** $2500-3500
- **Alojamiento:** Hotel
- **Nivel:** Alto
- **Perfil:** Entusiasta del senderismo extremo
- **Interés:** Quiere hacer Angels Landing

### Sofía Méndez
- **Destino:** Big Sur
- **Presupuesto:** $2000-2500
- **Alojamiento:** Hotel
- **Nivel:** Bajo
- **Perfil:** Luna de miel, busca romance y paisajes
- **Ocasión:** Aniversario de boda

### Miguel Vargas
- **Destino:** Lake Tahoe
- **Presupuesto:** $1800-2200
- **Alojamiento:** RV
- **Nivel:** Moderado
- **Perfil:** Amante de deportes acuáticos
- **Interés:** Kayak

### Gabriela Ortiz
- **Destino:** Mammoth Lakes
- **Presupuesto:** $1500-2000
- **Alojamiento:** Camping
- **Nivel:** Alto
- **Perfil:** Mochilera experimentada
- **Interés:** Ruta de varios días (backcountry)

### Fernando Castillo
- **Destino:** San Diego Beaches
- **Presupuesto:** $500-800
- **Alojamiento:** Camping
- **Nivel:** Moderado
- **Perfil:** Surfista, busca olas y playas
- **Nota:** Viaje corto de fin de semana

## 🎨 Funcionalidades del Panel

### Filtros Disponibles
- **Todos:** Muestra todos los leads
- **Nuevos:** Solo leads con status "new"
- **Contactados:** Solo leads con status "contacted"
- **Planificando:** Solo leads con status "planning"

### Ordenamiento
Los leads se ordenan por:
- Fecha de creación (más recientes primero)

### Acciones Disponibles
Para cada lead puedes:
- ✅ Cambiar su status
- 👁️ Ver toda su información
- 📝 Ver notas adicionales y preocupaciones
- 📊 Ver su perfil psicográfico

## 🔄 Actualizar Datos

### Refrescar la Vista
El panel se actualiza automáticamente cuando cambias de sección o recargas la página.

Para forzar una recarga:
1. Cambia a otra sección (ej: Itinerarios)
2. Regresa a Leads
3. Los datos se recargarán

### Modificar un Lead
1. Encuentra el lead que quieres modificar
2. Haz clic en uno de los botones de status
3. El status se actualizará automáticamente en la base de datos
4. Verás una confirmación visual

## 📱 Responsive Design

El panel es completamente responsive:

**Desktop:**
- Sidebar fijo a la izquierda
- Tabla amplia con todos los detalles

**Tablet:**
- Sidebar colapsable
- Cards adaptadas

**Mobile:**
- Menú hamburguesa
- Cards en formato vertical
- Botones touch-friendly

## 🧪 Testear Funcionalidades

### Test 1: Ver Todos los Leads
1. Ve a `/admin`
2. Login con `nomaderia2025`
3. La sección Leads debe mostrar todos los clientes
4. ✅ Verifica que hay 10 clientes

### Test 2: Filtrar por Status
1. Observa las estadísticas en la parte superior
2. Haz clic en cada filtro (Todos, Nuevos, etc.)
3. ✅ Verifica que los números coinciden

### Test 3: Actualizar Status
1. Encuentra "María González"
2. Cambia su status de "new" a "contacted"
3. ✅ Verifica que el cambio se guarda
4. Recarga la página
5. ✅ Verifica que el cambio persiste

### Test 4: Buscar Cliente Específico
1. Busca "Carlos Ramírez" en la lista
2. ✅ Verifica que está en Sequoia National Park
3. ✅ Verifica que su presupuesto es $2000-3000

## 🎯 Checklist de Verificación

Después de ejecutar el script y navegar por el panel:

- [ ] El panel admin se carga correctamente
- [ ] Puedo iniciar sesión con la contraseña
- [ ] Veo 10 clientes en la lista
- [ ] Las estadísticas muestran números correctos
- [ ] Puedo cambiar el status de un cliente
- [ ] Los cambios persisten después de recargar
- [ ] Todos los campos están llenos (nombre, email, destino, etc.)
- [ ] Los filtros funcionan correctamente
- [ ] El diseño se ve bien en desktop y mobile
- [ ] No hay errores en la consola

## 🚀 Próximos Pasos

Una vez verificado que todo funciona:

1. ✅ Los datos ficticios están en la base de datos
2. ✅ El panel admin puede leerlos
3. ✅ El panel admin puede modificarlos
4. ✅ La navegación funciona correctamente

¡Ya puedes empezar a usar el sistema con datos reales! 🎉

## 💡 Tips

- **Para limpiar los datos ficticios:** Ejecuta el script nuevamente (borra los anteriores)
- **Para añadir más clientes:** Modifica el array en `testDatabaseConnection.mjs`
- **Para cambiar campos:** Actualiza la migración y el script
- **Para exportar datos:** Usa Supabase Dashboard → Table Editor → Export

## 📚 Referencias

- [Admin Panel Route](http://localhost:5173/admin)
- [Código del Panel](src/components/AdminDashboard.tsx)
- [Código de Leads](src/components/admin/AdminLeads.tsx)
- [Migración de DB](supabase/migrations/20240102000000_create_leads_table.sql)
- [Script de Prueba](src/scripts/testDatabaseConnection.mjs)
