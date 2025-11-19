import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4">
        
        {/* --- TOP SECTION: Call To Action --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pb-16 border-b border-white/10 relative z-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Let's create something beautiful.
            </h2>
            <p className="text-gray-400">Ready to start your project? Let's talk.</p>
          </div>
          <Link href="/contact">
            <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-medium transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Book a Session <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* --- MIDDLE SECTION: Links & Info --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 relative z-10 text-center md:text-left">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
              THARUL EGODAGE
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Capturing the raw emotions of life through a creative lens. Based in Galle Fort, Sri Lanka.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Explore</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Me</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-4 w-4 text-white" /> 
                <span>info@tharulegodage.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-4 w-4 text-white" /> 
                <span>+94 70 791 4277</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="h-4 w-4 text-white" /> 
                <span>Galle Fort, Sri Lanka</span>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Follow Me</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://www.instagram.com/tharul_egodage" className="p-3 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/10 transition-all duration-300 group">
                <Instagram className="h-5 w-5 text-gray-300 group-hover:text-black" />
              </a>
              <a href="https://www.facebook.com/tharulegodage" className="p-3 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/10 transition-all duration-300 group">
                <Facebook className="h-5 w-5 text-gray-300 group-hover:text-black" />
              </a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Copyright --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 relative z-10">
          <p>&copy; {new Date().getFullYear()} THARUL EGODAGE Photography. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}