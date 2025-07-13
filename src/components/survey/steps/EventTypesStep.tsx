'use client';

import { useState } from 'react';

interface EventTypesStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function EventTypesStep({
  formData,
  updateFormData,
  onNext,
  onBack,
}: EventTypesStepProps) {
  const [error, setError] = useState('');

  const eventOptions = [
    { id: 'weddings', label: 'Weddings', icon: '💍' },
    { id: 'corporate_events', label: 'Corporate events', icon: '💼' },
    { id: 'social_gatherings', label: 'Social gatherings', icon: '🎉' },
    { id: 'dates', label: 'Platonic dates', icon: '🍽️' },
    { id: 'networking', label: 'Networking events', icon: '🤝' },
    { id: 'cultural_events', label: 'Cultural events', icon: '🎭' },
    { id: 'other', label: 'Other', icon: '✨' },
  ];

  const toggleEventType = (eventType: string) => {
    const currentEventTypes = [...(formData.eventTypes || [])];
    const index = currentEventTypes.indexOf(eventType);

    if (index === -1) {
      // Add event type
      currentEventTypes.push(eventType);
    } else {
      // Remove event type
      currentEventTypes.splice(index, 1);
    }

    updateFormData({ eventTypes: currentEventTypes });
    setError('');
  };

  const handleContinue = () => {
    if (!formData.eventTypes || formData.eventTypes.length === 0) {
      setError('Please select at least one event type');
      return;
    }
    onNext();
  };

  const isSelected = (eventType: string) => {
    return formData.eventTypes && formData.eventTypes.includes(eventType);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          What types of events would you need/provide companionship for?
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Select all that apply. This helps us understand where our services would be most valuable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => toggleEventType(option.id)}
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
