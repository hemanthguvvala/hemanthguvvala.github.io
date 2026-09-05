/**
 * Design tokens for the site.
 *
 * Every colour, radius and shadow used in the app should come from here. If you
 * find yourself writing an arbitrary hex value in a component, add a token
 * instead — the one exception is `product.accent` in src/data/products.js,
 * where each product intentionally carries its own brand colour.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand
        primary: {
          DEFAULT: '#00c29e',
          dark: '#00a082',
          light: '#3ddcbb',
          soft: 'rgba(0, 194, 158, 0.12)',
        },
        accent: '#00d4ff',
        gold: '#eebb4d',

        // Surfaces, darkest to lightest
        background: {
          dark: '#0f231f',
          light: '#f5f8f8',
        },
        surface: {
          DEFAULT: '#162e29',
          dark: '#162e29',
          raised: '#1b3831',
          light: '#1b3831',
        },
        card: {
          dark: '#162b26',
        },

        // Lines and text
        'border-dark': '#273a37',
        'border-strong': '#31504a',
        'text-primary': '#ffffff',
        'text-secondary': '#9abcb6',
        'text-muted': '#6f918b',

        // Status tones for product badges
        status: {
          live: '#00c29e',
          building: '#eebb4d',
          archived: '#7c8f8b',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      spacing: {
        section: '5rem',
        'section-lg': '7rem',
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.28), 0 8px 24px -12px rgba(0,0,0,.5)',
        raised: '0 18px 48px -24px rgba(0,0,0,.75)',
        glow: '0 0 24px -6px rgba(0, 194, 158, 0.45)',
      },
      animation: {
        'fade-in-up': 'fadeInUp .8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(.4,0,.6,1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
