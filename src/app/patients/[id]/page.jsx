'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams(); // { id: "P001" }

  const [patient, setPatient] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    lastVisit: "",
    notes: "",
  });

  // Fetch patient data from API or MongoDB (placeholder for now)
  useEffect(() => {
    // Replace with real API fetch
    const fetchPatient = async () => {
      const mockData = {
        fullName: "John Smith",
        age: 34,
        gender: "Male",
        phone: "+1 555-123-4567",
        email: "john.smith@example.com",
        address: "123 Main Street, City, Country",
        lastVisit: "2026-01-20",
        notes: "Allergic to penicillin",
      };
      setPatient(mockData);
    };
    fetchPatient();
  }, [params.id]);

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated Patient Data:", patient);
    alert("Patient details updated successfully!");
    // Call your API to update MongoDB here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Patient Details
          </h1>
          <p className="text-gray-500 mt-2">
            View and edit patient information for ID: <strong>{params.id}</strong>
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Back
        </button>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={patient.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={patient.age}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Gender</label>
            <select
              name="gender"
              value={patient.gender}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={patient.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={patient.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Last Visit</label>
            <input
              type="date"
              name="lastVisit"
              value={patient.lastVisit}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Address</label>
          <textarea
            name="address"
            value={patient.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Notes</label>
          <textarea
            name="notes"
            value={patient.notes}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Save Changes
        </button>
      </motion.form>

    </div>
  );
}