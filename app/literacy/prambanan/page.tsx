"use client";

import Link from "next/link";
// no hooks needed
import Navbar from "@/components/navbar";

export default function PrambananPage() {
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
              Prambanan
            </h1>

            <div className="mt-6 flex justify-center overflow-hidden sm:mt-8">
              <img
                src="/images/literacy/prambanan.jpg"
                alt="Prambanan"
                className="block h-auto w-full max-w-[min(100%,720px)] max-h-[55vh] object-contain shadow-lg sm:max-h-[80vh]"
              />
            </div>
            <div className="mt-8 prose mx-auto max-w-3xl text-center text-black">
              <p className="mb-6">
                Prambanan Temple (Siwagrha) retains its original structure,
                which was built in the 9th century AD. The temple complex
                showcases the grandeur of Shaivite cultural art and stands as a
                monumental achievement of classical-period architecture in
                Indonesia. In the 9th century, Prambanan was one of the finest
                examples of Hindu bas-relief (high-relief) art.
              </p>

              <p className="mb-6">
                These Hindu temples are adorned with reliefs depicting the
                Indonesian version of the Ramayana epic, representing one of the
                greatest masterpieces of ancient stone carving techniques.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
