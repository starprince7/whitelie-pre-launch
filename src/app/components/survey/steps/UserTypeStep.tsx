'use client';

import { useState } from 'react';

interface UserTypeStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
}

export default function UserTypeStep({ formData, updateFormData, onNext }: UserTypeStepProps) {
  const [error, setError] = useState('');
  
  const handleOptionSelect = (userType: string) => {
    updateFormData({ userType });
    setError('');
  };
  
  const handleContinue = () => {
    if (!formData.userType) {
      setError('Please select an option to continue');
      return;
    }
    onNext();
  };
  
  const options = [
    {
      id: 'client',
      label: 'I\'d hire someone for companionship at events',
      description: 'Find the perfect plus-one for your important events'
    },
    {
      id: 'provider',
      label: 'I\'d provide companionship services for income',
      description: 'Earn money attending events and being a supportive companion'
    },
    {
      id: 'both',
      label: 'Both interest me',
      description: 'I want to both use and provide companionship services'
    },
    {
      id: 'undecided',
      label: 'Just curious to learn more',
      description: 'I\'m interested in the concept and want to know more'
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Which best describes your interest?</h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          We're building a platform that connects people for platonic companionship at events. 
          Tell us how you'd like to participate.
        </p>
      </div>
      
      <div className="grid gap-y-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`p-6 rounded-lg border cursor-pointer transition-all ${
              formData.userType === option.id
                ? 'border-[#FDCA64] bg-neutral-800'
                : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
            }`}
          >
            <div className="flex gap-4 items-start">
              <div className={`w-5 h-5 rounded-full border flex-shrink-0 mt-1 ${
                formData.userType === option.id
                  ? 'border-[#FDCA64] bg-[#FDCA64]'
                  : 'border-neutral-500'
              }`}>
                {formData.userType === option.id && (
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="font-medium text-white">{option.label}</h3>
                <p className="text-neutral-400 text-sm mt-1">{option.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      <div className="pt-6">
        <button
          onClick={handleContinue}
          className="w-full bg-black hover:bg-neutral-800 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-neutral-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
