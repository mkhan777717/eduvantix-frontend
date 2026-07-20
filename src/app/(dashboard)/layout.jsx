import DashboardLayout from "@/components/DashboardLayout";

/* ─────────────────────────────────────────────
   Dashboard Group Layout Metadata
   All routes in this route group (/courses,
   /student, /admin, /mentor, /contest, etc.)
   inherit noindex so authenticated pages are
   never indexed by search engines.
───────────────────────────────────────────── */
export const metadata = {
  title: {
    default: "Dashboard — Eduvantix",
    template: "%s | Eduvantix Dashboard",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootDashboardLayout({ children }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
