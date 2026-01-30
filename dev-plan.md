# Misión: Adaptación a Política Tarifaria 2026

## Objetivo
Adaptar la plataforma para informar sobre el recargo de $100 USD en los "Big 11" y promover activamente alternativas libres de este cobro.

## Tareas de Base de Datos (Backend)
- [x] **Schema:** Actualizar tabla `destinations` con columna `surcharge_fee` (Numeric, default 0) y `is_surcharge_free` (Boolean).
- [x] **Seed:** Marcar Yosemite, Grand Canyon, Yellowstone, Zion, etc., con `surcharge_fee = 100`.
- [x] **Nuevos Destinos (USA - Sin cobro):** Generar datos para: Death Valley (CA), Joshua Tree (CA), Valley of Fire (NV State Park), Arches (UT - verificar si aplica).
- [x] **Nuevos Destinos (LatAm):** Generar datos para: Nevado de Toluca, Iztaccíhuatl, Torres del Paine (Chile).

## Tareas de Contenido (Blog & Estrategia)
- [ ] **Artículo Alerta:** "La lista de los 11 parques que cobran $100 USD extra (y a cuáles ir en su lugar)".
- [ ] **Guías de Ahorro:** Crear comparativas de precio: "Yosemite ($135) vs Nevado de Toluca ($5)".

## Tareas de Frontend (UI)
- [x] **Advertencia:** En tarjetas de destino, si el parque tiene recargo, mostrar un badge rojo: "⚠️ $100 Non-Res Fee". Si es libre de impuesto, destacar con badge verde.
- [ ] **Filtro Inteligente:** Crear un toggle en la búsqueda: "Mostrar solo destinos sin recargo".
- [x] **Calculadora:** Actualizar `TripCalculator.tsx` para preguntar "¿Eres ciudadano/residente?" y sumar los $100 si la respuesta es No.

## Bitácora
### 2026-01-29
- Se creó la migración SQL para surcharge_fee e is_surcharge_free en destinations.
- Se generó seed_smart_travel.sql con los 11 parques caros (recargo activo), 5 alternativas sin recargo en USA y 3 destinos top LatAm.
- TripCalculator.tsx ahora pregunta por Green Card/Pasaporte USA y suma $100 si no lo tiene y el parque es caro.
- Las tarjetas de destino muestran visualmente los lugares "Libres de Impuesto" como mejor opción y badge de recargo en los caros.
Falta: Filtro inteligente en búsqueda de destinos.