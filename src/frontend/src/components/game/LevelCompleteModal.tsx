interface LevelCompleteModalProps {
  score: number;
  level: number;
  onNext: () => void;
  onHome: () => void;
}

export default function LevelCompleteModal({
  score,
  level,
  onNext,
  onHome,
}: LevelCompleteModalProps) {
  return (
    <div className="modal-overlay" data-ocid="levelcomplete.modal">
      <div
        className="modal-card"
        style={{
          background:
            "linear-gradient(160deg, #2D1B5E 0%, #4A1280 60%, #7A2DE2 100%)",
          border: "2px solid rgba(255,255,255,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <span
            className="star-animate-1"
            style={{ fontSize: 40, display: "inline-block" }}
          >
            ⭐
          </span>
          <span
            className="star-animate-2"
            style={{ fontSize: 52, display: "inline-block" }}
          >
            ⭐
          </span>
          <span
            className="star-animate-3"
            style={{ fontSize: 40, display: "inline-block" }}
          >
            ⭐
          </span>
        </div>
        <h2
          className="game-heading"
          style={{ color: "#FFE87C", fontSize: 28, marginBottom: 4 }}
        >
          Level {level} Complete!
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontFamily: "Nunito, sans-serif",
            marginBottom: 8,
          }}
        >
          Amazing match skills! 🍬
        </p>
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: 14,
            padding: "12px 24px",
            marginBottom: 20,
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 12,
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
              color: "#FFE87C",
              fontSize: 36,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
            }}
          >
            {score.toLocaleString()}
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
            onClick={onNext}
            data-ocid="levelcomplete.confirm_button"
          >
            Next Level 🚀
          </button>
          <button
            type="button"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 50,
              border: "2px solid rgba(255,255,255,0.3)",
              background: "transparent",
              color: "rgba(255,255,255,0.8)",
              fontSize: 14,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={onHome}
            data-ocid="levelcomplete.cancel_button"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
