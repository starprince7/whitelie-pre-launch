'use client';

import { useState } from 'react';

interface BetaWaitlistStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function BetaWaitlistStep({
  formData,
  updateFormData,
  onSubmit,
  onBack,
  isSubmitting,
}: BetaWaitlistStepProps) {
  const [error, setError] = useState('');

  const handleBetaInterestChange = (interest: boolean) => {
    updateFormData({ betaInterest: interest });
    setError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ email: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ phone: e.target.value });
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ additionalFeedback: e.target.value });
  };

  const handleLocationChange = (field: 'state' | 'city', value: string) => {
    updateFormData({
      location: {
        ...(formData.location || {}),
        [field]: value,
      },
    });
  };

  const handleAgeRangeChange = (ageRange: string) => {
    updateFormData({ ageRange });
  };

  const validateEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handleSubmit = () => {
    // If they want beta access, email is required
    if (formData.betaInterest && (!formData.email || !validateEmail(formData.email))) {
      setError('Please provide a valid email to join the waitlist');
      return;
    }

    onSubmit();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Would you like early access when we launch?
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Join our beta waitlist to be among the first to experience WhiteLie and help shape our platform.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="font-medium text-white">Join our beta waitlist?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => handleBetaInterestChange(true)}
            className={`p-6 rounded-lg border cursor-pointer transition-all ${
              formData.betaInterest === true
                ? 'border-[#FDCA64] bg-neutral-800'
                : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
            }`}
          >
            <div className="flex gap-4 items-center">
              <div
                className={`w-5 h-5 rounded-full border flex-shrink-0 ${
                  formData.betaInterest === true
                    ? 'border-[#FDCA64] bg-[#FDCA64]'
                    : 'border-neutral-500'
                }`}
              >
                {formData.betaInterest === true && (
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-white">Yes, I'm interested</span>
            </div>
          </div>
          <div
            onClick={() => handleBetaInterestChange(false)}
            className={`p-6 rounded-lg border cursor-pointer transition-all ${
              formData.betaInterest === false
                ? 'border-[#FDCA64] bg-neutral-800'
                : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
            }`}
          >
            <div className="flex gap-4 items-center">
              <div
                className={`w-5 h-5 rounded-full border flex-shrink-0 ${
                  formData.betaInterest === false
                    ? 'border-[#FDCA64] bg-[#FDCA64]'
                    : 'border-neutral-500'
                }`}
              >
                {formData.betaInterest === false && (
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-white">No, not at this time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information (conditional) */}
      {formData.betaInterest && (
        <div className="space-y-6">
          <h3 className="font-medium text-white">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                Email <span className="text-[#FDCA64]">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email || ''}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCA64] focus:border-transparent focus:outline-none transition-colors"
                placeholder="Your email address"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-300">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone || ''}
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCA64] focus:border-transparent focus:outline-none transition-colors"
                placeholder="Your phone number"
              />
            </div>
          </div>
        </div>
      )}

      {/* Demographics (optional) */}
      <div className="space-y-6">
        <h3 className="font-medium text-white">Optional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="state" className="block text-sm font-medium text-neutral-300">
              State (Optional)
            </label>
            <input
              type="text"
              id="state"
              value={formData.location?.state || ''}
              onChange={(e) => handleLocationChange('state', e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCA64] focus:border-transparent focus:outline-none transition-colors"
              placeholder="Your state"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium text-neutral-300">
              City (Optional)
            </label>
            <input
              type="text"
              id="city"
              value={formData.location?.city || ''}
              onChange={(e) => handleLocationChange('city', e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCA64] focus:border-transparent focus:outline-none transition-colors"
              placeholder="Your city"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="ageRange" className="block text-sm font-medium text-neutral-300">
            Age Range (Optional)
          </label>
          <select
            id="ageRange"
            value={formData.ageRange || ''}
            onChange={(e) => handleAgeRangeChange(e.target.value)}
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCA64] focus:border-transparent focus:outline-none transition-colors"
          >
            <option value="">Select age range</option>
            <option value="18-24">18-24 years</option>
            <option value="25-34">25-34 years</option>
            <option value="35-44">35-44 years</option>
            <option value="45-54">45-54 years</option>
            <option value="55+">55+ years</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="feedback" className="block text-sm font-medium text-neutral-300">
            Additional Feedback (Optional)
          </label>
          <textarea
            id="feedback"
            value={formData.additionalFeedback || ''}
            onChange={handleFeedbackChange}
            rows={4}
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCA64] focus:border-transparent focus:outline-none transition-colors"
            placeholder="Share any other thoughts, concerns, or suggestions you have about our platform"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="pt-6 flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-transparent hover:bg-neutral-900 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-neutral-700"
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-black hover:bg-neutral-800 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-neutral-700 relative"
        >
          {isSubmitting ? (
            <>
              <span className="opacity-0">Submit</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </div>
  );
}
