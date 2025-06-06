"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/models/User";
import { IContribution } from "@/models/Contribution";
import Image from "next/image";
import toast from 'react-hot-toast';
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [contributions, setContributions] = useState<IContribution[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editIsAdmin, setEditIsAdmin] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      router.push("/login");
      return;
    }
    const parsed: IUser = JSON.parse(u);
    if (!parsed.isAdmin) {
      router.push("/dashboard");
      return;
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (loading) return;
    fetch("/api/contributions")
      .then(res => res.json())
      .then(data => setContributions(data.contributions as IContribution[]));
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data.users as IUser[]));
  }, [loading]);

  function handleEditUser(user: IUser) {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditIsAdmin(user.isAdmin);
    setError("");
    setSuccess("");
  }

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedUser?._id, name: editName, email: editEmail, isAdmin: editIsAdmin }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Update failed");
    setSuccess("User updated successfully");
    toast.success("User updated successfully");
    setUsers(users.map(u => u._id === selectedUser?._id ? data.user : u));
    setSelectedUser(null);
  }

  async function handleDeleteUser(id: string) {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  }

  async function confirmDeleteUser() {
    if (!pendingDeleteId) return;
    setError("");
    setSuccess("");
    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pendingDeleteId }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Delete failed");
    setSuccess("User deleted successfully");
    setUsers(users.filter(u => u._id !== pendingDeleteId));
    setPendingDeleteId(null);
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-800 py-8 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto bg-gray-900/95 rounded-xl shadow-2xl p-6 sm:p-10 border border-yellow-800">
        <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center">Admin Panel</h2>
        {/* Remove local navbar and footer, now handled by layout */}
        <div className="mb-8">
          <h3 className="font-semibold text-yellow-200 mb-2">All Contributions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-yellow-100 text-sm">
              <thead>
                <tr className="bg-yellow-900/60">
                  <th className="p-2">User</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((c, i) => {
                  let userName = 'Unknown';
                  if (typeof c.user === 'object' && c.user && 'name' in c.user) {
                    userName = (c.user as { name: string }).name;
                  } else if (typeof c.user === 'string') {
                    userName = c.user;
                  }
                  return (
                    <tr key={i} className="border-b border-yellow-800">
                      <td className="p-2">{userName}</td>
                      <td className="p-2">₦{c.amount}</td>
                      <td className={`p-2 ${c.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>{c.status}</td>
                      <td className="p-2">{new Date(c.date).toLocaleDateString()}</td>
                      <td className="p-2">
                        {c.status === 'pending' && (
                          <div className="flex gap-2">
                            <button onClick={async () => {
                              await fetch('/api/contributions', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ contributionId: c._id, action: 'approve' })
                              });
                              // Refresh contributions
                              fetch('/api/contributions')
                                .then(res => res.json())
                                .then(data => setContributions(data.contributions));
                            }} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold shadow">Approve</button>
                            <button onClick={async () => {
                              await fetch('/api/contributions', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ contributionId: c._id, action: 'fail' })
                              });
                              // Refresh contributions
                              fetch('/api/contributions')
                                .then(res => res.json())
                                .then(data => setContributions(data.contributions));
                            }} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold shadow">Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-yellow-200 mb-2">User Management</h3>
          {error && <div className="text-red-400 mb-2">{error}</div>}
          {success && <div className="text-green-400 mb-2">{success}</div>}
          <div className="overflow-x-auto mb-4">
            <ConfirmDialog
              open={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              onConfirm={confirmDeleteUser}
              title="Delete User?"
              description="Are you sure you want to delete this user? This action cannot be undone."
            />
            <table className="min-w-full text-yellow-100 text-sm">
              <thead>
                <tr className="bg-yellow-900/60">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Admin</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={String(u._id)} className="border-b border-yellow-800">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.isAdmin ? 'Yes' : 'No'}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEditUser(u)} className="px-2 py-1 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400">Edit</button>
                      <button onClick={() => handleDeleteUser(String(u._id))} className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedUser && (
            <form onSubmit={handleUpdateUser} className="bg-gray-800 border border-yellow-900 rounded-lg p-6 flex flex-col gap-4 max-w-md mx-auto mt-4">
              <h4 className="text-yellow-300 font-bold text-lg mb-2">Edit User</h4>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="p-2 rounded border border-yellow-700 bg-gray-900 text-yellow-100"
                placeholder="Name"
                required
              />
              <input
                type="email"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                className="p-2 rounded border border-yellow-700 bg-gray-900 text-yellow-100"
                placeholder="Email"
                required
              />
              <label className="flex items-center gap-2 text-yellow-200">
                <input
                  type="checkbox"
                  checked={editIsAdmin}
                  onChange={e => setEditIsAdmin(e.target.checked)}
                  className="accent-yellow-500"
                />
                Admin
              </label>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setSelectedUser(null)} className="px-4 py-2 bg-gray-700 text-yellow-200 rounded hover:bg-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400">Save</button>
              </div>
            </form>
          )}
        </div>
        {/* Dashboard button for admin */}
        {(() => {
          const u = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
          let isAdmin = false;
          if (u) {
            try {
              isAdmin = JSON.parse(u).isAdmin;
            } catch {}
          }
          return isAdmin ? (
            <button
              className="bg-blue-700/30 text-blue-200 px-4 py-1 rounded-full text-xs font-semibold hover:bg-blue-700/60 transition cursor-pointer mt-4"
              onClick={() => router.push('/dashboard')}
              type="button"
            >
              Dashboard
            </button>
          ) : null;
        })()}
      </div>
    </div>
  );
}
