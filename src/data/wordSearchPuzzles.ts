export interface WordSearchPuzzle {
  id:string; theme:string; seed:number;
  words:Array<{word:string;tokens:string[];clue:string}>;
}

export const WORD_SEARCH_PUZZLES: WordSearchPuzzle[] = [
  {id:'gjuha-dhe-kultura',theme:'Gjuhë dhe kulturë',seed:19,words:[
    {word:'gjuhë',tokens:['GJ','U','H','Ë'],clue:'Mjeti i komunikimit.'},
    {word:'libër',tokens:['L','I','B','Ë','R'],clue:'Botim për lexim.'},
    {word:'rrugë',tokens:['RR','U','G','Ë'],clue:'Rrjeti ku ecim dhe lëvizim.'},
    {word:'shkollë',tokens:['SH','K','O','LL','Ë'],clue:'Vend mësimi.'},
  ]},
  {id:'dita-e-alfabetit',theme:'Dita e Alfabetit',seed:22,words:[
    {word:'alfabet',tokens:['A','L','F','A','B','E','T'],clue:'Bashkësia e shkronjave.'},
    {word:'shqip',tokens:['SH','Q','I','P'],clue:'Gjuha shqipe në trajtën e shkurtër.'},
    {word:'kongres',tokens:['K','O','N','G','R','E','S'],clue:'Takim për vendime të përbashkëta.'},
    {word:'nëntor',tokens:['N','Ë','N','T','O','R'],clue:'Muaji i Dita e Alfabetit.'},
  ]},
];
