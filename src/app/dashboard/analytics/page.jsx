'use client';

import { motion } from "framer-motion";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Analytics & Reports
        </h1>
        <p className="text-gray-500 mt-2">
          Detailed financial insights and performance metrics for your medical billing operations.
        </p>
      </div>

      {/* KPI Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-4 gap-6 mb-10"
      >
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm text-gray-500">Monthly Revenue</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">$48,920</p>
          <p className="text-xs text-green-500 mt-1">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm text-gray-500">Collection Rate</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">92%</p>
          <p className="text-xs text-blue-500 mt-1">Above industry average</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm text-gray-500">Average Claim Value</h3>
          <p className="text-2xl font-bold text-purple-600 mt-2">$1,145</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-sm text-gray-500">Denial Rate</h3>
          <p className="text-2xl font-bold text-red-600 mt-2">4.8%</p>
          <p className="text-xs text-red-500 mt-1">Needs monitoring</p>
        </div>
      </motion.div>

      {/* Revenue Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Revenue Trend (Last 6 Months)
        </h2>

        <div className="h-56 flex items-center justify-center text-gray-400 border rounded-lg">
          Revenue Chart Placeholder
        </div>
      </div>

      {/* Claims Performance Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Claims Performance
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li className="flex justify-between">
              <span>Submitted Claims</span>
              <span className="font-semibold">380</span>
            </li>
            <li className="flex justify-between">
              <span>Approved Claims</span>
              <span className="font-semibold text-green-600">342</span>
            </li>
            <li className="flex justify-between">
              <span>Pending Claims</span>
              <span className="font-semibold text-yellow-500">26</span>
            </li>
            <li className="flex justify-between">
              <span>Denied Claims</span>
              <span className="font-semibold text-red-600">12</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Top Insurance Payers
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li className="flex justify-between">
              <span>Blue Cross</span>
              <span className="font-semibold">$18,200</span>
            </li>
            <li className="flex justify-between">
              <span>Aetna</span>
              <span className="font-semibold">$14,500</span>
            </li>
            <li className="flex justify-between">
              <span>Cigna</span>
              <span className="font-semibold">$9,700</span>
            </li>
            <li className="flex justify-between">
              <span>United Healthcare</span>
              <span className="font-semibold">$6,520</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Operational Insights */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Operational Insights
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-gray-600">
          <div>
            <h4 className="font-semibold mb-2">Billing Efficiency</h4>
            <p className="text-sm">
              Claim submission turnaround time improved by 18% compared to last quarter.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Revenue Growth</h4>
            <p className="text-sm">
              Overall revenue has increased steadily due to optimized denial management.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Compliance Status</h4>
            <p className="text-sm">
              All billing processes are aligned with HIPAA compliance standards.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}