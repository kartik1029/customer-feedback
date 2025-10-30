import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Customer from "@/app/models/Customer";

const MONGODB_URI = process.env.MONGODB_URI || "";

export async function POST(req: Request) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(MONGODB_URI);
    }

    const { name, email, location, foodItem, rating, feedback } = await req.json();

    const newCustomer = new Customer({
      name,
      email,
      location,
      foodItem,
      rating,
      feedback,
    });

    await newCustomer.save();

    return NextResponse.json({ success: true, message: "Customer added successfully!" });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json({ success: false, message: "Error saving data" }, { status: 500 });
  }
}

// Fetch all customers (GET)
export async function GET() {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(MONGODB_URI);
    }

    const customers = await Customer.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ success: false, message: "Error fetching data" }, { status: 500 });
  }
}
