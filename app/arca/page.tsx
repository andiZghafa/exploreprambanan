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

const ARCA_CARDS: ArtifactCard[] = [
  {
    id: "agni",
    number: "01",
    title: "Agni",
    href: "/arca/agni",
    bgImage: "/images/arca/agni.png",
  },
  {
    id: "bodhisatwa",
    number: "02",
    title: "Arca Bodhisatwa",
    href: "/arca/bodhisatwa",
    bgImage: "/images/arca/bodhisatwa.png",
  },
  {
    id: "buddha-1",
    number: "03",
    title: "Arca Buddha 1",
    href: "/arca/buddha-1",
    bgImage: "/images/arca/buddha-1.png",
  },
  {
    id: "buddha-2",
    number: "04",
    title: "Arca Buddha 2",
    href: "/arca/buddha-2",
    bgImage: "/images/arca/buddha-2.png",
  },
  {
    id: "daniswara",
    number: "05",
    title: "Arca Daniswara",
    href: "/arca/daniswara",
    bgImage: "/images/arca/daniswara.png",
  },
  {
    id: "dewa-surya",
    number: "06",
    title: "Arca Dewa Surya",
    href: "/arca/dewa-surya",
    bgImage: "/images/arca/dewa-surya.png",
  },
  {
    id: "dewa",
    number: "07",
    title: "Arca Dewa",
    href: "/arca/dewa",
    bgImage: "/images/arca/dewa.png",
  },
  {
    id: "dewi-kaumari",
    number: "08",
    title: "Arca Dewi Kaumari",
    href: "/arca/dewi-kaumari",
    bgImage: "/images/arca/dewi-kaumari.png",
  },
  {
    id: "dewi-tara",
    number: "09",
    title: "Dewi Tara",
    href: "/arca/dewi-tara",
    bgImage: "/images/arca/dewi-tara.png",
  },
  {
    id: "dhyani-1",
    number: "10",
    title: "Arca Dhyani Buddha Ratnasambhaw",
    href: "/arca/dhyani-1",
    bgImage: "/images/arca/dhyani-1.png",
  },
  {
    id: "dhyani-2",
    number: "11",
    title: "Arca Dhyani Budha Amitabh",
    href: "/arca/dhyani-2",
    bgImage: "/images/arca/dhyani-2.png",
  },
  {
    id: "durga",
    number: "12",
    title: "Arca Durga Mahisasuramardhini",
    href: "/arca/durga",
    bgImage: "/images/arca/durga.png",
  },
  {
    id: "ganesha",
    number: "13",
    title: "Ganesha",
    href: "/arca/ganesha",
    bgImage: "/images/arca/ganesha.png",
  },
  {
    id: "kala",
    number: "14",
    title: "Kala",
    href: "/arca/kala",
    bgImage: "/images/arca/kala.png",
  },
  {
    id: "mahakala",
    number: "15",
    title: "Mahakala",
    href: "/arca/mahakala",
    bgImage: "/images/arca/mahakala.png",
  },
  {
    id: "motif",
    number: "16",
    title: "Motif",
    href: "/arca/motif",
    bgImage: "/images/arca/motif.png",
  },
  {
    id: "nandi",
    number: "17",
    title: "Nandi",
    href: "/arca/nandi",
    bgImage: "/images/arca/nandi.png",
  },
  {
    id: "relief-dewa",
    number: "18",
    title: "Relief Dewa",
    href: "/arca/relief-dewa",
    bgImage: "/images/arca/relief-dewa.png",
  },
  {
    id: "relief-dinding",
    number: "19",
    title: "Relief Dinding",
    href: "/arca/relief-dinding",
    bgImage: "/images/arca/relief-dinding.png",
  },
  {
    id: "resi",
    number: "20",
    title: "Arca Resi",
    href: "/arca/resi",
    bgImage: "/images/arca/resi.png",
  },
  {
    id: "singa-1",
    number: "21",
    title: "Singa 1",
    href: "/arca/singa-1",
    bgImage: "/images/arca/singa-1.png",
  },
  {
    id: "singa-2",
    number: "22",
    title: "Singa 2",
    href: "/arca/singa-2",
    bgImage: "/images/arca/singa-2.png",
  },
  {
    id: "siwa",
    number: "23",
    title: "Arca Siwa",
    href: "/arca/siwa",
    bgImage: "/images/arca/siwa.png",
  },
];

export default function ArcaPage() {
  const [isLoaded, setIsLoaded] = useState(true);
  const { t } = useLanguage();
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
      <div
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-700 pointer-events-none ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

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
          <div className="mb-4 md:mb-8 text-center md:text-left">
            <h1 className="-translate-y-4 md:-translate-y-12 text-lg sm:text-xl font-semibold md:text-4xl text-black drop-shadow-sm">
              {t.nav?.arca || "Arca"}
            </h1>
          </div>

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
              {ARCA_CARDS.map((card) => (
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
