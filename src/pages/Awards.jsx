import { motion } from 'framer-motion';

const awards = [
  {
    title: 'Prompt Engineering Challenge Winner',
    icon: 'emoji_events',
    year: '2025',
    issuer: 'IBS Software',
    description: '1st place winner in the organization-wide Prompt Engineering Challenge 2025, demonstrating excellence in AI-assisted development and creative problem-solving.',
  },
  {
    title: 'Code Quest — Second Runner-Up',
    icon: 'code',
    year: 'Apr 2025',
    issuer: 'Chris Branagan, CTO',
    description: 'Outstanding performance in the Code Quest Coding Challenge (3rd place), demonstrating exceptional coding skills and problem-solving abilities.',
  },
  {
    title: 'GitHub Copilot Hackathon',
    icon: 'smart_toy',
    year: 'May 2025',
    issuer: 'Chris Branagan, CTO',
    description: 'Recognized for effectively utilizing GitHub Copilot in AI-assisted software development, demonstrating creative problem-solving through prompt engineering.',
  },
  {
    title: 'Star of the Month',
    icon: 'star',
    year: 'Jul 2025',
    issuer: 'Thara Rajendran',
    description: 'Outstanding performance in technical challenges — 2nd place in the Gamified Coding Challenge and 3rd in CodeQuest, while maintaining remarkable bug-fix turnaround time.',
  },
  {
    title: 'Shout Out Award',
    icon: 'campaign',
    year: 'Mar 2025',
    issuer: 'Thara Rajendran',
    description: 'Recognized for proactive ownership, prompt issue resolution, and unwavering dedication to ensuring production systems run smoothly.',
  },
  {
    title: 'Team Award',
    icon: 'groups',
    year: 'Jan 2025',
    issuer: 'Thara Rajendran',
    description: 'For enabling the Jakarta Certified Product Version — a critical milestone for the engineering organization at IBS Software.',
  },
  {
    title: 'Team Champ — Copilot Pioneer',
    icon: 'rocket_launch',
    year: 'Nov 2024',
    issuer: 'Thara Rajendran',
    description: 'Pioneered the organization-wide adoption of GitHub Copilot integrated with IntelliJ, piloting and rolling out AI-assisted development workflows.',
  },
  {
    title: 'Debutant Award',
    icon: 'hotel_class',
    year: 'Sep 2023',
    issuer: 'Peter Kerbs',
    description: 'Mastered complex domain logic remarkably fast, played a vital role in fixing implementation bugs with limited support and exceptional turnaround time.',
  },
  {
    title: 'Team Champ',
    icon: 'diversity_3',
    year: 'Mar 2023',
    issuer: 'Reshmi Sasidharan Pillai',
    description: 'Appreciated for going the extra mile and enhancing the value of deliverables from the team at IBS Software.',
  },
  {
    title: 'Team Champ',
    icon: 'handshake',
    year: 'Oct 2022',
    issuer: 'Ansumole Chacko A',
    description: 'Valued for consistently going beyond expectations and enhancing team deliverables during early tenure at IBS Software.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Awards() {
  return (
    <div className="page-container py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border-dark pb-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2 text-gold-accent mb-1">
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
              <span className="text-sm font-bold tracking-widest uppercase opacity-80">Recognition</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] font-display">
              Honors & <span className="text-[#5c7a74]">Achievements</span>
            </h1>
            <p className="text-text-secondary text-lg mt-2 max-w-xl font-light">
              Recognized by peers and leadership at IBS Software for technical excellence, innovation, and consistent delivery.
            </p>
          </div>
          <div className="hidden md:block pb-2">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold-accent to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Awards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group card-hover-effect relative flex flex-col gap-6 rounded-xl border border-border-dark bg-card-dark p-6 overflow-hidden"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1b332d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10 flex justify-between items-start">
                <div className="size-12 rounded-lg bg-background-dark border border-border-dark flex items-center justify-center text-gold-accent shadow-inner group-hover:border-gold-accent/30 transition-colors">
                  <span className="material-symbols-outlined text-[28px]">{award.icon}</span>
                </div>
                <span className="text-[#5c7a74] text-xs font-mono border border-border-dark px-2 py-1 rounded bg-background-dark">
                  {award.year}
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-2 mt-2">
                <h3 className="text-white text-xl font-bold leading-tight group-hover:text-gold-accent transition-colors font-display">
                  {award.title}
                </h3>
                <div className="h-0.5 w-8 bg-border-dark group-hover:bg-gold-accent/50 transition-colors"></div>
                <p className="text-text-secondary text-sm leading-relaxed mt-2">
                  {award.description}
                </p>
                <p className="text-[#5c7a74] text-xs mt-3 font-mono">
                  Issued by {award.issuer} · IBS Software
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative dots */}
        <div className="w-full flex justify-center opacity-30">
          <div className="flex gap-2">
            <div className="size-1 rounded-full bg-gold-accent"></div>
            <div className="size-1 rounded-full bg-gold-accent"></div>
            <div className="size-1 rounded-full bg-gold-accent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
