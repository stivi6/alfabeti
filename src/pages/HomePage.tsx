import { ArrowRight, BookOpen, CheckCircle2, History, Languages, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CHAPTERS } from '../data/chapters';
import { CHAPTER_THEME } from '../components/game/chapterTheme';
import { PageLayout } from '../components/layout/PageLayout';
import { Badge } from '../components/ui/Badge';
import { buttonClasses } from '../components/ui/buttonStyles';
import { cn } from '../lib/cn';

const GAME_ICONS = [Languages, BookOpen, History];

export function HomePage() {
  return (
    <PageLayout variant="home">
      <section className="relative overflow-hidden pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
        <div className="page-container">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <Badge tone="outline" className="mb-5 border-primary/20 bg-surface/80 px-3 py-1.5">
                22 NËNTOR · DITA E ALFABETIT
              </Badge>
              <h1 className="text-[clamp(2.7rem,7vw,5rem)] leading-[0.96]">
                36 shkronja.
                <span className="mt-2 block text-primary">Një gjuhë.</span>
                <span className="mt-1 block">Një histori.</span>
              </h1>
              <p className="mt-7 max-w-[590px] text-[17px] leading-relaxed text-ink-muted sm:text-lg">
                Një udhëtim përmes fjalëve, historisë dhe lojës.
                Eksploro kuizet dhe provo tri lojërat me fjalë për Ditën e Alfabetit.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/timeline" className={buttonClasses('primary', 'lg', 'group sm:min-w-[210px]')}>
                  Eksploro historinë
                  <ArrowRight size={19} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link to="/lojerat" className={buttonClasses('secondary', 'lg', 'bg-surface/80')}>
                  Luaj me fjalët
                </Link>
              </div>
              <p className="mt-4 text-sm text-ink-muted">Pa regjistrim. Progresi ruhet në këtë pajisje.</p>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div aria-hidden="true" className="absolute inset-x-8 bottom-2 top-8 rounded-[42%_42%_28px_28px] bg-primary-soft" />
              <div aria-hidden="true" className="absolute right-2 top-8 size-28 rounded-full border-[18px] border-accent-soft" />
              <div className="relative z-10 grid min-h-[420px] place-items-center px-8 pb-8 pt-14 sm:min-h-[480px]">
                <img src="/assets/illustrations/home-shkronjat.svg" alt="Pllaka të alfabetit shqip, një libër dhe rreshta shkrimi" className="h-[360px] w-full object-contain sm:h-[410px]" fetchPriority="high" />
              </div>
              <div className="absolute left-0 top-12 z-20 -rotate-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-soft">
                <span className="font-display text-2xl font-extrabold text-primary">Ç Ë</span>
                <p className="mt-1 text-xs text-ink-muted">shkronja tona</p>
              </div>
              <div className="absolute bottom-16 right-0 z-20 rotate-2 rounded-2xl bg-primary px-4 py-3 text-white shadow-lifted">
                <span className="font-display text-2xl font-extrabold">SH · NJ</span>
                <p className="mt-1 text-xs text-primary-soft">njësi të alfabetit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Përmbledhje e lojës" className="border-y border-border bg-surface/65">
        <div className="page-container grid grid-cols-2 divide-x divide-border py-5 sm:grid-cols-4">
          {[['2', 'kuize'], ['3', 'lojëra me fjalë'], ['36', 'shkronja'], ['22', 'Nëntor']].map(([value, label]) => (
            <div key={label} className="flex flex-col items-center px-2 py-2 text-center">
              <span className="font-display text-2xl font-extrabold text-primary">{value}</span>
              <span className="text-xs font-medium text-ink-muted sm:text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="lojerat" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="page-container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Dy kuize dhe lojëra me fjalë</p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,2.9rem)]">Dy kuize. Tri lojëra. Një festë e gjuhës.</h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
                Çdo lojë ka pesë sfida të shkurtra. Zgjidh, mëso dhe vazhdo nëpër kapituj.
              </p>
            </div>
            <Link to="/play" className="group inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-bold text-primary-dark hover:text-primary sm:self-end">
              Shiko rrugëtimin <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {CHAPTERS.map((chapter, index) => {
              const theme = CHAPTER_THEME[chapter.accent];
              const Icon = GAME_ICONS[index] ?? BookOpen;
              return (
                <Link key={chapter.id} to="/play" className={cn('group overflow-hidden rounded-[24px] border border-border bg-surface p-3 shadow-soft transition hover:-translate-y-1 hover:shadow-lifted', theme.border)} aria-label={`${chapter.number}: ${chapter.title}`}>
                  <div className={cn('relative flex h-44 items-end justify-between overflow-hidden rounded-[18px] px-5 py-5', theme.thumbnail)}>
                    <span className={cn('absolute left-4 top-4 flex size-9 items-center justify-center rounded-full font-display text-sm font-extrabold', theme.number)}>0{chapter.number}</span>
                    <img src={chapter.illustration} alt={chapter.illustrationAlt} className="absolute bottom-3 right-3 h-[140px] w-[160px] object-contain" />
                    <Icon size={26} className={theme.accentText} aria-hidden="true" />
                  </div>
                  <div className="px-3 pb-3 pt-5">
                    <Badge tone="neutral" className={cn('mb-3', theme.soft)}>{chapter.difficulty}</Badge>
                    <h3 className="text-[23px] text-ink">{chapter.title}</h3>
                    <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-ink-muted">{chapter.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-dark">5 sfida <ArrowRight size={16} aria-hidden="true" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="si-funksionon" className="border-y border-border bg-surface/55 py-16 sm:py-20">
        <div className="page-container">
          <p className="eyebrow">Si funksionon</p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,2.9rem)]">Zgjidh. Kalo sfidat. Festoje.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[['01', 'Zgjidh një lojë', 'Hyr te një prej kapitujve dhe provo sfidat e tij.'], ['02', 'Kalo sfidat', 'Përgjigju, shiko feedback-un dhe vazhdo.'], ['03', 'Mblidh pikë', 'Shiko rezultatin dhe rishiko gabimet.']].map(([number, title, text]) => (
              <div key={number} className="rounded-[22px] border border-border bg-surface p-5">
                <span className="font-display text-sm font-extrabold text-primary">{number}</span>
                <h3 className="mt-3 text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pse-festojme" className="scroll-mt-24 py-16 sm:py-20">
        <div className="page-container">
          <div className="grid items-center gap-8 rounded-[28px] border border-border bg-primary-dark p-7 text-white sm:p-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="text-center">
              <span className="font-display text-6xl font-extrabold text-accent">22</span>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-primary-soft">Nëntor 1908</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Pse festojmë?</p>
              <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)]">Një hap drejt një shkrimi të përbashkët.</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-primary-soft">
                Më 22 nëntor kujtojmë Kongresin e Manastirit, të mbajtur nga 14 deri më 22 nëntor 1908.
                Ai ishte një hap vendimtar në përpjekjet për një mënyrë të përbashkët shkrimi të shqipes.
                Sot, alfabeti ynë ka 36 shkronja dhe është pjesë e përditshme e mënyrës si mësojmë, shkruajmë dhe komunikojmë.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="page-container rounded-[28px] border border-primary/20 bg-accent-soft/55 p-7 text-center sm:p-10">
          <Trophy className="mx-auto text-primary" size={30} aria-hidden="true" />
          <h2 className="mt-4 text-[clamp(1.8rem,4vw,2.6rem)]">Gati t’i provosh shkronjat?</h2>
          <Link to="/play" className={buttonClasses('primary', 'lg', 'mt-6 gap-2')}>
            <CheckCircle2 size={18} aria-hidden="true" /> Nis sfidën
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
