export interface ConnectPuzzle {
  id: string;
  title: string;
  clue: string;
  tiles: string[];
  targets: Array<{ word: string; tokens: string[]; clue: string }>;
}

export const CONNECT_PUZZLES: ConnectPuzzle[] = [
  {
    id:'qyteti', title:'Në qytet', clue:'Fjalë të përditshme nga jeta urbane',
    tiles:['RR','U','G','Ë','SH','T','Ë','P','I','D','I','T','E','M','A','Q','Y','K'],
    targets:[
      {word:'rrugë',tokens:['RR','U','G','Ë'],clue:'Vija ku ecin njerëzit dhe automjetet.'},
      {word:'shtëpi',tokens:['SH','T','Ë','P','I'],clue:'Vendbanimi ku jeton një familje.'},
      {word:'qytet',tokens:['Q','Y','T','E','T'],clue:'Njësi e madhe urbane.'},
      {word:'dite',tokens:['D','I','T','E'],clue:'Periudha nga agimi deri në mbrëmje.'},
    ],
  },
  {
    id:'shkolla', title:'Në shkollë', clue:'Objekte dhe veprime të përditshme',
    tiles:['SH','K','O','LL','Ë','F','L','E','T','A','NJ','E','R','I','GJ','U','H','Ë'],
    targets:[
      {word:'shkollë',tokens:['SH','K','O','LL','Ë'],clue:'Vend ku zhvillohet mësimi.'},
      {word:'fletë',tokens:['F','L','E','T','Ë'],clue:'Material për të shkruar.'},
      {word:'njeri',tokens:['NJ','E','R','I'],clue:'Qenie njerëzore.'},
      {word:'gjuhë',tokens:['GJ','U','H','Ë'],clue:'Sistem komunikimi i folur dhe i shkruar.'},
    ],
  },
];
