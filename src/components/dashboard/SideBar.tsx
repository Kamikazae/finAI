"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, FileText, Cpu, Menu } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { href: "/dashboard/transactions", label: "Transactions", icon: <FileText size={20} /> },
  { href: "/dashboard/insights", label: "AI Insights", icon: <Cpu size={20} /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 m-2 rounded-md text-purple-900 bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label="Toggle sidebar"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-purple-900 text-purple-100 p-6
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:static md:translate-x-0 md:flex md:flex-col
        `}
      >
        <nav className="flex-1">
          <ul className="space-y-3">
            {navLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                  onClick={() => setIsOpen(false)} // close sidebar on link click (mobile)
                >
                  {icon}
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pt-4 border-t border-purple-700">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-purple-200 hover:text-white"
            asChild
          >
            <a href="/api/auth/signout">
              <LogOut size={20} />
              Sign Out
            </a>
          </Button>
        </div>
      </aside>
    </>
  );
}
