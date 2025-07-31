import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/database";
import SurveyResponse from "@/app/models/SurveyResponse";
import { getServerSession } from "next-auth";

// Helper function to check admin authentication
async function isAdminAuthenticated() {
  try {
    const session = await getServerSession();
    // Add your admin authentication logic here
    // For now, we'll allow access if there's a session
    return !!session;
  } catch (error) {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Re-enable admin authentication in production
    // const isAdmin = await isAdminAuthenticated();
    // if (!isAdmin) {
    //   return NextResponse.json(
    //     { success: false, error: "Unauthorized access" },
    //     { status: 401 }
    //   );
    // }

    await connectToDatabase();

    // Get query parameters
    const url = new URL(request.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const userType = url.searchParams.get("userType");
    const isComplete = url.searchParams.get("isComplete");

    // Build filter query
    const filter: any = {};
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    
    if (userType && userType !== 'all') {
      filter.userType = userType;
    }
    
    if (isComplete !== null && isComplete !== undefined) {
      filter.isComplete = isComplete === 'true';
    }

    // Get all survey responses matching the filter
    const responses = await SurveyResponse.find(filter).lean();

    // Calculate aggregated data
    const totalResponses = responses.length;
    const completedResponses = responses.filter(r => r.isComplete).length;

    // User type distribution
    const userTypeDistribution = [
      { name: 'Client', value: responses.filter(r => r.userType === 'client').length },
      { name: 'Provider', value: responses.filter(r => r.userType === 'provider').length },
      { name: 'Both', value: responses.filter(r => r.userType === 'both').length },
      { name: 'Undecided', value: responses.filter(r => r.userType === 'undecided').length },
    ].filter(item => item.value > 0);

    // Event type preferences (flatten and count)
    const eventTypeCounts: { [key: string]: number } = {};
    responses.forEach(r => {
      if (r.eventTypes) {
        r.eventTypes.forEach(type => {
          eventTypeCounts[type] = (eventTypeCounts[type] || 0) + 1;
        });
      }
    });
    const eventTypePreferences = Object.entries(eventTypeCounts).map(([name, value]) => ({
      name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value
    }));

    // Safety priorities
    const safetyPriorityCounts: { [key: string]: number } = {};
    responses.forEach(r => {
      if (r.safetyPriorities) {
        r.safetyPriorities.forEach(priority => {
          safetyPriorityCounts[priority] = (safetyPriorityCounts[priority] || 0) + 1;
        });
      }
    });
    const safetyPriorities = Object.entries(safetyPriorityCounts).map(([name, value]) => ({
      name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value
    }));

    // Hourly rate comfort
    const clientRates: { [key: string]: number } = {};
    const providerRates: { [key: string]: number } = {};
    
    responses.forEach(r => {
      if (r.hourlyRateComfort?.client) {
        const range = getRateRange(r.hourlyRateComfort.client);
        clientRates[range] = (clientRates[range] || 0) + 1;
      }
      if (r.hourlyRateComfort?.provider) {
        const range = getRateRange(r.hourlyRateComfort.provider);
        providerRates[range] = (providerRates[range] || 0) + 1;
      }
    });

    const hourlyRateComfort = {
      client: Object.entries(clientRates).map(([range, count]) => ({ range, count })),
      provider: Object.entries(providerRates).map(([range, count]) => ({ range, count }))
    };

    // Provider income interest
    const providerIncomeInterest = [
      { name: 'Very Interested', value: responses.filter(r => r.providerIncomeInterest === 'very_interested').length },
      { name: 'Somewhat Interested', value: responses.filter(r => r.providerIncomeInterest === 'somewhat_interested').length },
      { name: 'Not Interested', value: responses.filter(r => r.providerIncomeInterest === 'not_interested').length },
      { name: 'Need More Info', value: responses.filter(r => r.providerIncomeInterest === 'need_more_info').length },
    ].filter(item => item.value > 0);

    // Expected earnings
    const expectedEarnings = [
      { name: '₦1k-2k', value: responses.filter(r => r.expectedEarnings === '1k-2k').length },
      { name: '₦2k-5k', value: responses.filter(r => r.expectedEarnings === '2k-5k').length },
      { name: '₦5k-10k', value: responses.filter(r => r.expectedEarnings === '5k-10k').length },
      { name: '₦10k+', value: responses.filter(r => r.expectedEarnings === '10k+').length },
      { name: 'Not Sure', value: responses.filter(r => r.expectedEarnings === 'not_sure').length },
    ].filter(item => item.value > 0);

    // Responses by date (last 30 days)
    const responsesByDate = getResponsesByDate(responses);

    // Age range distribution
    const ageRangeDistribution = [
      { name: '18-24', value: responses.filter(r => r.ageRange === '18-24').length },
      { name: '25-34', value: responses.filter(r => r.ageRange === '25-34').length },
      { name: '35-44', value: responses.filter(r => r.ageRange === '35-44').length },
      { name: '45-54', value: responses.filter(r => r.ageRange === '45-54').length },
      { name: '55+', value: responses.filter(r => r.ageRange === '55+').length },
    ].filter(item => item.value > 0);

    // Location distribution (top 10 states)
    const locationCounts: { [key: string]: number } = {};
    responses.forEach(r => {
      if (r.location?.state) {
        locationCounts[r.location.state] = (locationCounts[r.location.state] || 0) + 1;
      }
    });
    const locationDistribution = Object.entries(locationCounts)
      .map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Source distribution
    const sourceDistribution = [
      { name: 'Direct', value: responses.filter(r => r.source === 'direct').length },
      { name: 'Email', value: responses.filter(r => r.source === 'email').length },
      { name: 'Social', value: responses.filter(r => r.source === 'social').length },
      { name: 'Referral', value: responses.filter(r => r.source === 'referral').length },
    ].filter(item => item.value > 0);

    // Beta interest count
    const betaInterestCount = responses.filter(r => r.betaInterest).length;

    const data = {
      totalResponses,
      completedResponses,
      userTypeDistribution,
      eventTypePreferences,
      safetyPriorities,
      hourlyRateComfort,
      providerIncomeInterest,
      expectedEarnings,
      responsesByDate,
      ageRangeDistribution,
      locationDistribution,
      sourceDistribution,
      betaInterestCount,
    };

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error("Error fetching survey responses:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch survey responses" },
      { status: 500 }
    );
  }
}

// Helper function to categorize hourly rates
function getRateRange(rate: number): string {
  if (rate < 1000) return '₦0-999';
  if (rate < 2000) return '₦1k-1.9k';
  if (rate < 3000) return '₦2k-2.9k';
  if (rate < 5000) return '₦3k-4.9k';
  if (rate < 10000) return '₦5k-9.9k';
  return '₦10k+';
}

// Helper function to get responses by date (last 30 days)
function getResponsesByDate(responses: any[]): Array<{ date: string; count: number }> {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const responsesByDate: { [key: string]: number } = {};
  
  responses.forEach(r => {
    const date = new Date(r.createdAt).toISOString().split('T')[0];
    responsesByDate[date] = (responsesByDate[date] || 0) + 1;
  });

  return last30Days.map(date => ({
    date,
    count: responsesByDate[date] || 0
  }));
}
