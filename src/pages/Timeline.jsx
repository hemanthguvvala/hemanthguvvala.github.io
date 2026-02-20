import { motion } from 'framer-motion';

const timelineData = [
  {
    year: '2024',
    dateRange: 'Jul 2024 - Present',
    title: 'Lead Product Engineer',
    company: 'IBS Software',
    description:
      'Promoted to Lead. Driving 30+ enterprise features to 10+ global airlines. Won 1st place in Prompt Engineering Challenge 2025 and pioneered org-wide GitHub Copilot adoption.',
    icon: 'terminal',
    isCurrent: true,
    side: 'left',
    bgIcon: 'crown',
  },
  {
    year: '2022',
    dateRange: 'Oct 2022 - Jul 2024',
    title: 'Senior Product Engineer',
    company: 'IBS Software',
    description:
      'Head-hunted by IBS while working at Marlabs. Improved transaction throughput by 30%, resolved 980+ production issues with 100% SLA adherence. Won Debutant Award within first year.',
    icon: 'speed',
    isCurrent: false,
    side: 'right',
  },
  {
    year: '2022',
    dateRange: 'Jan 2022 - Oct 2022',
    title: 'Software Engineer',
    company: 'Marlabs Inc.',
    description:
      'Started professional career building enterprise solutions. Worked on-site with IBS Software as client, where outstanding performance led to being head-hunted as a permanent employee.',
    icon: 'code',
    isCurrent: false,
    side: 'left',
  },
];

const educationData = [
  {
    dateRange: '2015 - 2019',
    title: 'B.Tech — Electronics & Communication Engineering',
    institution: 'SSITS (Sri Sai Institute of Technology & Science), Rayachoty',
    note: 'Graduated with 78% (8.1 CGPA)',
    icon: 'school',
  },
  {
    dateRange: '2013 - 2015',
    title: 'Intermediate — MPC',
    institution: 'Narayana Junior College, Rayachoty',
    note: 'Completed with 92%',
    icon: 'menu_book',
  },
  {
    dateRange: '2013',
    title: '10th Class',
    institution: 'CS Raju High School, Rayachoty',
    note: '8.8 GPA',
    icon: 'history_edu',
  },
];

export default function Timeline() {
  return (
    <div className="page-container relative min-h-screen w-full flex flex-col items-center py-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 w-full max-w-5xl px-6 mb-20 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          04. Timeline
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
          Engineering{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200">
            Journey
          </span>
        </h2>
        <p className="text-slate-400 max-w-xl text-lg font-light">
          A chronological archive of technical leadership, architectural decisions, and system optimizations.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative z-20 w-full max-w-5xl px-4 md:px-6">
        <div className="timeline-rail relative flex flex-col gap-12 md:gap-24 py-10">
          {timelineData.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center"
            >
              {entry.side === 'left' ? (
                <>
                  {/* Left Content */}
                  <div className="order-2 md:order-1 flex flex-col items-start md:items-end text-left md:text-right">
                    <div
                      className={`bg-card-dark border border-slate-800 p-6 rounded-xl shadow-lg transition-all duration-300 w-full relative overflow-hidden ${
                        entry.isCurrent
                          ? 'hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,194,158,0.1)] group-hover:translate-x-1'
                          : 'hover:border-primary/30 hover:-translate-y-1'
                      }`}
                    >
                      {entry.bgIcon && (
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                          <span className="material-symbols-outlined text-4xl">{entry.bgIcon}</span>
                        </div>
                      )}
                      <span
                        className={`inline-block px-2 py-1 mb-3 text-xs font-mono rounded border ${
                          entry.isCurrent
                            ? 'text-primary bg-primary/10 border-primary/20'
                            : 'text-slate-400 bg-slate-800/50 border-slate-700'
                        }`}
                      >
                        {entry.dateRange}
                      </span>
                      <h3 className="text-xl font-display font-bold text-white mb-1">{entry.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">{entry.company}</p>
                      <div className="flex items-start gap-3 md:justify-end text-slate-300">
                        <span
                          className={`material-symbols-outlined text-lg mt-0.5 shrink-0 ${
                            entry.isCurrent ? 'text-primary' : 'text-primary/70'
                          }`}
                        >
                          {entry.icon}
                        </span>
                        <p className="text-sm leading-relaxed">{entry.description}</p>
                      </div>
                    </div>
                  </div>
                  {/* Center Marker */}
                  <div className="order-1 md:order-2 flex justify-start md:justify-center relative pl-3 md:pl-0">
                    <div
                      className={`relative z-10 flex items-center justify-center rounded-full bg-background-dark transition-transform duration-300 ${
                        entry.isCurrent
                          ? 'w-10 h-10 border-2 border-primary shadow-[0_0_15px_rgba(0,194,158,0.4)] group-hover:scale-110'
                          : 'w-8 h-8 border-2 border-slate-600 group-hover:border-primary'
                      }`}
                    >
                      <div
                        className={`rounded-full ${
                          entry.isCurrent
                            ? 'w-3 h-3 bg-primary animate-pulse'
                            : 'w-2 h-2 bg-slate-600 group-hover:bg-primary transition-colors'
                        }`}
                      ></div>
                    </div>
                  </div>
                  {/* Right Year */}
                  <div className="order-3 hidden md:block">
                    <span className="text-8xl font-display font-bold text-slate-800/50 select-none group-hover:text-slate-800 transition-colors">
                      {entry.year}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {/* Left Year */}
                  <div className="order-3 md:order-1 hidden md:block text-right">
                    <span className="text-8xl font-display font-bold text-slate-800/50 select-none group-hover:text-slate-800 transition-colors">
                      {entry.year}
                    </span>
                  </div>
                  {/* Center Marker */}
                  <div className="order-1 md:order-2 flex justify-start md:justify-center relative pl-3 md:pl-0">
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-background-dark border-2 border-slate-600 group-hover:border-primary transition-colors duration-300">
                      <div className="w-2 h-2 bg-slate-600 rounded-full group-hover:bg-primary transition-colors"></div>
                    </div>
                  </div>
                  {/* Right Content */}
                  <div className="order-2 md:order-3">
                    <div className="bg-card-dark border border-slate-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 w-full relative overflow-hidden">
                      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
                      <span className="inline-block px-2 py-1 mb-3 text-xs font-mono text-slate-400 bg-slate-800/50 rounded border border-slate-700">
                        {entry.dateRange}
                      </span>
                      <h3 className="text-xl font-display font-bold text-white mb-1">{entry.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">{entry.company}</p>
                      <div className="flex items-start gap-3 text-slate-300">
                        <span className="material-symbols-outlined text-primary/70 text-lg mt-0.5 shrink-0">
                          {entry.icon}
                        </span>
                        <p className="text-sm leading-relaxed">{entry.description}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}

          {/* Education Entries */}
          {educationData.map((edu, index) => (
            <motion.div
              key={`edu-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center opacity-80 hover:opacity-100 transition-opacity"
            >
              <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-3'} flex flex-col ${index % 2 === 0 ? 'items-start md:items-end text-left md:text-right' : 'items-start text-left'}`}>
                <div className="bg-card-dark border border-slate-800/50 p-5 rounded-xl shadow-lg transition-all duration-300 w-full relative overflow-hidden">
                  <div className={`flex items-center gap-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} mb-3`}>
                    <span className="material-symbols-outlined text-2xl" style={{ color: '#B8860B' }}>
                      {edu.icon}
                    </span>
                    <span
                      className="inline-block px-2 py-1 text-xs font-mono rounded border"
                      style={{
                        color: '#B8860B',
                        backgroundColor: 'rgba(184,134,11,0.1)',
                        borderColor: 'rgba(184,134,11,0.2)',
                      }}
                    >
                      {edu.dateRange}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-1">{edu.title}</h3>
                  <p className="text-slate-500 text-sm">{edu.institution}</p>
                  <p className="text-slate-400 text-xs mt-2 italic">{edu.note}</p>
                </div>
              </div>
              {/* Center Marker */}
              <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-2'} flex justify-start md:justify-center relative pl-3 md:pl-0`}>
                <div
                  className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background-dark border-2"
                  style={{ borderColor: 'rgba(184,134,11,0.5)', boxShadow: '0 0 10px rgba(184,134,11,0.2)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#B8860B' }}></div>
                </div>
              </div>
              <div className={`order-3 ${index % 2 === 0 ? 'md:order-3' : 'md:order-1'} hidden md:block`}></div>
            </motion.div>
          ))}

          {/* End Cap */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start">
            <div className="order-1 md:order-2 flex justify-start md:justify-center relative pl-3 md:pl-0">
              <div className="w-2 h-2 bg-slate-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
