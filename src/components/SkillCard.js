import { motion } from "framer-motion";
import { C } from "../styles/theme";
import SkillBar from "./SkillBar";

export default function SkillCard({ cat, color, items }) {
  const st = {
    card: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: 24,
      height: "100%",
    },
    catLabel: {
      fontSize: 11,
      color: C.dim,
      marginBottom: 18,
      textTransform: "uppercase",
      letterSpacing: ".12em",
      fontWeight: 700,
    },
  };

  return (
    <motion.div
      style={st.card}
      whileHover={{
        y: -4,
        borderColor: C.borderHov,
        boxShadow: "0 8px 24px rgba(0,0,0,.3)",
      }}
      transition={{ duration: 0.25 }}
    >
      <h4 style={st.catLabel}>{cat}</h4>
      {items.map(([name, pct]) => (
        <SkillBar key={name} label={name} pct={pct} color={color} />
      ))}
    </motion.div>
  );
}
