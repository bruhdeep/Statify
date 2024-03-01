/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 flex flex-col gap-2 my-6">
        <div><img src={session?.user?.image ?? ""} alt="" /></div>
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-primary text-white font-bold px-6 py-2 mt-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
