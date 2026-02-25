'use client';

import { motion } from "framer-motion";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Financial & Claims Reports
          </h1>
          <p className="text-gray-500 mt-2">
            Generate and review detailed billing, revenue, and claims performance reports.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition">
            Export PDF
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
            Export Excel
          </button>
        </div>
      </div>

      {/* Date Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Filter Reports by Date
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="date"
            className="border rounded-lg p-3"
          />
          <input
            type="date"
            className="border rounded-lg p-3"
          />
          <button className="bg-blue-700 text-white rounded-lg p-3 hover:bg-blue-800 transition">
            Generate Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-4 gap-6 mb-10"
      >
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            $185,430
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm text-gray-500">Total Claims</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            742
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm text-gray-500">Total Payments</h3>
          <p className="text-2xl font-bold text-purple-600 mt-2">
            $162,800
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm text-gray-500">Outstanding Balance</h3>
          <p className="text-2xl font-bold text-red-600 mt-2">
            $22,630
          </p>
        </div>
      </motion.div>

      {/* Claims Status Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-6">
          Claims Status Breakdown
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="text-green-600 font-semibold text-lg">
              Approved
            </p>
            <p className="text-2xl font-bold mt-2">620</p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <p className="text-yellow-600 font-semibold text-lg">
              Pending
            </p>
            <p className="text-2xl font-bold mt-2">84</p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-red-600 font-semibold text-lg">
              Denied
            </p>
            <p className="text-2xl font-bold mt-2">38</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-blue-600 font-semibold text-lg">
              Resubmitted
            </p>
            <p className="text-2xl font-bold mt-2">24</p>
          </div>
        </div>
      </div>

      {/* Detailed Revenue Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-6">
          Detailed Revenue Report
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3">Month</th>
                <th>Total Claims</th>
                <th>Revenue</th>
                <th>Payments Received</th>
                <th>Outstanding</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3">January</td>
                <td>120</td>
                <td>$32,500</td>
                <td>$29,800</td>
                <td>$2,700</td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="py-3">February</td>
                <td>135</td>
                <td>$38,200</td>
                <td>$34,900</td>
                <td>$3,300</td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="py-3">March</td>
                <td>150</td>
                <td>$41,600</td>
                <td>$37,200</td>
                <td>$4,400</td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="py-3">April</td>
                <td>160</td>
                <td>$45,300</td>
                <td>$40,900</td>
                <td>$4,400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}