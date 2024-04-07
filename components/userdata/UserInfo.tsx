/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UserInfo = ({ userId }: { userId: string }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  // Get the userId from the query parameters

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users?query=${userId}`);

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  function handleFollow() {
    // Send a POST request to your API route
    const requestBody = JSON.stringify({ followerId: "balls", followeeId: userId });

    fetch("/api/follow", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: requestBody,
    });
  }

  return (
    <div className="pt-20">
      <div className="flex gap-5">
        <div className="avatar">
          <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.imageurl} alt="" />
          </div>
        </div>
        <div className="text-xl grid items-center gap-2">
          <p>{user.username}</p>
          <button onClick={handleFollow} className="btn btn-primary">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
