import { NextResponse } from "next/server";
import Claim from "@/models/Claim";
import connectDB from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";

// Connect to MongoDB
connectDB();

export async function GET(req) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch all claims, sorted by creation date
    const claims = await Claim.find().sort({ createdAt: -1 });

    return NextResponse.json(claims, { status: 200 });
  } catch (error) {
    console.error("Fetch claims error:", error);
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

    const { patientId, claimNumber, amount, status, description } = await req.json();

    // Basic validation
    if (!patientId || !claimNumber || !amount) {
      return NextResponse.json(
        { message: "Patient, claim number, and amount are required" },
        { status: 400 }
      );
    }

    // Optional: check if claimNumber already exists
    const existingClaim = await Claim.findOne({ claimNumber });
    if (existingClaim) {
      return NextResponse.json(
        { message: "Claim number already exists" },
        { status: 409 }
      );
    }

    // Create new claim
    const newClaim = await Claim.create({
      patientId,
      claimNumber,
      amount,
      status: status || "Pending",
      description: description || "",
      createdBy: user.id,
    });

    return NextResponse.json(newClaim, { status: 201 });
  } catch (error) {
    console.error("Create claim error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}