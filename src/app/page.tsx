"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FadeIn from "@/components/FadeIn";
import { Loader2, ExternalLink } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"; // <--- 1. Import the plugin

// Interface matching Portfolio Page
interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Create the plugin instance with configuration
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  // Fetch data from Firebase
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, "portfolio"), limit(6));
        const querySnapshot = await getDocs(q);
        
        const data: PortfolioItem[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as PortfolioItem);
        });
        setItems(data);
      } catch (error) {
        console.error("Error fetching featured shots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

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
        <section className="w-full max-w-6xl">
          <div className="mb-8 flex items-center justify-between px-4">
            <h2 className="text-2xl font-semibold text-white">Featured Shots</h2>
            <span className="text-sm text-gray-500 animate-pulse">Swipe to explore &rarr;</span>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : (
            <Carousel 
              plugins={[plugin.current]} // <--- 3. Add the plugin here
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full px-4"
              // Optional: Pause on mouse hover so users can click the button easily
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="-ml-4">
                {items.length === 0 && (
                   <div className="text-center w-full text-gray-500 py-10 pl-4">
                     No images found. Add some in the Admin Panel!
                   </div>
                )}

                {items.map((item) => (
                  <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-gray-900 border border-white/10 overflow-hidden flex flex-col h-full hover:border-white/30 transition-colors">
                      
                      {/* Thumbnail Image */}
                      <div className="relative w-full aspect-video">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-3 right-3 bg-black/70 text-white hover:bg-black capitalize">
                          {item.category}
                        </Badge>
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-col flex-grow p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 truncate">{item.title}</h3>
                          <p className="text-gray-400 text-sm line-clamp-3">
                            {item.description}
                          </p>
                        </div>
                        
                        {/* Button at the bottom */}
                        <div className="mt-auto pt-2">
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full bg-white text-black hover:bg-gray-200 gap-2">
                              View Album <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <CarouselPrevious className="hidden md:flex -left-12 bg-black text-white border-white/20 hover:bg-white hover:text-black" />
              <CarouselNext className="hidden md:flex -right-12 bg-black text-white border-white/20 hover:bg-white hover:text-black" />
            </Carousel>
          )}
        </section>
      </FadeIn>
    </div>
  );
}