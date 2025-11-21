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
import { Loader2, ExternalLink, ArrowRight, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
}

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export default function Home() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]); // New State
  const [loading, setLoading] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const plugin = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false })
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Portfolio
        const pQuery = query(collection(db, "portfolio"), limit(6));
        const pSnapshot = await getDocs(pQuery);
        const pData: PortfolioItem[] = [];
        pSnapshot.forEach((doc) => {
          pData.push({ id: doc.id, ...doc.data() } as PortfolioItem);
        });
        setItems(pData);

        // Fetch Reviews
        const rSnapshot = await getDocs(collection(db, "reviews"));
        const rData: ReviewItem[] = [];
        rSnapshot.forEach((doc) => {
          rData.push({ id: doc.id, ...doc.data() } as ReviewItem);
        });
        setReviews(rData);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto Scroll Logic for Reviews
  useEffect(() => {
    if (isPaused || reviews.length === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-32 md:space-y-48 pt-32 md:pt-40 pb-20 px-4 overflow-x-hidden">
      {/* Hero Section */}
      <section className="text-center space-y-6 md:space-y-8 max-w-4xl relative px-2">
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
      <FadeIn delay={0.2} className="w-full flex flex-col items-center relative z-10">
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
              <CarouselPrevious className="hidden lg:flex -left-12 bg-black text-white border-white/20 hover:bg-white hover:text-black" />
              <CarouselNext className="hidden lg:flex -right-12 bg-black text-white border-white/20 hover:bg-white hover:text-black" />
            </Carousel>
          )}
        </section>
      </FadeIn>

      {/* --- CLIENT FEEDBACK SECTION --- */}
      <FadeIn delay={0.6} className="w-full flex justify-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-full bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10 blur-[100px] pointer-events-none" />

        <section 
          className="w-full max-w-7xl px-2 relative z-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="mb-12 flex flex-col sm:flex-row items-center justify-between px-4 text-center sm:text-left gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200">Love</span>
              </h2>
              <p className="text-gray-400 font-light text-lg">Stories from those who trusted the vision.</p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="icon"
                onClick={scrollLeft}
                className="rounded-full border-white/10 bg-black/20 hover:bg-white hover:text-black text-white h-12 w-12 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={scrollRight}
                className="rounded-full border-white/10 bg-black/20 hover:bg-white hover:text-black text-white h-12 w-12 transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto pb-12 gap-6 px-4 no-scrollbar snap-x snap-mandatory scroll-smooth" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* Dynamic Reviews from Firebase */}
            {reviews.map((review) => (
              <div key={review.id} className="min-w-[300px] md:min-w-[380px] snap-center">
                <div className="bg-black/40 border border-white/5 rounded-[32px] p-8 h-full flex flex-col backdrop-blur-2xl hover:bg-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-1">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-white text-white" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-white/20" />
                  </div>

                  <p className="text-gray-200 text-lg font-light italic mb-8 leading-relaxed flex-grow">
                    "{review.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-sm uppercase">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* "Rate on Google" Card */}
            <div className="min-w-[300px] md:min-w-[380px] snap-center flex items-center">
               <div className="relative w-full h-full rounded-[32px] p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent overflow-hidden group">
                 <div className="bg-black/80 w-full h-full rounded-[31px] p-8 flex flex-col items-center justify-center text-center backdrop-blur-3xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Star className="h-12 w-12 text-white/80 mb-4 fill-white/20" />
                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Loved our work?</h3>
                    <p className="text-gray-400 mb-8 text-sm relative z-10 leading-relaxed">
                      Your review helps us reach more people and create more memories.
                    </p>
                    <a href="https://share.google/DVZQb1lbhDovXS2UZ" target="_blank" rel="noopener noreferrer" className="relative z-10 w-full">
                      <Button className="w-full rounded-full bg-white text-black hover:bg-gray-200 py-6 font-bold text-base transition-transform group-hover:scale-105">
                         Rate on Google
                      </Button>
                    </a>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </FadeIn>

    </div>
  );
}