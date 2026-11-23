import { Link } from 'react-router-dom';
import { BrandLogo } from '../brand/BrandLogo';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface/70">
      <div className="page-container py-9 sm:py-11">
        <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-16">
          <div>
            <Link to="/" className="inline-flex rounded-lg" aria-label="Shkronjat Tona — Ballina">
              <BrandLogo compact />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              Një lojë për Ditën e Alfabetit të Gjuhës Shqipe.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-ink">
              <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
              Progresi ruhet në këtë pajisje.
            </p>
          </div>
          <div className="text-sm leading-relaxed text-ink-muted">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink">Navigimi</h2>
            <div className="mt-3 flex flex-col gap-2">
              <Link className="hover:text-primary" to="/">Ballina</Link>
              <Link className="hover:text-primary" to="/lojerat">Lojërat</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Shkronjat Tona · Festojmë gjuhën dhe alfabetin.</p>
          <p>36 shkronja. Një gjuhë. Një histori.</p>
        </div>
      </div>
    </footer>
  );
}
