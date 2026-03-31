import {
  CANDY_COLORS,
  CANDY_DARK_COLORS,
  CANDY_EMOJIS,
} from "../../game/engine";

interface HomeScreenProps {
  onPlay: () => void;
  highScore: number;
}

function MiniCandy({ type, size = 36 }: { type: number; size?: number }) {
  return (
    <div
      className="candy-tile"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 35%, ${CANDY_COLORS[type]}, ${CANDY_DARK_COLORS[type]})`,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.45,
        paddingTop: "12%",
        borderRadius: 10,
      }}
    >
      {CANDY_EMOJIS[type]}
    </div>
  );
}

const PREVIEW_BOARD = [0, 2, 4, 1, 3, 5, 5, 1, 3, 0, 4, 2, 2, 4, 0, 5, 1, 3];
const HEART_KEYS = ["h0", "h1", "h2", "h3", "h4"];
const HOW_TO = [
  { icon: "👆", text: "Tap a candy to select it" },
  { icon: "🔄", text: "Tap adjacent candy to swap" },
  { icon: "🍬", text: "Match 3 or more in a row!" },
  { icon: "⭐", text: "Reach the target score to win" },
];

export default function HomeScreen({ onPlay, highScore }: HomeScreenProps) {
  const year = new Date().getFullYear();
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, #1a0a2e 0%, #2D1B5E 35%, #5C1A8A 65%, #9A2EC0 100%)",
        maxWidth: 480,
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <div
        className="gradient-game-header"
        style={{
          padding: "16px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(122,45,226,0.4)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.7)",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          🍬 Match &amp; Win 🍬
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          gap: 24,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            className="candy-title"
            style={{
              fontSize: "clamp(36px, 12vw, 56px)",
              lineHeight: 1.1,
              marginBottom: 4,
            }}
          >
            Candy
          </div>
          <div
            className="candy-title"
            style={{ fontSize: "clamp(44px, 14vw, 68px)", lineHeight: 1 }}
          >
            Crush
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Sweet Match-3 Adventure
          </div>
        </div>

        <div
          className="game-board-bg"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 4,
            padding: 8,
            borderRadius: 14,
            width: "min(100%, 260px)",
          }}
        >
          {PREVIEW_BOARD.map((t, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative board
            <MiniCandy key={i} type={t} size={34} />
          ))}
        </div>

        {highScore > 0 && (
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(246,211,107,0.35)",
              borderRadius: 50,
              padding: "8px 20px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 18 }}>🏆</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                color: "#FFE87C",
                fontSize: 16,
              }}
            >
              Best: {highScore.toLocaleString()}
            </span>
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 4 }}>
            {HEART_KEYS.map((k, i) => (
              <span
                key={k}
                className="heart-beat"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                ❤️
              </span>
            ))}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 12,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 600,
            }}
          >
            5 Lives
          </div>
        </div>

        <button
          type="button"
          className="gradient-gold-btn game-heading"
          style={{
            padding: "18px 60px",
            borderRadius: 50,
            border: "none",
            fontSize: 22,
            color: "#2A1738",
            cursor: "pointer",
            letterSpacing: "0.05em",
            boxShadow:
              "0 6px 28px rgba(246,211,107,0.55), 0 2px 0 rgba(0,0,0,0.2)",
          }}
          onClick={onPlay}
          data-ocid="home.primary_button"
        >
          🎮 Play Now!
        </button>

        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "14px 18px",
            width: "100%",
            maxWidth: 340,
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              marginBottom: 8,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            How to Play
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {HOW_TO.map(({ icon, text }) => (
              <div
                key={text}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: 13,
                    fontFamily: "Nunito, sans-serif",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ padding: "1rem", textAlign: "center" }}>
        <p
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 11,
            fontFamily: "Nunito, sans-serif",
          }}
        >
          &copy; {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.5)",
              textDecoration: "underline",
            }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
