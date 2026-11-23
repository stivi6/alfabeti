# SHKRONJAT TONA — Specifikim për Coding Agent-in

**Projekti:** Faqe interaktive për Ditën e Alfabetit të Gjuhës Shqipe  
**Emri i punës:** Shkronjat Tona  
**Motoja:** 36 shkronja. Një gjuhë. Një histori.  
**Gjuha e faqes:** Shqip  
**Referenca teknike dhe vizuale:** Projekti ekzistues DeutschQuest në këtë folder  
**Kërkesa kryesore:** Ktheje projektin ekzistues në një faqe të plotë për Ditën e Alfabetit, duke ruajtur konceptin, strukturën, funksionalitetin dhe arkitekturën e tij. Mos e ndërto projektin nga zero.

---

## 1. Qëllimi i projektit

Kjo faqe krijohet për të festuar Ditën e Alfabetit të Gjuhës Shqipe, më 22 Nëntor. Ajo duhet të jetë një përvojë interaktive, moderne dhe tërheqëse për të rinj rreth moshës 17–18 vjeç. Nuk duhet të duket si faqe për fëmijë të vegjël dhe as si faqe institucionale e ftohtë.

Vizitori duhet të mundet të:

1. kuptojë menjëherë çfarë po festohet dhe pse ka rëndësi alfabeti;
2. nisë një rrugëtim me tri lojëra të ndryshme;
3. luajë sfida të shkurtra për shkronjat, gjuhën shqipe dhe historinë e alfabetit;
4. shohë pikët, progresin dhe rezultatet;
5. rishikojë gabimet dhe t'i provojë përsëri sfidat.

**Ideja qendrore:** të mësojmë dhe të festojmë shqipen duke luajtur. Faqja nuk duhet të kthehet në një tekst të gjatë historik ose në një test të rëndë shkolle. Informacioni jepet me pjesë të shkurtra, ndërsa pjesa kryesore është ndërveprimi.

## 2. Rregulli më i rëndësishëm: ruaj projektin ekzistues

Folderi ku po punon përmban një kopje të kodit të DeutschQuest. Përdore atë si bazë.

Para se të ndryshosh kodin:

- lexo strukturën e projektit dhe `package.json`;
- identifiko faqet, komponentët, sistemin e navigimit, të dhënat e ushtrimeve dhe mënyrën si ruhet progresi;
- kontrollo si funksionojnë karta e lojës, harta/roadmap-i, pikët, feedback-u, rezultatet dhe rishikimi i gabimeve;
- identifiko paketat, ikonat, fontet dhe burimet vizuale që përdoren aktualisht;
- bëj një plan të shkurtër të skedarëve që do të ndryshohen.

**Mos bëj këto gabime:**

- Mos e nis një projekt të ri nga zero.
- Mos e zëvendëso strukturën ekzistuese me një landing page statike.
- Mos hiq funksionalitete që punojnë në DeutschQuest.
- Mos shto backend, databazë, API, autentikim ose shërbime të jashtme.
- Mos shto paketa të reja pa arsye të fortë.
- Mos ndrysho teknologjitë bazë vetëm për preferencë personale.
- Mos lër përmbajtje në anglisht ose gjermanisht nga projekti i vjetër.

Nëse projekti përdor React, TypeScript, Vite, Tailwind ose CSS, vazhdo me të njëjtin konfigurim. Nëse përdor një zgjidhje tjetër, ruaje atë dhe përshtate përmbajtjen pa bërë migrim të panevojshëm.

## 3. Identiteti i ri: Shkronjat Tona

### 3.1 Emri dhe teksti kryesor

Përdor si emër pune **Shkronjat Tona**. Nëse projekti ka tashmë emër të konfiguruar në shumë vende, centralizoje dhe ndryshoje në mënyrë të qëndrueshme.

**Titulli kryesor i faqes:**

> 36 shkronja. Një gjuhë. Një histori.

**Nëntitulli:**

> Zbulo alfabetin, provo sa mirë e njeh shqipen dhe mëso historinë që qëndron pas shkronjave tona. Kalo nëpër tri lojëra dhe festoje Ditën e Alfabetit duke luajtur.

**Teksti i butonit kryesor:** `Fillo lojën`

**Tekst alternativ i butonit dytësor:** `Zbulo historinë`

Toni duhet të jetë i drejtpërdrejtë, i natyrshëm dhe i përshtatshëm për të rinj. Përdor shqipen standarde, jo gjuhë tepër formale dhe jo shprehje që tingëllojnë si përkthim automatik.

### 3.2 Paleta vizuale

Krijo një identitet të ri kuqezi, por mos e mbush çdo element me të kuqe dhe të zezë. Faqja duhet të jetë elegante, e lexueshme dhe moderne.

Paletë e rekomanduar:

| Përdorimi | Ngjyra | HEX |
|---|---|---|
| E kuqe kryesore | Red | `#C8102E` |
| E kuqe e errët / hover | Deep red | `#9F0D25` |
| E zezë kryesore | Ink black | `#171717` |
| E zezë dytësore | Charcoal | `#292929` |
| Sfond i ngrohtë | Warm ivory | `#F7F3EC` |
| E bardhë | White | `#FFFFFF` |
| Ngjyrë dytësore për detaje | Muted gold | `#B9975B` |
| Tekst i zbehur | Muted gray | `#77736D` |

Përdor të kuqen për CTA-të, progresin, theksimet dhe elementet aktive. E zeza duhet të japë kontrast dhe strukturë. Sfondi krem/ivory e bën faqen më të ngrohtë dhe shmang pamjen e rëndë të një faqeje me sfond të zi kudo. Ngjyra e artë përdoret shumë pak, vetëm për detaje festive ose historike.

Mos përdor gradientë të fortë kudo, hije të rënda, shumë efekte xhami apo animacione të tepruara.

### 3.3 Drejtimi i dizajnit

Ruaj frymën vizuale të DeutschQuest: ilustrime flat/vector, forma të pastra, karta me qoshe të rrumbullakosura dhe ndërveprime të qarta. Bëje më të lidhur me tipografinë dhe historinë e shkrimit.

Ide vizuale:

- shkronja të mëdha si elemente grafike, sidomos `Ç`, `Ë`, `SH`, `NJ`, `RR`;
- fletë libri, faqe të hapura, rreshta shkrimi, karta me shkronja;
- shkronja të vendosura në pllaka/kartela si element i lojës;
- motive të lehta që kujtojnë letër, shtypshkronjë dhe botime të vjetra;
- kombinim i elementeve tradicionale me UI moderne.

**Mos përdor:**

- flamuj të mëdhenj në çdo seksion;
- shqiponja të përsëritura si dekor në çdo kartë;
- fotografi historike të gjeneruara si të ishin dokumente reale;
- portrete të rreme të figurave historike;
- ornamente folklorike të tepërta që e bëjnë faqen të duket si poster turistik;
- vizuale fëmijërore, emoji të shumta ose personazhe karikaturë.

Krijo ilustrime origjinale SVG/CSS kur është e nevojshme. Nëse faqja ka një sistem ilustrimesh të gatshëm, përshtate me këtë temë në vend që të importosh një stil krejt tjetër.

### 3.4 Fontet dhe ikonat

- Ruaj paketën e ikonave që përdor DeutschQuest. Nëse janë Lucide, vazhdo me Lucide.
- Ruaj të njëjtin burim ikonash; mos kalo te një bibliotekë tjetër pa arsye.
- Përdor fontin ekzistues nëse mbështet mirë shkronjat `ë`, `ç` dhe kombinimet e tyre.
- Nëse duhet ndryshim, zgjidh një font sans-serif të lexueshëm që mbështet plotësisht Unicode/Latin Extended.
- Verifiko veçanërisht si duken `Ë`, `ë`, `Ç`, `ç`, `Dh`, `Gj`, `Ll`, `Nj`, `Rr`, `Sh`, `Th`, `Xh`, `Zh` në tituj dhe në tekst të vogël.

## 4. Struktura e faqes

Ruaj arkitekturën ekzistuese të DeutschQuest dhe ndrysho përmbajtjen sipas kësaj strukture.

### 4.1 Faqja kryesore — Ballina

Seksionet e rekomanduara:

1. **Navbar**
   - Logo/wordmark: `Shkronjat Tona`
   - Lidhjet: `Ballina`, `Tri lojërat`, `Pse festojmë?`
   - Buton: `Fillo lojën`
   - Menu mobile që punon siç duhet.

2. **Hero**
   - Etiketë e vogël: `22 NËNTOR · DITA E ALFABETIT`
   - Titull: `36 shkronja. Një gjuhë. Një histori.`
   - Nëntitulli sipas pikës 3.1.
   - CTA `Fillo lojën` që çon te roadmap-i.
   - CTA dytësor `Zbulo historinë` që çon te seksioni historik.
   - Ilustrim hero me shkronja, faqe libri dhe pllaka tipografike.

3. **Tri lojërat**
   Shfaq tri karta të dallueshme. Secila duhet të ketë numrin, emrin, përshkrimin dhe një ilustrim/ikonë përkatëse:
   - `01 — Bota e shkronjave`: mëso dhe luaj me 36 shkronjat e alfabetit.
   - `02 — Shqipja në përdorim`: provo drejtshkrimin, gramatikën dhe ndërtimin e fjalive.
   - `03 — Historia e alfabetit`: zbulo Kongresin e Manastirit dhe rrugëtimin e shkrimit shqip.

4. **Si funksionon**
   Përdor strukturën ekzistuese të seksionit “How it works”, por përktheje natyrshëm:
   - Zgjidh një lojë.
   - Kalo sfidat.
   - Mblidh pikë dhe shiko rezultatin.

5. **Pse festojmë?**
   Një përmbledhje e shkurtër për Ditën e Alfabetit. Mos e kthe në artikull të gjatë. Përdor këtë tekst bazë:

   > Më 22 nëntor kujtojmë Kongresin e Manastirit, të mbajtur nga 14 deri më 22 nëntor 1908. Ai ishte një hap vendimtar në përpjekjet për një mënyrë të përbashkët shkrimi të shqipes. Sot, alfabeti ynë ka 36 shkronja dhe është pjesë e përditshme e mënyrës si mësojmë, shkruajmë dhe komunikojmë.

6. **CTA përfundimtare**
   - Titull: `Gati t’i provosh shkronjat?`
   - Buton: `Nis sfidën`

7. **Footer**
   - `Shkronjat Tona`
   - `Një lojë për Ditën e Alfabetit të Gjuhës Shqipe.`
   - Lidhje te Ballina dhe Tri lojërat.
   - Mbaj ose përshtat kreditimet ekzistuese të aseteve, sipas licencave të tyre. Mos i hiq kreditimet që kërkohen nga licenca.

### 4.2 Roadmap / faqja e lojërave

Ruaj komponentin aktual të roadmap-it dhe logjikën e tij.

Titulli i faqes:

> Rrugëtimi yt nëpër shqip

Nëntitulli:

> Tri lojëra, pesë sfida për secilën. Zgjidh një sfidë dhe provo çfarë di.

Duhet të shfaqen:

- progresi total: `0/15 sfida` në fillim;
- numri i lojërave: `3`;
- numri total i sfidave: `15`;
- progresi për secilën lojë;
- kartat/node-t e sfidave me gjendje të dallueshme: e pambyllur, aktive, e përfunduar;
- pikët e fituara;
- mundësia për të hyrë përsëri te sfidat e përfunduara.

Tre grupet e roadmap-it:

1. `Bota e shkronjave` — 5 sfida.
2. `Shqipja në përdorim` — 5 sfida.
3. `Historia e alfabetit` — 5 sfida.

Mos i quaj më “nivele të gjermanishtes”. Këto janë tri lojëra/kapituj të pavarur, secila me pesë sfida.

### 4.3 Faqja e sfidës

Ruaj modelin aktual të lojës dhe komponentët e përgjigjeve. Çdo sfidë duhet të ketë:

- emrin e sfidës;
- numrin, p.sh. `Sfida 2 nga 5`;
- progres-bar;
- udhëzim të shkurtër dhe të qartë;
- përmbajtjen interaktive;
- buton për kontrollimin e përgjigjes, nëse mekanika e kërkon;
- feedback të menjëhershëm;
- shpjegim të shkurtër pas përgjigjes;
- buton `Vazhdo`;
- mundësi për t'u kthyer te roadmap-i.

Feedback-u duhet të jetë inkurajues, jo ndëshkues:

- E saktë: `Saktë! E gjete.`
- Gabim: `Jo tamam. Shiko përgjigjen dhe provo ta mbash mend.`
- Përfundim: `Sfida u përfundua!`

Mos përdor vetëm ngjyrën për të dalluar përgjigjen e saktë/gabuar; përdor edhe ikonë dhe tekst.

### 4.4 Rezultatet

Ruaj faqen aktuale të rezultateve, duke e përshtatur me tri lojërat e reja.

Duhet të shfaqë:

- pikët totale;
- numrin e sfidave të përfunduara;
- përqindjen e përgjigjeve të sakta;
- një koment të shkurtër sipas rezultatit;
- rezultatet sipas secilës lojë;
- listën e pyetjeve të gabuara dhe përgjigjet e sakta;
- buton `Rishiko gabimet`;
- buton `Luaj përsëri`;
- buton `Kthehu te lojërat`.

Komentet duhet të jenë pozitive dhe jo fëminore. Shembuj:

- 90–100%: `Shkëlqyeshëm! E njeh shumë mirë alfabetin dhe gjuhën shqipe.`
- 70–89%: `Punë shumë e mirë! Ke njohuri të forta; edhe pak ushtrim dhe i kap të gjitha.`
- 50–69%: `Mirë! Ke disa njohuri të mira. Rishiko pyetjet dhe provo përsëri.`
- 0–49%: `Ky ishte një fillim i mirë. Kalo edhe një herë nëpër sfida dhe shiko sa do të përmirësohesh.`

Mos përdor komente poshtëruese ose krahasime me përdorues të tjerë.

---

## 5. Përmbajtja e tri lojërave

**Rregull i përgjithshëm:** 3 lojëra × 5 sfida = 15 sfida. Çdo sfidë duhet të ketë disa pyetje/raunde të shkurtra, në mënyrë që loja të mos mbarojë pas një klikimi të vetëm. Syno 4–5 elemente për sfidë, përveç rasteve kur mekanika kërkon ndryshe.

Për çdo element të përmbajtjes krijo të dhëna të strukturuara me:

- `id` të qëndrueshëm;
- udhëzimin;
- pyetjen ose materialin;
- opsionet, kur ka;
- përgjigjen e saktë;
- shpjegimin e shkurtër;
- pikët;
- nivelin e vështirësisë.

Mos i shpërnda pyetjet si tekste të shkruara drejtpërdrejt në shumë komponentë. Mbaji në skedarë të veçantë të të dhënave, që të kontrollohen dhe të përditësohen lehtë.

# LOJA 1 — Bota e shkronjave

**Përshkrimi:** Një lojë vizuale dhe interaktive për të njohur 36 shkronjat, renditjen e tyre, zanoret dhe dyshkronjëshat.

**Nënteksti:** `Njihi shkronjat, zbulo rendin e tyre dhe ndërto fjalë.`

### Sfida 1.1 — Rendi i alfabetit

**Mekanika:** Zgjedhje e shkronjës që mungon ose vendosje e kartave në rendin e saktë. Mbaje të lehtë në përdorim edhe në telefon; mos kërko drag-and-drop të imët në ekran të vogël.

**Alfabeti standard, në rendin e saktë:**

`A, B, C, Ç, D, DH, E, Ë, F, G, GJ, H, I, J, K, L, LL, M, N, NJ, O, P, Q, R, RR, S, SH, T, TH, U, V, X, XH, Y, Z, ZH`

Përdor këtë rend si burim të vetëm të së vërtetës në kod. Mos e krijo veçmas renditjen në disa komponentë.

Shembuj raundesh:

| Pyetja | Përgjigjja e saktë | Shpjegimi |
|---|---|---|
| Cila shkronjë vjen pas C-së? | Ç | Në alfabetin shqip, Ç vjen menjëherë pas C-së. |
| Cila shkronjë vjen pas D-së? | DH | DH është një shkronjë e alfabetit shqip. |
| Cila shkronjë vjen pas E-së? | Ë | Ë është shkronjë më vete. |
| Cila shkronjë vjen pas N-së? | NJ | NJ numërohet si një shkronjë e alfabetit. |
| Cila shkronjë vjen pas SH-së? | T | Pas SH vjen T. |

Kujdes: opsionet shpërqendruese duhet të jenë të besueshme, por jo të krijojnë dy përgjigje të mundshme.

### Sfida 1.2 — Dyshkronjëshat

**Mekanika:** Gjej dhe zgjidh vetëm dyshkronjëshat nga një grup shkronjash/kombinimesh. Përdor karta të mëdha ku dyshkronjëshi paraqitet si një njësi e vetme.

**Nëntë dyshkronjëshat:**

`DH, GJ, LL, NJ, RR, SH, TH, XH, ZH`

Shpjegim i shkurtër për përdoruesin:

> Dyshkronjëshat shkruhen me dy shkronja latine, por në alfabetin shqip secili përfaqëson një shkronjë më vete.

Shembull i një grupi kartash: `B`, `SH`, `A`, `RR`, `D`, `NJ`, `K`, `XH`, `Ë`, `ZH`, `LL`, `GJ`, `TH`, `E`, `DH`.

Detyra: përdoruesi duhet të zgjedhë nëntë dyshkronjëshat. Përgjigjja e saktë duhet të jetë pikërisht lista e mësipërme.

### Sfida 1.3 — Zanore apo bashkëtingëllore?

**Mekanika:** Klasifikim me dy zona/kategori ose pyetje të shpejta me dy alternativa.

**Shtatë zanoret:**

`A, E, Ë, I, O, U, Y`

Shqipja ka gjithsej 36 shkronja: 7 zanore dhe 29 bashkëtingëllore.

Shembuj:

| Shkronja | Kategoria |
|---|---|
| A | Zanore |
| Ë | Zanore |
| Y | Zanore |
| B | Bashkëtingëllore |
| SH | Bashkëtingëllore |
| NJ | Bashkëtingëllore |
| XH | Bashkëtingëllore |

Për këtë sfidë, trajtoji dyshkronjëshat si njësi të vetme të alfabetit.

### Sfida 1.4 — Gjeje shkronjën në fjalë

**Mekanika:** Shfaq një shkronjë/dyshkronjësh dhe disa fjalë. Përdoruesi zgjedh fjalën që e përmban.

Shembuj raundesh:

| Shkronja e kërkuar | Opsionet | Përgjigjja |
|---|---|---|
| Ç | çelës / qytet / gjuhë | çelës |
| SH | shkollë / rrugë / derë | shkollë |
| NJ | njeri / fletë / diell | njeri |
| RR | rrugë / gjuhë / qiri | rrugë |
| XH | xhaketë / shishe / çantë | xhaketë |
| TH | thesar / shok / yll | thesar |

Kontrollo që fjala e saktë ta përmbajë vërtet shkronjën/dyshkronjëshin dhe opsionet të mos krijojnë paqartësi.

### Sfida 1.5 — Ndërto fjalën

**Mekanika:** Përdoruesi vendos pllakat e shkronjave në rendin e duhur për të formuar një fjalë. Çdo dyshkronjësh duhet të jetë një pllakë e vetme, jo dy pllaka të ndara.

Fjalët e rekomanduara:

| Fjala që duhet formuar | Pllakat e synuara | Shënim |
|---|---|---|
| SHQIP | SH – Q – I – P | SH është një pllakë. |
| GJUHË | GJ – U – H – Ë | GJ është një pllakë. |
| RRUGË | RR – U – G – Ë | RR është një pllakë. |
| ÇELËS | Ç – E – L – Ë – S | Ç dhe Ë paraqiten veçmas. |
| NJERI | NJ – E – R – I | NJ është një pllakë. |

Pas çdo fjale, shfaq kuptimin vetëm nëse është e nevojshme. Mos e mbingarko sfidën me përkufizime të gjata.

---

# LOJA 2 — Shqipja në përdorim

**Përshkrimi:** Një quiz i përditshëm për përdorimin e saktë të shqipes: drejtshkrim, rasa, folje, fjalë dhe pikësim. Vështirësia duhet të jetë e përshtatshme për një 18-vjeçar: jo elementare, por as provim universitar.

**Nënteksti:** `Sa mirë e përdor shqipen në të shkruar dhe në të folur?`

### Sfida 2.1 — Shkruaje saktë

**Mekanika:** Zgjedh fjalën e shkruar saktë nga dy ose tri variante. Përdor shembuj të zakonshëm.

| Pyetja / variantet | Përgjigjja e saktë | Shpjegimi |
|---|---|---|
| shtepi / shtëpi | shtëpi | Fjala shkruhet me ë pas shkronjës t. |
| qeles / çelës | çelës | Fjala shkruhet me ç në fillim dhe ë në fund. |
| gjuhe / gjuhë | gjuhë | Fjala shkruhet me ë në fund. |
| rruge / rrugë | rrugë | Fjala shkruhet me ë në fund. |
| pergjegjesi / përgjegjësi | përgjegjësi | Fjala shkruhet me ë dhe me gj. |
| shkolla / shkollë | Varet nga fjalia | Mos e përdor si pyetje me vetëm një përgjigje pa dhënë kontekstin. |

Rregull: mos i paraqit variantet pa `ë`/`ç` si gjithmonë gabim në çdo kontekst nëse fjala ndryshon sipas lakimit ose trajtës. Pyetja duhet të ketë një përgjigje të vetme të mbështetur nga fjalia.

Shto edhe pyetje në kontekst, p.sh.:

- `Në ___ mësojmë çdo ditë.` → `shkollë`
- `Gjuha shqipe ka një ___ të veçantë.` → `histori`

Për pyetje me plotësim, kontrollo edhe kuptimin dhe përshtatjen gramatikore të fjalisë.

### Sfida 2.2 — Gjeje rasën e emrit

**Mekanika:** Shfaq një fjali me emrin e theksuar dhe kërko të identifikohet rasa. Përdor të pesë rasat e emrit.

| Fjalia | Emri që analizohet | Rasa | Arsyeja |
|---|---|---|---|
| Libri është mbi tavolinë. | Libri | Emërore | Është kryefjala e fjalisë. |
| Kopertina e librit është e kuqe. | librit | Gjinore | Tregon përkatësi: kopertina e kujt? e librit. |
| I dhashë shokut librin. | shokut | Dhanore | Tregon kujt iu dha libri. |
| Lexova librin. | librin | Kallëzore | Është kundrinori i drejtë: lexova çfarë? librin. |
| U ktheva prej fshatit. | fshatit | Rrjedhore | Përdoret me parafjalën prej dhe tregon prejardhje/largim. |

Përmbledhje që mund të shfaqet si ndihmë:

- Emërore — kush? / cili?
- Gjinore — i kujt? / e kujt?
- Dhanore — kujt?
- Kallëzore — kë? / çfarë?
- Rrjedhore — prej kujt? / prej çfarë?

Mos e ngatërro emrin që analizohet me fjalët e tjera të fjalisë. Në UI thekso vizualisht vetëm emrin që duhet analizuar.

### Sfida 2.3 — Folja dhe përshtatja

**Mekanika:** Zgjidh formën e foljes që përshtatet me kryefjalën ose identifiko vetën dhe numrin.

| Fjalia me boshllëk | Përgjigjja e saktë | Shpjegimi |
|---|---|---|
| Unë dhe shoku im ___ në bibliotekë. (shkoj / shkojmë / shkojnë) | shkojmë | Kryefjala është në vetën e parë, numri shumës. |
| Nxënësit ___ librin. (lexon / lexojnë / lexoj) | lexojnë | Kryefjala është në vetën e tretë, numri shumës. |
| Ajo ___ një ide të mirë. (kam / ke / ka) | ka | Ajo është veta e tretë, numri njëjës. |
| Ne e ___ detyrën dje. (përfundova / përfunduam / përfunduan) | përfunduam | Kryefjala ne kërkon vetën e parë shumës. |
| Ata do të ___ nesër. (vij / vish / vijnë) | vijnë | Kryefjala ata kërkon vetën e tretë shumës. |

Shfaq pas përgjigjes një shënim të shkurtër për vetën/numrin, jo një leksion të gjatë.

### Sfida 2.4 — Fjalët në fjali

**Mekanika:** Identifiko pjesën e ligjëratës të fjalës së theksuar ose zgjidh fjalën që plotëson saktë fjalinë.

Shembuj:

| Fjalia | Fjala e theksuar | Përgjigjja | Shpjegimi |
|---|---|---|---|
| Nxënësit **lexojnë** çdo ditë. | lexojnë | Folje | Tregon veprimin. |
| **Biblioteka** është e qetë. | Biblioteka | Emër | Emërton një vend. |
| Ajo zgjodhi një libër **interesant**. | interesant | Mbiemër | Tregon një cilësi të emrit libër. |
| Ata flasin **qartë**. | qartë | Ndajfolje | Tregon si flasin. |
| **Ne** e përfunduam lojën. | Ne | Përemër | Zë vendin e emrit dhe tregon vetën e parë shumës. |

Sigurohu që fjala e theksuar të ketë vetëm kategorinë e synuar në kontekstin konkret.

### Sfida 2.5 — Pikësimi

**Mekanika:** Zgjidh shenjën e pikësimit ose korrigjo fjalinë.

| Fjalia pa pikësim | Versioni i saktë | Shpjegimi |
|---|---|---|
| Ku është libri im | Ku është libri im? | Pyetja mbyllet me pikëpyetje. |
| Sot festojmë Ditën e Alfabetit | Sot festojmë Ditën e Alfabetit. | Fjalia pohore mbyllet me pikë. |
| Sa bukur shkruan | Sa bukur shkruan! | Fjalia shpreh emocion. |
| Ana mori fletoren lapsin dhe librin | Ana mori fletoren, lapsin dhe librin. | Presja ndan elementet e renditura në listë. |
| Arta a e more librin | Arta, a e more librin? | Presja ndan thirrjen nga pjesa tjetër e fjalisë. |

Mos vendos pikëpyetje pas një fjalie që nuk është pyetëse. Kontrollo çdo fjali para se ta shtosh në lojë.

---

# LOJA 3 — Historia e alfabetit

**Përshkrimi:** Një quiz i shkurtër mbi Kongresin e Manastirit, figurat që morën pjesë, rëndësinë e vendimeve dhe zhvillimin e mëvonshëm të drejtshkrimit të shqipes.

**Nënteksti:** `Zbulo si u bë alfabeti ynë pjesë e historisë.`

### Sfida 3.1 — Vendosi ngjarjet në kohë

**Mekanika:** Rendit kartat në kronologjinë e saktë. Përdor kartat me data të qarta.

Ngjarjet:

1. `14 nëntor 1908` — Hapet Kongresi i Manastirit.
2. `22 nëntor 1908` — Përfundojnë punimet e Kongresit të Manastirit.
3. `20–25 nëntor 1972` — Mbahet në Tiranë Kongresi i Drejtshkrimit të Gjuhës Shqipe.

Renditja e saktë është 1 → 2 → 3.

Shpjegimi:

> Kongresi i Manastirit u zhvillua në nëntor 1908. Shumë vite më vonë, në vitin 1972, u mbajt në Tiranë Kongresi i Drejtshkrimit, i cili trajtoi njësimin e drejtshkrimit të shqipes.

Mos i ngatërro dy kongreset: Kongresi i Manastirit (1908) lidhet me çështjen e alfabetit; Kongresi i Drejtshkrimit (1972) lidhet me normat e drejtshkrimit dhe gjuhën letrare të njësuar.

### Sfida 3.2 — Figura të Kongresit

**Mekanika:** Zgjidh emrat që lidhen me Kongresin e Manastirit. Përdor vetëm emra që janë të dokumentuar qartë në burimin historik të përdorur.

Figura që mund të përfshihen:

- Luigj Gurakuqi
- Mid’hat Frashëri
- Gjergj Fishta
- Fehim Zavalani
- Gjergj Qiriazi

Pyetje shembull:

> Cili nga këta emra lidhet me Kongresin e Manastirit?

Krijo raunde me një përgjigje të saktë ose me disa përgjigje të sakta, por trego qartë në udhëzim nëse kërkohet një apo më shumë se një emër.

Mos shpik poste, tituj apo role për këta persona. Nëse pyetja kërkon rolin e saktë historik të një figure, verifikoje veçmas në një burim të besueshëm para se ta publikosh.

### Sfida 3.3 — Pse ishte i rëndësishëm Kongresi?

**Mekanika:** Quiz me alternativa.

Pyetje të rekomanduara:

**Pyetja 1:** Për çfarë u mblodh Kongresi i Manastirit?  
Përgjigjja e saktë: Për të trajtuar çështjen e alfabetit të gjuhës shqipe dhe për të gjetur një zgjidhje të përbashkët për shkrimin e saj.

**Pyetja 2:** Ku u mbajt Kongresi i Manastirit?  
Përgjigjja e saktë: Në Manastir.

**Pyetja 3:** Në cilin vit u mbajt?  
Përgjigjja e saktë: Në vitin 1908.

**Pyetja 4:** Çfarë rëndësie pati në jetën kulturore shqiptare?  
Përgjigjja e saktë: Ndihmoi për afrimin e mënyrave të ndryshme të shkrimit dhe hapi rrugën për një alfabet të përbashkët, duke nxitur edhe përhapjen e shkollave e botimeve në shqip.

**Pyetja 5:** Cila ishte një çështje që vazhdoi të trajtohej edhe më vonë?  
Përgjigjja e saktë: Njësimi i drejtshkrimit të gjuhës shqipe.

### Sfida 3.4 — Fakt apo mit?

**Mekanika:** Përdoruesi shënon nëse pohimi është fakt apo mit. Pas zgjedhjes jep shpjegim.

| Pohimi | Përgjigjja | Shpjegimi |
|---|---|---|
| Alfabeti i sotëm i shqipes ka 36 shkronja. | Fakt | Alfabeti standard ka 36 shkronja. |
| Shqipja ka 7 zanore. | Fakt | Zanoret janë A, E, Ë, I, O, U, Y. |
| Kongresi i Manastirit u mbajt në Tiranë. | Mit | U mbajt në Manastir. |
| Kongresi i Manastirit u zhvillua në vitin 1908. | Fakt | Punimet u mbajtën nga 14 deri më 22 nëntor 1908. |
| Kongresi i Drejtshkrimit u mbajt në vitin 1972. | Fakt | U mbajt në Tiranë, nga 20 deri më 25 nëntor 1972. |
| Në Kongresin e Manastirit u vendos përfundimisht çdo hollësi e drejtshkrimit të sotëm me një votim të vetëm. | Mit | Kongresi ishte një hap vendimtar për çështjen e alfabetit, ndërsa njësimi i drejtshkrimit u trajtua edhe më vonë. |

**Shënim i domosdoshëm historik:** Burimet e Muzeut Historik Kombëtar përshkruajnë miratimin e dy alfabeteve/varianteve në Kongres, përfshirë alfabetin e Stambollit dhe variantin latin. Prandaj, mos shkruaj se Kongresi miratoi në një votim të vetëm çdo hollësi të alfabetit dhe drejtshkrimit që përdorim sot. Përdor formulimin e kujdesshëm: `Kongresi hapi rrugën për një alfabet të përbashkët dhe ishte një hap vendimtar në njësimin e shkrimit shqip.`

### Sfida 3.5 — Lexo dhe kupto

**Mekanika:** Një paragraf i shkurtër dhe tri ose katër pyetje me alternativa. Ky është përfundimi i lojës së historisë.

Teksti bazë:

> Para Kongresit të Manastirit, në shqip përdoreshin disa mënyra shkrimi. Për këtë arsye, nga 14 deri më 22 nëntor 1908, delegatë shqiptarë u mblodhën në Manastir për të trajtuar çështjen e alfabetit. Vendimet e Kongresit ndihmuan në afrimin e mënyrave të shkrimit dhe hapën rrugën për një alfabet të përbashkët. Më vonë, nga 20 deri më 25 nëntor 1972, në Tiranë u mbajt Kongresi i Drejtshkrimit të Gjuhës Shqipe.

Pyetjet:

1. Ku u mblodhën delegatët në vitin 1908? — `Në Manastir.`
2. Cila ishte çështja kryesore e Kongresit? — `Alfabeti i gjuhës shqipe.`
3. Në cilin qytet u mbajt Kongresi i Drejtshkrimit më 1972? — `Në Tiranë.`
4. Çfarë synonte Kongresi i Drejtshkrimit? — `Të trajtonte dhe të njësontë drejtshkrimin e shqipes.`

Mos shto në këtë tekst data, numra delegatësh apo role që nuk janë verifikuar në burimet e referencuara.

---

## 6. Saktësia gjuhësore — kërkesë kritike

Saktësia e shqipes është po aq e rëndësishme sa dizajni. Faqja po feston gjuhën shqipe; një gabim drejtshkrimor ose gramatikor do ta dëmtonte besueshmërinë e të gjithë projektit.

### 6.1 Rregulla të detyrueshme

- Përdor shqipen standarde në të gjitha udhëzimet, pyetjet, përgjigjet, feedback-un dhe përshkrimet.
- Përdor saktë `ë` dhe `ç`. Mos i zëvendëso me `e` dhe `c` në tekstin që sheh përdoruesi.
- Kontrollo lakimin e emrave dhe mbiemrave: rasa, gjinia, numri dhe trajta.
- Kontrollo përshtatjen e foljeve me vetën dhe numrin e kryefjalës.
- Kontrollo rendin e fjalëve dhe pikësimin.
- Mos përdor fjali që duken të përkthyera fjalë për fjalë nga anglishtja.
- Mos përdor fjalë tepër teknike nëse mund të thuhet më thjesht pa humbur saktësinë.
- Mos përdor shprehje dialektore në përmbajtjen mësimore, përveç kur tema e pyetjes është vetë dialekti.
- Mos i trajto format e gegërishtes dhe toskërishtes si “gabime” në përgjithësi. Lojërat duhet të testojnë shqipen standarde, dhe kjo duhet të jetë e qartë nga konteksti.
- Mos krijo përgjigje të dykuptimta. Nëse dy variante mund të jenë të sakta në kontekste të ndryshme, shto fjali që e përcakton kontekstin ose zëvendëso pyetjen.
- Çdo pyetje duhet të ketë vetëm një përgjigje të saktë, përveçse kur udhëzimi thotë shprehimisht `Zgjidh të gjitha përgjigjet e sakta`.

### 6.2 Kontrolli me fjalor dhe burime

Për fjalët ose format ku ka dyshim:

1. kontrollo fillimisht **Fjalorin e Madh të Gjuhës Shqipe**, platforma zyrtare `https://fjalori.online/`;
2. kontrollo rregullat e drejtshkrimit dhe gramatikës në burime arsimore ose akademike;
3. për fakte historike përdor Muzeun Historik Kombëtar dhe botimet akademike;
4. nëse burimet nuk bien dakord, mos e shpik përgjigjen. Hiqe pyetjen ose shënoje për verifikim njerëzor.

Mos përdor Wikipedia, postime në rrjete sociale ose faqe anonime si burimin e vetëm për një përgjigje historike apo gjuhësore.

### 6.3 Kontrolli final i përmbajtjes

Para publikimit, kontrollo manualisht të gjitha 15 sfidat:

- drejtshkrimin e çdo fjale;
- përdorimin e ë/ç;
- rasën e secilit emër të theksuar;
- vetën dhe numrin e foljeve;
- përshtatjen e mbiemrave;
- pikësimin;
- përgjigjet dhe shpjegimet;
- faktet dhe datat historike;
- mungesën e përgjigjeve të dyfishta.

Krijo një skedar të vetëm `content` ose `quiz-data` për pyetjet. Përfshi komente në kod ose një shënim burimi pranë fakteve historike, që përmbajtja të mund të auditohet më vonë.

---

## 7. Funksionaliteti dhe ruajtja e progresit

Ruaj të njëjtën logjikë funksionale si DeutschQuest.

### 7.1 Pa backend

- Vetëm frontend.
- Pa databazë.
- Pa API të jashtme.
- Pa login/register.
- Pa Firebase, Supabase ose Express.
- Progresi ruhet në `localStorage`.
- Të gjitha pyetjet ruhen lokalisht në skedarë statikë.

### 7.2 Progresi

- Ruaj sfidat e përfunduara, pikët, përgjigjet dhe gabimet.
- Progresi duhet të mbijetojë pas rifreskimit të faqes.
- Roadmap-i duhet të përditësohet menjëherë pas përfundimit të një sfide.
- Rezultatet totale duhet të llogariten nga të dhënat reale, jo të jenë vlera statike.
- Përdor një emër të ri për çelësat e `localStorage`, p.sh. `shkronjat-tona-progress-v1`, që të mos ngatërrohen me të dhënat e vjetra të DeutschQuest.
- Butoni `Rivendos progresin` duhet të kërkojë konfirmim përpara fshirjes.

### 7.3 Pikët dhe feedback-u

Ruaj sistemin e pikëve nga loja ekzistuese, nëse është i balancuar. Nëse duhet ndryshuar:

- përdor të njëjtin numër pikësh për pyetje me vështirësi të njëjtë;
- mos jep pikë të shumëfishta nga klikime të përsëritura;
- mos lejo që përdoruesi të marrë pikë duke klikuar disa herë `Kontrollo`;
- ruaj përgjigjen e parë ose përgjigjen përfundimtare sipas modelit ekzistues, por përdor të njëjtin rregull në të gjitha lojërat.

### 7.4 Navigimi

- Të gjitha rrugët duhet të punojnë edhe kur hapen drejtpërdrejt me URL.
- Rifreskimi në faqen e lojës ose te rezultatet nuk duhet të prishë aplikacionin.
- Butoni Back i shfletuesit duhet të sillet natyrshëm.
- Nëse loja përfundon, përdoruesi duhet të mund të kthehet te roadmap-i pa humbur progresin.

---

## 8. Responsiviteti dhe UX

Faqja duhet të punojë mirë në desktop, tablet dhe telefon.

### Desktop

- Hero me tekst dhe ilustrim në dy kolona.
- Kartat e lojërave të paraqitura në rresht, kur hapësira e lejon.
- Roadmap-i të ketë hierarki vizuale të qartë dhe të mos duket i ngjeshur.

### Tablet

- Përshtatje e kartave në dy kolona kur ka hapësirë.
- Butonat dhe kartat të mbeten të lehtë për t'u prekur.

### Mobile

- Layout me një kolonë.
- Hero me titull të lexueshëm dhe CTA të dukshëm.
- Kartat e sfidave të mos dalin jashtë ekranit.
- Shkronjat e mëdha të mos mbulojnë udhëzimet.
- Mos kërko drag-and-drop me saktësi të lartë; ofro alternativë me prekje/klikim ose butona lëvizjeje.
- Mos përdor tabela të gjera në sfida; ktheji në karta ose rreshta të përshtatur për mobile.
- Mos lejo scroll horizontal në të gjithë faqen.

### Aksesueshmëria

- Përdor elemente semantike HTML.
- Të gjitha kontrollet duhet të punojnë me tastierë.
- Ruaj fokusin vizual.
- Vendos `aria-label` aty ku ikona nuk ka tekst shoqërues.
- Përdor kontrast të mjaftueshëm.
- Respekto `prefers-reduced-motion`.
- Mos e komuniko saktësinë vetëm me ngjyra.

---

## 9. Asetet vizuale

Përdor të njëjtin vend/burim ikonash që përdor projekti ekzistues. Mos ndërro bibliotekën e ikonave.

Për vizualet e reja, krijo ose përshtat:

1. Logo/wordmark `Shkronjat Tona`.
2. Favicon të ri.
3. Ilustrim hero me alfabetin, libër dhe pllaka shkronjash.
4. Ilustrim për `Bota e shkronjave` — pllaka alfabeti/36 shkronjat.
5. Ilustrim për `Shqipja në përdorim` — fletë, laps, fjali dhe shenja pikësimi.
6. Ilustrim për `Historia e alfabetit` — dokument, faqe libri ose tipografi arkivore.
7. Ikona të vogla për arritjet dhe përfundimin e sfidave.
8. Open Graph/social preview image.

Përdor SVG kur mundesh, sepse është i lehtë dhe i mprehtë në çdo madhësi. Për ilustrimet e mëdha mos shkarko imazhe me rezolucion të tepërt. Ruaj kreditimet dhe licencat e aseteve ekzistuese.

Mos përdor foto historike të marra nga interneti pa verifikuar burimin dhe lejen e përdorimit. Nëse përdor një foto të Kongresit të Manastirit, ajo duhet të jetë dokumentare, e saktë dhe me burim/kreditim.

---

## 10. SEO dhe metadata

Përditëso të gjitha metadata që mund të kenë mbetur nga DeutschQuest.

**Title:** `Shkronjat Tona | Dita e Alfabetit të Gjuhës Shqipe`

**Description:** `Festo Ditën e Alfabetit me tri lojëra interaktive për shkronjat, gjuhën shqipe dhe historinë e Kongresit të Manastirit.`

Kontrollo:

- favicon;
- Open Graph title/description/image;
- meta description;
- emrat e faqeve;
- alt text të imazheve;
- titujt e browser tab;
- tekstet që shfaqen në preview kur ndahet linku.

Asnjë metadata nuk duhet të përmendë DeutschQuest, German, German learning, Willkommen, Im Alltag ose Deutschland.

---

## 11. Testimi me Playwright

Përdor Playwright që projekti ka tashmë, nëse është i instaluar. Mos shto framework të ri testimi pa nevojë.

### 11.1 Testet funksionale

- Ballina hapet pa gabime.
- CTA `Fillo lojën` të çon te roadmap-i.
- Roadmap-i shfaq 3 lojëra dhe 15 sfida.
- Të gjitha 15 sfidat hapen.
- Çdo mekanikë pranon përgjigje.
- Përgjigjet e sakta dhe të gabuara identifikohen saktë.
- Shpjegimi shfaqet pas përgjigjes.
- Pikët llogariten saktë.
- Progresi i lojërave përditësohet.
- Përfundimi i një sfide ruhet në `localStorage`.
- Refresh nuk e fshin progresin.
- Rezultatet totale janë të sakta.
- Rishikimi i gabimeve tregon pyetjet dhe përgjigjet përkatëse.
- `Luaj përsëri` dhe `Rivendos progresin` punojnë siç duhet.
- Navigimi Back/Forward nuk prish gjendjen.

### 11.2 Testet e përmbajtjes

Shto kontrolle që të sigurojnë:

- ekzistojnë 36 shkronja të renditura;
- ekzistojnë saktësisht 9 dyshkronjësha në listën e tyre;
- ekzistojnë saktësisht 7 zanore;
- çdo pyetje ka ID unike;
- çdo pyetje ka përgjigje të saktë;
- çdo pyetje me alternativa përmban përgjigjen e saktë mes alternativave;
- nuk ka pyetje me tekst bosh;
- nuk mbeten tekste në anglisht/gjermanisht nga projekti i vjetër;
- nuk ka dy përgjigje të sakta në një pyetje që kërkon vetëm një.

### 11.3 Testet vizuale

Hap dhe kontrollo faqen në madhësitë e mëposhtme:

- Desktop: `1440 × 900`
- Laptop: `1280 × 800`
- Tablet: `768 × 1024`
- Mobile: `390 × 844`
- Mobile i vogël: `360 × 800`

Merr screenshot për:

- Ballina;
- seksioni i tri lojërave;
- roadmap-i;
- një sfidë nga secila lojë;
- faqja e rezultateve.

Kontrollo vizualisht që:

- nuk ka tekst të prerë;
- nuk ka scroll horizontal;
- butonat nuk mbivendosen;
- kartat kanë lartësi dhe hapësira të qëndrueshme;
- ngjyra e kuqe nuk e lodh syrin;
- ilustrimet nuk e mbulojnë përmbajtjen;
- `ë` dhe `ç` shfaqen saktë në çdo madhësi.

### 11.4 Kontrolli teknik

- Ekzekuto build-in e prodhimit.
- Rregullo të gjitha gabimet TypeScript/console që lidhen me projektin.
- Kontrollo network requests për asete që mungojnë.
- Kontrollo që nuk ka import-e të vjetra ose skedarë të papërdorur nga DeutschQuest.
- Sigurohu që faqja mund të publikohet në Vercel me konfigurimin ekzistues.

---

## 12. Kriteret e pranimit

Projekti quhet i përfunduar vetëm kur të gjitha kushtet e mëposhtme plotësohen:

- [ ] Është ripërdorur projekti ekzistues, jo krijuar një projekt tjetër nga zero.
- [ ] Identiteti vizual është përditësuar në kuqezi me sfond të ngrohtë dhe kontrast të mirë.
- [ ] Të gjitha tekstet e ndërfaqes janë në shqip të saktë dhe natyrale.
- [ ] Ballina ka seksionet dhe CTA-të e përcaktuara.
- [ ] Roadmap-i ka 3 lojëra dhe gjithsej 15 sfida.
- [ ] Loja 1 mbulon alfabetin, dyshkronjëshat, zanoret dhe ndërtimin e fjalëve.
- [ ] Loja 2 mbulon drejtshkrimin, rasat, foljet, pjesët e ligjëratës dhe pikësimin.
- [ ] Loja 3 mbulon historinë e Kongresit të Manastirit dhe zhvillimet e drejtshkrimit.
- [ ] Çdo pyetje ka përgjigje dhe shpjegim të saktë.
- [ ] Faktet historike janë verifikuar në burime të besueshme.
- [ ] Progresi dhe pikët ruhen në localStorage.
- [ ] Rezultatet dhe rishikimi i gabimeve funksionojnë.
- [ ] Mobile, tablet dhe desktop janë kontrolluar me Playwright.
- [ ] Nuk ka mbetje në anglisht/gjermanisht nga DeutschQuest.
- [ ] Build-i i prodhimit kalon pa gabime.
- [ ] Metadata, favicon dhe Open Graph janë përditësuar.
- [ ] Nuk është shtuar backend ose shërbim i jashtëm.

---

## 13. Rendi i punës për coding agent-in

Puno në këtë rend, pa anashkaluar kontrollin e përmbajtjes:

### Faza 1 — Auditimi

1. Inspekto projektin ekzistues.
2. Gjej të gjitha faqet, komponentët dhe skedarët e përmbajtjes.
3. Identifiko mekanikat që mund të ripërdoren drejtpërdrejt.
4. Raporto shkurt çfarë do të ndryshosh.

### Faza 2 — Theme dhe përkthimi

1. Përditëso ngjyrat, fontet dhe komponentët bazë.
2. Përditëso logon, favicon dhe metadata.
3. Përkthe ndërfaqen në shqip të natyrshme.
4. Hiq çdo tekst të mbetur nga tema e gjermanishtes.

### Faza 3 — Përmbajtja dhe lojërat

1. Krijo skedarët e të dhënave për tri lojërat.
2. Fut 15 sfidat sipas këtij dokumenti.
3. Kontrollo alfabetin, përgjigjet, shpjegimet dhe faktet.
4. Përshtat mekanikat ekzistuese me përmbajtjen e re.

### Faza 4 — Vizualet

1. Krijo/përshtat ilustrimet për temën e alfabetit.
2. Përditëso kartat dhe ikonat e lojërave.
3. Përshtat ilustrimet në hero, roadmap dhe rezultate.
4. Sigurohu që asetet janë të lehta dhe të optimizuara.

### Faza 5 — Testimi dhe përfundimi

1. Testo të 15 sfidat.
2. Testo progresin, pikët, rezultatet dhe localStorage.
3. Testo në mobile, tablet dhe desktop.
4. Rregullo gabimet vizuale dhe teknike.
5. Ekzekuto build-in final.
6. Jep një përmbledhje të skedarëve të ndryshuar, funksioneve të përfunduara dhe çdo kufizimi që mbetet.

**Mos u mjafto me një pamje të bukur. Kërkohet një faqe që funksionon plotësisht, ku çdo lojë mund të luhet nga fillimi deri në fund.**

---

## 14. Burime për verifikim

Përdori këto burime si pikënisje. Përmbajtja e faqes duhet të përputhet me burime akademike dhe arsimore, jo me përmbledhje të pakontrolluara në internet.

1. **Fjalori i Madh i Gjuhës Shqipe — Akademia e Shkencave e Shqipërisë**  
   https://fjalori.online/  
   Përdore për kontrollin e fjalëve, kuptimeve, formave dhe drejtshkrimit.

2. **Muzeu Historik Kombëtar — Kongresi i Manastirit: Rruga drejt bashkimit kombëtar**  
   https://www.mhk.gov.al/kongresi-i-manastirit-rruga-drejt-bashkimit-kombetar/  
   Përdore për datat 14–22 nëntor 1908, delegatët dhe kontekstin historik.

3. **Muzeu Historik Kombëtar — Pavijoni i Rilindjes Kombëtare Shqiptare**  
   https://www.mhk.gov.al/portfolio/pavijoni-i-rilindjes-kombetare-shqiptare/  
   Përdore për vendimet e Kongresit dhe për kujdesin që duhet treguar kur shpjegohet miratimi i alfabeteve.

4. **Akademia e Shkencave — Kongresi i Drejtshkrimit të Gjuhës Shqipe (1972)**  
   https://akad.gov.al/wp-content/uploads/2025/12/Buletini-nentor-2025.pdf  
   Përdore për datat 20–25 nëntor 1972 dhe përmbledhjen e qëllimit të Kongresit të Drejtshkrimit.

5. **Mahir Domi, “Alfabeti i gjuhës shqipe dhe Kongresi i Manastirit”, Studime Filologjike, Akademia e Shkencave**  
   https://albanica.al/studime_filologjike/article/view/2840  
   Burim akademik shtesë për historikun e alfabetit.

6. **Tekst mësimor: Gjuhë shqipe 6, Botime Pegi**  
   https://www.botimepegi.al/digitalBooks/fetch/xk/digital-books-ks/class-6/gjuha-shqipe-6/gjuha-shqipe-6.pdf  
   Përdore për të kontrolluar paraqitjen shkollore të 36 shkronjave, 7 zanoreve dhe 9 dyshkronjëshave.

7. **Material arsimor për rasën rrjedhore**  
   https://www.e-ucebnici.mon.gov.mk/pdf/Alb_jazik_6.pdf  
   Përdore si referencë shtesë për shembujt e rasës rrjedhore dhe përdorimin e parafjalës `prej`.

8. **Material akademik mbi Kongresin e Drejtshkrimit**  
   https://www.ashak.org/repository/docs/Studime26_715855.pdf  
   Përdore si burim shtesë për çështje të alfabetit, grafemave dhe drejtshkrimit.

### Shënim i fundit

Ky dokument përcakton drejtimin, strukturën, dizajnin dhe një bazë konkrete të përmbajtjes. Megjithatë, coding agent-i duhet të verifikojë çdo element gjuhësor dhe historik para publikimit. Kur një formulim nuk mund të verifikohet, mos e plotëso me hamendësim: zëvendësoje me një formulim më të sigurt ose lëre jashtë.
