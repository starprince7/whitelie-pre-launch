import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import SurveyResponse from '@/app/models/SurveyResponse';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'all';

    const now = new Date();
    let startDate;

    switch (timeframe) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        const firstDayOfWeek = now.getDate() - now.getDay();
        startDate = new Date(now.setDate(firstDayOfWeek));
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        startDate = undefined; // No date filter for 'all'
    }

    const dateFilter = startDate ? { createdAt: { $gte: startDate } } : {};

    const totalResponses = await SurveyResponse.countDocuments(dateFilter);
    const completedResponses = await SurveyResponse.countDocuments({ ...dateFilter, isComplete: true });
    const completionRate = totalResponses > 0 ? (completedResponses / totalResponses) * 100 : 0;

    const userTypeDistribution = await SurveyResponse.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$userType', count: { $sum: 1 } } },
    ]);

    const betaInterestSignups = await SurveyResponse.countDocuments({ ...dateFilter, betaInterest: true });

    const safetyComfortLevel = await SurveyResponse.aggregate([
        { $match: { ...dateFilter, safetyComfortLevel: { $exists: true, $ne: null } } },
        { $group: { _id: null, avgComfort: { $avg: '$safetyComfortLevel' } } },
    ]);

    const averageComfort = safetyComfortLevel.length > 0 ? safetyComfortLevel[0].avgComfort : 0;

    const analytics = {
      totalResponses,
      completedResponses,
      completionRate: parseFloat(completionRate.toFixed(2)),
      userTypeDistribution: userTypeDistribution.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      betaInterestSignups,
      averageSafetyComfort: parseFloat(averageComfort.toFixed(2)),
    };

    return NextResponse.json({ success: true, data: analytics }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching analytics overview:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics overview', error: error.message },
      { status: 500 }
    );
  }
}
