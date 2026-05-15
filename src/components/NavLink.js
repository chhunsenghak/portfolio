import { useState } from "react";
import { motion } from "framer-motion";
import { C, ease } from "../styles/theme";

export default function NavLink({ href, children, mobile = false, onClick }) {
  const [h, setH] = useState(false);

  const st = {
    link: {
      color: h ? C.text : C.muted,
      textDecoration: "none",
      fontSize: mobile ? 17 : 14,
      fontWeight: mobile ? 500 : 400,
      textTransform: "capitalize",
      position: "relative",
      paddingBottom: 4,
      display: "inline-block",
      transition: "color .2s",
    },
    bar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: 2,
      background: C.accent,
      borderRadius: 2,
    },
  };

  return (
    <a
      href={href}
      style={st.link}
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {children}
      <motion.span
        style={st.bar}
        animate={{ width: h ? "100%" : "0%" }}
        transition={{ duration: 0.25, ease }}
      />
    </a>
  );
}
