'use client';

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function DataTable({
  columns = [],
  data = [],
  searchable = true,
  actions = false,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");

  // Filter Data
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

      {/* Header */}
      {searchable && (
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Data Table
          </h2>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="overflow-x-auto"
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              {columns.map((col, index) => (
                <th key={index} className="py-3 px-4 font-semibold text-gray-600">
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className="py-3 px-4 font-semibold text-gray-600">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-3 px-4 text-gray-700">
                      {row[col.accessor]}
                    </td>
                  ))}

                  {actions && (
                    <td className="py-3 px-4 space-x-3">
                      <button
                        onClick={() => onEdit && onEdit(row)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(row)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="py-6 text-center text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}