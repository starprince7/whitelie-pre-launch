'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// We'll use basic rendering for the charts in this version
// In a production app, you would use a proper charting library like Chart.js or Recharts

interface AnalyticsData {
  totalResponses: number;
  completionRate: number;
  betaSignups: number;
  userTypes: {
    client: number;
    provider: number;
    both: number;
    undecided: number;
  };
  pricingPreferences: {
    '1k-2k': number;
    '2k-5k': number;
    '5k-10k': number;
    '10k+': number;
    'not_sure': number;
  };
  safetyPriorities: {
    identity_verification: number;
    background_checks: number;
    in_app_messaging: number;
    location_sharing: number;
    review_system: number;
    emergency_contacts: number;
  };
  eventTypes: {
    weddings: number;
    corporate_events: number;
    social_gatherings: number;
    dates: number;
    networking: number;
    cultural_events: number;
    other: number;
  };
  geographicDistribution: {
    [location: string]: number;
  };
  dailyResponses: {
    date: string;
    count: number;
  }[];
  // For step completion tracking
  stepCompletionRates: {
    step1: number;
    step2: number;
    step3: number;
    step4: number;
    step5: number;
    step6: number;
  };
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeframe, setTimeframe] = useState('7days'); // '7days', '30days', 'alltime'

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // In a real app, you would make an API call to a backend endpoint
        // For this example, we'll simulate the data
        
        // This would normally come from an API
        const simulatedData: AnalyticsData = {
          totalResponses: 328,
          completionRate: 72,
          betaSignups: 189,
          userTypes: {
            client: 158,
            provider: 94,
            both: 53,
            undecided: 23
          },
          pricingPreferences: {
            '1k-2k': 37,
            '2k-5k': 118,
            '5k-10k': 82,
            '10k+': 24,
            'not_sure': 67
          },
          safetyPriorities: {
            identity_verification: 287,
            background_checks: 256,
            in_app_messaging: 189,
            location_sharing: 164,
            review_system: 218,
            emergency_contacts: 142
          },
          eventTypes: {
            weddings: 198,
            corporate_events: 172,
            social_gatherings: 245,
            dates: 112,
            networking: 167,
            cultural_events: 83,
            other: 42
          },
          geographicDistribution: {
            'Lagos': 156,
            'Abuja': 87,
            'Port Harcourt': 45,
            'Ibadan': 29,
            'Other': 11
          },
          dailyResponses: [
            { date: '2025-07-05', count: 23 },
            { date: '2025-07-06', count: 35 },
            { date: '2025-07-07', count: 42 },
            { date: '2025-07-08', count: 51 },
            { date: '2025-07-09', count: 48 },
            { date: '2025-07-10', count: 67 },
            { date: '2025-07-11', count: 62 }
          ],
          stepCompletionRates: {
            step1: 100, // Everyone completes step 1
            step2: 94,
            step3: 86,
            step4: 79,
            step5: 75,
            step6: 72 // Matches overall completion rate
          }
        };

        setAnalyticsData(simulatedData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeframe]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-16 px-8 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-[#FDCA64] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Analytics Dashboard</h1>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
            <p className="text-red-500 text-xl">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 bg-[#FDCA64] hover:bg-[#FDCA64]/90 text-black py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return null;
  }

  // Helper function to calculate percentage width for bar charts
  const getBarWidth = (value: number, max: number) => {
    return `${(value / max) * 100}%`;
  };

  return (
    <div className="min-h-screen bg-black py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-neutral-400">Market validation survey insights and metrics</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCA64] focus:border-transparent focus:outline-none transition-colors"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="alltime">All Time</option>
            </select>
            <Link href="/admin/survey" className="bg-[#FDCA64] hover:bg-[#FDCA64]/90 text-black py-2 px-6 rounded-lg font-medium transition-colors">
              View All Responses
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-neutral-400 text-sm font-medium mb-2">Total Responses</h2>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-white">{analyticsData.totalResponses}</div>
              <div className="text-[#FDCA64] text-sm bg-[#FDCA64]/10 px-2 py-1 rounded">Target: 500</div>
            </div>
            <div className="mt-4 h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FDCA64]" 
                style={{ width: `${(analyticsData.totalResponses / 500) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-neutral-500 text-right">
              {Math.round((analyticsData.totalResponses / 500) * 100)}% of target
            </div>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-neutral-400 text-sm font-medium mb-2">Completion Rate</h2>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-white">{analyticsData.completionRate}%</div>
              <div className={`text-sm ${analyticsData.completionRate >= 60 ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'} px-2 py-1 rounded`}>
                Target: 60%
              </div>
            </div>
            <div className="mt-4 h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${analyticsData.completionRate >= 60 ? 'bg-green-400' : 'bg-[#FDCA64]'}`} 
                style={{ width: `${analyticsData.completionRate}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-neutral-400 text-sm font-medium mb-2">Beta Waitlist Signups</h2>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-white">{analyticsData.betaSignups}</div>
              <div className={`text-sm ${analyticsData.betaSignups >= 200 ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'} px-2 py-1 rounded`}>
                Target: 200
              </div>
            </div>
            <div className="mt-4 h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${analyticsData.betaSignups >= 200 ? 'bg-green-400' : 'bg-[#FDCA64]'}`} 
                style={{ width: `${(analyticsData.betaSignups / 200) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-neutral-500 text-right">
              {Math.round((analyticsData.betaSignups / 200) * 100)}% of target
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* User Type Distribution */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">User Type Distribution</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-300">Clients</span>
                  <span className="text-neutral-400">{analyticsData.userTypes.client} ({Math.round((analyticsData.userTypes.client / analyticsData.totalResponses) * 100)}%)</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FDCA64]" 
                    style={{ width: getBarWidth(analyticsData.userTypes.client, analyticsData.totalResponses) }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-300">Providers</span>
                  <span className="text-neutral-400">{analyticsData.userTypes.provider} ({Math.round((analyticsData.userTypes.provider / analyticsData.totalResponses) * 100)}%)</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FDCA64]" 
                    style={{ width: getBarWidth(analyticsData.userTypes.provider, analyticsData.totalResponses) }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-300">Both</span>
                  <span className="text-neutral-400">{analyticsData.userTypes.both} ({Math.round((analyticsData.userTypes.both / analyticsData.totalResponses) * 100)}%)</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FDCA64]" 
                    style={{ width: getBarWidth(analyticsData.userTypes.both, analyticsData.totalResponses) }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-300">Undecided</span>
                  <span className="text-neutral-400">{analyticsData.userTypes.undecided} ({Math.round((analyticsData.userTypes.undecided / analyticsData.totalResponses) * 100)}%)</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FDCA64]" 
                    style={{ width: getBarWidth(analyticsData.userTypes.undecided, analyticsData.totalResponses) }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Preferences */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Pricing Preferences</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-300">₦1,000 - ₦2,000</span>
                  <span className="text-neutral-400">{analyticsData.pricingPreferences["1k-2k"]} responses</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FDCA64]" 
                    style={{ width: getBarWidth(analyticsData.pricingPreferences["1k-2k"], Math.max(...Object.values(analyticsData.pricingPreferences))) }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-300">₦2,000 - ₦5,000</span>
                  <span className="text-neutral-400">{analyticsData.pricingPreferences["2k-5k"]} responses</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FDCA64]" 
                    style={{ width: getBarWidth(analyticsData.pricingPreferences["2k-5k"], Math.max(...Object.values(analyticsData.pricingPreferences))) }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-300">₦5,000 - ₦10,000</span>
                  <span className="text-neutral-400">{analyticsData.pricingPreferences["5k-10k"]} responses</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FDCA64]" 
                    style={{ width: getBarWidth(analyticsData.pricingPreferences["5k-10k"], Math.max(...Object.values(analyticsData.pricingPreferences))) }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-300">₦10,000+</span>
                  <span className="text-neutral-400">{analyticsData.pricingPreferences["10k+"]} responses</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FDCA64]" 
                    style={{ width: getBarWidth(analyticsData.pricingPreferences["10k+"], Math.max(...Object.values(analyticsData.pricingPreferences))) }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-300">Not sure</span>
                  <span className="text-neutral-400">{analyticsData.pricingPreferences["not_sure"]} responses</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FDCA64]" 
                    style={{ width: getBarWidth(analyticsData.pricingPreferences["not_sure"], Math.max(...Object.values(analyticsData.pricingPreferences))) }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Priorities */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Safety Priorities</h2>
            <div className="space-y-6">
              {Object.entries(analyticsData.safetyPriorities).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-300">{key.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    <span className="text-neutral-400">{value} selections</span>
                  </div>
                  <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FDCA64]" 
                      style={{ width: getBarWidth(value, Math.max(...Object.values(analyticsData.safetyPriorities))) }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Completion Rates */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Survey Funnel Completion</h2>
            <div className="space-y-6">
              {Object.entries(analyticsData.stepCompletionRates).map(([key, value], index) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-300">Step {index + 1}</span>
                    <span className="text-neutral-400">{value}%</span>
                  </div>
                  <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FDCA64]" 
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-6">Geographic Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(analyticsData.geographicDistribution).map(([location, count]) => (
              <div key={location} className="bg-neutral-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-2">{location}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#FDCA64]">{count}</span>
                  <span className="text-neutral-400">
                    {Math.round((count / analyticsData.totalResponses) * 100)}% of total
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Responses Chart */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-6">Daily Response Trend</h2>
          <div className="h-64 flex items-end gap-2">
            {analyticsData.dailyResponses.map((item, index) => {
              const maxCount = Math.max(...analyticsData.dailyResponses.map(item => item.count));
              const height = `${(item.count / maxCount) * 100}%`;
              const date = new Date(item.date);
              const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center group relative">
                  <div className="absolute bottom-full mb-2 bg-neutral-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.count} responses
                  </div>
                  <div 
                    className="w-full bg-[#FDCA64] hover:bg-[#FDCA64]/80 transition-colors rounded-t-sm"
                    style={{ height }}
                  ></div>
                  <div className="text-xs text-neutral-400 mt-2">{formattedDate}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Data Section */}
        <div className="mt-8 p-8 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">Export Analytics Data</h2>
              <p className="text-neutral-400">Download survey data for further analysis</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              <button className="bg-neutral-800 hover:bg-neutral-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <span>Export as CSV</span>
              </button>
              <button className="bg-neutral-800 hover:bg-neutral-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <span>Export as JSON</span>
              </button>
              <button className="bg-[#FDCA64] hover:bg-[#FDCA64]/90 text-black py-3 px-6 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
