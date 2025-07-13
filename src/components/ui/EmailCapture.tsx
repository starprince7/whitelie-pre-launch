'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Button,
  Spacer,
  Divider,
  Link,
  Checkbox,
} from '@heroui/react';

// Define the form validation schema with Zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  source: z.string().optional(),
  location: z.object({
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().min(1, { message: "Please select your country" }),
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

type FormData = z.infer<typeof formSchema>;

interface EmailCaptureProps {
  onUserCreated?: (userId: string) => void;
}

export default function EmailCapture({ onUserCreated }: EmailCaptureProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      source: 'landing_page',
      location: {
        city: '',
        state: '',
        country: ''
      },
      acceptTerms: false,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        // Get the user ID from the response
        const data = await response.json();
        setIsSubmitted(true);
        reset();
        
        // Call the onUserCreated callback if it exists
        if (onUserCreated && data.userId) {
          onUserCreated(data.userId);
        }
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const countries = [
    { label: "United States", value: "US" },
    { label: "Canada", value: "CA" },
    { label: "United Kingdom", value: "GB" },
    { label: "Australia", value: "AU" },
    { label: "Germany", value: "DE" },
    { label: "France", value: "FR" },
    { label: "Japan", value: "JP" },
    { label: "Other", value: "Other" },
  ];

  return (
    <section id="email-capture" className="py-32 relative overflow-hidden">
      {/* Background with primary color */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-amber/5 dark:from-black dark:to-amber/10 -z-10" />
      
      <div className="container mx-auto max-w-6xl px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Join our waitlist
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Be among the first to experience WhiteLie when we launch.
            Sign up for early access and exclusive updates.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto">
          {isSubmitted ? (
            <Card className="bg-white dark:bg-black/40 shadow-xl border-none">
              <CardBody className="p-10 flex flex-col items-center text-center">
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
                
                <h3 className="text-2xl font-semibold text-black dark:text-white">
                  Thank you for joining our waitlist!
                </h3>
                
                <Spacer y={4} />
                
                <p className="text-gray-600 dark:text-gray-300">
                  We'll notify you when WhiteLie launches and keep you updated on our progress.
                </p>
                
                <Spacer y={6} />
                
                <Button 
                  onClick={() => setIsSubmitted(false)} 
                  variant="bordered"
                  color="primary"
                  className="border-primary/30 text-black dark:text-white"
                >
                  Join with another email
                </Button>
              </CardBody>
            </Card>
          ) : (
            <Card className="bg-white dark:bg-black/40 border-none shadow-xl overflow-hidden">
              <CardBody className="p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          label="Email address"
                          variant="bordered"
                          size="lg"
                          placeholder="you@example.com"
                          isInvalid={!!errors.email}
                          errorMessage={errors.email?.message}
                          classNames={{
                            inputWrapper: "bg-transparent",
                            input: "text-black dark:text-white",
                            label: "text-black dark:text-white",
                            innerWrapper: "bg-transparent",
                            errorMessage: "text-red-500",
                            base: "ring-primary/20 focus-within:ring-primary"
                          }}
                        />
                      )}
                    />
                  </div>
                  
                  <div>
                    <Controller
                      name="location.country"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          items={countries}
                          placeholder="Select a country"
                          label="Country"
                          variant="bordered"
                          size="lg"
                          isInvalid={!!errors.location?.country}
                          errorMessage={errors.location?.country?.message}
                          classNames={{
                            trigger: "bg-transparent text-black dark:text-white",
                            label: "text-black dark:text-white",
                            errorMessage: "text-red-500",
                            base: "ring-primary/20 focus-within:ring-primary"
                          }}
                          renderValue={(items) => {
                            return items.map(item => (
                              <div key={item.key}>{item.data?.label}</div>
                            ));
                          }}
                        >
                          {(country) => (
                            <SelectItem key={country.value}>
                              {country.label}
                            </SelectItem>
                          )}
                        </Select>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Controller
                      name="location.city"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          label="City"
                          variant="bordered"
                          size="lg"
                          classNames={{
                            inputWrapper: "bg-transparent",
                            input: "text-black dark:text-white",
                            label: "text-black dark:text-white",
                            innerWrapper: "bg-transparent",
                            base: "ring-primary/20 focus-within:ring-primary"
                          }}
                        />
                      )}
                    />
                    
                    <Controller
                      name="location.state"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          label="State / Province"
                          variant="bordered"
                          size="lg"
                          classNames={{
                            inputWrapper: "bg-transparent",
                            input: "text-black dark:text-white",
                            label: "text-black dark:text-white",
                            innerWrapper: "bg-transparent",
                            base: "ring-primary/20 focus-within:ring-primary"
                          }}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      name="acceptTerms"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox
                          isSelected={value}
                          onValueChange={onChange}
                          color="primary"
                          classNames={{
                            label: "text-sm text-gray-600 dark:text-gray-300"
                          }}
                          isInvalid={!!errors.acceptTerms}
                        >
                          By signing up, you agree to our{' '}
                          <Link href="#" className="text-primary hover:underline">
                            privacy policy
                          </Link>
                          {' '}and{' '}
                          <Link href="#" className="text-primary hover:underline">
                            terms of service
                          </Link>
                          .
                        </Checkbox>
                      )}
                    />
                    {errors.acceptTerms && (
                      <p className="mt-1 text-xs text-red-500">{errors.acceptTerms.message}</p>
                    )}
                  </div>

                  <div>
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors py-6 font-medium"
                      size="lg"
                    >
                      {isLoading ? 'Joining...' : 'Join Waitlist'}
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
