"use client";

import Link from "next/link";
// no hooks needed
import Navbar from "@/components/navbar";

export default function ValleyGodsPage() {
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
              Valley of the Gods
            </h1>
            <div className="mt-6 flex justify-center overflow-hidden sm:mt-8">
              <img
                src="/images/literacy/valley-gods.jpg"
                alt="Valley of the Gods"
                className="block h-auto w-full max-w-[min(100%,720px)] max-h-[55vh] object-contain shadow-lg sm:max-h-[80vh]"
              />
            </div>
            <div className="mt-8 prose mx-auto max-w-3xl text-center text-black">
              <p className="mb-6">
                The name "Prambanan" is widely recognized through the legend of
                Bandung Bondowoso and Lara (Roro) Jonggrang. The story of
                constructing a thousand temples in a single night has been
                passed down orally through generations, becoming an enduring
                part of local folklore. Beyond the mythical narrative, however,
                lies the historical reality that Prambanan is a site of immense
                cultural and archaeological significance. Dating from the 8th to
                10th centuries AD, its temple structures represent a rich legacy
                of the past, offering invaluable insights into human
                civilization—not only for the people of Indonesia but also as a
                vital part of the world's cultural heritage.
              </p>

              <p className="mb-6">
                For this reason, several temples within the Prambanan
                complex—namely Prambanan Temple, Sewu Temple, Lumbung Temple,
                Bubrah Temple, and Asu (Gana) Temple—have been internationally
                recognized and inscribed on the World Heritage List under No. C
                642. This recognition reflects that Prambanan was regarded by
                the ancestors as a “sacred” place chosen as the dwelling of the
                gods. The presence of mountains, fertile land, abundant water,
                rice fields, and a well-preserved natural environment formed the
                foundation for the temple-building concept in Prambanan,
                resulting in structures that are not only beautiful and
                majestic, but also rich in moral and spiritual values. Let us
                explore and embrace the values behind the heritage of
                Prambanan's temples in order to live more wisely and
                meaningfully.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
