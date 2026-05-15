import { motion } from "framer-motion";
import { C } from "../styles/theme";

export default function CertCard({ icon, title, issuer, date, color }) {
  const st = {
    card: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: 24,
      position: "relative",
      overflow: "hidden",
    },
    stripe: {
      position: "absolute",
      top: 0, left: 0, right: 0,
      height: 2,
      background: color,
      opacity: 0.7,
    },
    iconWrap: {
      width: 48, height: 48, borderRadius: 10,
      background: `${color}18`,
      border: `1px solid ${color}33`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 22, marginBottom: 14,
    },
    title:    { fontSize: 15, fontWeight: 600, marginBottom: 5, color: C.text },
    issuer:   { color: C.muted, fontSize: 13, marginBottom: 10 },
    dateRow:  { display: "flex", alignItems: "center", gap: 6 },
    dot:      { width: 6, height: 6, borderRadius: "50%", background: color },
    dateText: { color: C.dim, fontSize: 12 },
  };

  return (
    <motion.div
      style={st.card}
      whileHover={{ y: -5, borderColor: `${color}55`, boxShadow: `0 10px 30px ${color}18` }}
      transition={{ duration: 0.25 }}
    >
      <div style={st.stripe} />
      <motion.div
        style={st.iconWrap}
        whileHover={{ rotate: 6, scale: 1.08 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <h4 style={st.title}>{title}</h4>
      <div style={st.issuer}>{issuer}</div>
      <div style={st.dateRow}>
        <div style={st.dot} />
        <span style={st.dateText}>Issued {date}</span>
      </div>
    </motion.div>
  );
}
