"use client";

import { Avatar, Badge, Button, Dropdown, Label, Spinner } from "@heroui/react";
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
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-zinc-800/50">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-foreground text-xl">
          EpilogueLab
        </Link>

        {/* Center Links */}
        <ul className="hidden md:flex gap-8">
          <li>
            <Link
              href="/"
              className="text-zinc-300 hover:text-primary transition-colors text-base font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/lessons"
              className="text-zinc-300 hover:text-primary transition-colors text-base font-medium"
            >
              Lessons
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link
                  href="/dashboard/add-lesson"
                  className="text-zinc-300 hover:text-primary transition-colors text-base font-medium"
                >
                  Add Lesson
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/my-lessons"
                  className="text-zinc-300 hover:text-primary transition-colors text-base font-medium"
                >
                  My Lessons
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="h-9 w-9 flex items-center justify-center">
              <Spinner size="sm" color="primary" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-4">
              {user.isPremium ? (
                <Badge content="★" color="warning">
                  <span className="text-amber-500 font-semibold text-sm mr-2">
                    Premium
                  </span>
                </Badge>
              ) : (
                <Link
                  href="/pricing"
                  className="text-primary font-semibold text-sm hover:underline"
                >
                  Upgrade ★
                </Link>
              )}

              <Dropdown>
                <Button
                  variant="light"
                  isIconOnly
                  className="rounded-full w-10 h-10 p-0 overflow-hidden ring-1 ring-zinc-700 hover:ring-primary/50 transition-all duration-300 cursor-pointer focus:ring-0"
                >
                  <Avatar className="w-full h-full rounded-full">
                    <Avatar.Image
                      src={user.photoURL || ""}
                      alt={user.name || "User"}
                      className="object-cover"
                    />
                    <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-zinc-800 text-sm font-medium">
                      {user.name?.charAt(0) || "U"}
                    </Avatar.Fallback>
                  </Avatar>
                </Button>

                <Dropdown.Popover className="min-w-[220px] mt-2 rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden p-1">
                  <Dropdown.Menu
                    className="gap-0.5 outline-none"
                    onAction={(key) => {
                      if (key === "logout") handleLogout();
                      else if (key === "dashboard")
                        router.push(
                          user.role === "admin"
                            ? "/dashboard/admin"
                            : "/dashboard",
                        );
                      else if (key === "profile")
                        router.push("/dashboard/profile");
                    }}
                  >
                    <Dropdown.Item
                      id="user-info"
                      textValue="User Info"
                      className="py-3 px-4 hover:bg-transparent focus:ring-0 focus-visible:outline-none"
                    >
                      <Label className="font-bold text-foreground block">
                        {user.name}
                      </Label>
                      <div className="text-xs text-zinc-500 truncate">
                        {user.email}
                      </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="dashboard"
                      textValue="Dashboard"
                      className="py-2.5 px-4 rounded-lg hover:bg-zinc-800/50 transition-colors focus:ring-0 focus-visible:outline-none"
                    >
                      <Label className="text-foreground">Dashboard</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="profile"
                      textValue="Profile"
                      className="py-2.5 px-4 rounded-lg hover:bg-zinc-800/50 transition-colors focus:ring-0 focus-visible:outline-none"
                    >
                      <Label className="text-foreground">Profile</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      variant="danger"
                      className="py-2.5 px-4 rounded-lg text-danger hover:bg-red-500/10 transition-colors focus:ring-0 focus-visible:outline-none"
                    >
                      <Label className="text-danger">Logout</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/signin"
                className="text-zinc-300 text-base px-3 py-2 hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
