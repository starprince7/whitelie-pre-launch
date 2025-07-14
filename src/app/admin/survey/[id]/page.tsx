import Link from 'next/link';
import { SurveyResponseDetailClient } from './SurveyResponseDetailClient';

interface SurveyResponseDetail {
  responseId: string;
  userType: string;
  eventAttendanceFrequency?: string;
  companionshipNeeds?: string[];
  providingReason?: string;
  priorExperience?: string;
  currentEmploymentStatus?: string;
  eventTypes?: string[];
  hourlyRateComfort?: {
    client?: number;
    provider?: number;
  };
  providerIncomeInterest?: string;
  expectedEarnings?: string;
  safetyPriorities?: string[];
  safetyComfortLevel?: number;
  betaInterest: boolean;
  email?: string;
  phone?: string;
  location?: {
    state?: string;
    city?: string;
  };
  demographics?: {
    age?: string;
    gender?: string;
    occupation?: string;
  };
  additionalFeedback?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  isComplete: boolean;
  currentStep: number;
  totalSteps: number;
}

async function getSurveyResponse(id: string): Promise<SurveyResponseDetail | null> {
  // In a real app, you'd fetch from a database or an external API.
  // For this example, we'll use the existing API route.
  // Note: Using an absolute URL is best practice for fetch in Server Components.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/survey/${id}`, { cache: 'no-store' });

  if (!response.ok) {
    // This will be caught by the error boundary
    throw new Error('Failed to fetch survey response');
  }

  const data = await response.json();
  return data.success ? data.data : null;
}

export default async function SurveyResponseDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const response = await getSurveyResponse(id);

  if (!response) {
    return (
      <div className="min-h-screen bg-black py-16 px-8 flex items-center justify-center">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
          <p className="text-red-500 text-xl mb-4">Survey response not found.</p>
          <Link 
            href="/admin/dashboard"
            className="bg-[#FDCA64] hover:bg-[#FDCA64]/90 text-black py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <SurveyResponseDetailClient response={response} />;
}
