"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Loader2 } from "lucide-react";

// Define the interface for our data
interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const categories = ["all", "weddings", "events", "portraits", "graduations"];

  // Fetch data from Firebase on load
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
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Selected Works</h1>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items
                .filter((item) => cat === "all" || item.category.toLowerCase() === cat)
                .map((item) => (
                  <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="group">
                    <Card className="bg-gray-900 border-0 overflow-hidden relative">
                      <CardContent className="p-0 aspect-[4/3] relative">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <Badge variant="outline" className="text-white border-white mb-4 capitalize">
                            {item.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-300">
                            View on Facebook <ExternalLink className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
            </div>
            {/* Empty State Message */}
            {items.filter((item) => cat === "all" || item.category.toLowerCase() === cat).length === 0 && (
               <p className="text-center text-gray-500 mt-10">No items found in this category.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}