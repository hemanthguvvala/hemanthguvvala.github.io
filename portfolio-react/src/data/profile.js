/**
 * Single source of truth for personal / brand identity.
 *
 * Everything here is factual and verifiable. Do not add metrics, download
 * counts, ratings or revenue figures unless they come from a real source.
 *
 * NOTE ON BRANDING: the "product studio" layer is intentionally unnamed for
 * now. `studio.name` below is a neutral placeholder — when a real parent brand
 * name is chosen, change it in this one place and it propagates site-wide.
 */

import { PLAY_DEVELOPER_URL } from './products';

export const SITE_URL = 'https://hemanthguvvala.github.io';

export const person = {
  name: 'Hemanth Kumar Guvvala',
  shortName: 'Hemanth',
  initials: 'HKG',
  /*
   * The site positions on the role, not on an employer.
   *
   * There is deliberately no `company` field here. The employment history is
   * factual and stays where it belongs — src/data/career.js, rendered on
   * /timeline — but nothing in the site's own positioning, page descriptions
   * or structured data names a current employer. Do not add one back: it would
   * reappear in the JSON-LD on every page, which is where it matters least to
   * a reader and most to a machine.
   */
  jobTitle: 'Software Engineer',
  secondaryTitle: 'Independent Product Builder',
  location: 'India',
  email: 'hemanthkumarguvvala@gmail.com',
  resumeUrl: '/Hemanth_Kumar_Guvvala_Resume.pdf',
  avatar: 'https://github.com/hemanthguvvala.png',
  tagline: 'I build useful digital products and software systems.',
  summary:
    'From everyday utilities and productivity tools to developer learning platforms and mobile apps, I design, build and launch products focused on solving real problems.',
};

/**
 * Neutral parent-brand layer. Rename `name` when a real studio brand exists.
 */
export const studio = {
  name: 'Product Studio',
  attribution: `Built by ${person.name}`,
  positioning:
    'A growing collection of independent products — each with its own identity, all built and maintained by one engineer.',
};

/**
 * Public profiles only. Do not add networks that are not actually used.
 */
export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'github.com/hemanthguvvala',
    url: 'https://github.com/hemanthguvvala',
    icon: 'code',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/hemanthkumarguvvala',
    url: 'https://www.linkedin.com/in/hemanthkumarguvvala/',
    icon: 'work',
  },
  {
    id: 'playstore',
    label: 'Google Play',
    // Registered Play developer name, double-u and all — do not "correct" it.
    handle: 'Hemanth Kumar Guuvvala',
    url: PLAY_DEVELOPER_URL,
    icon: 'shop',
  },
  {
    id: 'email',
    label: 'Email',
    handle: person.email,
    url: `mailto:${person.email}`,
    icon: 'alternate_email',
  },
];

/** Used by JSON-LD `sameAs`. Email is deliberately excluded. */
export const sameAs = socials.filter((s) => s.id !== 'email').map((s) => s.url);

/**
 * Short, non-inflated credibility markers for the homepage trust strip.
 */
export const credibility = [
  // The role and the independent work in one marker, because the two together
  // are the positioning — neither on its own describes what is on this site.
  { label: 'Software Engineer', detail: 'Enterprise platforms & own products' },
  { label: 'Java · Spring Boot · Kafka', detail: 'Backend & event-driven systems' },
  { label: 'Product Engineering', detail: 'Airline domain platforms' },
  { label: 'Cloud & DevOps', detail: 'AWS · Docker · CI/CD' },
  { label: 'AI & Developer Tooling', detail: 'GitHub Copilot adoption' },
];

/**
 * The build loop shown on the homepage. Story, not metrics.
 */
export const buildLoop = [
  {
    step: 'Idea',
    icon: 'lightbulb',
    detail: 'A problem I hit myself, or one I keep watching other people work around.',
  },
  {
    step: 'Prototype',
    icon: 'construction',
    detail: 'Smallest version that proves the idea is worth finishing.',
  },
  { step: 'Launch', icon: 'rocket_launch', detail: 'Ship it publicly. A real listing, a real URL.' },
  {
    step: 'Learn',
    icon: 'insights',
    detail: 'Watch what people actually use and where they drop off.',
  },
  { step: 'Improve', icon: 'autorenew', detail: 'Iterate, or archive it honestly and move on.' },
];
