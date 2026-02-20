import { motion } from 'framer-motion';

const contactCards = [
  {
    title: 'Email',
    value: 'hemanth@example.com',
    icon: 'mail',
    href: 'mailto:hemanth@example.com',
  },
  {
    title: 'GitHub',
    value: 'github.com/hemanth',
    icon: 'terminal',
    href: 'https://github.com/hemanthguvvala',
  },
  {
    title: 'LinkedIn',
    value: 'linkedin.com/in/hemanth',
    icon: 'contact_page',
    href: 'https://linkedin.com/in/hemanthguvvala',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  return (
    <div className="page-container flex-grow flex flex-col items-center justify-center relative">
      {/* Technical Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage:
            'linear-gradient(to right, #1f3632 1px, transparent 1px), linear-gradient(to bottom, #1f3632 1px, transparent 1px)',
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>

      <div className="flex flex-col max-w-[960px] w-full px-4 py-20 z-10">
        {/* Hero / CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 mb-16 text-center"
        >
          <div className="flex flex-col gap-6 items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Open to Opportunities
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight max-w-[800px] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-display">
              Let's build something durable.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-[600px]">
              Lead Product Engineer specializing in Java, Spring Boot & Kafka microservices. Currently seeking SDE2/SDE3 or Backend Engineer roles to build resilient systems at scale.
            </p>
          </div>
        </motion.div>

        {/* Contact Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
        >
          {contactCards.map((card, index) => (
            <motion.a
              key={index}
              variants={item}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative flex flex-col gap-4 p-6 rounded-xl bg-surface-dark/50 hover:bg-surface-dark border border-white/5 hover:border-primary/50 transition-all duration-300 glow-hover"
            >
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                    {card.icon}
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors transform -rotate-45 group-hover:rotate-0">
                  arrow_forward
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 font-display">{card.title}</h3>
                <p className="text-slate-400 text-sm font-mono group-hover:text-primary/80 transition-colors">
                  {card.value}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
