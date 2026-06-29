"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("callbackUrl") || "/dashboard";

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      setErrors({
        name: !name ? "Name is required" : null,
        email: !email ? "Email is required" : null,
        password: !password ? "Password is required" : null,
      });
      setLoading(false);
      return;
    }

    await authClient.signUp.email(
      { email, password, name, callbackURL: redirectTo },
      {
        onSuccess: () => {
          toast.success("Account created successfully!");
          router.push(redirectTo);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Registration failed.");
          setLoading(false);
        },
      },
    );
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch (error) {
      toast.error("Google sign in failed. Please try again.");
    }
  };

  return (
    <div className="w-full bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/10">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Create an account
        </h2>
        <p className="text-zinc-400 mt-3 text-lg">
          Please enter your details to sign up
        </p>
      </div>

      <Form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>
        {/* Name Input */}
        <TextField isRequired className="w-full" isInvalid={!!errors.name}>
          <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
            Full Name
          </Label>
          <Input
            name="name"
            type="text"
            placeholder="John Doe"
            className="h-14 w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 text-white focus:border-blue-500 focus:outline-none focus:ring-0 transition-all"
          />
          {errors.name && (
            <FieldError className="mt-1 text-sm text-red-500">
              {errors.name}
            </FieldError>
          )}
        </TextField>

        {/* Email Input */}
        <TextField isRequired className="w-full" isInvalid={!!errors.email}>
          <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
            Email Address
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="name@example.com"
            className="h-14 w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 text-white focus:border-blue-500 focus:outline-none focus:ring-0 transition-all"
          />
          {errors.email && (
            <FieldError className="mt-1 text-sm text-red-500">
              {errors.email}
            </FieldError>
          )}
        </TextField>

        {/* Password Input */}
        <TextField isRequired className="w-full" isInvalid={!!errors.password}>
          <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
            Password
          </Label>
          <div className="relative w-full">
            <Input
              name="password"
              type={isVisible ? "text" : "password"}
              placeholder="••••••••"
              className="h-14 w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 text-white focus:border-blue-500 focus:outline-none focus:ring-0 transition-all"
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors z-10"
            >
              {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <FieldError className="mt-1 text-sm text-red-500">
              {errors.password}
            </FieldError>
          )}
        </TextField>

        <Button
          type="submit"
          className="w-full mt-4 font-bold h-14 text-lg text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] rounded-xl cursor-pointer"
          isLoading={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </Form>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-zinc-800" />
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-zinc-800" />
      </div>

      <Button
        variant="bordered"
        className="w-full border-zinc-700 bg-zinc-900 hover:bg-zinc-800/80 text-white h-14 transition-all font-semibold rounded-xl cursor-pointer shadow-sm"
        onPress={handleGoogleSignIn}
      >
        Sign up with Google
      </Button>

      <p className="mt-8 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <a
          href={`/signin${redirectTo !== "/dashboard" ? `?callbackUrl=${redirectTo}` : ""}`}
          className="text-blue-400 font-semibold hover:underline hover:text-blue-300"
        >
          Sign In
        </a>
      </p>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="flex-1 w-full max-w-2xl p-4 md:p-6 mx-auto">
      <Suspense
        fallback={
          <div className="text-white text-center">Loading SignUp Form...</div>
        }
      >
        <SignUpForm />
      </Suspense>
    </div>
  );
}
