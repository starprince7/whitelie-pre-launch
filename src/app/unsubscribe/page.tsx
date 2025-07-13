'use client';

import React, { useState } from 'react';

const UnsubscribePage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!email) {
      setStatus('error');
      setMessage('Email address is required.');
      return;
    }

    try {
      const response = await fetch('/api/email/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.message || 'An error occurred.');
      } else {
        setStatus('success');
        setMessage(data.message || 'You have been successfully unsubscribed.');
        setEmail('');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <main className="bg-black text-white flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 sm:p-16 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Unsubscribe</h1>
          <p className="text-neutral-300 text-lg mb-8 text-center">
            We're sorry to see you go. Please enter your email address to unsubscribe from our mailing list.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-300 disabled:bg-neutral-600 disabled:cursor-not-allowed">
              {status === 'loading' ? 'Unsubscribing...' : 'Unsubscribe'}
            </button>
          </form>

          {message && (
            <p className={`mt-6 text-center text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default UnsubscribePage;
