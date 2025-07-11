'use client';

import { useState } from 'react';
import Image from "next/image";

// Import our custom components
import Navbar from './components/ui/Navbar';
import HeroSection from './components/ui/HeroSection';
import ServiceCategories from './components/ui/ServiceCategories';
import PricingPreview from './components/ui/PricingPreview';
import EmailCapture from './components/ui/EmailCapture';
import SurveyModal from './components/ui/SurveyModal';

export default function Home() {
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [userId, setUserId] = useState('');

  // Function to handle user creation and open survey modal
  const handleUserCreated = async (newUserId: string) => {
    setUserId(newUserId);
    setShowSurveyModal(true);
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section - add pt-16 to account for the fixed navbar */}
      <div className="pt-16">
        <HeroSection />
      </div>
      
      {/* Service Categories Section */}
      <ServiceCategories />
      
      {/* Pricing Preview Section */}
      <PricingPreview />
      
      {/* Email Capture Form - passing handleUserCreated to open survey modal after signup */}
      <EmailCapture onUserCreated={handleUserCreated} />
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">WhiteLie</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Platonic companionship for all your social needs.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Services</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Family Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Professional Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Social Activities
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} WhiteLie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Survey Modal - Shown after user submits email */}
      {showSurveyModal && userId && (
        <SurveyModal 
          userId={userId} 
          isOpen={showSurveyModal} 
          onClose={() => setShowSurveyModal(false)}
        />
      )}
    </div>
  );
}
