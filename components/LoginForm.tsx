/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="w-screen h-screen flex">
        <div className="flex m-auto w-96 lg:w-[30%]">
          <div className="w-[40rem]">
            <div className="text-center first-line:text-[3rem] font-extrabold">
              <span className="">WELCOME </span>
              <span className="text-primary">BACK</span>
            </div>
            <br />
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
              />
              <br />
              <button type="submit" className="btn btn-primary">
                Login
              </button>

              {error && <div className="text-red-700">{error}</div>}

              <Link className="text-right" href={"/register"}>
                Don't have an account?{" "}
                <span className="text-accent">Sign up</span>
              </Link>
            </form>
            <button
              className="btn btn-primary"
              onClick={() => {
                signIn("spotify");
              }}
            >
              Sign In With Spotify
            </button>
          </div>
        </div>
        <div className="hidden lg:block w-[40%] bg-slate-400 m-3 rounded-xl overflow-hidden">
          <img src="sakura.jpg" alt="login image" className="w-screen" />
        </div>
      </div>
    )
  );
};

export default Login;
