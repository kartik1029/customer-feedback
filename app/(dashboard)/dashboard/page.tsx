import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import Customer from "@/app/models/Customer";
import { Star } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectToDatabase();

  const customers = await Customer.find().lean();
  const total = customers.length;
  const good = customers.filter((c) => c.rating >= 4).length;
  const bad = customers.filter((c) => c.rating < 4).length;

  const foods = [
    "Butter Chicken",
    "Paneer Tikka Masala",
    "Dal Makhani",
    "Biryani",
    "Masala Dosa",
    "Chole Bhature",
  ];

  // ✅ Average rating per foodItem (only if customers rated that foodItem)
  const getAverageRating = (foodItem: string) => {
    const foodItemRatings = customers
      .filter((c) => c.foodItem === foodItem && c.rating)
      .map((c) => c.rating);

    if (foodItemRatings.length === 0) return null; // no rating yet

    const avg =
      foodItemRatings.reduce((acc, r) => acc + r, 0) / foodItemRatings.length;
    return avg.toFixed(1);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={18}
          className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <p className="text-gray-600 font-medium">Total Customers</p>
          <h2 className="text-3xl font-bold text-blue-600">{total}</h2>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <p className="text-gray-600 font-medium">Good Ratings (≥4)</p>
          <h2 className="text-3xl font-bold text-green-600">{good}</h2>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <p className="text-gray-600 font-medium">Bad Ratings (&lt;4)</p>
          <h2 className="text-3xl font-bold text-red-500">{bad}</h2>
        </div>
      </div>

      {/* Food Insights */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Average Ratings for Indian foodItemes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods
            .map((foodItem) => {
              const avg = getAverageRating(foodItem);
              if (!avg) return null; // hide foodItemes with no rating

              return (
                <div key={foodItem} className="bg-white rounded-lg shadow p-5">
                  <h3 className="font-semibold text-gray-800 mb-2">{foodItem}</h3>
                  {renderStars(Math.round(Number(avg)))}
                  <p className="text-sm text-gray-500 mt-1">
                    Avg Rating: {avg} ⭐
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
