'use client';

import { useState } from 'react';

interface MarketValidationStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function MarketValidationStep({
  formData,
  updateFormData,
  onNext,
  onBack,
}: MarketValidationStepProps) {
  const [error, setError] = useState('');

  const isClient = formData.userType === 'client' || formData.userType === 'both';
  const isProvider = formData.userType === 'provider' || formData.userType === 'both';

  const handleFrequencyChange = (frequency: string) => {
    updateFormData({ eventAttendanceFrequency: frequency });
    setError('');
  };

  const handleInterestChange = (interest: string) => {
    updateFormData({ providerIncomeInterest: interest });
    setError('');
  };

  const handleContinue = () => {
    if (isClient && !formData.eventAttendanceFrequency) {
      setError('Please select an option to continue');
      return;
    }

    if (isProvider && !formData.providerIncomeInterest) {
      setError('Please select an option to continue');
      return;
    }

    onNext();
  };

  const frequencyOptions = [
    { id: 'never', label: 'Never' },
    { id: 'rarely', label: 'Rarely' },
    { id: 'sometimes', label: 'Sometimes' },
    { id: 'often', label: 'Often' },
    { id: 'always', label: 'Always' },
  ];

  const interestOptions = [
    { id: 'very_interested', label: 'Very interested' },
    { id: 'somewhat_interested', label: 'Somewhat interested' },
    { id: 'not_interested', label: 'Not interested' },
    { id: 'need_more_info', label: 'Need more info' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          {isClient && !isProvider && 'How often do you attend events alone when you\'d prefer company?'}
          {isProvider && !isClient && 'How interested are you in earning ₦1k-5k/hour providing companionship?'}
          {isClient && isProvider && 'Tell us about your event attendance and earning interest'}
          {!isClient && !isProvider && 'Tell us more about your interests'}
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          {isClient && !isProvider && 
            'Your answer helps us understand the market demand for companionship services.'}
          {isProvider && !isClient && 
            'Your feedback helps us determine competitive compensation for our providers.'}
          {isClient && isProvider && 
            'Since you\'re interested in both using and providing services, we\'d like to know more about your needs.'}
          {!isClient && !isProvider && 
            'Even if you\'re just curious, your perspective is valuable to us.'}
        </p>
      </div>

      {/* Client Question */}
      {isClient && (
        <div className="space-y-6">
          <h3 className="font-medium text-white">
            How often do you attend events alone when you'd prefer company?
          </h3>
          <div className="grid gap-y-3">
            {frequencyOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleFrequencyChange(option.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  formData.eventAttendanceFrequency === option.id
                    ? 'border-[#FDCA64] bg-neutral-800'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
                }`}
              >
                <div className="flex gap-4 items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex-shrink-0 ${
                      formData.eventAttendanceFrequency === option.id
                        ? 'border-[#FDCA64] bg-[#FDCA64]'
                        : 'border-neutral-500'
                    }`}
                  >
                    {formData.eventAttendanceFrequency === option.id && (
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-white">{option.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Provider Question */}
      {isProvider && (
        <div className="space-y-6">
          <h3 className="font-medium text-white">
            How interested are you in earning ₦1k-5k/hour providing companionship?
          </h3>
          <div className="grid gap-y-3">
            {interestOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleInterestChange(option.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  formData.providerIncomeInterest === option.id
                    ? 'border-[#FDCA64] bg-neutral-800'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
                }`}
              >
                <div className="flex gap-4 items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex-shrink-0 ${
                      formData.providerIncomeInterest === option.id
                        ? 'border-[#FDCA64] bg-[#FDCA64]'
                        : 'border-neutral-500'
                    }`}
                  >
                    {formData.providerIncomeInterest === option.id && (
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-white">{option.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="pt-6 flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-transparent hover:bg-neutral-900 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-neutral-700"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 bg-black hover:bg-neutral-800 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-neutral-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
