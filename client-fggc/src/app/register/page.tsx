"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error || "Registration failed");
    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-900/95 rounded-2xl shadow-2xl p-8 border border-yellow-800">
        <div className="flex items-center gap-2 mb-8">
          <Image src="/globe.svg" alt="GGPC Logo" className="w-10 h-10" />
          <span className="text-yellow-200 font-bold text-2xl drop-shadow">GGPC</span>
        </div>
        <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center">Create Account</h2>
        {error && <div className="bg-red-900/60 text-red-300 rounded p-2 mb-4 text-center">{error}</div>}
        {success && <div className="bg-green-900/60 text-green-300 rounded p-2 mb-4 text-center">{success}</div>}
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="p-3 rounded-lg border border-yellow-700 bg-gray-800 text-yellow-100 focus:ring-2 focus:ring-yellow-400 outline-none transition"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-yellow-700 bg-gray-800 text-yellow-100 focus:ring-2 focus:ring-yellow-400 outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-yellow-700 bg-gray-800 text-yellow-100 focus:ring-2 focus:ring-yellow-400 outline-none transition"
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transition mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-yellow-200 text-sm text-center mt-6">
          Already have an account?{" "}
          <button
            className="text-yellow-400 hover:underline font-semibold"
            onClick={() => router.push("/login")}
            type="button"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
