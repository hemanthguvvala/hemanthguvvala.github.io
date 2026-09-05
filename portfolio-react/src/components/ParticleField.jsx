import { useEffect, useRef } from 'react';

const SRC = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';

/**
 * Decorative particle background.
 *
 * Deliberately constrained:
 *  - only mounted on the homepage, so other routes never pay for it;
 *  - skipped entirely under prefers-reduced-motion;
 *  - skipped on small screens, where it costs battery and buys nothing;
 *  - the script is appended after mount so it never blocks first render.
 */
export default function ParticleField() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 767px)').matches;
    if (reduced || small) return;

    started.current = true;

    const existing = document.querySelector(`script[src="${SRC}"]`);
    const init = () => {
      if (!window.particlesJS || !document.getElementById('particles-js')) return;
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
            width: 1,
          },
          move: { enable: true, speed: 1.5, out_mode: 'out' },
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: false }, onclick: { enable: false }, resize: true },
        },
        retina_detect: true,
      });
    };

    if (existing) {
      init();
      return;
    }

    const script = document.createElement('script');
    script.src = SRC;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = init;
    document.body.appendChild(script);
  }, []);

  return <div id="particles-js" aria-hidden="true" />;
}
