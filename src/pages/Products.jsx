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
