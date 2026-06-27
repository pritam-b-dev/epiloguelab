"use client";

import { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Form, Input, Label, TextField } from "@heroui/react";

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (e) => {
    e.preventDefault();
    // Your submit logic
  };

  const handleGoogleSignIn = () => {
    // Google Sign in logic
  };

  return (
    <div className="flex-1 w-full max-w-2xl p-4 md:p-6">
      <div className="w-full bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/10">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Create your account
          </h2>
          <p className="text-zinc-400 mt-3 text-lg">
            Join EpilogueLab and start your journey today
          </p>
        </div>

        <Form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>
          {/* Name Field */}
          <TextField isRequired name="fullName" type="text" className="w-full">
            <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
              Full Name
            </Label>
            <Input
              variant="bordered"
              radius="md"
              placeholder="John Doe"
              className="h-12 w-full"
            />
          </TextField>

          {/* Email & Photo URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <TextField isRequired name="email" type="email" className="w-full">
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Email Address
              </Label>
              <Input
                variant="bordered"
                radius="md"
                placeholder="john@example.com"
                className="h-12 w-full"
              />
            </TextField>

            <TextField name="photoURL" type="url" className="w-full">
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Photo URL (Optional)
              </Label>
              <Input
                variant="bordered"
                radius="md"
                placeholder="https://example.com/photo.jpg"
                className="h-12 w-full"
              />
            </TextField>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <TextField
              isRequired
              name="password"
              type={isVisible ? "text" : "password"}
              className="w-full"
            >
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Password
              </Label>
              <div className="relative w-full">
                <Input
                  variant="bordered"
                  radius="md"
                  placeholder="••••••••"
                  className="h-12 w-full"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-3 top-3.5 text-zinc-500 hover:text-white transition-colors"
                >
                  {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </TextField>

            <TextField
              isRequired
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
              className="w-full"
            >
              <Label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Confirm Password
              </Label>
              <div className="relative w-full">
                <Input
                  variant="bordered"
                  radius="md"
                  placeholder="••••••••"
                  className="h-12 w-full"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-3 top-3.5 text-zinc-500 hover:text-white transition-colors"
                >
                  {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </TextField>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 font-bold h-14 text-lg text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] rounded-xl cursor-pointer"
          >
            Create Account
          </Button>
        </Form>

        {/* Separator */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <Button
          variant="bordered"
          className="w-full border-zinc-700 bg-zinc-900 hover:bg-zinc-800/80 text-white h-12 transition-all font-semibold rounded-xl cursor-pointer shadow-sm"
          onPress={handleGoogleSignIn}
        >
          Sign up with Google
        </Button>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-400 font-semibold hover:underline hover:text-blue-300"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
