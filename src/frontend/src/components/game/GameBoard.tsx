import { useRef } from "react";
import { BOARD_SIZE } from "../../game/engine";
import CandyTile from "./CandyTile";

interface GameBoardProps {
  board: number[];
  selected: number | null;
  exploding: Set<number>;
  newCandies: Set<number>;
  invalidCells: Set<number>;
  onTap: (index: number) => void;
  onSwipe: (fromIndex: number, toIndex: number) => void;
}

// Stable keys for grid positions
const CELL_KEYS = Array.from({ length: 64 }, (_, i) => `cell-${i}`);

export default function GameBoard({
  board,
  selected,
  exploding,
  newCandies,
  invalidCells,
  onTap,
  onSwipe,
}: GameBoardProps) {
  const touchStartRef = useRef<{ x: number; y: number; index: number } | null>(
    null,
  );
  const boardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, index };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!touchStartRef.current || !boardRef.current) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const SWIPE_THRESHOLD = 18;

    if (absDx < SWIPE_THRESHOLD && absDy < SWIPE_THRESHOLD) {
      // Tap
      onTap(touchStartRef.current.index);
    } else {
      // Swipe direction
      const fromIndex = touchStartRef.current.index;
      const row = Math.floor(fromIndex / BOARD_SIZE);
      const col = fromIndex % BOARD_SIZE;
      let toIndex = -1;

      if (absDx > absDy) {
        // Horizontal swipe
        if (dx > 0 && col < BOARD_SIZE - 1) toIndex = fromIndex + 1;
        else if (dx < 0 && col > 0) toIndex = fromIndex - 1;
      } else {
        // Vertical swipe
        if (dy > 0 && row < BOARD_SIZE - 1) toIndex = fromIndex + BOARD_SIZE;
        else if (dy < 0 && row > 0) toIndex = fromIndex - BOARD_SIZE;
      }

      if (toIndex >= 0) onSwipe(fromIndex, toIndex);
    }

    touchStartRef.current = null;
  };

  return (
    <div
      ref={boardRef}
      className="game-board-bg"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: "3px",
        padding: "8px",
        borderRadius: "20px",
        width: "min(calc(100vw - 1.5rem), 380px)",
        margin: "0 auto",
        touchAction: "none",
      }}
      data-ocid="board.panel"
    >
      {board.map((type, i) => (
        <div
          key={CELL_KEYS[i]}
          onTouchStart={(e) => handleTouchStart(e, i)}
          onTouchEnd={handleTouchEnd}
          style={{ display: "contents" }}
        >
          <CandyTile
            index={i}
            type={type}
            isSelected={selected === i}
            isExploding={exploding.has(i)}
            isNew={newCandies.has(i)}
            isInvalid={invalidCells.has(i)}
            onTap={onTap}
          />
        </div>
      ))}
    </div>
  );
}
