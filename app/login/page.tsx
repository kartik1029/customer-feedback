"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Sign-in state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sign-up state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupLocation, setSignupLocation] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    const res = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);
    if (res?.error) setError("Invalid email or password");
    else router.push("/dashboard");
  };

  const handleSubmitSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setSignupLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          location: signupLocation,
          password: signupPassword,
          confirmPassword: signupConfirm,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setError(data?.message || "Could not create account.");
        setSignupLoading(false);
        return;
      }
      setInfo("Account created successfully. Please sign in.");
      setIsFlipped(false);
      setEmail(signupEmail);
      setSignupLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setSignupLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 md:px-8" style={{ background: "#faf5e4" }}>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="w-full md:justify-self-start md:ml-2">
          <div className="w-full max-w-md mx-auto relative [perspective:1300px]">
            <div className={`relative duration-700 preserve-3d transition ease-[cubic-bezier(.26,1.45,.46,1.01)] ${isFlipped ? "rotate-y-180" : ""}`}>
              
              <div className="absolute inset-0 backface-hidden flex items-center">
                <div className="w-full backdrop-blur-xl bg-white/30 p-8 rounded-2xl shadow-2xl border border-white/30">
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-1">Customer Feedback System</h1>
                  <p className="text-sm text-gray-700 text-center mb-6">Welcome back</p>

                  {info && <div className="mb-4 text-center text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">{info}</div>}
                  {error && <div className="mb-4 text-center text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}

                  <form onSubmit={handleSubmitSignIn} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-800 text-sm font-medium">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-3.5 border border-white/40 bg-white/70 backdrop-blur-sm rounded-lg text-gray-900"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-gray-800 text-sm font-medium">Password</label>
                      <div className="relative">
                        <input
                          type={showSignInPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full p-3.5 pr-11 border border-white/40 bg-white/70 backdrop-blur-sm rounded-lg text-gray-900"
                        />
                        <button
                          type="button"
                          aria-label={showSignInPassword ? "Hide password" : "Show password"}
                          className="absolute inset-y-0 right-0 px-3 opacity-80 hover:opacity-100"
                          onClick={() => setShowSignInPassword((s) => !s)}
                        >
                          {showSignInPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <button disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all">
                      {loading ? "Logging in..." : "LOGIN"}
                    </button>
                  </form>

                  <div className="mt-6 text-center text-sm">
                    <span className="text-gray-800">Don&apos;t have an account? </span>
                    <button
                      onClick={() => {
                        setIsFlipped(true);
                        setError("");
                        setInfo("");
                      }}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Create account
                    </button>
                  </div>
                </div>
              </div>

              
              <div className="absolute inset-0 rotate-y-180 backface-hidden flex items-center">
                <div className="w-full backdrop-blur-xl bg-white/30 p-8 rounded-2xl shadow-2xl border border-white/30">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-1">Create your account</h2>
                  <p className="text-sm text-gray-700 text-center mb-6">Join and start collecting feedback</p>

                  {error && <div className="mb-4 text-center text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}

                  <form onSubmit={handleSubmitSignUp} className="flex flex-col gap-4">
                    <input
                      required
                      placeholder="Name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="p-3.5 border border-white/40 bg-white/70 backdrop-blur-sm rounded-lg text-gray-900"
                    />
                    <input
                      required
                      placeholder="Email Address"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="p-3.5 border border-white/40 bg-white/70 backdrop-blur-sm rounded-lg text-gray-900"
                    />
                    <input
                      required
                      placeholder="Location"
                      value={signupLocation}
                      onChange={(e) => setSignupLocation(e.target.value)}
                      className="p-3.5 border border-white/40 bg-white/70 backdrop-blur-sm rounded-lg text-gray-900"
                    />
                    <div className="relative">
                      <input
                        required
                        placeholder="Password"
                        type={showSignupPassword ? "text" : "password"}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full p-3.5 pr-11 border border-white/40 bg-white/70 backdrop-blur-sm rounded-lg text-gray-900"
                      />
                      <button
                        type="button"
                        aria-label={showSignupPassword ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-0 px-3 opacity-80 hover:opacity-100"
                        onClick={() => setShowSignupPassword((s) => !s)}
                      >
                        {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        required
                        placeholder="Confirm Password"
                        type={showSignupConfirm ? "text" : "password"}
                        value={signupConfirm}
                        onChange={(e) => setSignupConfirm(e.target.value)}
                        className="w-full p-3.5 pr-11 border border-white/40 bg-white/70 backdrop-blur-sm rounded-lg text-gray-900"
                      />
                      <button
                        type="button"
                        aria-label={showSignupConfirm ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-0 px-3 opacity-80 hover:opacity-100"
                        onClick={() => setShowSignupConfirm((s) => !s)}
                      >
                        {showSignupConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    <button disabled={signupLoading} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all">
                      {signupLoading ? "Creating account..." : "CREATE ACCOUNT"}
                    </button>
                  </form>

                  <div className="mt-6 text-center text-sm">
                    <span className="text-gray-800">Already have an account? </span>
                    <button
                      onClick={() => {
                        setIsFlipped(false);
                        setError("");
                        setInfo("");
                      }}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        
        <div className="hidden md:flex justify-center items-center md:mr-2">
          <img
            src="/images/login.png"
            alt="Business visual"
            className="w-full max-w-md aspect-square object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
