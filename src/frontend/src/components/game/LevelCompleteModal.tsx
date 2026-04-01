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
            "linear-gradient(160deg, #fff5ff 0%, #fce4ff 50%, #e8d5ff 100%)",
          border: "2px solid rgba(255,255,255,0.8)",
        }}
      >
        {/* Stars */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <span
            className="star-animate-1"
            style={{ fontSize: 38, display: "inline-block" }}
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
            style={{ fontSize: 38, display: "inline-block" }}
          >
            ⭐
          </span>
        </div>

        <h2
          className="game-heading"
          style={{ color: "#D93B8E", fontSize: 28, marginBottom: 4 }}
        >
          Level {level} Complete!
        </h2>
        <p
          style={{
            color: "#8B3A8A",
            fontFamily: "Nunito, sans-serif",
            marginBottom: 14,
            fontSize: 14,
          }}
        >
          Amazing match skills! 🍬
        </p>

        {/* Score card */}
        <div
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1.5px solid rgba(255,79,163,0.3)",
            borderRadius: 18,
            padding: "14px 24px",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              color: "#9B3A8A",
              fontSize: 11,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 4,
            }}
          >
            Score
          </div>
          <div
            style={{
              color: "#D93B8E",
              fontSize: 38,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {score.toLocaleString()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            type="button"
            className="btn-cta"
            style={{ width: "100%", padding: "15px", fontSize: 18 }}
            onClick={onNext}
            data-ocid="levelcomplete.confirm_button"
          >
            Next Level 🚀
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ width: "100%", padding: "12px", fontSize: 14 }}
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
