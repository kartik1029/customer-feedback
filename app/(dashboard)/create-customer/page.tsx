"use client";

import { useState } from "react";

export default function CreateCustomerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    foodItem: "Butter Chicken",
    rating: 0,
    feedback: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("✅ Feedback submitted successfully!");
      setFormData({
        name: "",
        email: "",
        location: "",
        foodItem: "Butter Chicken",
        rating: 0,
        feedback: "",
      });
    } else {
      setMessage("❌ Failed to submit feedback!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Submit New Customer Feedback</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-md border border-black/10"
      >
        <label className="block mb-2 font-medium">Customer Name</label>
        <input
          type="text"
          name="name"
          className="w-full border rounded-lg p-2 mb-4"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border rounded-lg p-2 mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-medium">Location</label>
        <input
          type="text"
          name="location"
          className="w-full border rounded-lg p-2 mb-4"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-medium">Food Item</label>
        <select
          name="foodItem"
          className="w-full border rounded-lg p-2 mb-4"
          value={formData.foodItem}
          onChange={handleChange}
        >
          {["Butter Chicken", "Paneer Tikka Masala", "Dal Makhani", "Biryani", "Masala Dosa", "Chole Bhature"].map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )
          )}
        </select>

        <label className="block mb-2 font-medium">Rating (0–5)</label>
        <input
          type="number"
          name="rating"
          className="w-full border rounded-lg p-2 mb-4"
          min="0"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-medium">Feedback</label>
        <textarea
          name="feedback"
          className="w-full border rounded-lg p-2 mb-4"
          rows={3}
          value={formData.feedback}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Feedback
        </button>

        {message && <p className="mt-4 text-center font-medium">{message}</p>}
      </form>
    </div>
  );
}
