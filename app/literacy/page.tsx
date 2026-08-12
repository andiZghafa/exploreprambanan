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

      <section className="relative flex-1 w-full overflow-hidden px-4 py-8 md:px-12 md:py-12 text-black flex flex-col justify-center">
        {/* Background Texture Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/explore-bg4.png"
            alt="Explore background texture"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* Header */}
          <div className="mb-6 md:mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold md:text-6xl text-black drop-shadow-sm">
              {t.nav?.literacy || "Literacy"}
            </h1>
          </div>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex flex-col md:flex-row gap-4 sm:gap-6 md:overflow-x-auto pb-8 pt-2 scrollbar-none"
          >
            {LITERACY_CARDS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="group relative w-full md:w-[420px] h-[220px] sm:h-[260px] flex-shrink-0 rounded-[24px] sm:rounded-[32px] bg-white border border-neutral-200 shadow-xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-2xl flex overflow-hidden p-5 sm:p-6"
              >
                {/* Left Side: Title & Large Number */}
                <div className="flex flex-1 flex-col justify-between pr-2 sm:pr-4 z-10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-black leading-tight">
                    {card.title}
                  </h3>

                  <span className="text-4xl sm:text-5xl md:text-6xl font-black text-black group-hover:scale-105 transition-transform inline-block">
                    {card.number}
                  </span>
                </div>

                {/* Right Side: Image Container */}
                <div className="relative w-1/2 h-full flex items-center justify-center flex-shrink-0">
                  <img
                    src={card.bgImage}
                    alt={card.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
