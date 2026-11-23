import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';
import { buttonClasses } from '../ui/buttonStyles';

interface SiteHeaderProps {
  variant?: 'home' | 'compact';
  children?: ReactNode;
}

export function SiteHeader({ variant = 'home', children }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg">
      <div className="page-container flex min-h-[68px] items-center justify-between gap-4 py-2.5">
        <Link
          to="/"
          className="rounded-lg focus-visible:outline-offset-4"
          aria-label="Shkronjat Tona — Ballina"
        >
          <BrandLogo compact={variant === 'compact'} />
        </Link>

        {variant === 'home' ? (
          <>
            <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
              <Link
                to="/"
                aria-current={location.pathname === '/' ? 'page' : undefined}
                className="border-b-2 border-primary pb-1 text-sm font-semibold text-ink"
              >
                Ballina
              </Link>
              <Link
                to="/lojerat"
                className="text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                Lojërat
              </Link>
              <a
                href="#si-funksionon"
                className="text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                Si funksionon
              </a>
              <a
                href="#historia"
                className="text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                Historia
              </a>
            </nav>
            <div className="hidden md:block">
              <Link to="/play" className={buttonClasses('primary', 'sm', 'gap-1.5')}>
                Fillo lojën
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-ink transition-colors hover:bg-lilac md:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </>
        ) : (
          <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">{children}</div>
        )}
      </div>

      {variant === 'home' && menuOpen && (
        <div id={menuId} className="border-t border-border bg-surface px-4 pb-5 pt-3 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            <Link
              to="/"
              className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink hover:bg-lilac"
              onClick={() => setMenuOpen(false)}
            >
              Ballina
            </Link>
            <Link
              to="/lojerat"
              className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink-muted hover:bg-lilac hover:text-ink"
              onClick={() => setMenuOpen(false)}
            >
              Lojërat
            </Link>
            <a
              href="#si-funksionon"
              className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink-muted hover:bg-lilac hover:text-ink"
              onClick={() => setMenuOpen(false)}
            >
              Si funksionon
            </a>
            <a
              href="#historia"
              className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink-muted hover:bg-lilac hover:text-ink"
              onClick={() => setMenuOpen(false)}
            >
              Historia
            </a>
          </nav>
          <Link
            to="/play"
            className={buttonClasses('primary', 'md', 'mt-3 w-full')}
            onClick={() => setMenuOpen(false)}
          >
            Fillo lojën
            <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      )}
    </header>
  );
}
