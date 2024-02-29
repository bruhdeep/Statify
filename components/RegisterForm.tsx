/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
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
    const name = e.target[0].value;
    console.log(name);
    const username = e.target[1].value;
    console.log(username);
    const email = e.target[2].value;
    console.log(email);
    const password = e.target[3].value;
    console.log(password);

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="w-screen h-screen flex">
        <div className="hidden lg:block w-[40%] bg-slate-400 m-3 rounded-xl overflow-hidden">
          <img
            src="lisa.jpg"
            alt="registerimage"
            className=" w-screen object-cover"
          />
        </div>
        <div className="flex m-auto  lg:w-[30%]">
          <div className="w-[40rem]">
            <div className="text-center text-[3rem] font-extrabold">
              <span className="">GET STARTED WITH </span>
              <span className="text-primary">STATIFY</span>
            </div>
            <br />
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              <input
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
                Have an account? <span className="text-primary">Sign In</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;
