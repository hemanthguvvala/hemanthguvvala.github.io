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
