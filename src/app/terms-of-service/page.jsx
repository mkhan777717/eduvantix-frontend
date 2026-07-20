import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─────────────────────────────────────────────
   Terms of Service Metadata
───────────────────────────────────────────── */
export const metadata = {
  title: "Terms of Service — Eduvantix",
  description:
    "Read the Eduvantix Terms of Service. By using Eduvantix, you agree to these terms set by DatamindX Technologies Pvt. Ltd. governing platform access, user conduct, and intellectual property.",
  keywords: [
    "Eduvantix terms of service",
    "Eduvantix terms and conditions",
    "DatamindX terms",
    "EdTech platform terms",
    "online learning terms of use",
  ],
  alternates: {
    canonical: "https://eduvantix.com/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://eduvantix.com/terms-of-service",
    title: "Terms of Service — Eduvantix",
    description:
      "The terms and conditions governing your use of the Eduvantix learning platform by DatamindX Technologies.",
    siteName: "Eduvantix",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    site: "@eduvantix",
    title: "Terms of Service — Eduvantix",
  },
};

/* ─────────────────────────────────────────────
   Terms of Service JSON-LD
───────────────────────────────────────────── */
const termsJsonLd = {
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
      name: "Terms of Service",
      item: "https://eduvantix.com/terms-of-service",
    },
  ],
};

export default function TermsOfService() {
  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />

      <Navbar />
      <main className="flex-grow" id="main-content">
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-[var(--text-secondary)]">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <ol className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              <li><a href="/" style={{ color: "var(--accent-primary)" }}>Home</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Terms of Service</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">
            Terms of Service
          </h1>

          <div className="space-y-6 text-sm md:text-base leading-relaxed">
            <p>
              <time dateTime="2025-01-01">Last updated: January 1, 2025</time>
            </p>

            <section aria-labelledby="acceptance-heading">
              <h2 id="acceptance-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using Eduvantix, a product by DatamindX (
                <a
                  href="https://datamindx.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[var(--text-primary)]"
                  aria-label="Visit DatamindX website (opens in new tab)"
                >
                  datamindx.in
                </a>
                ), you accept and agree to be bound by the terms and provision
                of this agreement.
              </p>
            </section>

            <section aria-labelledby="services-heading">
              <h2 id="services-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                2. Platform Services
              </h2>
              <p>
                Eduvantix provides an educational platform including, but not
                limited to, live classes, course catalogs, contest hubs, and
                interactive coding environments. We reserve the right to modify
                or discontinue, temporarily or permanently, the platform (or
                any part thereof) with or without notice.
              </p>
            </section>

            <section aria-labelledby="conduct-heading">
              <h2 id="conduct-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                3. User Conduct
              </h2>
              <p>You agree to not use the platform to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Upload, post, email or otherwise transmit any content that is
                  unlawful, harmful, threatening, abusive, or harassing.
                </li>
                <li>
                  Impersonate any person or entity, or falsely state or
                  otherwise misrepresent your affiliation with a person or
                  entity.
                </li>
                <li>
                  Interfere with or disrupt the platform or servers or networks
                  connected to the platform.
                </li>
                <li>
                  Violate any applicable local, state, national or international
                  law.
                </li>
              </ul>
            </section>

            <section aria-labelledby="ip-heading">
              <h2 id="ip-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                4. Intellectual Property
              </h2>
              <p>
                All content on the platform, including text, graphics, logos,
                and software, is the property of Eduvantix and DataMindx, or
                its content suppliers, and is protected by international
                copyright laws.
              </p>
            </section>

            <section aria-labelledby="liability-heading">
              <h2 id="liability-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                5. Limitation of Liability
              </h2>
              <p>
                In no event shall Eduvantix, DataMindx, nor its directors,
                employees, partners, agents, suppliers, or affiliates, be
                liable for any indirect, incidental, special, consequential or
                punitive damages, including without limitation, loss of profits,
                data, use, goodwill, or other intangible losses, resulting from
                your access to or use of or inability to access or use the
                Service.
              </p>
            </section>

            <section aria-labelledby="contact-tos-heading">
              <h2 id="contact-tos-heading" className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                6. Contact Information
              </h2>
              <p>
                For any questions about these Terms, please reach out to us
                through our website or our parent company DataMindx at{" "}
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
