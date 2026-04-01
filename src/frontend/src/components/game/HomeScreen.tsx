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
        background: `radial-gradient(circle at 32% 28%, ${CANDY_COLORS[type]}, ${CANDY_DARK_COLORS[type]})`,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.42,
        paddingTop: "10%",
        borderRadius: 12,
      }}
    >
      {CANDY_EMOJIS[type]}
    </div>
  );
}

const PREVIEW_BOARD = [0, 2, 4, 1, 3, 5, 5, 1, 3, 0, 4, 2, 2, 4, 0, 5, 1, 3];
const FLOAT_CANDIES = [
  { type: 0, delay: 0, left: "8%", top: "12%" },
  { type: 1, delay: 0.8, left: "82%", top: "18%" },
  { type: 2, delay: 1.6, left: "5%", top: "58%" },
  { type: 3, delay: 0.4, left: "88%", top: "55%" },
  { type: 4, delay: 1.2, left: "12%", top: "82%" },
  { type: 5, delay: 2.0, left: "80%", top: "80%" },
];

export default function HomeScreen({ onPlay, highScore }: HomeScreenProps) {
  const year = new Date().getFullYear();
  return (
    <div
      className="game-bg"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        maxWidth: 420,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Floating background candies */}
      {FLOAT_CANDIES.map(({ type, delay, left, top }) => (
        <div
          key={`float-${type}-${delay}`}
          className="float-candy"
          style={{
            position: "absolute",
            left,
            top,
            width: 40,
            height: 40,
            background: `radial-gradient(circle at 32% 28%, ${CANDY_COLORS[type]}, ${CANDY_DARK_COLORS[type]})`,
            borderRadius: 12,
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
            animationDelay: `${delay}s`,
            opacity: 0.6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            paddingTop: "10%",
          }}
        >
          {CANDY_EMOJIS[type]}
        </div>
      ))}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          gap: 20,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(12px)",
              borderRadius: 24,
              padding: "16px 28px",
              boxShadow:
                "0 8px 32px rgba(163,92,255,0.2), 0 1px 0 rgba(255,255,255,0.8) inset",
              border: "1.5px solid rgba(255,255,255,0.7)",
              marginBottom: 6,
            }}
          >
            <div
              className="candy-title"
              style={{
                fontSize: "clamp(38px,12vw,58px)",
                lineHeight: 1.1,
                display: "block",
              }}
            >
              Candy
            </div>
            <div
              className="candy-title"
              style={{
                fontSize: "clamp(46px,14vw,68px)",
                lineHeight: 1,
                display: "block",
              }}
            >
              Crush
            </div>
          </div>
          <div
            style={{
              color: "#9B3A8A",
              fontSize: 13,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            🍬 Sweet Match-3 Adventure 🍬
          </div>
        </div>

        {/* Mini board preview */}
        <div
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(8px)",
            border: "1.5px solid rgba(255,255,255,0.7)",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 4,
            padding: 10,
            borderRadius: 18,
            width: "min(100%, 260px)",
            boxShadow: "0 6px 24px rgba(163,92,255,0.15)",
          }}
        >
          {PREVIEW_BOARD.map((t, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative board
            <MiniCandy key={i} type={t} size={32} />
          ))}
        </div>

        {/* High score */}
        {highScore > 0 && (
          <div
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(8px)",
              border: "1.5px solid rgba(255,210,50,0.5)",
              borderRadius: 50,
              padding: "8px 22px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 16px rgba(255,180,0,0.2)",
            }}
          >
            <span style={{ fontSize: 20 }}>🏆</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 900,
                color: "#C47A00",
                fontSize: 16,
              }}
            >
              Best: {highScore.toLocaleString()}
            </span>
          </div>
        )}

        {/* Lives */}
        <div
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(8px)",
            borderRadius: 50,
            padding: "8px 20px",
            border: "1.5px solid rgba(255,100,150,0.3)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={`life-${i}`}
              className="heart-beat"
              style={{ fontSize: 20, animationDelay: `${i * 0.18}s` }}
            >
              ❤️
            </span>
          ))}
          <span
            style={{
              color: "#C0305A",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              marginLeft: 4,
            }}
          >
            5 Lives
          </span>
        </div>

        {/* Play button */}
        <button
          type="button"
          className="btn-cta"
          style={{
            padding: "18px 64px",
            fontSize: 22,
            letterSpacing: "0.04em",
          }}
          onClick={onPlay}
          data-ocid="home.primary_button"
        >
          🎮 Play Now!
        </button>

        {/* How to play */}
        <div
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(8px)",
            border: "1.5px solid rgba(255,255,255,0.6)",
            borderRadius: 18,
            padding: "14px 18px",
            width: "100%",
            maxWidth: 340,
            boxShadow: "0 4px 16px rgba(163,92,255,0.1)",
          }}
        >
          <div
            style={{
              color: "#7B2D80",
              fontSize: 12,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 800,
              marginBottom: 10,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            How to Play
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: "👆", text: "Tap a candy to select" },
              { icon: "👉", text: "Swipe or tap adjacent to swap" },
              { icon: "🍬", text: "Match 3 or more in a row!" },
              { icon: "⭐", text: "Reach target score to win" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span
                  style={{
                    color: "#5A2070",
                    fontSize: 13,
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer
        style={{
          padding: "1rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            color: "rgba(130,50,140,0.5)",
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
              color: "rgba(163,92,255,0.7)",
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
