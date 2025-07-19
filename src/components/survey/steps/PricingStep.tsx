'use client';

import { useState } from 'react';

interface PricingStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PricingStep({
  formData,
  updateFormData,
  onNext,
  onBack,
}: PricingStepProps) {
  const [error, setError] = useState('');

  const isClient = formData.userType === 'client' || formData.userType === 'both';
  const isProvider = formData.userType === 'provider' || formData.userType === 'both';

  const priceOptions = [
    { id: '1k-2k', label: '₦1,000 - ₦2,000 per hour' },
    { id: '2k-5k', label: '₦2,000 - ₦5,000 per hour' },
    { id: '5k-10k', label: '₦5,000 - ₦10,000 per hour' },
    { id: '10k+', label: '₦10,000+ per hour' },
    { id: 'not_sure', label: 'I\'m not sure' },
  ];

  const handleClientPriceChange = (price: string) => {
    updateFormData({
      expectedEarnings: price,
      hourlyRateComfort: {
        ...formData.hourlyRateComfort,
        client: getPriceValue(price),
      },
    });
    setError('');
  };

  const handleProviderPriceChange = (price: string) => {
    updateFormData({
      expectedEarnings: price,
      hourlyRateComfort: {
        ...formData.hourlyRateComfort,
        provider: getPriceValue(price),
      },
    });
    setError('');
  };

  const getPriceValue = (priceRange: string): number => {
    switch (priceRange) {
      case '1k-2k':
        return 1500;
      case '2k-5k':
        return 3500;
      case '5k-10k':
        return 7500;
      case '10k+':
        return 15000;
      default:
        return 0;
    }
  };

  const handleContinue = () => {
    if (isClient && !formData.hourlyRateComfort?.client && formData.hourlyRateComfort?.client !== 0) {
      setError('Please select a pricing option to continue');
      return;
    }

    if (isProvider && !formData.hourlyRateComfort?.provider && formData.hourlyRateComfort?.provider !== 0) {
      setError('Please select a pricing option to continue');
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          {isClient && !isProvider && 
            'Help us understand what you would be comfortable paying for quality companionship services.'}
          {isProvider && !isClient && 'What hourly rate would motivate you to provide this service?'}
          {isClient && isProvider && 'Let\'s talk about pricing preferences'}
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          
          {isProvider && !isClient && 
            'Tell us what compensation would make this opportunity worthwhile for you.'}
          {isClient && isProvider && 
            'Since you\'re interested in both sides, we\'d like to know your pricing expectations.'}
        </p>
      </div>

      {/* Client Pricing */}
      {isClient && (
        <div className="space-y-6">
          <h3 className="font-medium text-white">
            What's a fair hourly rate for professional event companionship?
          </h3>
          <div className="grid gap-y-3">
            {priceOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleClientPriceChange(option.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  formData.expectedEarnings === option.id && isClient && !isProvider
                    ? 'border-[#FDCA64] bg-neutral-800'
                    : formData.hourlyRateComfort?.client === getPriceValue(option.id) && isClient
                    ? 'border-[#FDCA64] bg-neutral-800'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
                }`}
              >
                <div className="flex gap-4 items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex-shrink-0 ${
                      (formData.expectedEarnings === option.id && isClient && !isProvider) ||
                      (formData.hourlyRateComfort?.client === getPriceValue(option.id) && isClient)
                        ? 'border-[#FDCA64] bg-[#FDCA64]'
                        : 'border-neutral-500'
                    }`}
                  >
                    {((formData.expectedEarnings === option.id && isClient && !isProvider) ||
                      (formData.hourlyRateComfort?.client === getPriceValue(option.id) && isClient)) && (
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

      {/* Provider Pricing */}
      {isProvider && (
        <div className="space-y-6">
          <h3 className="font-medium text-white">
            What hourly rate would motivate you to provide this service?
          </h3>
          <div className="grid gap-y-3">
            {priceOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleProviderPriceChange(option.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  formData.expectedEarnings === option.id && isProvider && !isClient
                    ? 'border-[#FDCA64] bg-neutral-800'
                    : formData.hourlyRateComfort?.provider === getPriceValue(option.id) && isProvider
                    ? 'border-[#FDCA64] bg-neutral-800'
                    : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
                }`}
              >
                <div className="flex gap-4 items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex-shrink-0 ${
                      (formData.expectedEarnings === option.id && isProvider && !isClient) ||
                      (formData.hourlyRateComfort?.provider === getPriceValue(option.id) && isProvider)
                        ? 'border-[#FDCA64] bg-[#FDCA64]'
                        : 'border-neutral-500'
                    }`}
                  >
                    {((formData.expectedEarnings === option.id && isProvider && !isClient) ||
                      (formData.hourlyRateComfort?.provider === getPriceValue(option.id) && isProvider)) && (
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
