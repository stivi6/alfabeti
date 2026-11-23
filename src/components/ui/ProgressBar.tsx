import { cn } from '../../lib/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  tone?: 'primary' | 'success' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
  valueText?: string;
}

const TONE_CLASSES = {
  primary: 'bg-primary',
  success: 'bg-success',
  accent: 'bg-accent',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  tone = 'primary',
  size = 'md',
  className,
  valueText,
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const safeValue = Math.min(safeMax, Math.max(0, value));
  const percent = Math.round((safeValue / safeMax) * 100);

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-full bg-surface-muted',
        size === 'sm' ? 'h-1.5' : 'h-2.5',
        className,
      )}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeValue}
      aria-valuetext={valueText ?? `${percent}%`}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-300', TONE_CLASSES[tone])}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
