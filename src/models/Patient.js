import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: [true, "Patient ID is required"],
      unique: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },

    address: {
      type: String,
      trim: true,
    },

    medicalHistory: {
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
export default mongoose.models.Patient ||
  mongoose.model("Patient", PatientSchema);