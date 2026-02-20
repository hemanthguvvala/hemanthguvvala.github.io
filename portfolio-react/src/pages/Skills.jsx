import { motion } from 'framer-motion';

const skillCards = [
  {
    title: 'Backend Systems',
    icon: 'dns',
    description: 'Architecting robust microservices and event-driven systems handling enterprise-scale airline operations.',
    tags: [
      { label: 'Java', highlight: true },
      { label: 'Spring Boot', highlight: true },
      { label: 'Kafka', highlight: true },
      { label: 'Microservices', highlight: false },
      { label: 'REST APIs', highlight: false },
      { label: 'JPA/Hibernate', highlight: false },
      { label: 'Jakarta EE', highlight: false },
    ],
    span: 'lg:col-span-2',
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud_sync',
    description: 'Reduced deployment time by 50% through scalable cloud infrastructure and containerization.',
    tags: [
      { label: 'AWS', highlight: true },
      { label: 'Docker', highlight: true },
      { label: 'CI/CD', highlight: false },
      { label: 'Linux', highlight: false },
    ],
    span: 'col-span-1',
  },
  {
    title: 'Product Engineering',
    icon: 'architecture',
    description: 'Delivering 30+ enterprise features to 10+ global airlines, translating business requirements into scalable solutions.',
    tags: [
      { label: 'System Design', highlight: false },
      { label: 'Agile/Scrum', highlight: false },
      { label: 'Technical Leadership', highlight: false },
    ],
    span: 'col-span-1',
  },
  {
    title: 'Database & Storage',
    icon: 'database',
    description: 'Optimized transaction throughput by 30% through efficient data layer design and query optimization.',
    tags: [
      { label: 'Oracle', highlight: false },
      { label: 'PostgreSQL', highlight: false },
      { label: 'Redis', highlight: false },
    ],
    span: 'col-span-1',
  },
  {
    title: 'AI & Developer Productivity',
    icon: 'auto_awesome',
    description: 'Pioneered org-wide GitHub Copilot adoption. Won Prompt Engineering Challenge for AI-driven code solutions.',
    tags: [
      { label: 'GitHub Copilot', highlight: true },
      { label: 'Prompt Engineering', highlight: true },
      { label: 'IntelliJ', highlight: false },
    ],
    span: 'col-span-1',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  return (
    <div className="page-container py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Heading */}
        <div className="flex flex-col gap-4 max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-primary/80 font-mono text-sm uppercase tracking-wider">
            <span className="w-8 h-[1px] bg-primary"></span>
            Technical Arsenal
          </div>
          <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight tracking-tight font-display">
            Engineering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-200">
              Excellence
            </span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl font-light leading-relaxed max-w-xl">
            Architecting scalable solutions across the full stack with a focus on performance, security, and developer experience.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {skillCards.map((card, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`group relative flex flex-col justify-between gap-6 rounded-2xl border border-border-dark bg-card-dark/80 p-8 ${card.span} hover:border-primary/40 transition-all duration-300 shadow-xl shadow-black/20 overflow-hidden`}
            >
              {/* Hover glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>

              <div className="flex items-start justify-between relative z-10">
                <div className="flex flex-col gap-3">
                  <div className="size-12 rounded-xl bg-[#202f2c] border border-border-dark flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                      {card.icon}
                    </span>
                  </div>
                  <h3 className="text-white text-2xl font-bold font-display">{card.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-md">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                {card.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 rounded-md bg-[#202f2c] border border-border-dark text-xs font-mono font-medium hover:bg-primary/10 transition-colors cursor-default ${
                      tag.highlight ? 'text-primary' : 'text-slate-300'
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
