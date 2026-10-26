"use client";

/**
 * Contact Us — Premium B2B Inquiry Page (Client Shell)
 *
 * Phase 3 server-wrapper split: SEO metadata, H1, JSON-LD, and
 * SEOContentFallback now live in `page.tsx` (Server Component).
 * This file holds only the interactive form + UAE map background.
 *
 * Submission flow:
 *   1. Builds a pre-formatted RFQ email body.
 *   2. Opens the user's mail client via `mailto:info@rakplusuae.com`.
 *   3. ALSO POSTs the inquiry to a configurable Formspree / webhook
 *      endpoint (env: NEXT_PUBLIC_CONTACT_WEBHOOK_URL). If no webhook
 *      is configured, only the mailto is triggered.
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Phone,
  ShieldCheck,
  Send,
  MapPin,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import RelatedProducts from "@/components/RelatedProducts";
import SemanticLSIBlock from "@/components/SemanticLSIBlock";
import AeoTargetBlock from "@/components/AeoTargetBlock";
import BannerVideo from "@/components/ui/BannerVideo";

// Dynamic client-only import — original 6-pipe R3F background from
// commit ad798c7. Restored per user request.
const ContactBackground3D = dynamic(
  () =>
    import("@/components/3d/ContactBackground3D")
      .then((m) => m.default)
      // Transient chunk-load failures (stale .next cache, hot-reload race)
      // resolve to null so the decorative background silently skips itself
      // instead of throwing an unhandled ChunkLoadError that takes the
      // whole page down. Purely decorative — no functional impact.
      .catch(() => {
        return () => null;
      }),
  { ssr: false }
);

// ─── Lead Delivery Endpoints ─────────────────────────────────────────
// FormSubmit AJAX forwards the POST straight to the RakPlus inbox with no
// account/API key required, so the form works on day one. Set
// NEXT_PUBLIC_CONTACT_WEBHOOK_URL (see .env.example) to route submissions
// into Formspree / Zapier / Make instead.
const FORMSUBMIT_AJAX_ENDPOINT =
  "https://formsubmit.co/ajax/info@rakplusuae.com";

const SALES_EMAIL = "info@rakplusuae.com";
const SALES_PHONE_DISPLAY = "+971 6 744 4345";
const SALES_PHONE_E164 = "+97167444345";

// ─── Product Requirement Options (Catalogue-sourced) ───────────────

const PRODUCT_OPTIONS = [
  "PP-R Green Pipe — SDR11 / PN10 (Catalogue p.06)",
  "PP-R Green Pipe — SDR7.4 / PN16 (Catalogue p.06)",
  "PP-R Green Pipe — SDR6 / PN20 (Catalogue p.06)",
  "PP-R Green Pipe — SDR5 / PN25 (Catalogue p.07)",
  "PP-R Yellow Pipe — SDR11 / PN10 (Catalogue p.06)",
  "PP-R Yellow Pipe — SDR7.4 / PN16 (Catalogue p.06)",
  "PP-R Yellow Pipe — SDR6 / PN20 (Catalogue p.06)",
  "PP-R Yellow Pipe — SDR5 / PN25 (Catalogue p.07)",
  "PP-R Green/Yellow Fittings (Catalogue pp.08–14)",
  "Brass Transition Fittings & Valves (Catalogue pp.15–19)",
  "Engineering Specification / Consultation",
] as const;

// ─── Contact Info Cards (Catalogue-verified) ──────────────────────

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Factory & Headquarters",
    detail: "Industrial Area, Umm Al Quwain, U.A.E.",
    microdata: "streetAddress",
  },
  {
    icon: Phone,
    title: "Catalogue Direct Line",
    detail: "+971 6 744 4345",
    href: "tel:+97167444345",
    microdata: "telephone",
  },
  {
    icon: Phone,
    title: "Secondary Direct Line",
    detail: "+971 6 523 3869",
    href: "tel:+97165233869",
    microdata: "telephone",
  },
  {
    icon: Mail,
    title: "B2B & Engineering Email",
    detail: "info@rakplusuae.com",
    href: "mailto:info@rakplusuae.com",
    microdata: "email",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    detail: "Mon – Sat · 08:00 – 18:00 (GST, UTC+4)",
    microdata: "openingHours",
  },
  {
    icon: ShieldCheck,
    title: "Technical Verification",
    detail: "ISO 9001:2015 · ISO 14001:2015 · WRAS Compliance Desk",
  },
];

// ─── Form State Type ──────────────────────────────────────────────

interface InquiryFormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  productRequirement: string;
  volume: string;
  message: string;
}

const EMPTY_FORM: InquiryFormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  productRequirement: "",
  volume: "",
  message: "",
};

type SubmitState = "idle" | "submitting" | "success" | "fallback" | "error";

/** Which route actually carried the lead, for the confirmation copy. */
type DeliveryChannel = "webhook" | "formsubmit" | "manual";

// ─── Page Component (Client Shell) ────────────────────────────────

export default function ContactPageClient() {
  const [form, setForm] = useState<InquiryFormState>(EMPTY_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [lastSubmitted, setLastSubmitted] =
    useState<InquiryFormState>(EMPTY_FORM);
  const [deliveryChannel, setDeliveryChannel] =
    useState<DeliveryChannel>("formsubmit");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /** Plain-text version of the same RFQ, for WhatsApp's wa.me prefill. */
  const buildPlainBody = (data: InquiryFormState): string =>
    [
      `Name: ${data.fullName}`,
      `Company: ${data.company || "—"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "—"}`,
      "",
      `Product: ${data.productRequirement || "—"}`,
      `Volume: ${data.volume || "—"}`,
      "",
      data.message || "",
      "",
      "(Sent from rakplusuae.com/contact)",
    ]
      .join("\n")
      .trim();

  const buildMailtoHrefFor = (
    data: InquiryFormState,
    address: string
  ): string => {
    const subject = `RFQ · ${data.productRequirement || "General Inquiry"} · ${
      data.company || data.fullName
    }`;
    return `mailto:${address}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildPlainBody(data))}`;
  };

  const buildWhatsappHref = (data: InquiryFormState): string =>
    `https://wa.me/${SALES_PHONE_E164}?text=${encodeURIComponent(
      buildPlainBody(data)
    )}`;

  /**
   * LEAD DELIVERY — never lose a B2B inquiry.
   *
   * Resolution order:
   *   1. `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` (Formspree / Zapier / Make /
   *      custom endpoint) — POSTed as JSON.
   *   2. If that env var is NOT set, fall back to FormSubmit's AJAX
   *      endpoint, which forwards the lead server-side to
   *      info@rakplusuae.com with no third-party account required.
   *   3. If BOTH fail (offline, blocked host), the caller falls back to a
   *      1-click mailto/WhatsApp hand-off so the visitor still reaches a
   *      human with the full RFQ pre-filled.
   */
  const buildLeadPayload = (data: InquiryFormState) => ({
    ...data,
    source: "rakplusuae.com/contact",
    submittedAt: new Date().toISOString(),
    _subject: `RFQ · ${data.productRequirement || "General Inquiry"} · ${
      data.company || data.fullName
    }`,
    _template: "table",
  });

  const postToWebhook = async (
    data: InquiryFormState
  ): Promise<boolean> => {
    const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;
    // No webhook configured → FormSubmit AJAX fallback so the lead still
    // lands in the info@rakplusuae.com inbox server-side.
    const endpoint = webhookUrl || FORMSUBMIT_AJAX_ENDPOINT;
    const payload = buildLeadPayload(data);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      // Network/CORS failure — caller escalates to the mailto/WhatsApp
      // hand-off so the inquiry is never silently dropped.
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    // Snapshot the lead so the success panel can offer 1-click hand-offs
    // even if the visitor edits the (now hidden) form fields.
    const submitted = { ...form };
    setLastSubmitted(submitted);

    const delivered = await postToWebhook(submitted);

    if (delivered) {
      // Lead is in the info@rakplusuae.com inbox server-side. Offer the
      // 1-click hand-offs as a bonus confirmation channel, not a fallback.
      setDeliveryChannel(
        process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL
          ? "webhook"
          : "formsubmit"
      );
      setSubmitState("success");
    } else {
      // Automated delivery failed (offline / blocked endpoint). Surface the
      // manual hand-offs so the B2B inquiry is still recoverable.
      setDeliveryChannel("manual");
      setSubmitState("fallback");
    }
  };

  return (
    <div id="main-content" className="relative overflow-hidden min-h-screen bg-pitch-black">
      {/* ─── Phase 1 Banner: 3-size-optimised loading-locked contact
            hero video (mobile 9:16 / tablet 3:4 / desktop 21:9). ─── */}
      <section className="relative w-full min-h-[60vh] md:min-h-[75vh] lg:min-h-[100dvh] overflow-hidden">
        {/* Mobile (9:16) */}
        <BannerVideo
          className="block md:hidden"
          src="/videos/banner/9-16-banner-contact.mp4"
          poster="/videos/banner/banner%20cover%209-16.png"
          posterWidth={941}
          posterHeight={1672}
        />
        {/* Tablet (3:4) */}
        <BannerVideo
          className="hidden md:block lg:hidden"
          src="/videos/banner/3-4-banner-contact.mp4"
          poster="/videos/banner/banner%20cover%203-4.png"
          posterWidth={1086}
          posterHeight={1448}
        />
        {/* Desktop (21:9) */}
        <BannerVideo
          className="hidden lg:block"
          src="/videos/banner/21-9-banner-contact.mp4"
          poster="/videos/banner/banner%20cover%2021-9.png"
          posterWidth={1916}
          posterHeight={821}
        />

        {/* Cinematic overlay scrim — keeps foreground copy legible
            regardless of which frame is currently displayed. */}
        <div className="absolute inset-0 bg-gradient-to-b from-pitch-black/65 via-pitch-black/40 to-pitch-black pointer-events-none" />

        {/* Banner caption block (centred hero text). */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 lg:px-12 text-studio-white text-center">
          <p className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.4em] text-studio-white/70 mb-6">
            RakPlus® · RakPlus® Rohrsysteme UAE
          </p>
          <h1 className="font-sans font-extrabold tracking-tighter leading-[0.9] text-[clamp(2.5rem,7vw,6rem)] mb-2">
            Connect<span className="text-brass">.</span>
          </h1>
          <h2 className="font-sans font-extrabold tracking-tighter leading-[0.95] text-[clamp(1.4rem,3.4vw,2.6rem)] mb-6 text-studio-white/90">
            Engineering Dialogue<span className="text-emerald">.</span>
          </h2>

          <p className="mt-8 max-w-2xl text-base md:text-xl leading-relaxed text-studio-white/85 font-medium">
            Direct line to the RakPlus engineering desk in Umm Al Quwain —
            from project specification to delivered consignment.
          </p>
        </div>
      </section>

      {/* ─── Foreground Page Content ───
          This section is a LIGHT surface: the 3D ContactBackground3D canvas
          paints a solid white backdrop, so the copy must be BLACK to stay
          legible. The form card is an opaque WHITE container with black
          text — never white-on-white.
          All `text-studio-white` classes in this block were converted to
          `text-pitch-black` / neutral-dark equivalents. */}
      <div className="relative z-10 bg-white text-pitch-black pt-28 lg:pt-36 pb-20 lg:pb-28 px-6 lg:px-8">
        {/* ─── Phase 2 Background: Architectural grid + UAE distribution map ───
            Scoped to the foreground page content so it does NOT bleed
            up into the banner section above. */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ContactBackground3D />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ═══ LEFT COLUMN — Brand Positioning (5 cols) ═══ */}
          <div className="lg:col-span-5 space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/30 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
              </span>
              <span className="text-[11px] font-bold text-pitch-black uppercase tracking-[0.2em]">
                UAE &amp; GCC Plumbing Specifications
              </span>
            </div>

            {/* ── Secondary heading (was a duplicate H1) ──
              The single canonical <h1> for this route is the visible hero
              headline ("Connect.") above. This section heading is a semantic
              <h2> so the compiled DOM carries exactly one H1. */}
            <h2
              className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-pitch-black tracking-tighter leading-[0.92]"
              style={{ textWrap: "balance" }}
            >
              Connect with Our{" "}
              <span className="text-emerald">Technical</span> &amp;{" "}
              <span className="text-brass-dark">Engineering</span> Team
            </h2>

            <p className="text-base text-neutral-700 leading-relaxed max-w-md font-medium">
              Engineered to{" "}
              <span className="text-brass-dark font-bold">German STD DIN 8077/8078</span>,
              Rakplus delivers{" "}
              <span className="text-emerald-dark font-bold">WRAS-approved</span>{" "}
              PP-R pipe systems for potable water compliance. Whether you
              are specifying for a commercial tower in Dubai or a
              residential development across the GCC — our technical team
              is ready to support your project.
            </p>

            {/* Contact Info Cards */}
            <address
              className="not-italic space-y-3 pt-2"
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <meta itemProp="name" content="RakPlus® Rohrsysteme UAE" />
              <meta
                itemProp="image"
                content="https://rakplusuae.com/images/logo.png"
              />
              <meta itemProp="url" content="https://rakplusuae.com/" />
              <meta itemProp="priceRange" content="$$" />
              <meta
                itemProp="areaServed"
                content="Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, United Arab Emirates, GCC"
              />
              <div
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
                style={{ display: "none" }}
              >
                <meta
                  itemProp="streetAddress"
                  content="Industrial Area, Umm Al Quwain, U.A.E."
                />
                <meta itemProp="addressLocality" content="Umm Al Quwain" />
                <meta itemProp="addressRegion" content="Umm Al Quwain" />
                <meta itemProp="addressCountry" content="AE" />
              </div>
              <div
                itemProp="geo"
                itemScope
                itemType="https://schema.org/GeoCoordinates"
                style={{ display: "none" }}
              >
                <meta itemProp="latitude" content="25.5647" />
                <meta itemProp="longitude" content="55.5536" />
              </div>

              {CONTACT_CARDS.map((card) => {
                const inner = (
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/90 backdrop-blur-lg border border-neutral-900/10 shadow-xl transition-all duration-200 hover:bg-white hover:border-emerald/50">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald/15 border border-emerald/30 flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-emerald-dark" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-pitch-black tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-xs text-neutral-700 leading-relaxed mt-0.5 font-medium">
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
            </address>

            {/* Trust Badge Strip */}
            <div className="flex flex-wrap gap-2 pt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald/15 border border-emerald/30 text-emerald-dark text-[11px] font-bold tracking-wide">
                WRAS Approved
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-crimson/15 border border-crimson/30 text-crimson-dark text-[11px] font-bold tracking-wide">
                German Standard DIN
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brass/20 border border-brass/40 text-brass-dark text-[11px] font-bold tracking-wide">
                Full GCC Distribution
              </span>
            </div>
          </div>

          {/* ═══ RIGHT COLUMN — Inquiry Form (7 cols) ═══ */}
          <div className="lg:col-span-7">
            <div className="bg-white/95 backdrop-blur-xl border border-neutral-900/10 shadow-2xl rounded-2xl p-8 lg:p-10 md:max-w-2xl md:mx-auto">
              {/* Form Header */}
              <div className="mb-8">
                <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-pitch-black tracking-tighter">
                  Request a Technical Datasheet &amp; Quote
                </h2>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed font-medium">
                  Fill in your project details and our technical sales
                  team will respond within 24 business hours via
                  <code className="text-emerald-dark mx-1 font-mono">
                    info@rakplusuae.com
                  </code>
                  .
                </p>
              </div>

              {submitState === "success" || submitState === "fallback" ? (
                <div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  data-testid="contact-success"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                      submitState === "success"
                        ? "bg-emerald/20"
                        : "bg-brass/20"
                    }`}
                  >
                    {submitState === "success" ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-brass-dark" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-pitch-black mb-2">
                    {submitState === "success"
                      ? "Inquiry Received"
                      : "Send It Directly"}
                  </h3>
                  <p className="text-sm text-neutral-700 max-w-md font-medium leading-relaxed">
                    {submitState === "success" ? (
                      <>
                        Your RFQ has been delivered to{" "}
                        <code className="text-emerald-dark font-mono">
                          {SALES_EMAIL}
                        </code>
                        {deliveryChannel === "webhook"
                          ? " and our technical team will respond within 24 business hours."
                          : ". Our technical team will respond within 24 business hours."}
                      </>
                    ) : (
                      <>
                        We couldn&rsquo;t reach our server automatically —
                        please tap below to send your details straight to{" "}
                        <code className="text-emerald-dark font-mono">
                          {SALES_EMAIL}
                        </code>{" "}
                        or WhatsApp the sales desk so your inquiry is not lost.
                      </>
                    )}
                  </p>

                  {/* ── 1-click confirmation hand-offs ── */}
                  <div className="mt-6 w-full max-w-sm space-y-3">
                    <a
                      href={buildMailtoHrefFor(lastSubmitted, SALES_EMAIL)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald hover:bg-emerald-dark text-pitch-black text-sm font-bold tracking-wide shadow-lg transition-all duration-200 border border-emerald/30 hover:shadow-emerald/30 hover:-translate-y-0.5"
                    >
                      <Send className="w-4 h-4" />
                      Send via Email
                    </a>
                    <a
                      href={buildWhatsappHref(lastSubmitted)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-pitch-black hover:bg-pitch-black/90 text-studio-white text-sm font-bold tracking-wide shadow-lg transition-all duration-200 border border-neutral-900/10 hover:-translate-y-0.5"
                    >
                      <Phone className="w-4 h-4" />
                      WhatsApp {SALES_PHONE_DISPLAY}
                    </a>
                  </div>

                  <p className="text-xs text-neutral-500 mt-5 font-mono">
                    Catalogue direct line: {SALES_PHONE_DISPLAY}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
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
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Ahmed Al Maktoum"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-900/15 text-pitch-black placeholder:text-neutral-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30 transition-all text-sm"
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
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Al Futtaim Engineering"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-900/15 text-pitch-black placeholder:text-neutral-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30 transition-all text-sm"
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
                          value={form.email}
                          onChange={handleChange}
                          placeholder="ahmed@company.ae"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-neutral-900/15 text-pitch-black placeholder:text-neutral-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30 transition-all text-sm"
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
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+971 50 123 4567"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-neutral-900/15 text-pitch-black placeholder:text-neutral-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30 transition-all text-sm"
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
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 z-10" />
                      <select
                        id="productRequirement"
                        name="productRequirement"
                        required
                        value={form.productRequirement}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-neutral-900/15 text-pitch-black appearance-none focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30 transition-all text-sm [&>option]:bg-white [&>option]:text-pitch-black"
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
                      <span className="text-neutral-500 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      id="volume"
                      name="volume"
                      value={form.volume}
                      onChange={handleChange}
                      placeholder="e.g., 500m of 25mm PN20, 200m of 32mm PN16"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-900/15 text-pitch-black placeholder:text-neutral-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30 transition-all text-sm"
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
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your project requirements, timeline, and any specific technical specifications needed..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-900/15 text-pitch-black placeholder:text-neutral-400 focus:outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30 transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Error state */}
                  {submitState === "error" && (
                    <div
                      className="flex items-start gap-3 p-4 rounded-xl bg-crimson/15 border border-crimson/30"
                      data-testid="contact-error"
                    >
                      <AlertCircle className="w-5 h-5 text-crimson flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-crimson">
                          Unable to submit inquiry
                        </p>
                        <p className="text-xs text-crimson/80 mt-1">
                          {errorMessage ||
                            "Please call us directly at +971 6 744 4345."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-emerald hover:bg-emerald-dark text-pitch-black text-sm font-bold tracking-wide shadow-lg transition-all duration-200 border border-emerald/30 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-emerald/30 hover:-translate-y-0.5 cursor-pointer"
                  >
                    {submitState === "submitting" ? (
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
                        <span>Sending Inquiry…</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send RFQ to info@rakplusuae.com</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-neutral-500 mt-3 font-medium">
                    Your data is handled securely and will not be shared
                    with third parties. Catalogue p.27: RakPlus®
                    Rohrsysteme UAE, Industrial Area, Umm Al Quwain.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── AEO Target Block ─── */}
      <AeoTargetBlock />

      {/* ─── Related Products ───
          Explicit `bg-studio-white` so this section reads as a clean
          light block at the page bottom (instead of inheriting the
          page-wide `bg-pitch-black`, which left a white card floating
          in a black void — looks unfinished on mobile). */}
      <section className="relative z-10 bg-studio-white py-16 md:py-24 px-6 lg:px-8 border-t border-neutral-200">
        <div className="relative z-10 max-w-7xl mx-auto">
          <RelatedProducts currentSlug="ppr-green-pn20" />
        </div>
      </section>

      {/* ─── LSI Semantic Block ───
          Same correction as RelatedProducts above. Wrapping the
          component (whose own root was `bg-transparent`) in an
          explicit white section removes any chance of light-coloured
          text-on-undefined-background readability bugs. */}
      <section className="relative z-10 bg-studio-white py-16 md:py-24 px-6 lg:px-8">
        <SemanticLSIBlock topic="contact" />
      </section>
    </div>
  );
}
