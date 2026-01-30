# Misión: Adaptación a Política Tarifaria 2026

## Objetivo
Adaptar la plataforma para informar sobre el recargo de $100 USD en los "Big 11" y promover activamente alternativas libres de este cobro.

## Tareas de Base de Datos (Backend)
- [ ] **Schema:** Actualizar tabla `destinations` con columna `surcharge_fee` (Numeric, default 0) y `is_surcharge_free` (Boolean).
- [ ] **Seed:** Marcar Yosemite, Grand Canyon, Yellowstone, Zion, etc., con `surcharge_fee = 100`.
- [ ] **Nuevos Destinos (USA - Sin cobro):** Generar datos para: Death Valley (CA), Joshua Tree (CA), Valley of Fire (NV State Park), Arches (UT - verificar si aplica).
- [ ] **Nuevos Destinos (LatAm):** Generar datos para: Nevado de Toluca, Iztaccíhuatl, Torres del Paine (Chile).

## Tareas de Contenido (Blog & Estrategia)
- [ ] **Artículo Alerta:** "La lista de los 11 parques que cobran $100 USD extra (y a cuáles ir en su lugar)".
- [ ] **Guías de Ahorro:** Crear comparativas de precio: "Yosemite ($135) vs Nevado de Toluca ($5)".

## Tareas de Frontend (UI)
- [ ] **Advertencia:** En `TripCard.tsx`, si el parque tiene recargo, mostrar un badge rojo: "⚠️ $100 Non-Res Fee".
- [ ] **Filtro Inteligente:** Crear un toggle en la búsqueda: "Mostrar solo destinos sin recargo".
- [ ] **Calculadora:** Actualizar `TripCalculator.tsx` para preguntar "¿Eres ciudadano/residente?" y sumar los $100 si la respuesta es No.

## Bitácora
(Espacio para el agente)

