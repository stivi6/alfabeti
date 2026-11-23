import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  variant?: 'surface' | 'ghost';
}

export function IconButton({
  label,
  children,
  variant = 'surface',
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        'inline-flex size-11 flex-none items-center justify-center rounded-xl border transition-colors',
        variant === 'surface'
          ? 'border-border bg-surface text-ink hover:border-primary/40 hover:bg-lilac'
          : 'border-transparent bg-transparent text-ink hover:bg-surface-muted',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
