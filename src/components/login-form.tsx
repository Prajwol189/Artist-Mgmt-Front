"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { login } from "@/api/api"; // Your login API function
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import signImage from "@/assets/login.jpg";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      const credentials = { email, password };
      const response = await login(credentials);

      // Store tokens and user info
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Image and Welcome Text */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white via-gray-700 to-black text-white">
        <div className="max-w-md mx-auto text-center space-y-6">
          <Image
            src={signImage}
            alt="Signup Illustration"
            width={300}
            height={300}
            className="mx-auto rounded-xl shadow-lg"
          />
          <h2 className="text-3xl font-extrabold">Welcome Back!</h2>
          <p className="text-lg text-white/80">
            Access your account and manage your work efficiently.
          </p>
          <Link href={"/"}>
            <Button className="bg-white text-black hover:bg-gray-300 transition duration-300">
              Explore
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col items-center justify-center p-8 w-full bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">
              Sign In
            </h1>
            <p className="text-gray-500 text-md mt-2">
              Enter your details to continue.
            </p>
          </div>

          <form
            className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <Input
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <Input
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
              value={password}
              id="password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />

            <div className="text-right">
              <Link
                href="#"
                className="text-sm text-gray-700 hover:text-black transition duration-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 transition duration-300">
              Login
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-black font-semibold hover:text-gray-800 transition duration-300"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
