'use client';

import { Button, Card, Chip, Divider, Link, Spacer } from '@heroui/react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-black min-h-screen py-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 translate-y-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/4 w-[300px] h-[300px] rounded-full bg-primary/20 blur-3xl" />
      
      <div className="container mx-auto max-w-7xl px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col max-w-3xl">
            <Chip 
              className="bg-primary/10 text-black border-primary/20 dark:text-white self-start mb-4"
              variant="bordered"
            >
              Pre-Launch
            </Chip>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black dark:text-white leading-tight">
              Platonic companionship for your social needs
            </h1>
            
            <Spacer y={8} />
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
              WhiteLie connects you with companions for social events, family gatherings, and professional activities. 
              Never attend another event alone.
            </p>
            
            <Spacer y={12} />
            
            <div className="flex flex-wrap gap-6">
              <Button 
                as="a"
                href="#email-capture"
                size="lg"
                className="bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium px-8 py-6"
              >
                Join the waitlist
              </Button>
              
              <Button 
                as="a"
                href="#how-it-works"
                variant="bordered"
                size="lg"
                className="border-gray-300 dark:border-gray-700 text-black dark:text-white font-medium px-8 py-6"
              >
                Learn more
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Card className="w-full h-auto overflow-hidden shadow-xl border-none">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                alt="Friends enjoying time together"
                width={800}
                height={600}
                className="w-full h-auto object-cover aspect-[4/3] rounded-lg"
              />
            </Card>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/30 rounded-full blur-xl z-0" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
