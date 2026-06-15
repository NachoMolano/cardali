# Cardali

Mockup de dashboard de seguros (Aidgency) en `mockup/`: React 18 + Babel standalone + Tailwind CDN, sin build. `mockup/app.js` contiene toda la app; `mockup/styles.css` los tokens de marca y fondo.

## Registro de arquitectura (OBLIGATORIO)

`docs/arch_aidgency.md` es el registro **funcional** de la plataforma: qué hace y qué contiene cada pantalla, qué flujos se llevan a cabo, qué acciones puede hacer el usuario y qué reglas de negocio aplican — no solo la estructura del front. Es la fuente de verdad y está versionado en git.

Cada vez que se haga un cambio en la arquitectura, estructura o funcionalidad de la plataforma que se está diseñando:
1. Actualizar `docs/arch_aidgency.md` (incluida su sección de registro de cambios, con fecha).
2. Subir una copia fresca a la carpeta `/CARDALI` de Google Drive con la herramienta MCP `create_file` (título `arch_aidgency`, parentId `1tunNAp_NKaWwsPpbGgf-HQEJAlufbTF2`). El conector de Drive no permite editar ni borrar docs existentes, así que cada subida crea un documento nuevo: avisar al usuario para que borre la copia anterior.

Por ahora la fuente del diseño es el mockup en `mockup/`, base de la estructura inicial de la plataforma y del futuro front y back reales.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
