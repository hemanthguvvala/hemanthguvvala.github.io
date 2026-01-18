#!/bin/bash

# Create all component and page files

mkdir -p src/components src/pages

# Navigation Component
cat > src/components/Navigation.jsx << 'EOF'
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-background-dark/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative size-10 flex items-center justify-center bg-primary/10 rounded-lg border border-primary/30 group-hover:border-primary transition-all">
            <span className="material-symbols-outlined text-primary text-2xl">code</span>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold tracking-tight">HKG</h2>
            <p className="text-xs text-slate-500 font-mono">v2.5.0</p>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors relative group \${location.pathname === '/' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Home</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/skills" className={`text-sm font-medium transition-colors relative group \${location.pathname === '/skills' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Skills</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/products" className={`text-sm font-medium transition-colors relative group \${location.pathname === '/products' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Products</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/awards" className={`text-sm font-medium transition-colors relative group \${location.pathname === '/awards' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}>
            <span>Awards</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
EOF

# Footer Component
cat > src/components/Footer.jsx << 'EOF'
export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 z-10 bg-surface-dark/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Hemanth Kumar Guvvala</h3>
            <p className="text-slate-500 text-sm font-mono">Senior Product Engineer • System Architect</p>
            <p className="text-slate-600 text-xs mt-2">© 2026 All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/hemanthguvvala" target="_blank" rel="noopener noreferrer" className="group p-3 bg-surface-light rounded-lg border border-white/10 hover:border-primary transition-all">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">code</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
EOF

# Home Page - Advanced Interactive
cat > src/pages/Home.jsx << 'EOF'
import { useEffect, useState } from 'react';

export default function Home() {
  const [terminalLines, setTerminalLines] = useState([]);

  useEffect(() => {
    const commands = [
      { prompt: '$ ', command: 'kubectl get pods --all-namespaces', output: 'NAMESPACE     NAME                          READY   STATUS    RESTARTS   AGE\nproduction    api-gateway-7d8f9c-xyz        2/2     Running   0          5d' },
      { prompt: '$ ', command: 'docker ps', output: 'CONTAINER ID   IMAGE                STATUS       PORTS\n7a8f9c2e1b3d   nginx:alpine         Up 5 days    0.0.0.0:80->80/tcp' }
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < commands.length) {
        setTerminalLines(prev => [...prev, commands[index]]);
        index++;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-dark border border-primary/30 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-mono text-primary">SYSTEM OPERATIONAL</span>
              <span className="text-xs text-slate-500">|</span>
              <span className="text-sm font-mono text-slate-400">Senior Product Engineer</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tighter">
              <span className="inline-block bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent glow-text">
                Hemanth Kumar
              </span>
              <br/>
              <span className="inline-block bg-gradient-to-r from-primary via-accent to-white bg-clip-text text-transparent glow-text">
                Guvvala
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                I architect <span className="text-primary font-semibold">distributed systems</span> that scale,
                build <span className="text-accent font-semibold">high-performance APIs</span> that fly,
                and design <span className="text-primary font-semibold">resilient infrastructure</span> that never sleeps.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-mono text-slate-500">
                <span className="px-3 py-1 bg-surface-dark rounded border border-white/10"># Microservices</span>
                <span className="px-3 py-1 bg-surface-dark rounded border border-white/10"># Cloud Native</span>
                <span className="px-3 py-1 bg-surface-dark rounded border border-white/10"># DevOps</span>
                <span className="px-3 py-1 bg-surface-dark rounded border border-white/10"># System Design</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <a href="#terminal" className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-background-dark font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:-translate-y-1 flex items-center gap-3">
                <span className="material-symbols-outlined">terminal</span>
                <span>Launch Terminal</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </div>

            <div className="pt-16 flex items-center justify-center gap-8 opacity-50 hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-primary" title="Cloud Infrastructure">cloud</span>
              <span className="material-symbols-outlined text-4xl text-accent" title="Database Systems">storage</span>
              <span className="material-symbols-outlined text-4xl text-primary" title="Security">security</span>
              <span className="material-symbols-outlined text-4xl text-accent" title="API Development">api</span>
              <span className="material-symbols-outlined text-4xl text-primary" title="Monitoring">monitoring</span>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section id="terminal" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-mono text-primary uppercase tracking-wider">// Interactive Demo</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
              Live <span className="text-primary">Terminal</span> Experience
            </h2>
          </div>

          <div className="max-w-5xl mx-auto bg-terminal-bg border border-primary/20 rounded-lg overflow-hidden">
            <div className="bg-gradient-to-b from-surface-light to-surface-dark px-4 py-3 flex items-center gap-2 border-b border-primary/20">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-sm font-mono text-slate-400">hemanth@system:~</span>
            </div>
            <div className="p-6 font-mono text-sm min-h-[400px]">
              {terminalLines.map((line, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-start">
                    <span className="text-primary mr-2">{line.prompt}</span>
                    <span className="text-slate-300">{line.command}</span>
                  </div>
                  <pre className="text-emerald-400 mt-2 ml-4 whitespace-pre-wrap">{line.output}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
EOF

# Skills Page
cat > src/pages/Skills.jsx << 'EOF'
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
EOF

# Products Page
cat > src/pages/Products.jsx << 'EOF'
export default function Products() {
  const products = [
    { name: 'Distributed Event Bus', tech: 'Go • RabbitMQ', desc: 'High-throughput messaging system' },
    { name: 'API Gateway', tech: 'Node.js • Kong', desc: 'Scalable API management platform' },
    { name: 'Monitoring Dashboard', tech: 'React • Grafana', desc: 'Real-time system observability' }
  ];

  return (
    <div className="page-container py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary uppercase tracking-wider">// Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            Featured <span className="text-primary">Products</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="group bg-surface-dark p-8 rounded-2xl border border-primary/20 hover:border-primary transition-all hover:transform hover:-translate-y-2">
              <div className="mb-4">
                <span className="material-symbols-outlined text-5xl text-primary">layers</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-sm font-mono text-accent mb-4">{product.tech}</p>
              <p className="text-slate-400">{product.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
EOF

# Featured Product Page
cat > src/pages/FeaturedProduct.jsx << 'EOF'
export default function FeaturedProduct() {
  return (
    <div className="page-container py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary uppercase tracking-wider">// Spotlight</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            Featured <span className="text-primary">Product</span>
          </h1>
        </div>

        <div className="max-w-4xl mx-auto bg-surface-dark p-12 rounded-2xl border border-primary/30">
          <h2 className="text-4xl font-bold mb-6 text-white">Distributed Event Bus</h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            A high-performance, scalable messaging system designed to handle millions of events per second 
            with guaranteed delivery and fault tolerance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-surface-light rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-sm text-slate-400">Events/sec</div>
            </div>
            <div className="text-center p-6 bg-surface-light rounded-xl">
              <div className="text-4xl font-bold text-accent mb-2">99.99%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
            <div className="text-center p-6 bg-surface-light rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">&lt;50ms</div>
              <div className="text-sm text-slate-400">Latency</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Key Features</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Horizontal scalability with auto-sharding
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Dead letter queue for failed messages
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Built-in monitoring and alerting
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

# Awards Page
cat > src/pages/Awards.jsx << 'EOF'
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
EOF

echo "All components and pages created successfully!"
