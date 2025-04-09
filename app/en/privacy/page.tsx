import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/en" className="text-xl font-bold">
              SuperSpeech
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/en" className="hover:text-blue-600">Home</Link>
              <Link href="/en#features" className="hover:text-blue-600">Features</Link>
              <Link href="/en#pricing" className="hover:text-blue-600">Pricing</Link>
              <Link href="/en/terms" className="hover:text-blue-600">Terms</Link>
              <Link href="/en/privacy" className="hover:text-blue-600 text-blue-600 font-semibold">Privacy</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/zh/privacy" className="text-sm hover:text-blue-600 transition">中文</Link>
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: May 2023</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="mb-4">We may collect, store and use the following kinds of personal information:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>information about your computer and about your visits to and use of this website, including your IP address, geographical location, browser type and version, operating system;</li>
              <li>information relating to any transactions carried out between you and us on or in relation to this website, including information relating to any purchases you make of our goods or services;</li>
              <li>information that you provide to us for the purpose of registering with us and/or subscribing to our website services and/or email notifications;</li>
              <li>information that you provide to us for the purpose of subscribing to our email notifications and/or newsletters;</li>
              <li>any other information that you choose to send to us;</li>
              <li>information about your use of our website and services.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-4">Using Personal Information</h2>
            <p className="mb-4">Personal information submitted to us via this website will be used for the purposes specified in this privacy policy. We may use your personal information to:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>administer our website and business;</li>
              <li>personalize our website for you;</li>
              <li>enable your use of the services available on our website;</li>
              <li>send you non-marketing commercial communications;</li>
              <li>send you email notifications which you have specifically requested;</li>
              <li>send you our email newsletter (if you have requested it);</li>
              <li>send you marketing communications relating to our business which we think may be of interest to you (if you have agreed to receive them);</li>
              <li>deal with enquiries and complaints made by or about you relating to our website;</li>
              <li>keep our website secure and prevent fraud;</li>
              <li>verify compliance with the terms and conditions governing the use of our website.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-4">Voice Data Processing</h2>
            <p className="mb-4">When using our SuperSpeech, our applications collect data about your voice recordings and transcription usage, including but not limited to:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>audio recordings submitted for transcription;</li>
              <li>transcription results and editing history;</li>
              <li>language settings and preferences;</li>
              <li>time and frequency of service usage;</li>
              <li>custom vocabulary and terminology settings.</li>
            </ul>
            <p className="mb-4">This data is used to provide services, optimize performance, and improve our products and services. We implement strict security measures to protect this sensitive information.</p>
            
            <h2 className="text-2xl font-bold mb-4">Payment Processing</h2>
            <p className="mb-4">We use Paddle as our payment processing service provider. When you make a subscription or purchase through our website, your payment information is provided directly to Paddle, and we do not store your complete payment card details.</p>
            <p className="mb-4">Paddle's privacy policy can be found on their website: <a href="https://www.paddle.com/legal/privacy" className="text-blue-600 hover:underline">https://www.paddle.com/legal/privacy</a>.</p>
            
            <h2 className="text-2xl font-bold mb-4">Disclosing Personal Information</h2>
            <p className="mb-4">We may disclose your personal information to any of our employees, officers, agents, suppliers or subcontractors insofar as reasonably necessary for the purposes set out in this privacy policy.</p>
            <p className="mb-4">We may disclose your personal information:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>to the extent that we are required to do so by law;</li>
              <li>in connection with any ongoing or prospective legal proceedings;</li>
              <li>in order to establish, exercise or defend our legal rights (including providing information to others for the purposes of fraud prevention);</li>
              <li>to the purchaser (or prospective purchaser) of any business or asset that we are (or are contemplating) selling;</li>
              <li>if we reasonably believe that disclosure is necessary to protect our rights, property, or safety, or that of any third party.</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
            <p className="mb-4">Information that we collect may be stored and processed in and transferred between any of the countries in which we operate in order to enable us to use the information in accordance with this privacy policy.</p>
            <p className="mb-4">You expressly agree to such transfers of personal information to these overseas entities to achieve our policy objectives.</p>
            
            <h2 className="text-2xl font-bold mb-4">Retaining Personal Information</h2>
            <p className="mb-4">This Section sets out our data retention policies, which are designed to help ensure that we comply with our legal obligations in relation to the retention and deletion of personal information.</p>
            <p className="mb-4">Personal information that we process for any purpose or purposes shall not be kept for longer than is necessary for that purpose or those purposes.</p>
            
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="mb-4">You may instruct us to provide you with any personal information we hold about you; provision of such information will be subject to the supply of appropriate evidence of your identity.</p>
            <p className="mb-4">We may withhold personal information that you request to the extent permitted by law. You may instruct us at any time not to process your personal information for marketing purposes.</p>
            
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <p className="mb-4">Our website uses cookies. A cookie is a file containing an identifier (a string of letters and numbers) that is sent by a web server to a web browser and is stored by the browser. The identifier is then sent back to the server each time the browser requests a page from the server.</p>
            <p className="mb-4">Cookies do not typically contain any information that personally identifies a user, but personal information that we store about you may be linked to the information stored in and obtained from cookies.</p>
            
            <h2 className="text-2xl font-bold mb-4">Amendments to Privacy Policy</h2>
            <p className="mb-4">We may update this policy from time to time by publishing a new version on our website. You should check this page occasionally to ensure you are happy with any changes to this policy.</p>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SuperSpeech</h3>
              <p className="text-gray-400">© 2023 SuperSpeech Technologies. All rights reserved.</p>
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
                  Email: support@superspeech.com
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