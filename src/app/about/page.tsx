import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
        {/* Image Side */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-900">
          <Image
            src="https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=800" // Replace with Photographer's photo
            alt="Photographer"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Text Side */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">About Me</h1>
          <h3 className="text-xl text-gray-400">Photographer & Visual Storyteller</h3>
          <div className="w-20 h-1 bg-white/20"></div>
          
          <p className="text-gray-300 leading-relaxed">
            I believe that every picture tells a story. With over 5 years of experience behind the lens, 
            I have dedicated my career to capturing the raw emotions of weddings, the energy of events, 
            and the personality of portraits.
          </p>
          <p className="text-gray-300 leading-relaxed">
            My style is moody, authentic, and detail-oriented. I prefer natural light and candid moments 
            over stiff poses. When I am not shooting, I am editing in my darkroom or scouting the next 
            great location.
          </p>
        </div>
      </div>
    </div>
  );
}