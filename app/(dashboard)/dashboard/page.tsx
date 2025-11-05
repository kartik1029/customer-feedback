"use client";

import { useEffect, useState } from "react";
import SkeletonCard from "../components/SkeletonCard";
import { Star } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/customers");
      const d = await res.json();
      setData(d.data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const customers = data || [];
  const total = customers.length;
  const good = customers.filter((c:any) => c.rating >= 4).length;
  const bad = customers.filter((c:any) => c.rating < 4).length;


  const dishImages: { [key: string]: string } = {
    "Butter Chicken": "/dishes/butterChicken.png",
    "Paneer Tikka Masala": "/dishes/paneerTikkaMasala.png",
    "Dal Makhani": "/dishes/dalMakhani.png",
    "Biryani": "/dishes/biryani.png",
    "Masala Dosa": "/dishes/masalaDosa.png",
    "Chole Bhature": "/dishes/choleBhature.png",
  };

  const foods = [
    "Butter Chicken","Paneer Tikka Masala","Dal Makhani",
    "Biryani","Masala Dosa","Chole Bhature",
  ];

  const getAvg = (f:string)=>{
    const r = customers.filter((c:any)=> c.foodItem===f).map((c:any)=>c.rating);
    if(!r.length)return null;
    return (r.reduce((a:number,b:number)=>a+b)/r.length).toFixed(1);
  };

  const stars=(rating:number)=>{
    return [...Array(5)].map((_,i)=>(
      <Star key={i} size={18} className={i<rating?"text-yellow-400 fill-yellow-400":"text-gray-300"} />
    ));
  }

  return (
    <div className="space-y-8 p-4 min-h-screen" style={{background:"#faf5e4"}}>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {loading ? <>
          <SkeletonCard/><SkeletonCard/><SkeletonCard/>
        </>:
          <>
            <div className="rounded-xl p-6 flex flex-col items-center shadow-lg" style={{background:"#C7AD7F"}}>
              <p className="text-gray-900 font-medium">Total Customers</p>
              <h2 className="text-3xl font-bold" style={{color:"#7a1f3d"}}>{total}</h2>
            </div>

            <div className="rounded-xl p-6 flex flex-col items-center shadow-lg" style={{background:"#C7AD7F"}}>
              <p className="text-gray-900 font-medium">Good Ratings (≥4)</p>
              <h2 className="text-3xl font-bold" style={{color:"#16a34a"}}>{good}</h2>
            </div>

            <div className="rounded-xl p-6 flex flex-col items-center shadow-lg" style={{background:"#C7AD7F"}}>
              <p className="text-gray-900 font-medium">Bad Ratings (&lt;4)</p>
              <h2 className="text-3xl font-bold" style={{color:"#ef4444"}}>{bad}</h2>
            </div>
          </>
        }
      </div>

      
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Dish Insights</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {loading ? <>
            <SkeletonCard/><SkeletonCard/><SkeletonCard/>
          </>: foods.map(f=>{
            const avg = getAvg(f);
            if(!avg)return null;
            return (
              <div
                key={f}
                className="rounded-xl p-5 shadow-lg text-center hover:-translate-y-[3px] transition-all duration-200 border border-white/20"
                style={{background:"#F5F5DD"}}
              >
                <img
                  src={dishImages[f]}
                  className="w-24 h-24 object-cover mx-auto rounded-xl mb-3"
                  alt={f}
                />
                <h3 className="font-semibold text-sm mb-2" style={{color:"#8b6b4a"}}>{f}</h3>

                <div className="flex justify-center">{stars(Math.round(Number(avg)))}</div>
                <p className="text-xs text-gray-600 mt-1">Avg Rating {avg} ⭐</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
