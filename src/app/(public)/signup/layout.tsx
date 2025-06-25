// app/signup/layout.tsx

import Link from "next/link";
import React from "react"; // Important if you're on older setups

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              {/* Icon here */}
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900">AI Finance Tracker</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
