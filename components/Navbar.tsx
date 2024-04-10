/* eslint-disable @next/next/no-img-element */
// components/Navbars.tsx
"use client";

import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import Search from "./Search";
import { get } from "http";

const Navbar = () => {
  const { data: session }: any = useSession();
  const [userid, setUserid] = React.useState("");

  useEffect(() => {
    const getuserid = async () => {
      try {
        const response = await fetch(
          `/api/getuserid?query=${session?.user?.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const { userid } = await response.json();
        setUserid(userid);
        console.log(userid);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getuserid();
  }, [session?.user?.email]);

  return (
    <div className="">
      <div className="navbar bg-base-100">
        <div className="flex-1 text-primary">
          <a href="/" className="btn btn-ghost text-xl">
            Statify
          </a>
        </div>
        <div className="flex-none gap-2"></div>
        <Search />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {session ? (
              <div className="w-10 rounded-full">
                <img alt="Profilepic" src={session?.user?.image} />
              </div>
            ) : (
              <div className="w-10 rounded-full">
                <FaUser size={40} />
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className=" z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {session && (
              <li>
                <Link href={`/user/${userid}`}>
                  <button>Profile</button>
                </Link>
              </li>
            )}
            {session && (
              <li>
                <a>Settings</a>
              </li>
            )}
            <li>
              {session ? (
                <button
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link href={"/login"}>
                  <button>Login</button>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
