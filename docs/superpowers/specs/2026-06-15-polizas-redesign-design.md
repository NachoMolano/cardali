# Rediseño de la sección Pólizas — Aidgency

**Fecha:** 2026-06-15
**Estado:** Diseño (brainstorming) — pendiente de materializar en el mockup
**Alcance:** sección Pólizas del mockup (`mockup/app.js`), modo Agente (modo Agencia se aborda al final). **ACA-first.**

---

## 1. Objetivo

Hoy la sección Pólizas es una tabla con un modal "Nueva Póliza" y un detalle con pestañas mayormente en "coming soon". El agente actualiza estados a mano y muchas veces crea pólizas sin perfil de cliente.

La visión: que el agente gestione el **ciclo de vida completo de la póliza dentro de Aidgency** —contacto, quoting, eligibility, enrollment— sin salir a portales externos, con IA ("Aida") que le facilite cada paso. Este rediseño cubre el flujo guiado para **ACA/Marketplace**; otros tipos (Medicare, Life, Dental…) quedan como creación simple hasta diseñar su flujo propio.

## 2. Realidad de integración (verificada)

Decisiones de diseño ancladas en investigación verificada (ver memoria `aca-medicare-integration-reality`):

- **Quoting:** la **HealthSherpa ONE Quote API** es self-serve (API key por email) y da quotes on/off-exchange en los 50 estados + DC con **estimación de APTC**. → Quoting **embebido nativo**, sin portal externo.
- **Eligibility:** una **única aplicación al Marketplace** (ingreso + tamaño del hogar) determina **APTC** (subsidio) y **CSR** (solo planes Silver) reales y emite el *Marketplace Eligibility Notice*.
- **Enrollment:** bajo **EDE** se puede hacer in-platform; HealthSherpa lo ofrece como **hosted session / deeplink + webhooks** (approval-gated, partner onboarding). → Diseño **backend-agnóstico**: el paso de enrollment es un componente que hoy lanza el flujo hosted de HealthSherpa y recibe los datos de vuelta por webhook; mañana podría ser 100% in-line si Aidgency obtiene su propio EDE. No es una restricción de seguridad "salir siempre fuera".
- **Licencias:** **NIPR PDB API** da verificación en tiempo real (refresh diario) de licencias y appointments por NPN (vía Gateway o reseller, FCRA permissible purpose).
- ACA y Medicare son **ecosistemas separados**; nada de lo anterior aplica a Medicare.

## 3. Estructura de la sección

Dos pestañas: **Pólizas** y **Clientes** (separan la venta del cliente).

### 3.1 Pestaña Pólizas
- Filtro de estado con **tarjetas KPI cuadradas** (mismo componente que Contratos, constancia visual), ordenadas izq→der según el pipeline: `Quoting` · `Eligibility` · `Documents` · `Enrollment` · `Active` (+ estados de firma existentes). **Decisión transversal:** Contratos también pasa a estas tarjetas (hoy son rectangulares anchas) — aplicar en la fase de materialización. Las tarjetas son de **tamaño fijo "casi cuadrado" (~124×104), idéntico en ambas secciones** (no columnas elásticas); se alinean a la izquierda y envuelven en pantallas estrechas.
- Búsqueda IA + filtros (cliente, tipo, carrier; agente en modo agencia).
- Botón **"+ Nueva Póliza"** → wizard en Paso 1.
- Tabla: Cliente, Tipo (badge ACA), Carrier + plan, Subsidio APTC, Fecha efectiva, Estado + matriz de progreso (actualizada a los nuevos pasos).
- Pólizas en `Quoting` se muestran como **borradores** → "Retomar" abre el wizard donde se dejó.

### 3.2 Pestaña Clientes (nueva)
- Lista/tarjetas: nombre, contacto, ubicación, nº de pólizas, household (tamaño/ingreso).
- Botón **"+ Nuevo Cliente"**.
- Click → **perfil del cliente**. Sidebar con ficha y *quick facts* (nº pólizas, tamaño hogar, ingreso, FPL, agente) + botón "+ Nueva póliza". Tabs (orden por importancia): **Datos** (default) · **Pólizas** · **Hogar/Miembros** · **Pagos** · **Documentos**. (Simplifica las 9 tabs de Trinity; "Opportunities"/CRM queda para después; "Member Policies" se consolida en Pólizas.)
- **Pestaña Datos — jerarquía de información** (evaluada para ACA): ① Identidad y contacto (nombre, DOB, teléfono, email, idioma, estado civil) → ② **Ubicación** (dirección, city, **County y ZIP** — críticos para cotizar; en Trinity están enterrados, aquí suben) → ③ **Hogar y finanzas** (tamaño hogar, family group income, income group/FPL, solicitantes — deciden el subsidio) → ④ Elegibilidad (SSN, immigration status, smoker, gender) → ⑤ **colapsado**: second name, country of birth, height, weight, apartment (poco usados en ACA).

## 4. Wizard de creación de póliza (ACA)

Flujo lineal con barra de progreso superior; **guardar y salir** en cualquier paso (la póliza queda en el estado de ese paso).

1. **Cliente** *(obligatorio)* — elegir existente o crear nuevo (nombre, contacto, ZIP/estado, household). La póliza nace ligada a un cliente.
2. **Consent** — consentimiento del cliente (*agent-of-record*), requisito legal ACA/EDE. Aida explica qué implica.
3. **Quoting** *(saltable)* — página estilo Sherpa: inputs a la izquierda (ZIP/condado, miembros, edades, ingreso estimado, tabaco); a la derecha **mejores planes en vivo** (Quote API) con **APTC estimado**, filtrables (metal tier, carrier, prima, deducible) y seleccionables. Selección → "perfil" de la póliza. Estado: `Quoting`.
4. **Eligibility** — aplicación formal al Marketplace (ingreso + tamaño exactos) → **APTC/CSR reales** y *Eligibility Notice*; afina los números del quoting. Estado: `Eligibility`.
5. **Documentos + plan final** — confirmar plan con subsidio real; recoger documentos del cliente (identidad, ingresos, estatus migratorio si aplica) con revisión IA. Estado: `Documents`.
6. **Enrollment** — componente hosted/deeplink de HealthSherpa prellenado; al volver, datos sincronizados por webhook. Estado: `Enrollment`.
7. **Binder / Active** — registro del pago de la primera prima (a la aseguradora) que *efectúa* la cobertura. Estado final: `Active`.

Orden **Shop First** (quoting antes de eligibility) elegido sobre "Apply First" por agilidad de venta.

## 4.b Miembros del hogar (household) — modelo de datos

Los miembros familiares son **datos del Cliente, no de la póliza** (corrige los "subperfiles fantasma" tipo Trinity). Fuente única de verdad: el cliente; el wizard solo **selecciona** qué miembros aplican a cada póliza.

- **Definición/edición desde DOS puntos:** (a) pestaña Clientes → perfil del cliente, sección "Hogar / Miembros"; (b) dentro del wizard (Paso 1 Cliente, y al necesitarlos en Quoting/Eligibility). Lo agregado en el wizard **se guarda de vuelta en el cliente**, no queda atrapado en la póliza.
- Cada miembro: nombre, relación, fecha de nacimiento, tabaco, SSN, estatus migratorio, aporte de ingreso, y **dos flags independientes**: *parte del household tributario* y *solicita cobertura* (en ACA el household tributario no siempre coincide con quién pide cobertura).
- Se reúsan en renovaciones y futuras pólizas; un dependiente puede volverse titular propio más adelante.

## 5. Aida (IA) — capa transversal del wizard

No es un chat aparte; son sugerencias inline en cada paso (+ el botón flotante existente para preguntas libres).

- **Cliente/Consent:** precarga datos existentes; explica el consentimiento.
- **Quoting (rol estrella):** a partir del perfil del cliente, propone **filtros óptimos** y un **short-list de planes recomendados**, cada uno con **explicación en lenguaje natural** ("este Silver maximiza tu CSR y cubre a tu médico"). El agente mantiene control manual.
- **Eligibility:** **prellena** la aplicación y valida en segundo plano (coherencia ingreso/household, avisa de posibles *Data Matching Issues*).
- **Documentos:** revisión IA (Reviewing → Verified/Flagged), como ya existe.
- **Transversal:** copiloto que **guía paso a paso, explica conceptos** (APTC, CSR, binder) y **resuelve dudas**; corre **procesos en segundo plano** (prellenado, verificación NIPR, sync del webhook de enrollment).

## 6. Estados de la póliza

**Estado canónico (orden = orden del wizard):** `Consent → Quoting → Eligibility → Documents → Enrollment → Active`.
- `Cliente` es la entrada, no un estado (toda póliza nace con cliente).
- `Quoting` es un estado de **borrador**: el agente cotizó y salió; "Retomar" reabre el wizard.
- El **binder payment** es la acción que transiciona `Enrollment → Active` (no es un estado aparte).
- **Filtros de la lista (tarjetas KPI):** se muestran las buckets `Quoting · Eligibility · Documents · Enrollment · Active`; `Consent` se pliega en el bucket de borrador junto con Quoting (sub-paso breve, no merece tarjeta propia).
- Estado de **firma** corre en paralelo (Waiting / Signature Pending / Signed / Completed), como en el mockup actual.

> Nota de materialización: el wireframe `11-policy-detail.html` mostró `Quoting → Consent` invertido; al construir, usar el orden canónico de arriba.

## 6.b Estética (no negociable en la materialización)

Los wireframes del companion son solo estructura. La implementación debe **mantener la estética actual del mockup**: paleta de marca (`--brand-50..700`), tipografías (Instrument Sans / Google Sans / Inter / Red Hat Text), `shadow-soft`/`shadow-soft-hover`, bordes redondeados, y reutilizar los componentes existentes (`Card`, `NestedCard`, `Badge`, `StatePills`, `AiBadge`, `SelectField`, `InfoField`, `AiSearchBar`). El recoloreo por modo (`agency-mode`) debe seguir funcionando.

## 7. Fuera de alcance (por ahora)

- Flujos guiados de Medicare / Life / Dental (creación simple por ahora).
- Implementación real de las APIs (HealthSherpa, NIPR) — esto es mockup/UI.
- Decisión de negocio EDE (Primary vs downstream vs vendor) — el diseño es agnóstico a ella.
- Modo Agencia: se revisa al final del diseño visual.

## 8. Registro de cambios

- **2026-06-15** — Creación inicial del spec a partir del brainstorming.
