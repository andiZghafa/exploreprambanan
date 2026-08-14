"use client";

import { useState, useEffect, useRef } from "react";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

type ArtifactCard = {
  id: string;
  number: string;
  title: string;
  href: string;
  bgImage: string;
};

const LITERACY_CARDS: ArtifactCard[] = [
  {
    id: "shiva-tandawa",
    number: "01",
    title: "Shiva Tandawa",
    href: "/literacy/shiva-tandawa",
    bgImage: "/images/literacy/shiva-tandawa.jpg",
  },
  {
    id: "valley-gods",
    number: "02",
    title: "Valley of the Gods",
    href: "/literacy/valley-gods",
    bgImage: "/images/literacy/valley-gods.jpg",
  },
  {
    id: "siwagrha",
    number: "03",
    title: "Siwagrha",
    href: "/literacy/siwagrha",
    bgImage: "/images/literacy/siwagrha.jpg",
  },
  {
    id: "prambanan",
    number: "04",
    title: "Prambanan",
    href: "/literacy/prambanan",
    bgImage: "/images/literacy/prambanan.jpg",
  },
  {
    id: "sewu",
    number: "05",
    title: "Sewu",
    href: "/literacy/sewu",
    bgImage: "/images/literacy/sewu.jpg",
  },
  {
    id: "temples",
    number: "06",
    title: "Lumbung, Bubrah & Gana Temple",
    href: "/literacy/temples",
    bgImage: "/images/literacy/temples.jpg",
  },
];

export default function LiteracyPage() {
  const [isLoaded, setIsLoaded] = useState(true);
  const { t } = useLanguage();

  // Ref untuk container kartu
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Native Wheel Event Handler untuk Horizontal Scroll di Desktop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheelNative = (e: WheelEvent) => {
      // Jalankan logika scroll horizontal hanya di desktop (>= 768px)
      if (window.innerWidth >= 768) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollBy({
            left: e.deltaY * 1.8,
            behavior: "smooth",
          });
        }
      }
    };

    container.addEventListener("wheel", handleWheelNative, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheelNative);
    };
  }, []);

  return (
    <main
      className={`${poppins.className} relative min-h-screen w-full bg-neutral-900 tracking-[-0.025em] flex flex-col`}
    >
      {/* ⚪ White Fade-in Transition Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-700 pointer-events-none ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="sticky top-0 z-50 w-full">
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
              {t.nav?.literacy || "Literacy"}
            </h1>
          </div>

          {/* Cards Container */}
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
              {LITERACY_CARDS.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group relative w-full md:w-[430px] lg:w-[460px] h-[220px] sm:h-[260px] md:h-[300px] flex-shrink-0 snap-start rounded-[24px] sm:rounded-[32px] bg-white border border-neutral-200 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 flex overflow-hidden p-4 sm:p-5"
                >
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-between">
                    <h3 className="text-center text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-black leading-tight capitalize">
                      {card.title}
                    </h3>

                    <div className="flex h-[72%] w-full items-end justify-center">
                      <img
                        src={card.bgImage}
                        alt={card.title}
                        className="h-full w-full max-w-[210px] object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
