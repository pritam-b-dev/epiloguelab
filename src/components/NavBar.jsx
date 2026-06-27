"use client";

import {
  Dropdown,
  Button,
  Label,
  Description,
  Separator,
  Avatar,
  Badge,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function NavBar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-zinc-800/50">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="font-bold text-white text-xl hover:text-primary transition-colors"
          >
            EpilogueLab
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <ul className="hidden md:flex items-center justify-center flex-1 gap-6">
          <li>
            <Link
              href="/"
              className="text-zinc-300 hover:text-primary transition-colors text-sm font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/lessons"
              className="text-zinc-300 hover:text-primary transition-colors text-sm font-medium"
            >
              Public Lessons
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link
                  href="/dashboard/add-lesson"
                  className="text-zinc-300 hover:text-primary transition-colors text-sm font-medium"
                >
                  Add Lesson
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/my-lessons"
                  className="text-zinc-300 hover:text-primary transition-colors text-sm font-medium"
                >
                  My Lessons
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right: Auth / User Actions */}
        <div className="flex-1 flex items-center justify-end gap-4">
          {isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-800" />
          ) : user ? (
            <div className="flex items-center gap-4">
              {/* Premium Status */}
              {user.isPremium ? (
                <Badge content="★" color="warning" size="sm">
                  <span className="text-amber-500 font-semibold text-sm">
                    Premium
                  </span>
                </Badge>
              ) : (
                <Link
                  href="/pricing"
                  className="text-amber-500 font-semibold text-sm hover:underline"
                >
                  Upgrade ★
                </Link>
              )}

              {/* User Dropdown */}
              <Dropdown>
                <Dropdown.Trigger>
                  <Button
                    variant="flat"
                    isIconOnly
                    className="rounded-full p-0 h-9 w-9 ring-2 ring-primary/20 hover:ring-primary/50 transition-all"
                  >
                    <Avatar className="w-full h-full">
                      <Avatar.Image
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />
                      <Avatar.Fallback className="bg-primary/20 text-primary">
                        {user.name?.charAt(0) || "U"}
                      </Avatar.Fallback>
                    </Avatar>
                  </Button>
                </Dropdown.Trigger>

                <Dropdown.Popover>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Label className="font-bold">{user.name}</Label>
                      <Description>{user.email}</Description>
                    </Dropdown.Item>

                    <Separator className="my-1" />

                    <Dropdown.Item
                      href={
                        user.role === "admin"
                          ? "/dashboard/admin"
                          : "/dashboard"
                      }
                    >
                      Dashboard
                    </Dropdown.Item>

                    <Dropdown.Item href="/dashboard/profile">
                      Profile
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={handleLogout}
                      className="text-danger"
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                as={Link}
                href="/signin"
                variant="light"
                className="text-zinc-300 hover:text-primary cursor-pointer"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/signup"
                color="primary"
                className="font-semibold cursor-pointer text-white"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
