/* eslint-disable react/no-unescaped-entities */
"use client";

import { set } from "mongoose";
import Link from "next/link";
import React, { useState } from "react";

import {useRouter} from 'next/navigation'

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    // Next.js router
  const router = useRouter();

    // Handle form submission
  const handleSubmit = async (e: {
    target: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Check if user already exists
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const {user}= await resUserExists.json();

      if (user) {
        setError("User already exists");
        return;
      }
    
      // Register user
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push('/login');
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.log("Error occurred while registering user", error);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="hidden lg:block w-[40%] bg-slate-400 m-3 rounded-xl">
        image
      </div>
      <div className="flex m-auto  lg:w-[30%]">
        <div className="w-[40rem]">
          <div className="text-center">
            <span className="text-[2rem]">Get Started With </span>
            <span className="text-[3rem] font-bold text-primary">Statify</span>
          </div>
          <br />
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
            />
            <br />
            <button className="btn btn-primary">Reigster</button>

            {error && <div className="text-red-700">{error}</div>}

            <Link className="text-right" href={"/login"}>
              Already have an account?{" "}
              <span className="text-primary">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
