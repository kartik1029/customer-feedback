"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-center bg-repeat">
      {/* Centered Login Card */}
      <div className="bg-white p-12 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Customer Feedback System
        </h1>
        <p className="text-gray-600 text-center mb-10 text-sm">
          Welcome Back — Access Your Account
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6 items-center"
        >
          {/* Email Field */}
          <div className="w-4/5 md:w-3/4 flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-gray-700 text-sm font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-base"
              required
            />
          </div>

          {/* Password Field */}
          <div className="w-4/5 md:w-3/4 flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-gray-700 text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-base"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center text-sm w-full">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-4/5 md:w-3/4 bg-blue-400 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 hover:shadow-lg transition-all duration-200 text-base"
          >
            LOGIN
          </button>
        </form>

        <p className="text-gray-500 mt-10 text-center text-sm">
          © {new Date().getFullYear()} Aarogya Aadhar
        </p>
      </div>
    </div>
  );
}
