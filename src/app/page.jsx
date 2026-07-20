import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tracks from "@/components/Tracks";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import InstituteCallout from "@/components/InstituteCallout";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ParticleCursor from "@/components/ParticleCursor";
import ScrollProgress from "@/components/ScrollProgress";

/* ─────────────────────────────────────────────
   Homepage Metadata
   Optimised for: AI Courses, Free Tech Courses,
   Online Learning Platform, Coding Bootcamp,
   Full Stack Development, Generative AI, etc.
───────────────────────────────────────────── */
export const metadata = {
  title: "Eduvantix — AI-Powered Tech Learning Platform India",
  description:
    "Learn AI, Generative AI, Full Stack Development, Machine Learning & more on Eduvantix. Free & premium tech courses with live classes, coding contests & expert mentorship. India's #1 AI EdTech platform.",
  keywords: [
    "AI courses India",
    "free tech courses online",
    "online learning platform",
    "coding bootcamp India",
    "full stack development course",
    "generative AI course",
    "AI agents course",
    "machine learning course",
    "programming courses for beginners",
    "career upskilling tech",
    "software engineering course",
    "interview preparation coding",
    "tech certifications online",
    "AI learning platform India",
    "EdTech India",
    "live coding classes",
    "React course free",
    "Next.js course",
    "Node.js course",
    "Python machine learning",
    "DevOps course",
    "Eduvantix",
    "DatamindX",
  ],
  alternates: {
    canonical: "https://eduvantix.com",
    types: {
      "application/rss+xml": "https://eduvantix.com/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    url: "https://eduvantix.com",
    title: "Eduvantix — AI-Powered Tech Learning Platform India",
    description:
      "Free & premium AI, Full Stack, ML, DevOps courses with live classes & coding contests. Build real-world projects and launch your tech career.",
    siteName: "Eduvantix",
    locale: "en_IN",
    images: [
      {
        url: "/logo-black-text.webp",
        width: 1200,
        height: 630,
        alt: "Eduvantix — AI-Powered Tech Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@eduvantix",
    title: "Eduvantix — AI-Powered Tech Learning Platform India",
    description:
      "Free & premium AI, Full Stack, ML, DevOps courses with live classes & coding contests.",
    images: ["/logo-black-text.webp"],
  },
};

/* ─────────────────────────────────────────────
   Homepage JSON-LD Structured Data
───────────────────────────────────────────── */
const homepageJsonLd = [
  /* FAQPage */
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Eduvantix?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eduvantix is an AI-powered EdTech platform by DatamindX Technologies Pvt. Ltd. that offers free and premium courses in AI, Generative AI, Full Stack Development, Machine Learning, DevOps, and more — along with live classes, coding contests, and expert mentorship.",
        },
      },
      {
        "@type": "Question",
        name: "Are Eduvantix courses free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Eduvantix offers a large catalog of free tech courses including React, Node.js, Next.js, Python, and more. Premium plans unlock live classes, mentorship, and advanced AI courses.",
        },
      },
      {
        "@type": "Question",
        name: "What courses does Eduvantix offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eduvantix offers courses in: Generative AI, Machine Learning & AI, React.js, Next.js, Node.js, Full Stack Web Development, DevOps & CI/CD, Flutter, React Native, MongoDB, Cloud Computing, Cybersecurity, Data Science, Blockchain & Web3, and Trending Tech Stack.",
        },
      },
      {
        "@type": "Question",
        name: "Does Eduvantix offer live classes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Eduvantix offers live interactive coding classes with expert instructors, real-time chat, polls, and leaderboards. Live classes are part of premium and institutional plans.",
        },
      },
      {
        "@type": "Question",
        name: "Is Eduvantix suitable for beginners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Eduvantix has courses for all levels — from complete beginners learning HTML/CSS/JavaScript to advanced learners diving into Generative AI, Blockchain, and Cloud Computing.",
        },
      },
      {
        "@type": "Question",
        name: "Who is behind Eduvantix?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eduvantix is built and maintained by DatamindX Technologies Pvt. Ltd., a company with deep expertise in data solutions and software engineering.",
        },
      },
    ],
  },
  /* ItemList — course highlights */
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Courses on Eduvantix",
    description:
      "Top AI and tech courses available on Eduvantix — India's AI-powered learning platform.",
    url: "https://eduvantix.com/courses",
    numberOfItems: 15,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Course",
          name: "Generative AI Specialist",
          url: "https://eduvantix.com/courses/generative-ai",
          description:
            "Explore neural nets transformers, build autonomous prompt workflows, construct LangChain vector networks, and manage RAG search databases.",
          provider: {
            "@type": "Organization",
            name: "Eduvantix",
            url: "https://eduvantix.com",
          },
          timeRequired: "PT25H",
          educationalLevel: "Intermediate",
          inLanguage: "en",
          isAccessibleForFree: false,
          offers: {
            "@type": "Offer",
            category: "Paid",
            priceCurrency: "INR",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Course",
          name: "Machine Learning & AI",
          url: "https://eduvantix.com/courses/ml-ai",
          description:
            "Python analytics, NumPy arrays, scikit-learn models fitting, dataset classification, and neural networks integrations.",
          provider: {
            "@type": "Organization",
            name: "Eduvantix",
            url: "https://eduvantix.com",
          },
          timeRequired: "PT30H",
          educationalLevel: "Advanced",
          inLanguage: "en",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Course",
          name: "Full Stack Web Development",
          url: "https://eduvantix.com/courses/web-development",
          description:
            "Build structured, semantic, responsive webpages from scratch using HTML5, CSS3, and JavaScript.",
          provider: {
            "@type": "Organization",
            name: "Eduvantix",
            url: "https://eduvantix.com",
          },
          timeRequired: "P16W",
          educationalLevel: "Beginner",
          inLanguage: "en",
          isAccessibleForFree: true,
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Global JSON-LD for homepage */}
      {homepageJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Global chrome */}
      <ScrollProgress />
      <ParticleCursor />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main className="flex-grow" id="main-content">
        <Hero />
        <Tracks />
        <Process />
        <Testimonials />
        <Pricing />
        <InstituteCallout />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
