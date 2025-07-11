'use client';

import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Chip, Spacer } from '@heroui/react';

const categories = [
  {
    name: 'Family Gatherings',
    description: 'Never attend another awkward family dinner alone. Find someone to accompany you to family events and avoid those uncomfortable questions.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    name: 'Professional Events',
    description: 'Networking events, conferences, or business dinners - having a companion can make these events more comfortable and productive.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    name: 'Social Activities',
    description: 'From weddings to parties, concerts to dinner dates - enjoy social events with a compatible companion who shares your interests.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
];

export default function ServiceCategories() {
  return (
    <div id="how-it-works" className="py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <Chip 
            color="primary" 
            variant="flat" 
            className="mb-6"
            size="lg"
          >
            How It Works
          </Chip>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Service Categories
          </h2>
          <Spacer y={6} />
          <p className="text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            WhiteLie offers platonic companionship services for various social situations. 
            Whether you need someone for a family gathering, professional event, or social activity, 
            we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {categories.map((category) => (
            <Card 
              key={category.name} 
              className="border-primary/10 shadow-md hover:shadow-lg hover:shadow-primary/10 transition-shadow duration-300"
              radius="lg"
            >
              <CardHeader className="flex gap-4 items-start p-8">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-black text-primary">
                  {React.cloneElement(category.icon, { className: 'w-6 h-6' })}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {category.name}
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="px-8 pb-8 pt-0">
                <p className="text-gray-600 dark:text-gray-300">
                  {category.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
