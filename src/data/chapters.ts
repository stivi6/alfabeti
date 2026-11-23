import type { Chapter } from '../exercises/types';

export const CHAPTERS: Chapter[] = [
  {
    id:'chapter-2', number:1, title:'Shqipja në përdorim',
    difficulty:'Kuizi i Gjuhës Shqipe',
    description:'Drejtshkrim, gramatikë, rasat, fjalët dhe pikësimi.',
    illustration:'/assets/illustrations/chapter-gjuha.svg',
    illustrationAlt:'Fletë me fjali, laps dhe shenja pikësimi',
    accent:'amber', exerciseIds:['c2-e1','c2-e2','c2-e3','c2-e4','c2-e5'],
  },
  {
    id:'chapter-3', number:2, title:'Historia e alfabetit',
    difficulty:'Kongresi i Manastirit',
    description:'Zbulo Kongresin e Manastirit dhe rrugëtimin e shkrimit shqip.',
    illustration:'/assets/illustrations/chapter-historia.svg',
    illustrationAlt:'Faqe libri me datën 14 nëntor 1908',
    accent:'mint', exerciseIds:['c3-e1','c3-e2','c3-e3','c3-e4','c3-e5'],
  },
];

export function getChapter(chapterId:string):Chapter|undefined {
  return CHAPTERS.find((chapter)=>chapter.id===chapterId);
}
