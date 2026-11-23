import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { TIMELINE_EVENTS } from '../data/timelineEvents';

export function TimelinePage() {
  return (
    <PageLayout>
      <section className="pb-16 pt-9 sm:pt-12">
        <div className="page-container max-w-[980px]">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary-dark"><ArrowLeft size={16}/>Ballina</Link>
          <p className="eyebrow mt-6">Rrugëtimi i shkrimit shqip</p>
          <h1 className="mt-3 text-[clamp(2.4rem,5vw,3.8rem)]">Nga forma e parë e shkruar te standardi i sotëm</h1>
          <div className="relative mt-10">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-primary/30 sm:left-1/2" aria-hidden="true"/>
            {TIMELINE_EVENTS.map((item)=>(
              <article key={item.year} className="relative mb-8 grid gap-4 pl-10 sm:grid-cols-2 sm:gap-12 sm:pl-0">
                <span className="absolute left-[9px] top-7 z-10 size-3 rounded-full border-4 border-bg bg-primary sm:left-1/2 sm:-translate-x-1/2" aria-hidden="true"/>
                <div>
                  <div className="overflow-hidden rounded-[24px] border border-border bg-surface p-5 shadow-soft">
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">{item.date}</p>
                    <h2 className="mt-2 text-xl">{item.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.text}</p>
                    <p className="mt-3 text-xs text-ink-muted/80">Burimi: {item.source}</p>
                  </div>
                </div>
                <div className="hidden items-center justify-center rounded-[24px] border border-border bg-accent-soft/35 p-5 sm:flex">
                  <div className="text-center"><p className="font-display text-5xl font-extrabold text-primary">{item.year}</p><p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Shkrimi shqip</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
