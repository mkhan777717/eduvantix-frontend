import CoursesClient from "./CoursesClient";

/* ─────────────────────────────────────────────
   Courses Listing Page Metadata
   This page is public and should be indexed.
   Overrides the dashboard group noindex.
───────────────────────────────────────────── */
export const metadata = {
  title: "All Tech & AI Courses — Learn Free Online | Eduvantix",
  description:
    "Browse 15+ free and premium tech courses on Eduvantix: Generative AI, Machine Learning, React, Next.js, Node.js, Full Stack Web Development, DevOps, Flutter, Data Science, Blockchain & more. Start learning today.",
  keywords: [
    "free AI courses online",
    "free tech courses India",
    "Generative AI course",
    "machine learning course free",
    "React course online",
    "Next.js course",
    "Node.js course",
    "full stack web development course",
    "DevOps course free",
    "Flutter course",
    "Data Science course",
    "blockchain course online",
    "cybersecurity course",
    "cloud computing course",
    "programming courses for beginners",
    "Eduvantix courses",
    "tech courses India",
  ],
  alternates: {
    canonical: "https://eduvantix.com/courses",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: "https://eduvantix.com/courses",
    title: "All Tech & AI Courses — Free Online Learning | Eduvantix",
    description:
      "15+ free and premium courses in AI, Full Stack, ML, DevOps, Data Science & more. Learn from industry experts on India's top EdTech platform.",
    siteName: "Eduvantix",
    locale: "en_IN",
    images: [
      {
        url: "/logo-black-text.webp",
        width: 1200,
        height: 630,
        alt: "Eduvantix Tech & AI Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@eduvantix",
    title: "All Tech & AI Courses — Free Online Learning | Eduvantix",
    description: "15+ free & premium courses in AI, Full Stack, ML, DevOps & more.",
    images: ["/logo-black-text.webp"],
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
