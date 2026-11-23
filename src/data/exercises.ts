import type { Exercise } from '../exercises/types';

export const ALBANIAN_ALPHABET = [
  'A', 'B', 'C', 'Ç', 'D', 'DH', 'E', 'Ë', 'F', 'G', 'GJ', 'H', 'I', 'J', 'K',
  'L', 'LL', 'M', 'N', 'NJ', 'O', 'P', 'Q', 'R', 'RR', 'S', 'SH', 'T', 'TH',
  'U', 'V', 'X', 'XH', 'Y', 'Z', 'ZH',
] as const;

export const DIGRAPHS = ['DH', 'GJ', 'LL', 'NJ', 'RR', 'SH', 'TH', 'XH', 'ZH'] as const;
export const VOWELS = ['A', 'E', 'Ë', 'I', 'O', 'U', 'Y'] as const;

export const EXERCISES: Exercise[] = [
  {
    id:'c2-e1', chapterId:'chapter-2', number:1, title:'Shkruaje saktë',
    type:'mixed', instructions:'Zgjidh trajtën e saktë të fjalës sipas kontekstit.',
    hint:'Fjalët e përshkruara me ë dhe ç ndryshojnë drejtshkrim sipas kontekstit.', prompts:[
      {id:'c2-e1-p1',kind:'choice',question:'Zgjidh formën e saktë.',options:[{id:'shtepi',label:'shtepi'},{id:'shtepia',label:'shtëpi'}],correctOptionId:'shtepia',explanation:'Fjala “shtëpi” shkruhet me ë pas shkronjës t.'},
      {id:'c2-e1-p2',kind:'choice',question:'Zgjidh formën e saktë.',options:[{id:'qeles',label:'qeles'},{id:'celes',label:'çelës'}],correctOptionId:'celes',explanation:'“Çelës” shkruhet me ç në fillim dhe ë në fund.'},
      {id:'c2-e1-p3',kind:'choice',question:'Zgjidh formën e saktë.',options:[{id:'gjuhe',label:'gjuhe'},{id:'gjuhë',label:'gjuhë'}],correctOptionId:'gjuhë',explanation:'Fjala “gjuhë” shkruhet me ë në fund.'},
      {id:'c2-e1-p4',kind:'choice',question:'Në ___ mësojmë çdo ditë.',options:[{id:'shkolle',label:'shkollë'},{id:'shkolla',label:'shkolla'}],correctOptionId:'shkolle',explanation:'Në këtë fjali, forma e paskajshme e shquar shkruhet “shkollë”.'},
      {id:'c2-e1-p5',kind:'choice',question:'Gjuha shqipe ka një ___ të veçantë.',options:[{id:'histori',label:'histori'},{id:'historie',label:'historinë'}],correctOptionId:'histori',explanation:'Pjesa “ka një” kërkon trajtën e pashtjelluar “histori”.'},
    ],
  },
  {
    id:'c2-e2',chapterId:'chapter-2',number:2,title:'Gjeje rasën e emrit',
    type:'mixed',instructions:'Identifiko rasën e emrit të theksuar në çdo fjali.',
    hint:'Përdor pyetjet: kush/cili, i/e kujt, kujt, kë/çfarë, prej kujt/çfarë.',
    prompts:[
      {id:'c2-e2-p1',kind:'choice',question:'Libri është mbi tavolinë. — Cila është rasa e “Libri”?',options:[{id:'emrore',label:'Emërore'},{id:'gjinore',label:'Gjinore'},{id:'dhanore',label:'Dhanore'}],correctOptionId:'emrore',explanation:'“Libri” është kryefjalë, prandaj është në rasën emërore.'},
      {id:'c2-e2-p2',kind:'choice',question:'Kopertina e librit është e kuqe. — Cila është rasa e “librit”?',options:[{id:'gjinore',label:'Gjinore'},{id:'kallëzore',label:'Kallëzore'},{id:'rrjedhore',label:'Rrjedhore'}],correctOptionId:'gjinore',explanation:'“Librit” tregon përkatësi: kopertina e kujt?'},
      {id:'c2-e2-p3',kind:'choice',question:'I dhashë shokut librin. — Cila është rasa e “shokut”?',options:[{id:'dhanore',label:'Dhanore'},{id:'gjinore',label:'Gjinore'},{id:'emrore',label:'Emërore'}],correctOptionId:'dhanore',explanation:'I dhashë kujt? — shokut, pra rasën dhanore.'},
      {id:'c2-e2-p4',kind:'choice',question:'Lexova librin. — Cila është rasa e “librin”?',options:[{id:'kallëzore',label:'Kallëzore'},{id:'rrjedhore',label:'Rrjedhore'},{id:'dhanore',label:'Dhanore'}],correctOptionId:'kallëzore',explanation:'Lexova çfarë? — librin, pra rasën kallëzore.'},
      {id:'c2-e2-p5',kind:'choice',question:'U ktheva prej fshatit. — Cila është rasa e “fshatit”?',options:[{id:'rrjedhore',label:'Rrjedhore'},{id:'gjinore',label:'Gjinore'},{id:'emrore',label:'Emërore'}],correctOptionId:'rrjedhore',explanation:'Përdoret me parafjalën “prej” dhe tregon largim, pra rasën rrjedhore.'},
    ],
  },
  {
    id:'c2-e3',chapterId:'chapter-2',number:3,title:'Folja dhe përshtatja',
    type:'mixed',instructions:'Zgjidh formën e foljes që përshtatet me kryefjalën.',
    hint:'Gjeje vetën dhe numrin e kryefjalës para se të zgjedhësh foljen.',
    prompts:[
      {id:'c2-e3-p1',kind:'choice',question:'Unë dhe shoku im ___ në bibliotekë.',options:[{id:'shkoj',label:'shkoj'},{id:'shkojme',label:'shkojmë'},{id:'shkojne',label:'shkojnë'}],correctOptionId:'shkojme',explanation:'Kryefjala është në vetën e parë, numrin shumës: shkojmë.'},
      {id:'c2-e3-p2',kind:'choice',question:'Nxënësit ___ librin.',options:[{id:'lexon',label:'lexon'},{id:'lexojne',label:'lexojnë'},{id:'lexoj',label:'lexoj'}],correctOptionId:'lexojne',explanation:'Nxënësit — veta e tretë, numri shumës: lexojnë.'},
      {id:'c2-e3-p3',kind:'choice',question:'Ajo ___ një ide të mirë.',options:[{id:'kam',label:'kam'},{id:'ke',label:'ke'},{id:'ka',label:'ka'}],correctOptionId:'ka',explanation:'Ajo është veta e tretë, numri njëjës: ka.'},
      {id:'c2-e3-p4',kind:'choice',question:'Ne e ___ detyrën dje.',options:[{id:'perfundova',label:'përfundova'},{id:'perfunduam',label:'përfunduam'},{id:'perfunduan',label:'përfunduan'}],correctOptionId:'perfunduam',explanation:'Ne kërkon vetën e parë, numrin shumës: përfunduam.'},
      {id:'c2-e3-p5',kind:'choice',question:'Ata do të ___ nesër.',options:[{id:'vij',label:'vij'},{id:'vish',label:'vish'},{id:'vijne',label:'vijnë'}],correctOptionId:'vijne',explanation:'Ata kërkon vetën e tretë, numrin shumës: vijnë.'},
    ],
  },
  {
    id:'c2-e4',chapterId:'chapter-2',number:4,title:'Fjalët në fjali',
    type:'mixed',instructions:'Identifiko pjesën e ligjëratës së fjalës së theksuar.',
    hint:'Lexoje fjalën në kontekstin e fjalisë.',
    prompts:[
      {id:'c2-e4-p1',kind:'choice',question:'Nxënësit lexojnë çdo ditë. — “lexojnë” është:',options:[{id:'folje',label:'Folje'},{id:'emer',label:'Emër'},{id:'nderfolje',label:'Ndajfolje'}],correctOptionId:'folje',explanation:'“Lexojnë” tregon veprimin.'},
      {id:'c2-e4-p2',kind:'choice',question:'Biblioteka është e qetë. — “Biblioteka” është:',options:[{id:'emer',label:'Emër'},{id:'peremer',label:'Përemër'},{id:'miemer',label:'Mbiemër'}],correctOptionId:'emer',explanation:'“Biblioteka” emërton një vend.'},
      {id:'c2-e4-p3',kind:'choice',question:'Ajo zgjodhi një libër interesant. — “interesant” është:',options:[{id:'miemer',label:'Mbiemër'},{id:'folje',label:'Folje'},{id:'nderfolje',label:'Ndajfolje'}],correctOptionId:'miemer',explanation:'“Interesant” tregon cilësinë e librit.'},
      {id:'c2-e4-p4',kind:'choice',question:'Ata flasin qartë. — “qartë” është:',options:[{id:'nderfolje',label:'Ndajfolje'},{id:'emer',label:'Emër'},{id:'peremer',label:'Përemër'}],correctOptionId:'nderfolje',explanation:'“Qartë” tregon se si flasin.'},
      {id:'c2-e4-p5',kind:'choice',question:'Ne e përfunduam lojën. — “Ne” është:',options:[{id:'peremer',label:'Përemër'},{id:'emer',label:'Emër'},{id:'miemer',label:'Mbiemër'}],correctOptionId:'peremer',explanation:'“Ne” zë vendin e emrit dhe tregon vetën e parë, numrin shumës.'},
    ],
  },
  {
    id:'c2-e5',chapterId:'chapter-2',number:5,title:'Pikësimi',
    type:'mixed',instructions:'Zgjidh versionin e saktë të fjalive me pikësim.',
    hint:'Pyetjet mbyllen me pikëpyetje; fjalitë pohore me pikë.',
    prompts:[
      {id:'c2-e5-p1',kind:'choice',question:'Cila fjali është e pikësuar saktë?',options:[{id:'p1',label:'Ku është libri im?'},{id:'p2',label:'Ku është libri im.'},{id:'p3',label:'Ku është libri im!' }],correctOptionId:'p1',explanation:'Fjalinë pyetëse e mbyllim me pikëpyetje.'},
      {id:'c2-e5-p2',kind:'choice',question:'Cila fjali është e pikësuar saktë?',options:[{id:'p1',label:'Sot festojmë Ditën e Alfabetit.'},{id:'p2',label:'Sot festojmë Ditën e Alfabetit?'},{id:'p3',label:'Sot festojmë Ditën e Alfabetit!' }],correctOptionId:'p1',explanation:'Fjalinë pohore e mbyllim me pikë.'},
      {id:'c2-e5-p3',kind:'choice',question:'Cila fjali është e pikësuar saktë?',options:[{id:'p1',label:'Sa bukur shkruan.'},{id:'p2',label:'Sa bukur shkruan!'},{id:'p3',label:'Sa bukur shkruan?' }],correctOptionId:'p2',explanation:'Emocioni shprehet me pikëçuditëse.'},
      {id:'c2-e5-p4',kind:'choice',question:'Cila renditje është e pikësuar saktë?',options:[{id:'p1',label:'Ana mori fletoren, lapsin dhe librin.'},{id:'p2',label:'Ana mori fletoren lapsin, dhe librin.'},{id:'p3',label:'Ana mori fletoren lapsin dhe librin.' }],correctOptionId:'p1',explanation:'Presja ndan elementet e renditura.'},
      {id:'c2-e5-p5',kind:'choice',question:'Cila fjali është e pikësuar saktë?',options:[{id:'p1',label:'Arta a e more librin?'},{id:'p2',label:'Arta, a e more librin?'},{id:'p3',label:'Arta a e more librin.' }],correctOptionId:'p2',explanation:'Presja ndan thirrjen “Arta” nga pjesa pyetëse e fjalisë.'},
    ],
  },
  {
    id:'c3-e1',chapterId:'chapter-3',number:1,title:'Vendosi ngjarjet në kohë',
    type:'matching',instructions:'Çifto secilën ngjarje me datën e duhur.',
    hint:'Përdor rendin kronologjik nga Kongresi i Manastirit te Kongresi i Drejtshkrimit.',
    prompts:[
      {id:'c3-e1-p1',kind:'matching',question:'Hapet Kongresi i Manastirit.',left:'14 nëntor 1908',right:'Hapet Kongresi i Manastirit.',explanation:'Kongresi u hap në Manastir më 14 nëntor 1908.'},
      {id:'c3-e1-p2',kind:'matching',question:'Përfundojnë punimet e Kongresit.',left:'22 nëntor 1908',right:'Përfundojnë punimet e Kongresit të Manastirit.',explanation:'Punimet e Kongresit vijuan deri më 22 nëntor 1908.'},
      {id:'c3-e1-p3',kind:'matching',question:'Kongresi i Drejtshkrimit.',left:'20–25 nëntor 1972',right:'Mbahet Kongresi i Drejtshkrimit në Tiranë.',explanation:'Kongresi i Drejtshkrimit u mbajt nga 20 deri më 25 nëntor 1972.'},
    ],
  },
  {
    id:'c3-e2',chapterId:'chapter-3',number:2,title:'Figura të Kongresit',
    type:'mixed',instructions:'Zgjidh emrin që lidhet me Kongresin e Manastirit.',
    hint:'Përqendruhu te figurat e dokumentuara si pjesëmarrëse.',
    prompts:[
      {id:'c3-e2-p1',kind:'choice',question:'Cili nga këta emra lidhet me Kongresin e Manastirit?',options:[{id:'gurakuqi',label:'Luigj Gurakuqi'},{id:'noli',label:'Fan Noli'},{id:'konica',label:'Faik Konica'}],correctOptionId:'gurakuqi',explanation:'Luigj Gurakuqi ishte pjesë e organizimit dhe punimeve të Kongresit.'},
      {id:'c3-e2-p2',kind:'choice',question:'Cili nga këta emra lidhet me Kongresin e Manastirit?',options:[{id:'midhat',label:'Mid’hat Frashëri'},{id:'noli',label:'Fan Noli'},{id:'koco',label:'Koço Kota'}],correctOptionId:'midhat',explanation:'Mid’hat Frashëri është ndër figurat e lidhura me Kongresin e Manastirit.'},
      {id:'c3-e2-p3',kind:'choice',question:'Cili nga këta emra lidhet me Kongresin e Manastirit?',options:[{id:'fishta',label:'Gjergj Fishta'},{id:'lena',label:'Mihal Grameno'},{id:'bodinaku',label:'Petro Nini Luarasi'}],correctOptionId:'fishta',explanation:'Gjergj Fishta mori pjesë në Kongresin e Manastirit.'},
      {id:'c3-e2-p4',kind:'choice',question:'Cili nga këta emra lidhet me Kongresin e Manastirit?',options:[{id:'zavalani',label:'Fehim Zavalani'},{id:'qiriazi',label:'Gjerasim Qiriazi'},{id:'turdiu',label:'Aleks Stavre Drenova'}],correctOptionId:'zavalani',explanation:'Fehim Zavalani ishte delegat në Kongresin e Manastirit.'},
      {id:'c3-e2-p5',kind:'choice',question:'Cila figurë lidhet me Kongresin e Manastirit?',options:[{id:'gjergjq',label:'Gjergj Qiriazi'},{id:'parashqevi',label:'Parashqevi Qiriazi'},{id:'sevasti',label:'Sevasti Qiriazi'}],correctOptionId:'gjergjq',explanation:'Gjergj Qiriazi është ndër emrat e lidhur me Kongresin e Manastirit.'},
    ],
  },
  {
    id:'c3-e3',chapterId:'chapter-3',number:3,title:'Pse ishte i rëndësishëm Kongresi?',
    type:'mixed',instructions:'Zgjidh përgjigjen më të saktë për çdo pyetje.',
    hint:'Bashkë me historinë, kujto dallimin mes alfabetit dhe drejtshkrimit.',
    prompts:[
      {id:'c3-e3-p1',kind:'choice',question:'Për çfarë u mblodh Kongresi i Manastirit?',options:[{id:'alfabet',label:'Për të trajtuar çështjen e alfabetit dhe për një zgjidhje të përbashkët shkrimi.'},{id:'lloj',label:'Për të vendosur rregullat e të gjitha sporteve.'},{id:'var',label:'Për të shkruar një roman kombëtar.'}],correctOptionId:'alfabet',explanation:'Kongresi trajtoi çështjen e alfabetit të gjuhës shqipe.'},
      {id:'c3-e3-p2',kind:'choice',question:'Ku u mbajt Kongresi i Manastirit?',options:[{id:'manastir',label:'Në Manastir.'},{id:'tiranë',label:'Në Tiranë.'},{id:'korçë',label:'Në Korçë.'}],correctOptionId:'manastir',explanation:'Kongresi u mbajt në Manastir.'},
      {id:'c3-e3-p3',kind:'choice',question:'Në cilin vit u mbajt Kongresi i Manastirit?',options:[{id:'1908',label:'Në vitin 1908.'},{id:'1972',label:'Në vitin 1972.'},{id:'1912',label:'Në vitin 1912.'}],correctOptionId:'1908',explanation:'Punimet u zhvilluan nga 14 deri më 22 nëntor 1908.'},
      {id:'c3-e3-p4',kind:'choice',question:'Çfarë rëndësie pati Kongresi në jetën kulturore shqiptare?',options:[{id:'rendesie',label:'Ndihmoi për afrimin e mënyrave të shkrimit dhe hapi rrugën për një alfabet të përbashkët.'},{id:'asgje',label:'Nuk lidhej fare me kulturën.'},{id:'vetem',label:'Vendosi vetëm emrat e shkollave.'}],correctOptionId:'rendesie',explanation:'Kongresi hapi rrugën për një alfabet të përbashkët dhe nxiti përhapjen e botimeve shqipe.'},
      {id:'c3-e3-p5',kind:'choice',question:'Cila çështje vazhdoi të trajtohej edhe më vonë?',options:[{id:'drejt',label:'Njësimi i drejtshkrimit të gjuhës shqipe.'},{id:'alfabetdallim',label:'Heqja e të gjitha shkronjave.'},{id:'sporti',label:'Rregullat e lojërave me top.'}],correctOptionId:'drejt',explanation:'Njësimi i drejtshkrimit u trajtua edhe më vonë, sidomos në Kongresin e 1972.'},
    ],
  },
  {
    id:'c3-e4',chapterId:'chapter-3',number:4,title:'Fakt apo mit?',
    type:'mixed',instructions:'Shëno nëse pohimi është fakt apo mit.',
    hint:'Mos i ngatërroni dy kongreset.',
    prompts:[
      {id:'c3-e4-p1',kind:'choice',question:'Alfabeti i sotëm i shqipes ka 36 shkronja.',options:[{id:'fakt',label:'Fakt'},{id:'mit',label:'Mit'}],correctOptionId:'fakt',explanation:'Alfabeti standard i shqipes ka 36 shkronja.'},
      {id:'c3-e4-p2',kind:'choice',question:'Shqipja ka 7 zanore.',options:[{id:'fakt',label:'Fakt'},{id:'mit',label:'Mit'}],correctOptionId:'fakt',explanation:'Zanoret janë A, E, Ë, I, O, U, Y.'},
      {id:'c3-e4-p3',kind:'choice',question:'Kongresi i Manastirit u mbajt në Tiranë.',options:[{id:'fakt',label:'Fakt'},{id:'mit',label:'Mit'}],correctOptionId:'mit',explanation:'Kongresi u mbajt në Manastir.'},
      {id:'c3-e4-p4',kind:'choice',question:'Kongresi i Manastirit u zhvillua në vitin 1908.',options:[{id:'fakt',label:'Fakt'},{id:'mit',label:'Mit'}],correctOptionId:'fakt',explanation:'Punimet u mbajtën nga 14 deri më 22 nëntor 1908.'},
      {id:'c3-e4-p5',kind:'choice',question:'Kongresi i Drejtshkrimit u mbajt në Tiranë më 1972.',options:[{id:'fakt',label:'Fakt'},{id:'mit',label:'Mit'}],correctOptionId:'fakt',explanation:'Ai u mbajt në Tiranë, nga 20 deri më 25 nëntor 1972.'},
    ],
  },
  {
    id:'c3-e5',chapterId:'chapter-3',number:5,title:'Lexo dhe kupto',
    type:'mixed',instructions:'Lexo tekstin e shkurtër dhe zgjidh përgjigjen e saktë.',
    hint:'Teksti shpjegon dallimin mes Kongresit të Manastirit dhe Kongresit të Drejtshkrimit.',
    prompts:[
      {id:'c3-e5-p1',kind:'choice',question:'Ku u mblodhën delegatët në vitin 1908?',options:[{id:'manastir',label:'Në Manastir.'},{id:'tirane',label:'Në Tiranë.'},{id:'shkoder',label:'Në Shkodër.'}],correctOptionId:'manastir',explanation:'Delegatët u mblodhën në Manastir.'},
      {id:'c3-e5-p2',kind:'choice',question:'Cila ishte çështja kryesore e Kongresit të Manastirit?',options:[{id:'alfabet',label:'Alfabeti i gjuhës shqipe.'},{id:'kushtetuta',label:'Kushtetuta e shtetit.'},{id:'ushtria',label:'Organizimi i ushtrisë.'}],correctOptionId:'alfabet',explanation:'Çështja kryesore ishte alfabeti i gjuhës shqipe.'},
      {id:'c3-e5-p3',kind:'choice',question:'Në cilin qytet u mbajt Kongresi i Drejtshkrimit më 1972?',options:[{id:'tirane',label:'Në Tiranë.'},{id:'manastir',label:'Në Manastir.'},{id:'prishtine',label:'Në Prishtinë.'}],correctOptionId:'tirane',explanation:'Kongresi i Drejtshkrimit u mbajt në Tiranë.'},
      {id:'c3-e5-p4',kind:'choice',question:'Çfarë synonte Kongresi i Drejtshkrimit?',options:[{id:'njesimi',label:'Të trajtonte dhe të njësonte drejtshkrimin e shqipes.'},{id:'alfabetnje',label:'Të krijonte një gjuhë të re.'},{id:'letre',label:'Të botonte vetëm letra të lashta.'}],correctOptionId:'njesimi',explanation:'Ai synonte njësimin e drejtshkrimit të gjuhës shqipe.'},
      {id:'c3-e5-p5',kind:'choice',question:'Çfarë ndihmuan vendimet e Kongresit të Manastirit?',options:[{id:'shkrim',label:'Ndihmuan në afrimin e mënyrave të shkrimit dhe hapën rrugën për një alfabet të përbashkët.'},{id:'mit',label:'Ato vendosën menjëherë çdo hollësi të drejtshkrimit të sotëm me një votim të vetëm.'},{id:'sport',label:'Ato vendosën rregulla të sportit.'}],correctOptionId:'shkrim',explanation:'Kongresi hapi rrugën për një alfabet të përbashkët dhe ishte një hap vendimtar në njësimin e shkrimit shqip.'},
    ],
  },
];

export const EXERCISE_IDS = EXERCISES.map((exercise) => exercise.id);
export function getExercise(id: string): Exercise | undefined { return EXERCISES.find((exercise) => exercise.id === id); }
export function getExerciseIndex(id: string): number { return EXERCISES.findIndex((exercise) => exercise.id === id); }
