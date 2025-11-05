"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

function StarRating({ value, onChange, min = 1, max = 5 }: { value: number; onChange: (n: number) => void; min?: number; max?: number; }) {
  const [hover, setHover] = useState<number | null>(null);
  const calc = (e: any, idx: number) => {
    const b = e.target.getBoundingClientRect();
    const x = e.clientX - b.left;
    const half = x < b.width / 2 ? 0.5 : 1;
    let v = idx - 1 + half;
    return Math.max(min, Math.min(max, v));
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const starIndex = i + 1;
        const current = hover ?? value;
        const filled = current >= starIndex;
        const halfFilled = !filled && current >= starIndex - 0.5;

        return (
          <button
            key={i}
            type="button"
            className="relative inline-flex h-8 w-8 items-center justify-center"
            onMouseMove={(e) => setHover(calc(e, starIndex))}
            onMouseLeave={() => setHover(null)}
            onClick={(e) => onChange(calc(e, starIndex))}
          >
            <Star className="h-6 w-6 text-white" />
            <div className={`absolute inset-0 overflow-hidden ${filled ? "w-full" : halfFilled ? "w-1/2" : "w-0"}`}>
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            </div>
          </button>
        );
      })}
      <span className="ml-2 text-sm text-gray-600">{(hover ?? value).toFixed(1)}</span>
    </div>
  );
}

export default function CreateCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    foodItem: "Butter Chicken",
    rating: 3.0,
    feedback: "",
  });

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const change = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    const rating = Math.max(1, Math.min(5, Math.round(formData.rating * 2) / 2));

    const r = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, rating }),
    });
    const d = await r.json();
    setSubmitting(false);

    if (d.success) {
      setMessage("✅ Feedback submitted successfully!");
      setTimeout(() => router.push("/view-customers"), 300);
    } else setMessage("❌ Failed to submit feedback!");
  };

  const inputClass = "w-full border border-gray-400 bg-[#F5F5DD] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a47148]/50 text-gray-900";

  return (
    <div className="flex justify-center items-start min-h-screen p-4 sm:p-6" style={{background:"#faf5e4"}}>
      <div className="w-full max-w-5xl shadow-xl border border-[#C7AD7F] rounded-2xl p-6 sm:p-10" style={{background:"#E2D2A4"}}>
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
          Submit New Customer Feedback
        </h2>

        <form onSubmit={submit} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">

          <div>
            <label className="block mb-1 font-medium text-gray-900">Name</label>
            <input name="name" className={inputClass} value={formData.name} onChange={change} required/>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-900">Email</label>
            <input name="email" type="email" className={inputClass} value={formData.email} onChange={change} required/>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-900">Location</label>
            <input name="location" className={inputClass} value={formData.location} onChange={change} required/>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-900">Food Item</label>
            <select name="foodItem" className={inputClass} value={formData.foodItem} onChange={change}>
              {["Butter Chicken","Paneer Tikka Masala","Dal Makhani","Biryani","Masala Dosa","Chole Bhature"]
                .map(x=>(<option key={x}>{x}</option>))}
            </select>
          </div>

          <div className="col-span-2 md:col-span-3 xl:col-span-4">
            <label className="block mb-1 font-medium text-gray-900">Rating (1.0–5.0)</label>
            <StarRating value={formData.rating} onChange={(n)=>setFormData({...formData,rating:n})}/>
          </div>

          <div className="col-span-2 md:col-span-3 xl:col-span-4">
            <label className="block mb-1 font-medium text-gray-900">Feedback</label>
            <textarea name="feedback" rows={4} className={inputClass} value={formData.feedback} onChange={change} required/>
          </div>

          <div className="col-span-2 md:col-span-3 xl:col-span-4">
            <button disabled={submitting} className="w-full bg-[#a47148] text-white py-3 rounded-lg font-semibold hover:bg-[#8c603a] transition disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>

          {message && (
            <div className="col-span-2 md:col-span-3 xl:col-span-4 text-center font-medium mt-2 text-gray-900">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
