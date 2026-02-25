'use client';

import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white hidden md:flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">MedBilling Pro</h2>

        <nav className="space-y-4 text-sm font-medium">
          <p className="hover:text-gray-300 cursor-pointer">Dashboard</p>
          <p className="hover:text-gray-300 cursor-pointer">Patients</p>
          <p className="hover:text-gray-300 cursor-pointer">Claims</p>
          <p className="hover:text-gray-300 cursor-pointer">Invoices</p>
          <p className="hover:text-gray-300 cursor-pointer">Payments</p>
          <p className="hover:text-gray-300 cursor-pointer">Reports</p>
          <p className="hover:text-gray-300 cursor-pointer">Settings</p>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Medical Billing Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin</span>
            <div className="w-10 h-10 bg-blue-700 text-white flex items-center justify-center rounded-full">
              A
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-4 gap-6 mb-10"
        >

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">
              $128,450
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm">Pending Claims</h3>
            <p className="text-2xl font-bold text-yellow-500 mt-2">
              42
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm">Approved Claims</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              320
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500 text-sm">Denied Claims</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">
              12
            </p>
          </div>

        </motion.div>

        {/* Revenue Summary Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Revenue Overview
          </h2>

          <div className="h-40 flex items-center justify-center text-gray-400">
            Revenue Chart Placeholder
          </div>
        </div>

        {/* Recent Claims Table */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-6">
            Recent Claims
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3">Claim ID</th>
                  <th>Patient</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3">CLM-1023</td>
                  <td>John Smith</td>
                  <td>$1,200</td>
                  <td className="text-green-600 font-medium">Approved</td>
                  <td>Jan 24, 2026</td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3">CLM-1024</td>
                  <td>Sarah Lee</td>
                  <td>$850</td>
                  <td className="text-yellow-600 font-medium">Pending</td>
                  <td>Jan 25, 2026</td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3">CLM-1025</td>
                  <td>Michael Brown</td>
                  <td>$540</td>
                  <td className="text-red-600 font-medium">Denied</td>
                  <td>Jan 26, 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}