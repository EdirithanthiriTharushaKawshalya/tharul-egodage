"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Loader2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  // ADDED "birthdays" HERE
  const categories = ["all", "weddings", "events", "portraits", "graduations", "birthdays"];

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        const data: PortfolioItem[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as PortfolioItem);
        });
        setItems(data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-white">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <FadeIn>
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Selected Works</h1>
      </FadeIn>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-10">
          <TabsList className="bg-black border border-white/10 flex flex-wrap justify-center h-auto gap-2">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat} 
                value={cat} 
                className="capitalize data-[state=active]:bg-white data-[state=active]:text-black text-gray-400"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items
                .filter((item) => cat === "all" || item.category.toLowerCase() === cat)
                .map((item, index) => (
                  <FadeIn key={item.id} delay={index * 0.1}>
                    <Card className="bg-gray-900 border border-white/10 overflow-hidden flex flex-col h-full hover:border-white/30 transition-colors">
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

                      <div className="flex flex-col flex-grow p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm line-clamp-3">
                            {item.description}
                          </p>
                        </div>
                        
                        <div className="mt-auto pt-2">
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full bg-white text-black hover:bg-gray-200 gap-2">
                              View Facebook Album <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </FadeIn>
                ))}
            </div>
             {items.filter((item) => cat === "all" || item.category.toLowerCase() === cat).length === 0 && (
               <p className="text-center text-gray-500 mt-10">No items found in this category.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}