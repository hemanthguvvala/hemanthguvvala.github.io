/**
 * Structured data builders.
 *
 * HARD RULE: never emit `aggregateRating`, `ratingValue`, `reviewCount`,
 * `interactionCount` or `offers.price` unless the value comes from a real,
 * citable source. Fabricated structured data is a manual-action risk, not a
 * clever SEO trick.
 */

import { person, sameAs, SITE_URL } from '../data/profile';
import { awards } from '../data/career';
import { CATEGORIES, PLATFORMS } from '../data/products';
import { absoluteUrl, canonicalUrl } from './head';

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: person.name,
    jobTitle: `${person.jobTitle} & Product Builder`,
    description: `${person.jobTitle} working on event-driven backend systems in Java, Spring Boot and Kafka, and an independent product builder shipping Android and web products.`,
    url: `${SITE_URL}/`,
    image: person.avatar,
    email: `mailto:${person.email}`,
    // No `worksFor`. This block is emitted on every page of the site, so an
    // employer named here is the single most repeated claim on it. The role is
    // what the site is positioned on; the employment history lives on
    // /timeline, which is the honest place for it.
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'SSITS (Sri Sai Institute of Technology & Science), Rayachoty',
    },
    knowsAbout: [
      'Java',
      'Spring Boot',
      'Apache Kafka',
      'Microservices',
      'Distributed Systems',
      'AWS',
      'Android Development',
      'Product Engineering',
    ],
    award: awards.filter((a) => a.kind === 'professional').map((a) => a.title),
    sameAs,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: `${person.name} — ${person.jobTitle} & Product Builder`,
    description: person.summary,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#person` },
  };
}

export function webPageSchema({ title, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: canonicalUrl(path),
    name: title,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
  };
}

const APPLICATION_CATEGORY = {
  utilities: 'UtilitiesApplication',
  productivity: 'BusinessApplication',
  learning: 'EducationalApplication',
  games: 'GameApplication',
  sports: 'SportsApplication',
  lifestyle: 'LifestyleApplication',
};

/**
 * SoftwareApplication for a single product. Only emitted for products that are
 * actually live — describing an unpublished app as software someone can get is
 * misleading to both users and crawlers.
 */
export function softwareApplicationSchema(product) {
  if (product.status !== 'live') return null;

  const url = product.websiteUrl ?? product.playStoreUrl;
  if (!url) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': product.platform === 'web' ? 'WebApplication' : 'SoftwareApplication',
    name: product.name,
    description: product.shortDescription,
    url,
    applicationCategory: APPLICATION_CATEGORY[product.category] ?? 'UtilitiesApplication',
    operatingSystem: product.platform === 'web' ? 'Any (web browser)' : 'Android',
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
  };

  if (product.icon) schema.image = absoluteUrl(product.icon);
  if (product.platform === 'web') schema.browserRequirements = 'Requires JavaScript';

  return schema;
}

/** ItemList for the products directory. Position order matches what is rendered. */
export function productListSchema(list, { path = '/products', name } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: name ?? `Products by ${person.name}`,
    url: canonicalUrl(path),
    numberOfItems: list.length,
    itemListElement: list.map((product, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: product.name,
      description: product.shortDescription ?? undefined,
      url: product.hasDetailPage
        ? canonicalUrl(`/products/${product.slug}`)
        : (product.websiteUrl ?? product.playStoreUrl ?? undefined),
    })),
  };
}

/**
 * ItemList of Service entries for the services page.
 *
 * Deliberately omits `offers`, `priceRange`, `aggregateRating` and any client
 * or project count — there is no pricing to quote and no review data to cite.
 * The provider is the existing Person node rather than an invented
 * Organization, because one person does this work.
 */
export function servicesSchema(list, { path = '/services' } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Software and product development services by ${person.name}`,
    url: canonicalUrl(path),
    numberOfItems: list.length,
    itemListElement: list.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.summary,
        serviceType: service.title,
        provider: { '@id': `${SITE_URL}/#person` },
        areaServed: 'Worldwide',
      },
    })),
  };
}

/**
 * Article schema. No `wordCount`, `commentCount` or engagement metrics — none
 * of that is measured, and inventing it is exactly the kind of fabricated
 * structured data that earns a manual action.
 */
export function articleSchema(article, { path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: canonicalUrl(path),
    datePublished: article.date,
    // No separate revision history is tracked, so modified equals published.
    dateModified: article.date,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    mainEntityOfPage: canonicalUrl(path),
    inLanguage: 'en',
    ...(article.tags?.length ? { keywords: article.tags.join(', ') } : {}),
  };
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.path),
    })),
  };
}

/** Exposed for readable labels in UI that mirrors the schema vocabulary. */
export const humanCategory = (key) => CATEGORIES[key] ?? key;
export const humanPlatform = (key) => PLATFORMS[key] ?? key;
