import LoginClient from "./LoginClient";

/* ─────────────────────────────────────────────
   Login Page Metadata
   noindex — auth pages should never appear in
   search results.
───────────────────────────────────────────── */
export const metadata = {
  title: "Sign In — Eduvantix",
  description:
    "Sign in or create your free Eduvantix account to access AI courses, live classes, and coding contests.",
  alternates: {
    canonical: "https://eduvantix.com/login",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Sign In — Eduvantix",
    description: "Access your Eduvantix student, mentor, or admin portal.",
    url: "https://eduvantix.com/login",
    siteName: "Eduvantix",
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
