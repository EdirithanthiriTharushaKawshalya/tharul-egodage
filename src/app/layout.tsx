import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "THARUL EGODAGE | Portfolio",
    template: "%s | THARUL EGODAGE",
  },
  description: "Professional photography portfolio specializing in weddings, events, and portraits.",
  keywords: ["Photography", "Portfolio", "Weddings", "Events", "Portraits"],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased min-h-screen flex flex-col selection:bg-white selection:text-black`}>
        {/* Futuristic Ambient Background Glow */}
        <div className="fixed inset-0 z-[-1] h-full w-full bg-black">
          <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-white/5 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-white/5 blur-[100px]" />
        </div>

        <Navbar />
        
        <main className="flex-grow relative z-10">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}