"use client";

export default function SkeletonCard() {
  return (
    <div className="h-32 w-full bg-white border border-gray-200 rounded-xl animate-pulse flex flex-col justify-center items-center">
      <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
      <div className="h-6 w-12 bg-gray-300 rounded"></div>
    </div>
  );
}
