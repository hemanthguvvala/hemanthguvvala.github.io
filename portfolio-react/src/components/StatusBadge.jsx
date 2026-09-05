import { STATUS } from '../data/products';

const TONE = {
  live: 'bg-primary/10 text-primary border-primary/30',
  building: 'bg-gold/10 text-gold border-gold/30',
  archived: 'bg-white/5 text-status-archived border-white/10',
};

/**
 * Status is conveyed by the label text, not by colour alone — the dot is
 * decorative reinforcement for sighted users, never the sole signal.
 */
export default function StatusBadge({ status, className = '' }) {
  const meta = STATUS[status];
  if (!meta) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide ${TONE[meta.tone]} ${className}`}
      title={meta.description}
    >
      <span
        className={`size-1.5 rounded-full ${status === 'live' ? 'bg-primary' : 'bg-current'}`}
        aria-hidden="true"
      />
      {meta.label}
    </span>
  );
}
