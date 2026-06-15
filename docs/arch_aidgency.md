# Registro de Arquitectura Funcional — Aidgency (proyecto Cardali)

**Última actualización:** 2026-06-11
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

### 3.4 Pólizas (lista)

**Propósito:** ver y filtrar la cartera de pólizas de clientes finales y dar de alta nuevas.

**Contenido:**
- Búsqueda IA + filtros: nombre de cliente, tipo de póliza, carrier, agente (solo agencia).
- Pills de estado clicables como filtro: Completed (verde), Waiting (azul), Signature Pending (amarillo), Signed (gris).
- Tabla: [Agente con NPN y tipo de captación — solo agencia], Cliente (nombre, teléfono, email), Ubicación (estado + zip), Tipo de póliza (con subsidio y grupo de ingreso CSR), Carrier (con plan y nº de asegurados), Fecha de efectividad, Estado + **matriz de progreso 2×2** (Consent / Eligibility / Documents / Payment, ✓ o ✗ cada uno).
- Tipos de captación del agente (badge): Referral, NPN Override, Direct.

**Acciones y flujos:**
- "Nueva Póliza" → modal **Agregar Póliza** (cliente, fecha de efectividad, carrier anterior, carrier, tipo de póliza).
- Click en fila → Detalle de póliza (con el id de la póliza).

**Reglas:** una póliza está operativamente completa cuando los 4 pasos del pipeline (consentimiento, elegibilidad, documentos, pago inicial/binder) están cumplidos; el estado de firma corre en paralelo.

### 3.5 Detalle de póliza

**Propósito:** expediente completo de una póliza: datos del asegurado, plan, documentos legales y progreso.

**Contenido:**
- Barra de progreso superior de 4 pasos: Consent → Eligibility → Pending Documents → Binder Payment.
- Sidebar con la ficha: nº de póliza, cliente, agente, agencia, tipo, carrier, pago mensual, fecha de efectividad, miembros y nivel de ingreso familiar, grupo de ingreso, referido y tipo, fechas de creación/actualización.
- Pestañas: **Policy Summary** (activa), Policy Members, Activities, Document Signing, Attachments, Tracking (estas cinco son placeholders "coming soon" en el mockup — funcionalidad planificada).
- Policy Summary: tarjeta de información del seguro (NPN del marketplace, plan, subsidio, pago mensual, member ID), datos completos del titular (identidad, contacto, SSN, país de nacimiento, estatus migratorio, estado civil, dirección), dirección postal, y tabla de **documentos legales** con verificación de IA (p. ej. Employment Authorization → "AI Flagged: expiring soon"; State ID → "AI Verified").

**Acciones y flujos:** volver a la lista; cambiar de pestaña; enlace "Go to Client Profile" (apunta a un futuro módulo de perfil de cliente, aún inexistente).

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

**Ciclo de vida de una póliza:**
1. Alta desde "Agregar Póliza" (cliente, fechas, carriers, tipo).
2. Avanza por el pipeline: **Consent → Eligibility → Documents → Binder Payment**, en paralelo con el estado de firma (Waiting / Signature Pending / Signed / Completed).
3. Los documentos legales del cliente se verifican con IA (verified / flagged, p. ej. permiso de trabajo próximo a vencer).
4. La comisión esperada del agente se proyecta en el Dashboard a partir de las pólizas activas por carrier.

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
- `mockup/app.js` (~3.100 líneas): toda la app. Componente raíz `App` con navegación por estado (`currentView` + `viewParams`), contextos `ModeContext` (agent/agency) y `LangContext` (en/es), diccionario de traducciones `T`.
- `mockup/styles.css`: tokens de marca (`--brand-50..700`), fondo, clase `agency-mode` en `body` que recolorea la marca según el modo.
- Vistas: `DashboardView`, `ContractsView`, `ContractDetailView`, `PoliciesView`, `PolicyDetailView`, `ProfileView`, `MyAgencyView`, `AgentProfileView`; overlays `AidaChat` y panel de notificaciones.
- UI base reutilizable: `Card`, `NestedCard`, `Badge`, `StatePills`, `AiBadge`, `ShareToggle`, `SelectField`, `InfoField`, `PolicyFilterPill`, `ColDropdown`, `AiSearchBar`, `Icons`, `TwistyBarChart`, `NewsCard`.
- Datos mock a sustituir por API: `AGENTS_DATA`, `CONTRACT_NOTIFS`, `NOTIFICATIONS`, `POLICIES_DATA`, `POLICY_TYPES`, `INSURANCE_COMPANIES`, `US_STATES`, `CONTRACT_STATUSES`, `STATUS_PILLS`, `AIDA_SUGGESTIONS`.

## 8. Arquitectura objetivo (pendiente de definir)

Aún sin decidir. Defaults del proyecto a validar cuando arranque el desarrollo real: frontend React/Next.js; backend Python/FastAPI o Node/TypeScript; base de datos Supabase; cloud AWS o GCP. Cuando se definan, documentar aquí módulos de backend, modelo de datos, APIs y servicios de IA.

---

## 9. Registro de cambios de este documento

- **2026-06-11** — Reestructuración a registro funcional: propósito, contenido, acciones, flujos y reglas por pantalla; flujos end-to-end; catálogos del dominio; anexo técnico. Sustituye a la primera versión (solo estructural).
- **2026-06-11** — Creación inicial a partir del mockup existente.
