'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { motion } from "framer-motion";

export default function Charts() {
  // Revenue Data
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 26000 },
    { month: "Jun", revenue: 30000 },
  ];

  // Claims Status Data
  const claimsData = [
    { name: "Approved", value: 400 },
    { name: "Pending", value: 150 },
    { name: "Denied", value: 80 },
  ];

  const COLORS = ["#16a34a", "#eab308", "#dc2626"];

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* Revenue Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Revenue
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Claims Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Claims Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={claimsData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {claimsData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

    </div>
  );
}