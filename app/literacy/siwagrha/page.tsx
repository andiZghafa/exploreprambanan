"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

export default function SiwagrhaPage() {
  return (
    <main className="min-h-screen bg-neutral-900">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <section className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/literacy"
            className="mb-8 inline-block text-sm font-semibold text-black hover:underline"
          >
            ← Back to Literacy
          </Link>

          <div className="flex justify-center">
            <img
              src="/images/literacy/siwagrha.jpg"
              alt="Siwagrha"
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
          </div>

          <h1 className="mt-8 text-4xl font-extrabold text-black">Siwagrha</h1>
        </div>
      </section>
    </main>
  );
}
