import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Waitlist from '@/models/Waitlist';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email address is required.' }, { status: 400 });
    }

    const user = await Waitlist.findOne({ email });

    if (!user) {
      // Even if user is not found, we send a success response to prevent email enumeration.
      return NextResponse.json({ message: 'You have been successfully unsubscribed.' }, { status: 200 });
    }

    user.emailOptIn = false;
    user.status = 'unsubscribed';
    await user.save();

    return NextResponse.json(
      { message: 'You have been successfully unsubscribed.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unsubscribe API Error:', error);
    // We send a generic success message here as well to not expose internal errors.
    return NextResponse.json({ message: 'You have been successfully unsubscribed.' }, { status: 200 });
  }
}
