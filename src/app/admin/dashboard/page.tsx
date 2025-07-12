"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Button,
  Spinner,
  Tab,
  Tabs,
  Select,
  SelectItem,
  Badge,
} from "@heroui/react";

// Define Analytics Types
interface AnalyticsData {
  _id: string;
  date: string;
  metrics: {
    totalSignups: number;
    surveyCompletions: number;
    conversionRate: number;
    geographicDistribution: Map<string, number>;
    segmentationData: {
      seekers: number;
      providers: number;
      both: number;
    };
    sentimentAnalysis: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
  updatedAt: string;
}

export default function AnalyticsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("all");

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/analytics?timeframe=${timeframe}`);
        const data = await response.json();
        setAnalytics(data.analytics);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchAnalytics();

      // Set up polling for real-time updates
      const interval = setInterval(fetchAnalytics, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [status, timeframe]);

  // Handle export data
  const handleExport = () => {
    if (!analytics) return;

    const dataStr = JSON.stringify(analytics, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `whitelie-analytics-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Handle timeframe change
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner color="primary" size="lg" className="mx-auto" />
          <p className="mt-4 text-neutral-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-neutral-500">
              Market validation metrics and insights
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select 
              label="Timeframe" 
              variant="bordered"
              size="sm"
              className="w-40"
              selectedKeys={[timeframe]}
              onChange={(e) => handleTimeframeChange(e.target.value)}
            >
              <SelectItem key="all">All Time</SelectItem>
              <SelectItem key="today">Today</SelectItem>
              <SelectItem key="week">This Week</SelectItem>
              <SelectItem key="month">This Month</SelectItem>
            </Select>
            <Button
              variant="flat"
              size="sm"
              className="bg-black text-white hover:bg-neutral-800"
              onClick={handleExport}
            >
              Export Data
            </Button>
          </div>
        </div>

        {analytics ? (
          <div className="space-y-8">
            {/* Key Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Signups */}
              <Card className="border border-[#FDCA64]/20 hover:border-[#FDCA64]/50 transition-all duration-200">
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Total Signups</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-4xl font-bold text-[#FDCA64]">
                    {analytics.metrics.totalSignups || 0}
                  </p>
                  <p className="text-neutral-500 text-sm">
                    Target: 400+ email signups
                  </p>
                  <div className="mt-3">
                    <Badge color={analytics.metrics.totalSignups >= 400 ? "success" : "warning"}>
                      {analytics.metrics.totalSignups >= 400 
                        ? "Target Achieved" 
                        : `${Math.round((analytics.metrics.totalSignups / 400) * 100)}% of target`
                      }
                    </Badge>
                  </div>
                </CardBody>
              </Card>

              {/* Survey Completions */}
              <Card className="border border-[#FDCA64]/20 hover:border-[#FDCA64]/50 transition-all duration-200">
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Survey Completions</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-4xl font-bold text-[#FDCA64]">
                    {analytics.metrics.surveyCompletions || 0}
                  </p>
                  <p className="text-neutral-500 text-sm">
                    Target: 15% completion rate
                  </p>
                  <div className="mt-3">
                    <Badge color={analytics.metrics.conversionRate >= 15 ? "success" : "warning"}>
                      {analytics.metrics.conversionRate.toFixed(1)}% conversion rate
                    </Badge>
                  </div>
                </CardBody>
              </Card>

              {/* User Segmentation */}
              <Card className="border border-[#FDCA64]/20 hover:border-[#FDCA64]/50 transition-all duration-200">
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">User Segmentation</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex justify-between items-center mb-2">
                    <span>Seekers</span>
                    <span className="font-semibold">{analytics.metrics.segmentationData.seekers}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Providers</span>
                    <span className="font-semibold">{analytics.metrics.segmentationData.providers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Both</span>
                    <span className="font-semibold">{analytics.metrics.segmentationData.both}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div 
                      className="h-2 bg-blue-500 rounded-full" 
                      style={{
                        width: `${analytics.metrics.segmentationData.seekers / 
                          (analytics.metrics.segmentationData.seekers + 
                           analytics.metrics.segmentationData.providers + 
                           analytics.metrics.segmentationData.both) * 100}%`
                      }}
                    />
                    <div 
                      className="h-2 bg-green-500 rounded-full" 
                      style={{
                        width: `${analytics.metrics.segmentationData.providers / 
                          (analytics.metrics.segmentationData.seekers + 
                           analytics.metrics.segmentationData.providers + 
                           analytics.metrics.segmentationData.both) * 100}%`
                      }}
                    />
                    <div 
                      className="h-2 bg-purple-500 rounded-full" 
                      style={{
                        width: `${analytics.metrics.segmentationData.both / 
                          (analytics.metrics.segmentationData.seekers + 
                           analytics.metrics.segmentationData.providers + 
                           analytics.metrics.segmentationData.both) * 100}%`
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Conversion Funnel */}
            <Card className="border border-[#FDCA64]/20">
              <CardHeader>
                <h2 className="text-xl font-semibold">Conversion Funnel</h2>
              </CardHeader>
              <CardBody>
                <div className="py-4">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black bg-blue-200">
                          Email Signup
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {analytics.metrics.totalSignups}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: "100%" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black bg-green-200">
                          Survey Started
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-green-600">
                          {Math.round(analytics.metrics.totalSignups * 0.45)} {/* Estimated */}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-green-200">
                      <div
                        style={{ width: `45%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black bg-yellow-200">
                          Survey Completed
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-yellow-600">
                          {analytics.metrics.surveyCompletions}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-yellow-200">
                      <div
                        style={{ width: `${(analytics.metrics.surveyCompletions / analytics.metrics.totalSignups) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black bg-red-200">
                          Waitlist Conversion
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-red-600">
                          {Math.round(analytics.metrics.surveyCompletions * 0.25)} {/* Estimated */}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                      <div
                        style={{ width: `${(analytics.metrics.surveyCompletions * 0.25 / analytics.metrics.totalSignups) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                      ></div>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Email Signup</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Survey Started</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Survey Completed</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-600">Waitlist Conversion</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            {/* Geographic Distribution */}
            <Card className="border border-[#FDCA64]/20">
              <CardHeader>
                <h2 className="text-xl font-semibold">Geographic Distribution</h2>
              </CardHeader>
              <CardBody>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Users
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(analytics.metrics.geographicDistribution).map(([country, count]) => (
                        <tr key={country}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {country}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {((count / analytics.metrics.totalSignups) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
            
            {/* Sentiment Analysis */}
            <Card className="border border-[#FDCA64]/20">
              <CardHeader>
                <h2 className="text-xl font-semibold">Sentiment Analysis</h2>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col md:flex-row justify-around items-center py-4">
                  <div className="flex flex-col items-center mb-6 md:mb-0">
                    <div className="relative w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                      <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(
                            #4ade80 0%, 
                            #4ade80 ${analytics.metrics.sentimentAnalysis.positive / 
                              (analytics.metrics.sentimentAnalysis.positive + 
                               analytics.metrics.sentimentAnalysis.neutral + 
                               analytics.metrics.sentimentAnalysis.negative) * 100}%, 
                            #facc15 ${analytics.metrics.sentimentAnalysis.positive / 
                              (analytics.metrics.sentimentAnalysis.positive + 
                               analytics.metrics.sentimentAnalysis.neutral + 
                               analytics.metrics.sentimentAnalysis.negative) * 100}%,
                            #facc15 ${(analytics.metrics.sentimentAnalysis.positive + analytics.metrics.sentimentAnalysis.neutral) / 
                              (analytics.metrics.sentimentAnalysis.positive + 
                               analytics.metrics.sentimentAnalysis.neutral + 
                               analytics.metrics.sentimentAnalysis.negative) * 100}%,
                            #ef4444 ${(analytics.metrics.sentimentAnalysis.positive + analytics.metrics.sentimentAnalysis.neutral) / 
                              (analytics.metrics.sentimentAnalysis.positive + 
                               analytics.metrics.sentimentAnalysis.neutral + 
                               analytics.metrics.sentimentAnalysis.negative) * 100}%,
                            #ef4444 100%
                          )`
                        }}
                      ></div>
                      <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold">Sentiment</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 justify-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-600">Positive</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-600">Neutral</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-600">Negative</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Positive</span>
                          <span className="text-sm font-medium text-gray-700">
                            {analytics.metrics.sentimentAnalysis.positive} ({((analytics.metrics.sentimentAnalysis.positive / 
                              (analytics.metrics.sentimentAnalysis.positive + 
                               analytics.metrics.sentimentAnalysis.neutral + 
                               analytics.metrics.sentimentAnalysis.negative)) * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ 
                              width: `${(analytics.metrics.sentimentAnalysis.positive / 
                                (analytics.metrics.sentimentAnalysis.positive + 
                                 analytics.metrics.sentimentAnalysis.neutral + 
                                 analytics.metrics.sentimentAnalysis.negative)) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Neutral</span>
                          <span className="text-sm font-medium text-gray-700">
                            {analytics.metrics.sentimentAnalysis.neutral} ({((analytics.metrics.sentimentAnalysis.neutral / 
                              (analytics.metrics.sentimentAnalysis.positive + 
                               analytics.metrics.sentimentAnalysis.neutral + 
                               analytics.metrics.sentimentAnalysis.negative)) * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ 
                              width: `${(analytics.metrics.sentimentAnalysis.neutral / 
                                (analytics.metrics.sentimentAnalysis.positive + 
                                 analytics.metrics.sentimentAnalysis.neutral + 
                                 analytics.metrics.sentimentAnalysis.negative)) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Negative</span>
                          <span className="text-sm font-medium text-gray-700">
                            {analytics.metrics.sentimentAnalysis.negative} ({((analytics.metrics.sentimentAnalysis.negative / 
                              (analytics.metrics.sentimentAnalysis.positive + 
                               analytics.metrics.sentimentAnalysis.neutral + 
                               analytics.metrics.sentimentAnalysis.negative)) * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ 
                              width: `${(analytics.metrics.sentimentAnalysis.negative / 
                                (analytics.metrics.sentimentAnalysis.positive + 
                                 analytics.metrics.sentimentAnalysis.neutral + 
                                 analytics.metrics.sentimentAnalysis.negative)) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600">No analytics data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
