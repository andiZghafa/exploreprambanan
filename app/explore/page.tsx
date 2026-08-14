"use client";

import { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

type ExploreCard = {
  id: "arca" | "lingga" | "literacy" | "others";
  href: string;
  bgImage: string;
};

const EXPLORE_CARDS: ExploreCard[] = [
  {
    id: "arca",
    href: "/arca",
    bgImage: "/arca-card.png",
  },
  {
    id: "lingga",
    href: "/lingga",
    bgImage: "/lingga-card.png",
  },
  {
    id: "literacy",
    href: "/literacy",
    bgImage: "/literacy-card.png",
  },
  {
    id: "others",
    href: "/others",
    bgImage: "/others-card.png",
  },
];

export default function ExplorePage() {
  // 1. Mulai dengan false (layar tertutup putih penuh saat pertama kali dibuka)
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useLanguage();

  // Ref untuk container kartu horizontal
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollCards = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth =
      container.querySelector("a")?.getBoundingClientRect().width ?? 430;
    const gap = 24;

    container.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  // 2. Memicu animasi fade-in putih menjadi transparan setelah komponen terpasang
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50); // Jeda kecil agar transisi mulus dibaca browser
    return () => clearTimeout(timer);
  }, []);

  // Native Non-Passive Event Listener untuk Scroll Wheel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheelNative = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;
      if (!container.contains(e.target as Node)) return;

      const delta = e.deltaY || e.deltaX;
      if (delta === 0) return;

      e.preventDefault();
      container.scrollBy({
        left: delta * 3,
        behavior: "smooth",
      });
    };

    container.addEventListener("wheel", handleWheelNative, { passive: false });
    window.addEventListener("wheel", handleWheelNative, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheelNative);
      window.removeEventListener("wheel", handleWheelNative);
    };
  }, []);

  return (
    <main
      className={`${poppins.className} relative min-h-screen w-full bg-[url('/explore-bg-mb.png')] bg-repeat bg-cover bg-center tracking-[-0.025em] flex flex-col md:bg-neutral-900 md:bg-none`}
    >
      {/* ⚪ White Fade-in Transition Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-700 pointer-events-none ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Navbar diletakkan di z-50 di atas overlay putih agar tetap bisa diklik */}
      <div className="relative z-50 w-full">
        <Navbar />
      </div>

      {/* Content Container */}
      <section className="relative flex-1 w-full overflow-hidden px-6 py-8 md:px-16 md:py-16 text-black flex flex-col justify-center md:bg-transparent">
        {/* Background Texture Image */}
        <div
          className="absolute inset-0 z-0 overflow-hidden md:hidden"
          style={{
            backgroundImage: "url('/explore-bg-mb.png')",
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 z-0 hidden overflow-hidden md:block">
          <img
            src="/explore-bg6.png"
            alt="Background texture"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* Header */}
          <div className="mb-4 md:mb-8 text-center md:text-left">
            <h1 className="-translate-y-4 md:-translate-y-12 text-lg sm:text-xl font-semibold md:text-4xl text-black drop-shadow-sm">
              {t.nav.exploreTemple}
            </h1>
          </div>

          {/* Cards Container dengan Dukungan Scroll Wheel */}
          <div className="relative -translate-y-2 md:-translate-y-3 md:pl-8 md:pr-8">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollCards("left")}
              className="absolute left-[-1.5rem] top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9b77a] bg-[#d8b06a] text-3xl font-light text-white shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 md:flex"
            >
              ‹
            </button>

            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollCards("right")}
              className="absolute right-[-1.5rem] top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9b77a] bg-[#d8b06a] text-3xl font-light text-white shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 md:flex"
            >
              ›
            </button>

            <div
              ref={scrollContainerRef}
              className="flex flex-col md:flex-row gap-4 sm:gap-6 md:overflow-x-auto pb-8 pt-2 scrollbar-none"
            >
              {EXPLORE_CARDS.map((card) => {
                const cardTitle = t.nav?.[card.id] || card.id;

                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className="group relative w-full md:w-[430px] lg:w-[460px] h-[220px] sm:h-[260px] md:h-[300px] flex-shrink-0 snap-start rounded-[24px] sm:rounded-[32px] bg-white border border-neutral-200 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 flex overflow-hidden p-4 sm:p-5"
                  >
                    <div className="relative z-10 flex h-full w-full flex-col items-center justify-between">
                      <h3 className="text-center text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-black leading-tight capitalize">
                        {cardTitle}
                      </h3>

                      <div className="flex h-[72%] w-full items-end justify-center">
                        <img
                          src={card.bgImage}
                          alt={cardTitle}
                          className="h-full w-full max-w-[210px] object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* Invisible spacer so the final card can scroll fully into view */}
              <div
                className="flex-shrink-0 w-12 md:w-20 lg:w-24"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
