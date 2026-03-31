import { useGameEngine } from "../../hooks/useGameEngine";
import GameBoard from "./GameBoard";
import GameHUD from "./GameHUD";

interface GameScreenProps {
  initialScore: number;
  level: number;
  lives: number;
  onLevelComplete: (score: number) => void;
  onGameOver: (score: number) => void;
  onHome: () => void;
}

export default function GameScreen({
  initialScore,
  level,
  lives,
  onLevelComplete,
  onGameOver,
  onHome,
}: GameScreenProps) {
  const {
    board,
    selected,
    exploding,
    newCandies,
    invalidCells,
    score,
    moves,
    targetScore,
    isAnimating,
    handleTap,
  } = useGameEngine(level, initialScore, onLevelComplete, onGameOver);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, #1a0a2e 0%, #2D1B5E 40%, #4A0E7A 100%)",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      <GameHUD
        score={score}
        targetScore={targetScore}
        level={level}
        moves={moves}
        lives={lives}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 0",
          gap: 12,
        }}
      >
        <GameBoard
          board={board}
          selected={selected}
          exploding={exploding}
          newCandies={newCandies}
          invalidCells={invalidCells}
          onTap={handleTap}
        />
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 12,
            fontFamily: "Nunito, sans-serif",
            fontWeight: 600,
            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          {isAnimating
            ? "✨ Matching..."
            : selected !== null
              ? "Tap an adjacent candy to swap!"
              : "Tap a candy to select"}
        </p>
      </div>
      <div style={{ padding: "0 1rem 1.5rem", textAlign: "center" }}>
        <button
          type="button"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 50,
            padding: "8px 24px",
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={onHome}
          data-ocid="game.cancel_button"
        >
          🏠 Menu
        </button>
      </div>
    </div>
  );
}
