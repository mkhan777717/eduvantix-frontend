"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CinematicCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const dotX = useSpring(mx, { damping: 40, stiffness: 600, mass: 0.3 });
  const dotY = useSpring(my, { damping: 40, stiffness: 600, mass: 0.3 });
  const ringX = useSpring(mx, springConfig);
  const ringY = useSpring(my, springConfig);

  useEffect(() => {
    // Only on desktop (pointer: fine)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e) => {
      const el = e.target;
      if (
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[data-cursor-hover]")
      ) {
        setHovered(true);
      }
    };

    const onLeave = (e) => {
      const el = e.target;
      if (
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[data-cursor-hover]")
      ) {
        setHovered(false);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnterDoc = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnterDoc);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnterDoc);
    };
  }, [visible, mx, my]);

  return (
    <>
      {/* Soft Apple-style WWDC cursor glow */}
      <motion.div
        className="pointer-events-none fixed z-[99999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, var(--accent-primary) 0%, transparent 60%)",
          opacity: visible ? 0.08 : 0,
          filter: "blur(40px)",
          transition: "opacity 0.6s ease",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
