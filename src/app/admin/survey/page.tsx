'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SurveyResponse {
  responseId: string;
  userType: string;
  eventAttendanceFrequency?: string;
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
  additionalFeedback?: string;
  source: string;
  createdAt: string;
  completedAt?: string;
  isComplete: boolean;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function SurveyResponsesPage() {
  const router = useRouter();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    userType: '',
    isComplete: '',
    betaInterest: '',
  });

  const fetchResponses = async (page = 1) => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', pagination.itemsPerPage.toString());
      
      if (filter.userType) params.append('userType', filter.userType);
      if (filter.isComplete) params.append('isComplete', filter.isComplete);
      if (filter.betaInterest) params.append('betaInterest', filter.betaInterest);
      
      const response = await fetch(`/api/survey?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch survey responses');
      }
      
      const data = await response.json();
      if (data.success) {
        setResponses(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error(data.message || 'Unknown error');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, [filter]);

  const handlePageChange = (page: number) => {
    fetchResponses(page);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-black py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Survey Responses</h1>
            <p className="text-neutral-400">View and analyze market validation survey responses</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/admin/analytics" className="bg-[#FDCA64] hover:bg-[#FDCA64]/90 text-black py-3 px-6 rounded-lg font-medium transition-colors">
              View Analytics Dashboard
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-neutral-300 mb-2">
                User Type
              </label>
              <select
                id="userType"
                name="userType"
                value={filter.userType}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCA64] focus:border-transparent focus:outline-none transition-colors"
              >
                <option value="">All Types</option>
                <option value="client">Client</option>
                <option value="provider">Provider</option>
                <option value="both">Both</option>
                <option value="undecided">Undecided</option>
              </select>
            </div>
            <div>
              <label htmlFor="isComplete" className="block text-sm font-medium text-neutral-300 mb-2">
                Completion Status
              </label>
              <select
                id="isComplete"
                name="isComplete"
                value={filter.isComplete}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCA64] focus:border-transparent focus:outline-none transition-colors"
              >
                <option value="">All Status</option>
                <option value="true">Complete</option>
                <option value="false">Incomplete</option>
              </select>
            </div>
            <div>
              <label htmlFor="betaInterest" className="block text-sm font-medium text-neutral-300 mb-2">
                Beta Interest
              </label>
              <select
                id="betaInterest"
                name="betaInterest"
                value={filter.betaInterest}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCA64] focus:border-transparent focus:outline-none transition-colors"
              >
                <option value="">All</option>
                <option value="true">Interested</option>
                <option value="false">Not Interested</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responses Table */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-[#FDCA64] border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : responses.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-neutral-400">No survey responses found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">User Type</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Beta Interest</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Created At</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {responses.map((response) => (
                      <tr key={response.responseId} className="hover:bg-neutral-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white capitalize">
                          {response.userType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                          {response.email || 'Not provided'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {response.betaInterest ? (
                            <span className="px-2 py-1 text-xs font-medium bg-[#FDCA64]/20 text-[#FDCA64] rounded">
                              Interested
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium bg-neutral-700 text-neutral-300 rounded">
                              Not Interested
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {response.isComplete ? (
                            <span className="px-2 py-1 text-xs font-medium bg-green-900/20 text-green-500 rounded">
                              Complete
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-900/20 text-yellow-500 rounded">
                              Incomplete
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                          {formatDate(response.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button 
                            onClick={() => router.push(`/admin/survey/${response.responseId}`)} 
                            className="text-[#FDCA64] hover:underline"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="py-4 px-6 bg-neutral-800 flex items-center justify-between">
                  <div className="text-sm text-neutral-400">
                    Showing <span className="font-medium text-white">{(pagination.currentPage - 1) * pagination.itemsPerPage + 1}</span>
                    {' '}-{' '}
                    <span className="font-medium text-white">
                      {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
                    </span>
                    {' '}of{' '}
                    <span className="font-medium text-white">{pagination.totalItems}</span> results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className={`px-3 py-1 rounded ${
                        pagination.currentPage === 1
                          ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                          : 'bg-neutral-700 text-white hover:bg-neutral-600'
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className={`px-3 py-1 rounded ${
                        pagination.currentPage === pagination.totalPages
                          ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                          : 'bg-neutral-700 text-white hover:bg-neutral-600'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
