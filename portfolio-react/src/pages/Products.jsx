import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const products = [
  {
    name: 'Ashta Chamma',
    desc: 'Traditional Indian strategy board game with multiplayer support and AI opponents.',
    tags: ['Android', 'Kotlin', 'Game Engine'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPlAp35de9QdKwxlgd28LcOZQlYqq882Gno-E3_maeSsy2PEKUxpicahYUbaEPBV4gVdIyqMj6V7Hi99YMWOvOB1hJegKrM3CFKrX9tGVd1PZymmjWYIrx7MOjSifyqk2rBU4BjLjaHxEYYBItTr6jg8UU1Ee24ylKlPJxnVwor9O3UmgA4FBAI9AEyp9Hx7wP3qs-lU2-wlnm2YaH52ph7ZFcdcROzQFjmbKy9SZroyb34wwgbahq3wjVHMtkVOmpr0RvHzWYMhU',
    badge: { text: 'Live', type: 'live' },
    rating: '4.6',
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
  {
    name: 'BrainBuzz: Riddles & Puzzles',
    desc: 'Collection of mind-bending riddles, logic puzzles, and brain teasers with progressive difficulty.',
    tags: ['Android', 'Java', 'SQLite'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSDmzYh_p4EM8R0daf3LeAbA5pqWT-VvDqxDuNIhq0d5BXWO-W7hZGmYpjYtE55OQfDMSXxKxbrk_Ed6L6maqm7oWnQuX8JZpi1IWzN9IgEz6ddb1KMPA0YlSqkwRi1h9DDIOs5UYLegTLpsNDRZojkF8p8cR7FtwjzKjaH9sUdp9O5If_unH6lAT2DQzSnDyRyS6aNd_Rb6ezLizmKLNmBOHsGz0dF-ggO4a4eSb_krQqGiNElW25BTckcl0iUJpZjBRA4EGE3gk',
    badge: { text: 'Featured', type: 'featured' },
    rating: '4.6',
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
  {
    name: 'The Dot and The Line',
    desc: 'Minimalist arcade game with physics-based mechanics and endless gameplay.',
    tags: ['Android', 'Unity', 'C#'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLRhd-JYDGPPw1Gn4KHlDMIqdpjfMESvK97Ml3njzpLf-fAVE97OatiBU85PrMzIhWJxPWMfE8wrGASwlJ3Ql3ySg5tivAed-VwXgof9elaso894HcbaxFXWNJYdiE3oHfX1B6O3TXJ_Z976I1QeqQx8d7W5UeW4lrs9dlTxJXwyhyBF3NZxnSD3aitGgg-plmKSy-86t46Dlfeen1WTHaQsFfvHRPCOwT5tPCnflbBmvStopfatxXurA8Go9JpQ9SMkSc6WY-_KE',
    badge: null,
    rating: '4.4',
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
  {
    name: 'Circuit Flow: Logic Puzzle',
    desc: 'Connect circuits and solve electrical flow puzzles with increasing complexity.',
    tags: ['Android', 'Kotlin', 'Canvas API'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzWR6qsccuDFgflveUJztpFOjl4LsBbTVHRvQ3JX_KBlZ-QuahYpy1mJ6K56SvoGSeSKphajUlQLM8oOIMrBcVaJrzelloHZf1eRkesjmLZBZJjJjIeBx2J5GjX7N8E8VdsR0UbqTWK4l7hqgfGZ3ECk0AxXTNLbjOsKFmgl1ofQJI4DuMLW0j4uk3NDZIMKYR142WSTiniFb2ZnFwoVUQJpeoWi5BQLK51HEw8qMYFf1zWpcJNaN05ht0YBXIJKh5v0jZrRRsUcc',
    badge: null,
    rating: '4.0',
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
  {
    name: 'QuickScan: QR & Barcode',
    desc: 'Fast and reliable QR code and barcode scanner with history tracking and batch scanning.',
    tags: ['Android', 'ML Kit', 'CameraX'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK1yjIUSMNxLbITNq8fuP5O_RJSL8WEi_XgbZezA5Jl55nLM-idyzBZxXF1M1DRI_4im8VkdnYX6kldGydgtvW7ZT6KnhsK9ITJVdTrPThvugK1ubqjUSoCbTRYFMBf5TUhI7t2dXam4WYn_ltJXoLuhkPFnlgjbtW_OR3vuf8dP-tf-bVv_Z70xz2LtybLYmY51x0bcR7NWPo4lDa-SMgYyy1EX1ejq6ur9b7TXhGuOuuQGyoR8GFOw3h8ZI29aRFh0bWnUwH9Vs',
    badge: { text: 'Live', type: 'live' },
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
  {
    name: 'PDF Toolkit: Merge & Compress',
    desc: 'Complete PDF utility with merge, split, compress, and convert features.',
    tags: ['Android', 'PDF Library', 'Kotlin'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBky3UKG5MyyaeFYfNERFbOPDDkk0Q22V-A3u9OP7Q-gBy3F1L2-X35vopcPstq7Y7ccifSm52zgs6gFeVRLxhAzrluCGcU_TTs3sdKdui7uKZARaM62okM4grOoE2SsGqrjoS1md-BxiMkWbubCqjkQorzcVWH3kjxVntyiYtwVwouvTalh8bplUII7wRkox2q4ioo7r9rTEFoGWo9Ln8dEZ7esxU6snlbbG4_5bhsNibFcnTHpHeNPVSIxavL1nhPm4zInm8VFkQ',
    badge: null,
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
  {
    name: 'Stitch Infinite',
    desc: 'Creative photo editor with filters, stickers, and collage maker for social media.',
    tags: ['Android', 'Image Processing', 'OpenCV'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLRhd-JYDGPPw1Gn4KHlDMIqdpjfMESvK97Ml3njzpLf-fAVE97OatiBU85PrMzIhWJxPWMfE8wrGASwlJ3Ql3ySg5tivAed-VwXgof9elaso894HcbaxFXWNJYdiE3oHfX1B6O3TXJ_Z976I1QeqQx8d7W5UeW4lrs9dlTxJXwyhyBF3NZxnSD3aitGgg-plmKSy-86t46Dlfeen1WTHaQsFfvHRPCOwT5tPCnflbBmvStopfatxXurA8Go9JpQ9SMkSc6WY-_KE',
    badge: null,
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
  {
    name: 'Cricket Highlights',
    desc: 'Stay updated with latest cricket match highlights, scores, and player statistics.',
    tags: ['Android', 'REST API', 'Video Player'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSDmzYh_p4EM8R0daf3LeAbA5pqWT-VvDqxDuNIhq0d5BXWO-W7hZGmYpjYtE55OQfDMSXxKxbrk_Ed6L6maqm7oWnQuX8JZpi1IWzN9IgEz6ddb1KMPA0YlSqkwRi1h9DDIOs5UYLegTLpsNDRZojkF8p8cR7FtwjzKjaH9sUdp9O5If_unH6lAT2DQzSnDyRyS6aNd_Rb6ezLizmKLNmBOHsGz0dF-ggO4a4eSb_krQqGiNElW25BTckcl0iUJpZjBRA4EGE3gk',
    badge: null,
    rating: '3.1',
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
  {
    name: 'Ghost Notes: Secure Notepad',
    desc: 'Privacy-focused notes app with encryption, password protection, and cloud backup.',
    tags: ['Android', 'Encryption', 'Room DB'],
    badge: null,
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
  {
    name: 'ZenLife AI',
    desc: 'AI-powered mindfulness and meditation assistant with personalized recommendations.',
    tags: ['Android', 'ML', 'TensorFlow Lite'],
    badge: null,
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
  {
    name: 'Zodiac Age Calculator',
    desc: 'Discover your zodiac sign, birth chart, and daily horoscopes with detailed analysis.',
    tags: ['Android', 'Kotlin', 'API Integration'],
    badge: null,
    playStoreUrl: 'https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Products() {
  return (
    <div className="page-container py-12 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col gap-4 max-w-2xl relative z-10">
            <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-wider uppercase">
              <span className="w-8 h-[1px] bg-primary"></span>
              Selected Work
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em] text-white">
              Android Apps &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
                Projects
              </span>
            </h1>
            <p className="text-text-secondary text-lg font-normal leading-relaxed max-w-lg">
              Published 11+ Android applications on Google Play Store with 10,000+ downloads and 4.0+ average rating across puzzle games, productivity tools, and utilities.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {products.map((product, index) => (
            <motion.article
              key={index}
              variants={cardItem}
              tabIndex={product.badge?.type === 'coming' ? -1 : 0}
              role="link"
              aria-label={`View ${product.name} on Play Store`}
              onClick={() => product.playStoreUrl && product.badge?.type !== 'coming' && window.open(product.playStoreUrl, '_blank', 'noopener,noreferrer')}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && product.playStoreUrl && product.badge?.type !== 'coming') {
                  e.preventDefault();
                  window.open(product.playStoreUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              className={`group relative flex flex-col h-full bg-card-dark border border-border-dark rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,194,158,0.1)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                product.badge?.type === 'coming' ? '' : 'cursor-pointer'
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#1c322d] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10"></div>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={`${product.name} app screenshot`}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      product.badge?.type === 'coming' ? 'blur-sm scale-110' : ''
                    }`}
                  />
                ) : (
                  <div className="w-full h-full bg-[#1c322d] flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary/30" aria-hidden="true">android</span>
                  </div>
                )}

                {/* Coming soon lock overlay */}
                {product.badge?.type === 'coming' && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-white">lock</span>
                    <span className="text-white font-display font-bold text-lg mt-2">Coming Soon</span>
                  </div>
                )}

                {/* Badge */}
                {product.badge && product.badge.type === 'live' && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse"></span>
                      Live
                    </span>
                  </div>
                )}
                {product.badge && product.badge.type === 'featured' && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-xs font-medium text-amber-500">
                      <span className="material-symbols-outlined text-[14px] mr-1">trophy</span>
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Rating */}
                {product.rating && (
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                      <span className="material-symbols-outlined text-[14px] text-amber-400">star</span>
                      {product.rating}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`flex flex-col flex-1 p-6 gap-4 ${product.badge?.type === 'coming' ? 'opacity-75' : ''}`}>
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary line-clamp-2">{product.desc}</p>
                  </div>
                  {product.badge?.type !== 'coming' && product.playStoreUrl && (
                    <button 
                      aria-label={`View ${product.name} on Play Store`}
                      className="flex-shrink-0 text-slate-500 group-hover:text-primary transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      <span className="material-symbols-outlined">arrow_outward</span>
                    </button>
                  )}
                </div>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded text-xs font-medium border ${
                          product.badge?.type === 'coming'
                            ? 'bg-slate-800 text-slate-400 border-slate-700'
                            : 'bg-primary/10 text-primary border-primary/20'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-text-secondary text-sm mb-6 uppercase tracking-widest">More apps on Play Store</p>
          <a
            href="https://play.google.com/store/apps/developer?id=Hemanth+Kumar+Guuvvala"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white font-bold text-lg border-b-2 border-primary/50 hover:border-primary transition-all pb-1"
          >
            <span>View Play Store Profile</span>
            <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}
