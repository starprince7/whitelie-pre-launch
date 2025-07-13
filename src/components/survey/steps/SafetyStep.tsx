'use client';

import { useState } from 'react';

interface SafetyStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SafetyStep({
  formData,
  updateFormData,
  onNext,
  onBack,
}: SafetyStepProps) {
  const [error, setError] = useState('');

  const safetyOptions = [
    { id: 'identity_verification', label: 'Identity verification', icon: '🪪' },
    { id: 'background_checks', label: 'Background checks', icon: '🔍' },
    { id: 'in_app_messaging', label: 'In-app messaging', icon: '💬' },
    { id: 'location_sharing', label: 'Location sharing', icon: '📍' },
    { id: 'review_system', label: 'Review system', icon: '⭐' },
    { id: 'emergency_contacts', label: 'Emergency contacts', icon: '🆘' },
  ];

  const comfortLevelOptions = [
    { value: 1, label: 'Very uncomfortable' },
    { value: 2, label: 'Somewhat uncomfortable' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Somewhat comfortable' },
    { value: 5, label: 'Very comfortable' },
  ];

  const toggleSafetyPriority = (safetyId: string) => {
    const currentPriorities = [...(formData.safetyPriorities || [])];
    const index = currentPriorities.indexOf(safetyId);

    if (index === -1) {
      // Add safety priority
      currentPriorities.push(safetyId);
    } else {
      // Remove safety priority
      currentPriorities.splice(index, 1);
    }

    updateFormData({ safetyPriorities: currentPriorities });
    setError('');
  };

  const handleComfortLevelChange = (level: number) => {
    updateFormData({ safetyComfortLevel: level });
  };

  const handleContinue = () => {
    if (!formData.safetyPriorities || formData.safetyPriorities.length === 0) {
      setError('Please select at least one safety measure');
      return;
    }

    if (!formData.safetyComfortLevel) {
      setError('Please indicate your comfort level');
      return;
    }

    onNext();
  };

  const isSelected = (safetyId: string) => {
    return formData.safetyPriorities && formData.safetyPriorities.includes(safetyId);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          What safety measures are most important to you?
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          We prioritize your safety and want to know which features would make you feel most secure.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="font-medium text-white">Select all that apply:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safetyOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => toggleSafetyPriority(option.id)}
              className={`p-6 rounded-lg border cursor-pointer transition-all ${
                isSelected(option.id)
                  ? 'border-[#FDCA64] bg-neutral-800'
                  : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
              }`}
            >
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-xl">
                  {option.icon}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-white font-medium">{option.label}</span>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      isSelected(option.id)
                        ? 'border-[#FDCA64] bg-[#FDCA64]'
                        : 'border-neutral-500'
                    }`}
                  >
                    {isSelected(option.id) && (
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-medium text-white">
          How comfortable would you feel using a platonic companionship service with proper safety measures?
        </h3>
        <div className="space-y-4">
          {comfortLevelOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleComfortLevelChange(option.value)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                formData.safetyComfortLevel === option.value
                  ? 'border-[#FDCA64] bg-neutral-800'
                  : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
              }`}
            >
              <div className="flex gap-4 items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex-shrink-0 ${
                    formData.safetyComfortLevel === option.value
                      ? 'border-[#FDCA64] bg-[#FDCA64]'
                      : 'border-neutral-500'
                  }`}
                >
                  {formData.safetyComfortLevel === option.value && (
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
