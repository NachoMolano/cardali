# TrinityHub360

## Summary

TrinityHub360 is an insurance agency CRM and operations platform, purpose-built for managing the complete lifecycle of insurance policies, agents, customers, commissions, and multi-channel marketing in a single hub.

### Navigation Pattern:

The platform uses a dual-mode sidebar — collapsed (icon-only) for space efficiency, and expanded (icon + label) for full navigation — alongside a persistent top navigation bar. The top bar handles global utilities (notifications, messaging, language toggle, and user account actions), while the left sidebar is the primary navigation driver, organizing all functional modules into 7 clearly grouped categories displayed as section headers.

### Information Architecture Style:

The platform follows a flat-depth, wide-breadth structure at the sidebar level (7 top-level groups × up to 6 items each), then shifts to a tabbed sub-navigation pattern within each page, revealing 3–8 contextual sub-views per section. This means most of the depth is hidden inside pages rather than nested menus, keeping the sidebar uncluttered while providing rich functionality on each screen.

### Content & Data Entity Overview:

The six operational modules address distinct domains — My Agency (personal overview and messaging), Policy (insurance policy lifecycle), Business Book (customer and opportunity CRM with a Kanban pipeline), Contracts (agent onboarding, licensing, and contract management), Commissions (financial reconciliation through tickets and statements), and Marketing (multi-channel outreach via Email, SMS, WhatsApp, and Telegram bots). Settings is a single-entry administrative hub that configures the entire agency's operational parameters. The platform exhibits strong cross-linking between entities (e.g., customers link to policies, agents link to commissions tickets, pipeline stages link to opportunities), reflecting a deeply relational data model suited to a high-volume insurance brokerage environment.

## Hierarichal Tree

TrinityHub360 (cardali.trinityhub360.com)
│
├── ── TOP NAVIGATION BAR ──
│   ├── Logo / Brand ("TrinityHub360") → Home redirect
│   ├── 🔔 Notifications Bell → General Notifications page
│   ├── 💬 Messages Chat Icon → General Messages (Messenger) page
│   ├── 🌐 Language Selector
│   │   ├── English
│   │   └── Español
│   └── 👤 User Profile Menu (Trinity Manager / molanod901@gmail.com)
│       ├── My profile (agent detail form)
│       ├── Change password
│       ├── Tickets
│       ├── Tutorials (→ YouTube channel)
│       ├── Terms and conditions
│       └── Logout
│
├── ── LEFT SIDEBAR NAVIGATION ──
│   [Agency label: "Cardali Group Inc"]
│
│   ├── 1. MY AGENCY
│   │   ├── Dashboard
│   │   │   ├── Notifications widget (Total / Open / Closed / This Month KPIs)
│   │   │   │   ├── Notification status chart (Open vs Closed)
│   │   │   │   └── Monthly trend chart
│   │   │   └── Activities / Tasks widget (Total / Pending / Overdue / Completed KPIs)
│   │   │       ├── Task status chart (Pending · Overdue · Completed)
│   │   │       └── Top activities chart (Top 6 most frequent)
│   │   ├── My Profile
│   │   │   ├── Tab: General information (Personal info, NPN, SSN, Language, Gender, P.O.Box)
│   │   │   ├── Tab: Licenses
│   │   │   ├── Tab: Attachments
│   │   │   ├── Tab: Contracts
│   │   │   ├── Tab: My notes
│   │   │   ├── Tab: Change control
│   │   │   └── Tab: Trusted devices
│   │   ├── General Notifications
│   │   │   └── Filterable list: Status, Message, Type, Start/End Created
│   │   │       └── Columns: Created, User, Subject, Message, Status, Archive
│   │   └── General Messages (Messenger)
│   │       └── Filterable list: Status, Message, Type, Start/End Created
│   │           └── Columns: Created, User, Subject, Message, Status, Archive
│   │
│   ├── 2. POLICY
│   │   ├── List of Policies
│   │   │   └── Filters: Effective year, Policy type, Status, Carrier, Agents, Follow-up, Record agent, Agency
│   │   │       └── Columns: Agent, Customer, Location, General information, Policy, Effective date, Status
│   │   │           └── KPI Cards: Total policies, Cancellations, NPN count, Referrals
│   │   ├── Draft
│   │   │   └── Same structure as List of Policies, filtered to "Status: Draft"
│   │   ├── Activities
│   │   │   └── Filters: Status, On time, User, Policy type, Type, Activities, Start/End Due date
│   │   │       └── Columns: User, Activities, Created date, Due date, Closed date, Comments, State
│   │   └── Sales Projection
│   │       ├── Tab: Projection (simple commissions detail)
│   │       │   └── Filters: Name/Phone, Effective year, Agents, Agency, With commissions, Record agent
│   │       │       └── Columns: Customer, Agent, Agency, State, General information, Effective date, Policy
│   │       └── Tab: Projection (second view / grouped)
│   │
│   ├── 3. BUSINESS BOOK
│   │   ├── Customers (Customer Catalog)
│   │   │   ├── Filters: Search, Agentes, Carrier, Policy type, Customer type, Adult
│   │   │   ├── Columns: Agentes, Fullname, DOB, General information, Created
│   │   │   └── Customer Detail View (on click)
│   │   │       ├── Left panel: Policies count, Agent, Assigned, Family members, Family group income, Income group, Message, Address, Process policies, Relationship
│   │   │       ├── Tab: General information (Name, DOB, Email, Phone, SSN, Gender, Language, Immigration Status, Marital status, Country of birth, Height, Weight, Smoker)
│   │   │       ├── Tab: Family members
│   │   │       ├── Tab: Payment Information
│   │   │       ├── Tab: Opportunities
│   │   │       ├── Tab: Policies
│   │   │       └── Tab: Member Policies
│   │   ├── Opportunities (Pipeline Board)
│   │   │   ├── Tab: Follow-up (Kanban pipeline board)
│   │   │   │   └── Pipeline stages: Lead → Cita → Visita Casa → Vendido
│   │   │   ├── Tab: Opportunities (list view)
│   │   │   └── Tab: Attachments
│   │   └── WhatsApp
│   │       ├── Tab: Dashboard (Tickets summary — Total, Open, Closed tickets; Tickets statistics; Tickets by category)
│   │       ├── Tab: WhatsApp numbers
│   │       ├── Tab: Layouts
│   │       └── Tab: Chatbot config
│   │
│   ├── 4. CONTRACTS
│   │   ├── Contract Notifications
│   │   │   └── Filters: Status, Message, User, Carrier, Policy type, Agency, Agency leader, New state, New contract, Shared contract, Start/End Created
│   │   │       └── Columns: Created, User, Subject, Message, Status, Archive
│   │   ├── Contract Messages (Contracts Messenger)
│   │   │   └── Same structure as Contract Notifications (messaging log)
│   │   ├── Contracts Requests
│   │   │   ├── Filters: Search, Status, Carrier, Agency, Type insurance, Agentes, Labels, Start/End dates
│   │   │   └── KPI Cards + list (Total, Cancelled, In-progress, Approved, Refused, Lapsed, Pending, etc.)
│   │   ├── Agents
│   │   │   ├── Filters: Search (Name/Phone/NPN/Email), Agents, Agency, Carrier, Pipeline board, Labels
│   │   │   └── Columns: First name, Agency, Created date, Approval date, Data (email/phone), Check (Info/Lic/Err/W9), Status
│   │   └── Licenses
│   │       ├── Filters: Search, State, Agency
│   │       └── Columns: First name, License number, State, Carriers, License class, License type, Issue date, Expiration date, Attachments
│   │
│   ├── 5. COMMISSIONS
│   │   ├── Tickets Notifications
│   │   │   └── Filters: Status, Message, User, Carrier, Policy type, Agency, Start/End Created
│   │   │       └── Columns: Created, User, Subject, Message, Status, Archive
│   │   ├── Tickets Messages (Tickets Messenger)
│   │   │   └── Same structure as Tickets Notifications
│   │   ├── Activities Tickets
│   │   │   └── Filters: Status, On time, User, Policy type, Type, Activities, Start/End Due date
│   │   │       └── Columns: User, Activities, Created date, Due date, Closed date, Comments, State
│   │   ├── Policy (Commission-linked policy view)
│   │   │   └── Same as Policy > List of Policies, in commission context
│   │   ├── Tickets
│   │   │   ├── Tab: Tickets
│   │   │   │   └── Filters: Creator, Agency, Status, Carrier, Month, Search, Labels, Start/End
│   │   │   │       └── Columns: id, Agency, Agent, Owner, Policy type, Created on, Notifications, Type of claim, Commissions
│   │   │   └── Tab: Mesa ayuda agrupados (Grouped help desk)
│   │   └── Statement
│   │       ├── Tab: Statement (carrier commission statements)
│   │       │   └── Filters: Name/Key, Created, Carrier, Report month, Status
│   │       │       └── Columns: Name, Total, Status, Carrier, lineas, Report month, Policy type, Commission Type, Key, Date of Creation
│   │       ├── Tab: Configuraciones (configurations)
│   │       ├── Tab: Commissions (commission breakdown)
│   │       └── Tab: Override (override commissions)
│   │
│   ├── 6. MARKETING
│   │   ├── Email Campaigns
│   │   │   └── Dashboard Marketing Email
│   │   │       ├── KPIs: Total Campaigns, Recipients, Open rate, Click rate
│   │   │       ├── Marketing Plan Consumer Summary (SMS / Email / WhatsApp quotas)
│   │   │       └── Campaign States chart
│   │   ├── SMS Campaigns
│   │   │   ├── Tab: SMS Campaigns (list)
│   │   │   │   └── Columns: Name, Subject, Status, Programming sent, Recipients
│   │   │   ├── Tab: Layouts
│   │   │   └── Tab: Configuration
│   │   ├── WhatsApp Campaigns
│   │   │   ├── Tab: WhatsApp Campaigns (list)
│   │   │   │   └── Columns: First name, Number, Customer type, Programming sent, Recipients
│   │   │   └── Tab: Chatbot config
│   │   └── Bots Telegram
│   │       └── Tab: Bots de Telegram
│   │           └── Columns: Alias, Token, Edit
│   │
│   └── 7. SETTINGS
│       └── Agency Settings
│           ├── Tab: Excel Template Attachments (Annexes/claim format uploads)
│           ├── Tab: Contract status (custom contract status configuration)
│           ├── Tab: Agents (agent configuration)
│           ├── Tab: Asignados (assignments)
│           ├── Tab: Prequalifying (pre-qualification criteria)
│           ├── Tab: Pipeline board (pipeline stage configuration)
│           ├── Tab: Configuracion_chatbot (chatbot settings)
│           └── Tab: User transfer (user reassignment)
│
└── ── FOOTER ──
    └── (No distinct footer navigation detected; top bar and sidebar replicate all navigation)


## User Journeys

From the data entities, workflows, and action permissions observed, TrinityHub360 serves at least nine distinct user types (some missing):

1. FMO (Field Marketing Organization) — Top-tier distributor managing multiple agencies
2. Agency Manager — Oversees a single agency's operations, agents, and performance
3. Broker / Agent — Front-line seller of insurance policies
4. Contracts Manager — Processes and approves agent contracting with carriers
5. Office Manager — Manages policy administration, follow-up, and customer data
6. Commissions Manager — Manages commission statements, ticket claims, and payouts
7. Reclamos Manager — Handles commission dispute tickets (claims/reclamos)
8. Standard Backoffice — General operations support across Policy, Contracts, and Messaging
9. Developer / System Administrator — Configures the platform, bots, pipelines, and integrations

### 1. FMO (Field Marketing Organization)
Core Goal: Monitor performance across all sub-agencies and agents; oversee commission structures.
STAGE 1 — LOGIN & ORIENTATION
  └── Log in → Dashboard (My Agency)
        ├── View Notifications widget (open/closed counts, monthly trend)
        └── View Activities/Tasks widget (pending/overdue task KPIs)

STAGE 2 — PORTFOLIO OVERVIEW
  └── Policy > List of Policies
        ├── Filter by Agency (dropdown: all agencies visible)
        ├── Review KPI cards: Total policies (14,720), Members (22,741),
        │   Cancellations (954 / 6%), NPN override (3,267 / 22%),
        │   Referrals (2,843 / 19%)
        └── Export data (download icon in toolbar)

STAGE 3 — AGENT NETWORK OVERSIGHT
  └── Contracts > Agents
        ├── Filter by Agency, Carrier, Pipeline board
        ├── Review Check column: Inf ge / Lic / Err / W9 compliance
        ├── Review Status: Approved / Ready to sell
        └── [More options] → Contracts (view agent's carrier contracts)

STAGE 4 — COMMISSIONS OVERSIGHT
  └── Commissions > Statement
        ├── Tab: Statement — filter by Carrier, Report month, Status
        ├── Tab: Commissions — review commission breakdowns per agent
        └── Tab: Override — approve or adjust override commissions

STAGE 5 — SALES PROJECTION REVIEW
  └── Policy > Sales Projection
        ├── Tab: Projection — filter by Effective year, Agents, Agency
        └── Review: Customer, Agent, Agency, State, General info, Effective date

STAGE 6 — MARKETING PERFORMANCE
  └── Marketing > Email Campaigns
        └── Dashboard: Total campaigns (69), Recipients (252),
            Open rate (110%), Click rate (72%)
            Marketing Plan Consumer Summary: SMS/Email/WhatsApp quota usage

STAGE 7 — MESSAGING & ESCALATIONS
  ├── General Notifications (bell icon / sidebar) — filter by Type, Status
  └── General Messages (chat icon / sidebar) — view platform-wide messages

### 2. Agency Manager
Core Goal: Run day-to-day agency operations — track policy performance, manage customer relationships, and oversee their agents.
STAGE 1 — DAILY DASHBOARD CHECK
  └── Dashboard → Home
        ├── Notifications widget: Total / Open / Closed / This Month
        │     └── [Detail] → Notification status pie + Monthly trend bar chart
        └── Activities widget: Total / Pending / Overdue / Completed tasks
              └── [Detail] → Task status chart + Top 6 activity types

STAGE 2 — POLICY ADMINISTRATION
  └── Policy > List of Policies
        ├── Search by name/phone/email
        ├── Filter: Effective year, Policy type, Status, Carrier,
        │   Agents, Follow-up, Record agent, Agency
        ├── Review Status per row: New | Con ✓/✗ | Eli ✓/✗ | Doc ✓/✗ | Pmt ✓/✗
        ├── [More options per row] →
        │     ├── Policy detail (full view)
        │     ├── Renew
        │     ├── Insurance change
        │     ├── Policy holder change
        │     ├── Attachments
        │     └── PDF
        └── [+ New Policy] → Create new policy

STAGE 3 — POLICY DETAIL WORKFLOW
  └── Policy Detail Page
        ├── Left panel: Customer, Agent, Creator, Record agent, Assigned,
        │   Authorized Agent, Agency, Policy type, Carrier, Status (editable),
        │   Monthly payment, Effective date, Family members/Insured,
        │   Family group income, Income group, Created date, Last update,
        │   Collection date, Activities count, Attachments count, Labels,
        │   Message log count
        ├── Workflow status bar: No consent | No Eligibility |
        │   Pending documents | Binder payment
        ├── [More options] → Renew / Insurance change / Policy holder change
        └── Tabs:
              ├── Policy summary (Insured details, DOB, Email, Phone, SSN,
              │   Immigration Status, Marital status, Address, Mailing address,
              │   Legal documents, Employment information, Beneficiary)
              ├── Policy members
              ├── Activities (task log)
              ├── Document signing
              ├── Attachments
              ├── Tracking by status
              └── Change control (audit log)

STAGE 4 — DRAFT POLICIES
  └── Policy > Draft → same view filtered to "Status: Draft"

STAGE 5 — ACTIVITIES MANAGEMENT
  └── Policy > Activities
        ├── Filter: Status, On time, User, Policy type, Type, Activities,
        │   Start/End Due date
        └── Table: User, Activities, Created date, Due date, Closed date,
            Comments, State (Closed / Days late +N)

STAGE 6 — CUSTOMER MANAGEMENT
  └── Business Book > Customers
        ├── Search + Filter: Agentes, Carrier, Policy type, Customer type, Adult
        ├── [+ Add] / [Automatic mail] (bulk email)
        └── Customer Detail:
              ├── Left panel: Policies count, Agent, Assigned, Family members,
              │   Family group income, Income group, Message, Address,
              │   Process policies, Relationship
              └── Tabs:
                    ├── General information (DOB, Email, Phone, SSN, Gender,
                    │   Language, Immigration Status, Marital status, Country,
                    │   Height, Weight, Smoker)
                    ├── Family members
                    ├── Payment Information
                    ├── Opportunities
                    ├── Policies
                    └── Member Policies

STAGE 7 — OPPORTUNITIES (CRM PIPELINE)
  └── Business Book > Opportunities
        ├── Tab: Follow-up — Kanban board
        │     └── Pipeline stages: Lead → Cita → Visita Casa → Vendido
        ├── Tab: Opportunities — list view with filters
        └── Tab: Attachments

STAGE 8 — NOTIFICATIONS & MESSAGES
  ├── My Agency > General Notifications
  └── My Agency > General Messages (Messenger)

STAGE 9 — SETTINGS
  └── Settings > Agency Settings
        ├── Tab: Contract status (custom workflow statuses)
        ├── Tab: Agents (agent configuration)
        ├── Tab: Asignados (assignment rules)
        ├── Tab: Prequalifying
        ├── Tab: Pipeline board (Kanban stage configuration)
        └── Tab: User transfer

### 3. Broker / Agent
Core Goal: Manage their own book of business — add customers, sell policies, track activities, and maintain their own profile for contracting.
STAGE 1 — PROFILE COMPLETION (ONBOARDING)
  └── My Profile
        ├── Tab: General information
        │     └── Fill: First name, Last name, DOB, Phone, Email, SSN, NPN,
        │           Type of Contracts, Language, Gender, P.O. Box,
        │           Bank account number, Type of account, Address
        ├── Tab: Licenses
        │     └── Alert: "Missing fields" until General info is complete
        │           Then: Add license by State, License class, License type,
        │                 Issue date, Expiration date, Carriers, Attachments
        ├── Tab: Attachments
        │     └── Upload: Errors & Omissions, General, Driving License,
        │           Certifications for exchange state
        ├── Tab: Contracts
        │     └── Information Validation checklist:
        │           ✓ Address, ✓ SSN, ✓ Bank account number,
        │           ✓ Type of account, ✓ NPN, ✓ Licenses, ✓ Attachments
        ├── Tab: My notes (rich-text message log — personal notes)
        ├── Tab: Change control (audit trail of profile changes)
        └── Tab: Trusted devices

STAGE 2 — CUSTOMER ACQUISITION
  └── Business Book > Customers
        ├── [+ Add] → Create new customer record
        ├── Fill: Name, DOB, Email, Phone, SSN, Gender, Language,
        │   Immigration Status, Marital status, Country of birth,
        │   Address, Family members, Income
        └── Search existing customers by name/phone/email

STAGE 3 — POLICY CREATION
  └── Policy > List of Policies → [+ New Policy]
        ├── Select: Customer, Carrier, Policy type, Effective year,
        │   Insured members, Income group, Coverage plan
        └── Policy moves to "Draft" status

STAGE 4 — DRAFT FOLLOW-UP
  └── Policy > Draft → Find pending draft policies
        └── Complete required fields → Submit for processing

STAGE 5 — ACTIVITY MANAGEMENT
  └── Policy > Activities
        ├── View assigned activities by Due date / Status
        ├── Activity types observed: "Subir Estatus Migratorio",
        │   "Other", specific carrier tasks
        └── Mark activities complete / add comments

STAGE 6 — LEAD & OPPORTUNITY MANAGEMENT
  └── Business Book > Opportunities
        └── Follow-up Kanban: Move leads through
              Lead → Cita (Appointment) → Visita Casa (Home visit) → Vendido (Sold)

STAGE 7 — WHATSAPP COMMUNICATION
  └── Business Book > WhatsApp
        ├── Tab: Dashboard — view ticket summary (Total / Open / Closed)
        ├── Tab: WhatsApp numbers — configured lines
        └── Tab: Chatbot config — chatbot interaction setup

STAGE 8 — SALES PROJECTION REVIEW
  └── Policy > Sales Projection
        └── View own policies with commission projections

### 4. Contracts Manager
Core Goal: Approve agent contracting with carriers, manage contract requests, validate compliance.
STAGE 1 — CONTRACTS REQUESTS QUEUE
  └── Contracts > Contracts Requests
        ├── Review KPI cards: Total (11,824 / 100%), Active (7,039 / 60%),
        │   Contract sent (2%), Instructions sent (3%), Pending (0.09%),
        │   Refused (28.63%), Lapsed (9.3%)
        ├── Filter: Status, Carrier, Agency, Type insurance, Agentes, Labels,
        │   Start/End dates
        ├── Table: Consecutive #, Agent (NPN), Agency, Insurance company,
        │   Notifications, Status, Update date, Type insurance, State badge
        ├── [Notifications] button — view contract notifications
        └── [More options per row] → Change status (workflow action)

STAGE 2 — CONTRACT STATUS WORKFLOW
  └── Status pipeline:
        → New request received
        → Instructions sent (agent receives how-to)
        → Contract sent (carrier contract delivered to agent)
        → Approved / Refused / Lapsed

STAGE 3 — AGENT MANAGEMENT
  └── Contracts > Agents
        ├── Search by Name, Phone, NPN, Email
        ├── Filter by Agency, Carrier, Pipeline board, Labels
        ├── Review compliance Check column per agent:
        │   Inf ge(neral info) / Lic(enses) / Err(ors & omissions) / W9
        ├── [More options per row] →
        │     ├── Edit (open agent full profile)
        │     ├── Contracts (view/manage carrier contracts)
        │     └── Change status (Approve / Reject / Pending)
        └── [+ Add] → Register new agent
            [Registration link] → Generate agent self-registration URL
            [Follow-up] → Create follow-up activities for agent

STAGE 4 — AGENT PROFILE REVIEW (from Agents > Edit)
  └── Agent Profile Tabs:
        ├── General information (Personal data, NPN, Type of Contracts)
        ├── Licenses (by State, class, type, carrier — compliance check)
        ├── Attachments (E&O doc, W9, Driving license, Certifications)
        ├── Contracts (Information Validation checklist status)
        ├── My notes (internal notes log)
        ├── Change control (audit log of all profile changes)
        └── Trusted devices

STAGE 5 — LICENSES MANAGEMENT
  └── Contracts > Licenses
        ├── Filter: Search, State, Agency
        └── Table: First name, License number, State, Carriers,
              License class, License type, Issue date, Expiration date,
              Attachments

STAGE 6 — NOTIFICATION MONITORING
  └── Contracts > Contract Notifications
        ├── Filter: Status, Message, User, Carrier, Policy type, Agency,
        │   Agency leader, New state, New contract, Shared contract, Date range
        └── Table: Created, User, Subject, Message, Status, Archive

STAGE 7 — MESSAGING CENTER
  └── Contracts > Contract Messages (Messenger)
        └── Review: real-time contract-related message threads
              (e.g., "Buen dia, solicito nuevamente contrato para el agente")

### 5. Office Manager
Core Goal: Manage policy lifecycle, customer data, activities, and follow-up tasks.
STAGE 1 — DAILY DASHBOARD
  └── Dashboard → Notifications + Activities widgets

STAGE 2 — POLICY QUEUE MANAGEMENT
  └── Policy > List of Policies
        ├── Filter by Status (New, Active, Cancelled, etc.)
        ├── Monitor Status column: Con / Eli / Doc / Pmt checkmarks
        └── For each policy needing action:
              └── Policy Detail → Workflow status bar:
                    ├── [No consent] → Collect and log consent
                    ├── [No Eligibility] → Verify eligibility with carrier
                    ├── [Pending documents] → Request missing docs
                    └── [Binder payment] → Confirm first payment

STAGE 3 — POLICY LIFECYCLE ACTIONS
  └── Policy Detail → [More options]
        ├── Renew — trigger renewal process
        ├── Insurance change — update carrier
        └── Policy holder change — update policy owner

STAGE 4 — DOCUMENT MANAGEMENT
  └── Policy Detail → Tab: Document signing
        └── Collect e-signatures on required documents

  └── Policy Detail → Tab: Attachments
        └── Upload/download supporting documents

STAGE 5 — ACTIVITIES & FOLLOW-UP
  └── Policy > Activities
        ├── Filter by User, Status, On time, Activity type
        ├── Track: Pending / Overdue / Completed
        └── Add new activities (e.g., "Subir Estatus Migratorio", "Other")

STAGE 6 — CUSTOMER DATA MAINTENANCE
  └── Business Book > Customers
        ├── Update customer profile:
        │   Immigration Status, Marital status, Income group
        └── Verify Family members, Family group income, Beneficiaries

STAGE 7 — GENERAL NOTIFICATIONS TRIAGE
  └── My Agency > General Notifications
        ├── Filter: Status (Open/Closed), Type, Date range
        └── Archive resolved notifications

STAGE 8 — DRAFT MONITORING
  └── Policy > Draft
        └── Find incomplete policies and coordinate completion with agents

### 6. Commissions Manager
Core Goal: Reconcile carrier statements, manage commission structures, and resolve discrepancies.
STAGE 1 — STATEMENT MANAGEMENT
  └── Commissions > Statement
        ├── Tab: Statement
        │     ├── Filter: Name/Key, Created, Carrier, Report month, Status
        │     └── Table: Name, Total, Status, Carrier, lineas, Report month,
        │           Policy type, Commission Type, Key, Date of Creation
        ├── Tab: Configuraciones — set commission rules/configs
        ├── Tab: Commissions — detailed commission line items
        └── Tab: Override — manage override/bonus structures

STAGE 2 — POLICY COMMISSION VIEW
  └── Commissions > Policy (commission-linked list)
        ├── Same as Policy List but in commission context
        ├── KPI cards: Total policies (14,720), Cancellations (954 / 6%),
        │   NPN override (3,267 / 22%), Referrals (2,843 / 19%)
        └── Filter by Effective year, Policy type, Status, Carrier, Agents

STAGE 3 — SALES PROJECTION REVIEW
  └── Policy > Sales Projection
        ├── Tab: Projection (simple) — Customer, Agent, Agency, State,
        │   General info, Effective date, Policy
        │   Filter: With commissions checkbox, Record agent
        └── Tab: Projection (grouped view)

STAGE 4 — TICKET NOTIFICATIONS REVIEW
  └── Commissions > Tickets Notifications
        ├── Filter: Status, Message, User, Carrier, Policy type, Agency
        └── Table: Created, User, Subject, Message, Status, Archive

STAGE 5 — TICKET MESSAGING
  └── Commissions > Tickets Messages
        └── View and respond to commission-related message threads

STAGE 6 — ACTIVITIES TICKETS
  └── Commissions > Activities Tickets
        ├── Filter: Status, On time, User, Policy type, Type, Date range
        └── Track: Commission-related task completion

### 7. Reclamos Manager (Claims / Dispute Manager)
Core Goal: Receive, review, and resolve commission dispute tickets filed by agents or agencies.
STAGE 1 — TICKET QUEUE MANAGEMENT
  └── Commissions > Tickets
        ├── Tab: Tickets (individual claims)
        │     ├── Filter: Creator (dropdown), Agency, Status, Carrier, Month,
        │     │   Search (Key, Agent), Labels, Start/End dates
        │     └── Table: id, Agency, Agent, Owner, Policy type, Created on,
        │           Notifications, Type of claim, Commissions
        └── Tab: Mesa ayuda agrupados (grouped help desk view)
              └── Same columns + bulk Edit checkbox for batch processing

STAGE 2 — TICKET CREATION (by agent / initiator)
  └── [+ Add] → Create new ticket
        ├── Fields: Agency, Agent, Owner, Policy type, Type of claim,
        │   Commission amount, Start date, Labels
        └── Notification sent to Reclamos Manager

STAGE 3 — TICKET INVESTIGATION
  └── Open Ticket Record
        ├── Review: Policy details, Commission discrepancy
        ├── Check: Notifications count (badge on row)
        └── Coordinate: Cross-reference Commissions > Policy and Statement

STAGE 4 — TICKET RESOLUTION
  └── Update ticket status (Resolved / Rejected)
        └── Commission adjustment via Commissions > Statement > Override tab

STAGE 5 — MESSAGING & NOTIFICATIONS
  ├── Commissions > Tickets Notifications (status change alerts)
  └── Commissions > Tickets Messages (thread communication with claimant)

STAGE 6 — ACTIVITIES TRACKING
  └── Commissions > Activities Tickets
        └── Log follow-up tasks per ticket: Due date, Closed date, Comments

### 8. Standard Backoffice
Core Goal: Support day-to-day cross-functional operations — data entry, messaging, notifications, and basic contract/policy processing.
STAGE 1 — NOTIFICATION TRIAGE
  └── My Agency > General Notifications
        ├── Filter: Status (Open/Closed), Message content, Type, Date range
        └── Archive handled items

STAGE 2 — MESSAGE HANDLING
  └── My Agency > General Messages (Messenger)
        ├── View: Created, User, Subject, Message content, Status, Archive
        └── Respond to contract-related threads
              (e.g., "Buen dia Daniela el agente llamo a nipr y le indicaron...")

STAGE 3 — CONTRACT NOTIFICATIONS PROCESSING
  └── Contracts > Contract Notifications
        ├── Filter: Status, User, Carrier, Policy type, Agency, Agency leader,
        │   New state, New contract, Shared contract, Date range
        └── Archive resolved notifications

STAGE 4 — CONTRACT MESSAGING SUPPORT
  └── Contracts > Contract Messages
        └── Triage and route contract-related messages to correct owner

STAGE 5 — POLICY UPDATES
  └── Policy > List of Policies
        ├── Update policy status fields
        ├── Add activities/tasks
        └── Upload attachments

STAGE 6 — CUSTOMER DATA ENTRY
  └── Business Book > Customers
        ├── Create/update customer records
        └── Verify: DOB, SSN, Address, Immigration status, Income group

STAGE 7 — LICENSE MONITORING
  └── Contracts > Licenses
        ├── Check expiring licenses (Expiration date column)
        └── Flag agents with expired/missing licenses for Contracts Manager

STAGE 8 — ACTIVITIES PROCESSING
  ├── Policy > Activities (policy-related tasks)
  └── Commissions > Activities Tickets (commission-related tasks)

### 9. Developer / System Administrator
Core Goal: Configure platform behavior — pipeline stages, contract statuses, chatbots, user access, and marketing integrations.
STAGE 1 — AGENCY SETTINGS CONFIGURATION
  └── Settings > Agency Settings
        ├── Tab: Excel Template Attachments
        │     └── Upload claim templates (e.g., "FORMATO DE RECLAMACION FLORIDA.xlsx",
        │           "FORMATO DE RECLAMACION GENERAL.xlsm") per Annexe category
        ├── Tab: Contract status
        │     └── Define custom contract workflow states
        ├── Tab: Agents
        │     └── Configure default agent parameters
        ├── Tab: Asignados
        │     └── Set automatic assignment rules (agent → manager pairings)
        ├── Tab: Prequalifying
        │     └── Define pre-qualification criteria for leads/agents
        ├── Tab: Pipeline board
        │     └── Configure Kanban stages (Lead / Cita / Visita Casa / Vendido)
        ├── Tab: Configuracion_chatbot
        │     └── WhatsApp/Telegram bot behavior, prompts, flows
        └── Tab: User transfer
              └── Reassign user portfolios (bulk policy/customer transfer)

STAGE 2 — WHATSAPP INTEGRATION SETUP
  └── Business Book > WhatsApp
        ├── Tab: WhatsApp numbers — register/manage phone numbers
        ├── Tab: Layouts — design message layouts/templates
        └── Tab: Chatbot config — configure bot flows and triggers

STAGE 3 — MARKETING CHANNEL SETUP
  ├── Marketing > Email Campaigns
  │     └── Monitor plan usage: SMS (0/0), Email (0/0), WhatsApp (0/0)
  │           (quota-limited by subscription tier)
  ├── Marketing > SMS Campaigns
  │     ├── Tab: SMS Campaigns — create/manage campaigns
  │     ├── Tab: Layouts — design SMS message templates
  │     └── Tab: Configuration — API keys, sender ID setup
  ├── Marketing > WhatsApp Campaigns
  │     ├── [Templates WhatsApp] button — manage approved message templates
  │     └── Tab: Chatbot config — automated campaign bot setup
  └── Marketing > Bots Telegram
        └── Register bots: Alias + Token (API credentials)

STAGE 4 — USER & ACCESS MANAGEMENT
  └── Settings > Agency Settings > User transfer
        └── Move users between agencies or reassign agent portfolios

STAGE 5 — AUDIT & COMPLIANCE MONITORING
  ├── My Profile > Change control — audit log (User, timestamp, Action)
  │     (e.g., "Create User molanod901@gmail.com, id 34333231, profile Trinity Manager")
  └── Policy Detail > Change control — track policy-level modifications

STAGE 6 — PIPELINE MONITORING (DEVELOPER VIEW)
  └── Contracts > Agents — Pipeline board filter
        └── View agent distribution across pipeline stages

STAGE 7 — NOTIFICATIONS INFRASTRUCTURE
  └── General Notifications → Type filter (review all notification types available)
        └── Confirm all notification channels are active and routing correctly

### Concluding Synthesis
TrinityHub360 operates as a multi-tenant, role-stratified insurance agency management platform with a clearly layered operational hierarchy. The FMO and Agency Manager personas consume the platform at a strategic/oversight level, primarily through dashboards, aggregated KPI cards, and filtered list views across agencies. The Broker/Agent operates at the transactional front-line level, managing their individual book of customers, policies, and leads through a CRM pipeline. The three specialized manager roles (Contracts, Commissions/Reclamos, Office) each own a distinct operational workflow — contracting/licensing compliance, commission reconciliation/claims, and policy lifecycle management respectively — with deeply overlapping notification and messaging centers that serve as cross-functional coordination layers. The Standard Backoffice role acts as a generalist support layer tying these workflows together through data entry, triage, and administrative follow-up. Finally, the Developer/Admin role sits below the surface of all journeys, configuring the rails on which every other persona operates — from pipeline board stages and contract statuses to chatbot flows and marketing channel quotas.
The platform's design reveals a hub-and-spoke communication model: every key entity (policy, agent, contract, ticket) has its own notification feed, messenger thread, activity log, attachment store, and change control audit trail — enabling full traceability and cross-role collaboration without requiring external tools.
