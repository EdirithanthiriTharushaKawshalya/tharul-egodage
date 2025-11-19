"use client";

import FadeIn from "@/components/FadeIn";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed font-light bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[32px] border border-white/10">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. 
              If you do not agree with these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, images, graphics, logos, and software, is the property of 
              THARUL EGODAGE Photography and is protected by international copyright laws. You may not reproduce, distribute, 
              or transmit any content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Booking & Cancellations</h2>
            <p>
              Bookings are subject to availability and confirmation. A deposit may be required to secure your session date. 
              Cancellations made less than 48 hours before the scheduled session may be subject to a cancellation fee.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
            <p>
              In no event shall THARUL EGODAGE Photography be liable for any damages (including, without limitation, damages for loss of data or profit, 
              or due to business interruption) arising out of the use or inability to use the materials on this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Sri Lanka and you irrevocably 
              submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
      </FadeIn>
    </div>
  );
}