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
  bgImage: string;
};

const ARCA_CARDS: ArtifactCard[] = [
  {
    id: "agni",
    number: "01",
    title: "Agni",
    bgImage: "/images/arca/agni.png",
  },
  {
    id: "bodhisatwa",
    number: "02",
    title: "Arca Bodhisatwa",
    bgImage: "/images/arca/bodhisatwa.png",
  },
  {
    id: "buddha-1",
    number: "03",
    title: "Arca Buddha 1",
    bgImage: "/images/arca/buddha-1.png",
  },
  {
    id: "buddha-2",
    number: "04",
    title: "Arca Buddha 2",
    bgImage: "/images/arca/buddha-2.png",
  },
  {
    id: "daniswara",
    number: "05",
    title: "Arca Daniswara",
    bgImage: "/images/arca/daniswara.png",
  },
  {
    id: "dewa-surya",
    number: "06",
    title: "Arca Dewa Surya",
    bgImage: "/images/arca/dewa-surya.png",
  },
  {
    id: "dewa",
    number: "07",
    title: "Arca Dewa",
    bgImage: "/images/arca/dewa.png",
  },
  {
    id: "dewi-kaumari",
    number: "08",
    title: "Arca Dewi Kaumari",
    bgImage: "/images/arca/dewi-kaumari.png",
  },
  {
    id: "dewi-tara",
    number: "09",
    title: "Dewi Tara",
    bgImage: "/images/arca/dewi-tara.png",
  },
  {
    id: "dhyani-1",
    number: "10",
    title: "Arca Dhyani Buddha Ratnasambhaw",
    bgImage: "/images/arca/dhyani-1.png",
  },
  {
    id: "dhyani-2",
    number: "11",
    title: "Arca Dhyani Budha Amitabh",
    bgImage: "/images/arca/dhyani-2.png",
  },
  {
    id: "durga",
    number: "12",
    title: "Arca Durga Mahisasuramardhini",
    bgImage: "/images/arca/durga.png",
  },
  {
    id: "ganesha",
    number: "13",
    title: "Ganesha",
    bgImage: "/images/arca/ganesha.png",
  },
  { id: "kala", number: "14", title: "Kala", bgImage: "/images/arca/kala.png" },
  {
    id: "mahakala",
    number: "15",
    title: "Mahakala",
    bgImage: "/images/arca/mahakala.png",
  },
  {
    id: "motif",
    number: "16",
    title: "Motif",
    bgImage: "/images/arca/motif.png",
  },
  {
    id: "nandi",
    number: "17",
    title: "Nandi",
    bgImage: "/images/arca/nandi.png",
  },
  {
    id: "relief-dewa",
    number: "18",
    title: "Relief Dewa",
    bgImage: "/images/arca/relief-dewa.png",
  },
  {
    id: "relief-dinding",
    number: "19",
    title: "Relief Dinding",
    bgImage: "/images/arca/relief-dinding.png",
  },
  {
    id: "resi",
    number: "20",
    title: "Arca Resi",
    bgImage: "/images/arca/resi.png",
  },
  {
    id: "singa-1",
    number: "21",
    title: "Singa 1",
    bgImage: "/images/arca/singa-1.png",
  },
  {
    id: "singa-2",
    number: "22",
    title: "Singa 2",
    bgImage: "/images/arca/singa-2.png",
  },
  {
    id: "siwa",
    number: "23",
    title: "Arca Siwa",
    bgImage: "/images/arca/siwa.png",
  },
];

export default function ArcaPage() {
  const [isLoaded, setIsLoaded] = useState(true);
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

      <section className="relative flex-1 w-full px-4 py-8 md:px-12 md:py-12 text-black flex flex-col justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/explore-bg4.png"
            alt="Explore background texture"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mb-6 md:mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold md:text-6xl text-black drop-shadow-sm">
              {t.nav?.arca || "Arca"}
            </h1>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex flex-col md:flex-row gap-4 sm:gap-6 md:overflow-x-auto pb-8 pt-2 scrollbar-none"
          >
            {ARCA_CARDS.map((card) => (
              <Link
                key={card.id}
                href={`/arca/${card.id}`}
                className="group relative w-full md:w-[450px] lg:w-[500px] h-[220px] sm:h-[260px] md:h-[300px] flex-shrink-0 snap-start rounded-[24px] sm:rounded-[32px] bg-white border border-neutral-200 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 flex overflow-hidden p-5 sm:p-6"
              >
                <div className="flex flex-1 flex-col justify-between gap-4 pr-2 sm:pr-4 z-10 min-h-[190px]">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-black leading-tight break-words">
                    {card.title}
                  </h3>
                  <span className="text-4xl sm:text-5xl md:text-5xl font-black text-black group-hover:scale-105 transition-transform inline-block">
                    {card.number}
                  </span>
                </div>

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
