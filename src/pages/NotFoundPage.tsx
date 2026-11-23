import { Link } from 'react-router-dom';
import { ArrowLeft, CircleHelp, Home } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { buttonClasses } from '../components/ui/buttonStyles';

export function NotFoundPage() {
  const headerAction = (
    <Link
      to="/"
      className={buttonClasses('secondary', 'sm', 'gap-1.5')}
      aria-label="Kthehu te Ballina"
    >
      <Home size={16} strokeWidth={2} aria-hidden="true" />
      <span className="hidden sm:inline">Ballina</span>
    </Link>
  );

  return (
    <PageLayout headerActions={headerAction}>
      <section className="flex min-h-[60vh] items-center py-14">
        <div className="page-container max-w-[720px] text-center">
          <div className="relative mx-auto flex size-24 items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-[32px] bg-primary-soft"
            />
            <span
              aria-hidden="true"
              className="absolute -right-2 -top-2 size-7 rounded-full border-[6px] border-accent/50"
            />
            <CircleHelp size={40} strokeWidth={1.8} className="relative text-primary-dark" aria-hidden="true" />
          </div>

          <p className="mt-6 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink-muted">
            404 · Faqja nuk u gjet
          </p>
          <h1 className="mt-3 text-[clamp(2.3rem,6vw,3.6rem)] text-ink">
            Kjo faqe humbi nga rrugëtimi.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-muted sm:text-base">
            Adresa mund të jetë shkruar gabimisht ose faqja mund të jetë zhvendosur.
            Progresi yt i ruajtur është i sigurt — kthehu te lojërat dhe vazhdo.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
              <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
              Kthehu te Ballina
            </Link>
            <Link to="/play" className={buttonClasses('secondary', 'lg', 'w-full sm:w-auto')}>
              Shiko rrugëtimin
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
