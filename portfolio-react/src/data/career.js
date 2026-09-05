/**
 * Career, education, recognition and engineering expertise.
 *
 * All entries here were already present in the repository and are factual.
 * Do not add proficiency percentages or skill scores — they are invented data
 * by definition.
 */

export const experience = [
  {
    id: 'ibs-lead',
    year: '2024',
    dateRange: 'Jul 2024 — Present',
    title: 'Lead Product Engineer',
    company: 'IBS Software',
    description:
      'Promoted to Lead. Driving 30+ enterprise features to 10+ global airlines. Won 1st place in the Prompt Engineering Challenge 2025 and pioneered org-wide GitHub Copilot adoption.',
    icon: 'terminal',
    isCurrent: true,
  },
  {
    id: 'ibs-senior',
    year: '2022',
    dateRange: 'Oct 2022 — Jul 2024',
    title: 'Senior Product Engineer',
    company: 'IBS Software',
    description:
      'Head-hunted by IBS while working at Marlabs. Improved transaction throughput by 30% and resolved 980+ production issues with 100% SLA adherence. Won the Debutant Award within the first year.',
    icon: 'speed',
    isCurrent: false,
  },
  {
    id: 'marlabs',
    year: '2022',
    dateRange: 'Jan 2022 — Oct 2022',
    title: 'Software Engineer',
    company: 'Marlabs Inc.',
    description:
      'Started professional career building enterprise solutions. Worked on-site with IBS Software as client, where performance led to being head-hunted as a permanent employee within 10 months.',
    icon: 'code',
    isCurrent: false,
  },
];

export const education = [
  {
    id: 'btech',
    dateRange: '2015 — 2019',
    title: 'B.Tech — Electronics & Communication Engineering',
    institution: 'SSITS (Sri Sai Institute of Technology & Science), Rayachoty',
    note: 'Graduated with 78% (8.1 CGPA)',
    icon: 'school',
  },
  {
    id: 'intermediate',
    dateRange: '2013 — 2015',
    title: 'Intermediate — MPC',
    institution: 'Narayana Junior College, Rayachoty',
    note: 'Completed with 92%',
    icon: 'menu_book',
  },
  {
    id: 'tenth',
    dateRange: '2013',
    title: '10th Class',
    institution: 'CS Raju High School, Rayachoty',
    note: '8.8 GPA',
    icon: 'history_edu',
  },
];

/**
 * Professional recognition. `kind` separates workplace awards from academic
 * ones so the Awards page can group them without mixing categories.
 */
export const awards = [
  {
    title: 'Prompt Engineering Challenge Winner',
    icon: 'emoji_events',
    year: '2025',
    issuer: 'IBS Software',
    kind: 'professional',
    highlight: true,
    description:
      '1st place in the organization-wide Prompt Engineering Challenge 2025, for AI-assisted development and creative problem-solving.',
  },
  {
    title: 'GitHub Copilot Hackathon',
    icon: 'smart_toy',
    year: 'May 2025',
    issuer: 'Chris Branagan, CTO',
    kind: 'professional',
    highlight: false,
    description:
      'Recognised for effectively using GitHub Copilot in AI-assisted software development through prompt engineering.',
  },
  {
    title: 'Code Quest — Second Runner-Up',
    icon: 'code',
    year: 'Apr 2025',
    issuer: 'Chris Branagan, CTO',
    kind: 'professional',
    highlight: false,
    description:
      'Third place in the Code Quest coding challenge, for coding and problem-solving performance.',
  },
  {
    title: 'Star of the Month',
    icon: 'star',
    year: 'Jul 2025',
    issuer: 'Thara Rajendran',
    kind: 'professional',
    highlight: false,
    description:
      'For performance in technical challenges — 2nd place in the Gamified Coding Challenge and 3rd in CodeQuest — while maintaining bug-fix turnaround.',
  },
  {
    title: 'Shout Out Award',
    icon: 'campaign',
    year: 'Mar 2025',
    issuer: 'Thara Rajendran',
    kind: 'professional',
    highlight: false,
    description:
      'For proactive ownership, prompt issue resolution and keeping production systems running smoothly.',
  },
  {
    title: 'Team Award',
    icon: 'groups',
    year: 'Jan 2025',
    issuer: 'Thara Rajendran',
    kind: 'professional',
    highlight: false,
    description:
      'For enabling the Jakarta Certified Product Version — a critical milestone for the engineering organization.',
  },
  {
    title: 'Team Champ — Copilot Pioneer',
    icon: 'rocket_launch',
    year: 'Nov 2024',
    issuer: 'Thara Rajendran',
    kind: 'professional',
    highlight: true,
    description:
      'Pioneered organization-wide adoption of GitHub Copilot integrated with IntelliJ, piloting and rolling out AI-assisted development workflows.',
  },
  {
    title: 'Debutant Award',
    icon: 'hotel_class',
    year: 'Sep 2023',
    issuer: 'Peter Kerbs',
    kind: 'professional',
    highlight: false,
    description:
      'Mastered complex domain logic quickly and fixed implementation bugs with limited support and fast turnaround.',
  },
  {
    title: 'Team Champ',
    icon: 'diversity_3',
    year: 'Mar 2023',
    issuer: 'Reshmi Sasidharan Pillai',
    kind: 'professional',
    highlight: false,
    description:
      'For going the extra mile and enhancing the value of team deliverables at IBS Software.',
  },
  {
    title: 'Team Champ',
    icon: 'handshake',
    year: 'Oct 2022',
    issuer: 'Ansumole Chacko A',
    kind: 'professional',
    highlight: false,
    description:
      'For consistently going beyond expectations and enhancing team deliverables during early tenure.',
  },
  {
    title: 'Best Project',
    icon: 'workspace_premium',
    year: null,
    issuer: 'SSITS, Rayachoty',
    kind: 'academic',
    highlight: false,
    description: 'Recognised for the final-year engineering project.',
  },
  {
    title: 'Best Student',
    icon: 'school',
    year: null,
    issuer: 'SSITS, Rayachoty',
    kind: 'academic',
    highlight: false,
    description: 'Awarded for overall academic performance.',
  },
];

/**
 * Engineering expertise. Deliberately no percentages or star ratings.
 */
export const engineeringAreas = [
  {
    title: 'Backend Systems',
    icon: 'dns',
    span: 'lg:col-span-2',
    description:
      'Architecting microservices and event-driven systems that handle enterprise-scale airline operations.',
    tags: [
      { label: 'Java', highlight: true },
      { label: 'Spring Boot', highlight: true },
      { label: 'Apache Kafka', highlight: true },
      { label: 'Microservices', highlight: false },
      { label: 'REST APIs', highlight: false },
      { label: 'JPA / Hibernate', highlight: false },
      { label: 'Jakarta EE', highlight: false },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud_sync',
    span: 'col-span-1',
    description:
      'Reduced deployment time by 50% through containerization and cloud infrastructure work.',
    tags: [
      { label: 'AWS', highlight: true },
      { label: 'Docker', highlight: true },
      { label: 'CI/CD', highlight: false },
      { label: 'Linux', highlight: false },
    ],
  },
  {
    title: 'Product Engineering',
    icon: 'architecture',
    span: 'col-span-1',
    description:
      'Delivering 30+ enterprise features to 10+ global airlines, turning business requirements into systems that hold up in production.',
    tags: [
      { label: 'System Design', highlight: false },
      { label: 'Agile / Scrum', highlight: false },
      { label: 'Technical Leadership', highlight: false },
    ],
  },
  {
    title: 'Data & Storage',
    icon: 'database',
    span: 'col-span-1',
    description:
      'Improved transaction throughput by 30% through data layer design and query optimization.',
    tags: [
      { label: 'Oracle', highlight: false },
      { label: 'PostgreSQL', highlight: false },
      { label: 'Redis', highlight: false },
    ],
  },
  {
    title: 'AI & Developer Productivity',
    icon: 'auto_awesome',
    span: 'col-span-1',
    description:
      'Pioneered org-wide GitHub Copilot adoption and won the Prompt Engineering Challenge for AI-assisted development.',
    tags: [
      { label: 'GitHub Copilot', highlight: true },
      { label: 'Prompt Engineering', highlight: true },
      { label: 'IntelliJ', highlight: false },
    ],
  },
  {
    title: 'Product Building',
    icon: 'deployed_code',
    span: 'col-span-1',
    description:
      'Shipping Android and web products end to end — design, build, store listing, release and iteration.',
    tags: [
      { label: 'Kotlin', highlight: true },
      { label: 'Jetpack Compose', highlight: true },
      { label: 'React', highlight: false },
      { label: 'Next.js', highlight: false },
    ],
  },
];
