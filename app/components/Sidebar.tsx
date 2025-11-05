"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { LayoutDashboard, UserPlus, Users, LogOut, X } from "lucide-react";

type Props = {
  open?: boolean;              
  onClose?: () => void;        
};

export default function Sidebar({ open = false, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Create Customer", path: "/create-customer", icon: <UserPlus size={18} /> },
    { name: "View Customers", path: "/view-customers", icon: <Users size={18} /> },
  ];

  const handleGo = (path: string) => {
    router.push(path);
    
    onClose?.();
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      
      <aside className="hidden md:flex w-64 bg-[#faf5e4] shadow-lg h-screen sticky top-0 left-0 flex-col">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Customer Feedback</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleGo(link.path)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === link.path
                  ? "bg-[#a47148] text-white shadow-md"
                  : "text-gray-700 hover:bg-[#f3e9d6]"
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
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-white bg-[#7a1f3d] hover:bg-[#691933] transition-all duration-150"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      
      <div
        className={[
          "md:hidden fixed inset-y-0 left-0 z-40",
          "transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "w-3/5", 
        ].join(" ")}
        aria-hidden={!open}
      >
        <aside className="h-full bg-[#faf5e4] shadow-xl flex flex-col">
          
          <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800">
              Customer Feedback
            </h2>
            <button
              aria-label="Close menu"
              onClick={onClose}
              className="p-2 rounded hover:bg-[#f3e9d6] transition"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => handleGo(link.path)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                  pathname === link.path
                    ? "bg-[#a47148] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#f3e9d6]"
                }`}
              >
                {link.icon}
                {link.name}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-white bg-[#7a1f3d] hover:bg-[#691933] transition-all duration-150"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
