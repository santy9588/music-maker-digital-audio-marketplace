import CandyTile from "./CandyTile";

interface GameBoardProps {
  board: number[];
  selected: number | null;
  exploding: Set<number>;
  newCandies: Set<number>;
  invalidCells: Set<number>;
  onTap: (index: number) => void;
}

// Stable keys for 64 grid positions
const CELL_KEYS = Array.from({ length: 64 }, (_, i) => `cell-${i}`);

export default function GameBoard({
  board,
  selected,
  exploding,
  newCandies,
  invalidCells,
  onTap,
}: GameBoardProps) {
  return (
    <div
      className="game-board-bg"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: "3px",
        padding: "8px",
        borderRadius: "16px",
        width: "min(calc(100vw - 2rem), 400px)",
        margin: "0 auto",
      }}
      data-ocid="board.panel"
    >
      {board.map((type, i) => (
        <CandyTile
          key={CELL_KEYS[i]}
          index={i}
          type={type}
          isSelected={selected === i}
          isExploding={exploding.has(i)}
          isNew={newCandies.has(i)}
          isInvalid={invalidCells.has(i)}
          onTap={onTap}
        />
      ))}
    </div>
  );
}
