# Rediseño de Pólizas — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Materializar en el mockup el rediseño de la sección Pólizas (dos pestañas, wizard ACA de 7 pasos, perfil de cliente, detalle de póliza, Aida inline) manteniendo la estética actual.

**Architecture:** Todo vive en `mockup/app.js` (React 18 + Babel standalone + Tailwind CDN, sin build). Se añaden vistas nuevas al switch de `currentView` del `App` (`policy-wizard`, `client-profile`) y estado de pestaña en `PoliciesView`. Se reutilizan `Card`, `Badge`, `AiBadge`, `SelectField`, `InfoField`, `AiSearchBar`, `Icons`. Estética: paleta `brand`, `shadow-soft`, `font-display`/`font-data`.

**Tech Stack:** React 18 UMD, Babel standalone, Tailwind CDN.

**Verificación (no hay tests):** tras cada tarea, abrir `mockup/mockup.html` en el navegador y comprobar que la app carga sin errores de consola y que la pantalla se ve/funciona. Commits frecuentes en rama `feature/polizas-redesign`.

**Spec:** `docs/superpowers/specs/2026-06-15-polizas-redesign-design.md`. Estados canónicos: `Consent → Quoting → Eligibility → Documents → Enrollment → Active`.

---

### Task 0: Rama de trabajo
- [ ] Crear rama `feature/polizas-redesign` desde `main`.

### Task 1: Componente `StatusFilterCards` (tarjetas KPI cuadradas) + datos i18n
**Files:** Modify `mockup/app.js` (cerca de `PolicyFilterPill`, ~1981) y diccionario `T` (~20-95).
- [ ] Añadir componente reutilizable `StatusFilterCards({ items, active, onToggle })`: tarjetas tamaño fijo (`w-[124px] h-[104px]`), flex-wrap, número grande (`font-data`) + label, seleccionada con `ring-2 ring-inset ring-brand-400`, `shadow-soft hover:shadow-soft-hover`.
- [ ] Añadir claves de traducción nuevas (en/es) para estados de póliza (`Quoting/Eligibility/Documents/Enrollment/Active`), pestañas (`Clientes`), wizard, secciones de Datos, etc.
- [ ] **Verificar** en navegador (render aislado temporal o ya en la lista).
- [ ] Commit.

### Task 2: Aplicar tarjetas cuadradas a Contratos (constancia visual)
**Files:** Modify `mockup/app.js` `ContractsView` (~889-909).
- [ ] Reemplazar el `grid grid-cols-4` de KPIs por `StatusFilterCards` (mismas tarjetas de tamaño fijo). Mantener conteos y `toggleStatus`.
- [ ] **Verificar** Contratos en navegador (filtros siguen funcionando, agente y agencia).
- [ ] Commit.

### Task 3: Datos mock — pólizas con nuevos estados + clientes con hogar
**Files:** Modify `mockup/app.js` (`POLICIES_DATA` ~1853; añadir `CLIENTS_DATA`).
- [ ] Extender `POLICIES_DATA`: campo `stage` (`Consent|Quoting|Eligibility|Documents|Enrollment|Active`), `aptc`, `plan`, `clientId`; incluir ≥1 póliza en `Quoting` (borrador).
- [ ] Crear `CLIENTS_DATA`: clientes con `household` (array de miembros: `name, relation, dob, taxHousehold, seeksCoverage, ssn, immigration, smoker`), contacto, `zip`, `county`, `income`, `fpl`.
- [ ] **Verificar** sin errores de consola.
- [ ] Commit.

### Task 4: `PoliciesView` — pestañas Pólizas/Clientes + tarjetas + columnas + Retomar
**Files:** Modify `mockup/app.js` `PoliciesView` (~1998-2210).
- [ ] Añadir estado `tab` (`policies|clients`) con dos pestañas arriba.
- [ ] Sustituir `STATUS_PILLS` por `StatusFilterCards` con las buckets nuevas (Quoting/Eligibility/Documents/Enrollment/Active) sobre `row.stage`.
- [ ] Columnas: Cliente, Tipo (badge ACA), Carrier·Plan, APTC, Efectiva, Estado+progreso. Botón "Retomar" en filas `Quoting`.
- [ ] "+ Nueva Póliza" → `navigateTo('policy-wizard', { step: 1 })` (sustituye el modal).
- [ ] **Verificar** ambas pestañas y filtros en navegador.
- [ ] Commit.

### Task 5: `ClientsListView` + `ClientProfileView` (Datos primero)
**Files:** Modify `mockup/app.js` (nuevas vistas; registrar en switch `App` ~3069).
- [ ] `ClientsListView`: lista/tarjetas desde `CLIENTS_DATA` (nombre, contacto, ubicación, nº pólizas, hogar) + "+ Nuevo Cliente". Click → `navigateTo('client-profile', { clientId })`.
- [ ] `ClientProfileView`: sidebar con ficha + quick facts (pólizas, hogar, ingreso, FPL, agente) + "+ Nueva póliza". Tabs: **Datos** (default, 4 secciones jerarquizadas + 5ª colapsable), Pólizas, Hogar/Miembros (tabla con 2 flags + agregar), Pagos, Documentos.
- [ ] Renderizar la pestaña Clientes de `PoliciesView` con `ClientsListView`.
- [ ] **Verificar** lista y perfil en navegador.
- [ ] Commit.

### Task 6: `AidaHint` + `WizardShell` (stepper de 7 pasos)
**Files:** Modify `mockup/app.js` (nuevos componentes; registrar `policy-wizard` en switch `App`).
- [ ] `AidaHint({ children })`: caja inline morada con ícono ✦ (estilo sugerencia de Aida), reutilizable en todos los pasos.
- [ ] `PolicyWizardView({ navigateTo, viewParams })`: barra de progreso superior con los 7 pasos (Cliente·Consent·Quoting·Eligibility·Docs·Enrollment·Binder), navegación Atrás/Continuar/Guardar y salir, "Saltar quoting" en paso 3. Estado de paso actual interno.
- [ ] **Verificar** que el shell navega entre pasos vacíos en navegador.
- [ ] Commit.

### Task 7: Pasos del wizard 1–2 (Cliente + Hogar, Consent)
**Files:** Modify `mockup/app.js` (contenido de pasos dentro del wizard).
- [ ] Paso 1: elegir cliente existente / crear nuevo + bloque Hogar/Miembros (tabla con 2 flags + form inline "agregar miembro") con `AidaHint`.
- [ ] Paso 2: pantalla de consentimiento (texto + checkbox) con `AidaHint` explicando agent-of-record.
- [ ] **Verificar** en navegador.
- [ ] Commit.

### Task 8: Paso 3 — Quoting (la pantalla estrella)
**Files:** Modify `mockup/app.js`.
- [ ] Layout 2 columnas: inputs izquierda (ZIP/condado, miembros, edades, ingreso, tabaco) + `AidaHint` con APTC estimado; resultados derecha: filtros (metal/carrier/prima/deducible), bloque "Recomendado por Aida" (2 planes con explicación NL), "Todos los planes" (multi-selección de candidatos). Planes mock.
- [ ] **Verificar** selección de planes y layout en navegador.
- [ ] Commit.

### Task 9: Pasos 4–7 (Eligibility, Documentos, Enrollment, Binder)
**Files:** Modify `mockup/app.js`.
- [ ] Paso 4 Eligibility: form prellenado (hogar/ingreso/FPL/miembros) + panel determinación (APTC/CSR) + validación `AidaHint` (Data Matching Issue).
- [ ] Paso 5 Documentos: lista de docs con revisión IA (Verified/Flagged/Pendiente, reusar `AiBadge`).
- [ ] Paso 6 Enrollment: tarjeta "lanzar enrollment (HealthSherpa hosted)" + estado de retorno por webhook (mock) con `AidaHint`.
- [ ] Paso 7 Binder/Active: registrar pago de prima → marcar Active.
- [ ] **Verificar** recorrido completo del wizard en navegador.
- [ ] Commit.

### Task 10: `PolicyDetailView` rediseñado
**Files:** Modify `mockup/app.js` `PolicyDetailView` (~2214).
- [ ] Pipeline superior (orden canónico) con hito actual + franja "Retomar en <paso> →" que entra al wizard en ese paso.
- [ ] Sidebar ficha (nº, cliente, carrier, plan, APTC, prima neta, efectiva, asegurados, firma) + enlace a perfil de cliente.
- [ ] Tabs: Resumen · Plan y subsidio · Asegurados · Documentos (revisión IA) · Enrollment · Actividad.
- [ ] **Verificar** en navegador (entrar desde la lista, retomar).
- [ ] Commit.

### Task 11: Pulido y barrido final
**Files:** Modify `mockup/app.js`, posiblemente `mockup/styles.css`.
- [ ] Revisar modo Agencia (recoloreo `agency-mode`) en las pantallas nuevas; columna Agent donde aplique.
- [ ] Revisar i18n en/es completo en lo nuevo. Quitar `NewPolicyModal` si quedó sin uso.
- [ ] **Verificar** recorrido completo en navegador, ambos modos e idiomas, sin errores de consola.
- [ ] Commit.

---

## Self-Review

**Cobertura del spec:** §3.1 Pólizas→T4; §3.2 Clientes+perfil/Datos→T5; §4 wizard→T6-9; §4.b household→T5,T7; §5 Aida→T6 (AidaHint) usado en T7-10; §6 estados→T3,T4,T10; tarjetas cuadradas + Contratos→T1,T2; §6.b estética→transversal. Detalle de póliza→T10. Sin huecos.

**Placeholders:** ninguno pendiente; los planes mock son contenido real de UI, no TODOs.

**Consistencia de tipos:** `row.stage` (estado de póliza) usado igual en T3/T4/T10; `StatusFilterCards`/`AidaHint`/`PolicyWizardView`/`ClientsListView`/`ClientProfileView` nombrados consistentemente; vistas nuevas (`policy-wizard`, `client-profile`) registradas en el switch del `App`.
