import { motion } from "framer-motion";
import { C } from "../styles/theme";

export default function TagPill({ children, ...rest }) {
  const st = {
    base: {
      background: C.accentDim,
      border: "1px solid rgba(59,130,246,.25)",
      color: C.accent,
      padding: "4px 12px",
      borderRadius: 6,
      fontSize: 12,
      display: "inline-block",
      cursor: "default",
    },
  };

  return (
    <motion.span
      style={st.base}
      whileHover={{ scale: 1.06, background: "rgba(59,130,246,.2)" }}
      transition={{ duration: 0.15 }}
      {...rest}
    >
      {children}
    </motion.span>
  );
}
