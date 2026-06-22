## 2026-06-09 — Mockup: 7 cambios de UI + split de tarjetas de stats
- Agent dashboard: "Weekly Sales" → "Expected Commissions" (estimado $3,180 + desglose de próximos pagos por carrier).
- Dashboard: números de Contract Status y Licenses ahora en tiles; separados en dos NestedCards de media fila (lg:col-span-2 c/u).
- Contratos (agencia): columna toggle "Share with Upline" (Yes/No, estado local en ContractsView).
- Contratos (ambos modos): columna compacta de alertas (icono mensajes + reloj con contadores newMessages/pendingReqsCount).
- Detalle de contrato (agencia): pestañas nuevas Follow-up (FollowUpPanel: registro Action/Decision/Note con form) y Activity Log (ActivityLogPanel: timeline estática).
- Contratos y licencias: múltiples estados por registro; componente StatePills muestra hasta 3 acrónimos + [+x] con tooltip al hover (CSS .state-more/.state-tooltip en styles.css). Aplicado a tabla de contratos, sidebar de licencias, ProfileView licencias y columna States de My Agency.
- Iconos: Icons.Clock ahora acepta size; nuevo Icons.MessageCircle. Nuevos componentes: ShareToggle, StatePills.
- Verificado en navegador headless (ambos modos, sin errores de consola). Warnings preexistentes: clave duplicada "policies" en T.en/T.es.

## 2026-06-09 — Dashboard: grid de filas fijas con spans personalizables
- Nuevo sistema .dash-grid (styles.css): grid-auto-rows fijo vía --dash-row (11.5rem); cada tarjeta declara col-span × row-span en su wrapper.
- Layout: filas 1-2 = Commissions/Revenue (2×2) + Policy Status/Agent Sales (1×2) + Policy Notifs/Needed Actions (1×2); filas 3-4 = Contract Notifications (2×2) + Contract Status (2×1) apilado sobre Licenses (2×1); fila 5 = News (4×1 horizontal).
- Needed Actions (agencia) movido del slot inferior al lateral derecho (1×2); News ahora es fila inferior en ambos modos; NewsCard ganó prop horizontal.
- Verificado en navegador en ambos modos, sin errores de consola.

## 2026-06-09 — Contratos: sidebar de licencias → franja resumen horizontal
- Eliminado el sidebar fijo (w-80) de licencias en ContractsView (ambos modos); la tabla de contratos ahora ocupa todo el ancho.
- Nueva franja delgada sobre la tabla: conteos Active/Expiring/Expired con puntos de color (agente: 40/2/1; agencia: grupos Agency 12/4/2 y Principal 28/7/5 separados por divisor) + botón "Details →" que navega a Profile → Licenses.
- Limpieza: removidos licenseFilter y allLicenses (estado/datos muertos) de ContractsView.
- Decisión tomada con el usuario vía AskUserQuestion (opción franja resumen, recomendada, sobre drawer o solo enlace).
