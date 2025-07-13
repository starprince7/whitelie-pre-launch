import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const WaitlistSuccessPage = () => {
  return (
    <main className="bg-black text-white flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-8 lg:px-12 text-center">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 sm:p-16 max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Registration Confirmed!</h1>
          <p className="text-neutral-300 text-lg mb-8">
            Thank you for joining the WhiteLie professional network waitlist. We've received your information and will keep you updated on our launch progress.
          </p>
          <Link href="/landing">
            <span className="bg-amber-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-colors duration-300 cursor-pointer">
              Back to Homepage
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default WaitlistSuccessPage;
