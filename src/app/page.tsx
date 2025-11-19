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
import { Loader2, ExternalLink, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

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

  const plugin = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false })
  );

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
    <div className="flex flex-col items-center justify-center space-y-20 md:space-y-32 pt-32 md:pt-40 pb-20 px-4 overflow-x-hidden">
      {/* Hero Section */}
      <section className="text-center space-y-6 md:space-y-8 max-w-4xl relative px-2">
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-white/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

        <FadeIn delay={0.1}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[1.1]">
            Captured <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              Moments.
            </span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <p className="text-lg md:text-xl text-gray-400 max-w-xs sm:max-w-2xl mx-auto leading-relaxed font-light">
            A professional photography portfolio specializing in capturing the raw emotions of life. 
            Events, Weddings, Portraits, and everything in between.
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 w-full sm:w-auto">
            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto rounded-full bg-white text-black hover:bg-gray-200 px-10 py-6 md:py-7 text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                View Portfolio
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto rounded-full border-white/20 bg-white/5 backdrop-blur-sm text-white px-10 py-6 md:py-7 text-lg hover:bg-white hover:text-black transition-all">
                Book a Session
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Swipe Section */}
      <FadeIn delay={0.2} className="w-full flex flex-col items-center">
        <section className="w-full max-w-7xl">
          <div className="mb-8 md:mb-12 flex flex-col sm:flex-row items-center justify-between px-6 gap-2 text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Featured Work</h2>
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <span>Swipe to explore</span> <ArrowRight className="h-4 w-4 animate-pulse" />
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
            </div>
          ) : (
            <Carousel 
              plugins={[plugin.current]}
              opts={{ align: "start", loop: true }}
              className="w-full px-4"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                {items.length === 0 && (
                   <div className="text-center w-full text-gray-500 py-10 pl-6">
                     No images found. Add some in the Admin Panel!
                   </div>
                )}

                {items.map((item) => (
                  <CarouselItem key={item.id} className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                    <Card className="h-full border border-white/10 bg-gray-900/40 backdrop-blur-sm rounded-[32px] overflow-hidden flex flex-col hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] group">
                      
                      {/* Image */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        <Badge className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black capitalize rounded-full px-4 py-1">
                          {item.category}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-grow p-6 md:p-8 space-y-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 truncate">{item.title}</h3>
                          <p className="text-gray-400 text-sm line-clamp-2 font-light leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        
                        <div className="mt-auto pt-4">
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" className="w-full rounded-full border border-white/10 hover:bg-white hover:text-black hover:border-transparent text-gray-300 group-hover:bg-white group-hover:text-black transition-all duration-300 flex justify-between items-center px-6">
                              View Album <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Hide arrows on mobile, show on desktop */}
              <CarouselPrevious className="hidden lg:flex -left-12 bg-black text-white border-white/20 hover:bg-white hover:text-black" />
              <CarouselNext className="hidden lg:flex -right-12 bg-black text-white border-white/20 hover:bg-white hover:text-black" />
            </Carousel>
          )}
        </section>
      </FadeIn>
    </div>
  );
}