import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type BadgeTone = 'purple' | 'green' | 'amber' | 'neutral' | 'danger' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  purple: 'bg-primary-soft text-primary-dark',
  green: 'bg-success-soft text-[#3E6B54]',
  amber: 'bg-accent-soft text-gold-ink',
  neutral: 'bg-surface-muted text-ink-muted',
  danger: 'bg-danger-soft text-[#8B3F3F]',
  outline: 'border border-border bg-transparent text-ink-muted',
};

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-tight',
        TONE_CLASSES[tone],
        className,
      )}
      {...props}
    />
  );
}
