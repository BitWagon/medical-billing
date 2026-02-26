import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema(
  {
    claimId: {
      type: String,
      required: [true, "Claim ID is required"],
      unique: true,
      trim: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient reference is required"],
    },

    providerName: {
      type: String,
      required: [true, "Provider Name is required"],
      trim: true,
    },

    serviceDate: {
      type: Date,
      required: [true, "Service date is required"],
    },

    amount: {
      type: Number,
      required: [true, "Claim amount is required"],
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Denied"],
      default: "Pending",
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
export default mongoose.models.Claim ||
  mongoose.model("Claim", ClaimSchema);