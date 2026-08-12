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

const OTHERS_CARDS: ArtifactCard[] = [
  {
    id: "jaladwara",
    number: "01",
    title: "Jaladwara",
    href: "/others/jaladwara",
    bgImage: "/images/others/jaladwara.png",
  },
  {
    id: "landasan-garuda",
    number: "02",
    title: "Landasan Garuda",
    href: "/others/landasan-garuda",
    bgImage: "/images/others/landasan-garuda.png",
  },
  {
    id: "antefik-1",
    number: "03",
    title: "Antefik 1",
    href: "/others/antefik-1",
    bgImage: "/images/others/antefik-1.png",
  },
  {
    id: "antefik-2",
    number: "04",
    title: "Antefik 2",
    href: "/others/antefik-2",
    bgImage: "/images/others/antefik-2.png",
  },
];

export default function OthersPage() {
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

      <section className="relative flex-1 w-full px-4 py-8 md:px-12 md:py-12 text-black flex flex-col justify-center">
        {/* Background Texture Image dengan pointer-events-none agar tidak menutupi sentuhan */}
        <div className="absolute inset-0 z-0 pointer-events-none">
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
              {t.nav?.others || "Others"}
            </h1>
          </div>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex flex-col md:flex-row gap-4 sm:gap-6 md:overflow-x-auto pb-8 pt-2 scrollbar-none"
          >
            {OTHERS_CARDS.map((card) => (
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
