interface GameHUDProps {
  score: number;
  targetScore: number;
  level: number;
  moves: number;
  lives: number;
}

const HEART_KEYS = ["h0", "h1", "h2", "h3", "h4"];

export default function GameHUD({
  score,
  targetScore,
  level,
  moves,
  lives,
}: GameHUDProps) {
  const progress = Math.min(100, Math.round((score / targetScore) * 100));
  const movesLow = moves <= 5;

  return (
    <div
      className="game-hud"
      style={{ padding: "10px 16px 14px", borderRadius: "0 0 22px 22px" }}
      data-ocid="game.panel"
    >
      {/* Logo row */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <span
          className="candy-title"
          style={{ fontSize: "clamp(18px,5vw,26px)", display: "inline-block" }}
        >
          Candy Crush
        </span>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          gap: 4,
        }}
      >
        {/* Level */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff4fa3, #d93b8e)",
            borderRadius: 12,
            padding: "5px 12px",
            textAlign: "center",
            minWidth: 52,
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 9,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Level
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 20,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {level}
          </div>
        </div>

        {/* Score */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              color: "#9B3A8A",
              fontSize: 9,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Score
          </div>
          <div
            style={{
              color: "#D93B8E",
              fontSize: "clamp(18px,5vw,26px)",
              fontFamily: "Nunito,sans-serif",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {score.toLocaleString()}
          </div>
        </div>

        {/* Moves */}
        <div
          style={{
            background: movesLow
              ? "linear-gradient(135deg,#FF5722,#E53935)"
              : "linear-gradient(135deg,#2E86FF,#A35CFF)",
            borderRadius: 12,
            padding: "5px 12px",
            textAlign: "center",
            minWidth: 52,
            transition: "background 0.4s",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 9,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Moves
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 20,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {moves}
          </div>
        </div>

        {/* Lives */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#9B3A8A",
              fontSize: 9,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 2,
            }}
          >
            Lives
          </div>
          <div style={{ fontSize: 14, lineHeight: 1, letterSpacing: 1 }}>
            {HEART_KEYS.map((k, i) => (
              <span key={k} style={{ opacity: i < lives ? 1 : 0.22 }}>
                ❤️
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <span
            style={{
              color: "#9B3A8A",
              fontSize: 10,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
            }}
          >
            Progress
          </span>
          <span
            style={{
              color: "#D93B8E",
              fontSize: 10,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
            }}
          >
            {score.toLocaleString()} / {targetScore.toLocaleString()}
          </span>
        </div>
        <div className="score-progress" style={{ height: 9 }}>
          <div
            className="score-progress-fill"
            style={{ height: "100%", width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
