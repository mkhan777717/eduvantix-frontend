"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, BookOpen, Star, Activity, X } from "lucide-react";

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const floatCards = [
    {
      title: "Interactive Motion",
      subtitle: "Framer Motion & WebGL",
      icon: <Activity className="text-cyan-600" size={18} />,
      color: "from-white to-cyan-50/30",
      border: "border-cyan-200",
      delay: 0,
      position: "top-4 left-6 md:top-12 md:left-24",
    },
    {
      title: "Machine Learning",
      subtitle: "Neural Nets & Agents",
      icon: <Sparkles className="text-purple-600" size={18} />,
      color: "from-white to-purple-50/30",
      border: "border-purple-200",
      delay: 1.5,
      position: "bottom-12 right-6 md:bottom-20 md:right-16",
    },
    {
      title: "Frontend Engineering",
      subtitle: "Next.js & React 19",
      icon: <BookOpen className="text-indigo-600" size={18} />,
      color: "from-white to-indigo-50/30",
      border: "border-indigo-200",
      delay: 0.7,
      position: "top-1/3 right-12 md:top-1/3 md:right-32",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#faf9f6] pt-28 pb-16 flex items-center justify-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-indigo-100/40 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-100/30 blur-[140px]"
        />
        {/* Dot Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-xs font-semibold text-indigo-600 backdrop-blur-md"
            >
              <Star size={12} className="fill-indigo-600 text-indigo-600" />
              <span>Next-Gen Creative Technical Academy</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.1] text-slate-900"
            >
              Learn in{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Flow State
              </span>
              . Master the Code.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Unlock immersive, curriculum-led learning tracks featuring interactive code sandboxes, motion design concepts, and advanced artificial intelligence integrations.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <motion.a
                href="/courses/generative-ai"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto text-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-[0_4px_15px_rgba(79,70,229,0.25)] transition-all hover:opacity-95 flex items-center justify-center space-x-2"
              >
                <Sparkles size={16} />
                <span>Start Free Gen AI Course</span>
              </motion.a>

              <motion.button
                onClick={() => setIsVideoOpen(true)}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.02)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <Play size={10} className="ml-0.5 fill-white" />
                </div>
                <span>Watch Platform Intro</span>
              </motion.button>
            </motion.div>

            {/* Microstats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start space-x-8 pt-8 border-t border-slate-200"
            >
              <div>
                <p className="text-2xl font-bold text-slate-900 font-display">12,000+</p>
                <p className="text-xs text-slate-500">Active Students</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-slate-900 font-display">98.7%</p>
                <p className="text-xs text-slate-500">Completion Rate</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-slate-900 font-display">400+</p>
                <p className="text-xs text-slate-500">Video Projects</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Cards Dashboard */}
          <div className="lg:col-span-5 relative min-h-[400px] md:min-h-[480px] w-full flex items-center justify-center">
            {/* Center Glowing Hub */}
            <motion.div
              animate={{
                scale: [0.9, 1.1, 0.9],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-56 w-56 rounded-full bg-indigo-100/40 blur-[80px]"
            />

            {/* Orbit paths */}
            <div className="absolute h-80 w-80 rounded-full border border-dashed border-slate-200" />
            <div className="absolute h-[420px] w-[420px] rounded-full border border-dashed border-slate-200" />

            {/* Animated Floating Cards */}
            {floatCards.map((card, idx) => (
              <motion.div
                key={idx}
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 6 + idx * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: card.delay,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -15,
                  boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.08)",
                  borderColor: "rgba(99, 102, 241, 0.3)",
                }}
                className={`absolute ${card.position} z-20 flex items-center space-x-3.5 rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} p-4 shadow-xl backdrop-blur-xl transition-colors duration-300 cursor-pointer`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 shadow-inner">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">{card.title}</h3>
                  <p className="text-xs text-slate-500">{card.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors shadow-sm"
              >
                <X size={18} />
              </button>

              {/* Simulated Video Player aspect-video */}
              <div className="relative aspect-video w-full bg-slate-50 border border-slate-200/50 flex flex-col items-center justify-center p-8">
                {/* Custom glowing particle nodes in preview */}
                <div className="absolute top-10 left-10 h-2 w-2 rounded-full bg-cyan-400 blur-[2px] animate-pulse" />
                <div className="absolute bottom-10 right-10 h-3 w-3 rounded-full bg-purple-500 blur-[3px] animate-pulse" />

                <div className="relative flex flex-col items-center space-y-4 text-center z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-[0_4px_12px_rgba(99,102,241,0.1)]">
                    <Sparkles size={28} className="animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900">Synapse Academy Dashboard Preview</h3>
                  <p className="text-sm text-slate-500 max-w-md">
                    Take interactive code tests, compile motion graphics live in the browser, and track your visual development progress.
                  </p>
                  <button
                    onClick={() => setIsVideoOpen(false)}
                    className="rounded-full bg-indigo-600 px-6 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-lg"
                  >
                    Close Demo
                  </button>
                </div>
                
                {/* Simulated playback bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-200">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-indigo-600 to-violet-600" 
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
