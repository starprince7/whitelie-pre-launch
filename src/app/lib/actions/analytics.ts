'use client';

import { useState, useEffect, useCallback } from 'react';

export interface AnalyticsOverview {
  totalResponses: number;
  completedResponses: number;
  completionRate: number;
  userTypeDistribution: Record<string, number>;
  betaInterestSignups: number;
  averageSafetyComfort: number;
}

export function useAnalytics(timeframe: string = 'all') {
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/analytics/overview?timeframe=${timeframe}`);
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      const result = await response.json();
      setData(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
