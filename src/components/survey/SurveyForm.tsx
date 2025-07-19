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
  // Define a proper type for the form data
  type SurveyFormData = {
    responseId: string;
    userType: string;
    eventAttendanceFrequency?: string;
    eventTypes: string[];
    otherEventType?: string; // Added for capturing 'Other' event type specification
    hourlyRateComfort: {
      client: number;
      provider: number;
    };
    providerIncomeInterest?: string;
    expectedEarnings?: string;
    safetyPriorities: string[];
    safetyComfortLevel: number;
    betaInterest: boolean;
    email: string;
    phone: string;
    additionalFeedback: string;
    source: string;
    currentStep: number;
    [key: string]: any; // Index signature to allow string indexing
  };

  const [formData, setFormData] = useState<SurveyFormData>({
    responseId: '', // Will be set on first step submission
    userType: '',
    eventAttendanceFrequency: undefined,
    eventTypes: [],
    otherEventType: undefined, // Added for capturing 'Other' event type specification
    hourlyRateComfort: {
      client: 0,
      provider: 0,
    },
    providerIncomeInterest: undefined,
    expectedEarnings: undefined,
    safetyPriorities: [],
    safetyComfortLevel: 0,
    betaInterest: false,
    email: '',
    phone: '',
    additionalFeedback: '',
    source: 'direct',
    currentStep: 1,
  });

  const updateFormData = (data: Partial<SurveyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    try {
      // If this is the first step, create a new survey response
      if (currentStep === 1) {
        // Create a temporary ID for the first submission if needed
        const tempId = formData.responseId || `temp-${Date.now()}`;
        
        const firstStepData = {
          ...formData, 
          responseId: tempId,
          currentStep: currentStep + 1
        };
        
        const response = await fetch('/api/survey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(firstStepData),
        });

        const data = await response.json();
        if (data.success && data.data.responseId) {
          // Update form data with the server-generated responseId
          setFormData((prev) => ({
            ...prev, 
            responseId: data.data.responseId,
            currentStep: currentStep + 1
          }));
          
          // Move to the next step after successful save
          setCurrentStep((prev) => prev + 1);
          return;
        } else {
          console.error('Failed to get responseId from server');
          return; // Don't proceed if we couldn't get a responseId
        }
      } 
      
      // For steps after the first one
      // First update the step number in the form data
      const updatedFormData = { ...formData, currentStep: currentStep + 1 };
      
      // Save progress
      await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
      
      // Update local state
      setFormData(updatedFormData);
      
      // Move to the next step
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error('Error saving survey progress:', error);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Ensure we have a responseId
    if (!formData.responseId) {
      console.error('Cannot submit survey without responseId');
      setIsSubmitting(false);
      return;
    }
    
    // Clean up any null values to prevent validation errors
    const cleanedFormData = { ...formData };
    Object.keys(cleanedFormData).forEach(key => {
      if (cleanedFormData[key] === null) {
        delete cleanedFormData[key];
      }
    });
    
    // Ensure provider fields are not sent if user is not a provider
    if (formData.userType === 'client') {
      // Instead of deleting, set to undefined which TypeScript allows
      cleanedFormData.providerIncomeInterest = undefined as any;
    }
    
    // Mark survey as complete
    const finalFormData = { 
      ...cleanedFormData, 
      isComplete: true, 
      currentStep: TOTAL_STEPS,
      completedAt: new Date().toISOString()
    };
    
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Error submitting survey');
      }
      
      // Show thank you step
      setCurrentStep(TOTAL_STEPS + 1);
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('There was an error submitting your survey. Please try again.');
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
