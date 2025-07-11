'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SurveysPage() {
  // Mock data for survey responses
  const initialSurveys = [
    { 
      id: '1', 
      userId: '1',
      userName: 'Sarah Johnson', 
      email: 'sarah@example.com',
      interestType: 'User',
      eventCategories: ['Family Gatherings', 'Professional Events'],
      priceRange: 'Standard ($80-120/hr)',
      availabilityPerWeek: 10,
      experienceLevel: 'Beginner',
      safetyConcerns: 'Somewhat concerned',
      additionalComments: 'I would like to use this service for family events primarily.',
      submittedAt: '2025-07-09T14:23:00Z'
    },
    { 
      id: '3', 
      userId: '3',
      userName: 'Alex Rodriguez', 
      email: 'alex@example.com',
      interestType: 'Companion',
      eventCategories: ['Family Gatherings', 'Social Activities'],
      priceRange: 'Economy ($50-80/hr)',
      availabilityPerWeek: 20,
      experienceLevel: 'Intermediate',
      safetyConcerns: 'Not concerned',
      additionalComments: 'I have experience as a plus one for events. Looking forward to helping people.',
      submittedAt: '2025-07-08T09:17:00Z'
    },
    { 
      id: '5', 
      userId: '5',
      userName: 'David Chen', 
      email: 'david@example.com',
      interestType: 'Companion',
      eventCategories: ['Professional Events', 'Social Activities'],
      priceRange: 'Premium ($120-200/hr)',
      availabilityPerWeek: 15,
      experienceLevel: 'Expert',
      safetyConcerns: 'Not concerned',
      additionalComments: 'I have extensive experience in professional networking events and social gatherings.',
      submittedAt: '2025-07-07T16:45:00Z'
    },
    { 
      id: '6', 
      userId: '6',
      userName: 'Emma Wilson', 
      email: 'emma@example.com',
      interestType: 'User',
      eventCategories: ['Family Gatherings'],
      priceRange: 'Standard ($80-120/hr)',
      availabilityPerWeek: 5,
      experienceLevel: 'Beginner',
      safetyConcerns: 'Very concerned',
      additionalComments: 'I need someone to attend family functions with me occasionally.',
      submittedAt: '2025-07-07T11:30:00Z'
    },
    { 
      id: '7', 
      userId: '7',
      userName: 'Robert Garcia', 
      email: 'robert@example.com',
      interestType: 'Both',
      eventCategories: ['Professional Events', 'Social Activities', 'Family Gatherings'],
      priceRange: 'Economy ($50-80/hr)',
      availabilityPerWeek: 25,
      experienceLevel: 'Intermediate',
      safetyConcerns: 'Somewhat concerned',
      additionalComments: 'I\'m interested in both using the service and offering companionship.',
      submittedAt: '2025-07-06T15:20:00Z'
    },
    { 
      id: '9', 
      userId: '9',
      userName: 'James Miller', 
      email: 'james@example.com',
      interestType: 'Companion',
      eventCategories: ['Professional Events'],
      priceRange: 'Premium ($120-200/hr)',
      availabilityPerWeek: 30,
      experienceLevel: 'Expert',
      safetyConcerns: 'Not concerned',
      additionalComments: 'I specialize in business networking events and conferences.',
      submittedAt: '2025-07-05T09:45:00Z'
    },
  ];

  const [surveys, setSurveys] = useState(initialSurveys);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInterest, setFilterInterest] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const surveysPerPage = 3;

  // Filter surveys based on search term and filters
  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = 
      survey.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      survey.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInterest = filterInterest === 'All' || survey.interestType === filterInterest;
    const matchesCategory = filterCategory === 'All' || 
      (filterCategory === 'Family Gatherings' && survey.eventCategories.includes('Family Gatherings')) ||
      (filterCategory === 'Professional Events' && survey.eventCategories.includes('Professional Events')) ||
      (filterCategory === 'Social Activities' && survey.eventCategories.includes('Social Activities'));
    
    return matchesSearch && matchesInterest && matchesCategory;
  });

  // Pagination
  const indexOfLastSurvey = currentPage * surveysPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveysPerPage;
  const currentSurveys = filteredSurveys.slice(indexOfFirstSurvey, indexOfLastSurvey);
  const totalPages = Math.ceil(filteredSurveys.length / surveysPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Survey Responses</h2>
        <button className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700">
          Export Report
        </button>
      </div>

      {/* Filters and search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by name or email..."
            />
          </div>
        </div>
        <div>
          <label htmlFor="interest" className="sr-only">
            Interest Filter
          </label>
          <select
            id="interest"
            name="interest"
            value={filterInterest}
            onChange={(e) => setFilterInterest(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white sm:text-sm"
          >
            <option value="All">All Interest Types</option>
            <option value="User">User</option>
            <option value="Companion">Companion</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="sr-only">
            Category Filter
          </label>
          <select
            id="category"
            name="category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white sm:text-sm"
          >
            <option value="All">All Categories</option>
            <option value="Family Gatherings">Family Gatherings</option>
            <option value="Professional Events">Professional Events</option>
            <option value="Social Activities">Social Activities</option>
          </select>
        </div>
      </div>

      {/* Survey cards */}
      <div className="space-y-6">
        {currentSurveys.map((survey) => (
          <div key={survey.id} className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {survey.userName}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  {survey.email} · Submitted {formatDate(survey.submittedAt)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  survey.interestType === 'User' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : survey.interestType === 'Companion'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {survey.interestType}
                </span>
                <Link 
                  href={`/dashboard/users/${survey.userId}`}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  View Profile
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Event Categories</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    <ul className="space-y-1">
                      {survey.eventCategories.map((category) => (
                        <li key={category} className="flex items-center">
                          <svg className="h-4 w-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {category}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Price Range</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{survey.priceRange}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Availability (hrs/week)</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{survey.availabilityPerWeek} hours</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience Level</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{survey.experienceLevel}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Safety Concerns</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{survey.safetyConcerns}</dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Additional Comments</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {survey.additionalComments || "No additional comments provided."}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredSurveys.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No survey responses found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{indexOfFirstSurvey + 1}</span> to{' '}
                <span className="font-medium">{Math.min(indexOfLastSurvey, filteredSurveys.length)}</span> of{' '}
                <span className="font-medium">{filteredSurveys.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-300 dark:text-gray-600'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                      currentPage === i + 1
                        ? 'z-10 bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                        : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-300 dark:text-gray-600'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
