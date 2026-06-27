"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("callbackUrl") || "/dashboard";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await authClient.signIn.email(
      { email, password, rememberMe: true },
      {
        onSuccess: () => {
          window.location.href = redirectTo;
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Invalid credentials.");
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-zinc-950">
      <div className="w-full max-w-lg bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-5 md:p-7 shadow-2xl shadow-blue-500/5">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="text-zinc-400 mt-3 text-lg">
            Please enter your details to sign in
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm font-medium text-red-400">
            {error}
          </div>
        )}

        <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
              Email Address
            </Label>
            <Input
              variant="bordered"
              radius="md"
              placeholder="name@example.com"
              className="h-12 w-full"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type={isVisible ? "text" : "password"}
            className="w-full"
          >
            <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
              Password
            </Label>
            <div className="relative">
              <Input
                variant="bordered"
                radius="md"
                placeholder="••••••••"
                className="h-12 w-full"
              />
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-3 top-3.5 text-zinc-500 hover:text-white transition-colors"
              >
                {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          <Button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 text-lg transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            isLoading={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
            Or
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <Button
          variant="bordered"
          className="w-full border-zinc-700 text-zinc-300 h-12 hover:bg-zinc-800 transition-colors"
          onPress={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: redirectTo,
            })
          }
        >
          Sign in with Google
        </Button>

        <p className="mt-8 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
