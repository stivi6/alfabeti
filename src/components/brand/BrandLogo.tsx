import { cn } from '../../lib/cn';

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/assets/shkronjat-tona-logo.svg"
      alt=""
      width={40}
      height={40}
      className={cn('size-9 flex-none sm:size-10', className)}
    />
  );
}

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <BrandMark />
      <span
        className={cn(
          'font-display font-extrabold leading-none tracking-[-0.035em] text-ink',
          compact ? 'text-[19px] sm:text-xl' : 'text-[21px] sm:text-[23px]',
        )}
      >
        Shkronjat <span className="text-primary">Tona</span>
      </span>
    </span>
  );
}
