'use client';

import React from 'react';
import { TrendingUp, CalendarDays, Briefcase } from 'lucide-react';

const opportunities = [
  {
    icon: <TrendingUp className="w-8 h-8 text-amber-400" />,
    title: 'Earn Money',
    description: 'Earn ₦20,000-₦30,000+ per engagement, with performance bonuses.',
  },
  {
    icon: <CalendarDays className="w-8 h-8 text-amber-400" />,
    title: 'Flexibility & Control',
    description: 'Choose your clients, set your own schedule, and define the professional services you offer.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-amber-400" />,
    title: 'Professional Growth',
    description: 'Build a professional reputation, expand your service offerings, and access networking opportunities.',
  },
];

const EarningOpportunity = () => {
  return (
    <section className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white py-24 sm:py-32">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Monetize Your Professional Presence</h2>
          <p className="mt-4 max-w-3xl mx-auto text-neutral-600 dark:text-neutral-300">
            Leverage your social expertise and professional demeanor to create a new income stream. We provide the platform, you provide the service.
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-10">
          {opportunities.map((item, index) => (
            <div key={index} className="text-center p-8">
              <div className="flex justify-center mb-6">
                <div className="bg-neutral-100 dark:bg-black p-4 rounded-full">{item.icon}</div>
              </div>
              <h3 className="font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
           <button className="bg-amber-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105">
            Start Your Application
          </button>
        </div>
      </div>
    </section>
  );
};

export default EarningOpportunity;