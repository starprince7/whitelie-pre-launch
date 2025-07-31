import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/database";
import NewSurveyResponse from "@/app/lib/models/NewSurveyResponse";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    // Clear existing data
    await NewSurveyResponse.deleteMany({});

    // Sample data for testing
    const sampleResponses = [
      {
        userType: 'client',
        eventAttendanceFrequency: 'sometimes',
        eventTypes: ['weddings', 'corporate_events'],
        hourlyRateComfort: { client: 2500 },
        safetyPriorities: ['identity_verification', 'background_checks'],
        safetyComfortLevel: 8,
        betaInterest: true,
        email: 'client1@example.com',
        ageRange: '25-34',
        location: { state: 'Lagos', city: 'Lagos' },
        source: 'direct',
        isComplete: true,
        completedAt: new Date(),
        currentStep: 10
      },
      {
        userType: 'provider',
        eventAttendanceFrequency: 'often',
        eventTypes: ['social_gatherings', 'networking'],
        hourlyRateComfort: { provider: 3000 },
        providerIncomeInterest: 'very_interested',
        expectedEarnings: '2k-5k',
        safetyPriorities: ['review_system', 'emergency_contacts'],
        safetyComfortLevel: 9,
        betaInterest: true,
        email: 'provider1@example.com',
        ageRange: '18-24',
        location: { state: 'Abuja', city: 'Abuja' },
        source: 'social',
        isComplete: true,
        completedAt: new Date(),
        currentStep: 10
      },
      {
        userType: 'both',
        eventAttendanceFrequency: 'rarely',
        eventTypes: ['dates', 'cultural_events'],
        hourlyRateComfort: { client: 1500, provider: 2000 },
        providerIncomeInterest: 'somewhat_interested',
        expectedEarnings: '1k-2k',
        safetyPriorities: ['in_app_messaging', 'location_sharing'],
        safetyComfortLevel: 7,
        betaInterest: false,
        email: 'both1@example.com',
        ageRange: '35-44',
        location: { state: 'Rivers', city: 'Port Harcourt' },
        source: 'email',
        isComplete: true,
        completedAt: new Date(),
        currentStep: 10
      },
      {
        userType: 'undecided',
        eventAttendanceFrequency: 'never',
        eventTypes: ['other'],
        safetyPriorities: ['identity_verification'],
        safetyComfortLevel: 5,
        betaInterest: true,
        email: 'undecided1@example.com',
        ageRange: '45-54',
        location: { state: 'Kano', city: 'Kano' },
        source: 'referral',
        isComplete: false,
        currentStep: 3
      },
      {
        userType: 'provider',
        eventAttendanceFrequency: 'always',
        eventTypes: ['weddings', 'corporate_events', 'social_gatherings'],
        hourlyRateComfort: { provider: 5000 },
        providerIncomeInterest: 'very_interested',
        expectedEarnings: '5k-10k',
        safetyPriorities: ['background_checks', 'review_system', 'emergency_contacts'],
        safetyComfortLevel: 10,
        betaInterest: true,
        email: 'provider2@example.com',
        ageRange: '25-34',
        location: { state: 'Lagos', city: 'Ikeja' },
        source: 'direct',
        isComplete: true,
        completedAt: new Date(),
        currentStep: 10
      },
      {
        userType: 'client',
        eventAttendanceFrequency: 'sometimes',
        eventTypes: ['networking', 'dates'],
        hourlyRateComfort: { client: 4000 },
        safetyPriorities: ['identity_verification', 'in_app_messaging'],
        safetyComfortLevel: 6,
        betaInterest: false,
        email: 'client2@example.com',
        ageRange: '55+',
        location: { state: 'Ogun', city: 'Abeokuta' },
        source: 'social',
        isComplete: true,
        completedAt: new Date(),
        currentStep: 10
      },
      {
        userType: 'provider',
        eventAttendanceFrequency: 'often',
        eventTypes: ['cultural_events', 'weddings'],
        hourlyRateComfort: { provider: 1800 },
        providerIncomeInterest: 'need_more_info',
        expectedEarnings: 'not_sure',
        safetyPriorities: ['location_sharing', 'review_system'],
        safetyComfortLevel: 8,
        betaInterest: true,
        email: 'provider3@example.com',
        ageRange: '18-24',
        location: { state: 'Kaduna', city: 'Kaduna' },
        source: 'email',
        isComplete: true,
        completedAt: new Date(),
        currentStep: 10
      },
      {
        userType: 'both',
        eventAttendanceFrequency: 'sometimes',
        eventTypes: ['corporate_events', 'networking', 'social_gatherings'],
        hourlyRateComfort: { client: 3500, provider: 4500 },
        providerIncomeInterest: 'very_interested',
        expectedEarnings: '10k+',
        safetyPriorities: ['background_checks', 'identity_verification', 'emergency_contacts'],
        safetyComfortLevel: 9,
        betaInterest: true,
        email: 'both2@example.com',
        ageRange: '35-44',
        location: { state: 'Enugu', city: 'Enugu' },
        source: 'referral',
        isComplete: true,
        completedAt: new Date(),
        currentStep: 10
      },
      {
        userType: 'client',
        eventAttendanceFrequency: 'rarely',
        eventTypes: ['dates'],
        hourlyRateComfort: { client: 2000 },
        safetyPriorities: ['in_app_messaging'],
        safetyComfortLevel: 4,
        betaInterest: false,
        email: 'client3@example.com',
        ageRange: '25-34',
        location: { state: 'Delta', city: 'Warri' },
        source: 'direct',
        isComplete: false,
        currentStep: 5
      },
      {
        userType: 'provider',
        eventAttendanceFrequency: 'often',
        eventTypes: ['weddings', 'social_gatherings', 'cultural_events'],
        hourlyRateComfort: { provider: 6000 },
        providerIncomeInterest: 'somewhat_interested',
        expectedEarnings: '5k-10k',
        safetyPriorities: ['review_system', 'background_checks'],
        safetyComfortLevel: 7,
        betaInterest: true,
        email: 'provider4@example.com',
        ageRange: '45-54',
        location: { state: 'Plateau', city: 'Jos' },
        source: 'social',
        isComplete: true,
        completedAt: new Date(),
        currentStep: 10
      }
    ];

    // Add some responses from different dates for the timeline chart
    const dates = [
      new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
      new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),  // 5 days ago
    ];

    // Create responses with different dates
    const responsesWithDates = sampleResponses.map((response, index) => ({
      ...response,
      createdAt: dates[index % dates.length] || new Date(),
      completedAt: response.isComplete ? (dates[index % dates.length] || new Date()) : undefined
    }));

    // Insert the sample data
    await NewSurveyResponse.insertMany(responsesWithDates);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${responsesWithDates.length} survey responses`,
      count: responsesWithDates.length
    });

  } catch (error) {
    console.error("Error seeding survey data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed survey data" },
      { status: 500 }
    );
  }
}
