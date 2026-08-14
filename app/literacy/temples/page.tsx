"use client";

import Link from "next/link";
// no hooks needed
import Navbar from "@/components/navbar";

export default function TemplesPage() {
  // Removed mandatory landscape prompt and orientation lock

  return (
    <>
      {/* Landscape requirement removed; content displays responsively */}

      <main className="min-h-screen bg-neutral-900">
        <div className="sticky top-0 z-50 w-full">
          <Navbar />
        </div>

        <section className="min-h-screen bg-white px-4 py-6 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/literacy"
              className="mb-8 inline-block text-sm font-normal text-black hover:underline"
            >
              ← Back to Literacy
            </Link>

            <h1 className="mt-8 text-4xl font-extrabold text-black">
              Lumbung, Bubrah & Gana Temple
            </h1>

            <div className="mt-6 flex justify-center overflow-hidden sm:mt-8">
              <img
                src="/images/literacy/temples.jpg"
                alt="Temples"
                className="block h-auto w-full max-w-[min(100%,720px)] max-h-[55vh] object-contain shadow-lg sm:max-h-[80vh]"
              />
            </div>
            <div className="mt-8 prose mx-auto max-w-3xl text-center text-black">
              <h3 className="text-2xl font-semibold">Lumbung Temple</h3>
              <blockquote className="mt-2 mb-6 border-l-4 border-gray-200 pl-4 italic text-black/80 text-left">
                Lumbung Temple consists of one main temple and sixteen ancillary
                temples. It is located directly north of Bubrah Temple and
                shares the same Buddhist religious background. Based on its
                architectural features, this temple is estimated to have been
                built around the 9th century AD.
              </blockquote>

              <h3 className="mt-6 text-2xl font-semibold">Bubrah Temple</h3>
              <blockquote className="mt-2 mb-6 border-l-4 border-gray-200 pl-4 italic text-black/80 text-left">
                Bubrah Temple, also of Buddhist origin, is part of the mandala
                of Sewu Temple. It is situated approximately 300 meters south of
                Sewu Temple and, judging by its architectural style, was
                constructed around the 9th century AD along with Sewu.
              </blockquote>

              <h3 className="mt-6 text-2xl font-semibold">Gana Temple</h3>
              <blockquote className="mt-2 mb-6 border-l-4 border-gray-200 pl-4 italic text-black/80 text-left">
                Additionally, there is the Gana Temple, also known as Asu
                Temple, located about 300 meters east of Sewu Temple. This
                temple is also part of the Sewu mandala, but what remains now is
                only the foot of the temple.
              </blockquote>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
