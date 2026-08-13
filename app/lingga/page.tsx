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

const LINGGA_CARDS: ArtifactCard[] = [
  {
    id: "prasasti",
    number: "01",
    title: "Prasasti",
    href: "/lingga/prasasti",
    bgImage: "/images/lingga/prasasti.png",
  },
  {
    id: "linggaa",
    number: "02",
    title: "Lingga",
    href: "/lingga/linggaa",
    bgImage: "/images/lingga/linggaa.png",
  },
];

export default function LinggaPage() {
  const [isLoaded, setIsLoaded] = useState(true);
  const { t } = useLanguage();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
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
          container.scrollBy({
            left: e.deltaY * 3,
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

      {/* Navbar ditaruh di luar aliran layout utama dengan z-index tertinggi agar aman disentuh di mobile */}
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
          <div className="mb-6 md:mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold md:text-6xl text-black drop-shadow-sm">
              {t.nav?.lingga || "Lingga"}
            </h1>
          </div>
          {/* Subtle hint for desktop horizontal browsing */}
          <div className="mb-3 hidden items-center justify-end gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-700/80 md:flex">
            <span aria-hidden="true" className="text-base leading-none">
              ←
            </span>
            <span>Scroll</span>
            <span aria-hidden="true" className="text-base leading-none">
              →
            </span>
          </div>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex flex-col md:flex-row gap-4 sm:gap-6 md:overflow-x-auto pb-8 pt-2 scrollbar-none"
          >
            {LINGGA_CARDS.map((card) => (
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
      </section>
    </main>
  );
}
