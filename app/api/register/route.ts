import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, location, password, confirmPassword } = body || {};

    
    if (!name || !email || !location || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already in use." },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      location,
      password: hashed,
    });

    return NextResponse.json(
      { success: true, message: "Account created successfully. Please sign in." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[REGISTER_POST]", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
