'use client';

import React from 'react';
import { ShieldCheck, Building, FileText, Star, MessageSquare } from 'lucide-react';

const safetyMeasures = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-amber-400" />,
    title: 'Professional Verification',
    description: 'All service providers undergo government ID verification, business reference checks, and background screening.',
  },
  {
    icon: <Building className="w-8 h-8 text-amber-400" />,
    title: 'Business Meeting Protocol',
    description: 'Initial consultations and meetings are required to be conducted in professional, public environments.',
  },
  {
    icon: <FileText className="w-8 h-8 text-amber-400" />,
    title: 'Clear Service Boundaries',
    description: 'We enforce clearly defined professional companionship services with documented expectations for all parties.',
  },
  {
    icon: <Star className="w-8 h-8 text-amber-400" />,
    title: 'Professional Review System',
    description: 'A robust rating system for service quality and client satisfaction helps maintain high standards.',
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-amber-400" />,
    title: 'Dedicated Business Support',
    description: 'Access to dedicated account management and dispute resolution services to ensure a smooth experience.',
  },
];

const SafetyMeasures = () => {
  return (
    <section className="bg-white dark:bg-black text-neutral-800 dark:text-white py-24 sm:py-32">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Your Safety is Our Priority</h2>
          <p className="mt-4 max-w-3xl mx-auto text-neutral-600 dark:text-neutral-300">
            We are committed to creating a secure and professional environment for both clients and service providers through rigorous standards.
          </p>
        </div>

        <div className="mt-20 max-w-4xl mx-auto space-y-10">
            {safetyMeasures.map((measure, index) => (
              <div key={index} className="flex items-start gap-6 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <div className="flex-shrink-0">{measure.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{measure.title}</h3>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">{measure.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyMeasures;