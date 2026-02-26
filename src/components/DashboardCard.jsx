'use client';

import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  value,
  icon,
  trend,
  trendValue,
}) {
  const isPositive = trend === "up";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between border border-gray-100"
    >
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-2">
            {value}
          </h3>
        </div>

        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-700 text-xl">
          {icon}
        </div>
      </div>

      {/* Trend Section */}
      {trend && (
        <div className="mt-4 flex items-center space-x-2">
          <span
            className={`text-sm font-semibold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "▲" : "▼"} {trendValue}
          </span>
          <span className="text-xs text-gray-500">
            vs last month
          </span>
        </div>
      )}
    </motion.div>
  );
}