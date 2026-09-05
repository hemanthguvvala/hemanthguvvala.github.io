import { socials } from '../data/profile';
import { EVENTS, track } from '../utils/analytics';

/**
 * Public profile links.
 *
 * Icons are never the sole meaning: the icon-only variant carries an
 * aria-label and a title, and the `list` variant shows the label as text.
 */
export default function SocialLinks({ variant = 'icons', className = '' }) {
  if (variant === 'list') {
    return (
      <ul className={`grid list-none gap-3 sm:grid-cols-2 ${className}`}>
        {socials.map((s) => (
          <li key={s.id}>
            <a
              href={s.url}
              {...(s.id === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              onClick={() => track(EVENTS.socialClick, { network: s.id })}
              className="group flex min-h-[64px] items-center gap-4 rounded-xl border border-border-dark bg-card-dark/70 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span
                className="material-symbols-outlined text-primary transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                {s.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-white">{s.label}</span>
                <span className="block truncate text-xs text-text-muted">{s.handle}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex list-none gap-3 ${className}`}>
      {socials.map((s) => (
        <li key={s.id}>
          <a
            href={s.url}
            {...(s.id === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            onClick={() => track(EVENTS.socialClick, { network: s.id })}
            aria-label={s.label}
            title={s.label}
            className="flex size-12 items-center justify-center rounded-full border border-white/10 text-text-secondary transition-all hover:border-primary hover:bg-primary/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {s.icon}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
