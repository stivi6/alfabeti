import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'soft' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE_CLASSES =
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-[14px] font-body font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-45';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-[#FFFEFC] shadow-[0_10px_24px_-16px_rgba(81,54,111,0.9)] hover:bg-primary-dark active:bg-primary-dark',
  secondary:
    'border border-border-strong bg-surface text-ink hover:border-primary/45 hover:bg-lilac',
  accent:
    'bg-accent text-[#43300D] shadow-[0_10px_24px_-16px_rgba(232,185,95,0.9)] hover:bg-[#DEAB4D]',
  soft: 'bg-primary-soft text-primary-dark hover:bg-[#E1D5EF]',
  ghost: 'bg-transparent text-ink hover:bg-surface-muted',
  danger: 'bg-danger text-[#FFFEFC] hover:bg-[#A64C4C]',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-9 rounded-xl px-3 py-2 text-sm',
  md: 'min-h-11 px-4 py-2.5 text-[15px]',
  lg: 'min-h-[52px] rounded-2xl px-6 py-3 text-base',
};

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
}
