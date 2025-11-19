"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Trash2, Loader2, Mail, Calendar } from "lucide-react";
import Image from "next/image";

// Interface for Portfolio Items
interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
}

// Interface for Contact Messages
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: any; // Firestore Timestamp
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "weddings",
    image: "",
    link: "",
    description: "",
  });

  // Initial Data Fetch
  useEffect(() => {
    Promise.all([fetchItems(), fetchMessages()]).then(() => setLoading(false));
  }, []);

  // --- 1. FETCH FUNCTIONS ---
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
      // Order by creation time (Newest First)
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

  // --- 2. ACTION FUNCTIONS ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      await addDoc(collection(db, "portfolio"), formData);
      alert("Item added successfully!");
      setFormData({ title: "", category: "weddings", image: "", link: "", description: "" });
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

  // Helper to format Firestore Timestamp
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown Date";
    // Handle both Firestore Timestamp objects and standard Date objects
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
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
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Portfolio Manager</h1>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="bg-gray-900 border border-white/10 grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
          <TabsTrigger value="add">Add Item</TabsTrigger>
          <TabsTrigger value="manage">Manage Portfolio</TabsTrigger>
        </TabsList>

        {/* TAB 1: MESSAGES (Client Contacts) */}
        <TabsContent value="messages" className="mt-6 space-y-4">
          {messages.length === 0 && (
            <p className="text-center text-gray-500 py-10">No messages yet.</p>
          )}
          
          <div className="grid grid-cols-1 gap-4">
            {messages.map((msg) => (
              <Card key={msg.id} className="bg-gray-900 border-white/10">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-lg">{msg.name}</CardTitle>
                      <CardDescription className="text-gray-400 flex items-center gap-2 mt-1">
                        <Mail className="h-3 w-3" /> {msg.email}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 flex items-center justify-end gap-1 mb-2">
                        <Calendar className="h-3 w-3" />
                        {formatDate(msg.createdAt)}
                      </p>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="h-8"
                      >
                        <Trash2 className="h-3 w-3 mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-black/40 rounded-md border border-white/5">
                    <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB 2: ADD NEW ITEM */}
        <TabsContent value="add">
          <Card className="bg-gray-900 border-white/10 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Add Portfolio Item</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Title</Label>
                    <Input 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="bg-black border-white/20 text-white" 
                      placeholder="Event Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Category</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-white/20 bg-black px-3 py-2 text-sm text-white"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="weddings">Weddings</option>
                      <option value="events">Events</option>
                      <option value="portraits">Portraits</option>
                      <option value="graduations">Graduations</option>
                      <option value="birthdays">Birthdays</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Image URL (Direct Link)</Label>
                  <Input 
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="bg-black border-white/20 text-white" 
                    placeholder="https://images.unsplash.com/..." 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Facebook Link</Label>
                  <Input 
                    required
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    className="bg-black border-white/20 text-white" 
                    placeholder="https://facebook.com/..." 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Description</Label>
                  <Textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-black border-white/20 text-white" 
                    placeholder="Short description..." 
                  />
                </div>

                <Button type="submit" disabled={uploading} className="bg-white text-black hover:bg-gray-200 w-full">
                  {uploading ? "Saving..." : "Add to Portfolio"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: MANAGE PORTFOLIO */}
        <TabsContent value="manage">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {items.length === 0 && <p className="text-gray-500">No items found.</p>}
            
            {items.map((item) => (
              <Card key={item.id} className="bg-gray-900 border-white/10 flex flex-row overflow-hidden h-32">
                <div className="relative w-32 h-full shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 p-4 flex justify-between items-center min-w-0">
                  <div className="truncate pr-4">
                    <h4 className="text-white font-bold truncate">{item.title}</h4>
                    <p className="text-gray-500 text-sm capitalize">{item.category}</p>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => handleDeleteItem(item.id)}
                    className="shrink-0"
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