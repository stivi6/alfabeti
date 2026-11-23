import { ArrowRight, Grid3X3, Link2, Puzzle, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { buttonClasses } from '../components/ui/buttonStyles';

const games = [
  { to: '/lojerat/wordle', title: 'Wordle Shqip', text: 'Gjeje fjalën me pesë shkronja në gjashtë tentativa.', icon: Grid3X3 },
  { to: '/lojerat/lidh-shkronjat', title: 'Lidh Shkronjat', text: 'Lidh pllakat dhe krijo fjalët që përputhen me të dhënat.', icon: Link2 },
  { to: '/lojerat/gjej-fjalët', title: 'Gjej Fjalët', text: 'Lidh pesë shkronja në radhë të ndryshme për të zbuluar fjalë shqipe.', icon: Search },
  { to: '/lojerat/kuizi-i-gjuhes', title: 'Kuizi i Gjuhës', text: 'Drejtshkrim, rasat, foljet dhe pikësimi.', icon: Puzzle },
  { to: '/lojerat/kuizi-i-historise', title: 'Kuizi i Historisë', text: 'Rrugëtimi i alfabetit dhe Kongresi i Manastirit.', icon: Sparkles },
];

export function MiniGamesHubPage() {
  return (
    <PageLayout>
      <section className="pb-16 pt-9 sm:pt-12">
        <div className="page-container">
          <p className="eyebrow">Mini-lojëra</p>
          <h1 className="mt-3 text-[clamp(2.4rem,5vw,3.8rem)]">Zgjidh një lojë</h1>
          <p className="mt-4 max-w-xl text-ink-muted">Sfida të shkurtra për të njohur alfabetin, gjuhën dhe historinë.</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.map(({ to, title, text, icon: Icon }) => (
              <Link key={to} to={to} className="group rounded-[24px] border border-border bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/30">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary"><Icon size={24} /></span>
                <h2 className="mt-5 text-xl">{title}</h2>
                <p className="mt-2 min-h-12 text-sm leading-relaxed text-ink-muted">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-dark">Luaj <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
          <Link to="/play" className={buttonClasses('primary', 'lg', 'mt-8')}>Hyr te kuizet</Link>
        </div>
      </section>
    </PageLayout>
  );
}
