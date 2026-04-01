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
    handleSwipe,
  } = useGameEngine(level, initialScore, onLevelComplete, onGameOver);

  return (
    <div
      className="game-bg"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        maxWidth: 420,
        margin: "0 auto",
        paddingBottom: "env(safe-area-inset-bottom)",
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
          padding: "14px 0",
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
          onSwipe={handleSwipe}
        />

        <p
          style={{
            color: "rgba(100,40,120,0.7)",
            fontSize: 13,
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          {isAnimating
            ? "✨ Matching..."
            : selected !== null
              ? "👉 Swipe or tap adjacent candy!"
              : "👆 Tap or swipe a candy"}
        </p>
      </div>

      <div style={{ padding: "0 1.5rem 1.5rem", textAlign: "center" }}>
        <button
          type="button"
          className="btn-ghost"
          style={{ padding: "10px 28px", fontSize: 14 }}
          onClick={onHome}
          data-ocid="game.cancel_button"
        >
          🏠 Menu
        </button>
      </div>
    </div>
  );
}
