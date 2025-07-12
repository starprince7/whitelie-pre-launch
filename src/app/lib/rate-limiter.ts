import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for rate limiting
// Note: This will reset on server restart and won't work across multiple instances
// For production, use a proper Redis-based solution
type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

interface RateLimitConfig {
  limit: number;
  window: number; // in seconds
}

// Define rate limit configs for different endpoints
const rateLimitConfigs: Record<string, RateLimitConfig> = {
  default: { limit: 30, window: 60 }, // 30 requests per minute
  '/api/users': { limit: 10, window: 60 }, // 10 requests per minute for user creation
  '/api/surveys': { limit: 5, window: 60 }, // 5 requests per minute for survey submissions
};

export async function rateLimit(request: NextRequest, path: string) {
  // Skip rate limiting in development environment
  if (process.env.NODE_ENV === 'development') {
    return { success: true, limit: 0, remaining: 0 };
  }

  try {
    // Get IP address from request
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    
    // Get rate limit config for the path
    const config = rateLimitConfigs[path] || rateLimitConfigs.default;
    const { limit, window } = config;

    // Create a unique key for this IP and path
    const key = `rate-limit:${ip}:${path}`;
    const now = Date.now();

    // Get or create rate limit entry
    let entry = rateLimitStore.get(key);
    if (!entry || entry.resetAt <= now) {
      // Create new entry if none exists or the existing one has expired
      entry = { count: 0, resetAt: now + (window * 1000) };
    }

    // If count is at limit, return error
    if (entry.count >= limit) {
      return {
        success: false,
        limit,
        remaining: 0,
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil((entry.resetAt - now) / 1000)
      };
    }

    // Increment count and store
    entry.count += 1;
    rateLimitStore.set(key, entry);

    // Return success with remaining count
    return {
      success: true,
      limit,
      remaining: limit - entry.count,
    };
  } catch (e) {
    // If rate limiting fails for any reason, allow the request to proceed
    console.error('Rate limiting error:', e);
    return { success: true, limit: 0, remaining: 0 };
  }
}

export function rateLimitResponse(message: string, retryAfter: number = 60) {
  return NextResponse.json(
    { error: message },
    { 
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
        'Content-Type': 'application/json'
      }
    }
  );
}
