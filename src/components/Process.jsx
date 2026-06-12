"use client";

import { motion } from "framer-motion";
import { Compass, Code2, Users2, Award, ArrowUpRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Path",
    desc: "Pick from custom tracks designed by industry professionals in WebGL, React 19, Motion Design, and AI architecture.",
    icon: <Compass className="text-indigo-600" size={24} />,
    color: "from-indigo-100/50 to-purple-50/50",
    glow: "shadow-[0_4px_12px_rgba(99,102,241,0.06)]",
    details: ["Tailored diagnostic test", "Dedicated path counselors", "Lifetime syllabus updates"],
  },
  {
    number: "02",
    title: "Build in Sandbox Environments",
    desc: "Write code and render complex animations side-by-side using our built-in browser sandboxes. No heavy local setup required.",
    icon: <Code2 className="text-cyan-600" size={24} />,
    color: "from-cyan-100/50 to-blue-50/50",
    glow: "shadow-[0_4px_12px_rgba(6,182,212,0.06)]",
    details: ["Live canvas renders", "Autosaved code checkpoints", "Hot module reloading in-browser"],
  },
  {
    number: "03",
    title: "Real-time AI Co-pilot Review",
    desc: "Receive immediate syntax corrections, design improvements, and performance tips from custom LLM training agents.",
    icon: <Users2 className="text-emerald-600" size={24} />,
    color: "from-emerald-100/50 to-teal-50/50",
    glow: "shadow-[0_4px_12px_rgba(16,185,129,0.06)]",
    details: ["24/7 code explanation", "Performance complexity checker", "Refactoring suggestions"],
  },
  {
    number: "04",
    title: "Earn Dynamic On-Chain Credentials",
    desc: "Publish your live project portfolios, receive verified peer-reviews, and earn cryptographic certificates to showcase your skillset.",
    icon: <Award className="text-fuchsia-600" size={24} />,
    color: "from-fuchsia-100/50 to-pink-50/50",
    glow: "shadow-[0_4px_12px_rgba(217,70,239,0.06)]",
    details: ["Custom portfolio website link", "Cryptographic signature", "Partner hiring referrals"],
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Background neon grid lines */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, var(--border-primary), transparent)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-[130px] pointer-events-none" style={{ backgroundColor: "var(--accent-glow)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold font-display uppercase tracking-widest" style={{ color: "var(--text-accent)" }}>
            The Learning Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight" style={{ color: "var(--text-primary)" }}>
            Designed for Practical Mastery
          </h2>
          <p className="text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Traditional tutorials teach you to copy. Synapse Academy utilizes interactive, project-driven timelines to build muscle memory.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, type: "spring", stiffness: 80 }}
              whileHover={{ y: -8 }}
              className="relative flex flex-col justify-between rounded-2xl p-6 shadow-md backdrop-blur-xl group transition-all duration-300"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-card)" }}
            >
              {/* Connector line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(100%-12px)] w-[calc(100%-24px)] h-0.5 border-t border-dashed z-0" style={{ borderColor: "var(--border-primary)" }} />
              )}

              {/* Number and Icon Row */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="text-3xl font-extrabold font-display transition-colors duration-300" style={{ color: "var(--border-accent)" }}>
                  {step.number}
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} border border-slate-200 ${step.glow} transition-transform duration-300 group-hover:scale-110`}>
                  {step.icon}
                </div>
              </div>

              {/* Description */}
              <div className="relative z-10 space-y-3 mb-6">
                <h3 className="text-lg font-bold font-display transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.desc}
                </p>
              </div>

              {/* Hover Bullet Items */}
              <div className="relative z-10 pt-4 space-y-2.5" style={{ borderTop: "1px solid var(--border-primary)" }}>
                {step.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center space-x-2 text-xs transition-colors duration-300" style={{ color: "var(--text-muted)" }}>
                    <ArrowUpRight size={10} style={{ color: "var(--text-accent)" }} />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
