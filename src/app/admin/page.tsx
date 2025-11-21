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
import { Trash2, Loader2, Mail, Calendar, Phone, LogOut, Clock, Star, MessageSquare } from "lucide-react"; 
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

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export default function AdminDashboard() {
  const [authLoading, setAuthLoading] = useState(true); 
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]); // New State for Reviews
  const [uploading, setUploading] = useState(false);
  const router = useRouter(); 

  // Portfolio Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "portraits",
    image: "",
    link: "",
    description: "",
  });

  // Review Form State
  const [reviewData, setReviewData] = useState({
    name: "",
    rating: "5",
    date: "",
    text: ""
  });

  // --- AUTH & DATA FETCHING ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        Promise.all([fetchItems(), fetchMessages(), fetchReviews()]).then(() => setAuthLoading(false));
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

  const fetchReviews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const data: ReviewItem[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as ReviewItem);
      });
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // --- ACTIONS ---
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handlePortfolioSubmit = async (e: React.FormEvent) => {
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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      await addDoc(collection(db, "reviews"), {
        ...reviewData,
        rating: parseInt(reviewData.rating)
      });
      alert("Review added successfully!");
      setReviewData({ name: "", rating: "5", date: "", text: "" });
      fetchReviews();
    } catch (error) {
      console.error("Error adding review: ", error);
      alert("Failed to add review.");
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

  const handleDeleteReview = async (id: string) => {
    if (confirm("Delete this review?")) {
      await deleteDoc(doc(db, "reviews", id));
      fetchReviews();
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown Date";
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp.toDate();
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white bg-black">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 pt-24 md:pt-32 pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
        <Button variant="destructive" size="sm" onClick={handleLogout} className="rounded-full h-9 px-4">
           <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl w-full grid grid-cols-4 h-auto mb-6">
          <TabsTrigger value="messages" className="rounded-xl py-3 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-black">
            Messages
          </TabsTrigger>
          <TabsTrigger value="add" className="rounded-xl py-3 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-black">
            Add Item
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-xl py-3 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-black">
            Reviews
          </TabsTrigger>
          <TabsTrigger value="manage" className="rounded-xl py-3 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-black">
            Manage
          </TabsTrigger>
        </TabsList>

        {/* MESSAGES TAB */}
        <TabsContent value="messages" className="space-y-4">
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
                     <Button variant="destructive" size="sm" onClick={() => handleDeleteMessage(msg.id)} className="h-8 rounded-full text-xs">
                        <Trash2 className="h-3 w-3 mr-2" /> Delete
                      </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ADD PORTFOLIO ITEM TAB */}
        <TabsContent value="add">
          <Card className="bg-white/5 border-white/10 mt-6 rounded-[32px] p-3 md:p-6">
            <CardHeader>
              <CardTitle className="text-white">Add Portfolio Item</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePortfolioSubmit} className="space-y-4">
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

        {/* NEW: REVIEWS TAB */}
        <TabsContent value="reviews">
          <div className="space-y-8">
            {/* Add Review Form */}
            <Card className="bg-white/5 border-white/10 rounded-[32px] p-3 md:p-6">
              <CardHeader>
                <CardTitle className="text-white">Add Client Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300 ml-1">Client Name</Label>
                      <Input 
                        required
                        value={reviewData.name}
                        onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                        className="bg-black/30 border-white/10 text-white rounded-xl" 
                        placeholder="Sarah Jenkins" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300 ml-1">Date/Timeframe</Label>
                      <Input 
                        required
                        value={reviewData.date}
                        onChange={(e) => setReviewData({...reviewData, date: e.target.value})}
                        className="bg-black/30 border-white/10 text-white rounded-xl" 
                        placeholder="2 months ago" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300 ml-1">Rating</Label>
                      <select 
                        className="flex h-10 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
                        value={reviewData.rating}
                        onChange={(e) => setReviewData({...reviewData, rating: e.target.value})}
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300 ml-1">Review Text</Label>
                    <Textarea 
                      required
                      value={reviewData.text}
                      onChange={(e) => setReviewData({...reviewData, text: e.target.value})}
                      className="bg-black/30 border-white/10 text-white rounded-xl" 
                      placeholder="Tharul captured our wedding beautifully..." 
                    />
                  </div>
                  <Button type="submit" disabled={uploading} className="bg-white text-black hover:bg-gray-200 w-full rounded-full">
                    {uploading ? "Saving..." : "Add Review"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* List Existing Reviews */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold ml-2">Existing Reviews</h3>
              {reviews.length === 0 && <p className="text-gray-500 ml-2">No reviews added yet.</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="bg-white/5 border-white/10 rounded-[24px] relative">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-bold">{review.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="flex text-yellow-500"><Star className="h-3 w-3 fill-current" /> {review.rating}</span>
                            <span>•</span>
                            <span>{review.date}</span>
                          </div>
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteReview(review.id)} className="h-8 w-8 rounded-full">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-3 italic">"{review.text}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* MANAGE ITEMS TAB */}
        <TabsContent value="manage">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
            {items.length === 0 && <p className="text-gray-500">No items found.</p>}
            
            {items.map((item) => (
              <Card key={item.id} className="bg-white/5 border-white/10 flex flex-row overflow-hidden h-24 rounded-2xl">
                <div className="relative w-24 h-full shrink-0 bg-gray-900">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 p-3 flex justify-between items-center min-w-0">
                  <div className="truncate pr-2">
                    <h4 className="text-white font-bold text-sm truncate">{item.title}</h4>
                    <p className="text-gray-500 text-xs capitalize mt-1">{item.category}</p>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteItem(item.id)} className="shrink-0 rounded-full h-8 w-8">
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