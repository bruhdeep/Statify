/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

const Navbars = () => {
  const { data: session }: any = useSession();
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1 text-primary">
          <a href="/" className="btn btn-ghost text-xl">
            Statify
          </a>
        </div>
        <div className="pr-5">
          <button className="btn btn-ghost">
            <a href="/dashboard">Dashboard</a>
          </button>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                {!session ? (
                  <>
                    <a href="/login">Login</a>
                  </>
                ) : (
                  <>
                    {session?.user?.name}
                    <button
                      onClick={() => {
                        signOut();
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </li>
            </ul>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbars;
