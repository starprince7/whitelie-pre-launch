import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory store for rate limiting
// In production, use Redis or another external store
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();
const WINDOW_SIZE_IN_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per minute per IP for survey submissions

export function middleware(request: NextRequest) {
  // Only rate limit POST requests to /api/survey
  if (request.method === 'POST' && request.nextUrl.pathname === '/api/survey') {
    // Use x-forwarded-for header to identify client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Clean up old records every 50 requests (to prevent memory leaks)
    if (ipRequestCounts.size > 50) {
      const now = Date.now();
      for (const [key, value] of ipRequestCounts.entries()) {
        if (now - value.timestamp > WINDOW_SIZE_IN_MS) {
          ipRequestCounts.delete(key);
        }
      }
    }
    
    // Get current count for IP or initialize
    const record = ipRequestCounts.get(ip) || { count: 0, timestamp: Date.now() };
    
    // Reset count if outside window
    if (Date.now() - record.timestamp > WINDOW_SIZE_IN_MS) {
      record.count = 0;
      record.timestamp = Date.now();
    }
    
    // Increment count and update timestamp
    record.count++;
    ipRequestCounts.set(ip, record);
    
    // Block if too many requests
    if (record.count > MAX_REQUESTS_PER_WINDOW) {
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          message: 'Too many requests, please try again later' 
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60'
          }
        }
      );
    }
  }

  return NextResponse.next();
}

// Configure middleware to run only for API routes
export const config = {
  matcher: '/api/:path*',
};
