import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="relative flex min-h-screen flex-col" style={{ backgroundColor: "var(--bg-primary)" }}>
      <Navbar />
      <main className="flex-grow">
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-[var(--text-secondary)]">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]">Terms of Service</h1>
      
      <div className="space-y-6 text-sm md:text-base leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Eduvantix, a product by DatamindX (<a href="https://datamindx.in" target="_blank" rel="noopener noreferrer" className="underline text-[var(--text-primary)]">datamindx.in</a>), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">2. Platform Services</h2>
          <p>
            Eduvantix provides an educational platform including, but not limited to, live classes, course catalogs, contest hubs, and interactive coding environments. We reserve the right to modify or discontinue, temporarily or permanently, the platform (or any part thereof) with or without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">3. User Conduct</h2>
          <p>
            You agree to not use the platform to:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Upload, post, email or otherwise transmit any content that is unlawful, harmful, threatening, abusive, or harassing.</li>
            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            <li>Interfere with or disrupt the platform or servers or networks connected to the platform.</li>
            <li>Violate any applicable local, state, national or international law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">4. Intellectual Property</h2>
          <p>
            All content on the platform, including text, graphics, logos, and software, is the property of Eduvantix and DataMindx, or its content suppliers, and is protected by international copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">5. Limitation of Liability</h2>
          <p>
            In no event shall Eduvantix, DataMindx, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">6. Contact Information</h2>
          <p>
            For any questions about these Terms, please reach out to us through our website or our parent company DataMindx at <a href="https://datamindx.in" target="_blank" rel="noopener noreferrer" className="underline text-[var(--text-primary)]">datamindx.in</a>.
          </p>
        </section>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
