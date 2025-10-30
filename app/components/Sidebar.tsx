"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Create Customer", path: "/create-customer", icon: <UserPlus size={18} /> },
    { name: "View Customers", path: "/view-customers", icon: <Users size={18} /> },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Customer Feedback</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => router.push(link.path)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
              pathname === link.path
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.icon}
            {link.name}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-150"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
