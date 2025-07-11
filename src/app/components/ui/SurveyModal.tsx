'use client';

import React, { useState } from 'react';
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
  Input,
  Slider,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Textarea,
  Chip,
  Progress,
  Spacer,
  Select,
  SelectItem
} from '@heroui/react';

// Define the survey schema
const surveySchema = z.object({
  interestType: z.enum(['seeking', 'providing', 'both'], {
    required_error: "Please select your interest type",
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
    required_error: "Please select your experience level",
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

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      interestType: undefined,
      eventCategories: [],
      pricingSensitivity: {
        casualEvents: 35,
        semiFormalEvents: 55,
        formalEvents: 75,
      },
      availabilityPerWeek: 10,
      experience: undefined,
      safetyConcerns: [],
      additionalComments: '',
    },
  });

  // Watch form values for conditional rendering
  const interestType = watch('interestType');

  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: SurveyData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          responses: data,
          // Simplified sentiment analysis based on additional comments
          sentimentScore: data.additionalComments && data.additionalComments.length > 0 
            ? (data.additionalComments.includes('excited') || data.additionalComments.includes('happy')) ? 1 
              : (data.additionalComments.includes('concerned') || data.additionalComments.includes('worried')) ? -1 
              : 0
            : 0
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
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
            <ModalBody className="py-10 flex flex-col items-center justify-center text-center">
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
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between mb-2">
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
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">I am interested in:</h3>
                  
                  <Controller
                    name="interestType"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        color="primary"
                        orientation="vertical"
                        isInvalid={!!errors.interestType}
                        errorMessage={errors.interestType?.message}
                        className="gap-3"
                      >
                        <Radio value="seeking" className="text-black dark:text-white">
                          Finding a companion
                        </Radio>
                        <Radio value="providing" className="text-black dark:text-white">
                          Becoming a companion
                        </Radio>
                        <Radio value="both" className="text-black dark:text-white">
                          Both
                        </Radio>
                      </RadioGroup>
                    )}
                  />
                  
                  <Spacer y={6} />
                  
                  <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Event categories I'm interested in:</h3>
                  
                  <Controller
                    name="eventCategories"
                    control={control}
                    render={({ field }) => (
                      <CheckboxGroup
                        {...field}
                        orientation="vertical"
                        color="primary"
                        isInvalid={!!errors.eventCategories}
                        errorMessage={errors.eventCategories?.message?.toString()}
                        className="gap-3"
                      >
                        <Checkbox value="family" className="text-black dark:text-white">
                          Family gatherings
                        </Checkbox>
                        <Checkbox value="professional" className="text-black dark:text-white">
                          Professional events
                        </Checkbox>
                        <Checkbox value="social" className="text-black dark:text-white">
                          Social activities
                        </Checkbox>
                        <Checkbox value="other" className="text-black dark:text-white">
                          Other
                        </Checkbox>
                      </CheckboxGroup>
                    )}
                  />
                </div>
              )}
              
              {/* Step 2: Pricing Sensitivity */}
              {currentStep === 2 && (
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-6 text-black dark:text-white">
                    {interestType === 'seeking' ? 'I am willing to pay:' : 'I expect to be paid:'}
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-md font-medium text-black dark:text-white">Casual Events</span>
                        <Chip color="primary" variant="flat" size="sm">
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
                              base: "max-w-full",
                              track: "bg-primary/30",
                              filler: "bg-primary",
                              thumb: "bg-black dark:bg-white",
                            }}
                            aria-label="Pricing for casual events"
                            renderLabel={({ children, ...props }) => (
                              <label {...props} className="text-sm text-gray-500 dark:text-gray-400">
                                {children}
                              </label>
                            )}
                          />
                        )}
                      />
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-md font-medium text-black dark:text-white">Semi-Formal Events</span>
                        <Chip color="primary" variant="flat" size="sm">
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
                              base: "max-w-full",
                              track: "bg-primary/30",
                              filler: "bg-primary",
                              thumb: "bg-black dark:bg-white",
                            }}
                            aria-label="Pricing for semi-formal events"
                          />
                        )}
                      />
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-md font-medium text-black dark:text-white">Formal Events</span>
                        <Chip color="primary" variant="flat" size="sm">
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
                              base: "max-w-full",
                              track: "bg-primary/30",
                              filler: "bg-primary",
                              thumb: "bg-black dark:bg-white",
                            }}
                            aria-label="Pricing for formal events"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Availability & Experience */}
              {currentStep === 3 && (
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Availability per week</h3>
                  
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-md font-medium text-black dark:text-white">Hours available</span>
                      <Chip color="primary" variant="flat" size="sm">
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
                            base: "max-w-full",
                            track: "bg-primary/30",
                            filler: "bg-primary",
                            thumb: "bg-black dark:bg-white",
                          }}
                          aria-label="Availability per week"
                        />
                      )}
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Experience level</h3>
                  
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        color="primary"
                        orientation="vertical"
                        isInvalid={!!errors.experience}
                        errorMessage={errors.experience?.message}
                        className="gap-3"
                      >
                        <Radio value="none" className="text-black dark:text-white">
                          None - I'm new to this
                        </Radio>
                        <Radio value="some" className="text-black dark:text-white">
                          Some - I've attended events as a companion before
                        </Radio>
                        <Radio value="experienced" className="text-black dark:text-white">
                          Experienced - I'm comfortable with various social settings
                        </Radio>
                      </RadioGroup>
                    )}
                  />
                </div>
              )}
              
              {/* Step 4: Safety & Additional Comments */}
              {currentStep === 4 && (
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Safety concerns</h3>
                  
                  <Controller
                    name="safetyConcerns"
                    control={control}
                    render={({ field }) => (
                      <CheckboxGroup
                        {...field}
                        orientation="vertical"
                        color="primary"
                        className="gap-3 mb-6"
                      >
                        <Checkbox value="background-checks" className="text-black dark:text-white">
                          I want all companions to undergo background checks
                        </Checkbox>
                        <Checkbox value="verification" className="text-black dark:text-white">
                          I want identity verification for all users
                        </Checkbox>
                        <Checkbox value="public-meetings" className="text-black dark:text-white">
                          I prefer initial meetings in public places
                        </Checkbox>
                        <Checkbox value="references" className="text-black dark:text-white">
                          I would like to see references from previous clients/companions
                        </Checkbox>
                      </CheckboxGroup>
                    )}
                  />
                </div>
              )}
              
              {/* Step 5: Additional Comments */}
              {currentStep === 5 && (
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Additional comments or questions</h3>
                  
                  <Controller
                    name="additionalComments"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Tell us about your specific needs or ask questions..."
                        size="lg"
                        rows={6}
                        variant="bordered"
                        classNames={{
                          input: "bg-transparent text-black dark:text-white",
                          inputWrapper: "bg-transparent",
                          base: "ring-primary/20 focus-within:ring-primary"
                        }}
                      />
                    )}
                  />
                </div>
              )}
            </ModalBody>
            
            <ModalFooter className="flex justify-between">
              <Button
                variant="bordered"
                onClick={prevStep}
                isDisabled={currentStep === 1}
                color="default"
                className="border-gray-300 dark:border-gray-600"
                radius="lg"
              >
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  color="primary"
                  onClick={nextStep}
                  radius="lg"
                  className="text-black font-medium"
                >
                  Next
                </Button>
              ) : (
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isSubmitting}
                  radius="lg"
                  className="text-black font-medium"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
