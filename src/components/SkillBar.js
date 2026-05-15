import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { C, ease } from "../styles/theme";

export default function SkillBar({ label, pct, color = C.accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const st = {
    wrap:   { marginBottom: 14 },
    header: { display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 },
    label:  { color: C.text },
    value:  { color: C.dim },
    track:  { height: 4, background: "rgba(255,255,255,.06)", borderRadius: 3, overflow: "hidden" },
  };

  return (
    <div ref={ref} style={st.wrap}>
      <div style={st.header}>
        <span style={st.label}>{label}</span>
        <span style={st.value}>{pct}%</span>
      </div>
      <div style={st.track}>
        <motion.div
          style={{ height: "100%", borderRadius: 3, background: color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.2, ease }}
        />
      </div>
    </div>
  );
}
