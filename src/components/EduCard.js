import { motion } from "framer-motion";
import { C } from "../styles/theme";

export default function EduCard({ icon, title, school, year }) {
  const st = {
    card: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: 24,
      display: "flex",
      gap: 16,
      alignItems: "flex-start",
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 10,
      background: C.accentDim,
      border: "1px solid rgba(59,130,246,.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      flexShrink: 0,
    },
    title: { fontSize: 15, fontWeight: 600, marginBottom: 4, color: C.text },
    school: { color: C.accent, fontSize: 13, marginBottom: 4 },
    year: { color: C.dim, fontSize: 12 },
  };

  return (
    <motion.div
      style={st.card}
      whileHover={{
        y: -3,
        borderColor: C.borderHov,
        boxShadow: "0 8px 20px rgba(0,0,0,.25)",
      }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        style={st.iconWrap}
        whileHover={{ rotate: 8, scale: 1.1 }}
        transition={{ duration: 0.25 }}
      >
        {icon}
      </motion.div>
      <div>
        <h4 style={st.title}>{title}</h4>
        <div style={st.school}>{school}</div>
        <div style={st.year}>{year}</div>
      </div>
    </motion.div>
  );
}
