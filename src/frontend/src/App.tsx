import { useState } from "react";
import GameOverModal from "./components/game/GameOverModal";
import GameScreen from "./components/game/GameScreen";
import HomeScreen from "./components/game/HomeScreen";
import LevelCompleteModal from "./components/game/LevelCompleteModal";

type Screen = "home" | "playing" | "levelComplete" | "gameOver";

interface GameState {
  score: number;
  level: number;
  lives: number;
  highScore: number;
}

function loadHighScore(): number {
  try {
    return (
      Number.parseInt(localStorage.getItem("candyCrushHighScore") || "0", 10) ||
      0
    );
  } catch {
    return 0;
  }
}

function saveHighScore(score: number): void {
  try {
    localStorage.setItem("candyCrushHighScore", String(score));
  } catch {
    /* ignore */
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    lives: 5,
    highScore: loadHighScore(),
  });

  const startGame = () => {
    setGameState((prev) => ({ ...prev, score: 0, level: 1, lives: 5 }));
    setScreen("playing");
  };

  const handleLevelComplete = (score: number) => {
    setGameState((prev) => {
      const newHigh = Math.max(prev.highScore, score);
      saveHighScore(newHigh);
      return { ...prev, score, highScore: newHigh };
    });
    setScreen("levelComplete");
  };

  const handleGameOver = (score: number) => {
    setGameState((prev) => {
      const newHigh = Math.max(prev.highScore, score);
      saveHighScore(newHigh);
      return {
        ...prev,
        score,
        highScore: newHigh,
        lives: Math.max(0, prev.lives - 1),
      };
    });
    setScreen("gameOver");
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#1a0a2e" }}>
      {screen === "home" && (
        <HomeScreen onPlay={startGame} highScore={gameState.highScore} />
      )}
      {screen === "playing" && (
        <GameScreen
          initialScore={gameState.score}
          level={gameState.level}
          lives={gameState.lives}
          onLevelComplete={handleLevelComplete}
          onGameOver={handleGameOver}
          onHome={() => setScreen("home")}
        />
      )}
      {screen === "levelComplete" && (
        <LevelCompleteModal
          score={gameState.score}
          level={gameState.level}
          onNext={() => {
            setGameState((p) => ({ ...p, level: p.level + 1 }));
            setScreen("playing");
          }}
          onHome={() => setScreen("home")}
        />
      )}
      {screen === "gameOver" && (
        <GameOverModal
          score={gameState.score}
          highScore={gameState.highScore}
          onRetry={() => {
            setGameState((p) => ({ ...p, score: 0 }));
            setScreen("playing");
          }}
          onHome={() => setScreen("home")}
        />
      )}
    </div>
  );
}
