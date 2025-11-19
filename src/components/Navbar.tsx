import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo / Name */}
        <Link href="/" className="text-xl font-bold tracking-tighter text-white">
          LUMINA
        </Link>

        {/* Desktop Nav */}
        <div className="hidden gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">Home</Link>
          <Link href="/about" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">About</Link>
          <Link href="/portfolio" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">Portfolio</Link>
        </div>

        {/* CTA Button */}
        <Link href="/contact">
          <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-black">
            Contact Me
          </Button>
        </Link>
      </div>
    </nav>
  );
}