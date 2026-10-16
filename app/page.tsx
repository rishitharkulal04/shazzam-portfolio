"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import type { CollabFormData } from "./api/contact/route";
import type { YouTubeVideo } from "./api/youtube/route";

/* ─────────────────────────── Sub-components ─────────────────────────── */

/* ── Video Player Modal ── */
function VideoPlayerModal({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }} />

      {/* Content */}
      <div
        className="relative w-full max-w-5xl animate-fadeinup"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold uppercase transition-all cursor-pointer"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            background: "rgba(255,255,255,0.1)",
            color: "var(--color-on-surface)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <span className="material-symbols-outlined text-base">close</span>
          ESC
        </button>

        {/* YouTube iframe */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="YouTube video player"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Watch on YouTube link */}
        <div className="mt-3 flex items-center justify-center">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              background: "rgba(255,0,0,0.15)",
              color: "#FF4444",
              border: "1px solid rgba(255,0,0,0.3)",
            }}
          >
            <span className="material-symbols-outlined text-sm">smart_display</span>
            Watch on YouTube
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("overview");

  const links = [
    { id: "overview", label: "The Vibe", href: "#" },
    { id: "bento-series", label: "Bento Series", href: "#bento-series" },
    { id: "the-stream", label: "The Stream", href: "#the-stream" },
    { id: "youtube-live", label: "YouTube Live", href: "#youtube-live" },
    { id: "instagram", label: "Instagram", href: "#instagram" },
    { id: "audience-metrics", label: "Audience & Metrics", href: "#audience-metrics" },
    { id: "collab-terminal", label: "Collab Terminal", href: "#collab-terminal" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-12 pt-4">
      <div
        className="max-w-7xl mx-auto h-16 rounded-xl px-4 lg:px-6 flex items-center justify-between gap-4"
        style={{
          background: "rgba(14, 14, 16, 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 1px 8px rgba(0,0,0,0.5)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-4 shrink-0">
          <a href="#" className="flex items-center gap-2" onClick={() => setActiveLink("overview")}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--color-primary-container)", color: "var(--color-on-primary)" }}
            >
              SZ
            </div>
            <span
              className="hidden sm:inline text-lg font-bold tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary)" }}
            >
              SHAZZAM
            </span>
          </a>
          <div
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: "rgba(42,42,44,0.6)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--color-primary-container)" }}
            />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface-variant)", letterSpacing: "0.1em" }}
            >
              OPEN FOR Q2/Q3 SPONSORSHIPS
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={() => setActiveLink(l.id)}
              className="transition-colors text-sm font-semibold"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: activeLink === l.id ? "var(--color-primary-container)" : "var(--color-on-surface-variant)",
                letterSpacing: "0.06em",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#collab-terminal"
            className="btn-neon hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold uppercase"
            style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.06em" }}
          >
            Collab Now
          </a>
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--color-on-surface-variant)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden max-w-7xl mx-auto mt-2 rounded-xl p-4 flex flex-col gap-3"
          style={{
            background: "rgba(14, 14, 16, 0.97)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={() => { setActiveLink(l.id); setMobileOpen(false); }}
              className="py-2 px-3 rounded-lg text-sm font-semibold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: activeLink === l.id ? "var(--color-primary-container)" : "var(--color-on-surface-variant)",
                background: activeLink === l.id ? "rgba(0,255,102,0.08)" : "transparent",
                letterSpacing: "0.06em",
              }}
            >
              {l.label}
            </a>
          ))}
          <a href="#collab-terminal" className="btn-neon text-center py-3 text-sm font-bold uppercase" style={{ fontFamily: "var(--font-space-grotesk)" }} onClick={() => setMobileOpen(false)}>
            Book Collaboration
          </a>
        </div>
      )}
    </header>
  );
}

/* ── Hero Section ── */
function HeroSection() {
  return (
    <section className="relative w-full pt-6 pb-10" id="overview">
      {/* Ambient Backdrops */}
      <div
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[640px] -z-10"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(0,255,102,0.08), rgba(110,0,190,0.04) 50%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-4 z-10 animate-fadeinup">
          {/* Live Badge */}
          <div
            className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(42,42,44,0.7)",
              boxShadow: "0 0 15px rgba(0,255,102,0.12)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ background: "var(--color-primary-container)" }}
            />
            <span
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary)", letterSpacing: "0.1em" }}
            >
              <span className="material-symbols-outlined text-sm" style={{ color: "var(--color-primary-container)" }}>bolt</span>
              ZERO SUGARCOATING · TEDx SPEAKER · TECH & SARCASM
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none mt-2"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "-0.03em" }}
          >
            Where Raw Tech <br className="hidden sm:inline" />
            Meets{" "}
            <span className="gradient-text">Cultured Sarcasm.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg leading-7 max-w-xl" style={{ fontFamily: "var(--font-inter)", color: "var(--color-on-surface-variant)" }}>
            Entertaining{" "}
            <span style={{ color: "var(--color-on-surface)", fontWeight: 600 }}>4.6M+</span>{" "}
            combined digital natives across Kochi & Dubai with unfiltered tech drops, viral roasts, and high-energy teardowns.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#collab-terminal"
              className="btn-neon inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase"
              style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.06em" }}
            >
              <span className="material-symbols-outlined text-lg">send</span>
              Book Brand Collaboration
            </a>
            <a
              href="#the-stream"
              className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary)" }}
            >
              <span className="material-symbols-outlined text-lg" style={{ color: "var(--color-primary-container)" }}>play_circle</span>
              Explore YouTube & Reels
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-4" style={{ color: "var(--color-on-surface-variant)" }}>
            <div className="flex -space-x-2">
              {["IN", "UAE", "GCC"].map((tag, i) => (
                <span
                  key={tag}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow"
                  style={{
                    background: i === 0
                      ? "var(--color-surface-container-highest)"
                      : i === 1 ? "var(--color-surface-container-high)"
                      : "var(--color-surface-container-low)",
                    color: i === 0 ? "var(--color-primary-container)" : i === 1 ? "var(--color-secondary)" : "var(--color-on-surface)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)", letterSpacing: "0.06em" }}
            >
              Verified High Intent Demographics · 82% 18-34 yrs
            </span>
          </div>
        </div>

        {/* Right Portrait Card */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div
            className="relative w-full max-w-md rounded-2xl p-3 shadow-2xl group"
            style={{ background: "rgba(28,27,29,0.7)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="relative w-full aspect-square rounded-xl overflow-hidden" style={{ background: "var(--color-surface-container-lowest)" }}>
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-DED9JDb3gBZVeQYDQ355Z_OGFJ6DW25FIq93N47D0LBc33xzJXiM7pbvNNOmcoF9EaBwG5McNLAoKTehCVQX6UKNiRRc7LPode7jcpWGTcq32IkZ_vLDCisISBgwV2HuuIgZ9CvPPO-zPoq4pEidz-4Us0abJHvVY5mlJSA30N2MGx9sNCqap7AO0nF-swDvagdkAlYsevuGpOA9UTX8-ZElZU8_26cvN4Km09TWXelNOJ6L7DFm"
                alt="Shaz Mohamed — TEDx Speaker & Tech Creator"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                unoptimized
              />
              {/* Gradient Scrim */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,14,16,0.8), transparent 60%)" }} />
              {/* Badge top */}
              <div
                className="absolute top-3 left-3 px-3 py-1.5 rounded-md flex items-center gap-2 shadow"
                style={{ background: "rgba(14,14,16,0.85)", backdropFilter: "blur(8px)" }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary-container)" }} />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary)", letterSpacing: "0.1em" }}
                >
                  AUTHENTICITY: 100% · ZERO BIAS
                </span>
              </div>
              {/* Bottom Card */}
              <div
                className="absolute bottom-3 inset-x-3 p-3 rounded-lg flex items-center justify-between shadow-lg"
                style={{ background: "rgba(42,42,44,0.9)", backdropFilter: "blur(12px)" }}
              >
                <div>
                  <p className="text-xs font-bold uppercase" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary-container)", letterSpacing: "0.06em" }}>
                    TEDx Speaker & Tech Critic
                  </p>
                  <p className="text-sm font-medium mt-0.5" style={{ color: "var(--color-on-surface)" }}>@callmeshazzam</p>
                </div>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded"
                  style={{ background: "var(--color-surface-container-lowest)", color: "var(--color-primary)" }}
                >
                  <span className="material-symbols-outlined text-sm" style={{ color: "var(--color-primary-container)" }}>verified</span>
                  <span className="text-xs font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>OFFICIAL MEDIA KIT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stat Bar */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "YouTube Subs", badge: "+45K/mo", badgeColor: "primary", value: "2.6M", sub: "Long-form depth & roasts" },
          { label: "Instagram Virality", badge: "Top 1% Reels", badgeColor: "secondary", value: "2.0M", sub: "Hyper-viral micro sketches" },
          { label: "Cross-Platform Views", badge: "Lifetime", badgeColor: "primary", value: "1.3B+", valuePrimary: true, sub: "High brand recall retention" },
          { label: "Avg Engagement", badge: "3.2x Industry", badgeColor: "primary", value: "5.8%", sub: "Organic active comment loop" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl glass-card glass-card-hover transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface-variant)", letterSpacing: "0.06em" }}
              >
                {stat.label}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  background: stat.badgeColor === "secondary" ? "rgba(221,183,255,0.1)" : "rgba(0,255,102,0.1)",
                  color: stat.badgeColor === "secondary" ? "var(--color-secondary)" : "var(--color-primary-container)",
                }}
              >
                {stat.badge}
              </span>
            </div>
            <p
              className="stat-num text-4xl lg:text-5xl"
              style={{ color: stat.valuePrimary ? "var(--color-primary-container)" : "var(--color-on-surface)" }}
            >
              {stat.value}
            </p>
            <span className="text-sm mt-1 block" style={{ color: "var(--color-outline)" }}>{stat.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Bento Section ── */
function BentoSection() {
  const [isPuchamActive, setIsPuchamActive] = useState(false);

  return (
    <section className="relative w-full py-10" id="bento-series">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-primary-container)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary-container)", letterSpacing: "0.1em" }}>
              CONTENT PILLARS // SIGNATURE SERIES
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
            Engineered For Brutal Honesty & Viral Laughter
          </h2>
        </div>
        <p className="text-sm leading-6 max-w-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          Every series is crafted with zero-compromise production quality, blending authentic gadget critique with relatable regional humour.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Tile 1: CHAi with Tech */}
        <div
          className="lg:col-span-8 p-6 rounded-2xl flex flex-col justify-between group relative overflow-hidden glass-card glass-card-hover transition-all"
        >
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full pointer-events-none transition-all group-hover:opacity-70"
            style={{ background: "radial-gradient(circle, rgba(0,255,102,0.1), transparent 70%)", filter: "blur(40px)" }}
          />
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span
                className="px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-space-grotesk)", background: "var(--color-surface-container-high)", color: "var(--color-primary)", letterSpacing: "0.06em" }}
              >
                <span className="material-symbols-outlined text-sm" style={{ color: "var(--color-primary-container)" }}>coffee</span>
                FLAGSHIP IP
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--color-primary-container)" }} />
                <span className="text-xs font-bold uppercase" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface-variant)" }}>Weekly Stream & VOD</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>CHAi with Tech</h3>
            <p className="text-sm leading-6 max-w-xl" style={{ color: "var(--color-on-surface-variant)" }}>
              Where silicon updates meet steaming chai. Weekly teardowns of tech announcements, silicon drama, sneaky OEM price hikes, and real consumer ROI assessments without the PR fluff.
            </p>
          </div>
          <div className="mt-6 pt-4 rounded-xl p-4" style={{ background: "rgba(42,42,44,0.4)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--color-surface-container-highest)", color: "var(--color-primary-container)" }}
                >
                  <span className="material-symbols-outlined">mic</span>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>
                    EP. 64: "Is 16GB RAM Dead for AI PC Generation?"
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-outline)" }}>Duration: 42m · 182K Streams in 48 Hours</p>
                </div>
              </div>
              <a
                href="#the-stream"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk)", background: "var(--color-surface-container-lowest)", color: "var(--color-primary)", letterSpacing: "0.06em" }}
              >
                Listen Now <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tile 2: Mobile Kadhakal */}
        <div className="lg:col-span-4 p-6 rounded-2xl flex flex-col justify-between group glass-card glass-card-hover transition-all">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-space-grotesk)", background: "var(--color-surface-container-high)", color: "var(--color-primary-fixed)", letterSpacing: "0.06em" }}
              >
                100% Honest Roasts
              </span>
              <span className="material-symbols-outlined" style={{ color: "var(--color-primary-container)" }}>devices</span>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>
              Mobile Kadhakal & Unboxings
            </h3>
            <p className="text-sm leading-5" style={{ color: "var(--color-on-surface-variant)" }}>
              Flagship tear-downs of Pixel, iPhone, Nothing, and Galaxy. Zero sugarcoating: if a phone thermal-throttles, the viewers know on day one.
            </p>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { title: "Pixel 9 Pro XL Tear-down", views: "1.1M Views" },
              { title: "iPhone 16 Pro: 60Hz Roast", views: "2.4M Views" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between text-sm px-3 py-2 rounded-lg"
                style={{ background: "rgba(53,52,55,0.4)", color: "var(--color-on-surface-variant)" }}
              >
                <span>{item.title}</span>
                <span className="font-semibold" style={{ color: "var(--color-primary-container)" }}>{item.views}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tile 3: Life of Shazzam */}
        <div className="lg:col-span-5 p-6 rounded-2xl flex flex-col justify-between group glass-card glass-card-hover transition-all">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-space-grotesk)", background: "rgba(111,0,190,0.3)", color: "var(--color-secondary)", letterSpacing: "0.06em" }}
              >
                Cultural Sarcasm
              </span>
              <span className="material-symbols-outlined" style={{ color: "var(--color-secondary)" }}>theater_comedy</span>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>
              Life of Shazzam & Vines
            </h3>
            <p className="text-sm leading-5" style={{ color: "var(--color-on-surface-variant)" }}>
              Relatable skits blending Dubai diaspora lifestyle, tech struggles, Indian family reactions to EMI purchases, and everyday consumer paradoxes that spark viral comment threads.
            </p>
          </div>
          <div className="mt-4 p-3 rounded-xl flex items-center gap-3" style={{ background: "rgba(42,42,44,0.4)" }}>
            <span className="material-symbols-outlined text-2xl" style={{ color: "var(--color-secondary)" }}>sentiment_very_satisfied</span>
            <div>
              <p className="text-xs font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>Average Reel Completion: 88%</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-outline)" }}>Hyper-engaging comedic rhythm that hooks Gen-Z within 2 seconds</p>
            </div>
          </div>
        </div>

        {/* Tile 4: Pucham Mode */}
        <div className="lg:col-span-7 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden glass-card glass-card-hover transition-all" id="pucham-box">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-space-grotesk)", background: "rgba(0,255,102,0.2)", color: "var(--color-primary-container)", letterSpacing: "0.1em" }}
                >
                  <span className="material-symbols-outlined text-sm">electric_bolt</span>
                  Pucham Mode (പൂച്ചം) ⚡
                </span>
                <span className="hidden sm:inline text-xs" style={{ color: "var(--color-outline)" }}>Interactive Filter</span>
              </div>
              <button
                onClick={() => setIsPuchamActive(!isPuchamActive)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all"
                style={{ background: "var(--color-surface-container-highest)" }}
                type="button"
              >
                <span className="text-xs font-medium" style={{ color: "var(--color-on-surface)" }}>
                  {isPuchamActive ? "Switch to Corporate Mode" : "Switch to Shazzam Mode"}
                </span>
                <span
                  className="w-8 h-4 rounded-full flex items-center p-0.5 transition-all"
                  style={{ background: isPuchamActive ? "var(--color-primary-container)" : "rgba(0,255,102,0.3)" }}
                >
                  <span
                    className="w-3 h-3 rounded-full transition-transform duration-300"
                    style={{
                      background: "var(--color-primary-container)",
                      transform: isPuchamActive ? "translateX(16px)" : "translateX(0)",
                    }}
                  />
                </span>
              </button>
            </div>
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>
              Corporate PR Review vs Real Shazzam Take
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)" }}>Toggle between conventional sterile media fluff and Shaz's authentic verdict.</p>

            {!isPuchamActive ? (
              <div className="p-4 rounded-xl transition-all duration-300" style={{ background: "rgba(42,42,44,0.6)" }}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase mb-1" style={{ color: "var(--color-outline)" }}>
                  <span className="material-symbols-outlined text-sm">corporate_fare</span>
                  Diplomatic Tech Reviewer
                </div>
                <p className="text-sm leading-6 italic" style={{ color: "var(--color-on-surface)" }}>
                  "The device delivers reasonable battery endurance for casual tasks throughout the typical workday, with a sophisticated understated design philosophy."
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl transition-all duration-300" style={{ background: "rgba(0,255,102,0.1)" }}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase mb-1" style={{ color: "var(--color-primary-container)" }}>
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Unfiltered Shazzam Review (#PuchamApproved)
                </div>
                <p className="text-sm leading-6 font-medium" style={{ color: "var(--color-primary)" }}>
                  "Bro, you'll need a 30,000mAh powerbank strapped to your back just to reach lunchtime. Great display, but battery goes down faster than your weekend motivation 😂!"
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-bold uppercase" style={{ color: "var(--color-outline)", letterSpacing: "0.06em" }}>
            <span>MALAYALAM WIT × GLOBAL TECH FLUENCY</span>
            <span>100% AUDIENCE CREDIBILITY</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── The Stream Section ── */
function StreamSection({ onPlayVideo }: { onPlayVideo: (videoId: string) => void }) {
  const [activeTab, setActiveTab] = useState("all");

  const mediaCards = [
    {
      id: "m1",
      category: "breakdowns",
      span: "lg:col-span-2",
      aspect: "aspect-video",
      youtubeId: "dQw4w9WgXcQ", // placeholder — replace with real video ID
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQtH9_GSKvJO5alXeM9zj7ql2Udi7oAnUHiOQm9a57v7q0Cdq7Zuf0eun1k8BYNLbwG5RDwNZdfJpSFipKfKZUaEBksm0OrHIRe1ajaxddLDwgF78cPICl3W1MdqVtybqkdyMDoRBz6f0Cerorc-txreQg0ce-XHiQrQUkYZkVmlnRM5yr2rZ3gRY-e-2w0KBXXJooyHxN8ggDXayHD1qDFDFwHTlX8CToklK8JFaqlB1doN_dBtO7",
      topBadge: { text: "YOUTUBE 4K", bg: "var(--color-error-container)", color: "var(--color-on-error)" },
      duration: "24:18",
      catLabel: "SMARTPHONE BREAKDOWNS",
      views: "1.4M VIEWS",
      title: "iPhone vs Reality: 30 Days Later — Was It Truly Worth The EMI?",
      desc: "Comprehensive testing across heat generation in Dubai summer, shutter lag in low light, and honest value comparison vs Android counterparts.",
    },
    {
      id: "m2",
      category: "comedy",
      span: "",
      aspect: "aspect-[9/16]",
      instaUrl: "https://instagram.com/callmeshazzam",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuClRs3untmYlkbLNEw3gxlOrSO64LklDSddXdGai5Rqy4EIhYYqPOmQ6Ms6d0DOJyOIna1MD8qS4CYFUPaUERT7G93ESkdKX12CwY4JIKnBm6VAvtsjNRUjGNGxYubOlYFYH_t5Pgaqpr70usMEPcTGA-g3bQADNbzb6h93xOuSlc9NePEflkkXIPivSAU_-TxrcaAENGjOuVlA8gnGJQCHK9LEuCCkXKioIkpnTjNL45Kh_kU4C3Wv",
      topBadge: { text: "VIRAL REEL", bg: "var(--color-secondary-container)", color: "var(--color-on-secondary-container)" },
      bottomText: "When tech companies call a 2W charger \"Eco-Friendly\"",
      bottomStats: "3.8M Views · 420K Likes",
      isReel: true,
    },
    {
      id: "m3",
      category: "comedy",
      span: "",
      aspect: "aspect-[9/16]",
      instaUrl: "https://instagram.com/callmeshazzam",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmNBgw5F8WfSfegh1KMmnMbkKlW31F18JdmU7hDCAf25tChYvMqSQzGWp8ImUWgAtzlPGRGU7NBoMk1IEjY6FzvqYjyU537OJX8Jmq1ezEPLNmV1Tx10FuT3UlbA4dDSBR1xf7PQXthzGVv-N561Xq8gBt_xZzo4BtOtIZuLWyWhS9tAfO0vdC31gGr6meOdsk6oiP5s-wfE0-SUeWkzez-HCjAOWSYnqvKiYZJaFL4NePwyClXPhg",
      topBadge: { text: "REEL", bg: "var(--color-secondary-container)", color: "var(--color-on-secondary-container)" },
      bottomText: "Buying gadgets in Dubai vs Kochi malls 😂",
      bottomStats: "2.1M Views · 290K Likes",
      isReel: true,
    },
    {
      id: "m4",
      category: "chai",
      span: "lg:col-span-2",
      aspect: "aspect-video",
      youtubeId: "dQw4w9WgXcQ", // placeholder — replace with real video ID
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHSFCyPW2nTv1YNYk60aT05Laow4EpLO9PQhOjyQsR7JR1z607_4ahpEMYjQ7GtI6VGM-sLen23b7aIdqrwU2Zvf2_BHD4aGg3gHlMcoswYJtbYuTZK4_PmzLqxMuP7lmlS1_Ab_Vi-p1T5trIoGwNzNuyXkeXs-OSwnv5eT6cWtHoaAUo9ZBNisDmMlrtL8AQum1u64ksg65su7Pwb0B8J2ux4ezVb3Dm6ioxBjfbeWFC0XZ4ciAH",
      topBadge: { text: "PODCAST VOD", bg: "var(--color-surface-container-high)", color: "var(--color-primary)", icon: "podcasts" },
      duration: "38:40",
      catLabel: "CHAI WITH TECH // EPISODE 48",
      views: "890K VIEWS",
      title: "Chai with Tech: The AI Hype Bubble & Foldables Roast",
      desc: "Dissecting why every refrigerator now claims to have \"Generative AI\" and whether tri-folding screens are actually practical or just parlor tricks.",
    },
  ];

  const tabs = [
    { id: "all", label: "All Content" },
    { id: "breakdowns", label: "Smartphone Breakdowns" },
    { id: "comedy", label: "Comedy Sketches" },
    { id: "chai", label: "Chai With Tech" },
  ];

  const visibleCards = mediaCards.filter(
    (c) => activeTab === "all" || c.category === activeTab
  );

  const handleCardClick = (card: typeof mediaCards[number]) => {
    if (card.youtubeId) {
      onPlayVideo(card.youtubeId);
    } else if (card.instaUrl) {
      window.open(card.instaUrl, "_blank");
    }
  };

  return (
    <section className="relative w-full py-10" id="the-stream">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-secondary)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-secondary)", letterSpacing: "0.1em" }}>
              THE STREAM // HIGH RETENTION VAULT
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
            Curated Drops & High-Retention Hits
          </h2>
        </div>
        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl" style={{ background: "var(--color-surface-container-low)" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                background: activeTab === t.id ? "var(--color-surface-container-high)" : "transparent",
                color: activeTab === t.id ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                letterSpacing: "0.06em",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleCards.map((card) => (
          <div
            key={card.id}
            className={`${card.span || ""} rounded-2xl overflow-hidden group shadow-lg flex flex-col justify-between glass-card glass-card-hover transition-all cursor-pointer`}
            onClick={() => handleCardClick(card)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") handleCardClick(card); }}
          >
            <div className={`relative w-full ${card.aspect} overflow-hidden`} style={{ background: "var(--color-surface-container-highest)" }}>
              <Image
                src={card.imgSrc}
                alt={card.title || card.bottomText || ""}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,14,16,0.75), transparent 60%)" }} />
              {/* Top Badge */}
              <div
                className="absolute top-3 left-3 px-2 py-1 rounded flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-space-grotesk)", background: card.topBadge.bg, color: card.topBadge.color }}
              >
                {card.topBadge.icon && <span className="material-symbols-outlined text-xs">{card.topBadge.icon}</span>}
                {!card.topBadge.icon && !card.isReel && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                {card.isReel && <span className="material-symbols-outlined text-xs">play_arrow</span>}
                {card.topBadge.text}
              </div>
              {/* Duration */}
              {card.duration && (
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-semibold" style={{ background: "rgba(14,14,16,0.8)", color: "var(--color-on-surface)" }}>
                  {card.duration}
                </div>
              )}
              {/* Reel bottom text */}
              {card.isReel && (
                <div className="absolute bottom-3 left-3" style={{ color: "var(--color-on-surface)" }}>
                  <p className="text-lg font-bold leading-tight line-clamp-2">{card.bottomText}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs font-semibold" style={{ color: "var(--color-primary-fixed)" }}>
                    {card.bottomStats?.split(" · ").map((s) => <span key={s}>{s}</span>)}
                  </div>
                </div>
              )}
              {/* Hover Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform"
                  style={{ background: card.isReel ? "var(--color-secondary-container)" : "var(--color-primary-container)", color: card.isReel ? "#fff" : "var(--color-on-primary)" }}
                >
                  <span className="material-symbols-outlined text-2xl">{card.isReel ? "open_in_new" : "play_arrow"}</span>
                </span>
              </div>
            </div>
            {!card.isReel && card.catLabel && (
              <div className="p-4">
                <div className="flex items-center justify-between text-xs font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)" }}>
                  <span>{card.catLabel}</span>
                  <span style={{ color: "var(--color-primary-container)" }}>{card.views}</span>
                </div>
                <h3 className="text-lg font-semibold leading-tight transition-colors" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>
                  {card.title}
                </h3>
                <p className="text-xs leading-5 mt-2 line-clamp-2" style={{ color: "var(--color-on-surface-variant)" }}>{card.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Audience & Metrics Section ── */
function AudienceSection() {
  const brands = ["GOOGLE", "VIVO", "CASIO G-SHOCK", "XIAOMI", "NOTHING", "ASUS ROG", "ONEPLUS", "RED BULL", "SAMSUNG", "REALME"];

  const deliverables = [
    { icon: "smart_display", color: "primary-container", title: "Dedicated YouTube Integration", desc: "120-180 second seamless narrative integration or full dedicated device deep dive with pinned comments & trackable affiliate tags.", tag: "Guaranteed High Retention", tagColor: "var(--color-primary-container)" },
    { icon: "video_camera_front", color: "secondary", title: "Viral 9:16 Instagram Reel", desc: "Bespoke comedic sketch or lightning gadget breakdown tailored specifically for Instagram algorithmic virality and story amplification.", tag: "2M+ Potential Reach", tagColor: "var(--color-secondary)" },
    { icon: "campaign", color: "primary-fixed", title: "Keynotes & Tech Hosting", desc: "TEDx speaker proven on global stages. Available to host launch keynotes, hackathons, and consumer tech conventions across UAE & India.", tag: "High-Energy Stage Presence", tagColor: "var(--color-primary-fixed)" },
    { icon: "diamond", color: "primary-container", title: "360° Ambassadorship", desc: "Multi-quarter exclusive ecosystem representation across global launches, hands-on experiential booths, and curated digital campaigns.", tag: "Quarterly & Annual Retainers", tagColor: "var(--color-primary-container)" },
  ];

  return (
    <section className="relative w-full py-10" id="audience-metrics">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-primary-container)" }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary-container)", letterSpacing: "0.1em" }}>
            MEDIA KIT // AUDIENCE INTELLIGENCE
          </span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
          Precision Reach Into Prime Purchasing Demographics
        </h2>
      </div>

      {/* Demographics Triad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1 */}
        <div className="p-6 rounded-2xl flex flex-col justify-between glass-card">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)", letterSpacing: "0.06em" }}>Core Age Demographic</span>
            <p className="stat-num text-5xl mb-2" style={{ color: "var(--color-on-surface)" }}>82%</p>
            <p className="text-xl font-semibold mb-1" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary)" }}>Gen Z & Millennials (18-34 yrs)</p>
            <p className="text-sm leading-5" style={{ color: "var(--color-on-surface-variant)" }}>High purchasing power, first-wave tech adopters, software engineers, and digital-first professionals.</p>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 rounded-full overflow-hidden flex" style={{ background: "var(--color-surface-container-highest)" }}>
              <div className="h-full" style={{ width: "54%", background: "var(--color-primary-container)" }} />
              <div className="h-full" style={{ width: "28%", background: "var(--color-secondary)" }} />
              <div className="h-full" style={{ width: "18%", background: "var(--color-outline)" }} />
            </div>
            <div className="flex justify-between text-xs mt-1.5 font-bold uppercase" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)" }}>
              <span>18-24 (54%)</span><span>25-34 (28%)</span><span>35+ (18%)</span>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="p-6 rounded-2xl flex flex-col justify-between glass-card">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)", letterSpacing: "0.06em" }}>Geographic Footprint</span>
            <p className="stat-num text-5xl mb-2">
              <span style={{ color: "var(--color-primary-container)" }}>68%</span>
              <span className="text-3xl font-normal mx-1" style={{ color: "var(--color-on-surface)" }}>/</span>
              <span style={{ color: "var(--color-on-surface)" }}>24%</span>
            </p>
            <p className="text-xl font-semibold mb-1" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary)" }}>India & UAE / Middle East</p>
            <p className="text-sm leading-5" style={{ color: "var(--color-on-surface-variant)" }}>Unrivaled density in South India (Kerala, Bangalore, Chennai) coupled with extensive Gulf NRI audience across Dubai, Qatar, and Oman.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Kochi", "Dubai & Abu Dhabi", "Bangalore", "Doha / Muscat"].map((city) => (
              <span key={city} className="px-2.5 py-1 rounded text-xs font-semibold" style={{ background: "var(--color-surface-container-high)", color: "var(--color-on-surface)" }}>{city}</span>
            ))}
          </div>
        </div>
        {/* Card 3 */}
        <div className="p-6 rounded-2xl flex flex-col justify-between glass-card">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)", letterSpacing: "0.06em" }}>Audience Category Affinity</span>
            <p className="stat-num text-5xl mb-2" style={{ color: "var(--color-on-surface)" }}>84%</p>
            <p className="text-xl font-semibold mb-1" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary)" }}>Consumer Tech & Hardware</p>
            <p className="text-sm leading-5" style={{ color: "var(--color-on-surface-variant)" }}>Audience relies on channel drops before making smartphone, laptop, audio, and personal workstation purchase decisions.</p>
          </div>
          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase" style={{ background: "rgba(0,255,102,0.1)", color: "var(--color-primary-container)", letterSpacing: "0.06em" }}>
            <span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
            HIGH INTENT COMMERCE CONVERSIONS
          </div>
        </div>
      </div>

      {/* Brand Marquee */}
      <div className="w-full rounded-2xl p-4 shadow-inner mb-10 overflow-hidden" style={{ background: "var(--color-surface-container-lowest)" }}>
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)", letterSpacing: "0.1em" }}>TRUSTED BY LEADING GLOBAL BRANDS</span>
          <span className="text-xs font-bold uppercase" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary-container)" }}>100% DISCLOSED & VERIFIED PARTNERSHIPS</span>
        </div>
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-8 py-2">
            {[...brands, ...brands].map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                className="text-xl font-bold uppercase tracking-wider transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface-variant)" }}
              >
                {brand}
                <span className="mx-4 opacity-30">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Deliverables */}
      <div>
        <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>Core Partnership Deliverables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverables.map((d) => (
            <div key={d.title} className="p-4 rounded-xl glass-card glass-card-hover transition-all shadow-md">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ background: "var(--color-surface-container-highest)", color: `var(--color-${d.color})` }}
              >
                <span className="material-symbols-outlined">{d.icon}</span>
              </div>
              <h4 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>{d.title}</h4>
              <p className="text-xs leading-5 mb-3" style={{ color: "var(--color-on-surface-variant)" }}>{d.desc}</p>
              <span className="text-xs font-bold uppercase" style={{ fontFamily: "var(--font-space-grotesk)", color: d.tagColor, letterSpacing: "0.06em" }}>{d.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Why Work With Section ── */
function WhyWorkSection() {
  const cards = [
    {
      icon: "verified_user",
      iconBg: "rgba(0,255,102,0.1)",
      iconColor: "var(--color-primary-container)",
      title: "High Conversion & Direct Influence",
      desc: "Because Shaz openly critiques subpar devices, when he genuinely praises a phone, laptop, or gadget, the community takes immediate buying action. The integrity is the marketing.",
      tag: "Uncompromised Viewer Trust",
      tagColor: "var(--color-primary-container)",
      tagIcon: "check_circle",
    },
    {
      icon: "theater_comedy",
      iconBg: "rgba(221,183,255,0.1)",
      iconColor: "var(--color-secondary)",
      title: "Organic Comedy Over Scripted Ads",
      desc: "Viewers immediately skip generic scripted sponsored segments. Shaz writes bespoke comedic story hooks where product capabilities solve absurd, relatable scenarios.",
      tag: "92% Sponsorship Watch-Through",
      tagColor: "var(--color-secondary)",
      tagIcon: "trending_up",
    },
    {
      icon: "translate",
      iconBg: "rgba(53,52,55,1)",
      iconColor: "var(--color-on-surface)",
      title: "Bilingual Cross-Cultural Edge",
      desc: "Effortlessly transitions between colloquial Malayalam nuances and fluent English technical specs. Bridges Tier-1 Indian tech enthusiasts and wealthy Gulf NRI families in Dubai & GCC.",
      tag: "India + Middle East Dual Reach",
      tagColor: "var(--color-primary)",
      tagIcon: "public",
    },
  ];

  return (
    <section className="relative w-full py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-secondary)" }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-secondary)", letterSpacing: "0.1em" }}>
            THE VALUE PROPOSITION // ZERO BS
          </span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
          Why The Industry Trusts Shazzam
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.title} className="p-6 rounded-2xl flex flex-col justify-between glass-card glass-card-hover transition-all">
            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: c.iconBg, color: c.iconColor }}
              >
                <span className="material-symbols-outlined text-2xl">{c.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>{c.title}</h3>
              <p className="text-sm leading-6" style={{ color: "var(--color-on-surface-variant)" }}>{c.desc}</p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold uppercase" style={{ fontFamily: "var(--font-space-grotesk)", color: c.tagColor, letterSpacing: "0.06em" }}>
              <span>{c.tag}</span>
              <span className="material-symbols-outlined text-sm">{c.tagIcon}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Collab Terminal Section ── */
type FormStatus = "idle" | "loading" | "success" | "error";

function CollabTerminal() {
  const [scope, setScope] = useState("Single Reel");
  const [budget, setBudget] = useState("$10,000 - $25,000");
  const [brandName, setBrandName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [campaignBrief, setCampaignBrief] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const scopes = ["Single Reel", "YouTube Video", "Keynote / Host", "360° Ambassadorship"];
  const budgets = ["$5,000 - $10,000", "$10,000 - $25,000", "$25,000+"];

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload: CollabFormData = { brandName, workEmail, campaignBrief, scope, budget };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }, [brandName, workEmail, campaignBrief, scope, budget]);

  return (
    <section className="relative w-full py-10" id="collab-terminal">
      <div
        className="rounded-3xl p-6 lg:p-10 shadow-2xl relative overflow-hidden"
        style={{ background: "rgba(28,27,29,0.9)", backdropFilter: "blur(32px)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none" style={{ background: "rgba(0,255,102,0.08)", filter: "blur(80px)" }} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)", background: "var(--color-surface-container-high)", color: "var(--color-primary-container)", letterSpacing: "0.1em" }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--color-primary-container)" }} />
                DIRECT CREATOR DESK
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
                Launch Campaign Inquiry
              </h2>
              <p className="text-sm leading-6 mb-6" style={{ color: "var(--color-on-surface-variant)" }}>
                Submit your brand brief directly to Shazzam's management team. We prioritize campaigns that value creative freedom and authentic storytelling.
              </p>
              <div className="p-4 rounded-xl space-y-3" style={{ background: "rgba(14,14,16,0.8)" }}>
                {[
                  { icon: "mail", label: "Agency Representation", value: "shazzam@creatorcollaborations.com", iconColor: "var(--color-primary-container)" },
                  { icon: "schedule", label: "Typical Response Time", value: "Under 24 business hours", iconColor: "var(--color-secondary)" },
                  { icon: "verified", label: "Status", value: "Q2 / Q3 2025 Calendar Open", iconColor: "var(--color-primary-fixed)", valueColor: "var(--color-primary-container)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="material-symbols-outlined" style={{ color: item.iconColor }}>{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold uppercase" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)", letterSpacing: "0.06em" }}>{item.label}</p>
                      <p className="text-sm font-medium mt-0.5" style={{ color: item.valueColor || "var(--color-on-surface)" }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)", letterSpacing: "0.06em" }}>
              SECURE INQUIRY TERMINAL // ENCRYPTED DISPATCH
            </div>
          </div>

          {/* Right Form */}
          {status === "success" ? (
            <div className="lg:col-span-7 flex flex-col items-center justify-center gap-4 py-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center animate-glow" style={{ background: "var(--color-primary-container)" }}>
                <span className="material-symbols-outlined text-3xl" style={{ color: "var(--color-on-primary)" }}>check</span>
              </div>
              <h3 className="text-2xl font-bold text-center" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>Transmission Received.</h3>
              <p className="text-sm text-center max-w-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                Our partnerships desk will revert within 24 hours. Thank you for reaching out to Shazzam&apos;s creator desk.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn-ghost px-6 py-2.5 text-sm font-bold uppercase"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-5">
              {/* Scope Pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "0.06em" }}>
                  Select Campaign Scope
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {scopes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setScope(s)}
                      className="p-2.5 rounded-lg text-xs font-bold text-center transition-all"
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        background: scope === s ? "var(--color-surface-container-high)" : "rgba(53,52,55,0.5)",
                        color: scope === s ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                        border: scope === s ? "1px solid rgba(0,255,102,0.3)" : "1px solid transparent",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "0.06em" }}>
                  Estimated Budget Range
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className="p-2.5 rounded-lg text-xs font-bold text-center transition-all"
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        background: budget === b ? "var(--color-surface-container-high)" : "rgba(53,52,55,0.5)",
                        color: budget === b ? "var(--color-primary-container)" : "var(--color-on-surface-variant)",
                        border: budget === b ? "1px solid rgba(0,255,102,0.3)" : "1px solid transparent",
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" htmlFor="brandName" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface-variant)", letterSpacing: "0.06em" }}>
                    Brand / Agency Name *
                  </label>
                  <input
                    id="brandName"
                    type="text"
                    required
                    className="input-field w-full px-4 py-3 text-sm"
                    placeholder="e.g. Nothing Technology, Asus ROG"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" htmlFor="workEmail" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface-variant)", letterSpacing: "0.06em" }}>
                    Official Work Email *
                  </label>
                  <input
                    id="workEmail"
                    type="email"
                    required
                    className="input-field w-full px-4 py-3 text-sm"
                    placeholder="name@brand.com"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" htmlFor="campaignBrief" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface-variant)", letterSpacing: "0.06em" }}>
                  Campaign Deliverables & Timeline
                </label>
                <textarea
                  id="campaignBrief"
                  className="input-field w-full px-4 py-3 text-sm resize-none"
                  placeholder="Describe the product launch date, specific feature to highlight, creative angle, or required exclusivity..."
                  rows={3}
                  value={campaignBrief}
                  onChange={(e) => setCampaignBrief(e.target.value)}
                />
              </div>

              {/* Error */}
              {status === "error" && errorMsg && (
                <div className="p-3 rounded-lg text-xs font-semibold" style={{ background: "rgba(147,0,10,0.3)", color: "var(--color-error)", border: "1px solid rgba(255,180,171,0.2)" }}>
                  ⚠ {errorMsg}
                </div>
              )}

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-neon w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.06em" }}
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      Transmit Proposal to Management
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer
      className="w-full mt-12 lg:mt-24"
      style={{ background: "var(--color-surface-container-lowest)", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Huge Watermark */}
      <div className="w-full text-center select-none pointer-events-none overflow-hidden py-6">
        <p
          className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-widest"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-primary-container)", opacity: 0.07 }}
        >
          TEA × TECH × SARCASM
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-12 pb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Pucham easter egg */}
        <div className="flex items-center gap-3">
          <span
            className="px-2.5 py-1 rounded text-xs font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)", background: "var(--color-surface-container-high)", color: "var(--color-primary-container)" }}
          >
            പൂച്ചം (Pucham)
          </span>
          <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
            Pucham is not an attitude, it&apos;s a consumer defense lifestyle. Zero sugarcoating since 2018.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6" style={{ color: "var(--color-on-surface-variant)" }}>
          {[
            { href: "https://instagram.com/callmeshazzam", icon: "photo_camera", label: "Instagram (2.0M)", hoverColor: "var(--color-secondary)" },
            { href: "https://youtube.com/@callmeshazzamtech", icon: "smart_display", label: "YouTube (2.6M)", hoverColor: "var(--color-primary-container)" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.06em" }}
            >
              <span className="material-symbols-outlined text-base">{s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-12 pb-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)", letterSpacing: "0.06em" }}>
          © 2025 Shaz Mohamed (@callmeshazzam). Engineered for ultra-performance.
        </span>
        <div className="flex items-center gap-6">
          {[
            { label: "Overview", href: "#" },
            { label: "Hardware & Rigs", href: "#bento-series" },
            { label: "Terminal", href: "#collab-terminal", highlight: true },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs font-bold uppercase tracking-wider transition-colors"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: l.highlight ? "var(--color-primary-container)" : "var(--color-on-surface-variant)",
                letterSpacing: "0.06em",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── Loading Screen ── */
function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onFinish, 700); // match exit animation duration
    }, 3200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  const particles = [
    { top: "15%", left: "10%", delay: "0s", size: 4 },
    { top: "25%", right: "15%", delay: "0.5s", size: 3 },
    { top: "70%", left: "20%", delay: "1s", size: 5 },
    { top: "60%", right: "10%", delay: "1.5s", size: 3 },
    { top: "80%", left: "50%", delay: "0.8s", size: 4 },
    { top: "40%", left: "80%", delay: "1.2s", size: 3 },
  ];

  return (
    <div className={`loading-screen ${exiting ? "exit" : ""}`}>
      {/* Scanline Effect */}
      <div className="loader-scanline" />

      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,255,102,0.08), rgba(110,0,190,0.04) 50%, transparent 80%)",
          filter: "blur(80px)",
        }}
      />

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="loader-particle"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          } as React.CSSProperties}
        />
      ))}

      {/* Logo */}
      <div
        className="loader-logo w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: "var(--color-primary-container)",
          color: "var(--color-on-primary)",
          boxShadow: "0 0 40px rgba(0,255,102,0.4), 0 0 80px rgba(0,255,102,0.15)",
        }}
      >
        <span
          className="text-3xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          SZ
        </span>
      </div>

      {/* Title */}
      <h1
        className="loader-title text-3xl sm:text-4xl font-bold uppercase tracking-widest mb-2"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "var(--color-on-surface)",
        }}
      >
        SHAZZAM
      </h1>

      {/* Tagline */}
      <p
        className="loader-tagline text-xs font-bold uppercase tracking-widest"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "var(--color-primary-container)",
        }}
      >
        TEA × TECH × SARCASM — INITIALIZING
      </p>

      {/* Progress Bar */}
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>

      {/* Status text */}
      <p
        className="loader-tagline mt-4 text-xs uppercase tracking-wider"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "var(--color-outline)",
          animationDelay: "1.5s",
        }}
      >
        Loading Media Kit...
      </p>
    </div>
  );
}

/* ── YouTube Live Section (Real Data) ── */
function YouTubeLiveSection({ onPlayVideo }: { onPlayVideo: (videoId: string) => void }) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [channelTitle, setChannelTitle] = useState("CallMeShazzamTECH");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/youtube");
        const json = await res.json();
        if (json.success && json.data) {
          setVideos(json.data.videos);
          setChannelTitle(json.data.channelTitle);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  function formatViews(count?: string): string {
    if (!count) return "";
    const n = parseInt(count, 10);
    if (isNaN(n)) return count;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
    return `${n} views`;
  }

  function timeAgo(dateStr: string): string {
    const now = Date.now();
    const past = new Date(dateStr).getTime();
    const diff = now - past;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 1) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    if (days < 30) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    const months = Math.floor(days / 30);
    if (days < 365) return `${months} ${months === 1 ? "month" : "months"} ago`;
    const years = Math.floor(days / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }

  // Skeleton loader
  if (loading) {
    return (
      <section className="relative w-full py-10" id="youtube-live">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF0000" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "#FF0000", letterSpacing: "0.1em" }}>
              YOUTUBE LIVE // LATEST UPLOADS
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
            Fresh From The Channel
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="yt-video-card">
              <div className="yt-skeleton aspect-video" />
              <div className="p-4 space-y-2">
                <div className="yt-skeleton h-4 w-full" />
                <div className="yt-skeleton h-4 w-3/4" />
                <div className="yt-skeleton h-3 w-1/2 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error || videos.length === 0) {
    return (
      <section className="relative w-full py-10" id="youtube-live">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF0000" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "#FF0000", letterSpacing: "0.1em" }}>
              YOUTUBE LIVE // LATEST UPLOADS
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
            Fresh From The Channel
          </h2>
        </div>
        <div className="p-8 rounded-2xl text-center glass-card">
          <span className="material-symbols-outlined text-4xl mb-3 block" style={{ color: "#FF0000" }}>smart_display</span>
          <p className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>
            Could not load live YouTube data
          </p>
          <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
            Visit the channel directly for the latest content
          </p>
          <a
            href="https://youtube.com/@callmeshazzamtech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg text-sm font-bold uppercase"
            style={{ background: "#FF0000", color: "#fff", fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="material-symbols-outlined text-base">open_in_new</span>
            Open YouTube Channel
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-10" id="youtube-live">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF0000" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "#FF0000", letterSpacing: "0.1em" }}>
              YOUTUBE LIVE // LATEST UPLOADS
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
            Fresh From {channelTitle}
          </h2>
        </div>
        <a
          href="https://youtube.com/@callmeshazzamtech"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            background: "rgba(255,0,0,0.15)",
            color: "#FF4444",
            border: "1px solid rgba(255,0,0,0.3)",
            letterSpacing: "0.06em",
          }}
        >
          <span className="material-symbols-outlined text-sm">smart_display</span>
          Subscribe on YouTube
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(0, 6).map((video) => (
          <div
            key={video.id}
            className="yt-video-card group block cursor-pointer"
            onClick={() => onPlayVideo(video.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onPlayVideo(video.id); }}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden" style={{ background: "var(--color-surface-container-highest)" }}>
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              {/* Hover Play Overlay */}
              <div className="yt-thumb-overlay absolute inset-0 flex items-center justify-center bg-black/30">
                <span
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "#FF0000", color: "#fff" }}
                >
                  <span className="material-symbols-outlined text-3xl">play_arrow</span>
                </span>
              </div>
              {/* YouTube Badge */}
              <div
                className="absolute top-2.5 left-2.5 px-2 py-1 rounded flex items-center gap-1 text-xs font-bold uppercase"
                style={{ background: "#FF0000", color: "#fff", fontFamily: "var(--font-space-grotesk)" }}
              >
                <span className="material-symbols-outlined text-xs">smart_display</span>
                YouTube
              </div>
              {/* View Count */}
              {video.viewCount && (
                <div
                  className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-xs font-semibold"
                  style={{ background: "rgba(14,14,16,0.85)", color: "var(--color-on-surface)" }}
                >
                  {formatViews(video.viewCount)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h3
                className="text-sm font-semibold leading-snug line-clamp-2 mb-2 transition-colors group-hover:text-white"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}
              >
                {video.title}
              </h3>
              <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-outline)" }}>
                <span>{timeAgo(video.published)}</span>
                {video.viewCount && (
                  <>
                    <span>·</span>
                    <span style={{ color: "#FF4444", fontWeight: 600 }}>{formatViews(video.viewCount)}</span>
                  </>
                )}
              </div>
              {video.description && (
                <p className="text-xs leading-5 mt-2 line-clamp-2" style={{ color: "var(--color-on-surface-variant)" }}>
                  {video.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show More Link */}
      {videos.length > 6 && (
        <div className="mt-6 text-center">
          <a
            href="https://youtube.com/@callmeshazzamtech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all glass-card glass-card-hover"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "0.06em" }}
          >
            <span className="material-symbols-outlined text-base" style={{ color: "#FF0000" }}>smart_display</span>
            View All Videos on YouTube
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      )}
    </section>
  );
}

/* ── Instagram Section ── */
function InstagramSection() {
  const highlights = [
    { title: "Tech Roasts", views: "12M+ Views", icon: "devices", color: "var(--color-primary-container)" },
    { title: "Dubai Diaries", views: "8M+ Views", icon: "flight", color: "var(--color-secondary)" },
    { title: "Unboxings", views: "15M+ Views", icon: "inventory_2", color: "var(--color-primary-fixed)" },
    { title: "Life of Shazzam", views: "10M+ Views", icon: "theater_comedy", color: "var(--color-tertiary)" },
  ];

  const reelStats = [
    { label: "Average Reel Views", value: "2.5M+", icon: "visibility" },
    { label: "Reel Completion Rate", value: "88%", icon: "check_circle" },
    { label: "Avg. Likes per Reel", value: "350K+", icon: "favorite" },
    { label: "Comment Engagement", value: "Top 1%", icon: "chat_bubble" },
  ];

  return (
    <section className="relative w-full py-10" id="instagram">
      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-20 right-0 w-[500px] h-[500px] -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(225,48,108,0.08), rgba(131,58,180,0.04) 50%, transparent 80%)",
          filter: "blur(80px)",
        }}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#E1306C" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "#E1306C", letterSpacing: "0.1em" }}>
              INSTAGRAM // @CALLMESHAZZAM
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}>
            2M+ Followers · Viral Reels Machine
          </h2>
        </div>
        <a
          href="https://instagram.com/callmeshazzam"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
            color: "#fff",
            letterSpacing: "0.06em",
            boxShadow: "0 4px 20px rgba(225,48,108,0.3)",
          }}
        >
          <span className="material-symbols-outlined text-sm">photo_camera</span>
          Follow @callmeshazzam
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-card relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(225,48,108,0.1), transparent 70%)", filter: "blur(40px)" }}
          />
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
                color: "#fff",
                fontFamily: "var(--font-space-grotesk)",
                boxShadow: "0 0 20px rgba(225,48,108,0.4)",
              }}
            >
              SZ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>
                  @callmeshazzam
                </h3>
                <span className="material-symbols-outlined text-base" style={{ color: "#3897F0" }}>verified</span>
              </div>
              <p className="text-sm mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>Shaz Mohamed · Tech Creator</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Followers", value: "2.0M" },
              { label: "Posts", value: "1.2K+" },
              { label: "Avg Reach", value: "4.5M" },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: "rgba(42,42,44,0.5)" }}>
                <p className="stat-num text-2xl" style={{ color: "var(--color-on-surface)" }}>{s.value}</p>
                <span className="text-xs font-bold uppercase" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="p-4 rounded-xl" style={{ background: "rgba(42,42,44,0.4)" }}>
            <p className="text-sm leading-6" style={{ color: "var(--color-on-surface-variant)" }}>
              🇮🇳🇦🇪 Tech Critic · TEDx Speaker · Zero Sugarcoating since 2018
              <br />📱 Honest reviews that save you money
              <br />😂 Comedy that makes tech fun
              <br />☕ CHAi with Tech — every week
            </p>
          </div>

          {/* CTA */}
          <a
            href="https://instagram.com/callmeshazzam"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              background: "rgba(225,48,108,0.15)",
              color: "#E1306C",
              border: "1px solid rgba(225,48,108,0.3)",
              letterSpacing: "0.06em",
            }}
          >
            <span className="material-symbols-outlined text-sm">photo_camera</span>
            View Instagram Profile
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Reel Performance Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {reelStats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl glass-card glass-card-hover transition-all text-center">
                <span className="material-symbols-outlined text-2xl mb-2 block" style={{ color: "#E1306C" }}>{stat.icon}</span>
                <p className="stat-num text-2xl mb-1" style={{ color: "var(--color-on-surface)" }}>{stat.value}</p>
                <span className="text-xs font-bold uppercase" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-outline)", letterSpacing: "0.04em" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Content Highlights */}
          <div className="p-5 rounded-2xl glass-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-base" style={{ color: "#E1306C" }}>auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "#E1306C", letterSpacing: "0.1em" }}>
                CONTENT HIGHLIGHTS
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {highlights.map((h) => (
                <a
                  key={h.title}
                  href="https://instagram.com/callmeshazzam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl text-center transition-all group"
                  style={{ background: "rgba(42,42,44,0.4)" }}
                >
                  <span className="material-symbols-outlined text-3xl mb-2 block transition-transform group-hover:scale-110" style={{ color: h.color }}>{h.icon}</span>
                  <p className="text-sm font-bold mb-0.5" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-on-surface)" }}>{h.title}</p>
                  <span className="text-xs font-semibold" style={{ color: "#E1306C" }}>{h.views}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Viral Reel Showcase */}
          <div className="p-5 rounded-2xl glass-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base" style={{ color: "#F77737" }}>local_fire_department</span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)", color: "#F77737", letterSpacing: "0.1em" }}>
                  TOP VIRAL REELS
                </span>
              </div>
              <a
                href="https://instagram.com/callmeshazzam/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase flex items-center gap-1"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "#E1306C" }}
              >
                See All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="space-y-2">
              {[
                { title: "When tech companies call a 2W charger \"Eco-Friendly\" 😂", views: "3.8M", likes: "420K" },
                { title: "Buying gadgets in Dubai vs Kochi malls 🛒", views: "2.1M", likes: "290K" },
                { title: "POV: You bought a phone for the camera but the battery dies first 📱", views: "4.2M", likes: "510K" },
                { title: "Indian parents reacting to your phone EMI 💀", views: "5.1M", likes: "680K" },
              ].map((reel) => (
                <a
                  key={reel.title}
                  href="https://instagram.com/callmeshazzam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl transition-all group"
                  style={{ background: "rgba(42,42,44,0.3)" }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "linear-gradient(135deg, #833AB4, #E1306C)", color: "#fff" }}
                    >
                      <span className="material-symbols-outlined text-lg">play_arrow</span>
                    </span>
                    <p className="text-sm font-medium truncate" style={{ color: "var(--color-on-surface)" }}>{reel.title}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-xs font-bold" style={{ fontFamily: "var(--font-space-grotesk)", color: "#E1306C" }}>{reel.views} views</span>
                    <span className="text-xs" style={{ color: "var(--color-outline)" }}>♥ {reel.likes}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Main Page ─────────────────────────── */
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const handleLoadingFinish = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handlePlayVideo = useCallback((videoId: string) => {
    setPlayingVideoId(videoId);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setPlayingVideoId(null);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}
      {playingVideoId && <VideoPlayerModal videoId={playingVideoId} onClose={handleCloseVideo} />}
      <NavBar />
      <main className="w-full max-w-7xl mx-auto px-4 lg:px-12 pt-20 pb-12">
        <HeroSection />
        <BentoSection />
        <StreamSection onPlayVideo={handlePlayVideo} />
        <YouTubeLiveSection onPlayVideo={handlePlayVideo} />
        <InstagramSection />
        <AudienceSection />
        <WhyWorkSection />
        <CollabTerminal />
      </main>
      <Footer />
    </>
  );
}
