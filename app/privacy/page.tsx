import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-black dark:text-white">
              MeetingGPT
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-black dark:text-white hover:text-blue-600">Home</Link>
              <Link href="/#features" className="text-black dark:text-white hover:text-blue-600">Features</Link>
              <Link href="/pricing" className="text-black dark:text-white hover:text-blue-600">Pricing</Link>
              <Link href="/terms" className="text-black dark:text-white hover:text-blue-600">Terms</Link>
              <Link href="/privacy" className="hover:text-blue-600 text-blue-600 font-semibold">Privacy Policy</Link>
            </nav>

            <div className="flex items-center space-x-4">
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

      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last Updated: May 2025</p>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Information We Collect</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We may collect, store, and use the following types of personal information:</p>
            <ul className="list-disc pl-8 mb-4 text-gray-700 dark:text-gray-300">
              <li>Information about your computer, including your IP address, geographical location, browser type and version, and operating system;</li>
              <li>Information about your visits to and use of this website, including the referral source, length of visit, page views, and website navigation paths;</li>
              <li>Information that you provide to us when registering for our email notifications and/or newsletters, such as your email address;</li>
              <li>Information that you provide when using the services on our website, including your name, profile picture, gender, date of birth, relationship status, interests, educational details, and employment details;</li>
              <li>Information contained in communications you send to us, including the communication content and metadata;</li>
              <li>Any other personal information that you send to us via our website.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Using Personal Information</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Personal information submitted to us through our website will be used for the purposes specified in this policy. We may use your personal information for the following purposes:</p>
            <ul className="list-disc pl-8 mb-4 text-gray-700 dark:text-gray-300">
              <li>Administering our website and business;</li>
              <li>Personalizing our website for you;</li>
              <li>Enabling your use of the services available on our website;</li>
              <li>Sending you non-marketing commercial communications;</li>
              <li>Sending you email notifications that you have specifically requested;</li>
              <li>Sending you our email newsletter, if you have requested it;</li>
              <li>Sending you marketing communications relating to our business, if you have agreed to receive them;</li>
              <li>Dealing with inquiries and complaints made by or about you relating to our website services;</li>
              <li>Keeping our website secure and preventing fraud;</li>
              <li>Verifying compliance with the terms and conditions governing the use of our website.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Audio Data Processing</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">When using our MeetingGPT service, our application processes your meeting audio data, including but not limited to:</p>
            <ul className="list-disc pl-8 mb-4 text-gray-700 dark:text-gray-300">
              <li>Audio content from meetings or videos;</li>
              <li>Responses generated based on your custom prompts;</li>
              <li>Language settings and preferences;</li>
              <li>Service usage time and frequency;</li>
              <li>Custom prompt settings.</li>
            </ul>
            <p className="mb-4 text-gray-700 dark:text-gray-300">All audio processing is completed locally, ensuring your data is not uploaded or leaked. We implement strict security measures to protect this sensitive information.</p>

            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Payment Processing</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We use Paddle as our payment processing service provider. When you make a subscription or purchase through our website, your payment information is provided directly to Paddle, and we do not store your complete payment card details.</p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Paddle's privacy policy can be found on their website: <a href="https://www.paddle.com/legal/privacy" className="text-blue-600 hover:underline">https://www.paddle.com/legal/privacy</a>.</p>

            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Disclosing Personal Information</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We may disclose your personal information to any of our employees, officers, contractors, agents, suppliers, or subcontractors insofar as reasonably necessary for the purposes set out in this policy.</p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We may also disclose your personal information:</p>
            <ul className="list-disc pl-8 mb-4 text-gray-700 dark:text-gray-300">
              <li>To the extent that we are required to do so by law;</li>
              <li>In connection with any ongoing or prospective legal proceedings;</li>
              <li>In order to establish, exercise, or defend our legal rights (including providing information to others for the purposes of fraud prevention);</li>
              <li>To the purchaser (or prospective purchaser) of any business or asset that we are (or are contemplating) selling;</li>
              <li>If we reasonably believe that disclosure is necessary to protect our rights, property, or personal safety or that of any third party.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">International Data Transfers</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Information that we collect may be stored, processed, and transferred between any of the countries in which we operate in order to enable us to use the information in accordance with this policy.</p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">You expressly agree to such transfers of personal information to these overseas entities for our policy purposes.</p>

            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Retaining Personal Information</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">This section sets out our data retention policies, which are designed to help ensure that we comply with our legal obligations regarding the retention of personal data.</p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Personal information that we process for any purpose or purposes shall not be kept for longer than is necessary for that purpose or those purposes.</p>

            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Your Rights</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">You may instruct us to provide you with any personal information we hold about you; provision of such information will be subject to the supply of appropriate evidence of your identity.</p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We may withhold personal information that you request to the extent permitted by law. You may instruct us at any time not to process your personal information for marketing purposes.</p>

            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Cookies</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Our website uses cookies. A cookie is a file containing an identifier (a string of letters and numbers) that is sent by a web server to a web browser and is stored by the browser. The identifier is then sent back to the server each time the browser requests a page from the server.</p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Cookies do not typically contain any information that personally identifies you, but personal information that we store about you may be linked to the information stored in and obtained from cookies.</p>

            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Amendments to Privacy Policy</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">We may update this policy from time to time by publishing a new version on our website. You should check this page occasionally to ensure you are happy with any changes to this policy.</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MeetingGPT</h3>
              <p className="text-gray-400">© 2025 MeetingGPT. All rights reserved.</p>
              <p className="text-gray-400 mt-2">Secure payments by <a href="https://paddle.com" className="underline">Paddle</a></p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="text-gray-400 hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  Email: hi@20280101.xyz
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}