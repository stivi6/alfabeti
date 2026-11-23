import type { ChapterAccent } from '../../exercises/types';

export const CHAPTER_THEME: Record<
  ChapterAccent,
  {
    thumbnail: string;
    soft: string;
    number: string;
    dot: string;
    accentText: string;
    border: string;
  }
> = {
  purple: {
    thumbnail: 'bg-lilac',
    soft: 'bg-primary-soft text-primary-dark',
    number: 'bg-primary text-[#FFFEFC]',
    dot: 'bg-primary',
    accentText: 'text-primary',
    border: 'hover:border-primary/35',
  },
  amber: {
    thumbnail: 'bg-cream',
    soft: 'bg-accent-soft text-gold-ink',
    number: 'bg-accent text-[#43300D]',
    dot: 'bg-accent',
    accentText: 'text-[#8A6520]',
    border: 'hover:border-accent/70',
  },
  mint: {
    thumbnail: 'bg-mint',
    soft: 'bg-success-soft text-[#3E6B54]',
    number: 'bg-success text-[#FFFEFC]',
    dot: 'bg-success',
    accentText: 'text-success',
    border: 'hover:border-success/35',
  },
};
