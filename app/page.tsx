"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar";
import { useLanguage } from "@/context/LanguageContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function Home() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const handleTakeMeThere = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsFadingOut(true);

    setTimeout(() => {
      router.push("/explore");
    }, 500);
  };

  return (
    <main
      className={`${poppins.className} min-h-screen w-full bg-neutral-900 tracking-[-0.025em]`}
    >
      {/* 
        Only show the page-transition overlay when fading out. 
        When idle, setting display:none prevents mobile browser touch interference.
      */}
      <div
        style={{ display: isFadingOut ? "block" : "none" }}
        className={`fixed inset-0 z-[999999] bg-white transition-opacity duration-500 ${
          isFadingOut ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-44px)] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/prambanan-hero.png"
            alt="Prambanan Temple"
            className="hidden h-full w-full object-cover object-center md:block"
          />
          <img
            src="/explore-bg-md.png"
            alt="Prambanan Temple mobile background"
            className="block h-full w-full object-cover object-center md:hidden"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-white drop-shadow-md md:text-7xl">
            {t.home.discoverPrambanan}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/90 drop-shadow md:text-2xl text-balance">
            {t.home.subtitle}
          </p>

          <a
            href="/explore"
            onClick={handleTakeMeThere}
            className="mt-10 cursor-pointer rounded-full bg-white/90 px-8 py-4 text-base font-bold text-neutral-900 shadow-xl transition-all hover:scale-105 hover:bg-white"
          >
            {t.home.exploreBtn}
          </a>
        </div>
      </div>
    </main>
  );
}
