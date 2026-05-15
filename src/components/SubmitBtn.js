import { motion } from "framer-motion";
import { C } from "../styles/theme";

export default function SubmitBtn({ onClick, interactiveProps }) {
  const st = {
    btn: {
      width: "100%",
      padding: 14,
      background: C.accent,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      fontSize: 15,
      fontWeight: 600,
      cursor: "none",
    },
  };

  return (
    <motion.button
      onClick={onClick}
      style={st.btn}
      whileHover={{ y: -2, background: C.accentHov, boxShadow: "0 8px 24px rgba(59,130,246,.35)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...interactiveProps}
    >
      Send Message →
    </motion.button>
  );
}
