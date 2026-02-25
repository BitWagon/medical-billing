'use client';

import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: "Admin User",
    email: "admin@medbilling.com",
    phone: "+1 (555) 123-4567",
    organization: "MedBilling Pro",
    timezone: "UTC -5",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          System Settings
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your account preferences, organization details, and system configurations.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-8"
      >

        {/* Profile Settings */}
        <form
          onSubmit={handleSave}
          className="bg-white p-6 rounded-xl shadow-md space-y-5"
        >
          <h2 className="text-xl font-semibold mb-4">
            Profile Information
          </h2>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition">
            Save Changes
          </button>
        </form>

        {/* Organization Settings */}
        <div className="space-y-8">

          <div className="bg-white p-6 rounded-xl shadow-md space-y-5">
            <h2 className="text-xl font-semibold mb-4">
              Organization Details
            </h2>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Organization Name
              </label>
              <input
                type="text"
                name="organization"
                value={profile.organization}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Timezone
              </label>
              <select
                name="timezone"
                value={profile.timezone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option>UTC -5</option>
                <option>UTC +0</option>
                <option>UTC +5</option>
                <option>UTC +10</option>
              </select>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              Security
            </h2>

            <button className="w-full bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition">
              Change Password
            </button>

            <button className="w-full bg-red-100 text-red-600 p-3 rounded-lg hover:bg-red-200 transition">
              Enable Two-Factor Authentication
            </button>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              Notifications
            </h2>

            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <span>SMS Alerts</span>
              <input type="checkbox" />
            </div>

            <div className="flex items-center justify-between">
              <span>Weekly Reports</span>
              <input type="checkbox" defaultChecked />
            </div>
          </div>

        </div>

      </motion.div>

    </div>
  );
}