/**
 * SINGLE SOURCE OF TRUTH FOR SERVICES.
 *
 * Same discipline as products.js: nothing here is hardcoded in JSX, and nothing
 * here may be aspirational.
 *
 * ── RULES ──────────────────────────────────────────────────────────────────
 * 1. `tags` may only name technologies already evidenced elsewhere on this site
 *    — the engineering areas in career.js, or a shipped product in products.js.
 *    If it is not demonstrable from the portfolio, it does not go on the list.
 * 2. `proof` holds product slugs that genuinely demonstrate the service. An
 *    empty array is fine and renders nothing; a padded one is a lie.
 * 3. No pricing, packages, rates, client names, project counts or testimonials.
 *    Every CTA leads to a conversation, not a checkout.
 * 4. First person throughout. One engineer, not "our team".
 */

/**
 * The eight things I take on. Order is deliberate: the broadest, highest-intent
 * offering first, narrower and more specialised work after.
 */
export const services = [
  {
    id: 'product-mvp',
    title: 'Product & MVP Development',
    summary: 'Turn an idea into a working digital product.',
    detail:
      'Scoping what the first version actually needs to prove, then designing, building and launching it. The goal is something real in front of users, not a prototype that never ships.',
    icon: 'rocket_launch',
    tags: ['System Design', 'React', 'Kotlin', 'Spring Boot'],
    proof: ['swapformat', 'quickscan', 'zenlife-ai'],
  },
  {
    id: 'web-apps',
    title: 'Web Application Development',
    summary: 'Modern web applications, tools, dashboards and platforms.',
    detail:
      'Web products that stay fast and maintainable as they grow — including work that runs entirely in the browser when that is the better privacy and performance answer.',
    icon: 'language',
    tags: ['React', 'Next.js', 'REST APIs'],
    proof: ['swapformat', 'codedepth'],
  },
  {
    id: 'android',
    title: 'Android App Development',
    summary: 'Android apps from concept through development and Play Store release.',
    detail:
      'The whole path, not just the code: architecture, implementation, store listing, release and the updates afterwards. I have taken my own apps through this repeatedly.',
    icon: 'phone_android',
    tags: ['Kotlin', 'Jetpack Compose'],
    proof: ['quickscan', 'pdf-toolkit', 'ghost-notes'],
  },
  {
    id: 'backend',
    title: 'Backend & API Development',
    summary: 'Java, Spring Boot, REST APIs, integrations and backend systems.',
    detail:
      'Event-driven and service-based backends, integrations between systems, and the data layer underneath them. This is what I do professionally on airline platforms.',
    icon: 'dns',
    tags: ['Java', 'Spring Boot', 'Apache Kafka', 'REST APIs', 'PostgreSQL'],
    proof: [],
  },
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    summary: 'Feature development, architecture, performance and reliability.',
    detail:
      'Working inside an existing codebase — shipping features, improving architecture, and making a system easier to run and change rather than rewriting it.',
    icon: 'architecture',
    tags: ['Microservices', 'System Design', 'AWS', 'Docker'],
    proof: ['pdf-toolkit', 'stitch-infinite'],
  },
  {
    id: 'consulting',
    title: 'Technical Consulting',
    summary: 'Evaluate an existing product, architecture or technical direction.',
    detail:
      'A considered second opinion: reviewing an architecture, weighing a technical decision, or working out why a system is harder to change than it should be.',
    icon: 'insights',
    tags: ['System Design', 'Technical Leadership'],
    proof: [],
  },
  {
    id: 'ux-improvement',
    title: 'UI/UX & Product Improvement',
    summary: 'Improve usability, workflows and feature design.',
    detail:
      'Product thinking backed by the engineering reality of what it costs to build. Usually the highest-leverage work on a product that already has users.',
    icon: 'design_services',
    tags: ['Jetpack Compose', 'React'],
    proof: ['ghost-notes', 'stitch-infinite'],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    summary: 'Practical AI capabilities and automation, where they genuinely help.',
    detail:
      'Applying AI where it solves a real problem in the product, and automating the repetitive parts of a workflow. I led GitHub Copilot adoption across my organisation and build AI features into my own apps.',
    icon: 'auto_awesome',
    tags: ['GitHub Copilot', 'Prompt Engineering'],
    proof: ['zenlife-ai'],
  },
];

/**
 * Why work with me. Every line is checkable against the rest of this site —
 * no superlatives, no comparisons to other developers, no guarantees.
 */
export const differentiators = [
  {
    icon: 'inventory_2',
    title: 'I ship my own products',
    body: 'These are not case studies from a portfolio I bought into. The apps and web products on this site are mine — designed, built, released and maintained by me.',
  },
  {
    icon: 'hub',
    title: 'Product and engineering together',
    body: 'I make the technical decisions and the product decisions, so the two do not pull against each other. Fewer handoffs, fewer things lost between them.',
  },
  {
    icon: 'all_inclusive',
    title: 'End-to-end ownership',
    body: 'Architecture through release: backend, app, store listing, deployment. You are not left holding the parts nobody wanted to own.',
  },
  {
    icon: 'verified',
    title: 'Production-minded',
    body: 'My day job is enterprise systems where an outage has real consequences. I build for the day after launch, not just the demo.',
  },
  {
    icon: 'construction',
    title: 'New builds and existing systems',
    body: 'Starting something from nothing and working carefully inside a codebase someone else wrote are different skills. I do both.',
  },
  {
    icon: 'chat',
    title: 'Direct communication',
    body: 'You talk to the person writing the code. No account manager relaying requirements.',
  },
];

/** Concrete shapes of work, so a visitor can recognise their own situation. */
export const engagementTypes = [
  { icon: 'lightbulb', label: 'An MVP', detail: 'First version of a new idea' },
  { icon: 'inventory', label: 'A SaaS or product', detail: 'Something people sign in to and use' },
  { icon: 'phone_android', label: 'An Android app', detail: 'Concept through Play Store release' },
  { icon: 'language', label: 'A web application', detail: 'Tools, dashboards, platforms' },
  { icon: 'groups', label: 'An internal tool', detail: 'Software your team runs on' },
  { icon: 'api', label: 'An API or backend', detail: 'Services, integrations, data layer' },
  { icon: 'bolt', label: 'Automation', detail: 'Removing repetitive manual work' },
  { icon: 'trending_up', label: 'Product improvements', detail: 'Making what exists work better' },
];

/** How an engagement actually runs. Kept to five honest steps. */
export const processSteps = [
  {
    step: 'Understand',
    icon: 'search',
    detail: 'What are you actually trying to achieve, and for whom? Usually a conversation, not a form.',
  },
  {
    step: 'Plan',
    icon: 'draw',
    detail: 'Scope, approach and what the first version must include — and what it can leave out.',
  },
  { step: 'Build', icon: 'code', detail: 'Built in visible increments so you are never guessing at progress.' },
  { step: 'Launch', icon: 'rocket_launch', detail: 'Released properly: deployment, store listing, the details that get skipped.' },
  {
    step: 'Improve',
    icon: 'autorenew',
    detail: 'What happens after launch matters more than what happened before it.',
  },
];
