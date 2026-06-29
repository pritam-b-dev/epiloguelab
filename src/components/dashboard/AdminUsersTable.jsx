"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";
import { updateUserRole } from "../../lib/actions/users";

export default function AdminUsersTable({ initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);

  const { data: session } = authClient.useSession();
  const currentAdminId = session?.user?.id || session?.user?._id;

  const handleRoleChange = async (userId, newRole) => {
    if (userId === currentAdminId) {
      toast.error("Security Alert: You cannot change your own admin status!");
      return;
    }

    const previousUsers = [...users];

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user,
      ),
    );

    try {
      const res = await updateUserRole(userId, newRole);
      if (res?.success || res) {
        toast.success(`Role updated to ${newRole} successfully!`);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to update user role");
      setUsers(previousUsers);
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading & Count Badge */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Manage Users</h1>
        <div className="bg-red-500/20 text-red-400 font-semibold px-2.5 py-0.5 text-sm rounded-full border border-red-500/20">
          {users.length}
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl text-zinc-500 text-sm">
          No users found on the platform.
        </div>
      ) : (
        <div className="w-full bg-[#121212] border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900 border-b border-zinc-800">
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    USER
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    EMAIL
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    ROLE
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    PREMIUM
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    LESSONS
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm text-right">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isMe =
                    user._id === currentAdminId || user.id === currentAdminId;

                  return (
                    <tr
                      key={user._id || user.id}
                      className="border-b border-zinc-800/60 hover:bg-zinc-900/30 transition-all"
                    >
                      {/* User Avatar + Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              user.photoURL ||
                              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                            }
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                          />
                          <span className="text-sm font-medium text-white truncate max-w-[150px]">
                            {user.name || "N/A"}{" "}
                            {isMe && (
                              <span className="text-indigo-400 text-xs font-semibold ml-1">
                                (You)
                              </span>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="p-4 text-zinc-400 text-sm">
                        {user.email}
                      </td>

                      {/* Role Badges */}
                      <td className="p-4">
                        {user.role === "admin" ? (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
                            Admin
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700/50">
                            User
                          </span>
                        )}
                      </td>

                      {/* Premium Status */}
                      <td className="p-4 text-sm">
                        {user.isPremium ? (
                          <span className="text-amber-400 font-medium">
                            ⭐ Yes
                          </span>
                        ) : (
                          <span className="text-zinc-500">No</span>
                        )}
                      </td>

                      {/* Lesson Count */}
                      <td className="p-4 text-zinc-300 font-medium text-sm">
                        {user.lessonCount || 0}
                      </td>

                      {/* Action Buttons */}
                      <td className="p-4 text-right">
                        {isMe ? (
                          <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl font-mono">
                            Root Protected
                          </span>
                        ) : user.role !== "admin" ? (
                          <button
                            onClick={() =>
                              handleRoleChange(user._id || user.id, "admin")
                            }
                            className="text-xs font-medium bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            Make Admin
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleRoleChange(user._id || user.id, "user")
                            }
                            className="text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            Make User
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
