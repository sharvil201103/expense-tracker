"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 430); // iPhone 14 Pro width
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-[#09122C] to-[#872341] px-4 py-3 md:px-8 md:py-4 shadow-lg">
      <Link href="/" className="text-white font-bold text-lg font-sans hover:text-[#E17564] transition duration-200">
        {isMobile ? "My Expenses" : "Expense Tracker"}
      </Link>

      {/* Large screen links */}
      {!isMobile && (
        <div className="flex space-x-6">
          <Link
            href="/addExpense"
            className="bg-white p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Add Expense
          </Link>
          <Link
            href="/amount"
            className="bg-white p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            View Total
          </Link>
        </div>
      )}

      {/* Mobile dropdown */}
      {isMobile && (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-white p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-all duration-300"
          >
            Options ▼
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
              <Link
                href="/addExpense"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-all duration-300"
                onClick={() => setDropdownOpen(false)}
              >
                My Expenses
              </Link>
              <Link
                href="/amount"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-all duration-300"
                onClick={() => setDropdownOpen(false)}
              >
                View Total
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
