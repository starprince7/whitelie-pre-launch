import { NextRequest, NextResponse } from 'next/server';
import SurveyResponse from '@/app/models/SurveyResponse';
import { connectToDatabase } from '@/app/lib/db';
import { sendCompletionEmail, sendBetaWaitlistEmail, sendAdminNotification } from '@/app/lib/resend';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const data = await req.json();
    
    // Get IP and user agent info
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Prepare survey data
    const surveyData = {
      ...data,
      ipAddress,
      userAgent,
      isComplete: data.currentStep === 6, // Mark as complete if reached final step
      completedAt: data.currentStep === 6 ? new Date() : undefined
    };
    
    // Check if the survey response already exists (for incremental updates)
    if (data.responseId) {
      const existingResponse = await SurveyResponse.findOne({ responseId: data.responseId });
      
      if (existingResponse) {
        // Update existing response
        const updatedResponse = await SurveyResponse.findOneAndUpdate(
          { responseId: data.responseId },
          surveyData,
          { new: true }
        );
        
        // Handle email notifications if survey is complete
        if (updatedResponse.isComplete && updatedResponse.email) {
          // Send completion email
          await sendCompletionEmail(updatedResponse.email);
          
          // If user opted for beta, send beta waitlist email
          if (updatedResponse.betaInterest) {
            await sendBetaWaitlistEmail(updatedResponse.email);
          }
          
          // Send notification to admin
          await sendAdminNotification(updatedResponse);
        }
        
        return NextResponse.json({ 
          success: true, 
          message: "Survey response updated successfully", 
          data: updatedResponse 
        });
      }
    }
    
    // Create new survey response
    const newResponse = await SurveyResponse.create(surveyData);
    
    // If survey is complete and email provided, send emails
    if (newResponse.isComplete && newResponse.email) {
      // Send completion email
      await sendCompletionEmail(newResponse.email);
      
      // If user opted for beta, send beta waitlist email
      if (newResponse.betaInterest) {
        await sendBetaWaitlistEmail(newResponse.email);
      }
      
      // Send notification to admin
      await sendAdminNotification(newResponse);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Survey response saved successfully", 
      data: newResponse 
    });
  } catch (error: any) {
    console.error('Error saving survey response:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Error saving survey response" 
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Check for authentication in a real app
    // This endpoint would typically be protected
    
    // Parse query parameters
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const userType = searchParams.get('userType');
    const isComplete = searchParams.get('isComplete');
    const betaInterest = searchParams.get('betaInterest');
    
    // Build query
    const query: any = {};
    
    if (userType) query.userType = userType;
    if (isComplete) query.isComplete = isComplete === 'true';
    if (betaInterest) query.betaInterest = betaInterest === 'true';
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get survey responses
    const responses = await SurveyResponse.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const totalCount = await SurveyResponse.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: responses,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit
      }
    });
  } catch (error: any) {
    console.error('Error fetching survey responses:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Error fetching survey responses" 
      },
      { status: 500 }
    );
  }
}
