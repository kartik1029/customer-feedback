"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Customer {
  _id: string;
  name: string;
  email: string;
  location: string;
  foodItem: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

export default function ViewCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const trim = (txt: string) => (txt.length > 35 ? txt.slice(0, 35) + "..." : txt);

  const stars = (rating: number) => (
    <div className="flex">
      {[1,2,3,4,5].map(i=>(
        <Star
          key={i}
          size={16}
          className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/customers");
      const d = await res.json();
      if (d.success) setCustomers(d.data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen p-4" style={{ background:"#faf5e4" }}>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Customer List</h1>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {[1,2,3,4].map(i=>(
            <div key={i} className="rounded-xl p-4 bg-[#F5F5DD] border border-gray-300 shadow animate-pulse">
              <div className="h-4 bg-gray-300 w-3/4 rounded mb-3"></div>
              <div className="h-3 bg-gray-300 w-1/2 rounded mb-3"></div>
              <div className="h-4 bg-gray-300 w-2/3 rounded mb-2"></div>
              <div className="h-2.5 bg-gray-300 w-1/4 ml-auto rounded mt-4"></div>
            </div>
          ))}
        </div>
      ) : customers.length === 0 ? (
        <p className="text-gray-700">No customers found.</p>
      ) : (
        <>
          {/* MOBILE CARDS (2 per row) */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {customers.map(c=>(
              <div
                key={c._id}
                className="rounded-xl p-4 bg-[#F5F5DD] border border-gray-300 shadow-md"
              >
                <p className="font-semibold text-gray-900">{c.name}</p>
                <p className="text-sm text-gray-700">{c.foodItem}</p>

                <div className="mt-3">{stars(c.rating)}</div>
                <p className="text-xs text-gray-600 mt-2">{trim(c.feedback)}</p>

                <p className="text-[11px] text-gray-500 mt-3 text-right">
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {/* TABLE FOR DESKTOP */}
          <div className="hidden md:block overflow-x-auto bg-[#C7AD7F] shadow-xl rounded-2xl border border-gray-400">
            <table className="min-w-full text-sm text-left text-gray-900">
              <thead className="bg-[#F5F5DD] text-gray-900 font-semibold border-b border-gray-300">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Food Item</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3">Feedback</th>
                  <th className="px-6 py-3">Created At</th>
                </tr>
              </thead>

              <tbody>
                {customers.map(c=>(
                  <tr key={c._id} className="border-t border-gray-300 hover:bg-[#f3e9d6] transition-all">
                    <td className="px-6 py-3">{c.name}</td>
                    <td className="px-6 py-3">{c.email}</td>
                    <td className="px-6 py-3">{c.location}</td>
                    <td className="px-6 py-3">{c.foodItem}</td>
                    <td className="px-6 py-3">{stars(c.rating)}</td>
                    <td className="px-6 py-3">{trim(c.feedback)}</td>
                    <td className="px-6 py-3">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </>
      )}
    </div>
  );
}
