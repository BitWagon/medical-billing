'use client';

import { useState } from "react";
import { motion } from "framer-motion";

export default function ClaimsPage() {
  const [claims, setClaims] = useState([
    { id: "C001", patient: "John Smith", amount: 1200, status: "Approved", date: "2026-01-20" },
    { id: "C002", patient: "Sarah Lee", amount: 800, status: "Pending", date: "2026-01-22" },
    { id: "C003", patient: "Michael Brown", amount: 950, status: "Denied", date: "2026-01-24" },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredClaims = claims.filter(
    (c) =>
      (c.patient.toLowerCase().includes(search.toLowerCase()) ||
       c.id.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus ? c.status === filterStatus : true)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Claims</h1>
          <p className="text-gray-500 mt-2">
            Manage and review all insurance claims, their status, and amounts.
          </p>
        </div>

        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition">
          + Add Claim
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by patient or claim ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border rounded-lg p-3"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-1/4 border rounded-lg p-3"
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Denied">Denied</option>
        </select>
      </div>

      {/* Claims Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-md overflow-x-auto"
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Claim ID</th>
              <th>Patient</th>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredClaims.length > 0 ? (
              filteredClaims.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{c.id}</td>
                  <td>{c.patient}</td>
                  <td>{c.amount}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-lg text-white text-xs font-semibold ${
                        c.status === "Approved"
                          ? "bg-green-600"
                          : c.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>{c.date}</td>
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
                  No claims found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

    </div>
  );
}