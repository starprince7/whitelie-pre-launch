import { NextResponse } from 'next/server';
import { seedDatabase } from '@/app/lib/seed';

export async function GET() {
  try {
    // Only allow this in development for security
    // if (process.env.NODE_ENV !== 'development' && !process.env.ALLOW_SEEDING) {
    //   return NextResponse.json(
    //     { error: 'Seeding is only allowed in development environment' },
    //     { status: 403 }
    //   );
    // }

    await seedDatabase();
    
    return NextResponse.json(
      { success: true, message: 'Database seeded successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in seed route:', error);
    
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed database' },
      { status: 500 }
    );
  }
}
