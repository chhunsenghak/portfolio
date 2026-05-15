import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { C } from "../styles/theme";

const TYPE_META = {
  team:     { label: "Team Project",     icon: "⚡", color: "#818CF8", dim: "rgba(129,140,248,.15)", border: "rgba(129,140,248,.3)" },
  personal: { label: "Personal Project", icon: "✦", color: "#2DD4BF", dim: "rgba(45,212,191,.15)",  border: "rgba(45,212,191,.3)"  },
};

export default function ProjectCard({ badge, type = "personal", title, desc, tags }) {
  const meta = TYPE_META[type] ?? TYPE_META.personal;
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, on: false });
  const [hov, setHov] = useState(false);

  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    setTilt({ rx: ((y - r.height / 2) / r.height) * 10, ry: (-(x - r.width / 2) / r.width) * 10 });
    setShine({ x, y, on: true });
  }, []);
  const onEnter = () => setHov(true);
  const onLeave = () => { setHov(false); setTilt({ rx: 0, ry: 0 }); setShine(s => ({ ...s, on: false })); };

  const st = {
    card: {
      background: C.surface,
      border: `1px solid ${hov ? meta.color + "55" : C.border}`,
      borderRadius: 14,
      padding: 24,
      position: "relative",
      overflow: "hidden",
      transformStyle: "preserve-3d",
      transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${hov ? 6 : 0}px)`,
      transition: hov ? "transform .05s" : "transform .4s ease",
      boxShadow: hov ? `0 16px 40px rgba(0,0,0,.4), 0 0 0 1px ${meta.color}22` : "none",
      height: "100%",
    },
    stripe:    { position: "absolute", top: 0, left: 0, right: 0, height: 2, background: meta.color, opacity: hov ? 0.9 : 0.4, transition: "opacity .3s" },
    badge:     { display: "inline-block", background: C.greenDim, color: C.green, border: "1px solid rgba(16,185,129,.25)", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, marginBottom: 12 },
    typePill:  { display: "inline-flex", alignItems: "center", gap: 4, background: meta.dim, color: meta.color, border: `1px solid ${meta.border}`, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 },
    title:     { fontSize: 17, fontWeight: 600, marginBottom: 8, color: C.text },
    desc:      { color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 14 },
    tags:      { display: "flex", flexWrap: "wrap", gap: 6 },
    tag:       { background: C.goldDim, color: C.gold, border: "1px solid rgba(245,158,11,.2)", padding: "2px 8px", borderRadius: 4, fontSize: 11 },
    actions:   { display: "flex", gap: 10, marginTop: 16 },
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={st.card}
    >
      <div style={st.stripe} />
      {shine.on && (
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${shine.x}px ${shine.y}px,rgba(255,255,255,.05),transparent 60%)`, pointerEvents: "none" }} />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={st.badge}>{badge}</span>
        <span style={st.typePill}>
          <span>{meta.icon}</span>
          {meta.label}
        </span>
      </div>
      <h3 style={st.title}>{title}</h3>
      <p style={st.desc}>{desc}</p>
      <div style={st.tags}>
        {tags.map(t => <span key={t} style={st.tag}>{t}</span>)}
      </div>
      <div style={st.actions}>
        {["Live Demo", "GitHub"].map(l => <LinkBtn key={l} accent={meta.color}>{l}</LinkBtn>)}
      </div>
    </div>
  );
}

function LinkBtn({ children, accent = C.accent }) {
  return (
    <motion.button
      type="button"
      style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, fontSize: 12, padding: "4px 12px", borderRadius: 6, cursor: "pointer" }}
      whileHover={{ borderColor: accent, color: accent }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  );
}
