"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const codeSnippets = [
  `const coder = new Developer({
    skills: "advanced",
    confidence: "high"
  });
  
  await coder.code();
  await coder.grow();
  
  return "Code Better. Think Bigger.";`,

  `const journey = new Student({
    learning: "daily",
    determination: "strong"
  });
  
  await journey.learn();
  await journey.code();
  
  return "Learn Code. Build AI.";`,

  `const creator = new Innovator({
    ideas: "endless",
    vision: "real"
  });
  
  await creator.ideate();
  await creator.execute();
  
  return "From Ideas. To Reality.";`,
];

export default function CodeWindow({ dark, onStateChange }) {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let currentText = "";
    const targetText = codeSnippets[snippetIndex];
    let i = 0;

    // Notify parent immediately when snippet starts
    onStateChange(snippetIndex);

    const interval = setInterval(() => {
      currentText += targetText[i];
      setTypedText(currentText);
      i++;
      if (i === targetText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
        }, 3500); // Wait 3.5 seconds before next snippet
      }
    }, 35); // typing speed

    return () => clearInterval(interval);
  }, [snippetIndex, onStateChange]);

  // Basic manual syntax highlighting
  const renderText = (text) => {
    return text.split("\n").map((line, idx) => {
      // Split by words, quotes, and punctuation
      const tokens = line.split(/(\b(?:const|new|await|return)\b|["'{}:,()])/g);

      let inString = false;

      return (
        <div key={idx} className="leading-relaxed whitespace-pre" style={{ color: dark ? "#d1d5db" : "#475569" }}>
          {tokens.map((token, tIdx) => {
            if (!token) return null;

            if (token === '"') {
              inString = !inString;
              return <span key={tIdx} style={{ color: dark ? "#6ee7b7" : "#059669" }}>{token}</span>;
            }

            if (inString) {
              return <span key={tIdx} style={{ color: dark ? "#6ee7b7" : "#059669" }}>{token}</span>;
            }

            let color = "inherit";
            if (["const", "new", "await", "return"].includes(token)) {
              color = dark ? "#f472b6" : "#db2777"; // Pink for keywords
            } else if (["{", "}", ":", ",", "(", ")"].includes(token)) {
              color = dark ? "#9ca3af" : "#6b7280"; // Gray for punctuation
            }

            return <span key={tIdx} style={{ color }}>{token}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 20 }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full rounded-2xl overflow-hidden relative z-10"
      style={{
        backgroundColor: dark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.55)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.45)",
        boxShadow: dark ? "0 25px 80px rgba(0,0,0,0.6)" : "0 25px 80px rgba(0,0,0,0.1)"
      }}
    >
      {/* Top Bar - macOS style */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <div className="ml-4 text-[10px] font-mono tracking-widest uppercase opacity-40">script.js</div>
      </div>

      {/* Code Editor Area */}
      <div className="p-6 md:p-8 font-mono text-[13px] sm:text-sm h-[260px] flex flex-col justify-start relative">
        <div className="absolute left-4 top-8 bottom-8 w-4 flex flex-col text-[10px] opacity-20 text-right space-y-[11px] select-none">
          {Array.from({ length: 9 }).map((_, i) => <span key={i}>{i + 1}</span>)}
        </div>
        <div className="pl-6">
          {renderText(typedText)}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-[8px] h-4 inline-block align-middle ml-1"
            style={{ backgroundColor: dark ? "#6ee7b7" : "#059669" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
