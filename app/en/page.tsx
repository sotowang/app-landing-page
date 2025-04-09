import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/en" className="text-xl font-bold">
              Voice To Text
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/en" className="hover:text-blue-600">Home</Link>
              <Link href="/en#features" className="hover:text-blue-600">Features</Link>
              <Link href="/en#pricing" className="hover:text-blue-600">Pricing</Link>
              <Link href="/en/terms" className="hover:text-blue-600">Terms</Link>
              <Link href="/en/privacy" className="hover:text-blue-600">Privacy</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/zh" className="text-sm hover:text-blue-600 transition">中文</Link>
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
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Transform Your Voice Into Text</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Write at the speed of speech with our AI-powered voice recognition technology that works across any application</p>
          <Link 
            href="#download" 
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
      
      {/* Product Description Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Voice Recognition Made Simple</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our advanced voice-to-text solution helps you work faster, communicate better, and create content with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Use Cases</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Craft Professional Emails</span>
                    <p className="text-gray-600">Dictate polished emails with proper formatting. Our tool automatically structures your spoken words into professional communication.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Message Colleagues Instantly</span>
                    <p className="text-gray-600">Speak your thoughts for chat conversations. Perfect for thoughtful responses without typing lengthy messages.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Capture Meeting Notes</span>
                    <p className="text-gray-600">Record ideas as they happen without breaking your focus. Turn spoken thoughts into organized notes during meetings.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Create Content Quickly</span>
                    <p className="text-gray-600">Draft social posts, articles, or blogs by speaking naturally. Overcome writer's block by converting spoken ideas into formatted content.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Key Benefits</h3>
              <p className="text-gray-600 mb-6">
                Our voice-to-text solution offers numerous advantages over traditional typing:
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  3-5x faster than typing
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Works with any application
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Smart formatting based on context
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Supports multiple languages
                </li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-blue-800 font-medium">Try our demo: <a href="https://demo.voicetotext.com" className="underline">demo.voicetotext.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Designed for professionals who value efficiency and accuracy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Transcription Modes</h3>
              <p className="text-gray-600">Simple format, Email mode, Note mode, and Message mode for different contexts</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Vocabulary</h3>
              <p className="text-gray-600">Add specialized terms, names, and jargon for better accuracy</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
              <p className="text-gray-600">Use your own API key for complete data privacy and control</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer flexible pricing options to fit your needs and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-gray-600 mb-6">For trying it out</div>
                <div className="text-4xl font-bold mb-6">$0<span className="text-base font-normal text-gray-600">/month</span></div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>10 minutes of transcription per month</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Standard quality</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>2 languages supported</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>No file exports</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <a
                  href="https://checkout.paddle.com/product/free-tier"
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-center py-3 rounded-md font-medium transition"
                >
                  Start Free
                </a>
              </div>
            </div>
            
            {/* Standard Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 transform scale-105">
              <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                MOST POPULAR
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Standard</h3>
                <div className="text-gray-600 mb-6">For individual users</div>
                <div className="text-4xl font-bold mb-6">$9<span className="text-base font-normal text-gray-600">/month</span></div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>5 hours of transcription per month</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>High-quality transcription</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>10 languages supported</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Multiple export formats</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <a
                  href="https://checkout.paddle.com/product/12345"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-md font-medium transition"
                >
                  Buy Now
                </a>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="text-gray-600 mb-6">For professional teams</div>
                <div className="text-4xl font-bold mb-6">$29<span className="text-base font-normal text-gray-600">/month</span></div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Unlimited transcription time</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Premium quality transcription</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>30+ languages supported</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Dedicated API access</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <a
                  href="https://checkout.paddle.com/product/67890"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-md font-medium transition"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10 text-gray-600">
            <p>All plans come with a 7-day money-back guarantee. For any questions, please <a href="#contact" className="text-blue-600 hover:underline">contact us</a>.</p>
          </div>
        </div>
      </section>
      
      {/* Download Section */}
      <section id="download" className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Download Our Smart Home Apps</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Available on iOS and Android devices</p>
          
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link 
              href="https://apps.apple.com/us/app/smart-home-control" 
              className="bg-black text-white px-6 py-3 rounded-md flex items-center justify-center"
            >
              <svg className="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div>
                <div className="text-xs">Download on the</div>
                <div className="text-xl font-semibold">App Store</div>
              </div>
            </Link>
            
            <Link 
              href="https://play.google.com/store/apps/details?id=com.smartcontrol.home" 
              className="bg-black text-white px-6 py-3 rounded-md flex items-center justify-center"
            >
              <svg className="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23L12 13.77l8.82 9.23H3.18M12 4l4.41 4.62L20.99 4.62 12 13.24 3.01 4.62 7.59 8.62 12 4M12 1L2.42 3.99 12 11.76l9.58-7.77L12 1z"/>
              </svg>
              <div>
                <div className="text-xs">Get it on</div>
                <div className="text-xl font-semibold">Google Play</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Smart Home Suite</h3>
              <p className="text-gray-400">© 2023 Smart Home Technologies. All rights reserved.</p>
              <p className="text-gray-400 mt-2">Secure payments processed by <a href="https://paddle.com" className="underline">Paddle</a></p>
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