interface GameHUDProps {
  score: number;
  targetScore: number;
  level: number;
  moves: number;
  lives: number;
}

const S = {
  label: {
    color: "rgba(255,255,255,0.7)" as const,
    fontSize: 10,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
    fontFamily: "Nunito, sans-serif",
    fontWeight: 700,
  },
};

const HEART_KEYS = ["h0", "h1", "h2", "h3", "h4"];

export default function GameHUD({
  score,
  targetScore,
  level,
  moves,
  lives,
}: GameHUDProps) {
  const progress = Math.min(100, Math.round((score / targetScore) * 100));

  return (
    <div
      className="gradient-game-header"
      style={{ padding: "12px 16px 16px", borderRadius: "0 0 20px 20px" }}
      data-ocid="game.panel"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={S.label}>Level</div>
          <div
            style={{
              color: "#fff",
              fontSize: 22,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {level}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={S.label}>Score</div>
          <div
            style={{
              color: "#FFE87C",
              fontSize: 24,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {score.toLocaleString()}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={S.label}>Moves</div>
          <div
            style={{
              color: moves <= 5 ? "#F4C542" : "#fff",
              fontSize: 22,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
              lineHeight: 1,
              transition: "color 0.3s",
            }}
          >
            {moves}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={S.label}>Lives</div>
          <div style={{ fontSize: 14, lineHeight: 1.4 }}>
            {HEART_KEYS.map((k, i) => (
              <span key={k} style={{ opacity: i < lives ? 1 : 0.25 }}>
                ❤️
              </span>
            ))}
          </div>
        </div>
      </div>
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
              color: "rgba(255,255,255,0.8)",
              fontSize: 10,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
            }}
          >
            Progress
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 10,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
            }}
          >
            {score.toLocaleString()} / {targetScore.toLocaleString()}
          </span>
        </div>
        <div className="score-progress" style={{ height: 8 }}>
          <div
            className="score-progress-fill"
            style={{ height: "100%", width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
