"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      
      <Sidebar open={open} onClose={() => setOpen(false)} />

      
      <div className="flex-1 min-w-0 flex flex-col">
        
        <header className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 transition"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <span className="text-sm font-semibold text-gray-700">
              Customer Feedback
            </span>
            <span className="w-6" /> 
          </div>
        </header>

        
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6"
          onClick={() => {
            if (open) setOpen(false);
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
