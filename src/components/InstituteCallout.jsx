"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Sparkles, Building2, ArrowRight } from "lucide-react";
import useThemeStore from "@/store/useThemeStore";

export default function InstituteCallout() {
  const { isDark } = useThemeStore();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[100px] -right-40 top-0"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full" style={{ background: "var(--accent-gradient)" }} />
        </motion.div>

        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[80px] -left-20 bottom-0"
          style={{ background: "linear-gradient(135deg, #10b981, #0ea5e9)" }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden group shadow-2xl"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
            border: "1px solid var(--border-primary)",
          }}
        >
          {/* Glassmorphism backing */}
          <div className="absolute inset-0 backdrop-blur-xl" />

          {/* Internal gradient shine on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />

          <div className="relative p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* Left Content */}
            <div className="space-y-8 max-w-2xl text-left w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-[0.2em] uppercase shadow-sm"
                style={{
                  backgroundColor: isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.05)",
                  borderColor: "rgba(16, 185, 129, 0.2)",
                  color: "#10b981"
                }}
              >
                <span>For Institutions</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]"
                  style={{ color: "var(--text-primary)" }}
                >
                  Bring Silicon Valley Standards to  <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                    Your Institute.
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-base md:text-lg lg:text-xl leading-relaxed max-w-xl"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Bring world-class engineering infrastructure to your institute. Give students access to real-world cloud environments, AI mentoring, and enterprise-grade tech stacks.
                </motion.p>
              </div>

              {/* Feature Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                {['Zero Setup Labs', 'Cohort Analytics', 'Custom Curriculums'].map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs md:text-sm font-medium px-3 py-1.5 rounded-lg border border-[var(--border-primary)]" style={{ color: "var(--text-secondary)", backgroundColor: "var(--bg-primary)" }}>
                    <Sparkles size={12} className="text-emerald-500" />
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right Action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
              className="shrink-0 w-full lg:w-auto flex justify-center lg:justify-end"
            >
              <div className="relative group/btn">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-25 group-hover/btn:opacity-60 transition duration-500"></div>
                <motion.a
                  href="/institutes"
                  className="relative inline-flex items-center justify-center gap-3 rounded-full w-full sm:w-auto px-10 py-5 text-base font-bold text-white transition-all duration-300 overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #10b981, #0891b2)" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Subtle shine sweep */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite]" />

                  <span className="relative flex items-center gap-2">
                    Partner with
                    <img
                      src={isDark ? "/logo-black-text.webp" : "/logo-white-text.webp"}
                      alt="Eduvantix Logo"
                      className="h-4 w-auto object-contain inline-block ml-1"
                    />
                    <ArrowRight size={18} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </section>
  );
}
