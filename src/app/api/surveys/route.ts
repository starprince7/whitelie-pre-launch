import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/database";
import SurveyResponse from "@/app/lib/models/SurveyResponse";
import User from "@/app/lib/models/User";
import mongoose from "mongoose";

// GET all survey responses
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get pagination parameters from query
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    
    const skip = (page - 1) * limit;
    
    const surveys = await SurveyResponse.find({})
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "email");
    
    const total = await SurveyResponse.countDocuments({});
    
    return NextResponse.json(
      { 
        surveys,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json(
      { error: "Failed to fetch survey responses" },
      { status: 500 }
    );
  }
}

// POST a new survey response
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      const body = await request.json();
      
      // Basic validation
      if (!body.userId || !body.responses) {
        return NextResponse.json(
          { error: "User ID and survey responses are required" },
          { status: 400 }
        );
      }
      
      // Check if user exists
      const user = await User.findById(body.userId).session(session);
      
      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
      
      // Create new survey response
      const newSurveyResponse = await SurveyResponse.create([{
        userId: body.userId,
        responses: {
          interestType: body.responses.interestType,
          eventCategories: body.responses.eventCategories,
          pricingSensitivity: body.responses.pricingSensitivity,
          availabilityPerWeek: body.responses.availabilityPerWeek,
          experience: body.responses.experience,
          safetyConcerns: body.responses.safetyConcerns,
          additionalComments: body.responses.additionalComments
        },
        sentimentScore: body.sentimentScore || 0,
      }], { session });
      
      // Update user with survey completed status and reference
      await User.findByIdAndUpdate(
        body.userId,
        { 
          surveyCompleted: true, 
          surveyResponse: newSurveyResponse[0]._id
        },
        { session }
      );
      
      await session.commitTransaction();
      
      return NextResponse.json(
        { 
          message: "Survey response created successfully", 
          survey: newSurveyResponse[0] 
        },
        { status: 201 }
      );
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Error creating survey response:", error);
    return NextResponse.json(
      { error: "Failed to create survey response" },
      { status: 500 }
    );
  }
}
