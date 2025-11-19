import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  // Placeholder images
  const featuredImages = [
    "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop", // Wedding
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", // Event
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop", // Portrait
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-24 py-24 px-4">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-3xl">
        <FadeIn delay={0.1}>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
            Capturing Life's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
              Fleeting Moments.
            </span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hi, I'm [Name]. A professional photographer specializing in events, weddings, and portraits. 
            Let's tell your story through my lens.
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/portfolio">
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">View Work</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/20 text-white px-8 py-6 text-lg hover:bg-white hover:text-black transition-all">Book Now</Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Swipe Section (Carousel) */}
      <FadeIn delay={0.2} className="w-full flex flex-col items-center">
        <section className="w-full max-w-5xl">
          <div className="mb-8 flex items-center justify-between px-2">
            <h2 className="text-2xl font-semibold text-white">Featured Shots</h2>
            <span className="text-sm text-gray-500 animate-pulse">Swipe to explore &rarr;</span>
          </div>
          
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredImages.map((src, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="border-0 bg-transparent">
                      <CardContent className="flex aspect-[3/4] items-center justify-center p-0 overflow-hidden rounded-xl border border-white/10">
                        <Image 
                          src={src} 
                          alt={`Featured ${index}`} 
                          width={400} 
                          height={600} 
                          className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex bg-black text-white border-white/20 hover:bg-white hover:text-black" />
            <CarouselNext className="hidden md:flex bg-black text-white border-white/20 hover:bg-white hover:text-black" />
          </Carousel>
        </section>
      </FadeIn>
    </div>
  );
}