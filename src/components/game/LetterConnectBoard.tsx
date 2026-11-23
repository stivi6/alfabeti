import { useCallback, useLayoutEffect, useRef, useState } from 'react';

type BoardLayout = 'circle' | 'grid';

interface LetterConnectBoardProps {
  tiles: readonly string[];
  selectedIndices: readonly number[];
  onSelectedIndicesChange: (indices: number[]) => void;
  layout: BoardLayout;
  gridColumns?: number;
  ariaLabel: string;
  testIdPrefix: string;
  disabled?: boolean;
  onInvalidSelection?: () => void;
}

interface Point {
  x: number;
  y: number;
}

const CIRCLE_POSITIONS: Point[] = [
  { x: 50, y: 12 },
  { x: 86, y: 38 },
  { x: 72, y: 82 },
  { x: 28, y: 82 },
  { x: 14, y: 38 },
];

export function LetterConnectBoard({
  tiles,
  selectedIndices,
  onSelectedIndicesChange,
  layout,
  gridColumns,
  ariaLabel,
  testIdPrefix,
  disabled = false,
  onInvalidSelection,
}: LetterConnectBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const selectedRef = useRef<readonly number[]>(selectedIndices);
  const [isDragging, setIsDragging] = useState(false);
  const [pointerPoint, setPointerPoint] = useState<Point | null>(null);
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [tileCenters, setTileCenters] = useState<Point[]>([]);

  const measure = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    setSize({ width: Math.max(rect.width, 1), height: Math.max(rect.height, 1) });
    setTileCenters(
      Array.from(board.querySelectorAll<HTMLElement>('[data-letter-index]')).map((tile) => {
        const tileRect = tile.getBoundingClientRect();
        return {
          x: tileRect.left - rect.left + tileRect.width / 2,
          y: tileRect.top - rect.top + tileRect.height / 2,
        };
      }),
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const board = boardRef.current;
    if (!board) return;
    const observer = new ResizeObserver(measure);
    observer.observe(board);
    return () => observer.disconnect();
  }, [measure, tiles.length]);

  useLayoutEffect(() => {
    selectedRef.current = selectedIndices;
  }, [selectedIndices]);

  const selectIndex = useCallback((index: number) => {
    if (disabled) return;
    if (!Number.isInteger(index) || index < 0 || index >= tiles.length) return;
    const selected = selectedRef.current;
    if (selected.includes(index)) return;
    if (layout === 'grid' && gridColumns && !continuesGridLine(selected, index, gridColumns)) {
      onInvalidSelection?.();
      return;
    }
    const next = [...selected, index];
    selectedRef.current = next;
    onSelectedIndicesChange(next);
  }, [disabled, gridColumns, layout, onInvalidSelection, onSelectedIndicesChange, tiles.length]);

  const tileAtPoint = useCallback((clientX: number, clientY: number) => {
    const board = boardRef.current;
    const tile = document.elementFromPoint(clientX, clientY)
      ?.closest<HTMLElement>('[data-letter-index]');
    if (!board || !tile || !board.contains(tile)) return null;
    const index = Number(tile.dataset.letterIndex);
    return Number.isInteger(index) ? index : null;
  }, []);

  const tileIndexFromTarget = (target: EventTarget | null): number | null => {
    if (!(target instanceof Element)) return null;
    const tile = target.closest<HTMLElement>('[data-letter-index]');
    if (!tile || !boardRef.current?.contains(tile)) return null;
    const index = Number(tile.dataset.letterIndex);
    return Number.isInteger(index) ? index : null;
  };

  const localPoint = useCallback((clientX: number, clientY: number): Point => {
    const rect = boardRef.current?.getBoundingClientRect();
    return {
      x: clientX - (rect?.left ?? 0),
      y: clientY - (rect?.top ?? 0),
    };
  }, []);

  const pointForTile = (index: number): Point | null => tileCenters[index] ?? null;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    const index = tileIndexFromTarget(event.target) ?? tileAtPoint(event.clientX, event.clientY);
    if (index === null) return;
    event.preventDefault();
    pointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    selectIndex(index);
    setIsDragging(true);
    setPointerPoint(pointForTile(index));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;
    const index = tileAtPoint(event.clientX, event.clientY);
    if (index !== null) {
      selectIndex(index);
      setPointerPoint(pointForTile(index));
    } else {
      setPointerPoint(localPoint(event.clientX, event.clientY));
    }
  };

  const finishPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;
    const index = tileAtPoint(event.clientX, event.clientY);
    if (index !== null) {
      selectIndex(index);
      setPointerPoint(pointForTile(index));
    }
    pointerIdRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const centers = selectedIndices
    .map((index) => tileCenters[index])
    .filter((point): point is Point => point !== null);
  const linePoints = isDragging && pointerPoint
    ? [...centers, pointerPoint]
    : centers;
  const polylinePoints = linePoints.map(({ x, y }) => `${x},${y}`).join(' ');

  return (
    <div
      ref={boardRef}
      role="group"
      aria-label={ariaLabel}
      className={`relative mx-auto touch-none select-none overflow-hidden rounded-[28px] border border-border bg-primary-soft/35 ${layout === 'circle' ? 'aspect-square w-full max-w-[430px]' : 'aspect-square w-full max-w-[620px] p-2 sm:p-4'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointer}
      onPointerCancel={finishPointer}
    >
      {layout === 'grid' && (
        <div
          className="grid gap-2 sm:gap-3"
          style={{ gridTemplateColumns: `repeat(${gridColumns ?? 1}, minmax(0, 1fr))` }}
        >
          {tiles.map((tile, index) => (
            <LetterTile
              key={`${tile}-${index}`}
              tile={tile}
              index={index}
              selected={selectedIndices.includes(index)}
              testId={`${testIdPrefix}-${index}`}
              onSelect={selectIndex}
              disabled={disabled}
            />
          ))}
        </div>
      )}
      {layout === 'circle' && tiles.map((tile, index) => {
        const position = CIRCLE_POSITIONS[index] ?? { x: 50, y: 50 };
        return (
          <LetterTile
            key={`${tile}-${index}`}
            tile={tile}
            index={index}
            selected={selectedIndices.includes(index)}
            testId={`${testIdPrefix}-${index}`}
            onSelect={selectIndex}
            disabled={disabled}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
        viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="none"
        data-testid={`${testIdPrefix}-svg`}
      >
        {linePoints.length > 1 && (
          <polyline
            data-testid={`${testIdPrefix}-path`}
            points={polylinePoints}
            fill="none"
            stroke="#C8102E"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}

interface LetterTileProps {
  tile: string;
  index: number;
  selected: boolean;
  testId: string;
  onSelect: (index: number) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

function LetterTile({ tile, index, selected, testId, onSelect, disabled = false, style }: LetterTileProps) {
  return (
    <button
      type="button"
      data-letter-index={index}
      data-testid={testId}
      aria-label={`Shkronja ${tile}, pllaka ${index + 1}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => onSelect(index)}
      style={style}
      className={`grid place-items-center rounded-2xl border-2 text-sm font-extrabold shadow-sm transition sm:text-lg ${style ? 'absolute size-14 sm:size-[68px]' : 'aspect-square w-full min-w-0'} ${selected ? 'z-10 border-primary bg-primary text-white shadow-lifted' : 'border-border bg-surface text-ink hover:border-primary/60'}`}
    >
      {tile}
    </button>
  );
}

function continuesGridLine(selected: readonly number[], next: number, columns: number): boolean {
  if (selected.length === 0) return true;

  const previous = selected[selected.length - 1]!;
  const rowDelta = Math.floor(next / columns) - Math.floor(previous / columns);
  const columnDelta = (next % columns) - (previous % columns);

  if (selected.length === 1) {
    return Math.abs(rowDelta) + Math.abs(columnDelta) === 1;
  }

  const first = selected[0]!;
  const second = selected[1]!;
  const rowStep = Math.floor(second / columns) - Math.floor(first / columns);
  const columnStep = (second % columns) - (first % columns);
  return rowDelta === rowStep && columnDelta === columnStep;
}
