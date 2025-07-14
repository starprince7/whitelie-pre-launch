'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

export function SurveyResponseDetailClient({ response }: { response: SurveyResponseDetail }) {
  const router = useRouter();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const displayArray = (arr?: string[]) => {
    if (!arr || arr.length === 0) return 'None selected';
    return arr.map((item) => (
      <span 
        key={item}
        className="inline-block bg-neutral-800 text-neutral-300 px-2 py-1 rounded text-sm mr-2 mb-2"
      >
        {item.replace(/_/g, ' ')}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-black py-16 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center mb-2">
              <button 
                onClick={() => router.back()}
                className="text-white hover:text-[#FDCA64] transition-colors mr-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-3xl font-bold text-white">Survey Response</h1>
            </div>
            <p className="text-neutral-400">Response ID: {response.responseId}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${response.isComplete ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
              {response.isComplete ? 'Completed' : 'In Progress'}
            </span>
            <span className="text-neutral-500 text-sm">|</span>
            <span className="text-neutral-400 text-sm">
              Submitted: {formatDate(response.createdAt)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* User Information */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6">User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-neutral-400 mb-1">User Type</div>
                  <div className="text-white capitalize">{response.userType}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Beta Interest</div>
                  <div className="text-white">{response.betaInterest ? 'Yes' : 'No'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Email</div>
                  <div className="text-white break-words">{response.email || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Phone</div>
                  <div className="text-white">{response.phone || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Source</div>
                  <div className="text-white">{response.source || 'Not provided'}</div>
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Demographics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Age</div>
                  <div className="text-white">{response.demographics?.age || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Gender</div>
                  <div className="text-white">{response.demographics?.gender || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Occupation</div>
                  <div className="text-white">{response.demographics?.occupation || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Location</div>
                  <div className="text-white">
                    {response.location?.city && response.location?.state 
                      ? `${response.location.city}, ${response.location.state}` 
                      : 'Not provided'}
                  </div>
                </div>
              </div>
            </div>

            {/* Survey-specific Details */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Survey Details</h2>
              <div className="space-y-6">
                {(response.userType === 'client' || response.userType === 'both') && (
                  <div>
                    <div className="text-sm text-neutral-400 mb-2">Companionship Needs</div>
                    <div className="flex flex-wrap mt-1">
                      {displayArray(response.companionshipNeeds)}
                    </div>
                  </div>
                )}
                {(response.userType === 'provider' || response.userType === 'both') && (
                  <div>
                    <div className="text-sm text-neutral-400 mb-1">Reason for Providing</div>
                    <div className="text-white">{response.providingReason || 'Not provided'}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Event Attendance Frequency</div>
                  <div className="text-white">{response.eventAttendanceFrequency || 'Not provided'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-2">Event Types of Interest</div>
                  <div className="flex flex-wrap mt-1">
                    {displayArray(response.eventTypes)}
                  </div>
                </div>
                {(response.userType === 'provider' || response.userType === 'both') && (
                  <>
                    <div>
                      <div className="text-sm text-neutral-400 mb-1">Prior Experience</div>
                      <div className="text-white">{response.priorExperience || 'Not provided'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-400 mb-1">Current Employment Status</div>
                      <div className="text-white">{response.currentEmploymentStatus || 'Not provided'}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Safety, Feedback */}
          <div className="space-y-8">
            {/* Pricing */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Pricing Information</h2>
              
              {(response.userType === 'client' || response.userType === 'both') && (
                <div className="mb-6">
                  <div className="text-sm text-neutral-400 mb-1">Client Hourly Rate Comfort</div>
                  <div className="text-white">
                    {response.hourlyRateComfort?.client 
                      ? `₦${response.hourlyRateComfort.client.toLocaleString()} per hour` 
                      : 'Not provided'
                    }
                  </div>
                </div>
              )}
              
              {(response.userType === 'provider' || response.userType === 'both') && (
                <>
                  <div className="mb-4">
                    <div className="text-sm text-neutral-400 mb-1">Provider Hourly Rate Comfort</div>
                    <div className="text-white">
                      {response.hourlyRateComfort?.provider 
                        ? `₦${response.hourlyRateComfort.provider.toLocaleString()} per hour` 
                        : 'Not provided'
                      }
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-neutral-400 mb-1">Income Interest Level</div>
                    <div className="text-white">{response.providerIncomeInterest || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400 mb-1">Expected Monthly Earnings</div>
                    <div className="text-white">{response.expectedEarnings || 'Not provided'}</div>
                  </div>
                </>
              )}
            </div>

            {/* Safety Priorities */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Safety Concerns</h2>
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-neutral-400 mb-2">Safety Priorities</div>
                  <div className="flex flex-wrap mt-1">
                    {displayArray(response.safetyPriorities)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">
                    Comfort Level with Safety Measures (1-10)
                  </div>
                  <div className="flex items-center">
                    <div className="text-xl font-medium text-[#FDCA64] mr-4">
                      {response.safetyComfortLevel || 'N/A'}
                    </div>
                    {response.safetyComfortLevel && (
                      <div className="w-full max-w-md h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#FDCA64]" 
                          style={{ width: `${(response.safetyComfortLevel / 10) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Feedback */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Additional Feedback</h2>
              <div className="text-white whitespace-pre-wrap">
                {response.additionalFeedback || 'No additional feedback provided'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => router.back()}
            className="bg-neutral-800 hover:bg-neutral-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Back to Responses
          </button>
          <Link href="/admin/analytics" className="bg-[#FDCA64] hover:bg-[#FDCA64]/90 text-black py-3 px-6 rounded-lg font-medium transition-colors">
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}
