export default function Skills() {
  const skills = [
    { category: 'Backend', items: ['Node.js', 'Python', 'Go', 'Java', 'Rust'] },
    { category: 'Frontend', items: ['React', 'Vue.js', 'TypeScript', 'Next.js'] },
    { category: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'] },
    { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
    { category: 'System Design', items: ['Microservices', 'Event-Driven', 'API Design', 'Scalability'] }
  ];

  return (
    <div className="page-container py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary uppercase tracking-wider">// Technical Expertise</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            Skills & <span className="text-primary">Technologies</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gradient-to-br from-surface-dark to-surface-light p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all hover:transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-primary mb-6">{skill.category}</h3>
              <div className="space-y-3">
                {skill.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
