import { useEffect, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { WORD_SEARCH_PUZZLES, type WordSearchPuzzle } from '../data/wordSearchPuzzles';
import { ALBANIAN_ALPHABET, canonicalAlbanian } from '../lib/albanianLetters';
import { readGameState, writeGameState } from '../lib/localGameStorage';

const KEY='shkronjat-tona-wordsearch-v1';
interface Position {row:number;col:number}
interface State {puzzleId:string;found:string[];board:string[][]}

function mulberry(seed:number){let value=seed;return()=>{value=(value*9301+49297)%233280;return value/233280}}
function generate(puzzle:WordSearchPuzzle):string[][]{
  const size=10; const board=Array.from({length:size},()=>Array<string>(size).fill(''));
  const random=mulberry(puzzle.seed);
  for(const target of puzzle.words){
    const placed=placeWord(board,target.tokens,random);if(!placed) throw new Error(`Nuk u vendos ${target.word}`);
  }
  for(let row=0;row<size;row++)for(let col=0;col<size;col++){
    if(!board[row]![col])board[row]![col]=ALBANIAN_ALPHABET[Math.floor(random()*ALBANIAN_ALPHABET.length)]!;
  }
  return board;
}
function placeWord(board:string[][],tokens:string[],random:()=>number):boolean{
  for(let attempt=0;attempt<150;attempt++){
    const horizontal=random()<0.5; const reversed=random()<0.5;
    const maxRow=horizontal?10:10-tokens.length+1;
    const maxCol=horizontal?10-tokens.length+1:10;
    const row=Math.floor(random()*maxRow); const col=Math.floor(random()*maxCol);
    let valid=true;
    for(let i=0;i<tokens.length;i++){
      const r=row+(horizontal?0:(reversed?tokens.length-1-i:i));
      const c=col+(horizontal?(reversed?tokens.length-1-i:i):0);
      if(board[r]?.[c] && board[r]![c] !== tokens[i]){valid=false;break;}
    }
    if(!valid)continue;
    for(let i=0;i<tokens.length;i++){
      const r=row+(horizontal?0:(reversed?tokens.length-1-i:i));
      const c=col+(horizontal?(reversed?tokens.length-1-i:i):0);
      board[r]![c]=tokens[i]!;
    }
    return true;
  }
  return false;
}

function initialState():State{const puzzle=WORD_SEARCH_PUZZLES[0]!;return{puzzleId:puzzle.id,found:[],board:generate(puzzle)}}

export function FindWordsPage(){
  const [state,setState]=useState<State>(()=>readGameState<State>(KEY,1)??initialState());
  const puzzle=WORD_SEARCH_PUZZLES.find((item)=>item.id===state.puzzleId) ?? WORD_SEARCH_PUZZLES[0]!;
  const [start,setStart]=useState<Position|null>(null);
  const [end,setEnd]=useState<Position|null>(null);
  const [dragging,setDragging]=useState(false);
  const [paths,setPaths]=useState<Array<{word:string;cells:Position[]}>>([]);
  const [message,setMessage]=useState('');
  useEffect(()=>writeGameState(KEY,1,state),[state]);

  const line=(a:Position,b:Position):Position[]|null=>{
    if(a.row!==b.row&&a.col!==b.col)return null;
    const cells:Position[]=[];
    if(a.row===b.row){const step=a.col<=b.col?1:-1;for(let c=a.col;c!==b.col+step;c+=step)cells.push({row:a.row,col:c});}
    else{const step=a.row<=b.row?1:-1;for(let r=a.row;r!==b.row+step;r+=step)cells.push({row:r,col:a.col});}
    return cells;
  };
  const selection=line(start??{row:-1,col:-1},end??{row:-2,col:-2})??[];
  const isSelected=(position:Position)=>selection.some((cell)=>cell.row===position.row&&cell.col===position.col);
  const isFound=(position:Position)=>paths.some((path)=>path.cells.some((cell)=>cell.row===position.row&&cell.col===position.col));

  const chooseEnd=(position:Position)=>{
    if(!start)return;
    setEnd(position);
  };
  const submit=(a:Position,b:Position)=>{
    const cells=line(a,b);
    if(!cells){setMessage('Zgjidh një vijë horizontale ose vertikale.');setStart(null);setEnd(null);return;}
    const forward=cells.map((cell)=>state.board[cell.row]?.[cell.col] ?? '').join('');
    const reverse=[...cells].reverse().map((cell)=>state.board[cell.row]?.[cell.col] ?? '').join('');
    const target=puzzle.words.find((item)=>canonicalAlbanian(item.tokens.join(''))===canonicalAlbanian(forward)||canonicalAlbanian(item.tokens.join(''))===canonicalAlbanian(reverse));
    if(!target){setMessage('Kjo linjë nuk formon një fjalë të synuar.');}
    else if(state.found.includes(target.word)){setMessage('Këtë fjalë e ke gjetur.');}
    else {setState((current)=>({...current,found:[...current.found,target.word]}));setPaths((current)=>[...current,{word:target.word,cells}]);setMessage('Saktë!');}
    setStart(null);setEnd(null);
  };
  const cellPointer=(position:Position)=>{
    if(dragging&&start)chooseEnd(position);
  };
  const shuffle=()=>{
    const index=WORD_SEARCH_PUZZLES.findIndex((item)=>item.id===puzzle.id);
    const next=WORD_SEARCH_PUZZLES[(index+1)%WORD_SEARCH_PUZZLES.length]!;
    setState({puzzleId:next.id,found:[],board:generate(next)});setPaths([]);setStart(null);setEnd(null);setMessage('');
  };

  return (
    <PageLayout>
      <section className="pb-16 pt-8">
        <div className="page-container max-w-[1050px]">
          <Link to="/lojerat" className="inline-flex items-center gap-2 text-sm font-bold text-primary-dark"><ArrowLeft size={16}/>Kthehu te lojërat</Link>
          <div className="mt-5 flex items-end justify-between gap-4"><div><p className="eyebrow">{puzzle.theme}</p><h1 className="mt-2 text-[clamp(2.2rem,5vw,3.4rem)]">Gjej Fjalët</h1></div><button type="button" onClick={shuffle} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 font-bold"><RotateCcw size={16}/>Përziej tabelën</button></div>
          <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_280px]">
            <div
              className="grid aspect-square max-h-[650px] w-full grid-cols-10 gap-1 rounded-[24px] border border-border bg-surface p-2 sm:gap-1.5 sm:p-4 touch-none"
              onPointerUp={()=>{if(dragging&&start&&end)submit(start,end);setDragging(false);}}
            >
              {state.board.map((row,r)=>row.map((token,c)=>{
                const position={row:r,col:c};
                return <button
                  key={`${r}-${c}`} type="button" aria-label={`Rreshti ${r+1}, shtylla ${c+1}: ${token}`}
                  onPointerDown={(event)=>{event.currentTarget.setPointerCapture(event.pointerId);setStart(position);setEnd(position);setDragging(true)}}
                  onPointerEnter={()=>cellPointer(position)} onClick={()=>{if(!dragging){if(!start){setStart(position);setEnd(position)}else{submit(start,position)}}}}
                  className={`grid min-h-0 place-items-center rounded-md border text-[11px] font-extrabold sm:text-base ${isFound(position)?'border-success bg-success text-white':isSelected(position)?'border-primary bg-primary-soft text-primary-dark':'border-border bg-bg text-ink'}`}
                >{token}</button>
              }))}
            </div>
            <aside className="rounded-[24px] border border-border bg-surface p-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Fjalët për të gjetur</p>
              <div className="mt-3 space-y-2">{puzzle.words.map((target)=><div key={target.word} className={`rounded-xl border p-3 ${state.found.includes(target.word)?'border-success bg-success-soft':'border-border'}`}><p className={`font-bold ${state.found.includes(target.word)?'line-through text-success':''}`}>{target.word}</p><p className="mt-1 text-xs text-ink-muted">{target.clue}</p></div>)}</div>
            </aside>
          </div>
          {message&&<p role="status" className="mt-4 text-center font-bold text-primary-dark">{message}</p>}
          {state.found.length===puzzle.words.length&&<p className="mt-5 rounded-2xl bg-success-soft p-4 text-center font-bold text-success">U gjetën të gjitha fjalët!</p>}
        </div>
      </section>
    </PageLayout>
  );
}
