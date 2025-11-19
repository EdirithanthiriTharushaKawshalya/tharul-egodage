"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "contacts"), data);
      setStatus("Message sent successfully!");
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-300 ml-1">Name</Label>
        <Input 
          id="name" 
          name="name" 
          required 
          placeholder="John Doe" 
          className="bg-black/30 border-white/10 text-white focus:border-white/30 focus:bg-black/50 h-12 rounded-2xl transition-all"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-300 ml-1">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          required 
          placeholder="john@example.com" 
          className="bg-black/30 border-white/10 text-white focus:border-white/30 focus:bg-black/50 h-12 rounded-2xl transition-all"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-gray-300 ml-1">Message</Label>
        <Textarea 
          id="message" 
          name="message" 
          required 
          placeholder="Tell me about your event..." 
          className="bg-black/30 border-white/10 text-white focus:border-white/30 focus:bg-black/50 min-h-[150px] rounded-2xl resize-none transition-all"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full rounded-full bg-white text-black hover:bg-gray-200 h-12 font-medium text-lg"
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Message"}
      </Button>

      {status && (
        <div className={`p-4 rounded-2xl text-center text-sm ${status.includes("success") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
          {status}
        </div>
      )}
    </form>
  );
}