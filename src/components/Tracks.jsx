"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, BookOpen, Clock, Users, ArrowRight, Zap } from "lucide-react";

const tracksData = {
  motion: [
    {
      id: "m-1",
      title: "Interactive Web Animation with Framer Motion",
      duration: "14 hrs",
      lessons: 28,
      students: "3.4k",
      difficulty: "Intermediate",
      gradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
      color: "text-purple-600 border-purple-100 bg-purple-50/50",
    },
    {
      id: "m-2",
      title: "Introduction to Three.js & 3D WebGL Spaces",
      duration: "20 hrs",
      lessons: 35,
      students: "2.1k",
      difficulty: "Advanced",
      gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
      color: "text-cyan-600 border-cyan-100 bg-cyan-50/50",
    },
    {
      id: "m-3",
      title: "SVG Animation Mechanics & Micro-interactions",
      duration: "8 hrs",
      lessons: 14,
      students: "1.8k",
      difficulty: "Beginner",
      gradient: "from-pink-500/10 via-rose-500/5 to-transparent",
      color: "text-pink-600 border-pink-100 bg-pink-50/50",
    },
  ],
  frontend: [
    {
      id: "f-1",
      title: "Advanced React 19 Ecosystem & Server Actions",
      duration: "18 hrs",
      lessons: 30,
      students: "4.2k",
      difficulty: "Advanced",
      gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
      color: "text-blue-600 border-blue-100 bg-blue-50/50",
    },
    {
      id: "f-2",
      title: "Next.js Full-Stack Architecture & App Router",
      duration: "22 hrs",
      lessons: 45,
      students: "5.1k",
      difficulty: "Intermediate",
      gradient: "from-indigo-500/10 via-purple-500/5 to-transparent",
      color: "text-indigo-600 border-indigo-100 bg-indigo-50/50",
    },
    {
      id: "f-3",
      title: "CSS Architecture: Custom Properties & Tailwind Core",
      duration: "10 hrs",
      lessons: 18,
      students: "2.9k",
      difficulty: "Beginner",
      gradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
      color: "text-teal-600 border-teal-100 bg-teal-50/50",
    },
  ],
  ai: [
    {
      id: "a-1",
      title: "Introduction to LLMs, Neural Nets, & Transformers",
      duration: "25 hrs",
      lessons: 40,
      students: "3.9k",
      difficulty: "Intermediate",
      gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
      color: "text-amber-700 border-amber-100 bg-amber-50/50",
    },
    {
      id: "a-2",
      title: "Building Autonomous Agents with LangChain",
      duration: "16 hrs",
      lessons: 24,
      students: "1.5k",
      difficulty: "Advanced",
      gradient: "from-red-500/10 via-orange-500/5 to-transparent",
      color: "text-red-600 border-red-100 bg-red-50/50",
    },
    {
      id: "a-3",
      title: "Prompt Engineering & Vector Databases",
      duration: "9 hrs",
      lessons: 15,
      students: "2.6k",
      difficulty: "Beginner",
      gradient: "from-yellow-500/10 via-amber-500/5 to-transparent",
      color: "text-amber-600 border-yellow-200 bg-yellow-50/50",
    },
  ],
  ux: [
    {
      id: "u-1",
      title: "Interactive Prototype Design in Figma",
      duration: "12 hrs",
      lessons: 20,
      students: "2.7k",
      difficulty: "Beginner",
      gradient: "from-fuchsia-500/10 via-purple-500/5 to-transparent",
      color: "text-fuchsia-600 border-fuchsia-100 bg-fuchsia-50/50",
    },
    {
      id: "u-2",
      title: "Design Systems & High-Fidelity Styling Handshake",
      duration: "15 hrs",
      lessons: 25,
      students: "1.9k",
      difficulty: "Intermediate",
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      color: "text-emerald-600 border-emerald-100 bg-emerald-50/50",
    },
    {
      id: "u-3",
      title: "Cognitive UX: Psychology behind User Retention",
      duration: "14 hrs",
      lessons: 22,
      students: "2.2k",
      difficulty: "Advanced",
      gradient: "from-cyan-500/10 via-indigo-500/5 to-transparent",
      color: "text-cyan-600 border-cyan-100 bg-cyan-50/50",
    },
  ],
};

const tabList = [
  { id: "motion", name: "Creative Motion" },
  { id: "frontend", name: "Frontend Architect" },
  { id: "ai", name: "AI Agents" },
  { id: "ux", name: "UX/UI Craft" },
];

export default function Tracks() {
  const [activeTab, setActiveTab] = useState("motion");
  const [hoveredCourseId, setHoveredCourseId] = useState(null);

  return (
    <section id="tracks" className="relative py-24 bg-slate-50">
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 left-0 h-96 w-96 rounded-full bg-cyan-100/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 h-96 w-96 rounded-full bg-purple-100/25 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
            <Zap size={12} />
            <span>Interactive Curriculum Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
            Choose Your Learning Specialization
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Switch between pathways to explore hands-on tracks. Each specialization includes multiple masterclasses, micro-projects, and an official certification.
          </p>
        </div>

        {/* Tab Buttons Container */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-200/50 p-1.5 backdrop-blur-md">
            {tabList.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                  activeTab === tab.id ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTrackTab"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full border border-indigo-500/20 shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {tracksData[activeTab].map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredCourseId(course.id)}
                onMouseLeave={() => setHoveredCourseId(null)}
                onClick={() => {
                  if (activeTab === "ai") {
                    window.location.href = "/courses/generative-ai";
                  } else {
                    const el = document.getElementById("pricing");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="group relative flex flex-col justify-between h-full rounded-2xl border border-slate-200 bg-white p-6 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Dynamic Gradient Backdrop Glow */}
                <div className={`absolute inset-0 z-0 bg-gradient-to-br ${course.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Content */}
                <div className="relative z-10 space-y-6">
                  {/* Badge Row */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold font-display uppercase tracking-wider ${course.color} px-2.5 py-1 rounded-md border`}>
                      {course.difficulty}
                    </span>
                    <div className="flex items-center space-x-1 text-slate-500 text-xs font-medium">
                      <Users size={12} />
                      <span>{course.students}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 leading-snug">
                    {course.title}
                  </h3>
                </div>

                {/* Footer Metrics & Actions */}
                <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} className="text-slate-400" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen size={12} className="text-slate-400" />
                      <span>{course.lessons} Modules</span>
                    </div>
                  </div>

                  {/* Dynamic Progress micro-interaction */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Curriculum Depth</span>
                      <span>100% Core</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: hoveredCourseId === course.id ? "100%" : "30%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-600 to-cyan-600"
                      />
                    </div>
                  </div>

                  {/* Enroll button transition */}
                  <motion.div
                    animate={{ x: hoveredCourseId === course.id ? 4 : 0 }}
                    className={`inline-flex items-center space-x-1.5 text-sm font-semibold transition-colors duration-300 ${
                      hoveredCourseId === course.id ? "text-cyan-600" : "text-indigo-600"
                    }`}
                  >
                    <span>View Curriculum</span>
                    <ArrowRight size={14} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
