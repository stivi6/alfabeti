import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { CONNECT_PUZZLES, type ConnectPuzzle } from '../data/connectLetterPuzzles';
import { readGameState, writeGameState } from '../lib/localGameStorage';

const KEY='shkronjat-tona-connect-v1';
interface State { puzzleId:string; found:string[]; tiles:string[] }

function getTiles(puzzle: ConnectPuzzle) { return [...puzzle.tiles].sort(() => 0.5-Math.random()); }
function initialState():State { const puzzle=CONNECT_PUZZLES[0]!; return {puzzleId:puzzle.id,found:[],tiles:getTiles(puzzle)}; }

export function LinkLettersPage() {
  const [state,setState]=useState<State>(()=>readGameState<State>(KEY,1)??initialState());
  const puzzle=CONNECT_PUZZLES.find((item)=>item.id===state.puzzleId) ?? CONNECT_PUZZLES[0]!;
  const [path,setPath]=useState<number[]>([]);
  const [message,setMessage]=useState('');
  const dragging=useRef(false);
  useEffect(()=>writeGameState(KEY,1,state),[state]);

  const clear=()=>{setPath([]);};
  const choose=(index:number)=>{
    if (path.includes(index)) return;
    setPath((current)=>[...current,index]);
  };
  const currentWord=path.map((index)=>state.tiles[index]).join('');

  const submit=()=>{
    if (!currentWord) return;
    const target=puzzle.targets.find((item)=>item.tokens.join('')===canonicalTokenWord(currentWord));
    if (!target){setMessage('Kjo nuk është një nga fjalët e synuara.'); clear(); return;}
    if (state.found.includes(target.word)){setMessage('Këtë fjalë e ke gjetur.'); clear(); return;}
    setState((current)=>({...current,found:[...current.found,target.word]}));
    setMessage('Saktë — u gjet një fjalë e re!');
    clear();
  };

  function canonicalTokenWord(value:string){ return value.normalize('NFC').toLocaleUpperCase('sq-AL'); }

  const onPointerMove=(event:React.PointerEvent<HTMLDivElement>)=>{
    if(!dragging.current)return;
    const element=document.elementFromPoint(event.clientX,event.clientY);
    const tile=element?.closest('[data-tile-index]') as HTMLElement|null;
    if(!tile)return;
    const index=Number(tile.dataset.tileIndex);
    if(Number.isInteger(index))choose(index);
  };
  const shuffle=()=>{
    const index=CONNECT_PUZZLES.findIndex((item)=>item.id===puzzle.id);
    const next=CONNECT_PUZZLES[(index+1)%CONNECT_PUZZLES.length]!;
    setState({puzzleId:next.id,found:[],tiles:getTiles(next)});
    clear(); setMessage('');
  };

  return (
    <PageLayout>
      <section className="pb-16 pt-8">
        <div className="page-container max-w-[820px]">
          <Link to="/lojerat" className="inline-flex items-center gap-2 text-sm font-bold text-primary-dark"><ArrowLeft size={16}/>Kthehu te lojërat</Link>
          <div className="mt-5 flex items-end justify-between gap-4"><div><p className="eyebrow">Lidh shkronjat</p><h1 className="mt-2 text-[clamp(2.2rem,5vw,3.4rem)]">{puzzle.title}</h1></div><button type="button" onClick={shuffle} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 font-bold"><RotateCcw size={16}/>Përziej / Lojë e re</button></div>
          <p className="mt-3 text-ink-muted">{puzzle.clue}</p>
          <div className="mt-6 rounded-2xl border border-border bg-surface p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Fjala e formuar</p>
            <p data-testid="connect-word" className="mt-2 min-h-10 font-display text-3xl font-extrabold text-primary">{currentWord||'—'}</p>
          </div>
          <div onPointerDown={(event)=>{dragging.current=true;(event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);}} onPointerUp={()=>{dragging.current=false;submit();}} onPointerMove={onPointerMove} className="relative mt-6 grid grid-cols-4 gap-3 rounded-[28px] border border-border bg-primary-soft/35 p-5 touch-none sm:grid-cols-6">
            {state.tiles.map((tile,index)=><button key={`${tile}-${index}`} type="button" data-tile-index={index} onPointerEnter={()=>{if(dragging.current)choose(index);}} onClick={()=>choose(index)} className={`grid aspect-square place-items-center rounded-2xl border-2 text-lg font-extrabold shadow-sm ${path.includes(index)?'border-primary bg-primary text-white':'border-border bg-surface text-ink'}`}>{tile}</button>)}
          </div>
          <div className="mt-4 flex gap-2"><button type="button" onClick={clear} className="min-h-11 flex-1 rounded-xl border border-border bg-surface font-bold">Pastro</button><button type="button" onClick={submit} className="min-h-11 flex-[2] rounded-xl bg-primary px-5 font-bold text-white">Kontrollo</button></div>
          {message&&<p role="status" className="mt-3 text-center font-bold text-primary-dark">{message}</p>}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {puzzle.targets.map((target)=><div key={target.word} className={`rounded-2xl border p-4 ${state.found.includes(target.word)?'border-success bg-success-soft':'border-border bg-surface'}`}><p className="font-bold">{state.found.includes(target.word)?target.word:'_' .repeat(target.tokens.length*2)}</p><p className="mt-1 text-sm text-ink-muted">{target.clue}</p></div>)}
          </div>
          {state.found.length===puzzle.targets.length&&<p className="mt-6 rounded-2xl bg-success-soft p-4 text-center font-bold text-success">E përfundove lojën!</p>}
        </div>
      </section>
    </PageLayout>
  );
}
