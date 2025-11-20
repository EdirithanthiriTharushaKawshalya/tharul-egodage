"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth"; 
import { auth, db } from "@/lib/firebase"; 
import { useRouter } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Trash2, Loader2, Mail, Calendar, Phone, LogOut, Clock } from "lucide-react"; 
import Image from "next/image";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  date?: string; 
  message: string;
  createdAt: any;
}

export default function AdminDashboard() {
  // 1. Start loading as TRUE by default
  const [authLoading, setAuthLoading] = useState(true); 
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    title: "",
    category: "portraits",
    image: "",
    link: "",
    description: "",
  });

  // --- AUTH & DATA FETCHING ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // 2. If not logged in, redirect IMMEDIATELY
        router.push("/login");
      } else {
        // 3. Only if logged in, fetch data and stop loading
        Promise.all([fetchItems(), fetchMessages()]).then(() => setAuthLoading(false));
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "portfolio"));
      const data: PortfolioItem[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as PortfolioItem);
      });
      setItems(data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data: ContactMessage[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as ContactMessage);
      });
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // --- ACTIONS ---
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      await addDoc(collection(db, "portfolio"), formData);
      alert("Item added successfully!");
      setFormData({ title: "", category: "portraits", image: "", link: "", description: "" });
      fetchItems();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add item.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm("Delete this portfolio item?")) {
      await deleteDoc(doc(db, "portfolio", id));
      fetchItems();
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm("Delete this message?")) {
      await deleteDoc(doc(db, "contacts", id));
      fetchMessages();
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown Date";
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp.toDate();
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  // 4. Show Loading Spinner while checking Auth (Blocks the dashboard UI)
  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white bg-black">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // 5. Only render this if authLoading is false (meaning User IS logged in)
  return (
    <div className="container max-w-5xl mx-auto px-4 pt-24 md:pt-32 pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
        <Button variant="destructive" size="sm" onClick={handleLogout} className="rounded-full h-9 px-4">
           <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl w-full grid grid-cols-3 h-auto">
          <TabsTrigger value="messages" className="rounded-xl py-3 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-black">
            Messages <span className="hidden sm:inline ml-1">({messages.length})</span>
          </TabsTrigger>
          <TabsTrigger value="add" className="rounded-xl py-3 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-black">
            Add New
          </TabsTrigger>
          <TabsTrigger value="manage" className="rounded-xl py-3 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-black">
            Manage
          </TabsTrigger>
        </TabsList>

        {/* MESSAGES TAB */}
        <TabsContent value="messages" className="mt-6 space-y-4">
          {messages.length === 0 && (
            <p className="text-center text-gray-500 py-10 bg-white/5 rounded-[32px]">No messages yet.</p>
          )}
          
          <div className="grid grid-cols-1 gap-4">
            {messages.map((msg) => (
              <Card key={msg.id} className="bg-white/5 border-white/10 rounded-[24px]">
                <CardHeader className="pb-3 p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div className="w-full">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white text-lg truncate pr-2">{msg.name}</CardTitle>
                         <p className="text-[10px] text-gray-500 flex items-center gap-1 whitespace-nowrap">
                          <Clock className="h-3 w-3" />
                          {formatDate(msg.createdAt)}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mt-2">
                        <CardDescription className="text-gray-400 flex items-center gap-2 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/5">
                          <Mail className="h-3 w-3" /> <span className="truncate">{msg.email}</span>
                        </CardDescription>
                        
                        {msg.phone && (
                          <CardDescription className="text-gray-400 flex items-center gap-2 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <Phone className="h-3 w-3" /> <span>{msg.phone}</span>
                          </CardDescription>
                        )}

                        {/* Display Requested Event Date */}
                        {msg.date && (
                           <CardDescription className="text-green-400 flex items-center gap-2 text-sm bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 font-medium">
                             <Calendar className="h-3 w-3" /> <span>Event: {msg.date}</span>
                           </CardDescription>
                        )}
                      </div>

                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="p-4 bg-black/30 rounded-xl border border-white/5 mb-3">
                    <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                  <div className="flex justify-end">
                     <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="h-8 rounded-full text-xs"
                      >
                        <Trash2 className="h-3 w-3 mr-2" /> Delete
                      </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ADD ITEM TAB */}
        <TabsContent value="add">
          <Card className="bg-white/5 border-white/10 mt-6 rounded-[32px] p-3 md:p-6">
            <CardHeader>
              <CardTitle className="text-white">Add Portfolio Item</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300 ml-1">Title</Label>
                    <Input 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="bg-black/30 border-white/10 text-white rounded-xl" 
                      placeholder="Event Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300 ml-1">Category</Label>
                    <select 
                      className="flex h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="portraits">Portraits</option>
                      <option value="birthdays">Birthdays</option>
                      <option value="weddings">Weddings</option>
                      <option value="events">Events</option>
                      <option value="fashion">Fashion</option>
                      <option value="graduations">Graduations</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300 ml-1">Image URL</Label>
                  <Input 
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="bg-black/30 border-white/10 text-white rounded-xl" 
                    placeholder="https://images.unsplash.com/..." 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300 ml-1">Facebook Link</Label>
                  <Input 
                    required
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    className="bg-black/30 border-white/10 text-white rounded-xl" 
                    placeholder="https://facebook.com/..." 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300 ml-1">Description</Label>
                  <Textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-black/30 border-white/10 text-white rounded-xl" 
                    placeholder="Short description..." 
                  />
                </div>

                <Button type="submit" disabled={uploading} className="bg-white text-black hover:bg-gray-200 w-full rounded-full">
                  {uploading ? "Saving..." : "Add to Portfolio"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MANAGE ITEMS TAB */}
        <TabsContent value="manage">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
            {items.length === 0 && <p className="text-gray-500">No items found.</p>}
            
            {items.map((item) => (
              <Card key={item.id} className="bg-white/5 border-white/10 flex flex-row overflow-hidden h-24 rounded-2xl">
                {/* Compact Image Side */}
                <div className="relative w-24 h-full shrink-0 bg-gray-900">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                
                {/* Compact Content Side */}
                <div className="flex-1 p-3 flex justify-between items-center min-w-0">
                  <div className="truncate pr-2">
                    <h4 className="text-white font-bold text-sm truncate">{item.title}</h4>
                    <p className="text-gray-500 text-xs capitalize mt-1">{item.category}</p>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => handleDeleteItem(item.id)}
                    className="shrink-0 rounded-full h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}