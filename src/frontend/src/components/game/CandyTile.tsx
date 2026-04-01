import {
  CANDY_COLORS,
  CANDY_DARK_COLORS,
  CANDY_EMOJIS,
} from "../../game/engine";

interface CandyTileProps {
  index: number;
  type: number;
  isSelected: boolean;
  isExploding: boolean;
  isNew: boolean;
  isInvalid: boolean;
  onTap: (index: number) => void;
}

export default function CandyTile({
  index,
  type,
  isSelected,
  isExploding,
  isNew,
  isInvalid,
  onTap,
}: CandyTileProps) {
  if (type < 0) return <div style={{ aspectRatio: "1/1" }} />;

  const bg = CANDY_COLORS[type];
  const darkBg = CANDY_DARK_COLORS[type];
  const emoji = CANDY_EMOJIS[type];

  let animClass = "";
  if (isExploding) animClass = "candy-exploding";
  else if (isNew) animClass = "candy-new";
  else if (isSelected) animClass = "candy-selected";
  else if (isInvalid) animClass = "candy-invalid";

  return (
    <button
      type="button"
      className={`candy-tile ${animClass}`}
      style={{
        aspectRatio: "1/1",
        background: `radial-gradient(circle at 32% 28%, ${bg} 0%, ${darkBg} 100%)`,
        border: isSelected
          ? "2.5px solid rgba(255,255,255,0.95)"
          : "1.5px solid rgba(255,255,255,0.25)",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => onTap(index)}
      data-ocid={`board.item.${(index % 8) + 1}`}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(11px, 3.5vw, 20px)",
          lineHeight: 1,
          paddingTop: "12%",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))",
          userSelect: "none",
        }}
      >
        {emoji}
      </div>
    </button>
  );
}
