'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-transparent absolute top-0 left-0 w-full z-50 py-6">
      <div className="container mx-auto px-8 lg:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter">
          <Link href="/" className="text-black dark:text-white">
            White<span className="text-amber-400">Lie</span>.
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#how-it-works" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-400 transition-colors">How It Works</Link>
          <Link href="#use-cases" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-400 transition-colors">Use Cases</Link>
          <Link href="#pricing" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-400 transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center">
          <Link href="/survey" className="bg-black dark:bg-white text-white dark:text-black font-semibold py-2 px-6 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300">
            Join Waitlist
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
