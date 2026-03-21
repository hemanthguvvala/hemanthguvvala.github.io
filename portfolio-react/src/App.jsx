import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Skills = lazy(() => import('./pages/Skills'));
const Products = lazy(() => import('./pages/Products'));
const Awards = lazy(() => import('./pages/Awards'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Timeline = lazy(() => import('./pages/Timeline'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="page-container py-32 flex flex-col items-center justify-center text-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-primary font-display mb-4">404</h1>
      <p className="text-xl text-slate-400 mb-8">Page not found</p>
      <a href="#/" className="px-6 py-3 bg-primary text-background-dark font-bold rounded-xl hover:bg-white transition-colors">
        Go Home
      </a>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function App() {
  const particlesInitialized = useRef(false);

  useEffect(() => {
    if (particlesInitialized.current) return;
    particlesInitialized.current = true;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
    script.async = true;
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#00c29e' },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#00c29e',
              opacity: 0.2,
              width: 1
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: false },
              onclick: { enable: false },
              resize: true
            },
          },
          retina_detect: true
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <Router>
      <div className="app">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-background-dark focus:rounded-lg focus:font-bold">
          Skip to main content
        </a>
        <div className="animated-grid" aria-hidden="true"></div>
        <div id="particles-js" aria-hidden="true"></div>
        <Navigation />
        <main id="main-content">
          <Suspense fallback={<LoadingFallback />}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/products" element={<Products />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
