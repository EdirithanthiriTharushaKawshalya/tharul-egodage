import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

// MOCK DATA - Later you can fetch this from Firebase
const portfolioItems = [
  { id: 1, category: "weddings", title: "Sarah & John", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", link: "https://facebook.com" },
  { id: 2, category: "portraits", title: "Urban Style", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800", link: "https://facebook.com" },
  { id: 3, category: "events", title: "Music Fest", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800", link: "https://facebook.com" },
  { id: 4, category: "graduations", title: "Class of 2024", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800", link: "https://facebook.com" },
];

export default function PortfolioPage() {
  const categories = ["all", "weddings", "events", "portraits", "graduations"];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Selected Works</h1>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-10">
          <TabsList className="bg-black border border-white/10">
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
              {portfolioItems
                .filter((item) => cat === "all" || item.category === cat)
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
                        {/* Overlay */}
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}