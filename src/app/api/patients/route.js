import { NextResponse } from "next/server";
import Patient from "@/models/Patient";
import connectDB from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";

// Connect to MongoDB
connectDB();

export async function GET(req) {
  try {
    // Optionally authenticate
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const patients = await Patient.find().sort({ createdAt: -1 });

    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error("Fetch patients error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, email, phone, dob, address } = await req.json();

    // Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Check if patient already exists by email
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return NextResponse.json(
        { message: "Patient with this email already exists" },
        { status: 409 }
      );
    }

    // Create new patient
    const newPatient = await Patient.create({
      name,
      email,
      phone,
      dob: dob || null,
      address: address || "",
      createdBy: user.id,
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error("Create patient error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}