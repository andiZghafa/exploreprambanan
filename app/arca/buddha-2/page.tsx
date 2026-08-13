"use client";

import { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/navbar";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function ArcaBuddha2Page() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`${montserrat.className} relative min-h-screen w-full bg-neutral-900 tracking-[-0.025em] flex flex-col`}
    >
      <div
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-700 pointer-events-none ${isLoaded ? "opacity-0" : "opacity-100"}`}
      />

      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Content Container */}
      <section className="relative flex-1 w-full overflow-hidden px-6 py-8 md:px-16 md:py-16 text-black flex flex-col justify-center">
        {/* Background Texture Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <picture className="block h-full w-full">
            <source media="(max-width: 767px)" srcSet="/explore-bg3-mb.png" />
            <img
              src="/explore-bg3.png"
              alt="Background texture"
              className="block h-full w-full object-cover object-center"
            />
          </picture>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mb-6 md:mb-8">
            <Link
              href="/arca"
              className="inline-flex items-center gap-2 text-sm font-normal text-black/70 hover:text-black transition-colors"
            >
              ← Back to Arca
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="w-full flex items-center justify-center p-4 sm:p-8">
              <img
                src="/images/arca/buddha-2.png"
                alt="Arca Buddha 2 Artifact"
                className="w-full max-w-[450px] md:max-w-none h-auto max-h-[500px] object-contain drop-shadow-xl"
              />
            </div>

            <div className="flex flex-col justify-center text-left">
              <span className="text-sm font-bold tracking-wider uppercase text-neutral-500 mb-2">
                Artifact Details
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight tracking-tight mb-6">
                Arca Buddha 2
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-neutral-800 font-medium leading-relaxed">
                <p>Put description here.</p>
                <p>Put description here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
