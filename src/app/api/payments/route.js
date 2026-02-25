import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
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

    // Fetch all payments, sorted by latest first
    const payments = await Payment.find().sort({ createdAt: -1 });

    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    console.error("Fetch payments error:", error);
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

    const { patientId, invoiceId, amount, paymentMethod, status, notes } = await req.json();

    // Basic validation
    if (!patientId || !invoiceId || !amount || !paymentMethod) {
      return NextResponse.json(
        { message: "Patient, invoice, amount, and payment method are required" },
        { status: 400 }
      );
    }

    // Create new payment
    const newPayment = await Payment.create({
      patientId,
      invoiceId,
      amount,
      paymentMethod,
      status: status || "Completed",
      notes: notes || "",
      createdBy: user.id,
    });

    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    console.error("Create payment error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}