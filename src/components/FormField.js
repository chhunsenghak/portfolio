import { useState } from "react";
import { C } from "../styles/theme";

export default function FormField({ label, placeholder, interactiveProps, style: sty }) {
  const [foc, setFoc] = useState(false);

  const st = {
    label: { fontSize: 12, color: C.muted, display: "block", marginBottom: 6, fontWeight: 500 },
    input: {
      width: "100%",
      background: "rgba(255,255,255,.04)",
      border: `1px solid ${foc ? C.accent : C.border}`,
      borderRadius: 8,
      padding: "10px 14px",
      color: C.text,
      fontSize: 14,
      outline: "none",
      boxSizing: "border-box",
      boxShadow: foc ? `0 0 0 3px ${C.accentDim}` : "none",
      transition: "border-color .2s, box-shadow .2s",
    },
  };

  return (
    <div style={sty}>
      <label style={st.label}>{label}</label>
      <input
        placeholder={placeholder}
        onFocus={() => setFoc(true)}
        onBlur={() => setFoc(false)}
        {...interactiveProps}
        style={st.input}
      />
    </div>
  );
}
