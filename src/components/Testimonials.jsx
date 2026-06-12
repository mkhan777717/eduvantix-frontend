"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, Quote, ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Senior Creative Developer",
    company: "Vercel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote: "Synapse completely changed how I study. The interactive code sandboxes made complex WebGL matrix math and shader math click immediately. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Aria Chen",
    role: "Interaction Designer",
    company: "Framer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote: "The interactive feedback loop is incredible. The AI mentor evaluates layout efficiency and framer-motion stagger delays faster and with more depth than traditional courses.",
    rating: 5,
  },
  {
    id: 3,
    name: "Devon Reynolds",
    role: "Frontend Engineer",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote: "I launched my entire creative portfolio while working through the advanced tracks. The platform makes educational design feel like a high-end AAA game.",
    rating: 5,
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Technical Artist",
    company: "Epic Games",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    quote: "The shader math tracks and layoutId animations are masterfully explained. Truly standard-setting documentation and interactive playgrounds.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  const slideLeft = () => {
    if (carousel.current) {
      carousel.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    if (carousel.current) {
      carousel.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden" style={{ backgroundColor: "var(--bg-secondary)" }}>
      {/* Background Gradients */}
      <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: "var(--accent-glow)" }} />
      <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: "var(--accent-glow)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Header with Navigation Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
              <MessageSquare size={12} />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight" style={{ color: "var(--text-primary)" }}>
              Endorsed by Top Creators
            </h2>
            <p className="text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
              Read how developers, designers, and creative technologists around the globe level up their day-to-day skills with Synapse.
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={slideLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all focus:outline-none shadow-sm"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={slideRight}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all focus:outline-none shadow-sm"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Draggable Carousel */}
        <motion.div
          ref={carousel}
          className="cursor-grab active:cursor-grabbing overflow-x-auto scrollbar-none flex gap-8 pb-8"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-8"
          >
            {testimonials.map((test) => (
              <motion.div
                key={test.id}
                className="w-[300px] sm:w-[380px] shrink-0 select-none rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative group transition-colors duration-300"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-card)" }}
              >
                <Quote size={48} className="absolute top-6 right-6 pointer-events-none" style={{ color: "var(--border-primary)" }} />

                {/* Rating & Quote */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={14} style={{ fill: "var(--accent-primary)", color: "var(--accent-primary)" }} />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: "var(--text-secondary)" }}>
                    "{test.quote}"
                  </p>
                </div>

                {/* Profile Row */}
                <div className="flex items-center space-x-4 mt-8 pt-6" style={{ borderTop: "1px solid var(--border-primary)" }}>
                  <div className="relative h-12 w-12 overflow-hidden rounded-full" style={{ border: "2px solid var(--border-accent)" }}>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white uppercase" style={{ background: "var(--accent-gradient)" }}>
                      {test.name.charAt(0)}{test.name.split(" ")[1]?.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-display" style={{ color: "var(--text-primary)" }}>{test.name}</h4>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {test.role} at <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{test.company}</span>
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Drag Hint */}
        <div className="text-center mt-4 text-xs text-slate-500 flex items-center justify-center space-x-2">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse" />
          <span>Swipe or drag horizontal track to view all reviews</span>
        </div>

      </div>
    </section>
  );
}
