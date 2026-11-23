import { canBuildWordFromRack, validateCuratedWord } from '../lib/albanianLetters';

export interface ConnectTarget {
  word: string;
  tokens: string[];
  clue: string;
}

export interface ConnectPuzzle {
  id: string;
  title: string;
  clue: string;
  tiles: string[];
  targets: ConnectTarget[];
}

function target(word: string, clue: string, ...tokens: string[]): ConnectTarget {
  if (!validateCuratedWord(word, tokens)) {
    throw new Error(`Tokenët nuk përputhen me fjalën e fjalorit: ${word}`);
  }
  return { word, tokens, clue };
}

function createPuzzle(
  id: string,
  title: string,
  clue: string,
  targets: ConnectTarget[],
  distractors: string[],
): ConnectPuzzle {
  const maxCounts = new Map<string, number>();
  for (const item of targets) {
    const wordCounts = new Map<string, number>();
    for (const token of item.tokens) {
      wordCounts.set(token, (wordCounts.get(token) ?? 0) + 1);
    }
    for (const [token, count] of wordCounts) {
      maxCounts.set(token, Math.max(maxCounts.get(token) ?? 0, count));
    }
  }

  const tiles = [...maxCounts].flatMap(([token, count]) => Array<string>(count).fill(token));
  tiles.push(...distractors);
  for (const item of targets) {
    if (!canBuildWordFromRack(tiles, item.tokens)) {
      throw new Error(`Pllakat nuk e përmbajnë fjalën e synuar: ${item.word}`);
    }
  }

  return { id, title, clue, tiles, targets };
}

// Headwords were checked against Fjalori i Gjuhës së Sotme Shqipe:
// https://fjalori.shkenca.org/ (checked 2026-11-23).
export const CONNECT_PUZZLES: ConnectPuzzle[] = [
  createPuzzle('fjala-shqipe', 'Fjala shqipe', 'Fjalë nga gjuha, leximi dhe shkolla.', [
    target('fjalë', 'Njësi e gjuhës që shpreh një kuptim.', 'F', 'J', 'A', 'L', 'Ë'),
    target('libër', 'Vepër me fletë të shtypura e të lidhura në një vëllim.', 'L', 'I', 'B', 'Ë', 'R'),
    target('shqip', 'Në gjuhën e shqiptarëve.', 'SH', 'Q', 'I', 'P'),
    target('shkollë', 'Vend ku zhvillohet mësimi.', 'SH', 'K', 'O', 'LL', 'Ë'),
  ], ['M', 'T', 'U', 'E', 'S']),
  createPuzzle('ne-shtepi', 'Në shtëpi', 'Gjëra dhe fjalë që lidhen me jetën e përditshme.', [
    target('shtëpi', 'Vendbanimi ku jeton një familje.', 'SH', 'T', 'Ë', 'P', 'I'),
    target('çelës', 'Mjet që përdoret për të hapur një bravë.', 'Ç', 'E', 'L', 'Ë', 'S'),
    target('dritë', 'Ajo që na lejon të shohim.', 'D', 'R', 'I', 'T', 'Ë'),
    target('lëndë', 'Material ose fushë e caktuar e dijes.', 'L', 'Ë', 'N', 'D', 'Ë'),
  ], ['A', 'K', 'M', 'O', 'U']),
  createPuzzle('njerez', 'Njerëzit', 'Fjalë për njerëzit dhe lidhjet mes tyre.', [
    target('motër', 'Vajza në lidhje me vëllanë ose motrën e saj.', 'M', 'O', 'T', 'Ë', 'R'),
    target('djalë', 'Fëmijë ose i ri i gjinisë mashkullore.', 'D', 'J', 'A', 'L', 'Ë'),
    target('prind', 'Nëna ose babai i një fëmije.', 'P', 'R', 'I', 'N', 'D'),
    target('banor', 'Njeri që jeton në një vend.', 'B', 'A', 'N', 'O', 'R'),
  ], ['E', 'G', 'K', 'S', 'U']),
  createPuzzle('gjurme-dhe-tinguj', 'Gjurmë dhe tinguj', 'Fjalë që lidhen me shenjat, tingujt dhe ndjenjat.', [
    target('qershi', 'Frut i vogël, i rrumbullakët, zakonisht i kuq.', 'Q', 'E', 'R', 'SH', 'I'),
    target('këngë', 'Krijim muzikor me zë ose fjalë.', 'K', 'Ë', 'N', 'G', 'Ë'),
    target('gjurmë', 'Shenjë që lë një këmbë ose send pas kalimit.', 'GJ', 'U', 'R', 'M', 'Ë'),
    target('shpirt', 'Ana e brendshme dhe ndjenjat e njeriut.', 'SH', 'P', 'I', 'R', 'T'),
  ], ['A', 'D', 'L', 'O', 'T']),
  createPuzzle('mesim-dhe-pune', 'Mësim dhe punë', 'Fjalë për të lexuarin, të shkruarit dhe veprimtarinë.', [
    target('mësim', 'Veprimtaria e të mësuarit; një orë mësimore.', 'M', 'Ë', 'S', 'I', 'M'),
    target('punim', 'Punë e bërë ose vepër e përgatitur.', 'P', 'U', 'N', 'I', 'M'),
    target('shkrim', 'Veprimi ose mënyra e të shkruarit.', 'SH', 'K', 'R', 'I', 'M'),
    target('lexoj', 'Marr dhe kuptoj përmbajtjen e një teksti të shkruar.', 'L', 'E', 'X', 'O', 'J'),
  ], ['A', 'D', 'Ë', 'T', 'U']),
  createPuzzle('rruges', 'Në rrugë', 'Fjalë për vendet, lëvizjen dhe afërsinë.', [
    target('qytet', 'Vendbanim i madh me rrugë, ndërtesa dhe shërbime.', 'Q', 'Y', 'T', 'E', 'T'),
    target('detar', 'Që lidhet me detin ose lundrimin.', 'D', 'E', 'T', 'A', 'R'),
    target('pranë', 'Në një largësi të vogël nga dikush a diçka.', 'P', 'R', 'A', 'N', 'Ë'),
    target('shpejt', 'Me shpejtësi të madhe; pa vonesë.', 'SH', 'P', 'E', 'J', 'T'),
  ], ['B', 'I', 'K', 'L', 'U']),
  createPuzzle('gjuha-dhe-ndjenjat', 'Gjuha dhe ndjenjat', 'Fjalë që shprehin mendime, ndjenja dhe gjendje.', [
    target('gëzim', 'Ndjenjë kënaqësie dhe hareje.', 'G', 'Ë', 'Z', 'I', 'M'),
    target('besim', 'Bindje se dikush ose diçka është e mirë dhe e vërtetë.', 'B', 'E', 'S', 'I', 'M'),
    target('mbarë', 'Që ecën mirë ose sjell përfundim të mirë.', 'M', 'B', 'A', 'R', 'Ë'),
    target('zemër', 'Organ që pompon gjakun; edhe qendër e ndjenjave.', 'Z', 'E', 'M', 'Ë', 'R'),
  ], ['D', 'H', 'L', 'N', 'T']),
  createPuzzle('fjalet-e-dites', 'Fjalët e ditës', 'Një përmbledhje e fjalëve të njohura në shqip.', [
    target('dritë', 'Ajo që na lejon të shohim.', 'D', 'R', 'I', 'T', 'Ë'),
    target('këmbë', 'Pjesë e trupit që përdoret për të ecur.', 'K', 'Ë', 'M', 'B', 'Ë'),
    target('qepje', 'Veprimi i bashkimit të copave me pe e gjilpërë.', 'Q', 'E', 'P', 'J', 'E'),
    target('thesar', 'Pasuri e çmuar ose një koleksion me vlerë.', 'TH', 'E', 'S', 'A', 'R'),
  ], ['A', 'G', 'I', 'L', 'U']),
];
