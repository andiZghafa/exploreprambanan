"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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

type SearchItem = {
  label: string;
  href: string;
  category: string;
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

const SEARCH_ITEMS: SearchItem[] = [
  { label: "Home", href: "/", category: "Main" },
  { label: "Explore", href: "/explore", category: "Main" },
  { label: "Arca", href: "/arca", category: "Collection" },
  { label: "Agni", href: "/arca/agni", category: "Arca" },
  { label: "Bodhisatwa", href: "/arca/bodhisatwa", category: "Arca" },
  { label: "Buddha 1", href: "/arca/buddha-1", category: "Arca" },
  { label: "Buddha 2", href: "/arca/buddha-2", category: "Arca" },
  { label: "Daniswara", href: "/arca/daniswara", category: "Arca" },
  { label: "Dewa Surya", href: "/arca/dewa-surya", category: "Arca" },
  { label: "Dewa", href: "/arca/dewa", category: "Arca" },
  { label: "Dewi Kaumari", href: "/arca/dewi-kaumari", category: "Arca" },
  { label: "Dewi Tara", href: "/arca/dewi-tara", category: "Arca" },
  {
    label: "Dhayani Buddha Ratnasambhaw",
    href: "/arca/dhyani-1",
    category: "Arca",
  },
  { label: "Dhayani Budha Amitabh", href: "/arca/dhyani-2", category: "Arca" },
  { label: "Durga Mahisasuramardhini", href: "/arca/durga", category: "Arca" },
  { label: "Ganesha", href: "/arca/ganesha", category: "Arca" },
  { label: "Kala", href: "/arca/kala", category: "Arca" },
  { label: "Mahakala", href: "/arca/mahakala", category: "Arca" },
  { label: "Motif", href: "/arca/motif", category: "Arca" },
  { label: "Nandi", href: "/arca/nandi", category: "Arca" },
  { label: "Relief Dewa", href: "/arca/relief-dewa", category: "Arca" },
  { label: "Relief Dinding", href: "/arca/relief-dinding", category: "Arca" },
  { label: "Resi", href: "/arca/resi", category: "Arca" },
  { label: "Singa 1", href: "/arca/singa-1", category: "Arca" },
  { label: "Singa 2", href: "/arca/singa-2", category: "Arca" },
  { label: "Siwa", href: "/arca/siwa", category: "Arca" },
  { label: "Lingga", href: "/lingga", category: "Collection" },
  { label: "Prasasti", href: "/lingga/prasasti", category: "Lingga" },
  { label: "Linggaa", href: "/lingga/linggaa", category: "Lingga" },
  { label: "Literacy", href: "/literacy", category: "Collection" },
  {
    label: "Shiva Tandawa",
    href: "/literacy/shiva-tandawa",
    category: "Literacy",
  },
  {
    label: "Valley of the Gods",
    href: "/literacy/valley-gods",
    category: "Literacy",
  },
  { label: "Siwagrha", href: "/literacy/siwagrha", category: "Literacy" },
  { label: "Prambanan", href: "/literacy/prambanan", category: "Literacy" },
  { label: "Sewu", href: "/literacy/sewu", category: "Literacy" },
  {
    label: "Lumbung, Bubrah & Gana Temple",
    href: "/literacy/temples",
    category: "Literacy",
  },
  { label: "Others", href: "/others", category: "Collection" },
  { label: "Jaladwara", href: "/others/jaladwara", category: "Others" },
  {
    label: "Landasan Garuda",
    href: "/others/landasan-garuda",
    category: "Others",
  },
  { label: "Antefik 1", href: "/others/antefik-1", category: "Others" },
  { label: "Antefik 2", href: "/others/antefik-2", category: "Others" },
];

const normalizeSearchValue = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

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
  const router = useRouter();
  const pathname = usePathname();

  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS: NavLink[] = [
    { label: t.nav?.home ?? "Home", href: "/" },
    { label: t.nav?.arca ?? "Arca", href: "/arca" },
    { label: t.nav?.lingga ?? "Lingga", href: "/lingga" },
    { label: t.nav?.literacy ?? "Literacy", href: "/literacy" },
    { label: t.nav?.others ?? "Others", href: "/others" },
  ];

  const activeLanguage =
    LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  const searchResults = (searchValue: string) => {
    const raw = searchValue.trim();

    if (!raw) {
      return [];
    }

    const normalized = normalizeSearchValue(raw);

    return SEARCH_ITEMS.filter((item) => {
      const itemText = `${item.label} ${item.category} ${item.href}`;
      return normalizeSearchValue(itemText).includes(normalized);
    }).slice(0, 6);
  };

  const desktopResults = searchResults(desktopQuery);
  const mobileResults = searchResults(query);

  const navigateToSearchResult = (href: string) => {
    setDesktopQuery("");
    setQuery("");
    setDesktopSearchOpen(false);
    setShowSearch(false);
    setIsOpen(false);
    router.push(href);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    const result = searchResults(value)[0];
    if (result) {
      navigateToSearchResult(result.href);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setLangOpen(false);
        setOpenDropdown(null);
        setDesktopSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
    <header className="relative z-50 w-full font-poppins">
      <div className="flex items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-4 md:px-12">
        <Link href="/" className="select-none shrink-0">
          <img
            src="/logo-injourney.png"
            alt="Injourney Destinations"
            className="h-6 w-auto md:h-8"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname
              ? link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href)
              : false;

            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.href)}
                onMouseLeave={() => link.children && setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 whitespace-nowrap text-[15px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#d8b06a] text-white px-3 py-1 rounded-sm"
                      : "text-neutral-800 hover:text-neutral-500"
                  }`}
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
              </div>
            );
          })}
        </nav>

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
                <div className="w-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
                  <input
                    autoFocus
                    type="search"
                    value={desktopQuery}
                    onChange={(e) => setDesktopQuery(e.target.value)}
                    onKeyDown={(e) => handleSearchKeyDown(e, desktopQuery)}
                    placeholder={t.nav?.searchPlaceholder ?? "Search"}
                    className="w-full border-0 bg-white px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-500"
                  />

                  {desktopQuery.trim() && desktopResults.length > 0 && (
                    <div className="max-h-72 overflow-y-auto border-t border-neutral-200">
                      {desktopResults.map((item) => (
                        <button
                          key={item.href}
                          type="button"
                          onClick={() => navigateToSearchResult(item.href)}
                          className="flex w-full items-center justify-between gap-3 border-b border-neutral-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-neutral-100"
                        >
                          <span className="font-medium text-neutral-800">
                            {item.label}
                          </span>
                          <span className="text-xs uppercase tracking-[0.12em] text-neutral-500">
                            {item.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {desktopQuery.trim() && desktopResults.length === 0 && (
                    <div className="border-t border-neutral-200 px-4 py-3 text-sm text-neutral-500">
                      No results found.
                    </div>
                  )}
                </div>
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
                onKeyDown={(e) => handleSearchKeyDown(e, query)}
                placeholder={t.nav?.searchPlaceholder ?? "Search"}
                className="w-full rounded-full border border-neutral-400 bg-white px-5 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-900"
              />

              {query.trim() && mobileResults.length > 0 && (
                <div className="mt-3 rounded-2xl border border-neutral-300 bg-white p-2 shadow-lg">
                  {mobileResults.map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => navigateToSearchResult(item.href)}
                      className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-neutral-100"
                    >
                      <span className="text-sm font-medium text-neutral-800">
                        {item.label}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {query.trim() && mobileResults.length === 0 && (
                <div className="mt-3 rounded-2xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-500">
                  No results found.
                </div>
              )}
            </div>
          )}

          <nav className="mt-8 flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const isActive = pathname
                ? link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href)
                : false;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-semibold leading-tight transition-colors ${
                    isActive
                      ? "bg-[#d8b06a] text-white px-3 py-2 rounded-sm"
                      : "text-neutral-800 hover:text-neutral-500"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

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
