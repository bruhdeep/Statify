"use client";

import React, { useState, useEffect } from "react";

const UserInfo = ({ userId }: { userId: string }) => {
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

  return (
    <div>
      <div>
        <h2>User Details</h2>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
