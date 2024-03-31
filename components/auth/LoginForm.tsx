/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="h-screen flex">
        <div className="flex m-auto">
          <div className="m-auto w-[80%] lg:w-[40rem]">
            <div className="text-center text-[3rem] font-extrabold">
              <span className="">WELCOME </span>
              <span className="text-primary">BACK</span>
            </div>
            <br />

            {/* removed form because it no worky men */}

            {/* <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            <div className="divider">OR</div> */}

            <button
              className="btn btn-primary w-full"
              onClick={() => {
                signIn("spotify");
              }}
            >
              Sign In With Spotify
            </button>
            <div className="text-right pt-5">
              <p>Use this account for testing</p>
              <p>statifytesting@test.com</p>
              <p>Testing123</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-[40%] bg-slate-400 m-3 rounded-xl overflow-hidden">
          <img
            src="sakura.jpg"
            alt="login image"
            className="w-screen min-h-screen"
          />
        </div>
      </div>
    )
  );
};

export default Login;
