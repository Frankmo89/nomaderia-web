- INTEGRACIÓN: Iniciando conexión real a Supabase para cargar destinos internacionales en SmartQuoter y tarjetas. Se eliminará el mock y se usará fetch desde la tabla destinations.
+- INTEGRACIÓN: SmartQuoter y tarjetas ahora muestran datos reales desde Supabase (tabla destinations). Eliminado mock, la UI refleja los datos internacionales y nacionales en tiempo real.
- INTEGRACIÓN: SmartQuoter y TripDetail integrados en home.tsx. Se usa array mock realista para cotizador y tarjetas. Al hacer clic en un destino, se abre el modal TripDetail con checklist y requisitos físicos.
+- INTEGRACIÓN: Iniciando conexión real a Supabase para cargar destinos internacionales en SmartQuoter y tarjetas. Se eliminará el mock y se usará fetch desde la tabla destinations.
# Misión: Transformación a Agencia de Aventuras Global

## Objetivo
Convertir la web en un catálogo de aventuras internacionales con cotizador inteligente.

## Base de Datos (Supabase)
- [ ] **Schema:** Crear tabla `destinations` con soporte para: precios base, dificultad (1-4), lista de equipo, temporada y fee de no-residente.
- [ ] **Seed Data (México):**
    - **Nevado de Toluca:** Nivel 2, Económico, Hiking.
    - **Pico de Orizaba:** Nivel 4, Técnico, Alpinismo (requiere equipo).
- [ ] **Seed Data (Internacional):**
    - **Patagonia (W Trek):** Nivel 3, Premium, Trekking.
    - **Yosemite:** Nivel 1-2, Premium (con aviso de fee $100).

## Frontend (Cotizador y Detalles)
- [ ] **Página de Detalle:** Crear `src/pages/TripDetail.tsx` que muestre: Dificultad, Equipo Necesario (lista), Temporada y desglose de precio.
- [ ] **Smart Quoter:** Reemplazar la calculadora vieja por un formulario que filtre por: Presupuesto, Nivel de Dificultad y Mes.
- [ ] **UI:** Mostrar badges de "Nivel Técnico" en las tarjetas.

(Espacio para el agente)
- Creado archivo de migración: supabase/migrations/20260130_create_destinations_table.sql
- Estructura: id, name, country, difficulty_tier (1-4), gear_list (array texto), base_cost, estimated_flight_cost, physical_reqs, surcharge_fee, season_start/end, timestamps.
- Creado archivo seed: supabase/seed_adventures.sql
- Incluye datos realistas para: Nevado de Toluca (MX, $150, Nivel 2), Pico de Orizaba (MX, $450, Nivel 4), Torres del Paine (CL, $1500+$800 vuelo, Nivel 3), Yosemite (USA, $400+$500 vuelo+$100 fee, Nivel 1-2).
- Creado archivo de migración: supabase/migrations/20260130_create_destinations_table.sql
- Estructura: id, name, country, difficulty_tier (1-4), gear_list (array texto), base_cost, estimated_flight_cost, physical_reqs, surcharge_fee, season_start/end, timestamps.
- Creado archivo seed: supabase/seed_adventures.sql
- Incluye datos realistas para: Nevado de Toluca (MX, $150, Nivel 2), Pico de Orizaba (MX, $450, Nivel 4), Torres del Paine (CL, $1500+$800 vuelo, Nivel 3), Yosemite (USA, $400+$500 vuelo+$100 fee, Nivel 1-2).
- Creado componente: src/components/SmartQuoter.tsx
- Lógica: Slider de presupuesto, select de dificultad, filtrado por (base_cost + estimated_flight_cost + surcharge_fee) <= presupuesto_usuario, tarjetas de resultados.
- Creado archivo de migración: supabase/migrations/20260130_create_destinations_table.sql
- Estructura: id, name, country, difficulty_tier (1-4), gear_list (array texto), base_cost, estimated_flight_cost, physical_reqs, surcharge_fee, season_start/end, timestamps.
- Creado archivo seed: supabase/seed_adventures.sql
- Incluye datos realistas para: Nevado de Toluca (MX, $150, Nivel 2), Pico de Orizaba (MX, $450, Nivel 4), Torres del Paine (CL, $1500+$800 vuelo, Nivel 3), Yosemite (USA, $400+$500 vuelo+$100 fee, Nivel 1-2).
- Creado componente: src/components/SmartQuoter.tsx
- Lógica: Slider de presupuesto, select de dificultad, filtrado por (base_cost + estimated_flight_cost + surcharge_fee) <= presupuesto_usuario, tarjetas de resultados.
- Creado componente: src/components/TripDetail.tsx
- Muestra: Nivel técnico, checklist de equipo necesario, requisitos físicos, costos y temporada. Modal responsivo y accesible.
### 2026-01-30
- Creado archivo de migración: supabase/migrations/20260130_create_destinations_table.sql
- Estructura: id, name, country, difficulty_tier (1-4), gear_list (array texto), base_cost, estimated_flight_cost, physical_reqs, surcharge_fee, season_start/end, timestamps.
- Creado archivo seed: supabase/seed_adventures.sql
- Incluye datos realistas para: Nevado de Toluca (MX, $150, Nivel 2), Pico de Orizaba (MX, $450, Nivel 4), Torres del Paine (CL, $1500+$800 vuelo, Nivel 3), Yosemite (USA, $400+$500 vuelo+$100 fee, Nivel 1-2).
- Creado componente: src/components/SmartQuoter.tsx
- Lógica: Slider de presupuesto, select de dificultad, filtrado por (base_cost + estimated_flight_cost + surcharge_fee) <= presupuesto_usuario, tarjetas de resultados.
- Creado componente: src/components/TripDetail.tsx
- Muestra: Nivel técnico, checklist de equipo necesario, requisitos físicos, costos y temporada. Modal responsivo y accesible.
- INTEGRACIÓN: SmartQuoter y TripDetail integrados en home.tsx. Se usa array mock realista para cotizador y tarjetas. Al hacer clic en un destino, se abre el modal TripDetail con checklist y requisitos físicos.
- Creado archivo de migración: supabase/migrations/20260130_create_destinations_table.sql
- Estructura: id, name, country, difficulty_tier (1-4), gear_list (array texto), base_cost, estimated_flight_cost, physical_reqs, surcharge_fee, season_start/end, timestamps.
- Creado archivo seed: supabase/seed_adventures.sql
- Incluye datos realistas para: Nevado de Toluca (MX, $150, Nivel 2), Pico de Orizaba (MX, $450, Nivel 4), Torres del Paine (CL, $1500+$800 vuelo, Nivel 3), Yosemite (USA, $400+$500 vuelo+$100 fee, Nivel 1-2).
- Creado componente: src/components/SmartQuoter.tsx
- Lógica: Slider de presupuesto, select de dificultad, filtrado por (base_cost + estimated_flight_cost + surcharge_fee) <= presupuesto_usuario, tarjetas de resultados.
- Creado componente: src/components/TripDetail.tsx
- Muestra: Nivel técnico, checklist de equipo necesario, requisitos físicos, costos y temporada. Modal responsivo y accesible.
- Creado archivo de migración: supabase/migrations/20260130_create_destinations_table.sql
- Estructura: id, name, country, difficulty_tier (1-4), gear_list (array texto), base_cost, estimated_flight_cost, physical_reqs, surcharge_fee, season_start/end, timestamps.
- Creado archivo seed: supabase/seed_adventures.sql
- Incluye datos realistas para: Nevado de Toluca (MX, $150, Nivel 2), Pico de Orizaba (MX, $450, Nivel 4), Torres del Paine (CL, $1500+$800 vuelo, Nivel 3), Yosemite (USA, $400+$500 vuelo+$100 fee, Nivel 1-2).
- Creado componente: src/components/SmartQuoter.tsx
- Lógica: Slider de presupuesto, select de dificultad, filtrado por (base_cost + estimated_flight_cost + surcharge_fee) <= presupuesto_usuario, tarjetas de resultados.
- Creado archivo de migración: supabase/migrations/20260130_create_destinations_table.sql
- Estructura: id, name, country, difficulty_tier (1-4), gear_list (array texto), base_cost, estimated_flight_cost, physical_reqs, surcharge_fee, season_start/end, timestamps.
- Creado archivo seed: supabase/seed_adventures.sql
- Incluye datos realistas para: Nevado de Toluca (MX, $150, Nivel 2), Pico de Orizaba (MX, $450, Nivel 4), Torres del Paine (CL, $1500+$800 vuelo, Nivel 3), Yosemite (USA, $400+$500 vuelo+$100 fee, Nivel 1-2).
(Espacio para el agente)
## Inicio de la Misión
Fecha: [Fecha de inicio]


## Archivos a Crear
- `supabase/migrations/<timestamp>_create_destinations_table.sql` (Migración tabla destinations)
- `supabase/seed_adventures.sql` (Seed realista de destinos)
- `src/components/SmartQuoter.tsx` (Componente cotizador inteligente)
- `src/components/TripDetail.tsx` (Vista/modal de detalle de viaje)

## Decisiones Técnicas Iniciales
- La tabla `destinations` incluirá: difficulty_tier (1-4), gear_list (array texto), base_cost (USD), estimated_flight_cost (USD), physical_reqs (texto), surcharge_fee (numeric), season_start/end (date).
- El seed contendrá datos realistas y detallados para los destinos solicitados.
- El frontend usará TypeScript y React.

## Progreso de Tareas
- [x] Migración SQL tabla destinations (completada)
- [x] Seed realista de destinos (completada)
- [x] SmartQuoter.tsx (completada)
- [x] TripDetail.tsx (completada)
## Decisiones Técnicas Iniciales
- Utilizar TypeScript para el desarrollo del frontend.
- Implementar Supabase como base de datos.

(Espacio para el agente)