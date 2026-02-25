"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateClaimPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    patientId: "",
    providerName: "",
    diagnosisCode: "",
    procedureCode: "",
    claimAmount: "",
    insuranceProvider: "",
    status: "Pending",
    serviceDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to create claim");
      }

      router.push("/claims");
    } catch (error) {
      console.error(error);
      alert("Error creating claim");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Create New Claim
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Patient ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient ID
            </label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Provider Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Provider Name
            </label>
            <input
              type="text"
              name="providerName"
              value={formData.providerName}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Diagnosis Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Diagnosis Code (ICD-10)
            </label>
            <input
              type="text"
              name="diagnosisCode"
              value={formData.diagnosisCode}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Procedure Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Procedure Code (CPT)
            </label>
            <input
              type="text"
              name="procedureCode"
              value={formData.procedureCode}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Claim Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Claim Amount ($)
            </label>
            <input
              type="number"
              name="claimAmount"
              value={formData.claimAmount}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Insurance Provider */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Insurance Provider
            </label>
            <input
              type="text"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Service Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Date
            </label>
            <input
              type="date"
              name="serviceDate"
              value={formData.serviceDate}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Claim Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Claim"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}