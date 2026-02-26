import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: [true, "Payment ID is required"],
      unique: true,
      trim: true,
    },

    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: [true, "Invoice reference is required"],
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient reference is required"],
    },

    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Credit Card", "Insurance", "Other"],
      default: "Cash",
    },

    paymentDate: {
      type: Date,
      required: [true, "Payment date is required"],
      default: Date.now,
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
    timestamps: true, // createdAt & updatedAt
  }
);

// Prevent model overwrite in development
export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);