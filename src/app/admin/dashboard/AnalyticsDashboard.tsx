'use client';

import { useState } from 'react';
import { useAnalytics, AnalyticsOverview } from '@/app/lib/actions/analytics';
import { Card, CardBody, CardHeader, Button, Spacer } from '@heroui/react';

const StatCard = ({ title, value, description }: { title: string; value: string | number; description: string }) => (
  <Card className="border border-neutral-200 hover:border-neutral-300 transition-all duration-200">
    <CardHeader className="pb-2">
      <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>
    </CardHeader>
    <CardBody>
      <p className="text-3xl font-bold text-black">{value}</p>
      <p className="text-neutral-500 text-sm">{description}</p>
    </CardBody>
  </Card>
);

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState('all');
  const { data, loading, error } = useAnalytics(timeframe);

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-neutral-500">Loading analytics...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }

    if (!data) {
      return <p className="text-center text-neutral-500">No analytics data available.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Responses" value={data.totalResponses} description="All survey submissions" />
        <StatCard title="Completed Surveys" value={data.completedResponses} description="Finished the entire survey" />
        <StatCard title="Completion Rate" value={`${data.completionRate}%`} description="Percentage of completed surveys" />
        <StatCard title="Beta Signups" value={data.betaInterestSignups} description="Users interested in beta" />
        <StatCard title="Avg. Safety Comfort" value={data.averageSafetyComfort.toFixed(2)} description="Scale of 1-5" />
        <div className="lg:col-span-1 md:col-span-2 p-4 border rounded-lg">
          <h3 className="font-semibold">User Types</h3>
          <ul>
            {Object.entries(data.userTypeDistribution).map(([type, count]) => (
              <li key={type} className="flex justify-between items-center py-1">
                <span className="capitalize">{type}</span>
                <span className="font-bold">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Survey Analytics</h2>
        <div className="flex gap-2">
          <Button size="sm" variant={timeframe === 'all' ? 'solid' : 'flat'} onClick={() => setTimeframe('all')}>All Time</Button>
          <Button size="sm" variant={timeframe === 'month' ? 'solid' : 'flat'} onClick={() => setTimeframe('month')}>Month</Button>
          <Button size="sm" variant={timeframe === 'week' ? 'solid' : 'flat'} onClick={() => setTimeframe('week')}>Week</Button>
          <Button size="sm" variant={timeframe === 'today' ? 'solid' : 'flat'} onClick={() => setTimeframe('today')}>Today</Button>
        </div>
      </div>
      {renderContent()}
    </div>
  );
}
