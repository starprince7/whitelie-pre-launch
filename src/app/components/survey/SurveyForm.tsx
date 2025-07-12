'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserTypeStep from './steps/UserTypeStep';
import MarketValidationStep from './steps/MarketValidationStep';
import EventTypesStep from './steps/EventTypesStep';
import PricingStep from './steps/PricingStep';
import SafetyStep from './steps/SafetyStep';
import BetaWaitlistStep from './steps/BetaWaitlistStep';
import ThankYouStep from './steps/ThankYouStep';
import ProgressIndicator from './ProgressIndicator';

const TOTAL_STEPS = 6;

export default function SurveyForm() {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    responseId: '',
    userType: '',
    eventAttendanceFrequency: '',
    eventTypes: [],
    hourlyRateComfort: {
      client: 0,
      provider: 0,
    },
    providerIncomeInterest: '',
    expectedEarnings: '',
    safetyPriorities: [],
    safetyComfortLevel: 0,
    betaInterest: false,
    email: '',
    phone: '',
    additionalFeedback: '',
    source: 'direct',
    currentStep: 1,
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    // Save progress after each step
    const updatedFormData = { ...formData, currentStep: currentStep + 1 };
    setFormData(updatedFormData);

    try {
      // If this is the first step, create a new survey response
      if (currentStep === 1) {
        const response = await fetch('/api/survey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        });

        const data = await response.json();
        if (data.success && data.data.responseId) {
          setFormData((prev) => ({ 
            ...prev, 
            responseId: data.data.responseId,
            currentStep: currentStep + 1
          }));
        }
      } else {
        // Update existing survey response
        await fetch('/api/survey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        });
      }
    } catch (error) {
      console.error('Error saving survey progress:', error);
    }

    // Move to the next step
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Mark survey as complete
    const finalFormData = { 
      ...formData, 
      isComplete: true, 
      currentStep: TOTAL_STEPS,
      completedAt: new Date().toISOString()
    };
    
    try {
      await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      });
      
      // Show thank you step
      setCurrentStep(TOTAL_STEPS + 1);
    } catch (error) {
      console.error('Error submitting survey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserTypeStep 
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <MarketValidationStep 
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <EventTypesStep 
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <PricingStep 
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <SafetyStep 
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <BetaWaitlistStep 
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        );
      case 7:
        return <ThankYouStep email={formData.email} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 shadow-xl">
      {currentStep <= TOTAL_STEPS && (
        <div className="mb-10">
          <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>
      )}
      
      <div>
        {renderStep()}
      </div>
    </div>
  );
}
