import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tharulegodage.com'),
  title: {
    default: "Tharul Egodage | Freelance Photographer & Visual Storyteller",
    template: "%s | Tharul Egodage",
  },
  description: "Tharul Egodage is a professional photographer based in Galle, Sri Lanka, specializing in weddings, events, portraits, and fashion photography.",
  keywords: ["Tharul Egodage", "Photographer Galle", "Wedding Photography Sri Lanka", "Event Photographer", "Portrait Photography", "Fashion Photographer"],
  openGraph: {
    title: "Tharul Egodage Photography",
    description: "Capturing life's raw emotions. Professional wedding and event photographer based in Galle Fort.",
    url: "https://www.tharulegodage.com",
    siteName: "Tharul Egodage Photography",
    images: [
      {
        url: "/og-image.jpg", // You should add an image named og-image.jpg to your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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