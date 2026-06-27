"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { error } = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.fullName,
      photoURL: data.photoURL || "",
      role: "user",
      isPremium: false,
      autoSignIn: false,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created successfully!");
      router.push(redirectTo);
    }
  };

  const handleGoogleSignIn = () => {
    signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-xl bg-zinc-950/60 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-10 shadow-2xl shadow-blue-500/10">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Create your account
          </h2>
          <p className="text-zinc-400 mt-3 text-lg">
            Join EpilogueLab and start your journey today
          </p>
        </div>

        <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
          {/* Name Field */}
          <TextField isRequired name="fullName" type="text">
            <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
              Full Name
            </Label>
            <Input
              variant="bordered"
              radius="md"
              placeholder="e.g. John Doe"
              className="h-12"
            />
          </TextField>

          {/* Email & Photo URL in a nice layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField isRequired name="email" type="email">
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Email Address
              </Label>
              <Input
                variant="bordered"
                radius="md"
                placeholder="john@example.com"
                className="h-12"
              />
            </TextField>

            <TextField name="photoURL" type="url">
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Photo URL
              </Label>
              <Input
                variant="bordered"
                radius="md"
                placeholder="https://..."
                className="h-12"
              />
            </TextField>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              isRequired
              name="password"
              type={isVisible ? "text" : "password"}
            >
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  variant="bordered"
                  radius="md"
                  placeholder="••••••••"
                  className="h-12"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-white"
                >
                  {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </TextField>

            <TextField
              isRequired
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
            >
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  variant="bordered"
                  radius="md"
                  placeholder="••••••••"
                  className="h-12"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-white"
                >
                  {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </TextField>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 text-lg transition-all shadow-lg shadow-blue-600/20"
          >
            Create Account
          </Button>
        </Form>

        <div className="my-6 flex items-center gap-2">
          <div className="h-px w-full bg-zinc-800" />
          <span className="text-xs text-zinc-500">OR</span>
          <div className="h-px w-full bg-zinc-800" />
        </div>

        <Button
          variant="bordered"
          className="w-full border-zinc-700 text-zinc-300"
          onPress={handleGoogleSignIn}
        >
          Sign up with Google
        </Button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
