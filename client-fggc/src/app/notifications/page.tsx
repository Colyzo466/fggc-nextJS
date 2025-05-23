"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { INotification } from "@/models/Notification";

export default function NotificationsPage() {
  const [user, setUser] = useState<{ id: string; name: string; email: string; isAdmin: boolean } | null>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) return router.push("/login");
    setUser(JSON.parse(u));
  }, [router]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/notifications?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setNotifications(data.notifications));
  }, [user]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul className="divide-y">
        {notifications.length === 0 ? (
          <li className="py-2 text-gray-500">No notifications</li>
        ) : (
          notifications.map((n, i) => (
            <li key={i} className={`py-2 ${n.read ? 'text-gray-400' : 'font-semibold'}`}>{n.message}</li>
          ))
        )}
      </ul>
    </div>
  );
}
