'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

const clientTiers = [
  {
    name: 'Standard Engagements',
    rate: '₦2,500 - ₦4,000 / hour',
    description: 'Ideal for social events and professional networking gatherings.',
  },
  {
    name: 'Premium Engagements',
    rate: '₦5,000 - ₦8,000 / hour',
    description: 'Suited for corporate events, business functions, and client entertainment.',
  },
  {
    name: 'Executive Engagements',
    rate: '₦10,000+ / hour',
    description: 'For high-profile events, VIP functions, and specialized requirements.',
  },
];

const providerBenefits = [
  'Retain 70-80% of all client fees',
  'Performance bonuses for exceptional service ratings',
  'Flexible engagement terms to optimize earning potential',
  'Access to a network of high-quality clients',
];

const PricingPreview = () => {
  return (
    <section className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white py-24 sm:py-32">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Transparent Pricing</h2>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Fair, competitive rates for clients and rewarding compensation for our service providers.
          </p>
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-x-16 gap-y-20">
          {/* Client Pricing */}
          <div className="bg-neutral-50 dark:bg-black p-10 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-2xl font-bold text-amber-400 mb-8 text-center">Client Service Rates</h3>
            <div className="space-y-6">
              {clientTiers.map((tier, index) => (
                <div key={index} className="p-6 bg-white dark:bg-neutral-800 rounded-lg">
                  <p className="font-bold text-lg">{tier.name}</p>
                  <p className="text-amber-400 font-semibold text-2xl my-2">{tier.rate}</p>
                  <p className="text-neutral-500 dark:text-neutral-400">{tier.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Provider Compensation */}
          <div className="bg-neutral-50 dark:bg-black p-10 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-2xl font-bold text-amber-400 mb-8 text-center">Service Provider Compensation</h3>
            <div className="space-y-5">
              {providerBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
             <div className="mt-10 text-center">
                <button className="w-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-white font-bold py-3 px-8 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500 focus:ring-opacity-75 transition-colors duration-300">
                  Learn More & Apply
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;