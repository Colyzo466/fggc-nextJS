"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ isAdmin?: boolean } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const u = localStorage.getItem("user");
      if (u) setUser(JSON.parse(u));
    }
  }, []);

  return (
    <nav className="flex flex-wrap gap-3 mb-8 items-center justify-center z-20 relative py-2">
      <div className="flex-1 flex items-center min-w-[120px] max-w-full pr-4">
        <Image
          src="/GGPC.png"
          alt="GGPC Logo"
          width={60}
          height={60}
          className="rounded-xl shadow-lg border-4 border-yellow-700 bg-gray-900 object-contain h-14 w-auto"
          style={{ maxWidth: "100%" }}
          priority
        />
      </div>
      <div className="flex gap-3 flex-shrink-0">
        <button
          className="bg-yellow-700/30 text-yellow-200 px-4 py-1 rounded-full text-xs font-semibold hover:bg-yellow-700/60 transition cursor-pointer"
          onClick={() => router.push("/")}
          type="button"
          aria-label="Go to Home"
        >
          Home
        </button>
        <button
          className="bg-yellow-700/30 text-yellow-200 px-4 py-1 rounded-full text-xs font-semibold hover:bg-yellow-700/60 transition cursor-pointer"
          onClick={() => router.push("/dashboard")}
          type="button"
          aria-label="Go to Dashboard"
        >
          Dashboard
        </button>
        <button
          className="bg-yellow-700/30 text-yellow-200 px-4 py-1 rounded-full text-xs font-semibold hover:bg-yellow-700/60 transition cursor-pointer"
          onClick={() => router.push("/notifications")}
          type="button"
          aria-label="Go to Notifications"
        >
          Notifications
        </button>
        {user?.isAdmin && (
          <button
            className="bg-green-700/30 text-green-300 px-4 py-1 rounded-full text-xs font-semibold hover:bg-green-700/60 transition cursor-pointer"
            onClick={() => router.push("/admin")}
            type="button"
            aria-label="Go to Admin Panel"
          >
            Admin Panel
          </button>
        )}
      </div>
    </nav>
  );
}
