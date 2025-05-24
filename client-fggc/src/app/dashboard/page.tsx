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
          // Compare stringified ObjectId for both user and recipient
          const userIdStr = String(user.id);
          const cUserId = typeof c.user === 'object' && c.user && '_id' in c.user ? String((c.user as { _id: unknown })._id) : String(c.user);
          const cRecipientId = typeof c.recipient === 'object' && c.recipient && '_id' in c.recipient ? String((c.recipient as { _id: unknown })._id) : String(c.recipient);
          return cUserId === userIdStr || cRecipientId === userIdStr;
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

  async function handleApprove(contributionId: string) {
    const res = await fetch("/api/contributions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contributionId, action: "approve" })
    });
    if (res.ok) {
      // Refetch contributions for up-to-date state
      if (user) {
        fetch("/api/contributions")
          .then(res => res.json())
          .then(data => setContributions(
            data.contributions.filter((c: IContribution) => {
              const userIdStr = String(user.id);
              const cUserId = typeof c.user === 'object' && c.user && '_id' in c.user ? String((c.user as { _id: unknown })._id) : String(c.user);
              const cRecipientId = typeof c.recipient === 'object' && c.recipient && '_id' in c.recipient ? String((c.recipient as { _id: unknown })._id) : String(c.recipient);
              return cUserId === userIdStr || cRecipientId === userIdStr;
            })
          ));
      }
      alert('Payment approved! The contributor will receive their return in 7 working days.');
    }
  }

  async function handleFail(contributionId: string) {
    const res = await fetch("/api/contributions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contributionId, action: "fail" })
    });
    if (res.ok) {
      if (user) {
        fetch("/api/contributions")
          .then(res => res.json())
          .then(data => setContributions(
            data.contributions.filter((c: IContribution) => {
              const userIdStr = String(user.id);
              const cUserId = typeof c.user === 'object' && c.user && '_id' in c.user ? String((c.user as { _id: unknown })._id) : String(c.user);
              const cRecipientId = typeof c.recipient === 'object' && c.recipient && '_id' in c.recipient ? String((c.recipient as { _id: unknown })._id) : String(c.recipient);
              return cUserId === userIdStr || cRecipientId === userIdStr;
            })
          ));
      }
      alert('Payment failed. Contributor suspended for 48 hours.');
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>
      <form onSubmit={handleContribute} className="flex gap-2 mb-6">
        <select
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="border p-2 rounded w-40"
          required
        >
          <option value="">Select Amount</option>
          <option value="5000">5,000 CFA</option>
          <option value="10000">10,000 CFA</option>
          <option value="20000">20,000 CFA</option>
          <option value="30000">30,000 CFA</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Contribute</button>
      </form>
      <h3 className="font-semibold mb-2">Your Contributions & Payments</h3>
      <ul className="divide-y">
        {contributions.map((c, i) => {
          const cId = String(c._id);
          const userIdStr = user ? String(user.id) : '';
          const cRecipientId = typeof c.recipient === 'object' && c.recipient && '_id' in c.recipient ? String((c.recipient as { _id: unknown })._id) : String(c.recipient);
          return (
            <li key={i} className="py-2 flex flex-col sm:flex-row sm:justify-between gap-2">
              <span>₣{c.amount}</span>
              <span className="text-xs">{new Date(c.date).toLocaleDateString()}</span>
              <span className={`text-xs ${c.status === 'completed' ? 'text-green-600' : c.status === 'approved' ? 'text-blue-600' : c.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>{c.status}</span>
              {c.status === 'approved' && c.returnedAt && (
                <span className="text-xs text-blue-700">Return on: {new Date(c.returnedAt).toLocaleDateString()}</span>
              )}
              {c.status === 'failed' && c.suspendedUntil && (
                <span className="text-xs text-red-700">Suspended until: {new Date(c.suspendedUntil).toLocaleString()}</span>
              )}
              {c.status === 'approved' && c.returns && (
                <span className="text-xs text-green-700">Returns: ₣{c.returns}</span>
              )}
              {/* Recipient approval UI */}
              {user && cRecipientId === userIdStr && c.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleApprove(cId)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs">Approve Payment</button>
                  <button onClick={() => handleFail(cId)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs">Reject/Fail</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
