/* eslint-disable @next/next/no-img-element */
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res && res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {}
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="flex m-auto w-96 lg:w-[30%]">
        <div className="w-[40rem]">
          <div className="text-center first-line:text-[3rem] font-extrabold">
            <span className="">WELCOME </span><span className="text-primary">BACK</span>
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
              Don't have an account?{" "}
              <span className="text-accent">Sign up</span>
            </Link>
          </form>
        </div>
      </div>
      <div className="hidden lg:block w-[40%] bg-slate-400 m-3 rounded-xl overflow-hidden">
        <img src="sakura.jpg" alt="login image" className="w-screen"/>
      </div>
    </div>
  );
};

export default LoginForm;
