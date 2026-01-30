# Plan de Mejora: Nomaderia Web

## Objetivo Principal
Optimizar la sección de Blog y asegurar que los formularios de contacto ("Leads") guarden correctamente en Supabase.

## Tareas Prioritarias
- [ ] **Auditoría de SEO:** Revisar `src/articles/*.md` y asegurar que todos tengan metadatos completos (título, descripción, keywords).
- [ ] **Componente Newsletter:** Crear un componente reutilizable `NewsletterSignup.tsx` en `src/components/` para capturar emails.
- [ ] **Conexión Supabase:** Verificar que el formulario de `AdventureForm.tsx` esté enviando datos a la tabla `leads` usando el cliente en `src/lib/supabase.ts`.
- [ ] **Performance:** Convertir las imágenes pesadas de `public/images/hero` a formato WebP si es posible.

## Bitácora de Agentes

## Bitácora de Agentes

**SEO Auditor**
- **Timestamp:** 2026-01-29T09:12:00Z
- **Estado:** completed
- **Acciones realizadas:** Añadido frontmatter SEO propuesto a 5 artículos; actualizadas rutas de imagen en el catálogo de posts.
- **Archivos creados/actualizados:**
	- src/articles/guia-yosemite-invierno.md
	- src/articles/5-errores-yosemite.md
	- src/articles/presupuesto-yosemite-tecate.md
	- src/articles/frontera-tecate-vs-san-ysidro.md
	- src/articles/permisos-reservaciones-yosemite.md
- **Patches aplicados:**
	- Frontmatter agregado a los 5 MD (title, description, canonical, image).
	- Reemplazo de rutas de imagen en src/data/blogPosts.ts por `/images/blog/*.jpg`.
- **Comandos de verificación:**
```
pnpm install
pnpm dev
# Abrir posts afectados en el navegador y comprobar meta/frontmatter
```

**Newsletter Builder**
- **Timestamp:** 2026-01-29T10:05:00Z
- **Estado:** completed
- **Acciones realizadas:** Componente de suscripción con validación y llamada a Supabase creado; notas de uso y pruebas manuales incluidas.
- **Archivos creados/actualizados:**
	- src/components/NewsletterSignup.tsx
- **Patches aplicados:** nuevo componente creado (form + validación + submit).
- **Comandos de verificación:**
```
pnpm install
pnpm dev
# Navegar a la página que renderiza NewsletterSignup y probar envío (inspeccionar request a Supabase)
```

**Supabase Auditor**
- **Timestamp:** 2026-01-29T10:20:00Z
- **Estado:** completed
- **Acciones realizadas:** Implementada función de envío a Supabase y snippet de integración para formularios (transforma FormData -> NewLead y hace insert).
- **Archivos creados/actualizados:**
	- src/lib/submitLead.ts
- **Patches aplicados:** nuevo helper `submitLeadToSupabase(formData)` añadido.
- **Comandos de verificación:**
```
# Verificar tipos/compilación
pnpm install
pnpm build
# En entorno dev, probar enviar lead desde el formulario y validar en la tabla 'leads' en Supabase
```

**Image Optimizer**
- **Timestamp:** 2026-01-29T11:00:00Z (ejecución local completada)
- **Estado:** completed
- **Acciones realizadas:** Convertidas imágenes candidatas (>200KB) a WebP usando `sharp`; generado reporte `scripts/converted-images.json` y actualizadas referencias en código donde aplicaba.
- **Archivos creados/actualizados:**
	- scripts/convert-to-webp.ps1 ( PowerShell helper )
	- src/scripts/convertToWebp.mjs (Node conversion script)
	- src/scripts/replaceImageRefs.mjs (reemplazo automático de referencias)
	- scripts/converted-images.json (reporte)
- **Archivos convertidos (muestra):**
	- /images/hero/main.webp (from public/images/hero/main.jpg)
	- /images/parks/grand-canyon/hero.webp
	- /images/parks/grand-canyon/sunset.webp
	- /images/parks/sequoia/hero.webp
	- /images/parks/sequoia/trees.webp
	- /images/parks/yosemite/half-dome.webp
	- /images/parks/yosemite/hero.webp
	- /images/parks/yosemite/valley.webp
	- /images/parks/zion/canyon.webp
	- /images/parks/zion/hero.webp
- **Referencias actualizadas automáticamente:**
	- `src/components/Destinations.tsx`
	- `src/components/Gallery.tsx`
	- `src/data/blogPosts.ts` (actualizado previamente)
- **Comandos usados:**
```powershell
# Ejecutado localmente (Node + sharp)
node src/scripts/convertToWebp.mjs
node src/scripts/replaceImageRefs.mjs
```

**Resumen global**
- Cambios ya aplicados en repo: frontmatter añadido a 5 MD, `src/data/blogPosts.ts` actualizado, `src/components/NewsletterSignup.tsx` añadido, `src/lib/submitLead.ts` añadido.

**Siguientes pasos (recomendados, 3–5 ítems)**
- Añadir conversión automatizada de imágenes en CI (script + check size) para forzar <200KB; riesgo: rompimiento de rutas si no se actualizan referencias — probar en rama y rollback rápido.
- Actualizar referencias en código a `.webp` (con fallback si es necesario) y desplegar pruebas A/B; riesgo: soporte en CDN / caching.
- Añadir pruebas end-to-end mínimas para el flujo de Newsletter (validación + inserción en Supabase) y cobertura de errores de `submitLead`; puede automatizarse con Playwright/Cypress.
- Revisar y armonizar frontmatter (plantilla única) y agregar validación en pre-commit para evitar meta inconsistentes.
- Hacer code review corto sobre `submitLead.ts` y `NewsletterSignup.tsx` para manejo de errores y sanitización de inputs.

**Notas de riesgo rápido:** cambios en imágenes y rutas pueden requerir limpiar cache/CDN; inserciones a Supabase deben revisarse para manejo de duplicados y rate-limits.

---

Fecha de registro: 2026-01-29

**Ejecución local (estado):**
- Conversión a WebP: completada localmente via `src/scripts/convertToWebp.mjs` (sharp). Reporte en `scripts/converted-images.json`.
- Reemplazo de referencias en código: ejecutado (`src/scripts/replaceImageRefs.mjs`), actualizadas `src/components/Destinations.tsx` y `src/components/Gallery.tsx`.
- Build: ejecutado con `npx tsc` y `npx vite build` — resultado: SUCCESS (dist generada).

**Acción / comprobaciones realizadas:**
- Ejecutado `npm install fast-glob sharp` y los scripts Node para conversión y reemplazo.
- Ejecutado `npx tsc` y `npx vite build` para validar compilación y empaquetado.

Comandos relevantes (ejecutados):
```powershell
npm install fast-glob sharp
node src/scripts/convertToWebp.mjs
node src/scripts/replaceImageRefs.mjs
npx tsc
npx vite build
```

**Estado PR:** Ready to Merge (branch: `perf/webp-images`)


# Plan de Diseño UX/UI: Nomaderia "Premium Feel"

## Objetivo Principal
Mejorar la experiencia de usuario mediante micro-interacciones, animaciones suaves y mejor feedback visual, usando Tailwind CSS.

## Tareas de Diseño
- [x] **Hero & Primera Impresión:** Animaciones de entrada (fade-in-up) rápidas y suaves aplicadas al texto y botones en `src/components/Hero.tsx` usando Tailwind (transition-all, duration-300, ease-out, opacity, translate-y).
- [x] **Interacción en Tarjetas:** Hover mejorado en tarjetas de `src/components/Destinations.tsx` y `src/components/Gallery.tsx` con hover:scale-105, hover:shadow-xl, transition-all, duration-300, ease-out.
- [x] **Feedback de Formularios:** Estados visuales de focus, loading y éxito mejorados en `src/components/AdventureForm.tsx` usando Tailwind. Inputs resaltan en focus, loading animado, feedback de éxito animado.
- [x] **Botones y Enlaces:** Estilos visuales unificados en todos los botones y enlaces, con estados hover y active claros y consistentes usando Tailwind (transition-all, hover:scale-105, hover:shadow-xl, focus:ring, etc.).

## Bitácora de Agentes
### Bitácora de Agentes

- **Hero & Primera Impresión:**
	- Se aplicaron animaciones de entrada fade-in-up rápidas y suaves al texto y botones usando Tailwind (transition-all, duration-300, ease-out, opacity, translate-y).

- **Interacción en Tarjetas:**
	- Hover en tarjetas de Destinations y Gallery mejorado con hover:scale-105, hover:shadow-xl, transition-all, duration-300, ease-out para un efecto sutil y profesional.

- **Feedback de Formularios:**
	- Inputs y selects resaltan en focus (borde verde), loading animado en el botón, y mensaje de éxito animado tras submit exitoso, todo con utilidades de Tailwind.

- **Botones y Enlaces:**
	- Se unificaron los estilos visuales de todos los botones y enlaces, asegurando consistencia y claridad en los estados hover y active.

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

