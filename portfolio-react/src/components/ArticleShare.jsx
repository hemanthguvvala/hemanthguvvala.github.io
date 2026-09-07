import { useEffect, useRef, useState } from 'react';
import { canonicalUrl } from '../seo/head';
import { socials } from '../data/profile';
import { EVENTS, track } from '../utils/analytics';

const linkedIn = socials.find((s) => s.id === 'linkedin');

/**
 * Share and discuss row for a journey entry.
 *
 * This exists instead of a comment system. Comments on a static site need a
 * third party — Disqus brings ads and trackers that would contradict the
 * cookieless posture of the rest of the site, and Giscus needs readers to hold
 * a GitHub account and log in, so the section sits visibly empty. An empty
 * comment box under an article reads as an abandoned site.
 *
 * Sending the conversation to LinkedIn costs nothing, never renders empty, and
 * puts discussion somewhere it also reaches an audience.
 */
export default function ArticleShare({ article, path }) {
  const url = canonicalUrl(path);
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  // A pending timeout must not fire after the reader has navigated away.
  useEffect(() => () => clearTimeout(timer.current), []);

  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
      track(EVENTS.articleShare, { slug: article.slug, method: 'copy_link' });
    } catch {
      // Clipboard access can be refused outright; the share link still works.
    }
  };

  const base =
    'inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border-dark bg-card-dark/70 px-4 text-sm font-medium transition-colors hover:border-primary/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

  return (
    <section
      aria-labelledby="share-heading"
      className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h2 id="share-heading" className="font-display font-bold text-white">
          Found this useful?
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Share it, or reply to me on LinkedIn — I read everything.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(EVENTS.articleShare, { slug: article.slug, method: 'linkedin' })}
          className={`${base} text-text-secondary`}
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            share
          </span>
          Share
        </a>

        {linkedIn && (
          <a
            href={linkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.socialClick, { network: 'linkedin', from: 'article' })}
            className={`${base} text-text-secondary`}
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              forum
            </span>
            Discuss
          </a>
        )}

        <button type="button" onClick={copy} className={`${base} text-text-secondary`}>
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            {copied ? 'check' : 'link'}
          </span>
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>

      {/* Announced to screen readers; the icon swap alone would be silent. */}
      <p aria-live="polite" className="sr-only">
        {copied ? 'Link copied to clipboard' : ''}
      </p>
    </section>
  );
}
