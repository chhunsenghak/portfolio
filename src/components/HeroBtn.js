import { motion } from "framer-motion";
import { C } from "../styles/theme";

export default function HeroBtn({ children, href, primary, ...rest }) {
  const st = {
    base: {
      padding: ".75rem 2rem",
      borderRadius: 8,
      fontWeight: 600,
      cursor: "none",
      fontSize: 15,
      textDecoration: "none",
      display: "inline-block",
      background: primary ? C.accent : "transparent",
      color: primary ? "#fff" : C.muted,
      border: primary ? "none" : `1px solid ${C.border}`,
    },
  };

  return (
    <motion.a
      href={href}
      style={st.base}
      whileHover={{
        y: -3,
        color: primary ? "#fff" : C.text,
        borderColor: primary ? undefined : C.accent,
        boxShadow: primary ? "0 10px 28px rgba(59,130,246,.35)" : "none",
        background: primary ? C.accentHov : "transparent",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
