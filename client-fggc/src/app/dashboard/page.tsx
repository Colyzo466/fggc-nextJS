"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IContribution } from "@/models/Contribution";
import Image from "next/image";

// DashboardHeader component
function DashboardHeader({ user, onAdminClick }: { user: { id: string; name: string; email: string; isAdmin: boolean } | null, onAdminClick: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 drop-shadow-lg">Welcome, <span className="text-yellow-100">{user?.name}</span></h2>
      <div className="flex flex-col sm:flex-row gap-2">
        <span className="bg-yellow-700/20 text-yellow-200 px-4 py-1 rounded-full text-xs font-semibold">{user?.email}</span>
        {user?.isAdmin && (
          <button
            className="bg-green-700/30 text-green-300 px-4 py-1 rounded-full text-xs font-semibold hover:bg-green-700/60 transition cursor-pointer"
            onClick={onAdminClick}
            type="button"
          >
            Admin Panel
          </button>
        )}
      </div>
    </div>
  );
}

// ContributionForm component
function ContributionForm({ amount, setAmount, onSubmit }: { amount: string, setAmount: (a: string) => void, onSubmit: (e: React.FormEvent) => void }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
      <select
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="border border-yellow-700 bg-gray-800 text-yellow-100 p-3 rounded-lg w-56 focus:ring-2 focus:ring-yellow-400 outline-none transition"
        required
      >
        <option value="">Select Contribution Amount</option>
        <option value="5000">5,000 CFA</option>
        <option value="10000">10,000 CFA</option>
        <option value="20000">20,000 CFA</option>
        <option value="30000">30,000 CFA</option>
      </select>
      <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transition w-full sm:w-auto text-center">Contribute</button>
    </form>
  );
}

// ContributionList component
function ContributionList({ contributions, user, handleApprove, handleFail, handleWithdraw }: {
  contributions: IContribution[],
  user: { id: string; name: string; email: string; isAdmin: boolean } | null,
  handleApprove: (id: string) => void,
  handleFail: (id: string) => void,
  handleWithdraw: (id: string) => void
}) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-xl text-yellow-200 mb-4">Your Contributions & Payments</h3>
      <ul className="divide-y divide-yellow-900">
        {contributions.length === 0 && (
          <li className="py-6 text-center text-yellow-400 italic">No contributions yet. Start by making your first contribution!</li>
        )}
        {contributions.map((c, i) => {
          const cId = String(c._id);
          const userIdStr = user ? String(user.id) : '';
          const cRecipientId = typeof c.recipient === 'object' && c.recipient && '_id' in c.recipient ? String((c.recipient as { _id: unknown })._id) : String(c.recipient);
          const cUserId = typeof c.user === 'object' && c.user && '_id' in c.user ? String((c.user as { _id: unknown })._id) : String(c.user);
          return (
            <li key={i} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-gray-800/60 rounded-lg mb-2 px-4 shadow border border-yellow-900">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                <span className="text-2xl font-bold text-yellow-400">₣{c.amount}</span>
                <span className="text-xs text-yellow-200">{new Date(c.date).toLocaleDateString()}</span>
                <span className={`text-xs font-semibold ${c.status === 'completed' ? 'text-green-400' : c.status === 'approved' ? 'text-blue-400' : c.status === 'failed' ? 'text-red-400' : 'text-yellow-400'}`}>{c.status}</span>
                {c.status === 'approved' && c.returnedAt && (
                  <span className="text-xs text-blue-300">Return on: {new Date(c.returnedAt).toLocaleDateString()}</span>
                )}
                {c.status === 'failed' && c.suspendedUntil && (
                  <span className="text-xs text-red-300">Suspended until: {new Date(c.suspendedUntil).toLocaleString()}</span>
                )}
                {c.status === 'approved' && c.returns && (
                  <span className="text-xs text-green-300">Returns: ₣{c.returns}</span>
                )}
              </div>
              {/* Recipient or Admin approval UI */}
              {user && c.status === 'pending' && (cRecipientId === userIdStr || user.isAdmin) && (
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button onClick={() => handleApprove(cId)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow">Approve Payment</button>
                  <button onClick={() => handleFail(cId)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow">Reject/Fail</button>
                </div>
              )}
              {/* Withdraw button for eligible contributions */}
              {user && cUserId === userIdStr && c.status === 'approved' && c.returnedAt && (
                <button onClick={() => handleWithdraw(cId)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow mt-2 sm:mt-0">Withdraw</button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

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
    if (!user) return;    fetch("/api/contributions")
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

  async function handleWithdraw(contributionId: string) {
    const res = await fetch("/api/contributions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contributionId, action: "withdraw" })
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
      alert('Withdrawal successful! Your returns have been credited.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-800 flex flex-col items-center justify-start py-10 px-2 sm:px-6 relative overflow-x-hidden">
      {/* Top left logo */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-auto">
        <Image src="/globe.svg" alt="GGPC Logo" width={40} height={40} className="w-10 h-10" />
        <span className="text-yellow-200 font-bold text-xl drop-shadow">GGPC</span>
      </div>
      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-yellow-600/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-yellow-300/10 rounded-full blur-2xl animate-pulse" />
      </div>
      <div className="max-w-3xl w-full bg-gray-900/95 rounded-2xl shadow-2xl p-6 sm:p-10 border border-yellow-800 z-10 relative">
        {/* Navbar for dashboard navigation */}
        <nav className="flex flex-wrap gap-3 mb-8 items-center justify-center z-20 relative">
          <div className="flex-1 flex items-center min-w-[120px] max-w-full pr-4">
            <Image
              src="/GGPC_Avetar.png"
              alt="GGPC Avatar"
              width={240}
              height={100}
              className="rounded-full shadow-lg border-4 border-yellow-700 bg-gray-900 object-contain h-24 w-auto"
              style={{maxWidth:'100%'}}
              priority
            />
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              className="bg-yellow-700/30 text-yellow-200 px-4 py-1 rounded-full text-xs font-semibold hover:bg-yellow-700/60 transition cursor-pointer"
              onClick={() => router.push("/")}
              type="button"
            >
              Home
            </button>
            <button
              className="bg-yellow-700/30 text-yellow-200 px-4 py-1 rounded-full text-xs font-semibold hover:bg-yellow-700/60 transition cursor-pointer"
              onClick={() => router.push("/notifications")}
              type="button"
            >
              Notifications
            </button>
            {user?.isAdmin && (
              <button
                className="bg-green-700/30 text-green-300 px-4 py-1 rounded-full text-xs font-semibold hover:bg-green-700/60 transition cursor-pointer"
                onClick={() => router.push("/admin")}
                type="button"
              >
                Admin Panel
              </button>
            )}
          </div>
        </nav>
        <DashboardHeader user={user} onAdminClick={() => router.push('/admin')} />
        <ContributionForm amount={amount} setAmount={setAmount} onSubmit={handleContribute} />
        <ContributionList
          contributions={contributions}
          user={user}
          handleApprove={handleApprove}
          handleFail={handleFail}
          handleWithdraw={handleWithdraw}
        />
        <footer className="mt-10 text-center text-yellow-600 text-xs opacity-80">
          &copy; {new Date().getFullYear()} Global Growth Peer Connection (GGPC). All rights reserved.
        </footer>
      </div>
    </div>
  );
}
