import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────
   Privacy Policy Metadata
───────────────────────────────────────────── */
export const metadata = {
  title: "Privacy Policy — Eduvantix",
  description:
    "Read the Eduvantix Privacy Policy to understand how we collect, use, and protect your personal data. Eduvantix is a product of DatamindX Technologies Pvt. Ltd.",
  keywords: [
    "Eduvantix privacy policy",
    "data privacy EdTech",
    "Eduvantix data collection",
    "DatamindX privacy",
  ],
  alternates: {
    canonical: "https://eduvantix.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://eduvantix.com/privacy-policy",
    title: "Privacy Policy — Eduvantix",
    description:
      "How Eduvantix collects, uses, and protects your personal information. Transparency is a core value.",
    siteName: "Eduvantix",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    site: "@eduvantix",
    title: "Privacy Policy — Eduvantix",
  },
};

/* ─────────────────────────────────────────────
   Privacy Policy JSON-LD
───────────────────────────────────────────── */
const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://eduvantix.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Privacy Policy",
      item: "https://eduvantix.com/privacy-policy",
    },
  ],
};

export default function PrivacyPolicy() {
  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />

      <Navbar />
      <main className="flex-grow" id="main-content">
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-[var(--text-secondary)]">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <ol className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              <li><a href="/" style={{ color: "var(--accent-primary)" }}>Home</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Privacy Policy</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-sm md:text-base leading-relaxed">
            <p>
              <time dateTime="2025-01-01">Last updated: January 1, 2025</time>
            </p>

            <section aria-labelledby="intro-heading">
              <h2 id="intro-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                1. Introduction
              </h2>
              <p>
                Welcome to Eduvantix, a product by DatamindX (
                <a
                  href="https://datamindx.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[var(--text-primary)]"
                  aria-label="Visit DatamindX website (opens in new tab)"
                >
                  datamindx.in
                </a>
                ). This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you visit our website and
                use our platform.
              </p>
            </section>

            <section aria-labelledby="collection-heading">
              <h2 id="collection-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                2. Information We Collect
              </h2>
              <p>
                We may collect personal identification information from Users
                in a variety of ways, including, but not limited to, when Users
                visit our site, register on the site, subscribe to the
                newsletter, and in connection with other activities, services,
                features or resources we make available on our Site.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <strong>Personal Data:</strong> Name, email address, phone
                  number, and other similar information.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information on how the platform
                  is accessed and used, such as IP address, browser type, pages
                  visited, and time spent on pages.
                </li>
                <li>
                  <strong>Platform Data:</strong> Progress in courses, contest
                  performance, and activity in live classes.
                </li>
              </ul>
            </section>

            <section aria-labelledby="usage-heading">
              <h2 id="usage-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                3. How We Use Your Information
              </h2>
              <p>Eduvantix and DataMindx use the collected data for various purposes:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>To provide and maintain our platform</li>
                <li>To notify you about changes to our platform</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our platform</li>
                <li>To monitor the usage of our platform</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section aria-labelledby="security-heading">
              <h2 id="security-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                4. Security of Data
              </h2>
              <p>
                The security of your data is important to us, but remember
                that no method of transmission over the Internet, or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your Personal Data, we
                cannot guarantee its absolute security.
              </p>
            </section>

            <section aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                5. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us or our parent company, DataMindx, at{" "}
                <a
                  href="https://datamindx.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[var(--text-primary)]"
                  aria-label="Visit DatamindX (opens in new tab)"
                >
                  datamindx.in
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
