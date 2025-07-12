'use client';

import Link from 'next/link';

interface ThankYouStepProps {
  email?: string;
}

export default function ThankYouStep({ email }: ThankYouStepProps) {
  return (
    <div className="space-y-8 text-center py-8">
      <div className="text-[#FDCA64] text-6xl">✨</div>
      <div>
        <h2 className="text-3xl font-semibold text-white mb-4">
          Thank You for Your Feedback!
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Your responses will help us build a better platform for platonic companionship services.
          {email && ' We\'ve sent you a confirmation email.'}
        </p>
      </div>

      {email && (
        <div className="bg-neutral-800 border border-[#FDCA64]/20 rounded-lg p-8 max-w-md mx-auto">
          <div className="text-xl text-[#FDCA64] mb-2">Next Steps</div>
          <p className="text-neutral-300 mb-4">
            We've added <span className="text-white font-medium">{email}</span> to our list and will notify you when we're ready for beta testing.
          </p>
          <p className="text-sm text-neutral-400">
            If you don't receive an email soon, please check your spam folder.
          </p>
        </div>
      )}

      <div className="pt-6">
        <Link href="/" className="inline-block bg-[#FDCA64] hover:bg-[#FDCA64]/90 text-black py-3 px-8 rounded-lg font-medium transition-colors">
          Return to Homepage
        </Link>
      </div>

      <div className="text-sm text-neutral-500 mt-12">
        <p>
          Questions or feedback? Contact us at{' '}
          <a href="mailto:hello@whitelie.com" className="text-[#FDCA64] hover:underline">
            hello@whitelie.com
          </a>
        </p>
      </div>
    </div>
  );
}
