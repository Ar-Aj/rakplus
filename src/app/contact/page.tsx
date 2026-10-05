"use client";

/**
 * Contact Us — Premium B2B Inquiry Page
 *
 * Full-screen 6-Model 3D Hero Background with React Three Fiber.
 * Glassmorphism contact cards + frosted inquiry form.
 * All claims verified from catalog data: WRAS Approved, ISO 9001:2015,
 * German STD DIN 8077/78, DVS 2207, 50-year guarantee.
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Phone,
  ShieldCheck,
  Send,
  MapPin,
  Mail,
} from "lucide-react";

// Dynamic client-only import for R3F 3D Background
const ContactBackground3D = dynamic(
  () => import("@/components/3d/ContactBackground3D"),
  { ssr: false }
);

// ─── Product Requirement Options ───

const PRODUCT_OPTIONS = [
  "PP-R Green Pipe — SDR11 / PN10",
  "PP-R Green Pipe — SDR7.4 / PN16",
  "PP-R Green Pipe — SDR6 / PN20",
  "PP-R Green Pipe — SDR5 / PN25",
  "PP-R Yellow Pipe — SDR11 / PN10",
  "PP-R Yellow Pipe — SDR7.4 / PN16",
  "PP-R Yellow Pipe — SDR6 / PN20",
  "PP-R Yellow Pipe — SDR5 / PN25",
  "PP-R Green Fittings — SDR6 / PN20",
  "PP-R Yellow Fittings — SDR6 / PN20",
  "PEX Systems",
  "Engineering Specification / Consultation",
] as const;

// ─── JSON-LD Structured Data ───

const jsonLdContactPage = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Rakplus",
  description:
    "Request technical datasheets and bulk quotations for WRAS-approved PP-R pipe systems.",
  mainEntity: {
    "@type": "Organization",
    name: "RakPlus by Aquasmart Plastic Industries L.L.C",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industrial Area",
      addressLocality: "Umm Al Quwain",
      addressRegion: "Umm Al Quwain",
      addressCountry: "AE",
    },
    telephone: "+97165233869",
    email: "Info@Rakplusuae.com",
    url: "https://rakplus.com",
    areaServed: ["AE", "SA", "QA", "KW", "BH", "OM"],
    brand: { "@type": "Brand", name: "Rakplus" },
  },
};

// ─── Contact Info Cards ───

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Factory & Headquarters",
    detail: "Industrial Area, Umm Al Quwain, U.A.E.",
  },
  {
    icon: Phone,
    title: "Direct Line",
    detail: "+971 6 523 3869",
    href: "tel:+97165233869",
  },
  {
    icon: Mail,
    title: "Email Inquiries",
    detail: "Info@Rakplusuae.com",
    href: "mailto:Info@Rakplusuae.com",
  },
  {
    icon: ShieldCheck,
    title: "Technical Verification",
    detail: "ISO 9001:2015 & WRAS Compliance Desk",
  },
];

// ─── Page Component ───

export default function ContactPage() {
  const [formState, setFormState] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    productRequirement: "",
    volume: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset after 4 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormState({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        productRequirement: "",
        volume: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <main className="relative overflow-hidden min-h-screen">
      {/* ─── JSON-LD ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdContactPage),
        }}
      />

      {/* ─── Dynamic 3D Hero Background (Behind Everything) ─── */}
      <div className="absolute inset-0 z-0">
        <ContactBackground3D />
      </div>

      {/* ─── Foreground Page Content ─── */}
      <div className="relative z-10 pt-28 lg:pt-36 pb-20 lg:pb-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ═══ LEFT COLUMN — Brand Positioning (5 cols) ═══ */}
          <div className="lg:col-span-5 space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-white/60 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-[0.2em]">
                UAE &amp; GCC Plumbing Specifications
              </span>
            </div>

            {/* Heading — German flag typography */}
            <h1
              className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.1]"
              style={{ textWrap: "balance" }}
            >
              Connect with Our{" "}
              <span className="text-[#008c4a]">Technical</span> &amp;{" "}
              <span className="text-red-600">Engineering</span> Team
            </h1>

            {/* Body Text */}
            <p className="text-base text-neutral-700 leading-relaxed max-w-md font-medium">
              Engineered to{" "}
              <span className="text-red-600 font-bold">German STD DIN 8077/78</span>,
              Rakplus delivers{" "}
              <span className="text-yellow-600 font-bold">WRAS-approved</span>{" "}
              PP-R pipe systems for potable water compliance.
              Whether you are specifying for a commercial tower in
              Dubai or a residential development across the GCC —
              our technical team is ready to support your project.
            </p>

            {/* Contact Info Cards — Glassmorphism */}
            <div className="space-y-3 pt-2">
              {CONTACT_CARDS.map((card) => {
                const inner = (
                  <div
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl transition-all duration-200 hover:bg-white/80 hover:shadow-2xl"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-[#008c4a]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed mt-0.5 font-medium">
                        {card.detail}
                      </p>
                    </div>
                  </div>
                );
                return card.href ? (
                  <a key={card.title} href={card.href} className="block group">
                    {inner}
                  </a>
                ) : (
                  <div key={card.title}>{inner}</div>
                );
              })}
            </div>

            {/* Trust Badge Strip */}
            <div className="flex flex-wrap gap-2 pt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60 text-[#008c4a] text-[11px] font-bold tracking-wide shadow-sm">
                WRAS Approved
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200/60 text-red-600 text-[11px] font-bold tracking-wide shadow-sm">
                German Standard DIN
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/60 text-amber-700 text-[11px] font-bold tracking-wide shadow-sm">
                Full GCC Distribution
              </span>
              {/* German flag micro-stripe */}
              <span className="inline-flex items-center gap-0.5 px-3 py-1.5">
                <span className="w-3 h-1.5 bg-neutral-950 border border-neutral-300 rounded-sm" />
                <span className="w-3 h-1.5 bg-red-600 rounded-sm" />
                <span className="w-3 h-1.5 bg-yellow-400 rounded-sm" />
              </span>
            </div>
          </div>

          {/* ═══ RIGHT COLUMN — Inquiry Form (7 cols) ═══ */}
          <div className="lg:col-span-7">
            <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-8 lg:p-10">
              {/* Form Header */}
              <div className="mb-8">
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                  Request a Technical Datasheet &amp; Quote
                </h2>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed font-medium">
                  Fill in your project details and our technical sales
                  team will respond within 24 business hours.
                </p>
              </div>

              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                    <Send className="w-7 h-7 text-[#008c4a]" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-950 mb-2">
                    Inquiry Submitted
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-xs font-medium">
                    Our technical team will review your requirements and
                    respond within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formState.fullName}
                        onChange={handleChange}
                        placeholder="Ahmed Al Maktoum"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white shadow-sm transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2"
                      >
                        Company / Consulting Firm
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        placeholder="Al Futtaim Engineering"
                        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white shadow-sm transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2"
                      >
                        Corporate Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="ahmed@company.ae"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white shadow-sm transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2"
                      >
                        Contact Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="+971 50 123 4567"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white shadow-sm transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Product Requirement */}
                  <div>
                    <label
                      htmlFor="productRequirement"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2"
                    >
                      Product Requirement *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <select
                        id="productRequirement"
                        name="productRequirement"
                        required
                        value={formState.productRequirement}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-neutral-200 text-neutral-900 appearance-none focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white shadow-sm transition-all text-sm [&>option]:bg-white [&>option]:text-neutral-900"
                      >
                        <option value="" disabled>
                          Select a product category...
                        </option>
                        {PRODUCT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Volume / Sizes */}
                  <div>
                    <label
                      htmlFor="volume"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2"
                    >
                      Estimated Volume / Pipe Sizes Required{" "}
                      <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="volume"
                      name="volume"
                      value={formState.volume}
                      onChange={handleChange}
                      placeholder='e.g., 500m of 25mm PN20, 200m of 32mm PN16'
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white shadow-sm transition-all text-sm"
                    />
                  </div>

                  {/* Row 5: Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2"
                    >
                      Detailed Project Scope / Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Describe your project requirements, timeline, and any specific technical specifications needed..."
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white shadow-sm transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#008c4a] hover:bg-[#006e3a] text-white text-sm font-bold tracking-wide shadow-lg transition-all duration-200 border border-emerald-500/30 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-emerald-900/20 hover:-translate-y-0.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Request Technical Datasheet &amp; Quote</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-neutral-500 mt-3 font-medium">
                    Your data is handled securely and will not be shared
                    with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
