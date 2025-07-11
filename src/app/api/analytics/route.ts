import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/database";
import Analytics from "@/app/lib/models/Analytics";
import User from "@/app/lib/models/User";
import SurveyResponse from "@/app/lib/models/SurveyResponse";

// GET analytics data
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get timeframe from query parameters
    const url = new URL(request.url);
    const timeframe = url.searchParams.get("timeframe") || "all";
    let dateFilter = {};
    
    const now = new Date();
    
    // Apply date filters based on timeframe
    if (timeframe === "today") {
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      dateFilter = { date: { $gte: startOfDay } };
    } else if (timeframe === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      dateFilter = { date: { $gte: startOfWeek } };
    } else if (timeframe === "month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      dateFilter = { date: { $gte: startOfMonth } };
    }
    
    // Get most recent analytics data
    const analytics = await Analytics.find(dateFilter)
      .sort({ date: -1 })
      .limit(1);
    
    // If no analytics data exists or it's stale, generate new data
    if (analytics.length === 0 || new Date().getTime() - analytics[0].updatedAt.getTime() > 3600000) {
      // Generate new analytics data
      const newAnalytics = await generateAnalyticsData();
      return NextResponse.json({ analytics: newAnalytics }, { status: 200 });
    }
    
    return NextResponse.json({ analytics: analytics[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}

// Helper function to generate analytics data
async function generateAnalyticsData() {
  // Get total signups
  const totalSignups = await User.countDocuments({});
  
  // Get survey completions
  const surveyCompletions = await User.countDocuments({ surveyCompleted: true });
  
  // Calculate conversion rate
  const conversionRate = totalSignups > 0 ? (surveyCompletions / totalSignups) * 100 : 0;
  
  // Get geographic distribution
  const geoDistributionAgg = await User.aggregate([
    { $match: { "location.country": { $exists: true } } },
    { $group: { 
      _id: "$location.country", 
      count: { $sum: 1 } 
    } }
  ]);
  
  const geographicDistribution = new Map();
  geoDistributionAgg.forEach(geo => {
    geographicDistribution.set(geo._id, geo.count);
  });
  
  // Get segmentation data
  const segmentationAgg = await SurveyResponse.aggregate([
    { $group: { 
      _id: "$responses.interestType", 
      count: { $sum: 1 } 
    } }
  ]);
  
  const segmentationData = {
    seekers: 0,
    providers: 0,
    both: 0
  };
  
  segmentationAgg.forEach(segment => {
    if (segment._id === "seeking") segmentationData.seekers = segment.count;
    if (segment._id === "providing") segmentationData.providers = segment.count;
    if (segment._id === "both") segmentationData.both = segment.count;
  });
  
  // Get sentiment analysis
  const sentimentAgg = await SurveyResponse.aggregate([
    { $project: {
      sentiment: {
        $cond: { 
          if: { $gt: ["$sentimentScore", 0.5] }, 
          then: "positive",
          else: { 
            $cond: { 
              if: { $lt: ["$sentimentScore", -0.5] }, 
              then: "negative", 
              else: "neutral" 
            }
          }
        }
      }
    }},
    { $group: { 
      _id: "$sentiment", 
      count: { $sum: 1 } 
    }}
  ]);
  
  const sentimentAnalysis = {
    positive: 0,
    neutral: 0,
    negative: 0
  };
  
  sentimentAgg.forEach(segment => {
    if (segment._id === "positive" || segment._id === "neutral" || segment._id === "negative") {
      sentimentAnalysis[segment._id as keyof typeof sentimentAnalysis] = segment.count;
    }
  });
  
  // Create or update analytics record
  const analytics = await Analytics.create({
    date: new Date(),
    metrics: {
      totalSignups,
      surveyCompletions,
      conversionRate,
      geographicDistribution,
      segmentationData,
      sentimentAnalysis
    },
    updatedAt: new Date()
  });
  
  return analytics;
}
