"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

export default function SewuPage() {
  const [isPortraitMode, setIsPortraitMode] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const portrait = window.innerHeight >= window.innerWidth;
      const mobile = window.innerWidth < 768;
      setIsPortraitMode(mobile && portrait);

      if (mobile && portrait && screen.orientation && screen.orientation.lock) {
        try {
          screen.orientation.lock("landscape");
        } catch {
          // Ignore lock errors; browsers often block this until a user gesture.
        }
      }
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  return (
    <>
      {isPortraitMode && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-6 text-center text-white backdrop-blur-sm">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl">
            <div className="mb-2 text-3xl">📱↔️</div>
            <p className="text-lg font-semibold">
              Rotate your phone to landscape
            </p>
            <p className="mt-2 text-sm text-white/80">
              This poster is best viewed in landscape mode.
            </p>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-neutral-900">
        <div className="sticky top-0 z-50 w-full">
          <Navbar />
        </div>

        <section className="min-h-screen bg-white px-4 py-6 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/literacy"
              className="mb-8 inline-block text-sm font-semibold text-black hover:underline"
            >
              ← Back to Literacy
            </Link>

            <h1 className="mt-8 text-4xl font-extrabold text-black">Sewu</h1>

            <div className="mt-6 flex justify-center overflow-hidden sm:mt-8">
              <img
                src="/images/literacy/sewu.jpg"
                alt="Sewu"
                className="block h-auto w-full max-w-[min(100%,720px)] max-h-[55vh] object-contain shadow-lg sm:max-h-[80vh]"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
