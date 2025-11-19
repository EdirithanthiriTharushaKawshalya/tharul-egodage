import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
        
        {/* Image Side - Loads first */}
        <FadeIn delay={0.1}>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-900 border border-white/10 group">
            <Image
              src="https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=800" // Replace with Photographer's photo
              alt="Photographer"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            {/* Decorative frame effect */}
            <div className="absolute inset-0 border-2 border-white/5 rounded-2xl pointer-events-none"></div>
          </div>
        </FadeIn>

        {/* Text Side - Loads second */}
        <FadeIn delay={0.3}>
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">About Me</h1>
              <h3 className="text-xl text-gray-400">Photographer & Visual Storyteller</h3>
            </div>
            
            <div className="w-24 h-1 bg-white/20"></div>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-light">
              <p>
                I believe that every picture tells a story. With over <span className="text-white font-medium">5 years of experience</span> behind the lens, 
                I have dedicated my career to capturing the raw emotions of weddings, the energy of events, 
                and the personality of portraits.
              </p>
              <p>
                My style is <span className="italic text-white">moody, authentic, and detail-oriented</span>. I prefer natural light and candid moments 
                over stiff poses. When I am not shooting, I am editing in my darkroom or scouting the next 
                great location.
              </p>
            </div>

            {/* Signature or decorative element */}
            <div className="pt-4 opacity-80">
              <p className="font-serif text-2xl italic text-white">Lumina Lens</p>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}