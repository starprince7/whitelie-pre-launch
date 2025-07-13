import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Waitlist, { IWaitlist } from '@/models/Waitlist';
import { sendEmail } from '@/lib/services/emailService';
import WelcomeEmail from '@/lib/email/templates/WelcomeEmail';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email, userType } = await request.json();

    if (!email || !userType) {
      return NextResponse.json({ message: 'Email and user type are required.' }, { status: 400 });
    }

    const existingUser = await Waitlist.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'This email is already on the waitlist.' }, { status: 409 });
    }

    const newUser: Partial<IWaitlist> = {
      email,
      userType,
      source: 'landing_page',
      status: 'active',
      priority: 'medium',
      ipAddress: request.headers.get('x-forwarded-for') ?? request.headers.get('remote-addr') ?? undefined,
      userAgent: request.headers.get('user-agent') ?? undefined,
    };

    const createdUser = await Waitlist.create(newUser);

    // Send welcome email
    await sendEmail({
      to: createdUser.email,
      subject: 'Welcome to the WhiteLie Professional Network!',
      react: WelcomeEmail({ firstName: createdUser.firstName }),
    });

    return NextResponse.json(
      { message: 'Successfully joined the waitlist!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
