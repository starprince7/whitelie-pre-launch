'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

export default function SurveyResponseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [response, setResponse] = useState<SurveyResponseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResponse = async () => {
      setLoading(true);
      try {
        const apiResponse = await fetch(`/api/survey/${params.id}`);
        if (!apiResponse.ok) {
          throw new Error('Failed to fetch survey response');
        }
        
        const data = await apiResponse.json();
        if (data.success) {
          setResponse(data.data);
        } else {
          throw new Error(data.message || 'Unknown error');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchResponse();
    }
  }, [params.id]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-16 px-8 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#FDCA64] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
            <p className="text-red-500 text-xl">{error}</p>
            <div className="mt-8 space-x-4">
              <button 
                onClick={() => router.back()}
                className="bg-neutral-800 hover:bg-neutral-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="bg-[#FDCA64] hover:bg-[#FDCA64]/90 text-black py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  // Helper function for displaying array data
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
                className="text-neutral-400 hover:text-white mr-2"
                aria-label="Back"
              >
                ←
              </button>
              <h1 className="text-3xl font-bold text-white">Survey Response Details</h1>
            </div>
            <p className="text-neutral-400">Response ID: {response.responseId}</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href={`/admin/survey/export/${response.responseId}`} className="bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
              Export
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-lg font-semibold text-white mb-4">Status</h2>
            <div>
              {response.isComplete ? (
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-green-400">Complete</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></span>
                  <span className="text-yellow-400">Incomplete</span>
                </div>
              )}
              <div className="mt-2 text-sm text-neutral-400">
                Step {response.currentStep} of {response.totalSteps}
              </div>
              <div className="mt-4 h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FDCA64]" 
                  style={{ width: `${(response.currentStep / response.totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-lg font-semibold text-white mb-4">User Type</h2>
            <div className="text-xl font-medium text-[#FDCA64] capitalize">{response.userType}</div>
            <div className="mt-2 text-sm text-neutral-400">
              Beta Interest: {response.betaInterest ? 'Yes' : 'No'}
            </div>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-lg font-semibold text-white mb-4">Timestamps</h2>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Created:</span>
                <span className="text-white">{formatDate(response.createdAt)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Updated:</span>
                <span className="text-white">{formatDate(response.updatedAt)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Completed:</span>
                <span className="text-white">{formatDate(response.completedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-neutral-400 mb-1">Email</div>
                <div className="text-white">{response.email || 'Not provided'}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-400 mb-1">Phone</div>
                <div className="text-white">{response.phone || 'Not provided'}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-400 mb-1">Location</div>
                <div className="text-white">
                  {response.location?.city && response.location?.state 
                    ? `${response.location.city}, ${response.location.state}` 
                    : response.location?.city || response.location?.state || 'Not provided'
                  }
                </div>
              </div>
              <div>
                <div className="text-sm text-neutral-400 mb-1">Source</div>
                <div className="text-white capitalize">{response.source.replace('_', ' ')}</div>
              </div>
            </div>
          </div>

          {/* Demographics */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Demographics</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-neutral-400 mb-1">Age Group</div>
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
            </div>
          </div>

          {/* Market Validation */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Market Validation</h2>
            
            {response.userType === 'client' && (
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Event Attendance Frequency</div>
                  <div className="text-white">{response.eventAttendanceFrequency || 'Not answered'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Companionship Needs</div>
                  <div className="flex flex-wrap mt-1">
                    {displayArray(response.companionshipNeeds)}
                  </div>
                </div>
              </div>
            )}

            {response.userType === 'provider' && (
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Reason for Providing Services</div>
                  <div className="text-white">{response.providingReason || 'Not answered'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Prior Experience</div>
                  <div className="text-white">{response.priorExperience || 'Not answered'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Current Employment Status</div>
                  <div className="text-white">{response.currentEmploymentStatus || 'Not answered'}</div>
                </div>
              </div>
            )}

            {(response.userType === 'both' || response.userType === 'undecided') && (
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Event Attendance Frequency</div>
                  <div className="text-white">{response.eventAttendanceFrequency || 'Not answered'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Reason for Interest</div>
                  <div className="text-white">{response.providingReason || 'Not answered'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Event Types */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Event Types</h2>
            <div>
              <div className="flex flex-wrap mt-1">
                {displayArray(response.eventTypes)}
              </div>
            </div>
          </div>

          {/* Pricing Information */}
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
