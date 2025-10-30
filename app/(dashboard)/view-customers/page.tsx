"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/customers");
        const data = await res.json();
        if (data.success) {
          setCustomers(data.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Customer List</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : customers.length === 0 ? (
          <p className="text-gray-500">No customers found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-2xl border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-900 font-semibold">
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
                {customers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="border-t hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-3">{customer.name}</td>
                    <td className="px-6 py-3">{customer.email}</td>
                    <td className="px-6 py-3">{customer.location}</td>
                    <td className="px-6 py-3">{customer.foodItem}</td>
                    <td className="px-6 py-3">{customer.rating}</td>
                    <td className="px-6 py-3">{customer.feedback}</td>
                    <td className="px-6 py-3">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
