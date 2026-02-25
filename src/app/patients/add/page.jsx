'use client';

import { useState } from "react";
import { motion } from "framer-motion";

export default function AddPatientPage() {
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

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Data:", patient);
    alert("Patient added successfully!");
    setPatient({
      fullName: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      lastVisit: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Add New Patient</h1>
        <p className="text-gray-500 mt-2">
          Fill out the patient details and save to your medical billing database.
        </p>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
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
          Save Patient
        </button>
      </motion.form>

    </div>
  );
}