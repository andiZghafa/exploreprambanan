"use client";

import Link from "next/link";
// no hooks needed
import Navbar from "@/components/navbar";

export default function SewuPage() {
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

            <h1 className="mt-8 text-4xl font-extrabold text-black">Sewu</h1>

            <div className="mt-6 flex justify-center overflow-hidden sm:mt-8">
              <img
                src="/images/literacy/sewu.jpg"
                alt="Sewu"
                className="block h-auto w-full max-w-[min(100%,720px)] max-h-[55vh] object-contain shadow-lg sm:max-h-[80vh]"
              />
            </div>
            <div className="mt-8 prose mx-auto max-w-3xl text-center text-black">
              <p className="mb-6">
                Sewu Temple is the largest Buddhist temple complex in Indonesia,
                consisting of 249 temples: one main temple, eight apit temples
                (temples flanking the main temple), and 240 perwara temples
                (smaller subsidiary temples).
              </p>

              <p className="mb-6">
                Sewu Temple is the largest Buddhist temple complex in Indonesia,
                consisting of 249 temples: one main temple, eight apit temples
                (temples flanking the main temple), and 240 perwara temples
                (smaller subsidiary temples).
              </p>

              <p className="mb-6">
                The mandala (sacred layout) of Sewu Temple also includes Lumbung
                Temple, Bubrah Temple, and Asu Temple (also known as Gana
                Temple).
              </p>

              <p className="mb-6">
                As the largest Buddhist temple complex in Indonesia, Sewu Temple
                has been recognized by UNESCO for its Outstanding Universal
                Value.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
