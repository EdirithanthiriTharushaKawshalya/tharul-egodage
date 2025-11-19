"use client";

import FadeIn from "@/components/FadeIn";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed font-light bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[32px] border border-white/10">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p>
              Welcome to THARUL EGODAGE Photography. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
              <li><strong>Identity Data:</strong> includes first name, last name, or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
              <li>To respond to your inquiries and booking requests.</li>
              <li>To improve our website and customer service.</li>
              <li>To send you updates regarding your photo sessions or events.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at: <br />
              <span className="text-white">info@tharulegodage.com</span>
            </p>
          </section>
        </div>
      </FadeIn>
    </div>
  );
}