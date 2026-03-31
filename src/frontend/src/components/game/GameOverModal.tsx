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
            "linear-gradient(160deg, #1a0a2e 0%, #3B0A5C 60%, #7A2DE2 100%)",
          border: "2px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 8 }}>😢</div>
        <h2
          className="game-heading"
          style={{ color: "#fff", fontSize: 28, marginBottom: 4 }}
        >
          Game Over!
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Nunito, sans-serif",
            marginBottom: 16,
            fontSize: 14,
          }}
        >
          Out of moves! Better luck next time 🍬
        </p>
        {isNewHigh && (
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(246,211,107,0.2), rgba(240,90,168,0.2))",
              border: "1px solid rgba(246,211,107,0.4)",
              borderRadius: 12,
              padding: "8px 16px",
              marginBottom: 12,
              color: "#FFE87C",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            🎉 New High Score!
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            background: "rgba(255,255,255,0.07)",
            borderRadius: 14,
            padding: "12px",
            marginBottom: 20,
            gap: 12,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 11,
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Score
            </div>
            <div
              style={{
                color: "#F05AA8",
                fontSize: 28,
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
              }}
            >
              {score.toLocaleString()}
            </div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 11,
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Best
            </div>
            <div
              style={{
                color: "#FFE87C",
                fontSize: 28,
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
            className="gradient-gold-btn game-heading"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 50,
              border: "none",
              fontSize: 18,
              color: "#2A1738",
              cursor: "pointer",
            }}
            onClick={onRetry}
            data-ocid="gameover.confirm_button"
          >
            Try Again 🔄
          </button>
          <button
            type="button"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 50,
              border: "2px solid rgba(255,255,255,0.25)",
              background: "transparent",
              color: "rgba(255,255,255,0.75)",
              fontSize: 14,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              cursor: "pointer",
            }}
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
