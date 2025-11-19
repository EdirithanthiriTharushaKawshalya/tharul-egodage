"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tighter text-white hover:text-gray-200 transition-colors z-50">
            THARUL EGODAGE
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="/portfolio" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Portfolio</Link>
            <Link href="/contact">
              <Button className="rounded-full bg-white text-black hover:bg-gray-200 font-medium px-6">
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-1 z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white text-center py-2 border-b border-white/5">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white text-center py-2 border-b border-white/5">About</Link>
            <Link href="/portfolio" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white text-center py-2 border-b border-white/5">Portfolio</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full bg-white text-black hover:bg-gray-200 font-medium py-6 mt-2">
                Contact Me
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}