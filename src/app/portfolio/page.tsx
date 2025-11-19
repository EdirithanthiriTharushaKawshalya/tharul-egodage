"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, Loader2, Search } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredItems = (category: string) => {
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category.toLowerCase() === category;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 md:pt-32 pb-16">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center tracking-tight">Selected Works</h1>
        
        {/* COMPACT SEARCH BAR */}
        <div className="max-w-sm mx-auto mb-10 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search by title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border-white/10 text-white text-sm placeholder:text-gray-500 pl-10 py-2 rounded-full focus:border-white/30 focus:bg-black/40 transition-all backdrop-blur-md h-auto"
            />
          </div>
        </div>
      </FadeIn>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8 md:mb-16">
          <div className="w-full max-w-full overflow-x-auto pb-2 no-scrollbar">
             <TabsList className="bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-[2rem] flex w-max mx-auto h-auto gap-1">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat} 
                  className="capitalize rounded-full px-5 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black text-gray-400 transition-all duration-300"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredItems(cat).map((item, index) => (
                  <FadeIn key={item.id} delay={index * 0.05}>
                    <Card className="bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-[32px] overflow-hidden flex flex-col h-full hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] group">
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <Badge className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 text-white capitalize rounded-full px-3">
                          {item.category}
                        </Badge>
                      </div>

                      <div className="flex flex-col flex-grow p-6 md:p-8 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2 truncate">{item.title}</h3>
                          <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed font-light">
                            {item.description}
                          </p>
                        </div>
                        
                        <div className="mt-auto pt-4">
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full rounded-full bg-white text-black hover:bg-gray-200 flex items-center gap-2 py-6">
                              View Album <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </FadeIn>
                ))}
            </div>
            
             {filteredItems(cat).length === 0 && (
               <div className="text-center py-20 bg-white/5 rounded-[32px] border border-white/5">
                 <p className="text-gray-500">No items found matching "{searchQuery}".</p>
               </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}