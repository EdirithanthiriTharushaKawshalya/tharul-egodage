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

export default function Home() {
  // Placeholder images - replace with real URLs later
  const featuredImages = [
    "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop", // Wedding
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", // Event
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop", // Portrait
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-20 py-20 px-4">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Capturing Life's <br />
          <span className="text-gray-500">Fleeting Moments.</span>
        </h1>
        <p className="text-lg text-gray-400">
          Hi, I'm [Name]. A professional photographer specializing in events, weddings, and portraits. 
          Let's tell your story through my lens.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/portfolio">
            <Button className="bg-white text-black hover:bg-gray-200">View Work</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-white/20 text-white">Book Now</Button>
          </Link>
        </div>
      </section>

      {/* Swipe Section (Carousel) */}
      <section className="w-full max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Featured Shots</h2>
          <span className="text-sm text-gray-500">Swipe to explore &rarr;</span>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {featuredImages.map((src, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-0 bg-transparent">
                    <CardContent className="flex aspect-[3/4] items-center justify-center p-0 overflow-hidden rounded-lg">
                      <Image 
                        src={src} 
                        alt={`Featured ${index}`} 
                        width={400} 
                        height={600} 
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-black/50 text-white border-white/20" />
          <CarouselNext className="bg-black/50 text-white border-white/20" />
        </Carousel>
      </section>
    </div>
  );
}