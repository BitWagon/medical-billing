/**
 * utils.js
 * Reusable utility functions for backend and API routes
 */

/**
 * Format a date to readable string: YYYY-MM-DD
 * @param {Date|string} date
 * @returns {string} formatted date
 */
export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Format a number as currency
 * @param {number} amount
 * @param {string} currency
 * @param {string} locale
 * @returns {string} formatted currency
 */
export function formatCurrency(amount, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Generate a random string
 * @param {number} length
 * @returns {string}
 */
export function generateRandomString(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Standard API response formatter
 * @param {boolean} success
 * @param {any} data
 * @param {string} message
 * @returns {object}
 */
export function apiResponse(success, data = null, message = "") {
  return { success, data, message };
}

/**
 * Simple email validator
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Capitalize first letter of a string
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}