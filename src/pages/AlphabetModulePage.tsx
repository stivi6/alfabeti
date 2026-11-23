import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALBANIAN_ALPHABET, DIGRAPHS } from '../data/exercises';
import { PageLayout } from '../components/layout/PageLayout';

export function AlphabetModulePage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('A');
  const letters = ALBANIAN_ALPHABET.filter((letter) =>
    letter.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <PageLayout>
      <section className="pb-16 pt-8 sm:pt-12">
        <div className="page-container max-w-[1000px]">
          <Link to="/lojerat" className="inline-flex items-center gap-2 text-sm font-bold text-primary-dark">
            <ArrowLeft size={16} /> Te mini-lojëra
          </Link>
          <p className="eyebrow mt-6">Moduli i përbashkët i alfabetit</p>
          <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.6rem)]">36 shkronja shqip</h1>
          <p className="mt-3 text-ink-muted">Zgjidh një shkronjë. Nëntë dyshkronjësha numërohen si një njësi më vete.</p>

          <label className="mt-7 flex max-w-md items-center gap-2 rounded-2xl border border-border bg-surface px-4">
            <Search size={18} className="text-ink-muted" />
            <span className="sr-only">Kërko shkronjë</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-h-12 w-full bg-transparent outline-none" />
          </label>

          <div className="mt-6 grid grid-cols-[repeat(4,minmax(0,1fr))] gap-2 sm:grid-cols-[repeat(6,minmax(0,1fr))]">
            {letters.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setSelected(letter)}
                className={`min-h-16 rounded-2xl border text-xl font-extrabold transition ${selected === letter ? 'border-primary bg-primary text-white' : 'border-border bg-surface text-ink hover:border-primary/50'}`}
                aria-pressed={selected === letter}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-primary/20 bg-primary-soft/40 p-6">
            <div className="flex items-center gap-5">
              <span className="flex size-20 items-center justify-center rounded-2xl bg-primary font-display text-4xl font-extrabold text-white">{selected}</span>
              <div>
                <h2 className="text-2xl">{selected}</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {DIGRAPHS.includes(selected as typeof DIGRAPHS[number])
                    ? 'Dyshkronjësh — dy shkronja të shkruara, një shkronjë e alfabetit.'
                    : 'Shkronjë e alfabetit të gjuhës shqipe.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
