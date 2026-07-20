import InstitutesClient from "./InstitutesClient";

/* ─────────────────────────────────────────────
   Institutes Page Metadata (B2B)
   Targets educational institutions looking
   to partner with Eduvantix for LMS/training.
───────────────────────────────────────────── */
export const metadata = {
  title: "Eduvantix for Institutions — AI-Powered LMS for Colleges & Schools",
  description:
    "Partner with Eduvantix to power your institution with an AI-driven learning management system. Offer AI courses, live classes, coding contests, and mentorship to your students. Trusted by DatamindX Technologies.",
  keywords: [
    "EdTech for colleges",
    "LMS for institutes",
    "AI learning management system India",
    "coding platform for colleges",
    "online learning for universities",
    "EdTech B2B India",
    "Eduvantix for institutions",
    "institute LMS partnership",
    "tech courses for colleges",
    "digital learning platform for schools",
    "DatamindX institute plan",
  ],
  alternates: {
    canonical: "https://eduvantix.com/institutes",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://eduvantix.com/institutes",
    title: "Eduvantix for Institutions — AI-Powered LMS for Colleges & Schools",
    description:
      "Empower your institution with Eduvantix: AI courses, live classes, coding contests, and expert mentorship — all in one platform.",
    siteName: "Eduvantix",
    locale: "en_IN",
    images: [
      {
        url: "/logo-black-text.webp",
        width: 1200,
        height: 630,
        alt: "Eduvantix for Educational Institutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@eduvantix",
    title: "Eduvantix for Institutions — AI-Powered LMS",
    description:
      "AI courses, live classes, and coding contests for your college or school. Partner with Eduvantix.",
    images: ["/logo-black-text.webp"],
  },
};

export default function InstitutesPage() {
  return <InstitutesClient />;
}
