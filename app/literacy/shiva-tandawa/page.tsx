"use client";

import Link from "next/link";
// no hooks needed
import Navbar from "@/components/navbar";

export default function ShivaTandawaPage() {
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
              Shiva Tandawa
            </h1>

            <div className="mt-6 flex justify-center overflow-hidden sm:mt-8">
              <img
                src="/images/literacy/shiva-tandawa.jpg"
                alt="Shiva Tandawa"
                className="block h-auto w-full max-w-[min(100%,720px)] max-h-[55vh] object-contain shadow-lg sm:max-h-[80vh]"
              />
            </div>
            <div className="mt-8 prose mx-auto max-w-3xl text-center text-black">
              <p className="mb-6">
                Tandava (Tandaya) dance, also known as Tandavam Nrtya, is a
                dance performed by Lord Shiva as the king of dancers (Nataraja).
                Masculine in nature, the Tandava symbolizes the cycles of
                creation, preservation, and dissolution of the universe. This
                sacred dance consists of 108 karana (combinations of movements).
              </p>
              <p className="mb-6">
                In the Prambanan Temple complex, the Tandava dance is depicted
                in reliefs carved along the outer balustrade of the Shiva
                Temple. A total of 62 panels have been identified as
                representing various karana. Some of these reliefs illustrate
                dancing figures, while others depict musicians playing
                instruments to accompany the performance.
              </p>
              <p className="mb-6">
                These depictions portray Lord Shiva, the Highest God, in his
                cosmic role: as Brahma, the creator; Vishnu, the preserver; and
                Rudra (Shiva), the destroyer—who dissolves the universe so it
                may return to its elemental form, known as pancamahabhuta (the
                five great elements).
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
