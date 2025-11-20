import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Camera, Heart, MapPin, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 pt-28 md:pt-32 pb-16">
      {/* --- HERO SECTION --- */}
      <div className="grid grid-cols-1 gap-10 md:gap-16 md:grid-cols-2 items-start mb-20">
        
        {/* Image Side */}
        <FadeIn delay={0.1}>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[32px] md:rounded-[40px] bg-gray-900 border border-white/10 group shadow-2xl sticky top-32">
            {/* FIX: The src must start with '/' which points to the public folder.
               Ensure IMG_3092.JPG is inside the 'public' folder in your project root.
            */}
            <Image
              src="/IMG_3092.PNG"
              alt="Photographer in Galle Fort"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-white text-black hover:bg-white/90 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Based in Galle Fort
                </Badge>
              </div>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-1">THARUL EGODAGE</h2>
              <p className="text-gray-300 text-sm md:text-base font-light flex items-center gap-2">
                <Camera className="h-4 w-4" /> Freelance Photographer
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Main Bio Side */}
        <FadeIn delay={0.3}>
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-white/5">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Who Am I?</h1>
                <p className="text-lg text-gray-300 leading-relaxed font-light mb-6">
                  I am a freelance photographer based in the heart of <span className="text-white font-medium">Galle, Galle Fort</span>, where creativity meets culture and history. 
                  With <span className="text-white font-medium border-b border-white/30">4 years of experience</span>, 
                  I specialize in portrait and creative photography, capturing emotion, expression, and unique perspectives through each frame.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  To me, photography is more than a craft. It is my way of preserving stories that need to be seen and remembered.
                </p>
              </div>
            </div>

            {/* Background Section */}
            <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-gray-400" /> My Background
              </h3>
              <p className="text-base text-gray-400 leading-relaxed font-light mb-4">
                Creativity has always been part of my world. Born into a family proud of its artistic spirit—my father, 
                an artist and curator, and my mother, a hotelier—I developed an eye for detail and culture early on.
              </p>
              <p className="text-base text-gray-400 leading-relaxed font-light">
                Growing up in Galle Fort, a UNESCO World Heritage Site packed with color and architecture, 
                offered endless inspiration to see the world from different perspectives.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* --- DETAILS GRID (Journey, Education, Skills) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
        {/* Journey Column */}
        <FadeIn delay={0.4}>
          <Card className="h-full bg-gray-900/40 border-white/10 rounded-[32px] backdrop-blur-sm p-2">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-white" /> My Journey
              </h3>
              
              <div className="space-y-8 relative pl-2">
                {/* Timeline Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/10 rounded-full" />

                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 h-6 w-6 bg-black rounded-full border-2 border-white z-10" />
                  <h4 className="text-white font-semibold text-lg">Freelance Photographer</h4>
                  <p className="text-sm text-gray-500 mb-1">2021 — Present</p>
                  <p className="text-gray-400 text-sm">Portraits, event coverage, and creative storytelling for personal and client-based projects.</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 h-6 w-6 bg-gray-800 rounded-full border border-white/30 z-10" />
                  <h4 className="text-white font-semibold text-lg">Dharmasoka College Photographic Society</h4>
                  <p className="text-sm text-gray-500 mb-1">2021 — Present</p>
                  <p className="text-gray-400 text-sm">Main Senior Photographer & Project Coordinator.</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 h-6 w-6 bg-gray-800 rounded-full border border-white/30 z-10" />
                  <h4 className="text-white font-semibold text-lg">Galle Literary Festival</h4>
                  <p className="text-sm text-gray-500 mb-1">2025</p>
                  <p className="text-gray-400 text-sm">Volunteer Photographer.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <div className="space-y-6 md:space-y-8">
          {/* Education Card */}
          <FadeIn delay={0.5}>
            <Card className="bg-gray-900/40 border-white/10 rounded-[32px] backdrop-blur-sm p-2">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <GraduationCap className="h-6 w-6 text-white" /> Education & Mentorship
                </h3>
                <ul className="space-y-4">
                  <li className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <h4 className="text-white font-medium">Private Diploma in Photography</h4>
                    <p className="text-sm text-gray-400 mt-1">Foundations in lighting, composition, and editing.</p>
                  </li>
                  <li className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <h4 className="text-white font-medium">Mentorship</h4>
                    <p className="text-sm text-gray-400 mt-1">Student of Boopathy Nalin Wickramage & Sajith Abeygunawardhana.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Skills Card */}
          <FadeIn delay={0.6}>
            <Card className="bg-white/10 border-white/10 rounded-[32px] backdrop-blur-md p-2">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Star className="h-6 w-6 text-white" /> Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Portrait Photography", 
                    "Creative Concepts", 
                    "Event Coverage", 
                    "Visual Storytelling", 
                    "Artistic Direction", 
                    "Lighting Mastery",
                    "Adobe Lightroom",
                    "Adobe Photoshop"
                  ].map((skill) => (
                    <span key={skill} className="px-4 py-2 rounded-full bg-black/40 border border-white/10 text-sm text-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}