/**
 * Design tokens for the site.
 *
 * Every colour resolves to a CSS variable defined in `src/theme.css`, which is
 * the single place a colour value is written. That is what makes light mode
 * possible without a `dark:` variant on every class — the same utility resolves
 * differently depending on the theme attribute on <html>.
 *
 * The `rgb(var(--x) / <alpha-value>)` form is required, not stylistic: it is
 * what keeps opacity modifiers like `bg-card-dark/70` and `border-line/10`
 * working against a variable.
 *
 * Contrast for every foreground/surface pair in both themes is verified at
 * WCAG AA. See the note in theme.css before changing a value.
 *
 * The one deliberate exception is `product.accent` in src/data/products.js:
 * each product carries its own brand colour and is not themed.
 *
 * @type {import('tailwindcss').Config}
 */
const themed = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: {
          DEFAULT: themed('--c-primary'),
          dark: themed('--c-primary-dark'),
          // "hover", not "lighter": it brightens in dark mode and darkens in
          // light mode, which is the behaviour every hover state wants.
          light: themed('--c-primary-hover'),
          hover: themed('--c-primary-hover'),
        },
        'on-primary': themed('--c-on-primary'),
        accent: themed('--c-accent'),
        gold: themed('--c-gold'),

        // Surfaces, darkest to lightest in dark mode; inverted in light mode.
        // The `-dark` suffixes are historical names kept to avoid churning
        // hundreds of classes; the values are theme-aware.
        background: {
          dark: themed('--c-bg'),
          light: '#f5f8f8',
        },
        surface: {
          DEFAULT: themed('--c-surface'),
          dark: themed('--c-surface'),
          raised: themed('--c-surface-raised'),
          light: themed('--c-surface-raised'),
        },
        card: {
          dark: themed('--c-card'),
        },

        // Lines and text
        'border-dark': themed('--c-border'),
        'border-strong': themed('--c-border-strong'),
        'text-primary': themed('--c-strong'),
        'text-secondary': themed('--c-text-secondary'),
        'text-muted': themed('--c-text-muted'),

        // Highest-emphasis text. Replaces literal `text-white`, which could not
        // follow the theme.
        strong: themed('--c-strong'),

        // Hairline borders and faint fills. Replaces literal `white/10` etc.,
        // and inverts in light mode so the same class still reads as subtle.
        line: themed('--c-line'),

        // Status tones for product badges
        status: {
          live: themed('--c-primary'),
          building: themed('--c-gold'),
          archived: themed('--c-status-archived'),
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
        card: '0 1px 2px rgb(0 0 0 / calc(0.28 * var(--shadow-strength))), 0 8px 24px -12px rgb(0 0 0 / calc(0.5 * var(--shadow-strength)))',
        raised: '0 18px 48px -24px rgb(0 0 0 / calc(0.75 * var(--shadow-strength)))',
        glow: '0 0 24px -6px rgb(var(--c-primary) / 0.45)',
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
