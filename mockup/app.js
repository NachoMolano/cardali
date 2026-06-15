const { useState, useEffect } = React;

// --- Iconos SVG (Reusables) ---
const ModeContext = React.createContext('agent');
const useMode = () => React.useContext(ModeContext);

const LangContext = React.createContext('en');
const useLang = () => React.useContext(LangContext);

const T = {
  en: {
    overview:'Overview', contracts:'Contracts', policies:'Policies', toggleView:'Toggle View',
    welcome:'Welcome, Nacho', subtitle:"Here's your activity summary.",
    weeklySales:'Weekly Sales', agencyRevenue:'Agency Revenue',
    expectedCommissions:'Expected Commissions', estimated:'Estimated', upcomingPayouts:'Upcoming payouts', policiesLabel:'policies',
    shareUpline:'Share with Upline', followUp:'Follow-up', activityLog:'Activity Log',
    followUpPlaceholder:'Log an action or decision…', addEntry:'Add Entry',
    policyStatus:'Policy Status', agentSales:'Agent Sales',
    policyNotif:'Policy Notifications', news:'News',
    contractNotif:'Contract Notifications', viewAll:'View all',
    contractStatus:'Contract Status', licenses:'Licenses',
    active:'Active', expiring:'Expiring', expired:'Expired',
    approved:'Approved', inProgress:'In Progress', newStatus:'New', rejected:'Rejected',
    releaseRequested:'Release Requested', releaseRequired:'Release Required',
    neededActions:'Needed Actions', unreadMessages:'Unread Messages', pendingReqs:'Pending Requirements',
    topAgents:'Top Agents', bottomAgents:'Need Attention', thisMonth:'This Month',
    agent:'Agent', lob:'Line of Business',
    myContracts:'My Contracts', requestNew:'+ Request New',
    listContracts:'List of contracts', noContracts:'No contracts match the current filters.',
    idCol:'ID', agencyCol:'Agency', carrierCol:'Carrier', typeCol:'Policy Type',
    stateCol:'Location', statusCol:'Status', dateCol:'Date',
    licencias:'Licenses', activas:'Active', proxVencer:'Expiring Soon', expiradas:'Expired',
    sinLicencias:'No licenses in this category',
    myPolicies:'My Policies', agencyPolicies:'Agency Policies', newPolicy:'+ New Policy',
    listPolicies:'List of policies', noPolicies:'No policies match the current filters.',
    customerCol:'Customer', locationCol:'Location', policyCol:'Policy', effDateCol:'Effective date',
    generalInfoCol:'General information', editCol:'Edit',
    waitingOnAgent:'Waiting on agent', noSubsidy:'No Subsidy', insured:'Insured',
    referralBadge:'Referral', npnOverrideBadge:'NPN Override', directBadge:'Direct',
    filters:'Filters', clearFilters:'Clear filters',
    aiSearchPlaceholder:'Ask anything — find contracts, agents, statuses, carriers…',
    aiSearchLabel:'AI Search',
    idAgency:'ID / Agency', policyType:'Policy Type', carrier:'Carrier', customer:'Customer',
    contractRequest:'Contract Request', addPolicy:'Add Policy',
    cancel:'Cancel', submit:'Submit', effectiveDate:'Effective Date', prevCarrier:'Previous Carrier',
    agentContracts:'Agent Contracts', agentCol:'Agent', agentFilter:'Agent',
    agentInfo:'Agent Info', details:'Details', licAgency:'Agency', licPrincipal:'Principal',
    myAgency:'My Agency', myAgents:'My Agents', agentName:'Agent Name', npn:'NPN',
    statesLicensed:'States Licensed', totalContracts:'Contracts', totalPolicies:'Policies', joinDate:'Join Date',
    agentProfile:'Agent Profile', backToAgency:'Back to My Agency', agentInfoTab:'Agent Information',
    reqAndContracts:'Requirements & Contracts', pendingReqs2:'Pending Requirements', contractsList:'Contracts',
    phone:'Phone', email:'Email', city:'City', state:'State', address:'Address',
    backToContracts:'Back to contracts', requirements:'Requirements', messages:'Messages',
    backToPolicies:'List of policies',
    polSummary:'Policy Summary', polMembers:'Policy Members', activities:'Activities',
    docSigning:'Document Signing', attachments:'Attachments', tracking:'Tracking',
    insuranceInfo:'Insurance Information', generalInfo:'General Information Owner',
    mailingAddr:'Mailing Address', legalDocs:'Legal Documents', goToProfile:'Go to Client Profile',
    profileTitle:'My Profile', personalInfo:'Personal Information',
    documents:'Documents', licensesNav:'Licenses', settings:'Settings',
    newCarrier:'New Carrier!', newCarrierDesc:'Ambetter is now available in Florida.',
    training:'Training Session', certMedicare:'Medicare Certification',
    signPending:'Signature Pending', docsReady:'Documents ready', needsAttention:'Needs attention',
    hoursAgo:'2h ago', today:'Today', yesterday:'Yesterday',
    policies:'Policies',
    // --- Rediseño Pólizas ---
    tabPolicies:'Policies', tabClients:'Clients',
    stageConsent:'Consent', stageQuoting:'Quoting', stageEligibility:'Eligibility',
    stageDocuments:'Documents', stageEnrollment:'Enrollment', stageActive:'Active',
    resume:'Resume', draft:'draft', newClient:'+ New Client', newClientShort:'New Client',
    noPlan:'— no plan —', planCol:'Carrier · Plan', aptcCol:'APTC', subsidyEst:'est.',
    wzClient:'Client', wzConsent:'Consent', wzQuoting:'Quoting', wzEligibility:'Eligibility',
    wzDocs:'Documents', wzEnrollment:'Enrollment', wzBinder:'Binder',
    wzStepOf:'Step', wzOf:'of', skipQuoting:'Skip quoting', back:'Back',
    continueBtn:'Continue', saveExit:'Save & exit', newPolicyFor:'+ New policy',
    required:'REQUIRED', skippable:'SKIPPABLE',
    secIdentity:'Identity & contact', secLocation:'Location', secLocationTag:'key for quoting',
    secHousehold:'Household & finances', secHouseholdTag:'drives subsidy', secEligibility:'Eligibility',
    secMore:'Additional data', secMoreNote:'(collapsed · rarely used in ACA)',
    household:'Household / Members', addMember:'+ Add member', member:'Member', relation:'Relation',
    dobShort:'Birth', taxHousehold:'Tax household', seeksCoverage:'Seeks coverage',
    editClient:'Edit client', dataTab:'Data', paymentsTab:'Payments',
    quickPolicies:'Policies', quickHousehold:'Household', quickIncome:'Household income',
    quickFpl:'FPL', quickAgent:'Agent',
  },
  es: {
    overview:'Inicio', contracts:'Contratos', policies:'Pólizas', toggleView:'Cambiar Vista',
    welcome:'Bienvenido, Nacho', subtitle:'Aquí está el resumen de tu actividad.',
    weeklySales:'Ventas esta semana', agencyRevenue:'Ingresos de la Agencia',
    expectedCommissions:'Comisiones Esperadas', estimated:'Estimado', upcomingPayouts:'Próximos pagos', policiesLabel:'pólizas',
    shareUpline:'Compartir con Upline', followUp:'Seguimiento', activityLog:'Registro de Actividad',
    followUpPlaceholder:'Registra una acción o decisión…', addEntry:'Agregar',
    policyStatus:'Estado de Pólizas', agentSales:'Ventas por Agente',
    policyNotif:'Notificaciones de Póliza', news:'Noticias',
    contractNotif:'Notificaciones de Contrato', viewAll:'Ver todo',
    contractStatus:'Estado de Contratos', licenses:'Licencias',
    active:'Activos', expiring:'Próximas', expired:'Expiradas',
    approved:'Aprobados', inProgress:'En Progreso', newStatus:'Nuevo', rejected:'Rechazados',
    releaseRequested:'Liberación Solicitada', releaseRequired:'Liberación Requerida',
    neededActions:'Acciones Necesarias', unreadMessages:'Mensajes No Leídos', pendingReqs:'Requerimientos Pendientes',
    topAgents:'Mejores Agentes', bottomAgents:'Necesitan Atención', thisMonth:'Este Mes',
    agent:'Agente', lob:'Línea de Negocio',
    myContracts:'Mis Contratos', requestNew:'+ Solicitar Nuevo',
    listContracts:'Lista de contratos', noContracts:'Ningún contrato coincide con los filtros.',
    idCol:'ID', agencyCol:'Agencia', carrierCol:'Carrier', typeCol:'Tipo Póliza',
    stateCol:'Estado (Loc)', statusCol:'Status', dateCol:'Fecha',
    licencias:'Licencias', activas:'Activas', proxVencer:'Próx. vencer', expiradas:'Expiradas',
    sinLicencias:'Sin licencias en esta categoría',
    myPolicies:'Mis Pólizas', agencyPolicies:'Pólizas de Agencia', newPolicy:'+ Nueva Póliza',
    listPolicies:'Lista de pólizas', noPolicies:'Ninguna póliza coincide con los filtros.',
    customerCol:'Cliente', locationCol:'Ubicación', policyCol:'Póliza', effDateCol:'F. Efectiva',
    generalInfoCol:'Información general', editCol:'Editar',
    waitingOnAgent:'Esperando al agente', noSubsidy:'Sin Subsidio', insured:'Asegurado',
    referralBadge:'Referido', npnOverrideBadge:'NPN Override', directBadge:'Directo',
    filters:'Filtros', clearFilters:'Limpiar filtros',
    aiSearchPlaceholder:'Pregunta lo que sea — contratos, agentes, estados, carriers…',
    aiSearchLabel:'Búsqueda IA',
    idAgency:'ID / Agencia', policyType:'Tipo Póliza', carrier:'Carrier', customer:'Cliente',
    contractRequest:'Solicitud de Contrato', addPolicy:'Agregar Póliza',
    cancel:'Cancelar', submit:'Enviar', effectiveDate:'Fecha Efectiva', prevCarrier:'Carrier Anterior',
    agentContracts:'Contratos de Agentes', agentCol:'Agente', agentFilter:'Agente',
    agentInfo:'Info del Agente', details:'Detalles', licAgency:'Agencia', licPrincipal:'Principal',
    myAgency:'Mi Agencia', myAgents:'Mis Agentes', agentName:'Nombre del Agente', npn:'NPN',
    statesLicensed:'Estados con Licencia', totalContracts:'Contratos', totalPolicies:'Pólizas', joinDate:'Fecha de Ingreso',
    agentProfile:'Perfil del Agente', backToAgency:'Volver a Mi Agencia', agentInfoTab:'Información del Agente',
    reqAndContracts:'Requerimientos y Contratos', pendingReqs2:'Requerimientos Pendientes', contractsList:'Contratos',
    phone:'Teléfono', email:'Email', city:'Ciudad', state:'Estado', address:'Dirección',
    backToContracts:'Volver a contratos', requirements:'Requerimientos', messages:'Mensajes',
    backToPolicies:'Lista de pólizas',
    polSummary:'Resumen de Póliza', polMembers:'Miembros de Póliza', activities:'Actividades',
    docSigning:'Firma de Documentos', attachments:'Adjuntos', tracking:'Seguimiento',
    insuranceInfo:'Información del Seguro', generalInfo:'Información General del Titular',
    mailingAddr:'Dirección de Correspondencia', legalDocs:'Documentos Legales', goToProfile:'Ir al Perfil del Cliente',
    profileTitle:'Mi Perfil', personalInfo:'Información Personal',
    documents:'Documentos', licensesNav:'Licencias', settings:'Configuración',
    newCarrier:'¡Nuevo Carrier!', newCarrierDesc:'Ambetter ya está disponible en Florida.',
    training:'Training Session', certMedicare:'Certificación Medicare',
    signPending:'Firma pendiente', docsReady:'Documentos listos', needsAttention:'Requiere atención',
    hoursAgo:'Hace 2h', today:'Hoy', yesterday:'Ayer',
    policies:'Pólizas',
    // --- Rediseño Pólizas ---
    tabPolicies:'Pólizas', tabClients:'Clientes',
    stageConsent:'Consent', stageQuoting:'Quoting', stageEligibility:'Eligibility',
    stageDocuments:'Documents', stageEnrollment:'Enrollment', stageActive:'Active',
    resume:'Retomar', draft:'borrador', newClient:'+ Nuevo Cliente', newClientShort:'Nuevo Cliente',
    noPlan:'— sin plan —', planCol:'Carrier · Plan', aptcCol:'APTC', subsidyEst:'est.',
    wzClient:'Cliente', wzConsent:'Consent', wzQuoting:'Quoting', wzEligibility:'Eligibility',
    wzDocs:'Documentos', wzEnrollment:'Enrollment', wzBinder:'Binder',
    wzStepOf:'Paso', wzOf:'de', skipQuoting:'Saltar quoting', back:'Atrás',
    continueBtn:'Continuar', saveExit:'Guardar y salir', newPolicyFor:'+ Nueva póliza',
    required:'OBLIGATORIO', skippable:'SALTABLE',
    secIdentity:'Identidad y contacto', secLocation:'Ubicación', secLocationTag:'clave para cotizar',
    secHousehold:'Hogar y finanzas', secHouseholdTag:'decide el subsidio', secEligibility:'Elegibilidad',
    secMore:'Datos adicionales', secMoreNote:'(colapsado · poco usados en ACA)',
    household:'Hogar / Miembros', addMember:'+ Agregar miembro', member:'Miembro', relation:'Relación',
    dobShort:'Nacimiento', taxHousehold:'Household tributario', seeksCoverage:'Solicita cobertura',
    editClient:'Editar cliente', dataTab:'Datos', paymentsTab:'Pagos',
    quickPolicies:'Pólizas', quickHousehold:'Hogar', quickIncome:'Ingreso hogar',
    quickFpl:'FPL', quickAgent:'Agente',
  }
};

const Icons = {
    User: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    FileText: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
    AlertCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
    Clock: ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    MessageCircle: ({ size = 16 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"></path></svg>,
    ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
    Upload: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
    Send: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
    Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    ChevronDown: ({ size = 14, className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>,
    Bell: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    Search: ({ size = 16, className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
    MapPin: ({ size = 14 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    GridMenu: ({ size = 14 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="5" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="19" cy="5" r="1.5"/><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="19" r="1.5"/><circle cx="12" cy="19" r="1.5"/><circle cx="19" cy="19" r="1.5"/></svg>,
};

// --- Componentes UI Base ---
const Card = ({ children, className = "", noPadding = false }) => (
    <div className={`bg-white rounded-2xl border border-slate-200/70 shadow-soft hover:shadow-soft-hover transition-shadow duration-300 ${noPadding ? '' : 'p-5'} ${className}`}>
        {children}
    </div>
);

/* Tarjeta plana única (estilo Donezo): blanco sobre el fondo, título adentro,
   sin marco anidado */
const NestedCard = ({ title, children, className = "", rightAction = null, mainShadow = false }) => (
    <div className={`bg-white rounded-2xl p-5 border border-slate-200/70 shadow-soft transition-shadow duration-300 flex flex-col ${className}`}>
        {title && (
            <div className="flex justify-between items-center pb-3 shrink-0">
                <h3 className="font-semibold text-slate-800 font-display text-[0.9375rem] tracking-tight">{title}</h3>
                {rightAction && <div className="text-sm">{rightAction}</div>}
            </div>
        )}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
            {children}
        </div>
    </div>
);

const Badge = ({ children, variant = 'gray' }) => {
    const variants = {
        green: 'bg-brand-100 text-brand-700',
        red: 'bg-red-100 text-red-700',
        yellow: 'bg-yellow-100 text-yellow-700',
        gray: 'bg-slate-100 text-slate-600',
        blue: 'bg-blue-100 text-blue-700',
        ai: 'bg-blue-50 text-blue-600 border border-blue-200',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap ${variants[variant]}`}>
            {children}
        </span>
    );
};

/* Switch sí/no compacto para filas de tabla (detiene la propagación
   para no disparar la navegación de la fila) */
const ShareToggle = ({ on, onToggle }) => (
    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
        <button
            onClick={onToggle}
            className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${on ? 'bg-brand-500' : 'bg-slate-200'}`}
        >
            <span className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${on ? 'left-[21px]' : 'left-[3px]'}`} />
        </button>
        <span className={`text-xs font-semibold ${on ? 'text-brand-600' : 'text-slate-400'}`}>{on ? 'Yes' : 'No'}</span>
    </div>
);

/* Muestra hasta `max` acrónimos de estados y un [+x]; el listado completo
   aparece al hacer hover sobre el [+x] (CSS .state-more en styles.css) */
const StatePills = ({ states = [], max = 3 }) => {
    const shown = states.slice(0, max);
    const extra = states.length - shown.length;
    return (
        <div className="flex items-center gap-1 flex-wrap">
            {shown.map(s => (
                <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">{s}</span>
            ))}
            {extra > 0 && (
                <span className="state-more relative inline-block">
                    <span className="px-1.5 py-0.5 bg-brand-100 text-brand-700 rounded-md text-xs font-bold cursor-default">+{extra}</span>
                    <span className="state-tooltip absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-slate-800 text-white text-xs font-medium rounded-lg px-3 py-2 shadow-lg z-50 whitespace-nowrap flex-col gap-1">
                        {states.map(s => <span key={s}>{s}</span>)}
                    </span>
                </span>
            )}
        </div>
    );
};

const AiBadge = ({ type = 'verified', label }) => {
    const configs = {
        verified:  { icon: 'stars.png',     text: label || 'AI Verified',   cls: 'bg-blue-50 border border-blue-200 text-blue-600', spin: false },
        reviewing: { icon: 'loading.png',   text: label || 'AI Reviewing…', cls: 'bg-blue-50 border border-blue-200 text-blue-500', spin: true  },
        flagged:   { icon: 'lightning.png', text: label || 'AI Flagged',    cls: 'bg-yellow-50 border border-yellow-300 text-yellow-700', spin: false },
    };
    const c = configs[type] || configs.verified;
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${c.cls}`}>
            <img src={c.icon} className={`w-3 h-3 ${c.spin ? 'ai-spin' : ''}`} alt="AI" />
            {c.text}
        </span>
    );
};

/* Tarjetas KPI cuadradas reutilizables para filtrar por estado (Contratos y Pólizas).
   Tamaño fijo "casi cuadrado" (124x104) idéntico en ambas secciones; envuelven en
   pantallas estrechas. `active` es un Set; `onToggle(key)` alterna el filtro. */
const StatusFilterCards = ({ items, active, onToggle }) => (
    <div className="flex flex-wrap gap-3 mb-5">
        {items.map(it => (
            <button key={it.key} onClick={() => onToggle(it.key)}
                className={`w-[124px] h-[104px] rounded-2xl bg-white shadow-soft hover:shadow-soft-hover transition-all duration-200 flex flex-col items-center justify-center gap-1.5
                    ${active.has(it.key) ? 'ring-2 ring-inset ring-brand-400' : 'hover:scale-[1.02]'}`}>
                <span className={`text-3xl font-bold font-data ${it.color || 'text-slate-700'}`}>
                    {typeof it.count === 'number' ? it.count.toLocaleString() : it.count}
                </span>
                <span className="text-xs text-slate-500 font-medium text-center px-2 leading-tight">{it.label}</span>
            </button>
        ))}
    </div>
);

const TwistyBarChart = () => {
    const data = [
        { day: 'Lun', value: 40 },
        { day: 'Mar', value: 70 },
        { day: 'Mié', value: 45 },
        { day: 'Jue', value: 90, active: true },
        { day: 'Vie', value: 65 },
        { day: 'Sáb', value: 30 },
        { day: 'Dom', value: 50 },
    ];

    const maxVal = 100;
    const height = 110;

    return (
        <div className="relative h-[180px] w-full mt-4 flex-1">
            <div className="absolute top-0 right-0 bg-slate-800 text-white text-xs px-3 py-1 rounded-md shadow-lg z-10 translate-x-2 -translate-y-2 font-data">
                $2,567
            </div>
            <div className="flex justify-between items-end h-full px-2 pb-2">
                {data.map((item, i) => {
                    const barHeight = (item.value / maxVal) * height;
                    return (
                        <div key={i} className="flex flex-col items-center group relative cursor-pointer justify-end h-full pt-4">
                            <div className="opacity-0 group-hover:opacity-100 absolute top-0 bg-slate-800 text-white text-xs px-2 py-1 rounded-md transition-opacity pointer-events-none z-30 font-data">
                                {item.value}%
                            </div>
                            <div className="relative flex justify-center w-full" style={{ height: `${height}px`, marginBottom: '10px' }}>
                                <div className="w-[2px] bg-slate-200/70 rounded-full absolute bottom-0 z-0" style={{ height: `${height}px` }}></div>
                                <div
                                    className={`w-[2px] rounded-full absolute bottom-0 z-10 transition-all duration-500 ease-out ${item.active ? 'bg-slate-800' : 'bg-slate-300 group-hover:bg-brand-400'}`}
                                    style={{ height: `${barHeight}px` }}
                                ></div>
                                <div
                                    className={`absolute z-20 rounded-full transition-all duration-300 -translate-x-1/2 left-1/2 ${item.active ? 'w-3 h-3 bg-slate-800 border-2 border-white' : 'w-2 h-2 bg-slate-400 group-hover:bg-brand-500 group-hover:scale-150'}`}
                                    style={{ bottom: `${barHeight - 4}px` }}
                                ></div>
                            </div>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium transition-colors shrink-0 font-sans ${item.active ? 'bg-slate-800 text-white' : 'text-slate-500 bg-slate-100 group-hover:bg-brand-100 group-hover:text-brand-700'}`}>
                                {item.day[0]}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const AGENTS_DATA = [
    {
        id: 'agent-1', name: 'Ivan Diaz',    initials: 'ID', npn: '18234501',
        states: ['TX', 'FL', 'GA', 'NC', 'SC'], contracts: 12, policies: 87,  status: 'Active',   joined: 'Jan 10 2024',
        phone: '+1 (555) 201-3344', email: 'ivan.diaz@cardali.com',   city: 'Miami',   state: 'Florida',  address: '880 Brickell Ave, Suite 200',
        licenses: [
            { state: 'Texas (TX)',   type: 'Health and Life', number: 'TX-881122', expiry: 'Mar 10 2027', status: 'Active' },
            { state: 'Florida (FL)', type: 'Health',          number: 'FL-334455', expiry: 'Nov 20 2026', status: 'Expiring Soon' },
            { state: 'Georgia (GA)', type: 'Life',            number: 'GA-556677', expiry: 'Jan 05 2025', status: 'Expired' },
        ],
        pendingReqs: ['E&O Insurance renewal', 'Updated W-9 Form'],
        contractsList: ['#1350 · Aetna · FL · Approved', '#1352 · UnitedHealthcare · TX · Approved', '#1355 · Humana · GA · In Progress'],
    },
    {
        id: 'agent-2', name: 'Nacho Molano', initials: 'NM', npn: '11234567',
        states: ['TX', 'NY', 'FL'], contracts: 10, policies: 74,  status: 'Active',   joined: 'Mar 05 2023',
        phone: '+1 (555) 123-4567', email: 'nacho@cardali.com',       city: 'Austin',  state: 'Texas',    address: '123 Main St, Apt 4B',
        licenses: [
            { state: 'Texas (TX)',    type: 'Health and Life', number: 'TX-998877', expiry: 'Apr 08 2028', status: 'Active' },
            { state: 'Florida (FL)',  type: 'Health',          number: 'FL-112233', expiry: 'Dec 15 2026', status: 'Expiring Soon' },
            { state: 'New York (NY)', type: 'Life',            number: 'NY-445566', expiry: 'Jan 01 2027', status: 'Active' },
        ],
        pendingReqs: ['W-9 Form (blurry — reupload required)'],
        contractsList: ['#1349 · Anthem Blue Cross · TX · In Progress', '#1352 · UnitedHealthcare · TX · Approved'],
    },
    {
        id: 'agent-3', name: 'Maria Santos', initials: 'MS', npn: '20938472',
        states: ['TX', 'CA'], contracts: 7, policies: 51, status: 'Active', joined: 'Jun 18 2024',
        phone: '+1 (555) 388-9900', email: 'maria.santos@cardali.com', city: 'Dallas',  state: 'Texas',    address: '500 Commerce St',
        licenses: [
            { state: 'Texas (TX)',      type: 'Health and Life', number: 'TX-772211', expiry: 'Sep 30 2027', status: 'Active' },
            { state: 'California (CA)', type: 'Health',          number: 'CA-990011', expiry: 'Feb 14 2026', status: 'Expiring Soon' },
        ],
        pendingReqs: [],
        contractsList: ['#1351 · Cigna · NY · Release Requested', '#1354 · Ambetter · TX · Rejected'],
    },
    {
        id: 'agent-4', name: 'Pedro Gil',    initials: 'PG', npn: '30192847',
        states: ['FL'], contracts: 1, policies: 8, status: 'Inactive', joined: 'Sep 01 2024',
        phone: '+1 (555) 470-2211', email: 'pedro.gil@cardali.com',   city: 'Orlando', state: 'Florida',  address: '77 Lake Shore Blvd',
        licenses: [
            { state: 'Florida (FL)', type: 'Health', number: 'FL-664433', expiry: 'Aug 01 2025', status: 'Expiring Soon' },
        ],
        pendingReqs: ['License Copy', 'Background Check', 'E&O Insurance'],
        contractsList: ['#1353 · Humana · FL · In Progress'],
    },
    {
        id: 'agent-5', name: 'Carlos Cruz',  initials: 'CC', npn: '40123856',
        states: ['TX', 'NM'], contracts: 3, policies: 22, status: 'Active', joined: 'Nov 14 2023',
        phone: '+1 (555) 512-6677', email: 'carlos.cruz@cardali.com', city: 'El Paso', state: 'Texas',    address: '222 Border Ave',
        licenses: [
            { state: 'Texas (TX)',      type: 'Health and Life', number: 'TX-441100', expiry: 'Jun 20 2027', status: 'Active' },
            { state: 'New Mexico (NM)', type: 'Health',          number: 'NM-882244', expiry: 'Mar 15 2026', status: 'Expiring Soon' },
        ],
        pendingReqs: ['Electronic Signature pending'],
        contractsList: ['#1354 · Ambetter · TX · Rejected', '#1356 · Cigna · NM · Approved'],
    },
    {
        id: 'agent-6', name: 'Sofia Reyes',  initials: 'SR', npn: '50928374',
        states: ['CA', 'AZ', 'NV', 'OR'], contracts: 8, policies: 63, status: 'Active', joined: 'Feb 22 2024',
        phone: '+1 (555) 633-8822', email: 'sofia.reyes@cardali.com', city: 'Phoenix', state: 'Arizona',  address: '1400 Desert Sun Dr',
        licenses: [
            { state: 'California (CA)', type: 'Health and Life', number: 'CA-113355', expiry: 'Oct 10 2027', status: 'Active' },
            { state: 'Arizona (AZ)',     type: 'Health',          number: 'AZ-224466', expiry: 'Jul 08 2026', status: 'Active' },
            { state: 'Nevada (NV)',      type: 'Life',            number: 'NV-335577', expiry: 'Apr 30 2025', status: 'Expired' },
        ],
        pendingReqs: [],
        contractsList: ['#1357 · Aetna · CA · Approved', '#1358 · Ambetter · AZ · Approved'],
    },
    {
        id: 'agent-7', name: 'Andres Vega',  initials: 'AV', npn: '60183920',
        states: ['TX'], contracts: 0, policies: 3, status: 'Pending', joined: 'Apr 30 2025',
        phone: '+1 (555) 744-1100', email: 'andres.vega@cardali.com', city: 'Houston', state: 'Texas',    address: '300 Main St',
        licenses: [],
        pendingReqs: ['License Copy', 'W-9 Form', 'Background Check', 'E&O Insurance', 'Electronic Signature'],
        contractsList: [],
    },
];

const CONTRACT_NOTIFS = [
    { id: '#992', carrier: 'Ambetter',  state: 'Florida', lob: 'Health (ACA)',   agent: 'Ivan Diaz',    status: 'Rejected',          variant: 'red'    },
    { id: '#712', carrier: 'Aetna',     state: 'Utah',    lob: 'Medicare Adv.', agent: 'Nacho Molano', status: 'Release Required',  variant: 'yellow', aiFlag: true },
    { id: '#881', carrier: 'Cigna',     state: 'Texas',   lob: 'Life',          agent: 'Maria Santos', status: 'Approved',          variant: 'green'  },
];

/* horizontal=true: los ítems van lado a lado (para la fila delgada
   inferior del dashboard); por defecto se apilan en columna */
const NewsCard = ({ t, horizontal = false }) => (
    <div className={horizontal ? 'flex h-full divide-x divide-slate-100 items-stretch' : 'flex flex-col h-full justify-start'}>
        <div className={`cursor-pointer group ${horizontal ? 'flex-1 pr-6 flex flex-col justify-center' : 'py-4 border-b border-slate-100'}`}>
            <div className="flex justify-between items-start mb-1">
                <span className="text-brand-500 font-semibold text-sm group-hover:text-brand-600 transition-colors">{t.newCarrier}</span>
                <span className="text-[10px] text-slate-400 font-data">{t.today}</span>
            </div>
            <p className="text-sm font-medium text-slate-700">{t.newCarrierDesc}</p>
        </div>
        <div className={`cursor-pointer group flex items-center justify-between ${horizontal ? 'flex-1 pl-6' : 'py-4 border-b border-slate-100'}`}>
            <div>
                <p className="font-semibold text-sm text-slate-800 mb-1 group-hover:text-brand-600 transition-colors">{t.training}</p>
                <p className="text-xs text-slate-500">{t.certMedicare}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold text-slate-700 font-data">Mar 14</p>
                <p className="text-[10px] text-slate-400 font-data">8:30 AM</p>
            </div>
        </div>
    </div>
);

const DashboardView = ({ navigateTo }) => {
    const mode = useMode();
    const lang = useLang();
    const t = T[lang];
    const isAgency = mode === 'agency';

    const contractStats = isAgency
        ? { approved: 312, inProgress: 240, rejected: 85 }
        : { approved: 8,   inProgress: 40,  rejected: 10 };
    const licenseStats = isAgency
        ? { active: 180, expiring: 14, expired: 6 }
        : { active: 40,  expiring: 2,  expired: 1  };

    return (
    <div className="fade-in space-y-5">
        <header className="mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight font-display">{t.welcome}</h1>
            <p className="text-slate-500 mt-2 font-data text-lg">{t.subtitle}</p>
        </header>

        {/* Grid de filas fijas (.dash-grid en styles.css): cada tarjeta declara
            cuántas columnas (col-span) y filas (row-span) ocupa; el grosor de
            fila se personaliza con --dash-row */}
        <div className="dash-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Expected Commissions / Agency Revenue — 2 col × 2 filas */}
            <div className="md:col-span-2 row-span-2 flex flex-col">
                {isAgency ? (
                    <NestedCard title={t.agencyRevenue} mainShadow={true} className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-5xl font-bold text-slate-800 font-data">$148,500.00</div>
                            <Badge variant="green">+23%</Badge>
                        </div>
                        <TwistyBarChart />
                    </NestedCard>
                ) : (
                    <NestedCard title={t.expectedCommissions} mainShadow={true} className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="text-5xl font-bold text-slate-800 font-data">$3,180.00</div>
                                <p className="text-xs text-slate-400 mt-1 font-data">Jun – Aug 2026</p>
                            </div>
                            <Badge variant="blue">{t.estimated}</Badge>
                        </div>
                        <div className="mt-3 flex-1">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">{t.upcomingPayouts}</p>
                            {[
                                { carrier: 'Aetna',    detail: `12 ${t.policiesLabel} · Medicare Advantage`, date: 'Jun 30', amount: '$1,240.00' },
                                { carrier: 'Ambetter', detail: `8 ${t.policiesLabel} · Health (ACA)`,        date: 'Jul 15', amount: '$980.00'   },
                                { carrier: 'Cigna',    detail: `3 ${t.policiesLabel} · Life`,                date: 'Jul 31', amount: '$960.00'   },
                            ].map((row, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{row.carrier}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{row.detail}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-800 font-data">{row.amount}</p>
                                        <p className="text-[10px] text-slate-400 font-data">{row.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </NestedCard>
                )}
            </div>

            {/* Policy Status (agent) / Agent Sales (agency) — 1 col × 2 filas */}
            <div className="row-span-2 flex flex-col">
                {!isAgency ? (
                    <NestedCard title={t.policyStatus} className="flex-1 flex flex-col">
                        <div className="flex-1 flex items-end justify-between gap-2 h-40 pt-4">
                            {[
                                { label: 'Approach',    val: 100, color: 'bg-brand-200' },
                                { label: 'Negotiation', val: 70,  color: 'bg-brand-300' },
                                { label: 'Agreement',   val: 50,  color: 'bg-brand-400' },
                                { label: 'Sold',        val: 20,  color: 'bg-brand-600' }
                            ].map((step, i) => (
                                <div key={i} className="flex flex-col items-center flex-1 group h-full justify-end">
                                    <div className="w-full relative bg-slate-50 rounded-t-lg flex items-end justify-center h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
                                        <div className={`w-full ${step.color} rounded-t-lg transition-all duration-500`} style={{height:`${step.val}%`}}></div>
                                        <span className="absolute bottom-2 text-white font-bold text-sm drop-shadow-md font-data">{step.val}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 mt-2 font-medium truncate w-full text-center uppercase tracking-wider">{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </NestedCard>
                ) : (
                    <NestedCard title={t.agentSales} className="flex-1 flex flex-col">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-3">{t.thisMonth}</p>
                        <div className="flex gap-3 flex-1">
                            {/* Top agents */}
                            <div className="flex-1">
                                <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-2">{t.topAgents}</p>
                                {[
                                    { name: 'Ivan Diaz',    count: 12 },
                                    { name: 'Nacho Molano', count: 10 },
                                    { name: 'Maria Santos', count: 7  },
                                ].map((a, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-slate-400 w-4">{i+1}</span>
                                            <span className="text-sm font-medium text-slate-700">{a.name}</span>
                                        </div>
                                        <span className="text-xs font-bold bg-slate-100 text-slate-900 px-2 py-0.5 rounded-md">{a.count}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="w-px bg-slate-100"></div>
                            {/* Bottom agents */}
                            <div className="flex-1">
                                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">{t.bottomAgents}</p>
                                {[
                                    { name: 'Pedro Gil',   count: 1 },
                                    { name: 'Carlos Cruz', count: 3 },
                                ].map((a, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                                        <span className="text-sm font-medium text-slate-700">{a.name}</span>
                                        <span className="text-xs font-bold bg-slate-100 text-slate-900 px-2 py-0.5 rounded-md">{a.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </NestedCard>
                )}
            </div>

            {/* Policy Notifications (agent) / Needed Actions (agency) — 1 col × 2 filas */}
            <div className="row-span-2 flex flex-col">
                {!isAgency ? (
                    <NestedCard title={t.policyNotif} className="flex-1">
                        <div className="flex flex-col h-full justify-start">
                            {[
                                { title: 'Aetna Health',      desc: t.signPending,    time: t.hoursAgo,  dot: 'bg-slate-400', aiFlag: false },
                                { title: 'Ambetter Medicare', desc: t.docsReady,      time: t.today,     dot: 'bg-slate-400', aiFlag: false },
                                { title: 'Cigna Life',        desc: t.needsAttention, time: t.yesterday, dot: 'bg-slate-400', aiFlag: true  },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 py-4 border-b border-slate-100 last:border-0 group cursor-pointer">
                                    <div className={`w-2 h-2 mt-1.5 rounded-full ${item.dot} shrink-0`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">{item.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                        {item.aiFlag && <div className="mt-1"><AiBadge type="flagged" label="AI Alert" /></div>}
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-data">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </NestedCard>
                ) : (
                    <NestedCard title={t.neededActions} className="flex-1 flex flex-col">
                        <div className="flex flex-col gap-4 flex-1 justify-center">
                            <div onClick={() => navigateTo('contracts')} className="flex items-center gap-4 p-4 rounded-xl bg-red-50 border border-red-100 cursor-pointer hover:bg-red-100 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center shrink-0 group-hover:bg-red-200 transition-colors">
                                    <Icons.Bell />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-slate-900 font-data leading-none">23</div>
                                    <div className="text-xs text-red-400 font-semibold mt-1">{t.unreadMessages}</div>
                                </div>
                            </div>
                            <div onClick={() => navigateTo('contracts')} className="flex items-center gap-4 p-4 rounded-xl bg-yellow-50 border border-yellow-100 cursor-pointer hover:bg-yellow-100 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center shrink-0 group-hover:bg-yellow-200 transition-colors">
                                    <Icons.Clock />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-slate-900 font-data leading-none">47</div>
                                    <div className="text-xs text-yellow-600 font-semibold mt-1">{t.pendingReqs}</div>
                                </div>
                            </div>
                        </div>
                    </NestedCard>
                )}
            </div>

            {/* Contract Notifications (ambos modos) — 2 col × 2 filas */}
            <div className="md:col-span-2 row-span-2 flex flex-col">
                <NestedCard title={t.contractNotif} rightAction={<button onClick={() => navigateTo('contracts')} className="text-brand-600 hover:text-brand-700 font-medium font-sans">{t.viewAll}</button>} className="flex-1">
                    <div className="flex flex-col">
                        {CONTRACT_NOTIFS.map((notif, i) => (
                            <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 group cursor-pointer" onClick={() => navigateTo('contract-detail')}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-700 font-data text-xs group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors shrink-0">
                                        {notif.id}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800 text-sm group-hover:text-brand-600 transition-colors">{notif.carrier}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{notif.state} · {notif.lob} · {t.agent}: {notif.agent}</p>
                                        {notif.aiFlag && <div className="mt-1"><AiBadge type="flagged" label="AI detected: missing field" /></div>}
                                    </div>
                                </div>
                                <Badge variant={notif.variant}>{notif.status}</Badge>
                            </div>
                        ))}
                    </div>
                </NestedCard>
            </div>

            {/* Contract Status — 2 col × 1 fila (apilado sobre Licenses) */}
            <div className="md:col-span-2 flex flex-col">
                <NestedCard title={t.contractStatus} className="flex-1 flex flex-col">
                    <div className="grid grid-cols-3 gap-3 flex-1 content-center">
                        {[
                            { val: contractStats.approved,   label: t.approved,   tab: 'Approved'    },
                            { val: contractStats.inProgress, label: t.inProgress, tab: 'In Progress' },
                            { val: contractStats.rejected,   label: t.rejected,   tab: 'Rejected'    },
                        ].map(s => (
                            <div key={s.label} onClick={() => navigateTo('contracts', { tab: s.tab })}
                                className="bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-2 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-50 hover:border-brand-200 hover:-translate-y-1 transition-all duration-200">
                                <div className="text-3xl font-bold text-slate-900 font-data">{s.val}</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest text-center">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </NestedCard>
            </div>

            {/* Licenses — 2 col × 1 fila */}
            <div className="md:col-span-2 flex flex-col">
                <NestedCard title={t.licenses} className="flex-1 flex flex-col">
                    <div className="grid grid-cols-3 gap-3 flex-1 content-center">
                        {[
                            { val: licenseStats.active,   label: t.activas  },
                            { val: licenseStats.expiring, label: t.expiring },
                            { val: licenseStats.expired,  label: t.expired  },
                        ].map(s => (
                            <div key={s.label} onClick={() => navigateTo('profile', { tab: 'licenses' })}
                                className="bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-2 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-50 hover:border-brand-200 hover:-translate-y-1 transition-all duration-200">
                                <div className="text-3xl font-bold text-slate-900 font-data">{s.val}</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest text-center">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </NestedCard>
            </div>

            {/* News (ambos modos) — 4 col × 1 fila, ítems en horizontal */}
            <div className="md:col-span-2 lg:col-span-4 flex flex-col">
                <NestedCard title={t.news} className="flex-1 flex flex-col">
                    <NewsCard t={t} horizontal />
                </NestedCard>
            </div>

        </div>
    </div>
    );
};

const POLICY_TYPES = [
    'Medicare Advantage',
    'Medicare Supplement',
    'Health (ACA / Marketplace)',
    'Life Insurance',
    'Dental & Vision',
    'Short-Term Health',
    'Long-Term Care',
];

const INSURANCE_COMPANIES = [
    'Aetna', 'Ambetter', 'Anthem Blue Cross', 'Blue Cross Blue Shield',
    'Cigna', 'Humana', 'Molina Healthcare', 'Oscar Health',
    'UnitedHealthcare', 'WellCare',
];

const US_STATES = [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
    'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
    'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
    'New Hampshire','New Jersey','New Mexico','New York','North Carolina',
    'North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
    'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
    'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

const SelectField = ({ label, value, onChange, options, placeholder }) => (
    <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
        <div className="relative">
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-700 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer pr-10"
            >
                <option value="">{placeholder}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Icons.ChevronDown />
            </div>
        </div>
    </div>
);

const NewContractModal = ({ onClose }) => {
    const lang = useLang();
    const t = T[lang];
    const [policyType, setPolicyType] = useState('');
    const [company,    setCompany]    = useState('');
    const [state,      setState]      = useState('');

    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center z-[201] pointer-events-none px-4">
                <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md pointer-events-auto fade-in">
                    <h2 className="text-2xl font-bold text-slate-800 mb-1 font-display">{t.contractRequest}</h2>
                    <div className="space-y-5 mt-7">
                        <SelectField label={t.policyType} value={policyType} onChange={setPolicyType} options={POLICY_TYPES} placeholder="Select policy type…" />
                        <SelectField label="Insurance Company" value={company} onChange={setCompany} options={INSURANCE_COMPANIES} placeholder="Select company…" />
                        <SelectField label="State" value={state} onChange={setState} options={US_STATES} placeholder="Select state…" />
                    </div>
                    <div className="flex justify-end items-center gap-5 mt-8">
                        <button onClick={onClose} className="text-slate-400 font-medium underline underline-offset-2 hover:text-slate-600 transition-colors text-sm">{t.cancel}</button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-2.5 rounded-lg font-semibold transition-colors shadow-sm text-sm">{t.submit}</button>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

const ColDropdown = ({ col, open, onToggle, onSelect, activeFilter }) => {
    const btnRef = React.useRef(null);
    const [pos, setPos] = React.useState({ top: 0, left: 0 });

    React.useEffect(() => {
        if (open && btnRef.current) {
            const r = btnRef.current.getBoundingClientRect();
            setPos({ top: r.bottom + 4, left: r.left });
        }
    }, [open]);

    const menu = open ? ReactDOM.createPortal(
        <div
            style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
            className="bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 min-w-[150px]"
            onClick={e => e.stopPropagation()}
        >
            {col.options.map(opt => (
                <button
                    key={opt.label}
                    onClick={() => onSelect(col.key, opt.value)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2
                        ${activeFilter === opt.value
                            ? 'text-brand-600 bg-brand-50 font-medium'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                >
                    {opt.icon && <span className="text-slate-400">{opt.icon}</span>}
                    {opt.label}
                </button>
            ))}
        </div>,
        document.body
    ) : null;

    return (
        <th className="p-5 font-medium">
            <button
                ref={btnRef}
                onClick={(e) => { e.stopPropagation(); onToggle(col.key); }}
                className={`flex items-center gap-1.5 group whitespace-nowrap transition-colors ${open ? 'text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <span>{col.label}</span>
                <span className={`flex items-center justify-center w-4 h-4 rounded-md bg-slate-100 group-hover:bg-brand-100 transition-colors ${open ? 'bg-brand-100' : ''} ${activeFilter ? 'bg-brand-200' : ''}`}>
                    <Icons.ChevronDown className={`transition-transform duration-200 ${open ? 'rotate-180 text-brand-600' : 'text-slate-400'} ${activeFilter ? 'text-brand-600' : ''}`} />
                </span>
            </button>
            {menu}
        </th>
    );
};

const CONTRACT_STATUSES = ['Approved', 'In Progress', 'New', 'Expired', 'Rejected', 'Release Requested', 'Release Required'];
const contractStatusVariant = s => ({
    'Approved':          'green',
    'In Progress':       'blue',
    'New':               'gray',
    'Expired':           'gray',
    'Rejected':          'red',
    'Release Requested': 'yellow',
    'Release Required':  'yellow',
}[s] || 'gray');

const AiSearchBar = ({ placeholder }) => {
    const [query, setQuery] = React.useState('');
    const lang = useLang();
    const t = T[lang];
    const active = query.length > 0;
    return (
        <div className={`flex items-center gap-3 w-full mb-5 px-4 py-3 rounded-xl border transition-all duration-200 bg-white
            ${active ? 'border-blue-400 shadow-soft-hover' : 'border-slate-200 hover:border-blue-300 hover:shadow-soft'}`}>
            <img src="lightning.png" alt="AI" className="w-5 h-5 flex-shrink-0 opacity-80" />
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={placeholder || t.aiSearchPlaceholder}
                className="flex-1 text-sm bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 min-w-0"
            />
            <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-500 border border-blue-200">
                {t.aiSearchLabel}
            </span>
        </div>
    );
};

const ContractsView = ({ navigateTo, initialTab }) => {
    const lang = useLang();
    const t = T[lang];
    const mode = useMode();
    const isAgency = mode === 'agency';

    const [activeStatuses, setActiveStatuses] = useState(
        initialTab && initialTab !== 'All' && CONTRACT_STATUSES.includes(initialTab) ? new Set([initialTab]) : new Set()
    );
    const [openDropdown, setOpenDropdown] = useState(null);
    const [colFilters,   setColFilters]   = useState({});
    const [showModal,    setShowModal]    = useState(false);
    const [filterSearch,  setFilterSearch]  = useState('');
    const [filterCarrier, setFilterCarrier] = useState('');
    const [filterType,    setFilterType]    = useState('');
    const [filterAgent,   setFilterAgent]   = useState('');

    const AGENTS = ['Ivan Diaz', 'Nacho Molano', 'Maria Santos', 'Pedro Gil', 'Carlos Cruz'];

    const agentColumns = isAgency ? [
        { key: 'id',      label: t.idCol,      options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'agent',   label: t.agentCol,   options: AGENTS.map(a => ({ label: a, value: a })) },
        { key: 'carrier', label: t.carrierCol, options: INSURANCE_COMPANIES.map(c => ({ label: c, value: c })) },
        { key: 'type',    label: t.typeCol,    options: POLICY_TYPES.map(p => ({ label: p, value: p })) },
        { key: 'state',   label: t.stateCol,   options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'status',  label: t.statusCol,  options: CONTRACT_STATUSES.map(s => ({ label: s, value: s })) },
        { key: 'date',    label: t.dateCol,    options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
    ] : [
        { key: 'id',      label: t.idCol,      options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'agency',  label: t.agencyCol,  options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'carrier', label: t.carrierCol, options: INSURANCE_COMPANIES.map(c => ({ label: c, value: c })) },
        { key: 'type',    label: t.typeCol,    options: POLICY_TYPES.map(p => ({ label: p, value: p })) },
        { key: 'state',   label: t.stateCol,   options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'status',  label: t.statusCol,  options: CONTRACT_STATUSES.map(s => ({ label: s, value: s })) },
        { key: 'date',    label: t.dateCol,    options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
    ];

    const allData = [
        { id: '#1349', agency: 'Cardali', agent: 'Nacho Molano', carrier: 'Anthem Blue Cross',  type: 'Medicare Advantage',        states: ['TX','OK','NM','LA'],           status: 'In Progress',       date: '12 May 2026', newMessages: 1, pendingReqsCount: 1 },
        { id: '#1350', agency: 'Cardali', agent: 'Ivan Diaz',    carrier: 'Aetna',              type: 'Health (ACA / Marketplace)', states: ['FL'],                          status: 'Approved',          date: '10 May 2026', newMessages: 0, pendingReqsCount: 0 },
        { id: '#1351', agency: 'Direct',  agent: 'Maria Santos', carrier: 'Cigna',              type: 'Life Insurance',             states: ['NY','NJ','CT'],                status: 'Release Requested', date: '08 May 2026', newMessages: 2, pendingReqsCount: 0 },
        { id: '#1352', agency: 'Cardali', agent: 'Ivan Diaz',    carrier: 'UnitedHealthcare',   type: 'Medicare Advantage',        states: ['TX'],                          status: 'Approved',          date: '01 May 2026', newMessages: 0, pendingReqsCount: 2 },
        { id: '#1353', agency: 'Cardali', agent: 'Pedro Gil',    carrier: 'Humana',             type: 'Health (ACA / Marketplace)', states: ['FL','GA'],                     status: 'New',               date: '28 Apr 2026', newMessages: 0, pendingReqsCount: 3 },
        { id: '#1354', agency: 'Direct',  agent: 'Carlos Cruz',  carrier: 'Ambetter',           type: 'Health (ACA / Marketplace)', states: ['TX','NM','AZ','CO','UT'],      status: 'Rejected',          date: '25 Apr 2026', newMessages: 1, pendingReqsCount: 0 },
    ];

    // Toggle "Share with Upline" por contrato (solo vista de agencia)
    const [shareUpline, setShareUpline] = useState({ '#1349': true, '#1350': true, '#1351': false, '#1352': true, '#1353': false, '#1354': false });
    const toggleShare = id => setShareUpline(prev => ({ ...prev, [id]: !prev[id] }));

    useEffect(() => {
        const close = () => setOpenDropdown(null);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, []);

    const toggleStatus = s => setActiveStatuses(prev => {
        const next = new Set(prev);
        next.has(s) ? next.delete(s) : next.add(s);
        return next;
    });

    const visibleRows = allData.filter(row => {
        if (activeStatuses.size > 0 && !activeStatuses.has(row.status)) return false;
        if (filterSearch && !row.id.toLowerCase().includes(filterSearch.toLowerCase()) && !row.agency.toLowerCase().includes(filterSearch.toLowerCase())) return false;
        if (filterCarrier && row.carrier !== filterCarrier) return false;
        if (filterType && row.type !== filterType) return false;
        if (filterAgent && row.agent !== filterAgent) return false;
        return true;
    });

    const hasFilters = filterSearch || filterCarrier || filterType || filterAgent;
    const colSpanCount = isAgency ? 9 : 8;

    return (
        <div className="fade-in">
            {showModal && <NewContractModal onClose={() => setShowModal(false)} />}

            <div className="flex justify-between items-center mb-5">
                <h1 className="text-5xl font-bold text-slate-800 tracking-tight font-display">
                    {isAgency ? t.agentContracts : t.myContracts}
                </h1>
                <button onClick={() => setShowModal(true)} className="bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-700 transition-colors shadow-soft">
                    {t.requestNew}
                </button>
            </div>

            {/* KPI cards — agency only */}
            <div className="grid grid-cols-4 gap-4 mb-5">
                {[
                    { label: t.approved,         count: isAgency ? 312  : 8,  color: 'text-brand-700',  status: 'Approved'          },
                    { label: t.inProgress,       count: isAgency ? 1571 : 24, color: 'text-blue-700',   status: 'In Progress'       },
                    { label: t.rejected,         count: isAgency ? 3646 : 5,  color: 'text-red-700',    status: 'Rejected'          },
                    { label: t.newStatus,        count: isAgency ? 35   : 3,  color: 'text-slate-600',  status: 'New'               },
                    { label: t.releaseRequested, count: isAgency ? 13   : 2,  color: 'text-yellow-700', status: 'Release Requested' },
                    { label: t.releaseRequired,  count: isAgency ? 57   : 4,  color: 'text-yellow-700', status: 'Release Required'  },
                    { label: t.expired,          count: isAgency ? 42   : 6,  color: 'text-slate-600',  status: 'Expired'           },
                ].map(kpi => (
                    <button key={kpi.label}
                        onClick={() => toggleStatus(kpi.status)}
                        className={`text-center py-4 px-3 rounded-xl shadow-soft transition-all duration-200 hover:shadow-soft-hover
                            ${activeStatuses.has(kpi.status)
                                ? 'bg-white ring-2 ring-inset ring-brand-400'
                                : 'bg-white hover:scale-[1.02]'}`}>
                        <p className={`text-3xl font-bold font-data ${kpi.color}`}>{kpi.count.toLocaleString()}</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">{kpi.label}</p>
                    </button>
                ))}
            </div>

            <AiSearchBar />

            <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.filters}</span>
                <div className={`flex items-center gap-2 border rounded-lg pl-3 pr-4 py-2 bg-white transition-colors
                    ${filterSearch ? 'border-brand-400 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <Icons.Search className="text-slate-400" size={14} />
                    <input type="text" value={filterSearch} onChange={e => setFilterSearch(e.target.value)}
                        placeholder={t.idAgency}
                        className="text-sm bg-transparent border-none outline-none text-slate-700 w-28 placeholder-slate-400" />
                </div>
                <PolicyFilterPill label={t.carrier}    value={filterCarrier} onChange={setFilterCarrier} options={INSURANCE_COMPANIES} />
                <PolicyFilterPill label={t.policyType} value={filterType}    onChange={setFilterType}    options={POLICY_TYPES} />
                {isAgency && (
                    <PolicyFilterPill label={t.agentFilter} value={filterAgent} onChange={setFilterAgent} options={AGENTS} />
                )}
                {hasFilters && (
                    <button onClick={() => { setFilterSearch(''); setFilterCarrier(''); setFilterType(''); setFilterAgent(''); }}
                        className="text-xs text-slate-400 underline hover:text-slate-600 transition-colors">
                        {t.clearFilters}
                    </button>
                )}
            </div>

            {/* Franja resumen de licencias: reemplaza el antiguo sidebar para que
                la tabla ocupe todo el ancho; el detalle vive en Profile → Licenses */}
            <div className="bg-white rounded-xl shadow-soft px-5 py-3.5 mb-5 flex items-center gap-x-6 gap-y-2 flex-wrap">
                <span className="font-bold text-slate-800 text-sm">{t.licencias}</span>
                {(isAgency ? [
                    { group: t.licAgency,    active: 12, expiring: 4, expired: 2 },
                    { group: t.licPrincipal, active: 28, expiring: 7, expired: 5 },
                ] : [
                    { group: null, active: 40, expiring: 2, expired: 1 },
                ]).map((g, gi) => (
                    <React.Fragment key={gi}>
                        {gi > 0 && <div className="w-px h-5 bg-slate-200"></div>}
                        <div className="flex items-center gap-4 text-sm">
                            {g.group && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{g.group}</span>}
                            <span className="flex items-center gap-1.5 text-slate-700">
                                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                                <span className="font-bold font-data">{g.active}</span> {t.activas}
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-700">
                                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                <span className="font-bold font-data">{g.expiring}</span> {t.proxVencer}
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-700">
                                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                <span className="font-bold font-data">{g.expired}</span> {t.expiradas}
                            </span>
                        </div>
                    </React.Fragment>
                ))}
                <button onClick={() => navigateTo('profile', { tab: 'licenses' })}
                    className="ml-auto text-sm text-brand-600 font-medium hover:text-brand-700 transition-colors whitespace-nowrap">
                    {t.details} →
                </button>
            </div>

            <Card noPadding>
                        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
                            <span className="text-sm font-semibold text-slate-500">{t.listContracts}</span>
                            {activeStatuses.size > 0 && (
                                <div className="flex items-center gap-2">
                                    {[...activeStatuses].map(s => (
                                        <span key={s} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-100 text-brand-700 text-xs font-semibold">
                                            {s}
                                            <button onClick={() => toggleStatus(s)} className="hover:text-brand-900 leading-none">×</button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="overflow-x-auto rounded-b-xl">
                            <table className="w-full text-left border-collapse font-data">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-500 text-sm">
                                        {agentColumns.map(col => (
                                            <ColDropdown
                                                key={col.key}
                                                col={col}
                                                open={openDropdown === col.key}
                                                onToggle={key => setOpenDropdown(openDropdown === key ? null : key)}
                                                onSelect={(k, v) => { setColFilters(p => ({ ...p, [k]: v })); setOpenDropdown(null); }}
                                                activeFilter={colFilters[col.key] ?? null}
                                            />
                                        ))}
                                        {/* Columna compacta de alertas (mensajes / requerimientos) */}
                                        <th className="p-5 font-medium text-slate-400 w-16">
                                            <span title={`${t.unreadMessages} / ${t.pendingReqs}`}><Icons.Bell /></span>
                                        </th>
                                        {isAgency && (
                                            <th className="p-5 font-medium text-slate-500 whitespace-nowrap">{t.shareUpline}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibleRows.map((row, i) => (
                                        <tr key={i}
                                            onClick={() => navigateTo('contract-detail')}
                                            className="border-b border-slate-50 hover:bg-brand-50/50 transition-colors cursor-pointer group"
                                        >
                                            <td className="p-5 font-medium text-slate-800 group-hover:text-brand-600">{row.id}</td>
                                            {isAgency
                                                ? <td className="p-5 text-slate-700 font-medium">{row.agent}</td>
                                                : <td className="p-5 text-slate-600">{row.agency}</td>
                                            }
                                            <td className="p-5 font-medium text-slate-800">{row.carrier}</td>
                                            <td className="p-5 text-slate-600">{row.type}</td>
                                            <td className="p-5"><StatePills states={row.states} /></td>
                                            <td className="p-5">
                                                <Badge variant={contractStatusVariant(row.status)}>{row.status}</Badge>
                                            </td>
                                            <td className="p-5 text-slate-500 text-sm">{row.date}</td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    {row.newMessages > 0 && (
                                                        <span className="relative inline-flex text-blue-500" title={`${row.newMessages} ${t.unreadMessages}`}>
                                                            <Icons.MessageCircle size={16} />
                                                            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">{row.newMessages}</span>
                                                        </span>
                                                    )}
                                                    {row.pendingReqsCount > 0 && (
                                                        <span className="relative inline-flex text-yellow-500" title={`${row.pendingReqsCount} ${t.pendingReqs}`}>
                                                            <Icons.Clock size={16} />
                                                            <span className="absolute -top-1.5 -right-2 bg-yellow-400 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">{row.pendingReqsCount}</span>
                                                        </span>
                                                    )}
                                                    {row.newMessages === 0 && row.pendingReqsCount === 0 && (
                                                        <span className="text-slate-300 text-xs">—</span>
                                                    )}
                                                </div>
                                            </td>
                                            {isAgency && (
                                                <td className="p-5">
                                                    <ShareToggle on={!!shareUpline[row.id]} onToggle={() => toggleShare(row.id)} />
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                    {visibleRows.length === 0 && (
                                        <tr><td colSpan={colSpanCount} className="p-10 text-center text-slate-400 text-sm">{t.noContracts}</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
        </div>
    );
};

const AgencyRequirementsPanel = () => {
    const lang = useLang();
    const t = T[lang];
    const [reqs, setReqs] = useState([
        { id: 1, title: 'W-9 Form',             description: 'Payment processing document.',          due: 'May 19 2026', completed: false, agentUploaded: true  },
        { id: 2, title: 'License Copy',          description: 'Valid state insurance license copy.',   due: 'May 10 2026', completed: true,  agentUploaded: true  },
        { id: 3, title: 'E&O Insurance',         description: 'Errors & Omissions policy proof.',      due: 'May 25 2026', completed: false, agentUploaded: false },
        { id: 4, title: 'Electronic Signature',  description: 'Carrier agreement signed digitally.',   due: 'May 08 2026', completed: true,  agentUploaded: true  },
        { id: 5, title: 'Background Check',      description: 'Third-party background verification.',  due: 'Jun 01 2026', completed: false, agentUploaded: false },
    ]);
    const [showNewReq, setShowNewReq] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc,  setNewDesc]  = useState('');
    const [newDue,   setNewDue]   = useState('');

    const toggle = id => setReqs(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));

    const addReq = () => {
        if (!newTitle.trim()) return;
        setReqs(prev => [...prev, { id: Date.now(), title: newTitle, description: newDesc, due: newDue, completed: false, agentUploaded: false }]);
        setNewTitle(''); setNewDesc(''); setNewDue(''); setShowNewReq(false);
    };

    const pending   = reqs.filter(r => !r.completed);
    const completed = reqs.filter(r =>  r.completed);

    const ReqRow = ({ req }) => (
        <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${req.completed ? 'bg-slate-50 border-slate-100 opacity-70' : 'bg-white border-slate-200 shadow-sm'}`}>
            <button
                onClick={() => toggle(req.id)}
                className={`mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
                    ${req.completed ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-300 hover:border-brand-400'}`}
            >
                {req.completed && <span className="text-xs font-bold leading-none">✓</span>}
            </button>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <h4 className={`font-semibold text-sm ${req.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>{req.title}</h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {req.agentUploaded && !req.completed && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">Agent uploaded</span>
                        )}
                        {req.due && (
                            <span className="text-[10px] text-slate-400 flex items-center gap-1 whitespace-nowrap">⏱ {req.due}</span>
                        )}
                    </div>
                </div>
                {req.description && <p className="text-xs text-slate-500 mt-0.5">{req.description}</p>}
            </div>
        </div>
    );

    return (
        <div className="space-y-6 fade-in">
            {/* Summary bar */}
            <div className="flex items-center gap-4">
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-brand-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.round((completed.length / reqs.length) * 100)}%` }} />
                </div>
                <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">
                    {completed.length} / {reqs.length} complete
                </span>
                <button
                    onClick={() => setShowNewReq(v => !v)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors whitespace-nowrap"
                >
                    + Add Requirement
                </button>
            </div>

            {/* New requirement form */}
            {showNewReq && (
                <div className="bg-brand-50 border border-brand-200 rounded-xl p-5 space-y-3 fade-in">
                    <h4 className="font-semibold text-slate-800 text-sm">New Requirement</h4>
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)}
                        placeholder="Title *"
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand-400 bg-white" />
                    <input value={newDesc} onChange={e => setNewDesc(e.target.value)}
                        placeholder="Description (optional)"
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand-400 bg-white" />
                    <input value={newDue} onChange={e => setNewDue(e.target.value)}
                        placeholder="Due date (optional)"
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand-400 bg-white" />
                    <div className="flex gap-2 justify-end">
                        <button onClick={() => setShowNewReq(false)}
                            className="px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-700 transition-colors">{t.cancel}</button>
                        <button onClick={addReq}
                            className="px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors">{t.submit}</button>
                    </div>
                </div>
            )}

            {/* Pending */}
            {pending.length > 0 && (
                <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-400"></span> Pending ({pending.length})
                    </h3>
                    <div className="space-y-2">{pending.map(r => <ReqRow key={r.id} req={r} />)}</div>
                </div>
            )}

            {/* Completed */}
            {completed.length > 0 && (
                <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-500"></span> Completed ({completed.length})
                    </h3>
                    <div className="space-y-2">{completed.map(r => <ReqRow key={r.id} req={r} />)}</div>
                </div>
            )}
        </div>
    );
};

/* Pestaña de Follow-up (solo agencia): bitácora de acciones y decisiones
   tomadas por los encargados sobre el contrato */
const FOLLOWUP_TYPE_STYLES = {
    Action:   'bg-blue-100 text-blue-700',
    Decision: 'bg-brand-100 text-brand-700',
    Note:     'bg-slate-100 text-slate-600',
};

const FollowUpPanel = () => {
    const lang = useLang();
    const t = T[lang];
    const [entries, setEntries] = useState([
        { id: 1, author: 'Laura Pérez',  initials: 'LP', role: 'Contracting Manager', type: 'Decision',
          text: 'Escalation approved: if the corrected W-9 is not received by May 20, we will request a release from Anthem.',
          date: 'May 14 2026 · 9:12 AM' },
        { id: 2, author: 'Nacho Molano', initials: 'NM', role: 'Agency Manager', type: 'Action',
          text: 'Called Anthem contracting line. Confirmed the contract is in the credentialing queue (7–10 business days).',
          date: 'May 13 2026 · 3:40 PM' },
        { id: 3, author: 'Laura Pérez',  initials: 'LP', role: 'Contracting Manager', type: 'Note',
          text: 'Agent was notified about the blurry W-9. He committed to re-upload it this week.',
          date: 'May 12 2026 · 11:05 AM' },
    ]);
    const [text, setText] = useState('');
    const [type, setType] = useState('Action');

    const addEntry = () => {
        if (!text.trim()) return;
        setEntries(prev => [{ id: Date.now(), author: 'Nacho Molano', initials: 'NM', role: 'Agency Manager', type, text, date: 'Today' }, ...prev]);
        setText('');
    };

    return (
        <div className="space-y-5 fade-in">
            {/* Nueva entrada */}
            <Card>
                <div className="flex items-center gap-2 mb-3">
                    {Object.keys(FOLLOWUP_TYPE_STYLES).map(k => (
                        <button key={k} onClick={() => setType(k)}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors
                                ${type === k ? FOLLOWUP_TYPE_STYLES[k] : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                            {k}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <input value={text} onChange={e => setText(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addEntry()}
                        placeholder={t.followUpPlaceholder}
                        className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand-400 transition-colors" />
                    <button onClick={addEntry}
                        className="px-4 py-2.5 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors whitespace-nowrap">
                        {t.addEntry}
                    </button>
                </div>
            </Card>

            {/* Historial de entradas */}
            <div className="space-y-3">
                {entries.map(e => (
                    <Card key={e.id}>
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">{e.initials}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="font-semibold text-slate-800 text-sm">{e.author}</p>
                                    <span className="text-[10px] text-slate-400">{e.role}</span>
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${FOLLOWUP_TYPE_STYLES[e.type]}`}>{e.type}</span>
                                    <span className="ml-auto text-[10px] text-slate-400 font-data shrink-0">{e.date}</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1.5">{e.text}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

/* Pestaña de Activity Log (solo agencia): historial de eventos del contrato */
const ActivityLogPanel = () => {
    const lang = useLang();
    const t = T[lang];
    const items = [
        { kind: 'share',   label: 'Share with Upline enabled',                  by: 'Nacho Molano',         date: 'May 14 2026 · 4:15 PM'  },
        { kind: 'req',     label: 'Requirement added: E&O Insurance',           by: 'Laura Pérez',          date: 'May 13 2026 · 2:30 PM'  },
        { kind: 'message', label: 'Message received: corrected W-9 requested',  by: 'Miguel (Carrier Rep)', date: 'May 13 2026 · 10:42 AM' },
        { kind: 'ai',      label: 'AI flagged W-9 Form as blurry',              by: 'Aidgency AI',          date: 'May 12 2026 · 6:20 PM'  },
        { kind: 'doc',     label: 'W-9 Form uploaded',                          by: 'Nacho Molano',         date: 'May 12 2026 · 5:58 PM'  },
        { kind: 'status',  label: 'Status changed: New → In Progress',          by: 'System',               date: 'May 12 2026 · 9:00 AM'  },
        { kind: 'status',  label: 'Contract created',                           by: 'Nacho Molano',         date: 'May 10 2026 · 11:30 AM' },
    ];
    const styleFor = {
        status:  'bg-slate-100 text-slate-500',
        doc:     'bg-blue-100 text-blue-600',
        message: 'bg-brand-100 text-brand-600',
        req:     'bg-yellow-100 text-yellow-600',
        ai:      'bg-blue-50 text-blue-500',
        share:   'bg-emerald-100 text-emerald-600',
    };
    const iconFor = {
        status:  <Icons.Clock size={16} />,
        doc:     <Icons.FileText />,
        message: <Icons.MessageCircle size={16} />,
        req:     <Icons.AlertCircle />,
        ai:      <img src="stars.png" className="w-4 h-4" alt="AI" />,
        share:   <Icons.CheckCircle />,
    };
    return (
        <Card noPadding className="fade-in">
            <div className="px-6 pt-5 pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-700">{t.activityLog}</h3>
            </div>
            <div className="divide-y divide-slate-50">
                {items.map((it, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${styleFor[it.kind]}`}>{iconFor[it.kind]}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800">{it.label}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{it.by}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-data shrink-0">{it.date}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const ContractDetailView = ({ navigateTo, initialTab }) => {
    const lang = useLang();
    const t = T[lang];
    const isAgency = useMode() === 'agency';
    const [activeTab, setActiveTab] = useState(initialTab || (isAgency ? 'agentInfo' : 'requirements'));

    return (
        <div className="fade-in">
            <button onClick={() => navigateTo('contracts')} className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors mb-6 font-medium">
                <Icons.ArrowLeft /> {t.backToContracts}
            </button>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 h-fit flex-shrink-0 bg-white rounded-xl shadow-soft p-6">
                    <h2 className="text-2xl font-bold mb-4 text-slate-700 font-display">Contrato #1349</h2>

                    <div className="text-sm mb-6">
                        {[
                            { label: 'Agencia',      value: 'Cardali Insurance Group' },
                            { label: 'Carrier',      value: 'Anthem Blue Cross' },
                            { label: 'Línea (LOB)',  value: 'Medicare Advantage' },
                            { label: 'Agente',       value: 'Nacho Molano' },
                            { label: 'NPN',          value: '11234567' },
                        ].map(row => (
                            <div key={row.label} className="flex justify-between items-center py-3 border-b border-slate-100">
                                <span className="text-slate-400">{row.label}:</span>
                                <span className="font-medium text-slate-700 text-right">{row.value}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center py-3">
                            <span className="text-slate-400">Licencia req:</span>
                            <div className="text-right">
                                <p className="font-medium text-slate-700">TX – Health & Life</p>
                                <Badge variant="green">Activa</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-xl p-5">
                        <h3 className="font-bold mb-4 text-slate-300">Status</h3>
                        <div className="relative pl-4 border-l-2 border-slate-700 space-y-6">
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-brand-500 border-2 border-slate-900"></div>
                                <p className="font-medium text-brand-400 text-sm">New</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-brand-500 border-2 border-slate-900"></div>
                                <p className="font-medium text-brand-400 text-sm">In Progress</p>
                                <p className="text-xs text-slate-500 mt-1">Esperando W-9</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                                <p className="font-medium text-slate-500 text-sm">Approved</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex gap-4 mb-6 border-b border-slate-200">
                        {isAgency && (
                            <button
                                className={`pb-3 px-2 font-medium transition-colors border-b-2 ${activeTab === 'agentInfo' ? 'text-brand-600 border-brand-500' : 'text-slate-500 border-transparent hover:text-slate-800'}`}
                                onClick={() => setActiveTab('agentInfo')}
                            >
                                {t.agentInfo}
                            </button>
                        )}
                        <button
                            className={`pb-3 px-2 font-medium transition-colors border-b-2 ${activeTab === 'requirements' ? 'text-brand-600 border-brand-500' : 'text-slate-500 border-transparent hover:text-slate-800'}`}
                            onClick={() => setActiveTab('requirements')}
                        >
                            {t.requirements}
                        </button>
                        <button
                            className={`pb-3 px-2 font-medium transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'messages' ? 'text-brand-600 border-brand-500' : 'text-slate-500 border-transparent hover:text-slate-800'}`}
                            onClick={() => setActiveTab('messages')}
                        >
                            {t.messages} <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md">1</span>
                        </button>
                        {isAgency && (
                            <button
                                className={`pb-3 px-2 font-medium transition-colors border-b-2 ${activeTab === 'followUp' ? 'text-brand-600 border-brand-500' : 'text-slate-500 border-transparent hover:text-slate-800'}`}
                                onClick={() => setActiveTab('followUp')}
                            >
                                {t.followUp}
                            </button>
                        )}
                        {isAgency && (
                            <button
                                className={`pb-3 px-2 font-medium transition-colors border-b-2 ${activeTab === 'activity' ? 'text-brand-600 border-brand-500' : 'text-slate-500 border-transparent hover:text-slate-800'}`}
                                onClick={() => setActiveTab('activity')}
                            >
                                {t.activityLog}
                            </button>
                        )}
                    </div>

                    {activeTab === 'requirements' && !isAgency && (
                        <div className="space-y-8 fade-in">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span> Pendientes (Faltantes)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-xl p-5 hover:bg-orange-100 transition-colors flex flex-col justify-between group">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-orange-900">W-9 Form</h4>
                                                <Icons.AlertCircle className="text-orange-500" />
                                            </div>
                                            <p className="text-sm text-orange-700 mb-4">Documento requerido para procesamiento de pagos.</p>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-xs font-semibold text-orange-800 flex items-center gap-1"><Icons.Clock /> Vence: 19 Abril</p>
                                            <button className="w-full bg-white text-orange-600 border border-orange-200 py-2 rounded-lg font-medium shadow-sm hover:shadow group-hover:bg-orange-50 flex justify-center items-center gap-2 transition-all">
                                                <Icons.Upload /> Subir Archivo
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between group">
                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-2">Completar Perfil</h4>
                                            <p className="text-sm text-slate-500 mb-4">Falta tu número de teléfono y dirección secundaria.</p>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1"><Icons.Clock /> Vence: 2 Mayo</p>
                                            <button onClick={() => navigateTo('profile')} className="w-full bg-slate-800 text-white py-2 rounded-lg font-medium shadow-soft hover:bg-slate-700 flex justify-center items-center gap-2 transition-all">
                                                Ir a Perfil <Icons.ArrowLeft className="rotate-180" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* AI Reviewing card */}
                                    <div className="rounded-xl p-5 border-2 bg-blue-50/60 ai-pulse-border flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-blue-900">Bank Statement (3 months)</h4>
                                                <img src="loading.png" className="w-5 h-5 ai-spin opacity-50" alt="reviewing" />
                                            </div>
                                            <p className="text-sm text-blue-700 mb-4">Aidgency AI is reviewing this document…</p>
                                            <div className="h-1.5 rounded-full overflow-hidden bg-blue-100">
                                                <div className="h-full w-full ai-shimmer rounded-full" />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 flex-wrap">
                                            <AiBadge type="reviewing" />
                                            <span className="text-xs text-blue-400">Usually ~30 seconds</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Completados
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-4 opacity-80">
                                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                            <Icons.FileText />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-slate-800">Copia de Licencia</h4>
                                            <p className="text-xs text-slate-500">Subido el 10 Mar 2026</p>
                                            <div className="mt-1.5"><AiBadge type="verified" label="Reviewed by AI" /></div>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-4 opacity-70">
                                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                            <Icons.CheckCircle />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-800">Firma Electrónica</h4>
                                            <p className="text-xs text-slate-500">Aprobado por Anthem</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'requirements' && isAgency && (
                        <AgencyRequirementsPanel />
                    )}

                    {activeTab === 'followUp' && isAgency && <FollowUpPanel />}

                    {activeTab === 'activity' && isAgency && <ActivityLogPanel />}

                    {activeTab === 'agentInfo' && (
                        <div className="fade-in space-y-6">
                            {/* Agent header */}
                            <Card>
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                                        NM
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800 font-display">Nacho Molano</h2>
                                        <p className="text-sm text-slate-500">Independent Agent</p>
                                        <Badge variant="green" className="mt-1">Active</Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 border-t border-slate-100 pt-5">
                                    {[
                                        { label: 'NPN',             value: '11234567' },
                                        { label: 'Agency',          value: 'Cardali Insurance Group' },
                                        { label: 'Email',           value: 'nacho@cardali.com' },
                                        { label: 'Phone',           value: '+1 (555) 123-4567' },
                                        { label: 'State',           value: 'Texas (TX)' },
                                        { label: 'City',            value: 'Austin' },
                                    ].map(f => (
                                        <div key={f.label}>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{f.label}</p>
                                            <p className="font-medium text-slate-800">{f.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Agent licenses */}
                            <Card noPadding>
                                <div className="px-6 pt-5 pb-3 border-b border-slate-100">
                                    <h3 className="font-bold text-slate-700">{t.licensesNav}</h3>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    {[
                                        { state: 'Texas (TX)',    type: 'Health and Life', number: 'TX-998877', expiry: 'Apr 08 2028', status: 'Active',        aiVerified: true  },
                                        { state: 'Florida (FL)',  type: 'Health',          number: 'FL-112233', expiry: 'Dec 15 2026', status: 'Expiring Soon', aiVerified: false },
                                        { state: 'New York (NY)', type: 'Life',            number: 'NY-445566', expiry: 'Jan 01 2027', status: 'Active',        aiVerified: false },
                                    ].map((lic, i) => {
                                        const v = lic.status === 'Active' ? 'green' : lic.status === 'Expiring Soon' ? 'yellow' : 'red';
                                        return (
                                            <div key={i} className="flex items-center justify-between px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-slate-800 text-sm">{lic.state}</p>
                                                    <p className="text-xs text-slate-500">{lic.type} · {lic.number}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-slate-400 flex items-center gap-1"><Icons.Clock /> {lic.expiry}</span>
                                                    <Badge variant={v}>{lic.status}</Badge>
                                                    {lic.aiVerified && <AiBadge type="verified" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <Card className="flex-1 flex flex-col h-[500px] p-0 overflow-hidden fade-in border border-slate-200">
                            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">M</div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Miguel (Carrier Rep)</h4>
                                    <p className="text-xs text-slate-500">Anthem Blue Cross</p>
                                </div>
                            </div>
                            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white">
                                <div className="flex justify-start">
                                    <div className="bg-slate-100 text-slate-800 px-4 py-3 rounded-xl rounded-tl-sm max-w-[80%] shadow-sm">
                                        <p className="text-sm">Hola Nacho, estamos revisando tu solicitud. Notamos que el W-9 que subiste está borroso. ¿Podrías subir una copia más clara?</p>
                                        <span className="text-[10px] text-slate-400 mt-2 block">10:42 AM</span>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="bg-brand-500 text-white px-4 py-3 rounded-xl rounded-tr-sm max-w-[80%] shadow-sm">
                                        <p className="text-sm">¡Hola Miguel! Claro que sí, dame un momento y lo subo en la pestaña de requerimientos.</p>
                                        <span className="text-[10px] text-brand-200 mt-2 block text-right">10:45 AM</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-white border-t border-slate-100">
                                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2">
                                    <input type="text" placeholder="Escribe un mensaje..." className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-slate-700" />
                                    <button className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center hover:bg-brand-600 transition-colors">
                                        <Icons.Send />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProfileView = ({ initialTab }) => {
    const [activeTab, setActiveTab] = useState(initialTab || 'personal');
    const [licenseFilter, setLicenseFilter] = useState('Active');
    const lang = useLang();
    const t = T[lang];
    const isAgency = useMode() === 'agency';

    const allLicenses = [
        { state: 'Texas (TX)',    states: ['TX','OK','NM','AR','LA'], type: 'Health and Life', number: 'TX-998877', expiry: '08 Abr 2028', status: 'Active',        aiVerified: true  },
        { state: 'New York (NY)', states: ['NY','NJ','CT'],           type: 'Life',            number: 'NY-445566', expiry: '01 Ene 2027', status: 'Active',        aiVerified: false },
        { state: 'Florida (FL)',  states: ['FL'],                     type: 'Health',          number: 'FL-112233', expiry: '15 Dic 2026', status: 'Expiring Soon', aiVerified: false },
        { state: 'Georgia (GA)',  states: ['GA','SC'],                type: 'Health and Life', number: 'GA-778899', expiry: '03 Mar 2025', status: 'Expired',       aiVerified: false },
    ];
    const menuItems = [
        { id: 'personal',  label: t.personalInfo, icon: <Icons.User /> },
        ...(!isAgency ? [{ id: 'documents', label: t.documents,   icon: <Icons.FileText /> }] : []),
        ...(!isAgency ? [{ id: 'licenses',  label: t.licensesNav, icon: <Icons.CheckCircle /> }] : []),
        { id: 'settings',  label: t.settings,     icon: <Icons.Settings /> },
    ];

    return (
        <div className="fade-in flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-8 space-y-1">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl font-medium transition-all duration-300 ${activeTab === item.id ? 'bg-white text-brand-600 shadow-soft scale-105' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'}`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1">
                {activeTab === 'personal' && (
                    <Card className="fade-in relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-brand-400 to-sky-400"></div>
                        <div className="relative z-10 pt-36 pb-6 px-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-800 font-display">Nacho Molano</h2>
                                    <p className="text-slate-500">{isAgency ? 'Agency Manager' : 'Cardali Agent'}</p>
                                </div>
                                <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-lg font-medium transition-colors">
                                    Editar Perfil
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-6 px-6 border-t border-slate-100">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nombre</label>
                                <p className="font-medium text-slate-800 text-lg">Nacho</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Apellidos</label>
                                <p className="font-medium text-slate-800 text-lg">Molano</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Fecha de Nacimiento</label>
                                <p className="font-medium text-slate-800 text-lg">15 / Sep / 1990</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Género</label>
                                <p className="font-medium text-slate-800 text-lg">Masculino</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Social Security Number</label>
                                <p className="font-medium text-slate-800 text-lg tracking-widest">•••  ••  4782</p>
                            </div>
                            <div className="col-span-2 mt-4">
                                <h4 className="font-bold text-slate-800 mb-4">Contacto & Ubicación</h4>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Teléfono</label>
                                <p className="font-medium text-slate-800 text-lg">+1 (555) 123-4567</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                                <p className="font-medium text-slate-800 text-lg">nacho@example.com</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Estado</label>
                                <p className="font-medium text-slate-800 text-lg">Texas (TX)</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Ciudad</label>
                                <p className="font-medium text-slate-800 text-lg">Austin</p>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Dirección Física</label>
                                <p className="font-medium text-slate-800 text-lg">123 Main St, Apt 4B, 78701</p>
                            </div>
                        </div>
                    </Card>
                )}

                {activeTab === 'documents' && (
                    <div className="fade-in space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 font-display">Documentos Básicos</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="flex flex-col justify-between border-2 border-red-100 bg-red-50/50">
                                    <div>
                                        <Badge variant="red">Falta Documento</Badge>
                                        <h4 className="font-bold text-slate-800 mt-3 text-lg">Licencia de Conducir</h4>
                                        <p className="text-sm text-slate-500 mt-1">Requerido para verificación de identidad general.</p>
                                    </div>
                                    <button className="mt-6 w-full bg-white text-slate-700 border border-slate-200 py-2.5 rounded-lg font-medium shadow-sm hover:shadow hover:border-brand-300 transition-all flex items-center justify-center gap-2">
                                        <Icons.Upload /> Subir ID
                                    </button>
                                </Card>

                                <Card className="flex flex-col justify-between bg-white border border-slate-100">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge variant="green">Cargado</Badge>
                                            <AiBadge type="verified" />
                                        </div>
                                        <h4 className="font-bold text-slate-800 mt-3 text-lg">Formulario W-9</h4>
                                        <p className="text-sm text-slate-500 mt-1">Última actualización: Enero 2026</p>
                                    </div>
                                    <button className="mt-6 w-full bg-slate-50 text-slate-600 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                                        Actualizar Archivo
                                    </button>
                                </Card>

                                <Card className="flex flex-col justify-between bg-white border border-slate-100 opacity-60">
                                    <div>
                                        <Badge variant="green">Cargado</Badge>
                                        <h4 className="font-bold text-slate-800 mt-3 text-lg">E&O Insurance</h4>
                                        <p className="text-sm text-slate-500 mt-1">Vence en Nov 2026</p>
                                    </div>
                                    <button className="mt-6 w-full bg-slate-50 text-slate-600 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                                        Ver Detalles
                                    </button>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'licenses' && (
                    <Card className="fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-800 font-display">{t.licensesNav}</h3>
                            <div className="flex gap-1.5">
                                {[
                                    { key: 'Active',        label: t.activas },
                                    { key: 'Expiring Soon', label: t.proxVencer },
                                    { key: 'Expired',       label: t.expiradas },
                                ].map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setLicenseFilter(tab.key)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap
                                            ${licenseFilter === tab.key
                                                ? 'bg-slate-800 text-white'
                                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            {allLicenses.filter(l => l.status === licenseFilter).map((lic, i) => {
                                const isActive   = lic.status === 'Active';
                                const isExpiring = lic.status === 'Expiring Soon';
                                const avatarCls  = isActive ? 'bg-brand-100 text-brand-700' : isExpiring ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
                                const badgeVariant = isActive ? 'green' : isExpiring ? 'yellow' : 'red';
                                const badgeLabel   = isActive ? 'Activa' : isExpiring ? 'Próxima a vencer' : 'Expirada';
                                return (
                                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-slate-100 rounded-xl hover:border-brand-200 transition-colors bg-slate-50/50">
                                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${avatarCls}`}>
                                                {lic.state.substring(lic.state.indexOf('(')+1, lic.state.indexOf(')'))}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-lg">{lic.state}</h4>
                                                <p className="text-sm text-slate-500">{lic.type} &bull; Nro: {lic.number}</p>
                                                <div className="mt-1.5"><StatePills states={lic.states} /></div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2">
                                            <Badge variant={badgeVariant}>{badgeLabel}</Badge>
                                            {lic.aiVerified && <AiBadge type="verified" />}
                                            <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                                <Icons.Clock /> Expira: {lic.expiry}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            {allLicenses.filter(l => l.status === licenseFilter).length === 0 && (
                                <p className="text-sm text-slate-400 text-center py-8">{t.sinLicencias}</p>
                            )}
                        </div>
                        <button className="mt-6 w-full border-2 border-dashed border-slate-200 text-slate-500 py-4 rounded-xl font-bold hover:bg-slate-50 hover:text-brand-600 hover:border-brand-300 transition-all flex justify-center items-center gap-2">
                            + Añadir nueva licencia
                        </button>
                    </Card>
                )}

                {activeTab === 'settings' && (
                    <Card className="fade-in flex items-center justify-center h-64 text-slate-400">
                        <p>Configuraciones de la cuenta (En desarrollo)</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

const NOTIFICATIONS = [
    {
        id: 1,
        from: 'Miguel (Carrier Rep)',
        initials: 'M',
        contract: 'Contrato #1349',
        carrier: 'Anthem Blue Cross',
        message: 'Hola Nacho, el W-9 que subiste está borroso. ¿Podrías subir una copia más clara?',
        time: '10:42 AM',
        unread: true,
    },
    {
        id: 2,
        from: 'Soporte Cardali',
        initials: 'SC',
        contract: 'Contrato #1350',
        carrier: 'Aetna',
        message: 'Tu contrato ha sido aprobado y está activo desde hoy.',
        time: 'Ayer',
        unread: true,
    },
    {
        id: 3,
        from: 'Underwriting Cigna',
        initials: 'UC',
        contract: 'Contrato #1351',
        carrier: 'Cigna',
        message: 'Necesitamos documentación adicional para continuar el proceso.',
        time: 'Lun',
        unread: false,
    },
];

// ─── Policies Data ────────────────────────────────────────────────────────────

const POLICIES_DATA = [
    { id: 'POL-2026-1001', customer: 'Jeraldine Paez Tomasini', location: 'College Park, MD',
      policy: 'Health (ACA / Marketplace)', carrier: 'UnitedHealthcare', effectiveDate: 'Jun-01-2026',
      monthlyPayment: '$36.07', status: 'Waiting', npn: '17031536',
      progress: { consent: false, eligibility: false, documents: false, payment: false },
      planShort: 'UHC BRON', carrierShort: 'UNITED HEALTH CARE',
      policyShort: 'Obamacare (ACA)', insuredCount: 1,
      insured: 'Jeraldine', lastName: 'Paez', secondLastName: 'Tomasini',
      dob: '08-12-1995', email: 'jpaezt135@gmail.com', phone: '(786)782-3051',
      ssn: '808-53-8724', countryOfBirth: 'Venezuela', immigrationStatus: 'Employment Authorization',
      maritalStatus: 'Single', address: '9314 Cherry Hill Rd, Apt 314', city: 'College Park',
      state: 'Maryland', zip: '20740', county: "Prince George's County",
      subsidy: '$332.00', insurancePlan: 'UHC Silver - D Copay Focus $0 Indiv Med Ded',
      agent: 'Ivan Diaz', agentLicense: '149633CA', agency: 'ServiPlus', familyMembers: '1/1',
      familyIncome: '$24,000.00', incomeGroup: 'CSR B', referral: 'May-13-2026 Yes',
      referralType: 'Referral', createdDate: 'May-13-2026', lastUpdate: 'May-13-2026' },
    { id: 'POL-2026-1002', customer: 'Carlos Mendoza', location: 'Miami, FL',
      policy: 'Medicare Advantage', carrier: 'Aetna', effectiveDate: 'Jan-01-2026',
      monthlyPayment: '$0.00', status: 'Completed', npn: '11234567',
      progress: { consent: true, eligibility: true, documents: true, payment: true },
      planShort: 'AETNA MAPD', carrierShort: 'AETNA',
      policyShort: 'Medicare Advantage', insuredCount: 2,
      insured: 'Carlos', lastName: 'Mendoza', secondLastName: '',
      dob: '03-15-1958', email: 'cmendoza@email.com', phone: '(305)555-1234',
      ssn: '123-45-6789', countryOfBirth: 'Cuba', immigrationStatus: 'Citizen',
      maritalStatus: 'Married', address: '4520 NW 7th St', city: 'Miami',
      state: 'Florida', zip: '33126', county: 'Miami-Dade',
      subsidy: '$0.00', insurancePlan: 'Aetna Medicare Advantage PPO',
      agent: 'Nacho Molano', agentLicense: '149520CA', agency: 'Cardali', familyMembers: '2/2',
      familyIncome: '$0', incomeGroup: 'Medicare', referral: 'Jan-01-2026 Yes',
      referralType: 'Direct', createdDate: 'Dec-01-2025', lastUpdate: 'Jan-02-2026' },
    { id: 'POL-2026-1003', customer: 'Ana Lucia Fernandez', location: 'Houston, TX',
      policy: 'Health (ACA / Marketplace)', carrier: 'Ambetter', effectiveDate: 'Apr-01-2026',
      monthlyPayment: '$12.50', status: 'Signature Pending', npn: '17031536',
      progress: { consent: true, eligibility: true, documents: false, payment: false },
      planShort: 'AMB ESS 1', carrierShort: 'AMBETTER',
      policyShort: 'Obamacare (ACA)', insuredCount: 1,
      insured: 'Ana Lucia', lastName: 'Fernandez', secondLastName: 'Rojas',
      dob: '07-22-1990', email: 'analucia@email.com', phone: '(713)555-9876',
      ssn: '987-65-4321', countryOfBirth: 'Colombia', immigrationStatus: 'Permanent Resident',
      maritalStatus: 'Single', address: '8810 Westheimer Rd', city: 'Houston',
      state: 'Texas', zip: '77063', county: 'Harris',
      subsidy: '$280.00', insurancePlan: 'Ambetter Essential Care 1',
      agent: 'Nacho Molano', agentLicense: '149520CA', agency: 'Cardali', familyMembers: '1/1',
      familyIncome: '$28,000.00', incomeGroup: 'CSR A', referral: 'Mar-15-2026 No',
      referralType: 'Direct', createdDate: 'Mar-10-2026', lastUpdate: 'Mar-20-2026' },
    { id: 'POL-2026-1004', customer: 'Roberto Silva', location: 'Austin, TX',
      policy: 'Life Insurance', carrier: 'Cigna', effectiveDate: 'Feb-01-2026',
      monthlyPayment: '$55.00', status: 'Signed', npn: '11234567',
      progress: { consent: true, eligibility: true, documents: true, payment: false },
      planShort: 'TERM LIFE 500K', carrierShort: 'CIGNA',
      policyShort: 'Life Insurance', insuredCount: 3,
      insured: 'Roberto', lastName: 'Silva', secondLastName: '',
      dob: '11-30-1975', email: 'rsilva@email.com', phone: '(512)555-7654',
      ssn: '456-78-9012', countryOfBirth: 'Brazil', immigrationStatus: 'Citizen',
      maritalStatus: 'Married', address: '200 Congress Ave', city: 'Austin',
      state: 'Texas', zip: '78701', county: 'Travis',
      subsidy: '$0.00', insurancePlan: 'Cigna Term Life 500k',
      agent: 'Nacho Molano', agentLicense: '149520CA', agency: 'Cardali', familyMembers: '3/3',
      familyIncome: '$75,000.00', incomeGroup: 'N/A', referral: 'Jan-20-2026 Yes',
      referralType: 'NPN Override', createdDate: 'Jan-15-2026', lastUpdate: 'Feb-02-2026' },
    { id: 'POL-2026-1005', customer: 'Maria Gonzalez', location: 'Orlando, FL',
      policy: 'Dental & Vision', carrier: 'Humana', effectiveDate: 'Mar-01-2026',
      monthlyPayment: '$22.00', status: 'Completed', npn: '17031536',
      progress: { consent: true, eligibility: true, documents: true, payment: true },
      planShort: 'HUM D/V COMBO', carrierShort: 'HUMANA',
      policyShort: 'Dental or Vision Insurance', insuredCount: 1,
      insured: 'Maria', lastName: 'Gonzalez', secondLastName: 'Lopez',
      dob: '05-10-1985', email: 'mgonzalez@email.com', phone: '(407)555-3210',
      ssn: '321-54-9876', countryOfBirth: 'Mexico', immigrationStatus: 'Permanent Resident',
      maritalStatus: 'Divorced', address: '1234 International Dr', city: 'Orlando',
      state: 'Florida', zip: '32819', county: 'Orange',
      subsidy: '$0.00', insurancePlan: 'Humana Dental/Vision Combo',
      agent: 'Ivan Diaz', agentLicense: '149633CA', agency: 'ServiPlus', familyMembers: '1/1',
      familyIncome: '$42,000.00', incomeGroup: 'N/A', referral: 'Feb-20-2026 No',
      referralType: 'Direct', createdDate: 'Feb-18-2026', lastUpdate: 'Mar-01-2026' },
];

// ─── New Policy Modal ──────────────────────────────────────────────────────────

const NewPolicyModal = ({ onClose }) => {
    const lang = useLang();
    const t = T[lang];
    const [customer,        setCustomer]        = useState('');
    const [effectiveDate,   setEffectiveDate]   = useState('');
    const [prevCarrier,     setPrevCarrier]      = useState('');
    const [carrier,         setCarrier]          = useState('');
    const [policyType,      setPolicyType]       = useState('');

    const inputCls = "w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-700 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm";

    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center z-[201] pointer-events-none px-4">
                <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md pointer-events-auto fade-in">
                    <h2 className="text-2xl font-bold text-slate-800 mb-1 font-display">{t.addPolicy}</h2>
                    <div className="space-y-5 mt-7">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t.customer}</label>
                            <input type="text" value={customer} onChange={e => setCustomer(e.target.value)}
                                placeholder="Search customer…" className={inputCls} />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t.effectiveDate}</label>
                            <input type="date" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} className={inputCls} />
                        </div>
                        <SelectField label={t.prevCarrier} value={prevCarrier} onChange={setPrevCarrier} options={INSURANCE_COMPANIES} placeholder="Select previous carrier…" />
                        <SelectField label={t.carrier}     value={carrier}     onChange={setCarrier}     options={INSURANCE_COMPANIES} placeholder="Select carrier…" />
                        <SelectField label={t.policyType}  value={policyType}  onChange={setPolicyType}  options={POLICY_TYPES}        placeholder="Select policy type…" />
                    </div>
                    <div className="flex justify-end items-center gap-5 mt-8">
                        <button onClick={onClose} className="text-slate-400 font-medium underline underline-offset-2 hover:text-slate-600 transition-colors text-sm">{t.cancel}</button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-2.5 rounded-lg font-semibold transition-colors shadow-sm text-sm">{t.submit}</button>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

// ─── Policies List View ────────────────────────────────────────────────────────

const STATUS_PILLS = ['Completed', 'Waiting', 'Signature Pending', 'Signed'];

const statusBadgeVariant = s => ({ Completed: 'green', Waiting: 'blue', 'Signature Pending': 'yellow', Signed: 'gray' }[s] || 'gray');

const PolicyFilterPill = ({ label, value, onChange, options }) => (
    <div className="relative">
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`appearance-none border rounded-lg pl-4 pr-8 py-2 text-sm bg-white cursor-pointer focus:outline-none transition-colors
                ${value ? 'border-brand-400 bg-brand-50 text-brand-700 font-medium' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
        >
            <option value="">{label}</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <Icons.ChevronDown size={12} />
        </div>
    </div>
);

const PoliciesView = ({ navigateTo, initialTab }) => {
    const lang = useLang();
    const t = T[lang];
    const mode = useMode();
    const isAgency = mode === 'agency';
    const [activeStatuses, setActiveStatuses] = useState(new Set());
    const [openDropdown,   setOpenDropdown]   = useState(null);
    const [colFilters,     setColFilters]      = useState({});
    const [showModal,      setShowModal]       = useState(false);
    const [filterCustomer, setFilterCustomer]  = useState('');
    const [filterPolicy,   setFilterPolicy]    = useState('');
    const [filterCarrier,  setFilterCarrier]   = useState('');
    const [filterAgent,    setFilterAgent]     = useState('');

    const POLICY_AGENTS = ['Ivan Diaz', 'Nacho Molano', 'Maria Santos', 'Pedro Gil', 'Carlos Cruz'];

    const baseColumns = [
        { key: 'customer',      label: t.customerCol,    options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'location',      label: t.locationCol,    options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'generalInfo',   label: t.generalInfoCol, options: POLICY_TYPES.map(p => ({ label: p, value: p })) },
        { key: 'policy',        label: t.policyCol,      options: INSURANCE_COMPANIES.map(c => ({ label: c, value: c })) },
        { key: 'effectiveDate', label: t.effDateCol,     options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'status',        label: t.statusCol,      options: STATUS_PILLS.map(s => ({ label: s, value: s })) },
    ];
    const columns = isAgency
        ? [{ key: 'agent', label: t.agentCol, options: POLICY_AGENTS.map(a => ({ label: a, value: a })) }, ...baseColumns]
        : baseColumns;

    useEffect(() => {
        const close = () => setOpenDropdown(null);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, []);

    const toggleStatus = s => setActiveStatuses(prev => {
        const next = new Set(prev);
        next.has(s) ? next.delete(s) : next.add(s);
        return next;
    });

    const visibleRows = POLICIES_DATA.filter(row => {
        if (activeStatuses.size > 0 && !activeStatuses.has(row.status)) return false;
        if (filterCustomer && !row.customer.toLowerCase().includes(filterCustomer.toLowerCase())) return false;
        if (filterPolicy && row.policy !== filterPolicy) return false;
        if (filterCarrier && row.carrier !== filterCarrier) return false;
        if (filterAgent && row.agent !== filterAgent) return false;
        return true;
    });

    return (
        <div className="fade-in">
            {showModal && <NewPolicyModal onClose={() => setShowModal(false)} />}

            <div className="flex justify-between items-center mb-5">
                <h1 className="text-5xl font-bold text-slate-800 tracking-tight font-display">{isAgency ? t.agencyPolicies : t.myPolicies}</h1>
                <button onClick={() => setShowModal(true)} className="bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-700 transition-colors shadow-soft">
                    {t.newPolicy}
                </button>
            </div>

            <AiSearchBar />

            <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.filters}</span>
                <div className={`flex items-center gap-2 border rounded-lg pl-3 pr-4 py-2 bg-white transition-colors
                    ${filterCustomer ? 'border-brand-400 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <Icons.Search className="text-slate-400" size={14} />
                    <input type="text" value={filterCustomer} onChange={e => setFilterCustomer(e.target.value)}
                        placeholder={t.customer}
                        className="text-sm bg-transparent border-none outline-none text-slate-700 w-32 placeholder-slate-400" />
                </div>
                <PolicyFilterPill label={t.policyType} value={filterPolicy}  onChange={setFilterPolicy}  options={POLICY_TYPES} />
                <PolicyFilterPill label={t.carrier}    value={filterCarrier} onChange={setFilterCarrier} options={INSURANCE_COMPANIES} />
                {isAgency && (
                    <PolicyFilterPill label={t.agentFilter} value={filterAgent} onChange={setFilterAgent} options={POLICY_AGENTS} />
                )}
                {(filterCustomer || filterPolicy || filterCarrier || filterAgent) && (
                    <button onClick={() => { setFilterCustomer(''); setFilterPolicy(''); setFilterCarrier(''); setFilterAgent(''); }}
                        className="text-xs text-slate-400 underline hover:text-slate-600 transition-colors">
                        {t.clearFilters}
                    </button>
                )}
            </div>

            <Card noPadding>
                <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
                    <span className="text-sm font-semibold text-slate-500">{t.listPolicies}</span>
                    <div className="flex gap-2 flex-wrap justify-end">
                        {STATUS_PILLS.map(s => (
                            <button key={s} onClick={() => toggleStatus(s)}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap
                                    ${activeStatuses.has(s) ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto rounded-b-xl">
                    <table className="w-full text-left border-collapse font-data">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-500 text-sm">
                                {columns.map(col => (
                                    <ColDropdown key={col.key} col={col}
                                        open={openDropdown === col.key}
                                        onToggle={k => setOpenDropdown(openDropdown === k ? null : k)}
                                        onSelect={(k, v) => { setColFilters(p => ({ ...p, [k]: v })); setOpenDropdown(null); }}
                                        activeFilter={colFilters[col.key] ?? null}
                                    />
                                ))}
                                <th className="p-5 font-semibold text-slate-500 text-sm">
                                    <div className="flex items-center justify-end gap-2">
                                        <span>{t.editCol}</span>
                                        <input type="checkbox" onClick={e => e.stopPropagation()}
                                            className="w-4 h-4 rounded-md border-slate-300 cursor-pointer accent-brand-500" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleRows.map((row, i) => {
                                const refBadgeLabel = row.referralType === 'NPN Override' ? t.npnOverrideBadge
                                                    : row.referralType === 'Direct'        ? t.directBadge
                                                    :                                        t.referralBadge;
                                const refBadgeClass = row.referralType === 'NPN Override' ? 'bg-amber-100 text-amber-700'
                                                    : row.referralType === 'Direct'        ? 'bg-slate-100 text-slate-600'
                                                    :                                        'bg-rose-100 text-rose-700';
                                const subsidyAmount = row.subsidy && row.subsidy !== '$0.00' ? row.subsidy : row.familyIncome;
                                const subsidyTag = row.incomeGroup && row.incomeGroup !== 'N/A' && row.incomeGroup !== 'Medicare'
                                                    ? row.incomeGroup
                                                    : (row.subsidy === '$0.00' ? t.noSubsidy : '');
                                const stateName = row.state || row.location.split(',')[0];
                                const Dot = ({ ok }) => (
                                    <span className={`inline-block w-2 h-2 rounded-full ml-1 ${ok ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                );
                                const statusLabel = row.status === 'Waiting' ? t.waitingOnAgent : row.status;
                                return (
                                <tr key={i} onClick={() => navigateTo('policy-detail', { policyId: row.id })}
                                    className="border-b border-slate-50 hover:bg-brand-50/50 transition-colors cursor-pointer group">
                                    {isAgency && (
                                        <td className="p-5 align-top">
                                            <p className="text-brand-600 font-semibold text-sm">{row.agentLicense || row.npn}</p>
                                            <div className="flex flex-col items-start gap-1 mt-2">
                                                <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">
                                                    {(row.agent || '?').charAt(0).toUpperCase()}
                                                </div>
                                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${refBadgeClass}`}>{refBadgeLabel}</span>
                                            </div>
                                        </td>
                                    )}
                                    <td className="p-5 align-top">
                                        <p className="font-semibold text-brand-600 group-hover:text-brand-700 text-sm">{row.customer}</p>
                                        <p className="text-xs text-slate-500 mt-1">{row.phone}</p>
                                        <p className="text-xs text-slate-400 mt-0.5 uppercase truncate max-w-[180px]">{row.email}</p>
                                    </td>
                                    <td className="p-5 align-top text-slate-600 text-sm">
                                        <div className="flex items-center gap-1 text-slate-700">
                                            <Icons.MapPin size={12} />
                                            <span className="font-medium">{stateName}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">{row.zip || ''}</p>
                                    </td>
                                    <td className="p-5 align-top text-sm">
                                        <p className="text-slate-700">{row.policyShort || row.policy}</p>
                                        <p className="text-slate-600 mt-1">
                                            <span className="font-semibold">{row.subsidy && row.subsidy !== '$0.00' ? row.subsidy : `$ ${row.familyIncome?.replace('$','')}`}</span>
                                            {subsidyTag && <span className="text-rose-500 ml-1">{subsidyTag}</span>}
                                        </p>
                                    </td>
                                    <td className="p-5 align-top text-sm">
                                        <p className="font-bold text-brand-600 leading-tight">{row.carrierShort || row.carrier}</p>
                                        <p className="text-slate-700 mt-1">{row.planShort}</p>
                                        <p className="text-slate-500 text-xs mt-1">{t.insured} {row.insuredCount || 1}</p>
                                    </td>
                                    <td className="p-5 align-top text-slate-600 text-sm">{row.effectiveDate}</td>
                                    <td className="p-5 align-top">
                                        <Badge variant={statusBadgeVariant(row.status)}>{statusLabel}</Badge>
                                        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] text-slate-500">
                                            <span className="flex items-center">Con:<Dot ok={row.progress?.consent} /></span>
                                            <span className="flex items-center">Eli:<Dot ok={row.progress?.eligibility} /></span>
                                            <span className="flex items-center">Doc:<Dot ok={row.progress?.documents} /></span>
                                            <span className="flex items-center">Pmt:<Dot ok={row.progress?.payment} /></span>
                                        </div>
                                    </td>
                                    <td className="p-5 align-top">
                                        <div className="flex flex-col items-end gap-2" onClick={e => e.stopPropagation()}>
                                            <button className="text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1">
                                                <Icons.GridMenu size={14} />
                                                <Icons.ChevronDown size={10} />
                                            </button>
                                            <input type="checkbox"
                                                className="w-4 h-4 rounded-md border-slate-300 cursor-pointer accent-brand-500" />
                                        </div>
                                    </td>
                                </tr>
                            );})}
                            {visibleRows.length === 0 && (
                                <tr><td colSpan={isAgency ? 8 : 7} className="p-10 text-center text-slate-400 text-sm">{t.noPolicies}</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// ─── Policy Detail View ────────────────────────────────────────────────────────

const InfoField = ({ label, value }) => (
    <div>
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value || <span className="text-slate-300">—</span>}</p>
    </div>
);

const PolicyDetailView = ({ navigateTo, initialTab }) => {
    const [activeTab, setActiveTab] = useState(initialTab || 'summary');
    const lang = useLang();
    const t = T[lang];
    const pol = POLICIES_DATA[0]; // use first policy as the demo record

    const PROGRESS_STEPS = ['Consent', 'No Eligibility', 'Pending Documents', 'Binder Payment Collected?'];
    const currentStep = 1; // 0-indexed; "No Eligibility" is active

    const TABS = [
        { id: 'summary',     label: t.polSummary },
        { id: 'members',     label: t.polMembers },
        { id: 'activities',  label: t.activities },
        { id: 'signing',     label: t.docSigning },
        { id: 'attachments', label: t.attachments },
        { id: 'tracking',    label: t.tracking },
    ];

    const sidebarRows = [
        { label: 'Policy No',          value: pol.id },
        { label: 'Customer',           value: pol.customer },
        { label: 'Agente',             value: pol.agent },
        { label: 'Agency',             value: pol.agency },
        { label: 'Policy Type',        value: pol.policy },
        { label: 'Carrier',            value: pol.carrier },
        { label: 'Monthly Payment',    value: pol.monthlyPayment },
        { label: 'Effective Date',     value: pol.effectiveDate },
        { label: 'Family Members',     value: pol.familyMembers },
        { label: 'Family Income',      value: pol.familyIncome },
        { label: 'Income Group',       value: pol.incomeGroup },
        { label: 'Referral',           value: pol.referral },
        { label: 'Referral Type',      value: pol.referralType },
        { label: 'Created Date',       value: pol.createdDate },
        { label: 'Last Update',        value: pol.lastUpdate },
    ];

    return (
        <div className="fade-in">
            {/* Back */}
            <button onClick={() => navigateTo('policies')}
                className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors mb-5 font-medium">
                <Icons.ArrowLeft /> {t.backToPolicies}
            </button>

            {/* Progress bar */}
            <div className="flex mb-6 rounded-xl overflow-hidden shadow-soft">
                {PROGRESS_STEPS.map((step, i) => {
                    const isDone   = i < currentStep;
                    const isActive = i === currentStep;
                    const bg = isDone ? 'bg-brand-400' : isActive ? 'bg-brand-500' : 'bg-slate-100';
                    const text = isDone || isActive ? 'text-white' : 'text-slate-400';
                    return (
                        <div key={i} className={`flex-1 text-center py-3 text-xs font-semibold tracking-wide ${bg} ${text} transition-colors`}>
                            {isDone && '✓ '}{step}
                        </div>
                    );
                })}
            </div>

            {/* Body: sidebar + main */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-72 flex-shrink-0 bg-white rounded-xl shadow-soft p-5 h-fit">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-slate-800 text-base">Policy Details</h2>
                        <Badge variant={statusBadgeVariant(pol.status)}>{pol.status}</Badge>
                    </div>
                    <div className="text-sm">
                        {sidebarRows.map(row => (
                            <div key={row.label} className="flex justify-between items-start py-2.5 border-b border-slate-100 last:border-0">
                                <span className="text-slate-400 shrink-0 mr-2">{row.label}:</span>
                                <span className="font-medium text-slate-700 text-right">{row.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    {/* Tabs */}
                    <div className="flex gap-1 mb-6 border-b border-slate-200 overflow-x-auto">
                        {TABS.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`pb-3 px-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 -mb-px
                                    ${activeTab === tab.id ? 'text-brand-600 border-brand-500' : 'text-slate-500 border-transparent hover:text-slate-800'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'summary' && (
                        <div className="space-y-8 fade-in">
                            {/* Section 1: Insurance Information */}
                            <Card>
                                <h3 className="text-base font-bold text-slate-700 text-center mb-6">{t.insuranceInfo}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5 pb-5 border-b border-slate-100">
                                    <InfoField label="NPN Health Market Application" value={pol.npn} />
                                    <InfoField label="Effective Date" value={pol.effectiveDate} />
                                    <InfoField label="Carrier" value={pol.carrier} />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-5 pt-5">
                                    <InfoField label="Carrier Member ID" value="Optional" />
                                    <InfoField label="Insurance Plan" value={pol.insurancePlan} />
                                    <InfoField label="Subsidy" value={pol.subsidy} />
                                    <InfoField label="Monthly Payment" value={pol.monthlyPayment} />
                                </div>
                            </Card>

                            {/* Section 2: General Information Owner */}
                            <Card>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-base font-bold text-slate-700">{t.generalInfo}</h3>
                                    <button className="text-sm text-brand-600 font-medium hover:text-brand-700 transition-colors">{t.goToProfile} →</button>
                                </div>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                                        <InfoField label="Insured" value={pol.insured} />
                                        <InfoField label="Second Name" value="—" />
                                        <InfoField label="Last Name" value={pol.lastName} />
                                        <InfoField label="Second Last Name" value={pol.secondLastName || '—'} />
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 pt-4 border-t border-slate-100">
                                        <InfoField label={`DOB — Age ${new Date().getFullYear() - parseInt(pol.dob.slice(-4))}`} value={pol.dob} />
                                        <InfoField label="Email" value={pol.email} />
                                        <InfoField label="Phone" value={pol.phone} />
                                        <InfoField label="Social Security Number" value={pol.ssn} />
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 pt-4 border-t border-slate-100">
                                        <InfoField label="Country of Birth" value={pol.countryOfBirth} />
                                        <InfoField label="Immigration Status" value={pol.immigrationStatus} />
                                        <InfoField label="Marital Status" value={pol.maritalStatus} />
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 pt-4 border-t border-slate-100">
                                        <div className="col-span-2"><InfoField label="Address" value={pol.address} /></div>
                                        <InfoField label="City" value={pol.city} />
                                        <InfoField label="State" value={pol.state} />
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                                        <InfoField label="Zip Code" value={pol.zip} />
                                        <InfoField label="County" value={pol.county} />
                                        <InfoField label="Apartment" value="—" />
                                    </div>
                                </div>
                            </Card>

                            {/* Section 3: Mailing Address */}
                            <Card>
                                <h3 className="text-base font-bold text-slate-700 mb-5">{t.mailingAddr}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                                    <div className="col-span-2"><InfoField label="Address" value={pol.address} /></div>
                                    <InfoField label="City" value={pol.city} />
                                    <InfoField label="State" value={pol.state} />
                                    <InfoField label="Zip Code" value={pol.zip} />
                                </div>
                            </Card>

                            {/* Section 4: Legal Documents */}
                            <Card noPadding>
                                <div className="px-6 pt-5 pb-3 border-b border-slate-100">
                                    <h3 className="text-base font-bold text-slate-700">{t.legalDocs}</h3>
                                </div>
                                <div className="overflow-x-auto rounded-b-xl">
                                    <table className="w-full text-left text-sm font-data">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                                                <th className="px-6 py-3 font-semibold">Document Type</th>
                                                <th className="px-6 py-3 font-semibold">Document Number</th>
                                                <th className="px-6 py-3 font-semibold">Date of Issue</th>
                                                <th className="px-6 py-3 font-semibold">Expiration Date</th>
                                                <th className="px-6 py-3 font-semibold">Additional Info</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-slate-50">
                                                <td className="px-6 py-4 text-slate-700 font-medium">Employment Authorization</td>
                                                <td className="px-6 py-4 text-slate-500">EAD-2024-0012</td>
                                                <td className="px-6 py-4 text-slate-500">Jan-15-2024</td>
                                                <td className="px-6 py-4 text-slate-500">Jan-14-2026</td>
                                                <td className="px-6 py-4"><AiBadge type="flagged" label="AI: Expiring soon" /></td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 text-slate-700 font-medium">State ID</td>
                                                <td className="px-6 py-4 text-slate-500">MD-ID-998877</td>
                                                <td className="px-6 py-4 text-slate-500">Mar-01-2022</td>
                                                <td className="px-6 py-4 text-slate-500">Mar-01-2027</td>
                                                <td className="px-6 py-4"><AiBadge type="verified" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab !== 'summary' && (
                        <Card className="fade-in flex items-center justify-center h-48 text-slate-400">
                            <p className="text-sm">{TABS.find(tab => tab.id === activeTab)?.label} — Coming soon</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

const AgentProfileView = ({ navigateTo, agentId }) => {
    const lang = useLang();
    const t = T[lang];
    const agent = AGENTS_DATA.find(a => a.id === agentId) || AGENTS_DATA[0];
    const [activeTab, setActiveTab] = useState('info');

    const statusVariant = s => s === 'Active' ? 'green' : s === 'Inactive' ? 'red' : 'yellow';
    const licBadge = s => s === 'Active' ? 'green' : s === 'Expiring Soon' ? 'yellow' : 'red';

    const TABS = [
        { id: 'info',     label: t.agentInfoTab },
        { id: 'reqs',     label: t.reqAndContracts },
        { id: 'licenses', label: t.licensesNav },
    ];

    const sidebarRows = [
        { label: t.npn,          value: agent.npn },
        { label: t.totalContracts, value: agent.contracts },
        { label: t.totalPolicies,  value: agent.policies },
        { label: t.joinDate,     value: agent.joined },
        { label: t.statesLicensed, value: agent.states.join(', ') },
    ];

    return (
        <div className="fade-in">
            <button onClick={() => navigateTo('my-agency')}
                className="flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors mb-6 font-medium">
                <Icons.ArrowLeft /> {t.backToAgency}
            </button>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-72 flex-shrink-0 space-y-4">
                    <div className="bg-white rounded-xl shadow-soft p-6">
                        {/* Avatar + name */}
                        <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-slate-100">
                            <div className="w-20 h-20 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-2xl mb-3">
                                {agent.initials}
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 font-display">{agent.name}</h2>
                            <p className="text-sm text-slate-500 mb-2">Cardali Agent</p>
                            <Badge variant={statusVariant(agent.status)}>{agent.status}</Badge>
                        </div>

                        {/* Stats */}
                        <div className="text-sm space-y-0">
                            {sidebarRows.map(row => (
                                <div key={row.label} className="flex justify-between items-start py-2.5 border-b border-slate-100 last:border-0">
                                    <span className="text-slate-400 shrink-0 mr-2">{row.label}:</span>
                                    <span className="font-medium text-slate-700 text-right">{row.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pending reqs quick count */}
                    {agent.pendingReqs.length > 0 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-orange-100 transition-colors"
                            onClick={() => setActiveTab('reqs')}>
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg flex-shrink-0">
                                {agent.pendingReqs.length}
                            </div>
                            <div>
                                <p className="font-semibold text-orange-900 text-sm">{t.pendingReqs2}</p>
                                <p className="text-xs text-orange-600">Click to review</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    {/* Tabs */}
                    <div className="flex gap-1 mb-6 border-b border-slate-200">
                        {TABS.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`pb-3 px-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 -mb-px
                                    ${activeTab === tab.id ? 'text-brand-600 border-brand-500' : 'text-slate-500 border-transparent hover:text-slate-800'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab: Agent Information */}
                    {activeTab === 'info' && (
                        <div className="space-y-6 fade-in">
                            <Card>
                                <h3 className="text-base font-bold text-slate-700 mb-5">{t.personalInfo}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5">
                                    {[
                                        { label: t.agentName,  value: agent.name },
                                        { label: t.npn,        value: agent.npn },
                                        { label: t.joinDate,   value: agent.joined },
                                        { label: t.phone,      value: agent.phone },
                                        { label: t.email,      value: agent.email },
                                        { label: t.city,       value: agent.city },
                                        { label: t.state,      value: agent.state },
                                        { label: t.address,    value: agent.address },
                                        { label: t.statesLicensed, value: agent.states.join(', ') },
                                    ].map(f => (
                                        <div key={f.label}>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{f.label}</p>
                                            <p className="font-medium text-slate-800">{f.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card>
                                <h3 className="text-base font-bold text-slate-700 mb-4">{t.totalContracts} & {t.totalPolicies}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-brand-50 rounded-xl p-5 text-center">
                                        <p className="text-4xl font-bold text-brand-600">{agent.contracts}</p>
                                        <p className="text-sm text-slate-600 mt-1">{t.totalContracts}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-5 text-center">
                                        <p className="text-4xl font-bold text-slate-700">{agent.policies}</p>
                                        <p className="text-sm text-slate-600 mt-1">{t.totalPolicies}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Tab: Requirements & Contracts */}
                    {activeTab === 'reqs' && (
                        <div className="space-y-6 fade-in">
                            {/* Pending requirements */}
                            <Card>
                                <h3 className="text-base font-bold text-slate-700 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                                    {t.pendingReqs2}
                                    {agent.pendingReqs.length > 0 && (
                                        <span className="ml-1 text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-md">{agent.pendingReqs.length}</span>
                                    )}
                                </h3>
                                {agent.pendingReqs.length === 0 ? (
                                    <div className="flex items-center gap-3 py-4 text-brand-600">
                                        <Icons.CheckCircle />
                                        <p className="font-medium">All requirements completed</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {agent.pendingReqs.map((req, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                                                <Icons.AlertCircle className="text-orange-500 flex-shrink-0" />
                                                <span className="text-sm font-medium text-orange-900">{req}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card>

                            {/* Contracts list */}
                            <Card noPadding>
                                <div className="px-6 pt-5 pb-3 border-b border-slate-100">
                                    <h3 className="font-bold text-slate-700">{t.contractsList}</h3>
                                </div>
                                {agent.contractsList.length === 0 ? (
                                    <p className="text-sm text-slate-400 text-center py-8">{t.noContracts}</p>
                                ) : (
                                    <div className="divide-y divide-slate-50">
                                        {agent.contractsList.map((c, i) => {
                                            const parts = c.split(' · ');
                                            const id = parts[0];
                                            const carrier = parts[1];
                                            const state = parts[2];
                                            const status = parts[3];
                                            const v = contractStatusVariant(status);
                                            return (
                                                <div key={i} onClick={() => navigateTo('contract-detail')}
                                                    className="flex items-center justify-between px-6 py-4 hover:bg-brand-50/50 transition-colors cursor-pointer group">
                                                    <div>
                                                        <p className="font-semibold text-slate-800 group-hover:text-brand-600 text-sm">{id}</p>
                                                        <p className="text-xs text-slate-500 mt-0.5">{carrier} · {state}</p>
                                                    </div>
                                                    <Badge variant={v}>{status}</Badge>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </Card>
                        </div>
                    )}

                    {/* Tab: Licenses */}
                    {activeTab === 'licenses' && (
                        <div className="fade-in">
                            {agent.licenses.length === 0 ? (
                                <Card className="text-center py-8 text-slate-400">
                                    <p>{t.sinLicencias}</p>
                                </Card>
                            ) : (
                                <Card noPadding>
                                    <div className="px-6 pt-5 pb-3 border-b border-slate-100">
                                        <h3 className="font-bold text-slate-700">{t.licensesNav} · {agent.licenses.length}</h3>
                                    </div>
                                    <div className="divide-y divide-slate-50">
                                        {agent.licenses.map((lic, i) => (
                                            <div key={i} className="flex items-center justify-between px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm
                                                        ${lic.status === 'Active' ? 'bg-brand-100 text-brand-700' : lic.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                                        {lic.state.substring(lic.state.indexOf('(')+1, lic.state.indexOf(')'))}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">{lic.state}</p>
                                                        <p className="text-xs text-slate-500">{lic.type} · {lic.number}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <p className="text-xs text-slate-400 flex items-center gap-1"><Icons.Clock /> {lic.expiry}</p>
                                                    <Badge variant={licBadge(lic.status)}>{lic.status}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MyAgencyView = ({ navigateTo }) => {
    const lang = useLang();
    const t = T[lang];
    const [openDropdown, setOpenDropdown] = useState(null);
    const [colFilters,   setColFilters]   = useState({});
    const [filterSearch, setFilterSearch] = useState('');


    const columns = [
        { key: 'name',      label: t.agentName,       options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'npn',       label: t.npn,             options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'states',    label: t.statesLicensed,  options: [{ label: 'A → Z', value: 'asc' }, { label: 'Z → A', value: 'desc' }] },
        { key: 'contracts', label: t.totalContracts,  options: [{ label: 'High → Low', value: 'desc' }, { label: 'Low → High', value: 'asc' }] },
        { key: 'policies',  label: t.totalPolicies,   options: [{ label: 'High → Low', value: 'desc' }, { label: 'Low → High', value: 'asc' }] },
        { key: 'status',    label: t.statusCol,       options: ['Active','Inactive','Pending'].map(s => ({ label: s, value: s })) },
        { key: 'joined',    label: t.joinDate,        options: [{ label: 'Newest first', value: 'desc' }, { label: 'Oldest first', value: 'asc' }] },
    ];

    useEffect(() => {
        const close = () => setOpenDropdown(null);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, []);

    const visibleAgents = AGENTS_DATA.filter(a =>
        !filterSearch || a.name.toLowerCase().includes(filterSearch.toLowerCase()) || a.npn.includes(filterSearch)
    );

    const statusVariant = s => s === 'Active' ? 'green' : s === 'Inactive' ? 'red' : 'yellow';

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-5xl font-bold text-slate-800 tracking-tight font-display">{t.myAgency}</h1>
                <button className="bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-700 transition-colors shadow-soft">
                    + Invite Agent
                </button>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: t.myAgents,       value: AGENTS_DATA.length,                           color: 'text-slate-800' },
                    { label: t.active,         value: AGENTS_DATA.filter(a => a.status === 'Active').length, color: 'text-brand-600' },
                    { label: t.totalContracts, value: AGENTS_DATA.reduce((s, a) => s + a.contracts, 0),      color: 'text-slate-800' },
                ].map(stat => (
                    <Card key={stat.label} className="text-center py-2">
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                    </Card>
                ))}
            </div>

            {/* AI Search + Filter */}
            <AiSearchBar />

            <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.filters}</span>
                <div className={`flex items-center gap-2 border rounded-lg pl-3 pr-4 py-2 bg-white transition-colors
                    ${filterSearch ? 'border-brand-400 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <Icons.Search className="text-slate-400" size={14} />
                    <input type="text" value={filterSearch} onChange={e => setFilterSearch(e.target.value)}
                        placeholder={t.agentName + ' / NPN'}
                        className="text-sm bg-transparent border-none outline-none text-slate-700 w-36 placeholder-slate-400" />
                </div>
                {filterSearch && (
                    <button onClick={() => setFilterSearch('')}
                        className="text-xs text-slate-400 underline hover:text-slate-600 transition-colors">{t.clearFilters}</button>
                )}
            </div>

            {/* Agents table */}
            <Card noPadding>
                <div className="px-5 pt-5 pb-3 border-b border-slate-100">
                    <span className="text-sm font-semibold text-slate-500">{t.myAgents} · {visibleAgents.length}</span>
                </div>
                <div className="overflow-x-auto rounded-b-xl">
                    <table className="w-full text-left border-collapse font-data">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-500 text-sm">
                                {columns.map(col => (
                                    <ColDropdown key={col.key} col={col}
                                        open={openDropdown === col.key}
                                        onToggle={k => setOpenDropdown(openDropdown === k ? null : k)}
                                        onSelect={(k, v) => { setColFilters(p => ({ ...p, [k]: v })); setOpenDropdown(null); }}
                                        activeFilter={colFilters[col.key] ?? null}
                                    />
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {visibleAgents.map((agent, i) => (
                                <tr key={i} onClick={() => navigateTo('agent-profile', { agentId: agent.id })} className="border-b border-slate-50 hover:bg-brand-50/50 transition-colors cursor-pointer group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                {agent.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-semibold text-slate-800 group-hover:text-brand-600">{agent.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-5 text-slate-500 font-mono text-sm">{agent.npn}</td>
                                    <td className="p-5">
                                        <StatePills states={agent.states} />
                                    </td>
                                    <td className="p-5 text-center font-semibold text-slate-800">{agent.contracts}</td>
                                    <td className="p-5 text-center font-semibold text-slate-800">{agent.policies}</td>
                                    <td className="p-5">
                                        <Badge variant={statusVariant(agent.status)}>{agent.status}</Badge>
                                    </td>
                                    <td className="p-5 text-slate-500 text-sm">{agent.joined}</td>
                                </tr>
                            ))}
                            {visibleAgents.length === 0 && (
                                <tr><td colSpan={7} className="p-10 text-center text-slate-400 text-sm">{t.noContracts}</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

const AIDA_SUGGESTIONS = [
    'Draft a contract', 'Search agent info', 'Upload a document',
    'Check license status', 'Summarize requirements',
];

const AIDA_INTRO = {
    en: `Hi! I'm **Aida**, your Aidgency assistant 👋\n\nI can help you with:\n• Drafting and reviewing contracts\n• Searching agent or policy information\n• Uploading and organizing documents\n• Checking license and compliance status\n• Summarizing pending requirements\n\nHow can I assist you today?`,
    es: `¡Hola! Soy **Aida**, tu asistente de Aidgency 👋\n\nPuedo ayudarte con:\n• Redactar y revisar contratos\n• Buscar información de agentes o pólizas\n• Subir y organizar documentos\n• Verificar licencias y cumplimiento\n• Resumir requerimientos pendientes\n\n¿En qué puedo ayudarte hoy?`,
};

const AidaChat = () => {
    const lang = useLang();
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([{ from: 'aida', text: AIDA_INTRO[lang] }]);
    const [input, setInput] = useState('');
    const bottomRef = React.useRef(null);

    React.useEffect(() => {
        if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, open]);

    React.useEffect(() => {
        setMessages([{ from: 'aida', text: AIDA_INTRO[lang] }]);
    }, [lang]);

    const send = (text) => {
        if (!text.trim()) return;
        const userMsg = { from: 'user', text };
        const reply = { from: 'aida', text: lang === 'en'
            ? `Got it! I'll help you with: "${text}". This feature is coming soon in the full version of Aidgency.`
            : `¡Entendido! Te ayudaré con: "${text}". Esta función estará disponible en la versión completa de Aidgency.`
        };
        setMessages(prev => [...prev, userMsg, reply]);
        setInput('');
    };

    const renderText = (text) => text.split('\n').map((line, i) => {
        const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <p key={i} className={line === '' ? 'mb-1' : 'mb-0.5'} dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }} />;
    });

    return ReactDOM.createPortal(
        <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3">
            {/* Chat panel */}
            {open && (
                <div className="w-80 bg-white rounded-xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col overflow-hidden fade-in"
                    style={{ height: '480px' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3 flex items-center gap-3 flex-shrink-0">
                        <img src="secretary.png" alt="Aida" className="w-10 h-10 rounded-full object-cover bg-white/20 p-0.5" />
                        <div className="flex-1">
                            <p className="font-bold text-white text-sm">Aida</p>
                            <p className="text-[10px] text-brand-100">Aidgency AI Assistant</p>
                        </div>
                        <button onClick={() => setOpen(false)}
                            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors text-lg leading-none">
                            ×
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50/50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                                {msg.from === 'aida' && (
                                    <img src="secretary.png" alt="Aida" className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5 bg-brand-100" />
                                )}
                                <div className={`max-w-[78%] px-3 py-2.5 rounded-xl text-xs leading-relaxed
                                    ${msg.from === 'user'
                                        ? 'bg-brand-500 text-white rounded-tr-sm'
                                        : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-sm'}`}>
                                    {renderText(msg.text)}
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Suggestions */}
                    {messages.length <= 1 && (
                        <div className="px-3 pb-2 flex gap-1.5 flex-wrap flex-shrink-0">
                            {AIDA_SUGGESTIONS.map(s => (
                                <button key={s} onClick={() => send(s)}
                                    className="px-2.5 py-1 rounded-md bg-brand-50 text-brand-700 text-[10px] font-medium border border-brand-200 hover:bg-brand-100 transition-colors whitespace-nowrap">
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="px-3 pb-3 flex-shrink-0">
                        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && send(input)}
                                placeholder={lang === 'en' ? 'Ask Aida anything…' : 'Pregúntale a Aida…'}
                                className="flex-1 bg-transparent border-none outline-none text-xs text-slate-700 placeholder-slate-400"
                            />
                            <button onClick={() => send(input)}
                                className="w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center hover:bg-brand-600 transition-colors flex-shrink-0">
                                <span style={{transform:'scale(0.7)', display:'flex'}}><Icons.Send /></span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FAB button */}
            <button
                onClick={() => setOpen(v => !v)}
                className={`w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)] transition-all duration-300 overflow-hidden border-2 flex items-center justify-center
                    ${open ? 'border-brand-400 scale-95' : 'border-white scale-100 hover:scale-105'}`}
            >
                <img src="secretary.png" alt="Aida" className="w-full h-full object-cover" />
            </button>
        </div>,
        document.body
    );
};

const App = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [viewParams, setViewParams] = useState({});
    const [showNotifications, setShowNotifications] = useState(false);
    const [mode, setMode] = useState('agent');
    const [lang, setLang] = useState('en');

    const navigateTo = (view, params = {}) => {
        setCurrentView(view);
        setViewParams(params);
        setShowNotifications(false);
    };

    const toggleMode = () => {
        setMode(m => m === 'agent' ? 'agency' : 'agent');
        navigateTo('dashboard');
    };
    const toggleLang = () => setLang(l => l === 'en' ? 'es' : 'en');

    useEffect(() => {
        document.body.classList.toggle('agency-mode', mode === 'agency');
    }, [mode]);

    useEffect(() => {
        const close = () => setShowNotifications(false);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, []);

    const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;
    const isAgency = mode === 'agency';
    const t = T[lang];

    return (
        <ModeContext.Provider value={mode}>
        <LangContext.Provider value={lang}>
        <div className="min-h-screen flex flex-col">
            <nav className="sticky top-0 z-50">
                <div className="absolute inset-x-0 top-0 -bottom-10 nav-blur pointer-events-none"></div>
                <div className="relative flex justify-between items-center px-6 h-[4.5rem]">

                    {/* Left: logo + separator + mode badge */}
                    <div className="flex items-center">
                        <div className="flex items-center gap-2 pr-4">
                            <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                            </div>
                            <span className="font-bold text-slate-800 hidden md:block tracking-tight">
                                Aid<span className="text-brand-500">gency</span>
                            </span>
                        </div>
                        <div className="border-l border-slate-200 pl-4">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-brand-100 text-brand-700 hidden md:block">
                                {isAgency ? 'Agency' : 'Agent'}
                            </span>
                        </div>
                    </div>

                    {/* Center: nav links + bell after Policies */}
                    <div className="flex-1 flex justify-center items-center gap-7 px-4">
                        {[
                            { id: 'dashboard', label: t.overview },
                            { id: 'contracts', label: t.contracts },
                            { id: 'policies',  label: t.policies },
                            ...(isAgency ? [{ id: 'my-agency', label: t.myAgency }] : []),
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => navigateTo(item.id)}
                                className={`relative pb-0.5 font-medium text-[0.9375rem] transition-colors duration-200 whitespace-nowrap border-b-2
                                    ${currentView === item.id || (item.id === 'contracts' && currentView === 'contract-detail') || (item.id === 'policies' && currentView === 'policy-detail') || (item.id === 'my-agency' && currentView === 'agent-profile')
                                        ? 'text-slate-900 border-brand-500'
                                        : 'text-slate-500 border-transparent hover:text-slate-800'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}

                        {/* Bell — right of Policies */}
                        <div className="relative" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setShowNotifications(v => !v)}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center relative transition-colors
                                    ${showNotifications ? 'bg-slate-100 text-slate-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
                            >
                                <Icons.Bell />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                )}
                            </button>

                            {showNotifications && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden fade-in">
                                    <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                                        <h4 className="font-bold text-slate-800 text-sm">Mensajes recientes</h4>
                                        {unreadCount > 0 && (
                                            <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-md">{unreadCount} nuevos</span>
                                        )}
                                    </div>
                                    <div>
                                        {NOTIFICATIONS.map(n => (
                                            <div
                                                key={n.id}
                                                onClick={() => navigateTo('contract-detail', { tab: 'messages' })}
                                                className={`px-4 py-3 cursor-pointer border-b border-slate-50 last:border-0 transition-colors hover:bg-slate-50 ${n.unread ? 'bg-brand-50/40' : ''}`}
                                            >
                                                <div className="flex gap-3 items-start">
                                                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
                                                        {n.initials}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-baseline gap-2">
                                                            <p className={`text-sm truncate ${n.unread ? 'font-bold text-slate-800' : 'font-medium text-slate-700'}`}>{n.from}</p>
                                                            <span className="text-[10px] text-slate-400 shrink-0 font-data">{n.time}</span>
                                                        </div>
                                                        <p className="text-xs text-brand-600 font-medium mb-0.5">{n.contract} · {n.carrier}</p>
                                                        <p className="text-xs text-slate-500 truncate">{n.message}</p>
                                                    </div>
                                                    {n.unread && <div className="w-2 h-2 bg-brand-500 rounded-full shrink-0 mt-1.5"></div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-4 py-2.5 border-t border-slate-100 text-center">
                                        <button className="text-xs text-brand-600 font-semibold hover:text-brand-700 transition-colors">Ver todos los mensajes</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: toggle view + lang flag + profile */}
                    <div className="flex items-center gap-2 pr-1">
                        <button
                            onClick={toggleMode}
                            className="px-4 py-2 rounded-full text-sm font-medium border border-slate-200 bg-white hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50 transition-all duration-300 text-slate-500 whitespace-nowrap"
                        >
                            {t.toggleView}
                        </button>
                        <button
                            onClick={toggleLang}
                            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors overflow-hidden"
                            title="Switch language"
                        >
                            <img
                                src={lang === 'en' ? 'https://flagcdn.com/w40/us.png' : 'https://flagcdn.com/w40/co.png'}
                                alt={lang === 'en' ? 'English' : 'Español'}
                                className="w-6 h-auto rounded-sm shadow-sm"
                            />
                        </button>

                        {/* Profile */}
                        <button
                            onClick={() => navigateTo('profile')}
                            className={`flex items-center gap-3 pl-4 pr-2 py-1.5 rounded-full border transition-all duration-300
                                ${currentView === 'profile'
                                    ? 'border-brand-500 bg-brand-50'
                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                }`}
                        >
                            <span className="font-medium text-sm text-slate-700 hidden md:block">Nacho M.</span>
                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                                <Icons.User />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-1 px-6 pt-5 w-full">
                <div className="w-full pb-8">
                    {currentView === 'dashboard' && <DashboardView navigateTo={navigateTo} />}
                    {currentView === 'contracts' && <ContractsView navigateTo={navigateTo} initialTab={viewParams.tab} />}
                    {currentView === 'contract-detail' && <ContractDetailView navigateTo={navigateTo} initialTab={viewParams.tab} />}
                    {currentView === 'policies' && <PoliciesView navigateTo={navigateTo} initialTab={viewParams.tab} />}
                    {currentView === 'policy-detail' && <PolicyDetailView navigateTo={navigateTo} initialTab={viewParams.tab} />}
                    {currentView === 'profile' && <ProfileView initialTab={viewParams.tab} />}
                    {currentView === 'my-agency' && <MyAgencyView navigateTo={navigateTo} />}
                    {currentView === 'agent-profile' && <AgentProfileView navigateTo={navigateTo} agentId={viewParams.agentId} />}
                </div>
            </main>
        </div>
        <AidaChat />
        </LangContext.Provider>
        </ModeContext.Provider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
