"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  Persons,
  BookOpen,
  FileExclamation,
  Person,
  Plus,
  CircleArrowLeft,
  ArrowRightFromSquare,
  ChevronsUp,
} from "@gravity-ui/icons";
import { authClient } from "../../lib/auth-client";

export default function DashboardSidebar({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const { role, isPremium, name, photoURL } = user || {};

  // Admin Links
  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Persons, href: "/dashboard/admin/users", label: "Manage Users" },
    {
      icon: BookOpen,
      href: "/dashboard/admin/lessons",
      label: "Manage Lessons",
    },
    {
      icon: FileExclamation,
      href: "/dashboard/admin/reports",
      label: "Reports",
    },
    { icon: Person, href: "/dashboard/admin/profile", label: "Profile" },
  ];

  // User Links
  const userNavLinks = [
    { icon: House, href: "/dashboard", label: "Dashboard" },
    { icon: Plus, href: "/dashboard/add-lesson", label: "Add Lesson" },
    { icon: BookOpen, href: "/dashboard/my-lessons", label: "My Lessons" },
    { icon: Person, href: "/dashboard/my-favorites", label: "My Favorites" },
    { icon: Person, href: "/dashboard/profile", label: "Profile" },
  ];

  if (!isPremium && role !== "admin") {
    userNavLinks.push({
      icon: ChevronsUp,
      href: "/pricing",
      label: "Upgrade⭐",
    });
  }

  const navItems = role === "admin" ? adminNavLinks : userNavLinks;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  return (
    <div className="bg-[#0f0f11] border-r border-zinc-800/50 w-64 h-screen max-h-screen p-6 flex flex-col justify-between overflow-hidden select-none ">
      {/* Top Section */}
      <div className="flex flex-col gap-6 overflow-hidden flex-1">
        {/* Logo */}
        <Link
          href={"/"}
          className="text-indigo-400 font-bold text-xl tracking-wider shrink-0"
        >
          EpilogueLab
        </Link>

        {/* User Card */}
        <div className="flex items-center gap-3 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/30 shrink-0">
          <img
            src={
              photoURL ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            }
            alt={name}
            className="w-10 h-10 rounded-full object-cover border border-zinc-700"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-zinc-200 truncate">
              {name || "User"}
            </span>
            <div className="mt-0.5">
              {role === "admin" ? (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
                  Admin
                </span>
              ) : isPremium ? (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">
                  Premium ⭐
                </span>
              ) : (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-zinc-800 text-zinc-400 rounded-md">
                  Free
                </span>
              )}
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 mt-2 overflow-y-auto pr-1 flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? "bg-indigo-600/10 text-indigo-400 rounded-xl border-l-2 border-indigo-500"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-xl"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Footer Actions */}
      <div className="flex flex-col gap-1.5 pt-4 border-t border-zinc-800/50 shrink-0 bg-[#0f0f11]">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-400 hover:bg-zinc-800/50 hover:text-white rounded-xl transition-all"
        >
          <CircleArrowLeft className="w-4 h-4" />
          Back to Site
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-all w-full text-left cursor-pointer"
        >
          <ArrowRightFromSquare className="w-4 h-4 text-red-400" />
          Logout
        </button>
      </div>
    </div>
  );
}
