import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import SurveyResponse from '@/app/models/SurveyResponse';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Survey response ID is required'
      }, { status: 400 });
    }

    await connectToDatabase();

    const response = await SurveyResponse.findOne({ responseId: id }).lean();

    if (!response) {
      return NextResponse.json({
        success: false,
        message: 'Survey response not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: response
    });
  } catch (error: any) {
    console.error('Error fetching survey response:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'An error occurred while fetching the survey response'
    }, { status: 500 });
  }
}
