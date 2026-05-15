import { useState } from "react";
import { motion } from "framer-motion";
import { C, ease, V, VP } from "../styles/theme";

export default function TlItem({ date, title, company, desc, delay }) {
  const [h, setH] = useState(false);

  const st = {
    wrap:    { position: "relative", marginBottom: 40 },
    dot:     { position: "absolute", left: -38, top: 5, width: 12, height: 12, borderRadius: "50%", background: C.accent, border: `2px solid ${C.bg}` },
    date:    { fontSize: 12, color: C.gold, fontWeight: 600, marginBottom: 5 },
    title:   { fontSize: 16, fontWeight: 600, marginBottom: 4, color: C.text },
    company: { color: C.accent, fontSize: 14, marginBottom: 8 },
    desc:    { color: C.muted, fontSize: 14, lineHeight: 1.75 },
  };

  return (
    <motion.div
      variants={V.up}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      transition={{ duration: 0.6, delay, ease }}
      style={st.wrap}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <motion.div
        style={st.dot}
        animate={{ scale: h ? 1.6 : 1, boxShadow: h ? `0 0 10px ${C.accent}80` : "none" }}
        transition={{ duration: 0.25 }}
      />
      <div style={st.date}>{date}</div>
      <div style={st.title}>{title}</div>
      <div style={st.company}>{company}</div>
      <div style={st.desc}>{desc}</div>
    </motion.div>
  );
}
