import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/database";
import SurveyResponse from "@/app/lib/models/SurveyResponse";
import mongoose from "mongoose";

// GET survey by ID - Using Next.js 15 Promise-based params pattern
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ surveyId: string }> }
) {
  try {
    await connectToDatabase();
    
    // Must await params as per Next.js 15 requirement
    const { surveyId } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(surveyId)) {
      return NextResponse.json(
        { error: "Invalid survey ID format" },
        { status: 400 }
      );
    }
    
    const survey = await SurveyResponse.findById(surveyId)
      .populate("userId", "email");
    
    if (!survey) {
      return NextResponse.json(
        { error: "Survey response not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ survey }, { status: 200 });
  } catch (error) {
    console.error("Error fetching survey:", error);
    return NextResponse.json(
      { error: "Failed to fetch survey response" },
      { status: 500 }
    );
  }
}

// UPDATE survey by ID - Using Next.js 15 Promise-based params pattern
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ surveyId: string }> }
) {
  try {
    await connectToDatabase();
    
    // Must await params as per Next.js 15 requirement
    const { surveyId } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(surveyId)) {
      return NextResponse.json(
        { error: "Invalid survey ID format" },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    const updatedSurvey = await SurveyResponse.findByIdAndUpdate(
      surveyId,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedSurvey) {
      return NextResponse.json(
        { error: "Survey response not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Survey response updated successfully", survey: updatedSurvey },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating survey:", error);
    return NextResponse.json(
      { error: "Failed to update survey response" },
      { status: 500 }
    );
  }
}

// DELETE survey by ID - Using Next.js 15 Promise-based params pattern
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ surveyId: string }> }
) {
  try {
    await connectToDatabase();
    
    // Must await params as per Next.js 15 requirement
    const { surveyId } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(surveyId)) {
      return NextResponse.json(
        { error: "Invalid survey ID format" },
        { status: 400 }
      );
    }
    
    const deletedSurvey = await SurveyResponse.findByIdAndDelete(surveyId);
    
    if (!deletedSurvey) {
      return NextResponse.json(
        { error: "Survey response not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Survey response deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting survey:", error);
    return NextResponse.json(
      { error: "Failed to delete survey response" },
      { status: 500 }
    );
  }
}
