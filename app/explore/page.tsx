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
  number: string;
  href: string;
  bgImage: string;
};

const EXPLORE_CARDS: ExploreCard[] = [
  {
    id: "arca",
    number: "01",
    href: "/arca",
    bgImage: "/arca-card.png",
  },
  {
    id: "lingga",
    number: "02",
    href: "/lingga",
    bgImage: "/lingga-card.png",
  },
  {
    id: "literacy",
    number: "03",
    href: "/literacy",
    bgImage: "/literacy-card.png",
  },
  {
    id: "others",
    number: "04",
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
      if (window.innerWidth >= 768) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollLeft += e.deltaY * 2.5;
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

      {/* Navbar diletakkan di z-50 di atas overlay putih agar tetap bisa diklik */}
      <div className="relative z-50 w-full">
        <Navbar />
      </div>

      <section className="relative flex-1 w-full overflow-visible px-4 py-8 md:px-12 md:py-12 text-black flex flex-col justify-center">
        {/* Background Texture Image dengan pointer-events-none agar aman di mobile */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/explore-bg5.png"
            alt="Explore background texture"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* Header */}
          <div className="mb-6 md:mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold md:text-6xl text-black drop-shadow-sm">
              {t.nav.exploreTemple}
            </h1>
          </div>

          {/* Cards Container dengan Dukungan Scroll Wheel */}
          <div
            ref={scrollContainerRef}
            className="flex flex-col md:flex-row gap-4 sm:gap-6 md:overflow-x-auto pb-8 pt-2 pr-6 md:pr-10 scrollbar-none snap-y md:snap-x snap-mandatory scroll-smooth"
          >
            {EXPLORE_CARDS.map((card) => {
              const cardTitle = t.nav?.[card.id] || card.id;

              return (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group relative w-full md:w-[450px] lg:w-[500px] h-[220px] sm:h-[260px] md:h-[300px] flex-shrink-0 snap-start rounded-[24px] sm:rounded-[32px] bg-white border border-neutral-200 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 flex overflow-hidden p-5 sm:p-6"
                >
                  {/* Left Side: Title & Large Number */}
                  <div className="flex flex-1 flex-col justify-between pr-2 sm:pr-4 z-10">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-black leading-tight capitalize">
                      {cardTitle}
                    </h3>

                    <span className="text-4xl sm:text-5xl md:text-6xl font-black text-black group-hover:scale-105 transition-transform inline-block">
                      {card.number}
                    </span>
                  </div>

                  {/* Right Side: Image Container */}
                  <div className="relative w-1/2 h-full flex items-center justify-center flex-shrink-0">
                    <img
                      src={card.bgImage}
                      alt={cardTitle}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              );
            })}

            {/* Invisible spacer so the final card can scroll fully into view */}
            <div className="flex-shrink-0 w-6 md:w-10" aria-hidden="true" />
          </div>
        </div>
      </section>
    </main>
  );
}
