"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
      createdAt: new Date(),
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
        <Label htmlFor="name" className="text-gray-300">Name</Label>
        <Input 
          id="name" 
          name="name" 
          required 
          placeholder="Your Name" 
          className="bg-black border-white/20 text-white focus:border-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-300">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          required 
          placeholder="your@email.com" 
          className="bg-black border-white/20 text-white focus:border-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-gray-300">Message</Label>
        <Textarea 
          id="message" 
          name="message" 
          required 
          placeholder="Tell me about your event..." 
          className="bg-black border-white/20 text-white focus:border-white min-h-[120px]"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-white text-black hover:bg-gray-200"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>

      {status && (
        <p className={`text-sm text-center mt-4 ${status.includes("success") ? "text-green-400" : "text-red-400"}`}>
          {status}
        </p>
      )}
    </form>
  );
}