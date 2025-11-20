import ContactForm from "@/components/ContactForm";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 pt-28 md:pt-32 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Contact Info */}
        <FadeIn delay={0.1}>
          <div className="space-y-8 md:space-y-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">Get in Touch</h1>
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
                Have a project in mind? Looking to book a session? 
                I'm currently available for freelance work and open to new opportunities.
              </p>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              {/* WhatsApp / Phone Section */}
              <a 
                href="tel:+94707914277" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-4 md:space-x-6 p-4 md:p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                  <Phone className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 uppercase tracking-wider group-hover:text-gray-300">WhatsApp / Phone</p>
                  <p className="text-base md:text-lg font-medium text-white truncate">+94 70 791 4277</p>
                </div>
              </a>

              {/* Instagram Section */}
              <a 
                href="https://www.instagram.com/tharul_photography" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-4 md:space-x-6 p-4 md:p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                  <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 uppercase tracking-wider group-hover:text-gray-300">Instagram</p>
                  <p className="text-base md:text-lg font-medium text-white truncate">@tharul_photography</p>
                </div>
              </a>

              {/* Facebook Section */}
              <a 
                href="https://www.facebook.com/tharulphotography" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-4 md:space-x-6 p-4 md:p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                  <Facebook className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 uppercase tracking-wider group-hover:text-gray-300">Facebook</p>
                  <p className="text-base md:text-lg font-medium text-white truncate">Tharul Egodage Photography</p>
                </div>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Contact Form Component */}
        <FadeIn delay={0.3}>
          <div className="bg-white/5 backdrop-blur-md p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send us an Inquire</h2>
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}