"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

/* ─── Premium easing tokens ───────────────────────────── */
const ease = {
  out:  [0.16, 1, 0.3, 1],
  soft: [0.25, 0.46, 0.45, 0.94],
};

/* ─── Theme hook ─────────────────────────────────────── */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setDark(document.documentElement.classList.contains("theme-dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* ─── Theme color palette ────────────────────────────── */
function getThemeTokens(dark) {
  if (dark) {
    return {
      bg:            "#000000",
      bgFade:        "#000000",
      textPrimary:   "rgba(255,255,255,0.92)",
      textSecondary: "rgba(255,255,255,0.38)",
      textMuted:     "rgba(255,255,255,0.2)",
      textVeryMuted: "rgba(255,255,255,0.1)",
      accent:        "rgba(16,185,129,0.65)",
      accentFaint:   "rgba(16,185,129,0.55)",
      divider:       "rgba(255,255,255,0.12)",
      statBg:        "rgba(255,255,255,0.018)",
      statBorder:    "rgba(255,255,255,0.06)",
      statNum:       "rgba(255,255,255,0.82)",
      statLabel:     "rgba(255,255,255,0.22)",
      ctaPrimary:    { bg: "rgba(16,185,129,0.18)", border: "rgba(16,185,129,0.28)", text: "rgba(16,185,129,0.92)", bgHover: "rgba(16,185,129,0.32)", borderHover: "rgba(16,185,129,0.58)" },
      ctaSecondary:  { color: "rgba(255,255,255,0.72)", colorHover: "rgba(255,255,255,1)" },
      tickerBorder:  "rgba(255,255,255,0.07)",
      tickerText:    "rgba(255,255,255,0.22)",
      tickerDot:     "rgba(255,255,255,0.08)",
      cornerText:    "rgba(255,255,255,0.12)",
      cornerSubtext: "rgba(255,255,255,0.06)",
      vortexNode:    "rgba(16,185,129,0.9)",
      vortexLine:    "rgba(16,185,129,0.15)",
    };
  }
  return {
    bg:            "#f8fafc",
    bgFade:        "#f8fafc",
    textPrimary:   "rgba(2,6,23,0.92)",
    textSecondary: "rgba(2,6,23,0.52)",
    textMuted:     "rgba(2,6,23,0.32)",
    textVeryMuted: "rgba(2,6,23,0.15)",
    accent:        "rgba(5,150,105,0.75)",
    accentFaint:   "rgba(5,150,105,0.65)",
    divider:       "rgba(2,6,23,0.12)",
    statBg:        "rgba(2,6,23,0.018)",
    statBorder:    "rgba(2,6,23,0.07)",
    statNum:       "rgba(2,6,23,0.82)",
    statLabel:     "rgba(2,6,23,0.32)",
    ctaPrimary:    { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)", text: "rgba(4,120,87,0.92)", bgHover: "rgba(16,185,129,0.18)", borderHover: "rgba(16,185,129,0.5)" },
    ctaSecondary:  { color: "rgba(2,6,23,0.75)", colorHover: "rgba(2,6,23,1)" },
    tickerBorder:  "rgba(2,6,23,0.07)",
    tickerText:    "rgba(2,6,23,0.28)",
    tickerDot:     "rgba(2,6,23,0.12)",
    cornerText:    "rgba(2,6,23,0.2)",
    cornerSubtext: "rgba(2,6,23,0.1)",
    vortexNode:    "rgba(5,150,105,0.9)",
    vortexLine:    "rgba(16,185,129,0.15)",
  };
}

/* ─── Neural Vortex (Crazy Animated 3D Node Mesh) ────── */
// Creates a highly dynamic 3D torus knot of connecting nodes
function NeuralVortex({ mouseX, mouseY, dark }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const stateRef  = useRef({ mouseX: 0.5, mouseY: 0.5, dark });

  useEffect(() => {
    stateRef.current = { mouseX, mouseY, dark };
  }, [mouseX, mouseY, dark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, cx, cy;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
      w  = canvas.width;
      h  = canvas.height;
      cx = w * 0.75;
      cy = h * 0.50;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const POINTS = 250;
    const nodes = [];
    for (let i = 0; i < POINTS; i++) {
      const t = (i / POINTS) * Math.PI * 2;
      // Torus knot formula
      const p = 3;
      const q = 7;
      const r = 90 * (1 + 0.3 * Math.cos(q * t));
      const x = r * Math.cos(p * t);
      const y = r * Math.sin(p * t);
      const z = 45 * Math.sin(q * t);
      nodes.push({ baseX: x, baseY: y, baseZ: z, t });
    }

    const draw = (ts) => {
      const { mouseX: mx, mouseY: my, dark: isDark } = stateRef.current;
      const tok = getThemeTokens(isDark);
      ctx.clearRect(0, 0, w, h);

      const px = (mx - 0.5) * 30;
      const py = (my - 0.5) * 20;
      const ox = cx + px;
      const oy = cy + py;

      const time = ts * 0.0003;
      const rotY = time * 1.5;
      const rotX = time * 0.8 + (my - 0.5);

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      const projected = [];
      nodes.forEach(node => {
        const pulse = 1 + Math.sin(node.t * 10 + time * 5) * 0.2;
        let x = node.baseX * pulse;
        let y = node.baseY * pulse;
        let z = node.baseZ * pulse;

        // Rotate Y
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;
        // Rotate X
        let y1 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        const scale = 300 / (300 + z2);
        projected.push({
          x: ox + x1 * scale * 1.5,
          y: oy + y1 * scale * 1.5,
          scale: scale,
          z: z2
        });
      });

      projected.sort((a, b) => b.z - a.z);

      // Draw lines between close nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx*dx + dy*dy;
          if (distSq < 3000) {
            const alpha = (1 - distSq / 3000) * (isDark ? 0.25 : 0.15) * p1.scale;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // using string manipulation for alpha
            const color = tok.vortexLine.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.strokeStyle = color;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.forEach(p => {
        ctx.beginPath();
        const r = Math.max(0.5, 2.5 * p.scale);
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        const alpha = Math.max(0.1, Math.min(1, p.scale));
        ctx.fillStyle = tok.vortexNode.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();
        
        // Glow for larger dots
        if (p.scale > 1) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
            ctx.fillStyle = tok.vortexNode.replace(/[\d.]+\)$/, `${alpha * 0.2})`);
            ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); };
  }, []); // reads live state via stateRef

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ─── Ticker Strip ───────────────────────────────────── */
const tickers = [
  "AI-Powered Code Review",
  "Interactive Browser Sandboxes",
  "Blockchain Certificates",
  "Live Cohort Sessions",
  "Real-Time Feedback",
  "300+ Projects Built",
  "Industry-Mentored Tracks",
];

function TickerStrip({ tok }) {
  const items = [...tickers, ...tickers];
  return (
    <div className="overflow-hidden border-y" style={{ borderColor: tok.tickerBorder }}>
      <div className="ticker-track py-2.5">
        {items.map((t, i) => (
          <span key={i} className="mx-8 text-[10px] font-medium tracking-[0.18em] uppercase whitespace-nowrap" style={{ color: tok.tickerText }}>
            {t}
            <span className="mx-8" style={{ color: tok.tickerDot }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Animated counter ──────────────────────────────── */
function Counter({ to, suffix = "", delay = 0, isDecimal = false }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1500, 1);
        setCount(Math.floor((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [to, delay]);
  return <>{count.toLocaleString()}{isDecimal ? ".9" : ""}{suffix}</>;
}

/* ─── Main Hero ──────────────────────────────────────── */
export default function Hero() {
  const dark = useTheme();
  const tok  = getThemeTokens(dark);

  const containerRef = useRef(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const mouseX = useSpring(rawX, { stiffness: 40, damping: 22 });
  const mouseY = useSpring(rawY, { stiffness: 40, damping: 22 });
  const [mxVal, setMxVal] = useState(0.5);
  const [myVal, setMyVal] = useState(0.5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const u1 = mouseX.on("change", setMxVal);
    const u2 = mouseY.on("change", setMyVal);
    return () => { u1(); u2(); };
  }, [mouseX, mouseY]);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  }, [rawX, rawY]);

  const stats = [
    { label: "Learners Enrolled", value: 12000, suffix: "+",  isDecimal: false },
    { label: "Projects Shipped",  value: 300,   suffix: "+",  isDecimal: false },
    { label: "Avg Rating",        value: 4,     suffix: "",   isDecimal: true  },
    { label: "Live Mentors",      value: 48,    suffix: "+",  isDecimal: false },
  ];

  const headline = [
    { words: ["Master", "Code."],     accents: [false, true] },
    { words: ["Build",  "Tomorrow."], accents: [false, true] },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden cursor-none-zone"
      style={{
        minHeight: "85svh",
        background: tok.bg,
        transition: "background 0.4s ease",
      }}
    >


      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: dark ? 0.028 : 0.018,
          mixBlendMode: "overlay",
        }}
      />

      {/* Ticker */}
      <div className="absolute top-[64px] left-0 right-0 z-10">
        <TickerStrip tok={tok} />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 min-h-[85vh] flex flex-col justify-center">
        <div className="pt-32 pb-12">

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: ease.out }}
            className="flex items-center gap-3 mb-10"
          >
            <div style={{ width: 28, height: 1, background: tok.accentFaint }} />
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: tok.accent }}>
              Eduvantix — Est. 2024
            </span>
          </motion.div>

          {/* Headline + description grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,340px)] gap-10 lg:gap-0 items-end">

            {/* LEFT: editorial headline */}
            <div>
              {headline.map((line, li) => (
                <div key={li} style={{ overflow: "hidden" }}>
                  <motion.div
                    className="flex items-baseline gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden:  {},
                      visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 + li * 0.2 } },
                    }}
                  >
                    {line.words.map((word, wi) => (
                      <motion.span
                        key={wi}
                        style={{
                          display:       "block",
                          fontFamily:    line.accents[wi] ? "'Instrument Serif', Georgia, serif" : "var(--font-sans)",
                          fontSize:      "clamp(3.6rem, 8.5vw, 8rem)",
                          fontWeight:    line.accents[wi] ? 400 : 700,
                          letterSpacing: line.accents[wi] ? "-0.015em" : "-0.04em",
                          lineHeight:    0.93,
                          fontStyle:     line.accents[wi] ? "italic" : "normal",
                          color:         line.accents[wi] ? "transparent" : tok.textPrimary,
                          WebkitTextStroke: line.accents[wi]
                            ? `1px ${dark ? "rgba(16,185,129,0.65)" : "rgba(5,150,105,0.6)"}`
                            : "none",
                        }}
                        variants={{
                          hidden:  { y: 90, opacity: 0, skewY: 2.5 },
                          visible: { y: 0, opacity: 1, skewY: 0, transition: { duration: 0.75, ease: ease.out } },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* RIGHT: description */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.55, ease: ease.out }}
              className="lg:flex lg:flex-col lg:items-end lg:justify-end lg:pb-2"
            >
              <div className="max-w-[290px] lg:text-right">
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: tok.accent }}>
                  Built for the Future
                </p>
                <p className="text-sm leading-[1.75]" style={{ color: tok.textSecondary }}>
                  Project-driven learning in AI, Frontend Engineering, Cloud &amp; Creative Tech — with live mentors and verified certificates.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.62, duration: 0.7, ease: ease.out }}
            style={{ height: 1, background: tok.divider, marginTop: 44, marginBottom: 44 }}
          />

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.5, ease: ease.out }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          >
            {/* Sub-tagline */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-1" style={{ color: tok.textMuted }}>
                We transcend dimensions
              </p>
              <p className="text-[11px]" style={{ color: tok.textVeryMuted }}>
                of education and creativity
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-5">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2, ease: ease.soft }}>
                <Link
                  href="/courses/generative-ai"
                  className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold"
                  style={{
                    background:     tok.ctaPrimary.bg,
                    border:         `1px solid ${tok.ctaPrimary.border}`,
                    color:          tok.ctaPrimary.text,
                    backdropFilter: "blur(12px)",
                    transition:     "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background  = tok.ctaPrimary.bgHover;
                    e.currentTarget.style.borderColor = tok.ctaPrimary.borderHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background  = tok.ctaPrimary.bg;
                    e.currentTarget.style.borderColor = tok.ctaPrimary.border;
                  }}
                >
                  <span>Get Started</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2, ease: ease.soft }}>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
                  style={{ 
                    color: tok.ctaSecondary.color, 
                    border: `1px solid ${tok.divider}`,
                    backgroundColor: "transparent",
                    transition: "all 0.2s" 
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.color = tok.ctaSecondary.colorHover; 
                    e.currentTarget.style.borderColor = tok.accentFaint;
                    e.currentTarget.style.backgroundColor = tok.statBg;
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.color = tok.ctaSecondary.color; 
                    e.currentTarget.style.borderColor = tok.divider;
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Browse Courses
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.55, ease: ease.out }}
            className="grid grid-cols-2 sm:grid-cols-4 mt-16 overflow-hidden"
            style={{
              border:       `1px solid ${tok.statBorder}`,
              borderRadius: 14,
              transition:   "border-color 0.4s",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col gap-1.5 px-6 py-5"
                style={{
                  background:  tok.statBg,
                  borderRight: i < 3 ? `1px solid ${tok.statBorder}` : "none",
                  transition:  "background 0.4s, border-color 0.4s",
                }}
              >
                <span className="text-[1.6rem] font-black tracking-tight tabular-nums" style={{ color: tok.statNum, transition: "color 0.4s" }}>
                  {mounted ? <Counter to={s.value} suffix={s.suffix} delay={900 + i * 110} isDecimal={s.isDecimal} /> : "—"}
                </span>
                <span className="text-[10px] font-medium tracking-[0.1em] uppercase" style={{ color: tok.statLabel, transition: "color 0.4s" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: `linear-gradient(to bottom, transparent, ${tok.bgFade})` }}
      />
    </section>
  );
}
