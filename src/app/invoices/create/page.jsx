"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInvoicePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    invoiceNumber: "",
    amount: "",
    tax: "",
    discount: "",
    dueDate: "",
    status: "Pending",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    const amount = parseFloat(formData.amount) || 0;
    const tax = parseFloat(formData.tax) || 0;
    const discount = parseFloat(formData.discount) || 0;

    return (amount + tax - discount).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const totalAmount = calculateTotal();

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalAmount,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create invoice");
      }

      router.push("/invoices");
    } catch (error) {
      console.error(error);
      alert("Error creating invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create New Invoice
          </h1>
          <p className="text-sm text-gray-500">
            Generate a new billing invoice for a patient
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Patient Information */}
          <SectionTitle title="Patient Information" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Patient ID"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            />

            <InputField
              label="Patient Name"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Invoice Details */}
          <SectionTitle title="Invoice Details" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Invoice Number"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              required
            />

            <InputField
              label="Base Amount ($)"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <InputField
              label="Tax ($)"
              type="number"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
            />

            <InputField
              label="Discount ($)"
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />

            <InputField
              label="Due Date"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["Pending", "Paid", "Overdue", "Cancelled"]}
            />
          </div>

          {/* Total Display */}
          <div className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
            <span className="text-gray-600 font-medium">
              Total Amount
            </span>
            <span className="text-lg font-semibold text-gray-800">
              ${calculateTotal()}
            </span>
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
              {loading ? "Creating Invoice..." : "Create Invoice"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* ---------------- Reusable Components ---------------- */

function SectionTitle({ title }) {
  return (
    <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
      {title}
    </h2>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}