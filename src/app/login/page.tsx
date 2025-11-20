"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, Mail, Key } from "lucide-react"; 
import FadeIn from "@/components/FadeIn";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin"); // Redirect to admin on success
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <FadeIn>
        {/* Changed max-w-md to max-w-lg for a wider card */}
        <Card className="w-full max-w-lg bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl relative z-10">
          <CardHeader className="text-center pb-2 pt-10">
            <div className="mx-auto bg-white/5 border border-white/10 p-4 rounded-full w-fit mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl text-white font-bold tracking-tight">Admin Access</CardTitle>
            <CardDescription className="text-gray-400 text-base mt-2">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8 pb-10 px-8 md:px-12"> {/* Increased horizontal padding inside */}
            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
                <Label className="text-gray-300 ml-1 text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    type="email"
                    required
                    placeholder="admin@example.com"
                    className="bg-white/5 border-white/10 text-white rounded-2xl h-14 pl-12 focus:bg-white/10 focus:border-white/30 transition-all placeholder:text-gray-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300 ml-1 text-sm font-medium">Password</Label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white rounded-2xl h-14 pl-12 focus:bg-white/10 focus:border-white/30 transition-all placeholder:text-gray-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full rounded-full bg-white text-black hover:bg-gray-200 h-14 font-semibold text-lg mt-4 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform hover:scale-[1.02]"
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}