import { motion } from "framer-motion";
import { C } from "../styles/theme";
import Counter from "./Counter";

export default function StatCard({ n, l, interactiveProps }) {
  const st = {
    card: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: 16,
      textAlign: "center",
    },
    num:   { fontSize: 30, fontWeight: 700, color: C.accent },
    label: { fontSize: 11, color: C.dim, marginTop: 4, textTransform: "uppercase", letterSpacing: ".06em" },
  };

  return (
    <motion.div
      style={st.card}
      whileHover={{ y: -3, borderColor: C.borderHov }}
      transition={{ duration: 0.2 }}
      {...interactiveProps}
    >
      <div style={st.num}><Counter target={+n} /></div>
      <div style={st.label}>{l}</div>
    </motion.div>
  );
}
