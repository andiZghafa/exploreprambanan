"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage, LanguageCode } from "@/context/LanguageContext";

type NavChild = {
  label: string;
  href: string;
};

type NavLink = {
  label: string;
  href: string;
  children?: NavChild[];
};

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
  const [isOpen, setIsOpen] = useState(false); // mobile overlay
  const [showSearch, setShowSearch] = useState(false); // mobile search
  const [query, setQuery] = useState("");

  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [desktopQuery, setDesktopQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const langRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS: NavLink[] = [
    { label: t.nav?.home ?? "Home", href: "/" },
    { label: t.nav?.arca ?? "Arca", href: "/arca" },
    { label: t.nav?.lingga ?? "Lingga", href: "/lingga" },
    { label: t.nav?.literacy ?? "Literacy", href: "/literacy" },
    { label: t.nav?.others ?? "Others", href: "/others" },
    // To get a dropdown like "Destinations ⌄" on desktop, just add a
    // `children` array to any link above, e.g.:
    // { label: "Destinations", href: "/destinations", children: [
    //   { label: "Arca", href: "/arca" },
    //   { label: "Lingga", href: "/lingga" },
    // ] },
  ];

  const activeLanguage =
    LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  // Lock scroll while mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile overlay on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setLangOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close desktop language dropdown / search on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setDesktopSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="relative z-50 w-full font-montserrat">
      <div className="flex items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-4 md:px-12">
        {/* Logo */}
        <Link href="/" className="select-none shrink-0">
          <img
            src="/logo-injourney.png"
            alt="Injourney Destinations"
            className="h-6 w-auto md:h-8"
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.href)}
              onMouseLeave={() => link.children && setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 whitespace-nowrap text-[15px] font-medium text-neutral-800 transition-colors hover:text-neutral-500"
              >
                {link.label}
                {link.children && (
                  <svg
                    className={`h-4 w-4 text-neutral-500 transition-transform ${
                      openDropdown === link.href ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </Link>

              {link.children && openDropdown === link.href && (
                <div className="absolute left-1/2 top-full z-50 min-w-[180px] -translate-x-1/2 pt-3">
                  <div className="flex flex-col gap-1 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop right cluster: search + language */}
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <div ref={searchRef} className="relative">
            <button
              type="button"
              onClick={() => setDesktopSearchOpen((s) => !s)}
              aria-label="Toggle search"
              aria-pressed={desktopSearchOpen}
              className="rounded-full p-2 text-neutral-800 transition-colors hover:bg-neutral-100"
            >
              <svg
                className="h-5 w-5"
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

            {desktopSearchOpen && (
              <div className="absolute right-0 top-full z-50 pt-3">
                <input
                  autoFocus
                  type="search"
                  value={desktopQuery}
                  onChange={(e) => setDesktopQuery(e.target.value)}
                  placeholder={t.nav?.searchPlaceholder ?? "Search"}
                  className="w-64 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 shadow-lg outline-none focus:border-neutral-900"
                />
              </div>
            )}
          </div>

          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              aria-label="Change language"
              aria-expanded={langOpen}
              className="flex items-center gap-1 rounded-full p-1 transition-colors hover:bg-neutral-100"
            >
              <span className="h-6 w-6 overflow-hidden rounded-full border border-neutral-200">
                <img
                  src={activeLanguage.flagUrl}
                  alt={activeLanguage.label}
                  className="h-full w-full object-cover"
                />
              </span>
              <svg
                className={`h-4 w-4 text-neutral-600 transition-transform ${
                  langOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full z-50 pt-3">
                <div className="flex flex-col gap-1 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        language === lang.code
                          ? "bg-neutral-100 text-neutral-900"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      <span className="h-5 w-5 overflow-hidden rounded-full border border-neutral-200">
                        <img
                          src={lang.flagUrl}
                          alt={lang.label}
                          className="h-full w-full object-cover"
                        />
                      </span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger (only shows below md) */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="flex flex-col items-end gap-1.5 p-2 -mr-2 md:hidden"
        >
          <span className="block h-0.5 w-8 bg-neutral-900" />
          <span className="block h-0.5 w-8 bg-neutral-900" />
          <span className="block h-0.5 w-8 bg-neutral-900" />
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-neutral-900/40"
        />

        <div
          className={`relative flex h-full w-full max-w-md flex-col bg-neutral-200 px-8 py-6 shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowSearch((s) => !s)}
              aria-label="Toggle search"
              aria-pressed={showSearch}
              className="rounded-full p-2 hover:bg-neutral-300/70 transition-colors"
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
              className="rounded-full border border-neutral-900 p-1.5 hover:bg-neutral-300/70 transition-colors"
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
                placeholder={t.nav?.searchPlaceholder ?? "Search"}
                className="w-full rounded-full border border-neutral-400 bg-white px-5 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-900"
              />
            </div>
          )}

          <nav className="mt-8 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold leading-tight text-neutral-800 transition-colors hover:text-neutral-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Flag Language Switcher */}
          <div className="mt-auto flex items-center gap-3 pt-10">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                aria-label={`Switch to ${lang.label}`}
                className={`flex h-8 w-12 items-center justify-center rounded border overflow-hidden transition-all ${
                  language === lang.code
                    ? "border-neutral-900 bg-white ring-2 ring-neutral-900/30 scale-105"
                    : "border-neutral-300 bg-white/80 hover:border-neutral-900 opacity-70 hover:opacity-100"
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
    </header>
  );
}
