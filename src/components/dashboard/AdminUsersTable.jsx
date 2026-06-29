"use client";

import { useState } from "react";
import { Table } from "@heroui/react";
import toast from "react-hot-toast";
import { updateUserRole } from "../../lib/actions/users";

export default function AdminUsersTable({ initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);

  const handleRoleChange = async (userId, newRole) => {
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
          <Table.ScrollContainer>
            <Table aria-label="Admin users management table" className="w-full">
              <Table.Content>
                <Table.Header>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    USER
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    EMAIL
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    ROLE
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    PREMIUM
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    LESSONS
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-right">
                    ACTIONS
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {users.map((user) => (
                    <Table.Row
                      key={user._id}
                      className="border-b border-zinc-800/60 hover:bg-zinc-900/30 transition-all"
                    >
                      {/* User Avatar + Name */}
                      <Table.Cell className="p-4">
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
                            {user.name || "N/A"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Email */}
                      <Table.Cell className="p-4 text-zinc-400 text-sm">
                        {user.email}
                      </Table.Cell>

                      {/* Role Badges */}
                      <Table.Cell className="p-4">
                        {user.role === "admin" ? (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
                            Admin
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700/50">
                            User
                          </span>
                        )}
                      </Table.Cell>

                      {/* Premium Status */}
                      <Table.Cell className="p-4 text-sm">
                        {user.isPremium ? (
                          <span className="text-amber-400 font-medium">
                            ⭐ Yes
                          </span>
                        ) : (
                          <span className="text-zinc-500">No</span>
                        )}
                      </Table.Cell>

                      {/* Lesson Count */}
                      <Table.Cell className="p-4 text-zinc-300 font-medium text-sm">
                        {user.lessonCount || 0}
                      </Table.Cell>

                      {/* Action Buttons */}
                      <Table.Cell className="p-4 text-right">
                        {user.role !== "admin" ? (
                          <button
                            onClick={() => handleRoleChange(user._id, "admin")}
                            className="text-xs font-medium bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            Make Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRoleChange(user._id, "user")}
                            className="text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            Make User
                          </button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table>
          </Table.ScrollContainer>
        </div>
      )}
    </div>
  );
}
