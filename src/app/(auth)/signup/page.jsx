"use client";

import { useState } from "react";
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
import { authClient, signUp } from "../../../lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const photoURL = formData.get("photoURL") || "";
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    let newErrors = {};

    if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);

      const response = await signUp.email({
        email,
        password,
        name: fullName,
        photoURL,
        role: "user",
        isPremium: false,
        autoSignIn: false,
      });

      if (response?.error) {
        toast.error(response.error.message);
      } else {
        toast.success("Account created successfully!");
        router.push(redirectTo);
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
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
    <div className="flex-1 w-full max-w-2xl p-4 md:p-6 mx-auto">
      <div className="w-full bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/10">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Create your account
          </h2>
          <p className="text-zinc-400 mt-3 text-lg">
            Join EpilogueLab and start your journey today
          </p>
        </div>

        <Form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>
          {/* Full Name */}
          <TextField isRequired className="w-full">
            <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
              Full Name
            </Label>
            <Input
              name="fullName"
              type="text"
              placeholder="John Doe"
              className="h-14 w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 text-white focus:border-blue-500 focus:outline-none focus:ring-0 transition-all"
            />
          </TextField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Email Address */}
            <TextField isRequired className="w-full">
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Email Address
              </Label>
              <Input
                name="email"
                type="email"
                placeholder="john@example.com"
                className="h-14 w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 text-white focus:border-blue-500 focus:outline-none focus:ring-0 transition-all"
              />
            </TextField>

            {/* Photo URL */}
            <TextField className="w-full">
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Photo URL (Optional)
              </Label>
              <Input
                name="photoURL"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="h-14 w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 text-white focus:border-blue-500 focus:outline-none focus:ring-0 transition-all"
              />
            </TextField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Password */}
            <TextField
              isRequired
              className="w-full"
              isInvalid={!!errors.password}
            >
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
                  onClick={toggleVisibility}
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

            {/* Confirm Password */}
            <TextField
              isRequired
              className="w-full"
              isInvalid={!!errors.confirmPassword}
            >
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Confirm Password
              </Label>
              <div className="relative w-full">
                <Input
                  name="confirmPassword"
                  type={isVisible ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-14 w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 text-white focus:border-blue-500 focus:outline-none focus:ring-0 transition-all"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors z-10"
                >
                  {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <FieldError className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </FieldError>
              )}
            </TextField>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full mt-4 font-bold h-14 text-lg text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] rounded-xl cursor-pointer"
          >
            Create Account
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
            href={`/signin${redirectTo !== "/" ? `?redirect=${redirectTo}` : ""}`}
            className="text-blue-400 font-semibold hover:underline hover:text-blue-300"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
