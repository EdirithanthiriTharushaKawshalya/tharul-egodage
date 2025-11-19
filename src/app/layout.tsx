import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Lumina Lens | Professional Photography",
    template: "%s | Lumina Lens",
  },
  description: "Capturing life's fleeting moments. Professional wedding, event, and portrait photography.",
  keywords: ["Photography", "Wedding", "Portrait", "Events", "Portfolio"],
  openGraph: {
    title: "Lumina Lens Photography",
    description: "Professional wedding and event photography.",
    url: "https://your-domain.com",
    siteName: "Lumina Lens",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg", // You can add an OG image later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};