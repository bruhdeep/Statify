/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res && res.error){
            setError("Invalid Credentials")
            return;
        }

        router.replace("dashboard")
    } catch (error) {}
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="hidden lg:block w-[40%] bg-slate-400 m-3 rounded-xl">
        image
      </div>
      <div className="flex m-auto  lg:w-[30%]">
        <div className="w-[40rem]">
          <div className="text-center">
            <span className="text-[2rem]">Sign In To </span>
            <span className="text-[3rem] font-bold text-primary">Statify</span>
          </div>
          <br />
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            <br />
            <button className="btn btn-primary">Login</button>

            {error && <div className="text-red-700">{error}</div>}

            <Link className="text-right" href={"/register"}>
              Don't have an account? <span className="text-primary">Register</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
