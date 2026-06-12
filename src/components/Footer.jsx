"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";

const TwitterIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Footer() {
  const footerLinks = [
    {
      title: "Learning Tracks",
      links: [
        { name: "Creative Motion", href: "#tracks" },
        { name: "Frontend Architect", href: "#tracks" },
        { name: "AI Agents & LLMs", href: "#tracks" },
        { name: "UI/UX Craftsmanship", href: "#tracks" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Syllabus Download", href: "#" },
        { name: "Interactive Sandboxes", href: "#" },
        { name: "Discord Community", href: "#" },
        { name: "Recruiter Alignment", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Synapse", href: "#" },
        { name: "Academy Blog", href: "#" },
        { name: "Student Work", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
  ];

  const socialIcons = [
    { icon: <TwitterIcon />, href: "#" },
    { icon: <GithubIcon />, href: "#" },
    { icon: <MessageSquare size={18} />, href: "#" },
    { icon: <YoutubeIcon />, href: "#" },
  ];

  return (
    <footer
      className="relative pt-20 pb-12 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-primary)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">

        {/* Upper Link Row */}
        <div
          className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-16"
          style={{ borderBottom: "1px solid var(--border-primary)" }}
        >
          {/* Logo column */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="flex items-center space-x-2 text-xl font-bold font-display tracking-tight group">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-[0_4px_10px_rgba(99,102,241,0.25)]"
                style={{ background: "var(--accent-gradient)" }}
              >
                <Sparkles size={14} />
              </div>
              <span style={{ color: "var(--text-primary)" }}>Synapse</span>
            </a>
            <p className="text-xs max-w-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Synthesizing engineering precision with high-end creative design. Learn advanced tools and motion logic through direct interactive play.
            </p>
          </div>

          {/* Nav columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4
                className="text-xs font-bold font-display uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs transition-colors duration-200"
                      style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={(e) => (e.target.style.color = "var(--text-accent)")}
                      onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Lower Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12">
          {/* Copyright */}
          <div className="text-[11px] order-2 sm:order-1 text-center sm:text-left" style={{ color: "var(--text-muted)" }}>
            <p>© {new Date().getFullYear()} Synapse Academy Inc. All rights reserved.</p>
            <p className="mt-1">
              Developed in flow state using Next.js & Framer Motion.{" "}
              <span className="mx-1" style={{ color: "var(--border-primary)" }}>|</span>
              <a href="#" className="transition-colors" style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--text-accent)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
              >Privacy Policy</a>
              <span className="mx-1" style={{ color: "var(--border-primary)" }}>|</span>
              <a href="#" className="transition-colors" style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--text-accent)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
              >Terms of Service</a>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 order-1 sm:order-2">
            {socialIcons.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-all"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  border: "1px solid var(--border-primary)",
                  color: "var(--text-secondary)",
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
