/**
 * SINGLE SOURCE OF TRUTH FOR THE LEGAL DOCUMENTS.
 *
 * The privacy policy and the terms both describe how this site actually
 * behaves. Anything stated in them must be true of the code — a policy that
 * describes a site you do not run is worse than no policy, because it is a
 * public statement you can be held to.
 *
 * ── RULES ──────────────────────────────────────────────────────────────────
 * 1. Change the code first, this file second. If analytics, fonts, hosting or
 *    storage change, the lists below change in the same commit.
 * 2. `updated` is the date the wording last changed in a way a reader would
 *    care about. Bump it when you edit the documents, not when you edit this
 *    comment.
 * 3. Never claim a certification, audit, standard or legal basis that does not
 *    exist.
 */

import { person } from './profile';

export const legal = {
  /** Who owns the work and who receives formal notices. */
  owner: person.name,
  noticeEmail: 'hkggroups@gmail.com',

  /**
   * Governing law without an exclusive city, by the owner's choice: courts in
   * India have jurisdiction, and nothing has to be corrected if he moves.
   */
  governingLaw: 'India',
  jurisdiction: 'the courts of competent jurisdiction in India',

  /** Shown on both documents. Bump when the wording materially changes. */
  updated: '2026-09-12',

  /** The first year of publication, for the copyright line. */
  copyrightFrom: 2024,
};

/**
 * Every third party that receives anything about a visitor, and why.
 *
 * This list IS the privacy policy's factual core. Each entry was verified
 * against the code on the `updated` date above:
 *  - hosting: .github/workflows deploys to GitHub Pages
 *  - fonts: index.html links fonts.googleapis.com and fonts.gstatic.com
 *  - analytics: src/components/Analytics.jsx, active only when a beacon token
 *    is set at build time, and skipped entirely when Do Not Track is on
 */
export const processors = [
  {
    name: 'GitHub Pages (GitHub, Inc.)',
    role: 'Hosting and delivery of this website',
    data: 'IP address, browser user-agent and requested URL, in ordinary server logs',
    url: 'https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement',
  },
  {
    name: 'Google Fonts (Google LLC)',
    role: 'The typefaces and icon font this site uses',
    data: 'IP address and user-agent, because the font files are requested from Google servers',
    url: 'https://policies.google.com/privacy',
  },
  {
    name: 'Cloudflare Web Analytics (Cloudflare, Inc.)',
    role: 'Counting page views and page-speed measurements',
    data: 'Page URL, referrer, country, device and browser type. Cookieless, with no fingerprinting and no cross-site profile',
    url: 'https://www.cloudflare.com/privacypolicy/',
  },
];

/**
 * What is stored on the visitor's own device. Not cookies — nothing here is
 * sent to a server, and none of it leaves the browser.
 */
export const localStorageUse = [
  {
    key: 'theme',
    why: 'Remembers whether you chose the light or the dark appearance, so the choice survives a reload.',
  },
];

/**
 * Uses of this site's content and code that are refused outright.
 *
 * The AI and text-and-data-mining entries are a deliberate, express
 * reservation of rights, repeated in robots.txt, /ai.txt and
 * /.well-known/tdmrep.json so the refusal is machine-readable as well as
 * written down.
 */
export const prohibitedUses = [
  'Copying, republishing, mirroring or redistributing any part of this site or its source code, in whole or in part.',
  'Using the text, code, design, structure or images of this site as training, fine-tuning, grounding, evaluation or retrieval data for any machine-learning model, generative AI system or large language model.',
  'Text and data mining, automated harvesting, bulk downloading, scraping or crawling by any means other than a well-behaved search-engine crawler obeying robots.txt.',
  'Reproducing the layout, component structure or visual design of this site as a template, theme or starter for another site or product.',
  'Removing, obscuring or altering any copyright, authorship or licence notice.',
  'Presenting this site, its writing or its products as your own work, or as work you contributed to.',
  'Framing or embedding this site so it appears to be part of another service.',
  'Probing, scanning or load-testing the site or its hosting, or attempting to gain access to anything not published here.',
];
