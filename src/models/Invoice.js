import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: String,
      required: [true, "Invoice ID is required"],
      unique: true,
      trim: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient reference is required"],
    },

    claim: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Claim",
      required: [true, "Claim reference is required"],
    },

    amount: {
      type: Number,
      required: [true, "Invoice amount is required"],
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
    },

    issuedDate: {
      type: Date,
      required: [true, "Issued date is required"],
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    notes: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Prevent model overwrite in development
export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);