# Registro de Arquitectura Funcional — Aidgency (proyecto Cardali)

**Última actualización:** 2026-06-16
**Estado del proyecto:** Fase de mockup (no existe aún front ni back reales)
**Fuente de verdad:** este archivo (`docs/arch_aidgency.md`), versionado en git. En cada cambio de arquitectura o estructura se actualiza este archivo y se sube una copia fresca al Google Drive (carpeta `/CARDALI`).

**Qué registra este documento:** en qué consiste la plataforma y cómo funciona — qué hace y qué contiene cada pantalla, qué flujos se llevan a cabo, qué acciones puede realizar el usuario y qué reglas de negocio aplican. La estructura técnica va como anexo al final.

---

## 1. Qué es la plataforma

Aidgency es una plataforma de gestión para el negocio de seguros (mercado USA: Medicare, ACA/Obamacare, Life, etc.) con dos perfiles de usuario:

- **Agente (Agent):** gestiona sus contratos con aseguradoras (carriers), las pólizas de sus clientes, sus licencias estatales y sus documentos de cumplimiento.
- **Agencia (Agency):** además de lo anterior, administra su red de agentes: supervisa sus contratos, requerimientos, licencias y desempeño de ventas.

Capacidades transversales:
- **IA integrada ("Aida"):** asistente de chat, revisión automática de documentos subidos (verificación / detección de problemas), búsqueda en lenguaje natural.
- **Bilingüe:** toda la interfaz conmuta entre inglés y español.
- **Mensajería:** comunicación entre agente y representantes del carrier dentro del contexto de cada contrato.

### Conceptos clave del dominio
- **Contrato (contract):** relación agente ↔ aseguradora que habilita al agente a vender productos de ese carrier en ciertos estados. Tiene ciclo de vida (New → In Progress → Approved / Rejected / Expired / Release) y exige cumplir requerimientos documentales.
- **Póliza (policy):** producto vendido a un cliente final. Tiene un pipeline de completitud (Consent → Eligibility → Documents → Payment) y estados de firma.
- **Licencia (license):** habilitación estatal del agente, con vigencia y estados (Active / Expiring Soon / Expired).
- **Requerimiento (requirement):** documento o acción pendiente para avanzar un contrato (W-9, copia de licencia, E&O Insurance, firma electrónica, background check, o personalizados).

---

## 2. Modos de usuario

Un toggle global ("Cambiar Vista") alterna entre modo Agente y modo Agencia (en la plataforma real serán roles distintos). Diferencias principales:

| Área | Agente | Agencia |
|---|---|---|
| Dashboard | Comisiones esperadas, embudo de pólizas, notificaciones de póliza | Ingresos de agencia, ranking de agentes, acciones pendientes agregadas |
| Contratos | Solo los propios; columna "Agency" | Los de toda la red; columna "Agent" + toggle "Share with Upline" |
| Detalle de contrato | Requerimientos (subir docs) + Mensajes | + Info del agente, Seguimiento (follow-up) y Registro de actividad; gestiona requerimientos |
| Pólizas | Solo las propias | Las de toda la red; columna Agent (NPN + tipo de referido) |
| Perfil | Info personal, Documentos, Licencias, Configuración | Solo Info personal y Configuración |
| Mi Agencia | No existe | Gestión de la red de agentes |

---

## 3. Pantallas y módulos

### 3.1 Dashboard (Inicio)

**Propósito:** resumen ejecutivo de la actividad: dinero, pipeline, alertas y accesos rápidos.

**Contenido:**
- Saludo personalizado.
- **Bloque financiero** — Agente: "Comisiones Esperadas" con desglose de próximos pagos por carrier (nº de pólizas, fecha y monto). Agencia: "Ingresos de la Agencia" con variación % y gráfico de barras semanal.
- **Bloque de pipeline** — Agente: embudo de pólizas (Approach → Negotiation → Agreement → Sold). Agencia: "Ventas por Agente" con top agents y bottom agents ("necesitan atención").
- **Bloque de alertas** — Agente: notificaciones de póliza (firma pendiente, documentos listos, requiere atención; con marca de IA si está flagged). Agencia: "Acciones Necesarias" agregadas (mensajes no leídos y requerimientos pendientes de toda la red).
- **Notificaciones de Contrato:** mini-tabla (ID, carrier, estado US, línea de negocio, agente, flags de IA, estado del contrato) con botón "Ver todo".
- **Estado de Contratos:** contadores clicables de Aprobados / En Progreso / Rechazados.
- **Licencias:** contadores clicables de Activas / Próximas a vencer / Expiradas.
- **Noticias:** tarjetas de novedades (nuevos carriers disponibles, sesiones de training).

**Acciones y flujos:**
- Click en un contador de contratos → lista de Contratos prefiltrada por ese estado.
- Click en contador de licencias → Perfil, pestaña Licencias.
- Click en una notificación de contrato o "Ver todo" → Detalle de contrato / lista de Contratos.

**Reglas visibles:** la IA marca (flag) pólizas y contratos con problemas; los contadores reflejan totales distintos por modo (individuales vs. agregados de la red).

### 3.2 Contratos (lista)

**Propósito:** ver, filtrar y crear solicitudes de contratación con aseguradoras. Es el centro de operaciones del onboarding agente↔carrier.

**Contenido:**
- Tarjetas KPI clicables por estado: Approved, In Progress, Rejected, New, Release Requested, Release Required, Expired (cada una con su contador; actúan como filtros acumulables).
- **Búsqueda IA:** barra en lenguaje natural ("Pregunta lo que sea — contratos, agentes, estados, carriers…").
- Filtros: texto (ID/agencia), carrier, tipo de póliza, agente (solo agencia), y "Limpiar filtros".
- Franja resumen de licencias (activas / próximas a vencer / expiradas; en agencia se desglosa Agencia vs. Principal) con botón "Detalles" → Perfil/Licencias.
- Tabla de contratos: ID, Agente o Agencia (según modo), Carrier, Tipo, Estados cubiertos (pills), Estado, Fecha, Alertas (nº mensajes nuevos + nº requerimientos pendientes) y, en agencia, toggle "Share with Upline".

**Acciones y flujos:**
- "Solicitar Nuevo" → modal **Solicitud de Contrato** (tipo de póliza, aseguradora, estado US) → Submit (en el mockup no persiste).
- Click en fila → Detalle de contrato.
- Toggle "Share with Upline" (agencia): comparte/oculta el contrato hacia el upline sin salir de la tabla.
- Filtros por columna (dropdown por cabecera: orden A→Z / Z→A u opciones del campo).

**Reglas:** los estados de contrato y su semántica de color: Approved (verde), In Progress (azul), New / Expired (gris), Rejected (rojo), Release Requested / Release Required (amarillo). "Release" se refiere a la liberación del agente de su contrato con un carrier/upline.

### 3.3 Detalle de contrato

**Propósito:** gestionar un contrato concreto de principio a fin: requerimientos, comunicación con el carrier, seguimiento interno y auditoría.

**Contenido:**
- Sidebar con ficha del contrato (agencia, carrier, línea de negocio, agente, NPN, licencia requerida) y **línea de tiempo de estado** (New ✓ → In Progress ✓ con nota del bloqueo actual, p. ej. "Esperando W-9" → Approved pendiente).
- Pestañas: **Requerimientos** y **Mensajes** (ambos modos); **Información del Agente**, **Seguimiento** y **Registro de Actividad** (solo agencia).

**Pestaña Requerimientos:**
- *Modo agente:* tarjetas de requerimientos divididas en Pendientes y Completados. Cada tarjeta indica qué falta, fecha límite y la acción ("Subir Archivo", "Ir a Perfil"). Cuando un documento se sube, pasa por revisión de IA en vivo ("AI Reviewing…", ~30 segundos) y termina en "AI Verified" o flagged.
- *Modo agencia:* panel de gestión con barra de progreso (% completado), botón "+ Add Requirement" (formulario: título, descripción, fecha límite), y listas Pending / Completed con checkbox para marcar completado y badge "Agent uploaded" cuando el agente ya subió el documento.

**Pestaña Mensajes:** chat con el representante del carrier (p. ej. "el W-9 que subiste está borroso, ¿podrías subir una copia más clara?"). Entrada de texto + envío.

**Pestaña Seguimiento (agencia):** bitácora manual tipada — entradas de tipo **Action**, **Decision** o **Note**, con autor, rol y timestamp (p. ej. una Decision de escalamiento si no llega el W-9 corregido en fecha).

**Pestaña Registro de Actividad (agencia):** log automático auditable de todo lo ocurrido: creación del contrato, cambios de estado (por System), documentos subidos, mensajes recibidos, requerimientos añadidos, flags de IA ("AI flagged W-9 Form as blurry" by Aidgency AI), activación de Share with Upline — cada evento con actor y fecha.

**Flujos:** se llega desde la lista de Contratos, el Dashboard, el panel de notificaciones (directo a Mensajes) o el perfil de un agente. "Ir a Perfil" lleva al Perfil propio para completar datos.

### 3.4 Pólizas (lista) — rediseñado 2026-06-15 (ACA-first)

**Propósito:** ver y filtrar la cartera de pólizas y arrancar el ciclo de vida completo de una póliza ACA dentro de la plataforma (quoting → eligibility → enrollment), asistido por IA.

**Contenido:**
- **Tarjetas KPI cuadradas** como filtro de estado (mismo componente que Contratos), ordenadas por pipeline: `Quoting · Eligibility · Documents · Enrollment · Active`.
- Búsqueda IA + filtros (cliente, tipo, carrier; agente en agencia).
- Tabla: [Agente — solo agencia], Cliente (nombre, teléfono, ubicación+zip), Tipo (badge **ACA**), Carrier · Plan, **APTC** (subsidio), Fecha efectiva, Estado (StageBadge). Las pólizas en `Quoting` se muestran como **borrador** con botón **Retomar** que reabre el wizard donde se dejó.

**Acciones y flujos:**
- "+ Nueva Póliza" → **wizard de creación** (no un modal): 7 pasos (ver §3.4b).
- Click en fila → Detalle de póliza.

**Reglas:** estado canónico `Consent → Quoting → Eligibility → Documents → Enrollment → Active`; `Quoting` es borrador; el binder payment transiciona Enrollment→Active; el estado de firma corre en paralelo.

### 3.4b Wizard de creación de póliza (ACA)

Flujo lineal con barra de progreso de 7 pasos; **guardar y salir** en cualquier paso (la póliza queda en ese estado). Aida asiste inline en cada paso.

1. **Cliente** (obligatorio): elegir existente o crear nuevo; incluye bloque Hogar/Miembros (agregar miembros que se guardan en el cliente).
2. **Consent**: consentimiento agent-of-record (requisito CMS/EDE).
3. **Quoting** (saltable): inputs a la izquierda, planes en vivo a la derecha con APTC estimado y short-list recomendado por Aida; multi-selección de candidatos.
4. **Eligibility**: aplicación al Marketplace prellenada por Aida → APTC/CSR reales; validación en segundo plano (Data Matching Issues).
5. **Documentos**: recolección con revisión IA (Verified/Flagged/Pendiente).
6. **Enrollment**: lanza el flujo hosted/deeplink de HealthSherpa; retorno por webhook (backend-agnóstico).
7. **Binder / Active**: registro del pago de la primera prima que efectúa la cobertura.

### 3.4c Clientes (sección de nivel superior, nueva) — 2026-06-15

**Propósito:** CRM de clientes, separado de las pólizas. Es una sección top-level del nav (Overview · Contracts · Policies · **Clients**).

**Contenido:**
- **Lista:** tarjetas de cliente (avatar, nombre, ubicación, nº pólizas, tamaño de hogar, ingreso) + búsqueda IA + "+ Nuevo Cliente".
- **Perfil de cliente:** sidebar con quick facts (pólizas, hogar, ingreso, FPL, agente) + "+ Nueva póliza" / "Editar". Pestañas: **Datos** (default, jerarquizada en 4 secciones — Identidad, Ubicación [ZIP/County clave para cotizar], Hogar y finanzas [decide subsidio], Elegibilidad — + datos adicionales colapsados), **Pólizas** (del cliente), **Hogar/Miembros** (tabla con dos flags: household tributario y solicita cobertura), **Pagos**, **Documentos**.

**Regla de datos:** los miembros del hogar son del **cliente**, no de la póliza (fuente única); editables desde el perfil o desde el wizard.

### 3.5 Detalle de póliza

**Propósito:** expediente completo de una póliza: datos del asegurado, plan, documentos legales y progreso.

**Contenido (rediseñado 2026-06-15):**
- **Pipeline superior** de 5 hitos (`Quoting · Eligibility · Documents · Enrollment · Active`) con el actual resaltado, y una franja **"Retomar en <estado> →"** que reabre el wizard en el paso correspondiente si la póliza no está Active.
- Sidebar **Ficha**: nº, cliente, carrier, plan, **APTC**, prima neta, fecha efectiva, asegurados, estado de firma; enlace **"Ir al perfil de cliente"**.
- Pestañas: **Policy Summary** (info del seguro + titular + dirección + documentos legales con revisión IA), **Plan y subsidio**, Policy Members, **Documentos** (revisión IA), **Enrollment** (estado del flujo hosted), Activities.

**Acciones y flujos:** volver a la lista; cambiar de pestaña; **Retomar** entra al wizard en el paso del estado actual; "Ir al perfil de cliente" navega al perfil del cliente real asociado.

### 3.6 Perfil del usuario

**Propósito:** datos personales, documentos de cumplimiento y licencias del usuario actual.

**Contenido (menú lateral):**
- **Información Personal** (ambos modos): ficha con nombre, apellidos, nacimiento, género, SSN enmascarado, contacto y dirección; botón "Editar Perfil".
- **Documentos** (solo agente): tarjetas por documento básico con su estado — Licencia de Conducir ("Falta Documento" → "Subir ID"), Formulario W-9 ("Cargado" + AI Verified → "Actualizar Archivo"), E&O Insurance ("Cargado", con vencimiento → "Ver Detalles").
- **Licencias** (solo agente): lista filtrable por Active / Próx. vencer / Expiradas; cada licencia muestra estado US, tipo (Health and Life, etc.), número, estados cubiertos, fecha de expiración y verificación de IA. Botón "Añadir nueva licencia".
- **Configuración** (ambos): placeholder "en desarrollo".

**Flujos:** se llega desde el botón de perfil del navbar, desde los contadores de licencias del Dashboard, desde la franja de licencias de Contratos y desde requerimientos tipo "Completar Perfil".

### 3.7 Mi Agencia (solo agencia)

**Propósito:** gestión de la red de agentes de la agencia.

**Contenido:**
- KPIs: total de agentes, activos, total de contratos de la red.
- Búsqueda IA + búsqueda por nombre/NPN.
- Tabla de agentes: nombre, NPN, estados licenciados (pills), total de contratos, total de pólizas, estado (Active/Inactive/Pending), fecha de ingreso. Columnas ordenables/filtrables.
- Botón "+ Invite Agent" (invitación de nuevos agentes a la red — flujo aún no implementado).

**Flujos:** click en un agente → Perfil de agente.

### 3.8 Perfil de agente (solo agencia)

**Propósito:** vista 360º de un agente de la red desde la perspectiva de la agencia.

**Contenido:**
- Sidebar: avatar, nombre, rol, estado, NPN, contratos y pólizas totales, fecha de ingreso, estados licenciados; tarjeta de alerta con el nº de requerimientos pendientes (clicable).
- Pestañas: **Agent Information** (datos de contacto y resumen de contratos/pólizas), **Requirements & Contracts** (lista de requerimientos pendientes del agente + lista de sus contratos, cada uno navegable al detalle), **Licenses** (licencias con estado y expiración).

**Flujos:** se llega desde Mi Agencia; desde aquí se navega al detalle de cualquier contrato del agente.

### 3.9 Aida — asistente de IA (global)

**Propósito:** asistente conversacional disponible en toda la app (botón flotante).

**Contenido y comportamiento:**
- Panel de chat con presentación de capacidades: redactar y revisar contratos, buscar información de agentes o pólizas, subir y organizar documentos, verificar licencias y cumplimiento, resumir requerimientos pendientes.
- Sugerencias rápidas: "Draft a contract", "Search agent info", "Upload a document", "Check license status", "Summarize requirements".
- En el mockup responde con un placeholder ("coming soon"); en la plataforma real será el punto de entrada de las capacidades de IA.

### 3.10 Notificaciones (global)

**Propósito:** bandeja rápida de mensajes recientes desde el navbar (campana con indicador de no leídos).

**Comportamiento:** lista de mensajes con remitente, contrato y carrier asociados, hora y preview; los no leídos se destacan. Click en un mensaje → Detalle del contrato, pestaña Mensajes. Enlace "Ver todos los mensajes" (bandeja completa, pendiente).

---

## 4. Flujos end-to-end

**Ciclo de vida de un contrato:**
1. El agente crea una "Solicitud de Contrato" (tipo de póliza + carrier + estado US) → estado **New**.
2. Pasa a **In Progress**: se generan requerimientos (W-9, copia de licencia, E&O, firma, background check…). La agencia puede añadir requerimientos propios con fecha límite.
3. El agente sube documentos → la IA los revisa automáticamente (Reviewing → Verified o Flagged). Si hay problema (p. ej. W-9 borroso) la IA lo marca, queda en el registro de actividad y el carrier puede pedir corrección por mensajes.
4. La agencia hace seguimiento (Actions / Decisions / Notes) y marca requerimientos como completados.
5. Resolución: **Approved**, **Rejected**, o más adelante **Expired** / **Release Requested** / **Release Required**.
6. Todo queda auditado en el Registro de Actividad (actor + evento + fecha, incluidos eventos de System y de Aidgency AI).

**Ciclo de vida de una póliza (ACA, rediseñado 2026-06-15):**
1. Alta desde "+ Nueva Póliza" → wizard. Paso 1 obliga a elegir/crear cliente.
2. Avanza por el wizard: **Cliente → Consent → Quoting (saltable) → Eligibility → Documentos → Enrollment → Binder/Active**. Estado canónico de la póliza: `Consent → Quoting → Eligibility → Documents → Enrollment → Active` (`Quoting` = borrador). Estado de firma en paralelo.
3. Quoting usa la API de HealthSherpa (objetivo) con APTC estimado; Eligibility determina APTC/CSR reales; Enrollment se hace vía flujo hosted de HealthSherpa con retorno por webhook; el binder payment efectúa la cobertura (Active).
4. Aida asiste en cada paso (recomendación de planes, prellenado, validación, revisión de documentos). La comisión esperada se proyecta en el Dashboard a partir de las pólizas activas por carrier.

**Cumplimiento de licencias:** las licencias estatales alimentan los contadores del Dashboard y la franja de Contratos; al acercarse el vencimiento pasan a "Expiring Soon" (alerta) y luego "Expired". Renovación/alta desde Perfil → Licencias.

---

## 5. Funcionalidad de IA (transversal)

| Capacidad | Dónde aparece | Estados |
|---|---|---|
| Revisión de documentos | Requerimientos de contrato, documentos del perfil, documentos legales de pólizas | AI Reviewing… (en curso) → AI Verified / AI Flagged (con motivo, p. ej. "blurry", "expiring soon") |
| Búsqueda en lenguaje natural | Contratos, Pólizas, Mi Agencia (AiSearchBar) | — |
| Asistente conversacional (Aida) | Global (botón flotante) | Placeholder en el mockup |
| Eventos de IA auditados | Registro de Actividad del contrato | Actor "Aidgency AI" |

---

## 6. Catálogos y estados del dominio

- **Estados de contrato:** Approved · In Progress · New · Expired · Rejected · Release Requested · Release Required.
- **Estados de póliza:** Completed · Waiting · Signature Pending · Signed. Pipeline interno: Consent / Eligibility / Documents / Payment.
- **Estados de licencia:** Active · Expiring Soon · Expired.
- **Estados de agente (red):** Active · Inactive · Pending.
- **Tipos de póliza:** Medicare Advantage, Medicare Supplement, Health (ACA / Marketplace), Life Insurance, Dental & Vision, Short-Term Health, Long-Term Care.
- **Aseguradoras (catálogo inicial, 10):** Aetna, Ambetter, Anthem Blue Cross, Blue Cross Blue Shield, Cigna, Humana, Molina Healthcare, Oscar Health, UnitedHealthcare, WellCare.
- **Tipos de requerimiento:** W-9 Form, License Copy, E&O Insurance, Electronic Signature, Background Check + personalizados (título, descripción, fecha límite).
- **Tipos de seguimiento:** Action · Decision · Note.
- **Tipos de captación de póliza:** Referral · NPN Override · Direct.
- **Entidades:** Agencia, Agente (NPN, estados, licencias, contratos, pólizas, requerimientos pendientes), Contrato, Requerimiento, Mensaje, Entrada de seguimiento, Evento de actividad, Póliza, Cliente/Asegurado (identidad, contacto, estatus migratorio, ingresos, subsidio), Licencia, Documento (con veredicto de IA), Notificación, Noticia.

---

## 7. Anexo técnico — implementación actual (mockup)

- Ubicación: `mockup/` en el repo. Sin build, sin router, sin persistencia; datos hardcodeados.
- `mockup/mockup.html`: shell HTML; Tailwind por CDN con config inline (fuentes Instrument Sans / Google Sans / Inter / Red Hat Text; paleta `brand` 50–700 vía variables CSS; sombras personalizadas); React 18 UMD + Babel standalone.
- `mockup/app.js`: toda la app. Componente raíz `App` con navegación por estado (`currentView` + `viewParams`), contextos `ModeContext` (agent/agency) y `LangContext` (en/es), diccionario de traducciones `T`. Vistas nuevas del rediseño: `ClientsListView`, `ClientProfileView`, `PolicyWizardView` (con pasos `StepClient`/`StepConsent`/`StepQuoting`/`StepEligibility`/`StepDocuments`/`StepEnrollment`/`StepBinder`). Componentes nuevos: `StatusFilterCards`, `StageBadge`, `AidaHint`, `DataSection`.
- `mockup/styles.css`: tokens de marca (`--brand-50..700`), fondo, clase `agency-mode` en `body` que recolorea la marca según el modo.
- Datos mock a sustituir por API: `AGENTS_DATA`, `CONTRACT_NOTIFS`, `NOTIFICATIONS`, `POLICIES_DATA` (con `stage/aptc/plan/clientId`), `CLIENTS_DATA` (con `household`), `POLICY_TYPES`, `INSURANCE_COMPANIES`, `US_STATES`, `CONTRACT_STATUSES`, `STATUS_PILLS`, `AIDA_SUGGESTIONS`.
- Limitación conocida: la prosa larga dentro de los pasos del wizard (textos de Aida) está solo en español; labels/columnas/botones sí son bilingües.

## 8. Arquitectura objetivo (pendiente de definir)

Aún sin decidir. Defaults del proyecto a validar cuando arranque el desarrollo real: frontend React/Next.js; backend Python/FastAPI o Node/TypeScript; base de datos Supabase; cloud AWS o GCP. Cuando se definan, documentar aquí módulos de backend, modelo de datos, APIs y servicios de IA.

### Integraciones objetivo (verificadas por investigación, 2026-06)
- **Quoting/Enrollment ACA → HealthSherpa ONE API.** Quoting self-serve (API key, on/off-exchange en 50 estados+DC con estimación APTC). Enrollment vía flujo hosted/deeplinks + webhooks (approval-gated, partner onboarding). Permite usar HealthSherpa como vendor EDE sin convertirse en Primary EDE entity.
- **Eligibility ACA:** única aplicación al Marketplace que determina APTC (subsidio) y CSR (solo planes Silver), según ingreso y tamaño del hogar.
- **Enrollment NO es obligatoriamente externo:** bajo EDE se completa in-platform (Classic DE retirado el 31/10/2025). El diseño es backend-agnóstico (hosted hoy, in-line si Aidgency obtiene su propio EDE).
- **Licencias → NIPR PDB API:** verificación en tiempo real (refresh diario) de licencias y appointments por NPN (vía Gateway o reseller; FCRA permissible purpose).
- **Medicare es un ecosistema separado** (Sunfire/Connecture/MedicareCENTER/Integrity, SOA, AEP/OEP/SEP, reglas TPMO) — fuera del alcance ACA-first actual; requiere su propia investigación antes de diseñar su flujo.

---

## 9. Registro de cambios de este documento

- **2026-06-16** — Rediseño de Pólizas (ACA-first) implementado en el mockup: tarjetas KPI cuadradas de estado (también en Contratos), wizard de creación de 7 pasos (Cliente→Consent→Quoting→Eligibility→Documentos→Enrollment→Binder/Active) con Aida inline, detalle de póliza con pipeline + Retomar. Nueva sección top-level **Clientes** (lista + perfil con Datos primero y Hogar/Miembros con dos flags). Integraciones objetivo verificadas (HealthSherpa ONE, eligibility Marketplace APTC/CSR, NIPR, separación ACA/Medicare). Copia subida a Drive `/CARDALI`. Spec: `docs/superpowers/specs/2026-06-15-polizas-redesign-design.md`.
- **2026-06-11** — Reestructuración a registro funcional: propósito, contenido, acciones, flujos y reglas por pantalla; flujos end-to-end; catálogos del dominio; anexo técnico. Sustituye a la primera versión (solo estructural).
- **2026-06-11** — Creación inicial a partir del mockup existente.
