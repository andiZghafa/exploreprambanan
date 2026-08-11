"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage, LanguageCode } from "@/context/LanguageContext";

type Language = {
  code: LanguageCode;
  label: string;
  flagUrl: string;
};

const LANGUAGES: Language[] = [
  {
    code: "id",
    label: "Indonesian",
    flagUrl: "https://flagcdn.com/w40/id.png",
  },
  {
    code: "en",
    label: "English",
    flagUrl: "https://flagcdn.com/w40/gb.png",
  },
  {
    code: "zh",
    label: "Chinese",
    flagUrl: "https://flagcdn.com/w40/cn.png",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS = [
    { label: t?.nav?.home ?? "Home", href: "/" },
    { label: t?.nav?.arca ?? "Arca", href: "/arca" },
    { label: t?.nav?.lingga ?? "Lingga", href: "/lingga" },
    { label: t?.nav?.literacy ?? "Literacy", href: "/literacy" },
    { label: t?.nav?.others ?? "Others", href: "/others" },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* 
        FIX: Using fixed positioning with hardcoded z-index inline 
        ensures mobile browsers float the header bar strictly above all hero/page layers.
      */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99990,
          pointerEvents: "auto",
        }}
        className="w-full font-montserrat"
      >
        <div className="flex items-center justify-between bg-white/90 px-6 py-5 backdrop-blur-sm md:px-12">
          <Link href="/" className="select-none">
            <img
              src="/logo-injourney.png"
              alt="Injourney Destinations"
              className="h-10 w-auto md:h-12"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
            className="-mr-2 flex flex-col items-end gap-1.5 p-3 cursor-pointer relative z-[99991] select-none active:opacity-70"
          >
            <span className="block h-0.5 w-8 bg-neutral-900 pointer-events-none" />
            <span className="block h-0.5 w-8 bg-neutral-900 pointer-events-none" />
            <span className="block h-0.5 w-8 bg-neutral-900 pointer-events-none" />
          </button>
        </div>
      </header>

      {/* Spacer to prevent fixed header from covering top hero content */}
      <div className="h-[80px] w-full" aria-hidden="true" />

      {/* Slide-over Overlay Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          display: "flex",
          justifyContent: "flex-end",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 300ms ease",
          backgroundColor: isOpen ? "rgba(0,0,0,0.5)" : "transparent",
        }}
      >
        {/* Backdrop button */}
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-transparent border-none w-full h-full cursor-pointer"
        />

        {/* Panel Container */}
        <div
          className="relative flex h-full w-full max-w-md flex-col bg-neutral-200 px-8 py-6 shadow-2xl"
          style={{
            transform: isOpen ? "translateX(0%)" : "translateX(100%)",
            transition: "transform 300ms ease-out",
          }}
        >
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowSearch((s) => !s)}
              aria-label="Toggle search"
              aria-pressed={showSearch}
              className="rounded-full p-2 transition-colors hover:bg-neutral-300/70"
            >
              <svg
                className="h-5 w-5 text-neutral-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="rounded-full border border-neutral-900 p-1.5 transition-colors hover:bg-neutral-300/70"
            >
              <svg
                className="h-5 w-5 text-neutral-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {showSearch && (
            <div className="mt-6">
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t?.nav?.searchPlaceholder ?? "Search..."}
                className="w-full rounded-full border border-neutral-400 bg-white px-5 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-900"
              />
            </div>
          )}

          <nav className="mt-10 flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-extrabold tracking-tight text-neutral-900 transition-colors hover:text-neutral-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="mt-auto flex items-center gap-3 pt-10">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                aria-label={`Switch to ${lang.label}`}
                className={`flex h-8 w-12 items-center justify-center overflow-hidden rounded border transition-all ${
                  language === lang.code
                    ? "scale-105 border-neutral-900 bg-white ring-2 ring-neutral-900/30"
                    : "border-neutral-300 bg-white/80 opacity-70 hover:border-neutral-900 hover:opacity-100"
                }`}
                title={lang.label}
              >
                <img
                  src={lang.flagUrl}
                  alt={lang.label}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
