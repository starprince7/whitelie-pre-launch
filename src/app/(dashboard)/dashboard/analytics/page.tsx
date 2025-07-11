'use client';

import { useState } from 'react';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');
  
  // Mock data for charts
  const userSignupsByDate = [
    { date: '2025-07-03', count: 12 },
    { date: '2025-07-04', count: 18 },
    { date: '2025-07-05', count: 25 },
    { date: '2025-07-06', count: 22 },
    { date: '2025-07-07', count: 30 },
    { date: '2025-07-08', count: 45 },
    { date: '2025-07-09', count: 38 },
    { date: '2025-07-10', count: 47 }
  ];
  
  const categoryDistribution = [
    { category: 'Family Gatherings', percentage: 45 },
    { category: 'Professional Events', percentage: 30 },
    { category: 'Social Activities', percentage: 25 }
  ];
  
  const userTypeDistribution = [
    { type: 'User', count: 182 },
    { type: 'Companion', count: 156 },
    { type: 'Both', count: 120 }
  ];
  
  const locationDistribution = [
    { location: 'New York', count: 85 },
    { location: 'San Francisco', count: 72 },
    { location: 'Chicago', count: 58 },
    { location: 'Los Angeles', count: 53 },
    { location: 'Miami', count: 47 },
    { location: 'Others', count: 143 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
        <div className="flex space-x-2">
          <select
            id="dateRange"
            name="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white sm:text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700">
            Export Data
          </button>
        </div>
      </div>

      {/* Signups Over Time Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Signups Over Time</h3>
        <div className="h-64 relative">
          {/* This is a simple visual representation. In a real app, use a charting library */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-52">
            {userSignupsByDate.map((day, index) => (
              <div key={day.date} className="flex flex-col items-center w-1/8">
                <div 
                  className="bg-indigo-500 dark:bg-indigo-600 rounded-t-sm w-10" 
                  style={{ height: `${(day.count / 50) * 100}%` }}
                ></div>
                <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {day.date.split('-')[2]}
                </span>
              </div>
            ))}
          </div>
          {/* Y-axis labels */}
          <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between py-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">50</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">25</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">0</span>
          </div>
        </div>
      </div>

      {/* Category and User Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Category Distribution</h3>
          <div className="space-y-4">
            {categoryDistribution.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.category}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.percentage}%</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Type Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">User Type Distribution</h3>
          <div className="flex h-48 items-end justify-around">
            {userTypeDistribution.map((item) => (
              <div key={item.type} className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 text-center mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.count}</span>
                </div>
                <div 
                  className={`w-20 rounded-t-md ${
                    item.type === 'User' 
                      ? 'bg-blue-500 dark:bg-blue-600' 
                      : item.type === 'Companion' 
                        ? 'bg-purple-500 dark:bg-purple-600'
                        : 'bg-green-500 dark:bg-green-600'
                  }`}
                  style={{ height: `${(item.count / 200) * 100}%` }}
                ></div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{item.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Locations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Top Locations</h3>
        </div>
        <div className="p-6">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {locationDistribution.map((item) => (
              <li key={item.location} className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">{item.count}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">users</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
