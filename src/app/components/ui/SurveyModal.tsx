'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Slider,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Chip,
  Progress,
  Spacer,
  Select,
  SelectItem
} from '@heroui/react';
import { FormInput, FormTextArea } from '@/app/components/ui/FormInput';

// Define the survey schema
const surveySchema = z.object({
  interestType: z.enum(['seeking', 'providing', 'both'], {
    message: "Please select your interest type",
  }),
  eventCategories: z.array(
    z.enum(['family', 'professional', 'social', 'other'])
  ).min(1, { message: "Please select at least one event category" }),
  pricingSensitivity: z.object({
    casualEvents: z.number().min(30).max(45),
    semiFormalEvents: z.number().min(45).max(65),
    formalEvents: z.number().min(65).max(85),
  }),
  availabilityPerWeek: z.number().min(1, { message: "Please indicate your availability" }),
  experience: z.enum(['none', 'some', 'experienced'], {
    message: "Please select your experience level",
  }),
  safetyConcerns: z.array(z.string()).optional(),
  additionalComments: z.string().optional(),
});

type SurveyData = z.infer<typeof surveySchema>;

interface SurveyModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function SurveyModal({ userId, isOpen, onClose }: SurveyModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Define initial form data defaults
  const defaultFormData: SurveyData = {
    interestType: "seeking" as const,
    eventCategories: [],
    pricingSensitivity: {
      casualEvents: 35,
      semiFormalEvents: 55,
      formalEvents: 75,
    },
    availabilityPerWeek: 10,
    experience: "none" as const,
    safetyConcerns: [],
    additionalComments: "",
  };
  
  // Define form state with localStorage persistence
  const [formData, setFormData] = useState<SurveyData>(() => {
    // Check for saved form data in localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('whitelie-survey-data');
      if (savedData) {
        try {
          return JSON.parse(savedData) as SurveyData;
        } catch (e) {
          console.error('Error parsing saved survey data:', e);
        }
      }
    }
    
    // Return default form data if no saved data found or error parsing
    return defaultFormData;
  });

  const { 
    control, 
    handleSubmit, 
    watch, 
    reset, 
    trigger, 
    setValue,
    formState: { errors, isValid } 
  } = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
    defaultValues: formData,
    mode: 'onChange'
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      localStorage.setItem('whitelie-survey-data', JSON.stringify(formData));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, isOpen]);

  // Update form data when react-hook-form values change
  const updateFormData = (name: keyof SurveyData, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
    // Also update the react-hook-form state
    setValue(name, value as any);
  };

  // Clear saved form data
  const clearSavedFormData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('whitelie-survey-data');
    }
  };

  // Save partial form data before user leaves or refreshes the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isOpen && typeof window !== 'undefined') {
        localStorage.setItem('whitelie-survey-data', JSON.stringify(formData));
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, isOpen]);

  // Handle form submission
  const onSubmit = async (data: SurveyData) => {
    setIsSubmitting(true);
    try {
      // Calculate sentiment score from additional comments (simple implementation)
      let sentimentScore = 0;
      if (data.additionalComments) {
        const text = data.additionalComments.toLowerCase();
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'like', 'excited', 'happy', 'interested'];
        const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'hate', 'dislike', 'worried', 'concerned', 'unsafe'];
        
        positiveWords.forEach(word => {
          if (text.includes(word)) sentimentScore += 0.2;
        });
        negativeWords.forEach(word => {
          if (text.includes(word)) sentimentScore -= 0.2;
        });
        
        // Clamp to range [-1, 1]
        sentimentScore = Math.max(-1, Math.min(1, sentimentScore));
      }
      
      const response = await fetch('/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          responses: data,
          sentimentScore
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form state
        setFormData(defaultFormData);
        reset(defaultFormData);
        
        // Clear saved data
        clearSavedFormData();
        
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
        }, 2000);
      } else {
        console.error('Failed to submit survey');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Watch form values for conditional rendering
  const interestType = watch('interestType');

  // Handle form field changes and save to localStorage
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && isOpen) {
        const updatedData = { ...formData, [name]: value[name as keyof typeof value] };
        setFormData(updatedData);
        localStorage.setItem('whitelie-survey-data', JSON.stringify(updatedData));
      }
    });
    
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  
  // Validate the current step before proceeding
  const validateCurrentStep = async () => {
    let isValid = false;
    
    if (currentStep === 1) {
      // Validate interest type and event categories
      const result = await trigger(['interestType', 'eventCategories']);
      isValid = result;
    } else if (currentStep === 2) {
      // Validate pricing sensitivity
      const result = await trigger(['pricingSensitivity.casualEvents', 'pricingSensitivity.semiFormalEvents', 'pricingSensitivity.formalEvents']);
      isValid = result;
    } else if (currentStep === 3) {
      // Validate availability and experience
      const result = await trigger(['availabilityPerWeek', 'experience']);
      isValid = result;
    } else if (currentStep === 4 || currentStep === 5) {
      // No required validation for safety concerns and comments
      isValid = true;
    }
    
    return isValid;
  };

  const totalSteps = 5;

  const nextStep = async () => {
    // Validate the current step before proceeding
    const isValid = await validateCurrentStep();
    
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      placement="center"
      classNames={{
        backdrop: "bg-black/50 backdrop-blur-sm",
        base: "bg-white dark:bg-gray-900 border-primary/10",
        header: "border-b border-primary/10",
        footer: "border-t border-primary/10",
        closeButton: "hover:bg-primary/10 text-black dark:text-white"
      }}
      scrollBehavior="inside"
    >
      <ModalContent>
        {isSubmitted ? (
          <>
            <ModalBody className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-primary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">Thank you!</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your survey has been successfully submitted.
              </p>
            </ModalBody>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1 border-b border-primary/10 pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-black dark:text-white">Tell us about your preferences</h2>
                <Chip color="primary" variant="flat" size="sm" className="font-medium">
                  Step {currentStep} of {totalSteps}
                </Chip>
              </div>
              <Progress 
                value={(currentStep / totalSteps) * 100} 
                color="primary" 
                size="sm" 
                aria-label="Survey progress"
                className="mb-2"
              />
            </ModalHeader>
            <ModalBody>
              {/* Step 1: Interest Type */}
              {currentStep === 1 && (
                <div className="py-6">
                  <h3 className="text-lg font-semibold mb-5 text-black dark:text-white">I am interested in:</h3>
                  
                  <Controller
                    name="interestType"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <RadioGroup
                          {...field}
                          color="primary"
                          orientation="vertical"
                          isInvalid={!!errors.interestType}
                          errorMessage={errors.interestType?.message}
                          className="gap-4"
                          classNames={{
                            wrapper: "px-2",
                            label: "text-black dark:text-white pl-2"
                          }}
                        >
                          <Radio value="seeking">
                            Finding a companion
                          </Radio>
                          <Radio value="providing">
                            Becoming a companion
                          </Radio>
                          <Radio value="both">
                            Both
                          </Radio>
                        </RadioGroup>
                      </div>
                    )}
                  />
                  
                  <Spacer y={6} />
                  
                  <h3 className="text-lg font-semibold mb-5 text-black dark:text-white">Event categories I'm interested in:</h3>
                  
                  <Controller
                    name="eventCategories"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <CheckboxGroup
                          {...field}
                          orientation="vertical"
                          color="primary"
                          isInvalid={!!errors.eventCategories}
                          errorMessage={errors.eventCategories?.message?.toString()}
                          className="gap-4"
                          classNames={{
                            wrapper: "px-2",
                            label: "text-black dark:text-white pl-2"
                          }}
                        >
                          <Checkbox value="family">
                            Family gatherings
                          </Checkbox>
                          <Checkbox value="professional">
                            Professional events
                          </Checkbox>
                          <Checkbox value="social">
                            Social activities
                          </Checkbox>
                          <Checkbox value="other">
                            Other
                          </Checkbox>
                        </CheckboxGroup>
                      </div>
                    )}
                  />
                </div>
              )}
              
              {/* Step 2: Pricing Sensitivity */}
              {currentStep === 2 && (
                <div className="py-6">
                  <h3 className="text-lg font-semibold mb-6 text-black dark:text-white">
                    {interestType === 'seeking' ? 'I am willing to pay:' : 'I expect to be paid:'}
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-md font-medium text-black dark:text-white">Casual Events</span>
                        <Chip color="primary" variant="flat" size="sm" className="bg-primary/20 text-black dark:text-white">
                          ${watch('pricingSensitivity.casualEvents')} per hour
                        </Chip>
                      </div>
                      <Controller
                        name="pricingSensitivity.casualEvents"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Slider
                            size="lg"
                            step={5}
                            color="primary"
                            minValue={30}
                            maxValue={45}
                            value={value}
                            onChange={(val) => onChange(val as number)}
                            classNames={{
                              base: "max-w-full mt-2 px-2",
                              track: "bg-primary/30",
                              filler: "bg-primary",
                              thumb: "bg-black dark:bg-white",
                              label: "text-sm text-gray-600 dark:text-gray-300 mt-1"
                            }}
                            aria-label="Pricing for casual events"
                            showTooltip={true}
                            tooltipProps={{
                              offset: 10,
                              placement: "bottom",
                              classNames: {
                                base: "py-2 px-4 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md border border-primary/20"
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-md font-medium text-black dark:text-white">Semi-Formal Events</span>
                        <Chip color="primary" variant="flat" size="sm" className="bg-primary/20 text-black dark:text-white">
                          ${watch('pricingSensitivity.semiFormalEvents')} per hour
                        </Chip>
                      </div>
                      <Controller
                        name="pricingSensitivity.semiFormalEvents"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Slider
                            size="lg"
                            step={5}
                            color="primary"
                            minValue={45}
                            maxValue={65}
                            value={value}
                            onChange={(val) => onChange(val as number)}
                            classNames={{
                              base: "max-w-full mt-2 px-2",
                              track: "bg-primary/30",
                              filler: "bg-primary",
                              thumb: "bg-black dark:bg-white",
                              label: "text-sm text-gray-600 dark:text-gray-300 mt-1"
                            }}
                            aria-label="Pricing for semi-formal events"
                            showTooltip={true}
                            tooltipProps={{
                              offset: 10,
                              placement: "bottom",
                              classNames: {
                                base: "py-2 px-4 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md border border-primary/20"
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-md font-medium text-black dark:text-white">Formal Events</span>
                        <Chip color="primary" variant="flat" size="sm" className="bg-primary/20 text-black dark:text-white">
                          ${watch('pricingSensitivity.formalEvents')} per hour
                        </Chip>
                      </div>
                      <Controller
                        name="pricingSensitivity.formalEvents"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Slider
                            size="lg"
                            step={5}
                            color="primary"
                            minValue={65}
                            maxValue={85}
                            value={value}
                            onChange={(val) => onChange(val as number)}
                            classNames={{
                              base: "max-w-full mt-2 px-2",
                              track: "bg-primary/30",
                              filler: "bg-primary",
                              thumb: "bg-black dark:bg-white",
                              label: "text-sm text-gray-600 dark:text-gray-300 mt-1"
                            }}
                            aria-label="Pricing for formal events"
                            showTooltip={true}
                            tooltipProps={{
                              offset: 10,
                              placement: "bottom",
                              classNames: {
                                base: "py-2 px-4 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md border border-primary/20"
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Availability & Experience */}
              {currentStep === 3 && (
                <div className="py-6">
                  <h3 className="text-lg font-semibold mb-5 text-black dark:text-white">Availability per week</h3>
                  
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-md font-medium text-black dark:text-white">Hours available</span>
                      <Chip color="primary" variant="flat" size="sm" className="bg-primary/20 text-black dark:text-white">
                        {watch('availabilityPerWeek')} hours
                      </Chip>
                    </div>
                    <Controller
                      name="availabilityPerWeek"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Slider
                          size="lg"
                          step={1}
                          color="primary"
                          minValue={1}
                          maxValue={40}
                          value={value}
                          onChange={(val) => onChange(val as number)}
                          classNames={{
                            base: "max-w-full mt-2 px-2",
                            track: "bg-primary/30",
                            filler: "bg-primary",
                            thumb: "bg-black dark:bg-white",
                            label: "text-sm text-gray-600 dark:text-gray-300 mt-1"
                          }}
                          aria-label="Availability per week"
                          showTooltip={true}
                          tooltipProps={{
                            offset: 10,
                            placement: "bottom",
                            classNames: {
                              base: "py-2 px-4 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md border border-primary/20"
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-5 text-black dark:text-white">Experience level</h3>
                  
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <RadioGroup
                          {...field}
                          color="primary"
                          orientation="vertical"
                          isInvalid={!!errors.experience}
                          errorMessage={errors.experience?.message}
                          className="gap-4"
                          classNames={{
                            wrapper: "px-2",
                            label: "text-black dark:text-white pl-2"
                          }}
                        >
                          <Radio value="none">
                            None - I'm new to this
                          </Radio>
                          <Radio value="some">
                            Some - I've attended events as a companion before
                          </Radio>
                          <Radio value="experienced">
                            Experienced - I'm comfortable with various social settings
                          </Radio>
                        </RadioGroup>
                      </div>
                    )}
                  />
                </div>
              )}
              
              {/* Step 4: Safety & Additional Comments */}
              {currentStep === 4 && (
                <div className="py-6">
                  <h3 className="text-lg font-semibold mb-5 text-black dark:text-white">Safety concerns</h3>
                  
                  <Controller
                    name="safetyConcerns"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-4 mb-6">
                        <CheckboxGroup
                          {...field}
                          orientation="vertical"
                          color="primary"
                          className="gap-4 mb-6"
                          classNames={{
                            wrapper: "px-2",
                            label: "text-black dark:text-white pl-2"
                          }}
                        >
                          <Checkbox value="background-checks">
                            I want all companions to undergo background checks
                          </Checkbox>
                          <Checkbox value="verification">
                            I want identity verification for all users
                          </Checkbox>
                          <Checkbox value="public-meetings">
                            I prefer initial meetings in public places
                          </Checkbox>
                          <Checkbox value="references">
                            I would like to see references from previous clients/companions
                          </Checkbox>
                        </CheckboxGroup>
                      </div>
                    )}
                  />
                </div>
              )}
              
              {/* Step 5: Additional Comments */}
              {currentStep === 5 && (
                <div className="py-6">
                  <h3 className="text-lg font-semibold mb-5 text-black dark:text-white">Additional comments or questions</h3>
                  
                  <Controller
                    name="additionalComments"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormTextArea
                        {...field}
                        placeholder="Any other comments or questions you'd like to share..."
                        className="w-full min-h-[160px]"
                        isInvalid={!!errors.additionalComments}
                        error={errors.additionalComments?.message}
                      />
                    )}
                  />
                </div>
              )}
            </ModalBody>
            
            <ModalFooter className="flex justify-between border-t border-primary/10 pt-4">
              <Button
                variant="bordered"
                onClick={prevStep}
                isDisabled={currentStep === 1 || isSubmitting}
                className="px-6 py-2"
              >
                Previous
              </Button>
              {currentStep < totalSteps ? (
                <Button
                  className="bg-black text-white hover:bg-neutral-800 px-6 py-2"
                  onClick={nextStep}
                  isDisabled={isSubmitting}
                >
                  Next
                </Button>
              ) : (
                <Button
                  className="bg-black text-white hover:bg-neutral-800 px-6 py-2"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              )}
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
