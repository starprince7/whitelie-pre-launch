'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SurveyForm from '../components/survey/SurveyForm';
import PrivacyConsentModal from '../components/survey/PrivacyConsentModal';


export default function SurveyPage() {
  const router = useRouter();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  
  useEffect(() => {
    // Check if user has already accepted privacy policy
    const hasAcceptedPrivacy = localStorage.getItem('whitelie_privacy_consent');
    if (!hasAcceptedPrivacy) {
      setShowPrivacyModal(true);
    }
  }, []);

  const handlePrivacyAccept = () => {
    localStorage.setItem('whitelie_privacy_consent', 'true');
    setShowPrivacyModal(false);
  };

  const handlePrivacyDecline = () => {
    // Redirect to homepage if they decline
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-black py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Help Shape the Future of Companionship Services
          </h1>
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-xl text-neutral-300">
              Your feedback is essential as we develop WhiteLie, a revolutionary platform connecting clients with professional companions for platonic events and occasions.
            </p>
            <p className="text-lg text-neutral-400">
              This 5-minute survey will help us understand your needs and preferences, ensuring we build a service that truly meets market demands.
            </p>
          </div>
          
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex items-center">
              <div className="bg-[#FDCA64]/20 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FDCA64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-neutral-300 text-sm">Your data is protected</span>
            </div>
            <div className="flex items-center">
              <div className="bg-[#FDCA64]/20 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FDCA64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-neutral-300 text-sm">Takes only 5 minutes</span>
            </div>
            <div className="flex items-center">
              <div className="bg-[#FDCA64]/20 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FDCA64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-neutral-300 text-sm">Early access to beta</span>
            </div>
          </div>
        </div>
        
        <SurveyForm />

        {/* Privacy disclaimer at bottom */}
        <div className="text-center mt-16 text-sm text-neutral-500 max-w-2xl mx-auto">
          <p>
            By completing this survey, you're helping us create a better platform. Your information will only be used for product development purposes and will never be shared with third parties.
          </p>
        </div>
      </div>

      {/* Privacy Consent Modal */}
      <PrivacyConsentModal 
        open={showPrivacyModal}
        onAccept={handlePrivacyAccept}
        onDecline={handlePrivacyDecline}
      />
    </main>
  );
}
