'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import YouTubeEmbed from './YouTubeEmbed';

const WaitlistForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('client');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // SLEEP FOR 2 SECONDS
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push('/survey');
    return;
    
    if (!email) {
      setStatus('error');
      setMessage('Email address is required.');
      return;
    }

    try {
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userType }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.message || 'An error occurred.');
      } else {
        router.push('/waitlist-success');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <section id="waitlist" className="bg-white dark:bg-black text-neutral-800 dark:text-white py-24 sm:py-32">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Join Our Professional Network</h2>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300">
            Be the first to know when we launch. Register your interest as a client, a service provider, or both.
          </p>
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-neutral-50 dark:bg-neutral-900 p-8 sm:p-10 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  I am interested in...
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setUserType('client')}
                    className={`px-4 py-3 rounded-lg text-center font-semibold transition-colors duration-200 ${userType === 'client' ? 'bg-amber-400 text-black' : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'}`}>
                    Hiring a Professional
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('provider')}
                    className={`px-4 py-3 rounded-lg text-center font-semibold transition-colors duration-200 ${userType === 'provider' ? 'bg-amber-400 text-black' : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'}`}>
                    Becoming a Provider
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('both')}
                    className={`px-4 py-3 rounded-lg text-center font-semibold transition-colors duration-200 ${userType === 'both' ? 'bg-amber-400 text-black' : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'}`}>
                    Both
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-amber-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-all duration-300 disabled:bg-amber-400/50 disabled:cursor-not-allowed">
                {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
              </button>
            </div>

            {message && (
              <p className={`mt-4 text-center text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </form>
        </div>

        <div className="mt-20 max-w-xs mx-auto">
          <h3 className="text-center text-2xl font-bold mb-8">WATCH VIDEO</h3>
          <YouTubeEmbed embedId="y9TaEiCsO90" title="WhiteLie Concept Explainer" />
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;