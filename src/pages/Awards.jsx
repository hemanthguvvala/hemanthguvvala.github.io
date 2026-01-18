export default function Awards() {
  const awards = [
    { title: 'Best System Architecture', year: '2025', org: 'Tech Excellence Awards' },
    { title: 'Innovation in DevOps', year: '2024', org: 'Cloud Native Summit' },
    { title: 'Top 10 Engineers', year: '2024', org: 'Tech Magazine' }
  ];

  return (
    <div className="page-container py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary uppercase tracking-wider">// Recognition</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            Awards & <span className="text-primary">Achievements</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div key={index} className="bg-gradient-to-br from-surface-dark to-surface-light p-8 rounded-2xl border border-accent/30 hover:border-accent transition-all">
              <div className="mb-6">
                <span className="material-symbols-outlined text-6xl text-accent">military_tech</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{award.title}</h3>
              <p className="text-accent font-mono text-sm mb-1">{award.year}</p>
              <p className="text-slate-400 text-sm">{award.org}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
