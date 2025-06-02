"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Notification {
  _id: string;
  user: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/notifications")
      .then(res => res.json())
      .then(data => {
        setNotifications(data.notifications || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load notifications.");
        setLoading(false);
      });
  }, []);

  async function markAsRead(id: string) {
    await fetch(`/api/notifications`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true })
    });
    setNotifications(n => n.map(notif => notif._id === id ? { ...notif, read: true } : notif));
  }

  async function deleteNotification(id: string) {
    await fetch(`/api/notifications`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    setNotifications(n => n.filter(notif => notif._id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-800 flex flex-col items-center justify-start py-10 px-2 sm:px-6 relative overflow-x-hidden">
      {/* Navbar for notifications navigation */}
      <nav className="flex flex-wrap gap-3 mb-8 items-center justify-center z-20 relative">
        <button
          className="bg-yellow-700/30 text-yellow-200 px-4 py-1 rounded-full text-xs font-semibold hover:bg-yellow-700/60 transition cursor-pointer"
          onClick={() => router.push("/")}
          type="button"
        >
          Home
        </button>
        <button
          className="bg-blue-700/30 text-blue-200 px-4 py-1 rounded-full text-xs font-semibold hover:bg-blue-700/60 transition cursor-pointer"
          onClick={() => router.push("/dashboard")}
          type="button"
        >
          Dashboard
        </button>
        <button
          className="bg-green-700/30 text-green-300 px-4 py-1 rounded-full text-xs font-semibold hover:bg-green-700/60 transition cursor-pointer"
          onClick={() => router.push("/admin")}
          type="button"
        >
          Admin Panel
        </button>
      </nav>
      <div className="max-w-2xl w-full bg-gray-900/95 rounded-2xl shadow-2xl p-6 sm:p-10 border border-yellow-800 z-10 relative">
        {/* GGPC_customer image for notifications branding */}
        <div className="flex justify-center mb-6">
          <img src="/GGPC_customer.png" alt="GGPC Customer" width={100} height={100} className="rounded-full shadow-lg border-4 border-green-700 bg-gray-900" style={{objectFit:'cover'}} />
        </div>
        <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">Notifications</h2>
        {loading && <div className="text-yellow-200 text-center py-8">Loading notifications...</div>}
        {error && <div className="text-red-400 text-center py-8">{error}</div>}
        {!loading && notifications.length === 0 && !error && (
          <div className="text-yellow-400 text-center py-8 italic">No notifications yet.</div>
        )}
        <ul className="flex flex-col gap-4">
          {notifications.map(n => (
            <li key={n._id} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 rounded-lg border ${n.read ? 'border-gray-700 bg-gray-800/80' : 'border-yellow-700 bg-yellow-900/20'} shadow transition-all`}> 
              <div className="flex-1">
                <div className={`font-semibold ${n.read ? 'text-yellow-200' : 'text-yellow-300'}`}>{n.message}</div>
                <div className="text-xs text-yellow-400 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                <div className="text-xs mt-1">
                  <span className={`inline-block px-2 py-0.5 rounded-full ${n.type === 'success' ? 'bg-green-700/40 text-green-300' : n.type === 'error' ? 'bg-red-700/40 text-red-300' : 'bg-yellow-700/40 text-yellow-200'}`}>{n.type}</span>
                  {!n.read && <span className="ml-2 text-yellow-400 font-bold">• Unread</span>}
                </div>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                {!n.read && (
                  <button onClick={() => markAsRead(n._id)} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs font-semibold shadow">Mark as Read</button>
                )}
                <button onClick={() => deleteNotification(n._id)} className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs font-semibold shadow">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
