"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { signUp } from "@/api/api"; // Your signup API function
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import signImage from "@/assets/login.jpg";

export function SignUpForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    role_type: "",
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(formData);
      toast.success("Signup successful! Please login.");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Signup failed.");
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
          <h2 className="text-3xl font-extrabold">Join Us Today!</h2>
          <p className="text-lg text-white/80">
            Create an account to start managing your work efficiently.
          </p>
          <Link href={"/"}>
            <Button className="bg-white text-black hover:bg-gray-300 transition duration-300">
              Explore
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex flex-col items-center justify-center p-8 w-full bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">
              Sign Up
            </h1>
            <p className="text-gray-500 text-md mt-2">
              Enter your details to create an account.
            </p>
          </div>

          <form
            className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <Input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <Input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <Input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Other</option>
            </select>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <select
              name="role_type"
              value={formData.role_type}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Role</option>
              <option value="super_admin">Super Admin</option>
              <option value="artist_manager">Artist Manager</option>
              <option value="artist">Artist</option>
            </select>
            <Button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 transition duration-300">
              Sign Up
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/"
                className="text-black font-semibold hover:text-gray-800 transition duration-300"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
