"use client";

import Link from "next/link";
// no hooks needed
import Navbar from "@/components/navbar";

export default function SiwagrhaPage() {
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
              Siwagrha
            </h1>

            <div className="mt-6 flex justify-center overflow-hidden sm:mt-8">
              <img
                src="/images/literacy/siwagrha.jpg"
                alt="Siwagrha"
                className="block h-auto w-full max-w-[min(100%,720px)] max-h-[55vh] object-contain shadow-lg sm:max-h-[80vh]"
              />
            </div>
            <div className="mt-8 prose mx-auto max-w-3xl text-center text-black">
              <p className="mb-6">
                This inscription contains the inauguration of sacred buildings
                for Lord Shiva, namely Siwagrha and Siwalaya, which mean “house
                of Shiva” or “temple of Shiva,” and at the same time provides a
                detailed description of a complex of sacred buildings of Shiva
                religion, which, according to experts, is the Prambanan Temple
                complex inaugurated by Rakai Pikatan. The inscription mentions a
                war between King Balaputra and Rakai Pikatan. Because he lost
                the war, Balaputra fled and built a defense on the foothills of
                Ratu Boko.
              </p>
              <p className="mb-6">
                Rakai Pikatans victory over Balaputradeva is believed to have
                marked the construction of the Prambanan Temple as a symbol of
                the resurgence of the ancient Mataram Kingdom, following a
                period of instability marked by warfare and the relocation of
                the capital three times.
              </p>
              <p className="mb-6">
                The inscription was issued by Dyah Lokapala (also known as Rakai
                Kayuwangi), shortly after Rakai Pikatans abdication. The
                Siwagrha inscription refers to a king who stepped down and
                transferred the throne to his son, Rakai Kayuwangi Dyah
                Lokapala.
              </p>
              <p className="mb-6">
                The Siwagrha inscription also contains a sengkalan (chronogram)
                reading “walung gunung sang wiku,” which corresponds to the year
                778 Śaka (856 CE). Written in Old Javanese, the original
                inscription is currently preserved in the National Museum under
                the catalog code D.28.
              </p>
              <p className="mb-6">
                Additional notes: In addition to the Siwagrha inscription, there
                is also a brief inscription painted in red on the amalaka (the
                segmented, circular stone element atop the temple) of the Shiva
                Temple, bearing the name “Pikatan.”
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
