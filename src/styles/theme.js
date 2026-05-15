// Deep Ocean & Teal palette
export const C = {
  bg:          "#060D16",
  surfaceAlt:  "#0B1622",
  surface:     "#0F1F2E",
  border:      "#1A3248",
  borderHov:   "#2A4860",
  text:        "#E2F4F9",
  muted:       "#7FB3C8",
  dim:         "#4A7890",
  accent:      "#2DD4BF",
  accentHov:   "#5EEAD4",
  accentDim:   "rgba(45,212,191,.12)",
  gold:        "#F59E0B",
  goldDim:     "rgba(245,158,11,.12)",
  green:       "#34D399",
  greenDim:    "rgba(52,211,153,.12)",
  violet:      "#818CF8",
  violetDim:   "rgba(129,140,248,.12)",
};

// Shared style objects
export const S = {
  section:  (alt = false) => ({ padding: "6rem 2rem", background: alt ? C.surfaceAlt : C.bg }),
  secLabel: {
    display: "block",
    textAlign: "center",
    color: C.accent,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  secTitle: {
    textAlign: "center",
    fontSize: "clamp(1.8rem,4vw,2.6rem)",
    fontWeight: 700,
    color: C.text,
    marginBottom: 12,
    letterSpacing: "-.025em",
  },
  divider: {
    width: 48,
    height: 2,
    background: C.accent,
    borderRadius: 2,
    margin: "0 auto 52px",
    opacity: 0.5,
  },
  card: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 14,
    padding: 24,
  },
};

// Shared easing + viewport config
export const ease = [0.22, 1, 0.36, 1];
export const VP   = { once: true, margin: "-60px" };

// Reusable motion variants
export const V = {
  up:    { hidden: { opacity: 0, y: 26 },  visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 36 },  visible: { opacity: 1, x: 0 } },
};
