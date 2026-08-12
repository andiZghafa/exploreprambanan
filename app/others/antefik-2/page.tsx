"use client";

import { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/navbar";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function Antefik2Page() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`${montserrat.className} relative min-h-screen w-full bg-neutral-900 tracking-[-0.025em] flex flex-col`}
    >
      {/* ⚪ White Fade-in Transition Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-700 pointer-events-none ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Content Container */}
      <section className="relative flex-1 w-full overflow-hidden px-6 py-8 md:px-16 md:py-16 text-black flex flex-col justify-center">
        {/* Background Texture Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/explore-bg.png"
            alt="Background texture"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* Back Navigation Button */}
          <div className="mb-6 md:mb-8">
            <Link
              href="/others"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 hover:text-black transition-colors"
            >
              ← Back to Others
            </Link>
          </div>

          {/* Grid Layout: 
              📱 Mobile: Vertical (Image on top, text below)
              💻 Desktop: Side-by-Side (Image Left, Title & Description Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* 🖼️ LEFT SIDE: Large Transparent Image */}
            <div className="w-full flex items-center justify-center p-4 sm:p-8">
              <img
                src="/images/others/antefik-2.png"
                alt="Antefik Artifact"
                className="w-full max-w-[450px] md:max-w-none h-auto max-h-[500px] object-contain drop-shadow-xl"
              />
            </div>

            {/* 📝 RIGHT SIDE: Title and Description */}
            <div className="flex flex-col justify-center text-left">
              {/* Category / Tag */}
              <span className="text-sm font-bold tracking-wider uppercase text-neutral-500 mb-2">
                Artifact Details
              </span>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight tracking-tight mb-6">
                Antefik
              </h1>

              {/* Description Blocks */}
              <div className="space-y-4 text-base sm:text-lg text-neutral-800 font-medium leading-relaxed">
                <p>
                  Antefixes are generally decorative elements of temple
                  structures, positioned on the roof. This particular antefix is
                  ​​made of fired clay with a reddish hue; it remains in good
                  condition and features a floral motif.
                </p>
                <p>
                  Material: clay or brick.. Origin: Prambanan Temple
                  Complex,Bokoharjo, Prambanan, Sleman. This site is estimated
                  to date from the 8th to the 10th century AD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
