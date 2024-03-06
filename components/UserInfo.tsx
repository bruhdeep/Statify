"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 flex flex-col gap-2 my-6">
        {/* <div>
          Id: <span className="font-bold">{session?.user?.id}</span>
        </div> */}
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        {session ? (
          <button onClick={() => signOut()} className="btn btn-primary">
            Logout
          </button>
        ) : (
          <button className="btn btn-primary">
            <Link href={"/login"}>Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
