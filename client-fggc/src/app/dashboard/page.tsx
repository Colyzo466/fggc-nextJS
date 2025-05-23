"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IContribution } from "@/models/Contribution";

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; name: string; email: string; isAdmin: boolean } | null>(null);
  const [contributions, setContributions] = useState<IContribution[]>([]);
  const [amount, setAmount] = useState("");
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) return router.push("/login");
    setUser(JSON.parse(u));
  }, [router]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/contributions")
      .then(res => res.json())
      .then(data => setContributions(
        data.contributions.filter((c: IContribution) => {
          if (typeof c.user === 'object' && c.user && '_id' in c.user) {
            // Convert ObjectId to string for comparison
            return String((c.user as { _id: unknown })._id) === user.id;
          } else if (typeof c.user === 'string') {
            return c.user === user.id;
          }
          return false;
        })
      ));
  }, [user]);

  async function handleContribute(e: React.FormEvent) {
    e.preventDefault();
    if (!amount) return;
    const res = await fetch("/api/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id, amount: Number(amount) }),
    });
    const data = await res.json();
    if (!res.ok) return;
    setContributions(cs => [...cs, data.contribution]);
    setAmount("");
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>
      <form onSubmit={handleContribute} className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Contribution Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="border p-2 rounded w-40"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Contribute</button>
      </form>
      <h3 className="font-semibold mb-2">Your Contributions</h3>
      <ul className="divide-y">
        {contributions.map((c, i) => (
          <li key={i} className="py-2 flex justify-between">
            <span>₦{c.amount}</span>
            <span className="text-xs">{new Date(c.date).toLocaleDateString()}</span>
            <span className={`text-xs ${c.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{c.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
