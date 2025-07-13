'use client';

import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Chip, Divider, Spacer } from '@heroui/react';

const pricingTiers = [
  {
    name: 'Casual Events',
    id: 'tier-casual',
    price: { range: '$30-45', per: 'hour' },
    description: 'Perfect for low-key social gatherings and informal meet-ups.',
    features: [
      'Relaxed social gatherings',
      'Coffee or lunch meetings',
      'Casual outings',
      'Local community events',
      'Brief family visits'
    ],
    cta: 'Get started',
    mostPopular: false,
  },
  {
    name: 'Semi-Formal Events',
    id: 'tier-semiformal',
    price: { range: '$45-65', per: 'hour' },
    description: 'Ideal for most social and family gatherings.',
    features: [
      'Extended family gatherings',
      'Professional networking events',
      'Birthday celebrations',
      'Cultural events',
      'House parties'
    ],
    cta: 'Get started',
    mostPopular: true,
  },
  {
    name: 'Formal Events',
    id: 'tier-formal',
    price: { range: '$65-85', per: 'hour' },
    description: 'For high-profile events requiring sophistication.',
    features: [
      'Weddings and formal ceremonies',
      'Corporate galas',
      'Professional conferences',
      'Black tie events',
      'Important family celebrations'
    ],
    cta: 'Get started',
    mostPopular: false,
  },
];

export default function PricingPreview() {
  return (
    <div className="bg-white dark:bg-gray-900 py-32">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mx-auto max-w-3xl sm:text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <Spacer y={6} />
          <p className="text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our pricing is based on the type of event and the level of formality. 
            All companions undergo thorough background checks and verification.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`border-primary/10 ${tier.mostPopular ? 'shadow-lg shadow-primary/20' : 'shadow-md'}`}
              radius="lg"
            >
              <CardHeader className="gap-2 pb-0 pt-8 px-8">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-2xl font-bold text-black dark:text-white">{tier.name}</h3>
                  {tier.mostPopular && (
                    <Chip 
                      color="primary" 
                      variant="flat" 
                      size="sm"
                      className="font-medium"
                    >
                      Most Popular
                    </Chip>
                  )}
                </div>
                
                <div className="flex items-baseline text-black dark:text-white">
                  <span className="text-4xl font-bold">{tier.price.range}</span>
                  <span className="ml-1 text-xl font-semibold text-gray-600 dark:text-gray-400">/{tier.price.per}</span>
                </div>
                <p className="text-base text-gray-600 dark:text-gray-300 mt-2 mb-4">{tier.description}</p>
              </CardHeader>
              
              <Divider className="bg-primary/10" />
              
              <CardBody className="py-6 px-8">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg 
                          className="h-3 w-3 text-primary" 
                          viewBox="0 0 20 20" 
                          fill="currentColor" 
                          aria-hidden="true"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
              
              <CardFooter className="pt-0 px-8 pb-8">
                <Button 
                  className="w-full" 
                  color={tier.mostPopular ? "primary" : "default"}
                  variant={tier.mostPopular ? "solid" : "bordered"}
                  radius="lg"
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-base text-gray-600 dark:text-gray-300">
            Pricing may vary based on location, duration, and specific requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
