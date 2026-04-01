interface GameOverModalProps {
  score: number;
  highScore: number;
  onRetry: () => void;
  onHome: () => void;
}

export default function GameOverModal({
  score,
  highScore,
  onRetry,
  onHome,
}: GameOverModalProps) {
  const isNewHigh = score >= highScore && score > 0;
  return (
    <div className="modal-overlay" data-ocid="gameover.modal">
      <div
        className="modal-card"
        style={{
          background:
            "linear-gradient(160deg, #fff2f8 0%, #fde0f0 50%, #f0d8ff 100%)",
          border: "2px solid rgba(255,255,255,0.8)",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 10 }}>😢</div>

        <h2
          className="game-heading"
          style={{ color: "#D93B8E", fontSize: 28, marginBottom: 4 }}
        >
          Game Over!
        </h2>
        <p
          style={{
            color: "#8B3A8A",
            fontFamily: "Nunito, sans-serif",
            marginBottom: 14,
            fontSize: 14,
          }}
        >
          Out of moves! Better luck next time 🍬
        </p>

        {isNewHigh && (
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(255,212,50,0.25), rgba(255,79,163,0.2))",
              border: "1.5px solid rgba(255,180,0,0.5)",
              borderRadius: 14,
              padding: "8px 16px",
              marginBottom: 12,
              color: "#B8860B",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            🎉 New High Score!
          </div>
        )}

        {/* Scores */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            background: "rgba(255,255,255,0.6)",
            border: "1.5px solid rgba(255,79,163,0.2)",
            borderRadius: 18,
            padding: 14,
            marginBottom: 20,
            gap: 12,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#9B3A8A",
                fontSize: 10,
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              Score
            </div>
            <div
              style={{
                color: "#D93B8E",
                fontSize: 30,
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
              }}
            >
              {score.toLocaleString()}
            </div>
          </div>
          <div style={{ width: 1, background: "rgba(163,92,255,0.2)" }} />
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#9B3A8A",
                fontSize: 10,
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              Best
            </div>
            <div
              style={{
                color: "#A35CFF",
                fontSize: 30,
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
              }}
            >
              {highScore.toLocaleString()}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            type="button"
            className="btn-cta"
            style={{ width: "100%", padding: "15px", fontSize: 18 }}
            onClick={onRetry}
            data-ocid="gameover.confirm_button"
          >
            Try Again 🔄
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ width: "100%", padding: "12px", fontSize: 14 }}
            onClick={onHome}
            data-ocid="gameover.cancel_button"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
