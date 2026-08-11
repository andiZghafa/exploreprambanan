import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Injourney - Discover Prambanan",
  description: "Explore the ancient cultural heritage and temple complex.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <div className="flex-1">{children}</div>

          <footer className="bg-[#9fbb3c] border-t border-white/10 px-6 py-2 text-center text-sm text-white">
            PT Taman Wisata Candi Borobudur, Prambanan dan Ratu Boko (Persero) ©
            2026. All Rights Reserved.
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
