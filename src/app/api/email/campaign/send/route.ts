import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Waitlist from '@/models/Waitlist';
import { sendEmail } from '@/lib/services/emailService';
import ConceptIntroEmail from '@/lib/email/templates/ConceptIntroEmail';

// This is a protected route, in a real app you'd have authentication
export async function POST(request: Request) {
  try {
    // In a real application, you would protect this endpoint with authentication
    // For example, checking for an admin user session or an API key
    const { apiKey } = await request.json();
    if (apiKey !== process.env.INTERNAL_API_KEY) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const users = await Waitlist.find({ emailOptIn: true, status: 'active' });

    if (users.length === 0) {
      return NextResponse.json({ message: 'No users to send to.' }, { status: 200 });
    }

    let sentCount = 0;
    for (const user of users) {
      const { success } = await sendEmail({
        to: user.email,
        subject: 'Introducing WhiteLie - Your Perfect Event Companion (+ Earning Opportunity)',
        react: ConceptIntroEmail({ user }) as React.ReactElement,
      });
      if(success) sentCount++;
    }

    return NextResponse.json(
      { message: `Campaign sent to ${sentCount} of ${users.length} users.` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Campaign Send API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
