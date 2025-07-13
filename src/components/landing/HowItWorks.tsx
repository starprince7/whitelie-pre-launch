'use client';

import React from 'react';
import { Briefcase, UserCheck, Calendar, DollarSign, Award, Users } from 'lucide-react';

const HowItWorks = () => {
  const clientSteps = [
    {
      icon: <UserCheck className="w-8 h-8 text-amber-400" />,
      title: 'Review & Select',
      description: 'Browse verified professional profiles and service offerings to find the perfect match for your needs.',
    },
    {
      icon: <Calendar className="w-8 h-8 text-amber-400" />,
      title: 'Book & Coordinate',
      description: 'Schedule your professional companion for your event with our easy-to-use booking system.',
    },
    {
      icon: <Users className="w-8 h-8 text-amber-400" />,
      title: 'Attend & Network',
      description: 'Focus on your event while your professional companion handles social interactions and networking.',
    },
  ];

  const providerSteps = [
    {
      icon: <Award className="w-8 h-8 text-amber-400" />,
      title: 'Apply & Certify',
      description: 'Complete our professional verification process and create your detailed service profile to showcase your skills.',
    },
    {
      icon: <Briefcase className="w-8 h-8 text-amber-400" />,
      title: 'Receive Bookings',
      description: 'Accept client requests that match your availability, expertise, and professional interests.',
    },
    {
      icon: <DollarSign className="w-8 h-8 text-amber-400" />,
      title: 'Deliver & Earn',
      description: 'Provide professional companionship services, build your client base, and earn competitive rates.',
    },
  ];

  return (
    <section className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white py-24 sm:py-32">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            A streamlined process for both clients and service providers.
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-x-16 gap-y-20">
          {/* For Clients */}
          <div className="space-y-12">
            <h3 className="text-2xl font-bold text-center text-amber-400">For Clients</h3>
            <div className="space-y-10">
              {clientSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0 bg-neutral-100 dark:bg-black p-4 rounded-full">{step.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{step.title}</h4>
                    <p className="mt-2 text-neutral-500 dark:text-neutral-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Service Providers */}
          <div className="space-y-12">
            <h3 className="text-2xl font-bold text-center text-amber-400">For Service Providers</h3>
            <div className="space-y-10">
              {providerSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0 bg-neutral-100 dark:bg-black p-4 rounded-full">{step.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{step.title}</h4>
                    <p className="mt-2 text-neutral-500 dark:text-neutral-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;