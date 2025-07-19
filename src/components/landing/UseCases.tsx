'use client';

import React from 'react';
import { Building2, Award, GlassWater, Handshake } from 'lucide-react';

const useCases = [
  {
    icon: <Building2 className="w-10 h-10 text-amber-400" />,
    title: 'Corporate Events',
    examples: ['Business dinners', 'Company parties', 'Client entertainment', 'Conference networking'],
  },
  {
    icon: <Award className="w-10 h-10 text-amber-400" />,
    title: 'Professional Functions',
    examples: ['Industry events', 'Awards ceremonies', 'Business galas', 'Trade shows'],
  },
  {
    icon: <GlassWater className="w-10 h-10 text-amber-400" />,
    title: 'Social Obligations',
    examples: ['Wedding ceremonies', 'Charity events', 'Cultural functions', 'Community gatherings'],
  },
  {
    icon: <Handshake className="w-10 h-10 text-amber-400" />,
    title: 'Business Networking',
    examples: ['Professional meetups', 'Chamber of commerce events', 'Industry conferences'],
  },
];

const UseCases = () => {
  return (
    <section className="bg-white dark:bg-black text-neutral-800 dark:text-white py-24 sm:py-32">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Events You Can Hire for!</h2>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Ideal for a wide range of business, social, and networking occasions.
          </p>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-amber-400/50 transition-colors duration-300">
              <div className="mb-6">{useCase.icon}</div>
              <h3 className="font-bold text-xl mb-4">{useCase.title}</h3>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                {useCase.examples.map((example, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-amber-400">&#x2713;</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;