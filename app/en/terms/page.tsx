import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/en" className="text-xl font-bold">
              Smart Home Suite
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/en" className="hover:text-blue-600">Home</Link>
              <Link href="/en#features" className="hover:text-blue-600">Features</Link>
              <Link href="/en#pricing" className="hover:text-blue-600">Pricing</Link>
              <Link href="/en/terms" className="hover:text-blue-600 text-blue-600 font-semibold">Terms</Link>
              <Link href="/en/privacy" className="hover:text-blue-600">Privacy</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/zh/terms" className="text-sm hover:text-blue-600 transition">中文</Link>
              <Link 
                href="#download" 
                className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Download
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: May 2023</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
            <p className="mb-4">We offer a 14-day money-back guarantee for all plans. If you are not satisfied with our service, you can request a full refund within 14 days of purchase, no questions asked.</p>
            
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4">These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, accessible at smarthomesuite.com.</p>
            <p className="mb-4">These Terms will be applied fully and affect your use of this Website. By using this Website, you agreed to accept all terms and conditions written here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.</p>
            
            <h2 className="text-2xl font-bold mb-4">2. Intellectual Property Rights</h2>
            <p className="mb-4">Other than the content you own, under these Terms, our Company and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
            <p className="mb-4">You are granted a limited license only for purposes of viewing the material contained on this Website.</p>
            
            <h2 className="text-2xl font-bold mb-4">3. Restrictions</h2>
            <p className="mb-4">You are specifically restricted from all of the following:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>publishing any Website material in any other media;</li>
              <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
              <li>publicly performing and/or showing any Website material;</li>
              <li>using this Website in any way that is or may be damaging to this Website;</li>
              <li>using this Website in any way that impacts user access to this Website;</li>
              <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
              <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
              <li>using this Website to engage in any advertising or marketing.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-4">4. Subscription and Payment</h2>
            <p className="mb-4">By purchasing a subscription through our website, you agree to pay subscription fees. Subscription fees will be billed according to your chosen subscription plan.</p>
            <p className="mb-4">You are responsible for all charges incurred under your account, including any applicable taxes.</p>
            <p className="mb-4">We use Paddle as our payment processor, and all payments are processed through their secure platform.</p>
            
            <h2 className="text-2xl font-bold mb-4">5. Refund Policy</h2>
            <p className="mb-4">We offer a 14-day refund guarantee for all subscription plans. If you are not satisfied with our service, you can request a full refund within 14 days of purchase.</p>
            <p className="mb-4">To request a refund, please contact our support team. Refunds will be processed to the original payment method.</p>
            
            <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">In no event shall we be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            
            <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
            <p className="mb-4">These Terms shall be governed and construed in accordance with the laws of your country of residence, without regard to its conflict of law provisions.</p>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Smart Home Suite</h3>
              <p className="text-gray-400">© 2023 Smart Home Technologies. All rights reserved.</p>
              <p className="text-gray-400 mt-2">Secure payments by <a href="https://paddle.com" className="underline">Paddle</a></p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/en" className="text-gray-400 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/en#features" className="text-gray-400 hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/en#pricing" className="text-gray-400 hover:text-white transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/en/terms" className="text-gray-400 hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/en/privacy" className="text-gray-400 hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  Email: support@smarthomesuite.com
                </li>
                <li className="text-gray-400">
                  Phone: +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 