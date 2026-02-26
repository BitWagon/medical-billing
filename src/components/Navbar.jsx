'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Patients", href: "/patients" },
    { name: "Claims", href: "/claims" },
    { name: "Analytics", href: "/dashboard/analytics" },
    { name: "Reports", href: "/dashboard/reports" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/dashboard">
          <h1 className="text-xl font-bold text-blue-700 cursor-pointer">
            MedBill Pro
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`cursor-pointer text-sm font-medium transition ${
                  pathname === link.href
                    ? "text-blue-700"
                    : "text-gray-600 hover:text-blue-700"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}

          {/* Profile */}
          {isAuthenticated() && (
            <div className="ml-6 flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded-full text-sm font-semibold">
                {user?.name?.charAt(0) || "A"}
              </div>
              <span className="text-sm text-gray-700 font-medium">
                {user?.name}
              </span>
              <button onClick={logout} className="text-red-600 text-sm ml-3">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t px-6 py-4 space-y-4"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  onClick={() => setIsOpen(false)}
                  className={`cursor-pointer text-sm font-medium ${
                    pathname === link.href
                      ? "text-blue-700"
                      : "text-gray-600"
                  }`}
                >
                  {link.name}
                </div>
              </Link>
            ))}

            {isAuthenticated() && (
              <div className="flex items-center space-x-3 pt-4 border-t">
                <div className="w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded-full text-sm font-semibold">
                  {user?.name?.charAt(0) || "A"}
                </div>
                <span className="text-sm text-gray-700 font-medium">
                  {user?.name}
                </span>
                <button onClick={logout} className="text-red-600 text-sm ml-3">
                  Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}