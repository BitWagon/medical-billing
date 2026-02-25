import { NextResponse } from "next/server";
import Invoice from "@/models/Invoice";
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

    // Fetch all invoices, sorted by latest first
    const invoices = await Invoice.find().sort({ createdAt: -1 });

    return NextResponse.json(invoices, { status: 200 });
  } catch (error) {
    console.error("Fetch invoices error:", error);
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

    const { patientId, invoiceNumber, amount, dueDate, status, description } = await req.json();

    // Basic validation
    if (!patientId || !invoiceNumber || !amount || !dueDate) {
      return NextResponse.json(
        { message: "Patient, invoice number, amount, and due date are required" },
        { status: 400 }
      );
    }

    // Check for duplicate invoice number
    const existingInvoice = await Invoice.findOne({ invoiceNumber });
    if (existingInvoice) {
      return NextResponse.json(
        { message: "Invoice number already exists" },
        { status: 409 }
      );
    }

    // Create new invoice
    const newInvoice = await Invoice.create({
      patientId,
      invoiceNumber,
      amount,
      dueDate,
      status: status || "Unpaid",
      description: description || "",
      createdBy: user.id,
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error("Create invoice error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}