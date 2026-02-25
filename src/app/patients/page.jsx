'use client';

import { motion } from "framer-motion";
import { useState } from "react";

export default function PatientsPage() {
  const [patients, setPatients] = useState([
    { id: "P001", name: "John Smith", age: 34, phone: "+1 555-123-4567", lastVisit: "2026-01-20" },
    { id: "P002", name: "Sarah Lee", age: 28, phone: "+1 555-987-6543", lastVisit: "2026-01-22" },
    { id: "P003", name: "Michael Brown", age: 45, phone: "+1 555-654-3210", lastVisit: "2026-01-24" },
  ]);

  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
          <p className="text-gray-500 mt-2">
            Manage your patient records, view history, and create new profiles.
          </p>
        </div>

        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition">
          + Add Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border rounded-lg p-3"
        />
      </div>

      {/* Patients Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-md overflow-x-auto"
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Patient ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.phone}</td>
                  <td>{p.lastVisit}</td>
                  <td>
                    <button className="text-blue-600 hover:underline mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

    </div>
  );
}