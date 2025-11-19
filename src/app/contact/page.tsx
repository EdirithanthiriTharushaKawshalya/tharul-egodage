import ContactForm from "@/components/ContactForm";
import { Facebook, Instagram, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-white">Get in Touch</h1>
          <p className="text-gray-400 text-lg">
            Have a project in mind? Looking to book a session? 
            Fill out the form or reach out directly via social media.
          </p>
          
          <div className="space-y-6 mt-8">
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="p-3 rounded-full bg-gray-900 border border-white/10">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="text-lg font-medium">+1 234 567 890</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-gray-300">
              <div className="p-3 rounded-full bg-gray-900 border border-white/10">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Instagram</p>
                <a href="#" className="text-lg font-medium hover:underline">@lumina_lens</a>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-gray-300">
              <div className="p-3 rounded-full bg-gray-900 border border-white/10">
                <Facebook className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Facebook</p>
                <a href="#" className="text-lg font-medium hover:underline">Lumina Photography</a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Component */}
        <div className="bg-gray-900/50 p-8 rounded-2xl border border-white/10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}