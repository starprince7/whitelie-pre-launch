import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/database";
import User from "@/app/lib/models/User";
import { z } from "zod";
import { rateLimit, rateLimitResponse } from "@/app/lib/rate-limiter";

// GET all users
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .limit(100); // Limiting to 100 for performance
    
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST a new user (email capture)
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Basic validation
    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email.toLowerCase() });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "User already registered", user: existingUser },
        { status: 200 }
      );
    }
    
    // Create new user
    const newUser = await User.create({
      email: body.email.toLowerCase(),
      source: body.source || "direct",
      location: body.location || {}
    });
    
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
