import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { PHRASES, COLORS, skillsData, projectsData, experienceData, educationData, certData } from "./data";
import { C, S } from "./styles/theme";
import Reveal from "./components/Reveal";
import NavLink from "./components/NavLink";
import HeroBtn from "./components/HeroBtn";
import TagPill from "./components/TagPill";
import StatCard from "./components/StatCard";
import SkillCard from "./components/SkillCard";
import ProjectCard from "./components/ProjectCard";
import TlItem from "./components/TlItem";
import EduCard from "./components/EduCard";
import CertCard from "./components/CertCard";
import FormField from "./components/FormField";
import SubmitBtn from "./components/SubmitBtn";

export default function App() {
  const [typed, setTyped] = useState("");
  const [toast, setToast] = useState(false);
  const [curBig, setCurBig] = useState(false);
  const [projFilter, setProjFilter] = useState("all");

  // framer-motion cursor: dot tracks exactly, ring lags via spring
  const curX = useMotionValue(-100);
  const curY = useMotionValue(-100);
  const ringX = useSpring(curX, { damping: 22, stiffness: 280 });
  const ringY = useSpring(curY, { damping: 22, stiffness: 280 });

  useEffect(() => {
    const onMove = (e) => { curX.set(e.clientX); curY.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [curX, curY]);

  // typewriter effect
  const pi = useRef(0), ci = useRef(0), del = useRef(false);
  useEffect(() => {
    let timer;
    function tick() {
      const cur = PHRASES[pi.current];
      if (!del.current) { ci.current++; setTyped(cur.substring(0, ci.current)); }
      else              { ci.current--; setTyped(cur.substring(0, ci.current)); }
      if (!del.current && ci.current >= cur.length) {
        timer = setTimeout(() => { del.current = true; tick(); }, 1500);
        return;
      }
      if (del.current && ci.current <= 0) {
        del.current = false;
        pi.current = (pi.current + 1) % PHRASES.length;
      }
      timer = setTimeout(tick, del.current ? 60 : 100);
    }
    tick();
    return () => clearTimeout(timer);
  }, []);

  const onHovIn  = () => setCurBig(true);
  const onHovOut = () => setCurBig(false);
  const ip = { onMouseEnter: onHovIn, onMouseLeave: onHovOut };

  return (
    <div style={{ fontFamily: "'Segoe UI',sans-serif", background: C.bg, color: C.text, overflowX: "hidden", minHeight: "100vh", cursor: "none" }}>

      {/* ── Cursor dot ── */}
      <motion.div
        style={{ position: "fixed", left: curX, top: curY, transform: "translate(-50%,-50%)", borderRadius: "50%", background: C.accent, pointerEvents: "none", zIndex: 9999 }}
        animate={{ width: curBig ? 28 : 11, height: curBig ? 28 : 11, opacity: curBig ? 0.45 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* ── Cursor ring ── */}
      <motion.div
        style={{ position: "fixed", left: ringX, top: ringY, transform: "translate(-50%,-50%)", borderRadius: "50%", border: `1.5px solid ${C.accent}`, pointerEvents: "none", zIndex: 9998 }}
        animate={{ width: curBig ? 52 : 36, height: curBig ? 52 : 36, opacity: curBig ? 0.6 : 0.25 }}
        transition={{ duration: 0.2 }}
      />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 100, background: `${C.bg}ee`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: "1.3rem", fontWeight: 700, color: C.text, letterSpacing: "-.02em" }}
        >
          &lt;CHHUN SENGHAK /&gt;
        </motion.div>
        <div style={{ display: "flex", gap: 24 }}>
          {["about", "skills", "projects", "experience", "education", "certifications", "contact"].map((id) => (
            <span key={id} {...ip}>
              <NavLink href={`#${id}`}>{id}</NavLink>
            </span>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "6rem 2rem 3rem", position: "relative", overflow: "hidden", background: C.bg }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%,rgba(59,130,246,.07),transparent 55%),radial-gradient(ellipse at 70% 50%,rgba(139,92,246,.05),transparent 55%)` }} />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {Array.from({ length: 25 }).map((_, i) => {
            const sz = Math.random() * 3 + 1.5;
            return (
              <div key={i} style={{ position: "absolute", width: sz, height: sz, borderRadius: "50%", left: `${Math.random() * 100}%`, background: COLORS[i % COLORS.length], animation: `floatUp ${Math.random() * 12 + 8}s ${Math.random() * 10}s linear infinite`, opacity: 0 }} />
            );
          })}
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{ display: "inline-block", background: C.accentDim, border: `1px solid rgba(59,130,246,.3)`, color: C.accent, padding: ".3rem 1rem", borderRadius: 6, fontSize: 12, fontWeight: 600, marginBottom: 24, letterSpacing: ".05em" }}>
              ✦ Open to opportunities
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-.03em" }}
          >
            Hi, I'm <span style={{ color: C.accent }}>Chhun Senghak</span>
            <br />
            <span>{typed}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
              style={{ display: "inline-block", width: 3, height: ".85em", background: C.accent, marginLeft: 4, verticalAlign: "middle" }}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ color: C.muted, fontSize: 17, maxWidth: 540, margin: "0 auto 32px", lineHeight: 1.75 }}
          >
            I build beautiful, fast, and accessible web experiences that users love and developers enjoy maintaining.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <HeroBtn href="#projects" primary {...ip}>View My Work</HeroBtn>
            <HeroBtn href="#contact" {...ip}>Get In Touch</HeroBtn>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={S.section()}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><div style={S.secLabel}>Who I Am</div></Reveal>
          <Reveal><h2 style={S.secTitle}>About Me</h2></Reveal>
          <Reveal><div style={S.divider} /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48, alignItems: "center" }}>
            <Reveal dir="left">
              <div style={{ position: "relative", width: 180, margin: "0 auto" }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ position: "absolute", inset: -8, borderRadius: "50%", border: `1.5px dashed rgba(59,130,246,.3)` }}
                />
                <div style={{ width: 180, height: 180, borderRadius: "50%", background: `linear-gradient(135deg,${C.accent},${C.violet},${C.accent}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, fontWeight: 700, color: "#fff", position: "relative", zIndex: 1 }}>
                  CS
                </div>
              </div>
            </Reveal>
            <Reveal dir="right">
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: "-.02em" }}>CHHUN SENGHAK</h3>
              <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 12, fontSize: 15 }}>
                I'm a passionate Web Developer with 2 years of experience crafting responsive, user-centric web applications. I specialize in turning complex problems into clean, elegant solutions.
              </p>
              <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
                When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing what I learn with the community.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {["Problem Solver", "Clean Code", "Adaptable", "Lifelong Learner", "Open Source"].map(t => (
                  <TagPill key={t} {...ip}>{t}</TagPill>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                {[["2", "Years Exp."], ["5", "Projects"]].map(([n, l]) => (
                  <StatCard key={l} n={n} l={l} interactiveProps={ip} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={S.section(true)}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><div style={S.secLabel}>What I Know</div></Reveal>
          <Reveal><h2 style={S.secTitle}>Skills</h2></Reveal>
          <Reveal><div style={S.divider} /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
            {skillsData.map((s, i) => (
              <Reveal key={s.cat} delay={i * 0.1}>
                <SkillCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={S.section()}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><div style={S.secLabel}>What I Built</div></Reveal>
          <Reveal><h2 style={S.secTitle}>Projects</h2></Reveal>
          <Reveal><div style={S.divider} /></Reveal>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36 }}>
              {[
                { key: "all",      label: "All Projects", count: projectsData.length },
                { key: "personal", label: "✦ Personal",   count: projectsData.filter(p => p.type === "personal").length },
                { key: "team",     label: "⚡ Team",       count: projectsData.filter(p => p.type === "team").length },
              ].map(({ key, label, count }) => {
                const active = projFilter === key;
                return (
                  <motion.button
                    key={key}
                    onClick={() => setProjFilter(key)}
                    {...ip}
                    style={{
                      background: active ? (key === "personal" ? "rgba(45,212,191,.15)" : key === "team" ? "rgba(129,140,248,.15)" : C.accentDim) : "transparent",
                      border: `1px solid ${active ? (key === "personal" ? "rgba(45,212,191,.4)" : key === "team" ? "rgba(129,140,248,.4)" : C.accent) : C.border}`,
                      color: active ? (key === "personal" ? "#2DD4BF" : key === "team" ? "#818CF8" : C.accent) : C.muted,
                      fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 20, cursor: "pointer",
                      display: "inline-flex", alignItems: "center", gap: 6,
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    {label}
                    <span style={{ background: active ? "rgba(255,255,255,.12)" : C.surface, borderRadius: 10, padding: "1px 7px", fontSize: 10 }}>
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 24 }}>
            {projectsData
              .filter(p => projFilter === "all" || p.type === projFilter)
              .map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <ProjectCard {...p} />
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={S.section(true)}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><div style={S.secLabel}>Where I've Worked</div></Reveal>
          <Reveal><h2 style={S.secTitle}>Experience</h2></Reveal>
          <Reveal><div style={S.divider} /></Reveal>
          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(180deg,${C.accent},${C.violet},transparent)`, opacity: 0.35 }} />
            {experienceData.map((e, i) => (
              <TlItem key={i} {...e} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={S.section()}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><div style={S.secLabel}>My Background</div></Reveal>
          <Reveal><h2 style={S.secTitle}>Education</h2></Reveal>
          <Reveal><div style={S.divider} /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {educationData.map((e, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <EduCard {...e} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" style={S.section(true)}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><div style={S.secLabel}>Proof of Skills</div></Reveal>
          <Reveal><h2 style={S.secTitle}>Certifications</h2></Reveal>
          <Reveal><div style={S.divider} /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {certData.map((c, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <CertCard {...c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={S.section()}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><div style={S.secLabel}>Let's Talk</div></Reveal>
          <Reveal><h2 style={S.secTitle}>Get In Touch</h2></Reveal>
          <Reveal><div style={S.divider} /></Reveal>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
              {[[C.accent, "senghakchhun1414@gmail.com"], [C.green, "+855 (096) 395-5091"], [C.gold, "Phnom Penh, Cambodia"]].map(([col, txt]) => (
                <div key={txt} style={{ display: "flex", alignItems: "center", gap: 8, color: C.muted, fontSize: 14 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: col, animation: "pulse 2s ease infinite" }} />
                  {txt}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div style={{ ...S.card, maxWidth: 600, margin: "0 auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[["First Name", "Veha"], ["Last Name", "Bot"]].map(([l, p]) => (
                  <FormField key={l} label={l} placeholder={p} interactiveProps={ip} />
                ))}
              </div>
              {[["Email Address", "botveha@gmail.com"], ["Subject", "What's this about?"]].map(([l, p]) => (
                <FormField key={l} label={l} placeholder={p} interactiveProps={ip} style={{ marginBottom: 16 }} />
              ))}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 6, fontWeight: 500 }}>Message</label>
                <textarea
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  {...ip}
                  style={{ width: "100%", background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
                />
              </div>
              <SubmitBtn
                onClick={() => { setToast(true); setTimeout(() => setToast(false), 3500); }}
                interactiveProps={ip}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem", color: C.dim, fontSize: 13, borderTop: `1px solid ${C.border}` }}>
        Designed & built by{" "}
        <span style={{ color: C.accent, fontWeight: 600 }}>CHHUN SENGHAK</span>
        {" "}· 2026
      </footer>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            style={{ position: "fixed", bottom: 32, right: 32, background: C.surface, border: `1px solid ${C.accent}`, color: C.text, padding: "14px 22px", borderRadius: 10, fontSize: 14, zIndex: 999, boxShadow: "0 8px 24px rgba(0,0,0,.35)" }}
          >
            ✓ Message sent! I'll get back to you soon.
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes floatUp { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 10% { opacity: .6; } 90% { opacity: .15; } 100% { transform: translateY(-20px); opacity: 0; } }
        @keyframes pulse   { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.5); opacity: .6; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::placeholder { color: ${C.dim}; }
        textarea { font-family: inherit; }
      `}</style>
    </div>
  );
}
