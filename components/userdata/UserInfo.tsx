/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserProfileComponent: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unable to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError("Error fetching user data");
        console.error(error);
      }
    };

    if (session?.accessToken) {
      fetchUserData();
    }
  }, [session]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={userData.images[0]?.url} alt="Profile Picture" />
        </div>
      </div>
      <p>Name: {userData.display_name}</p>
      <p>Email: {userData.email}</p>
      <p>Country: {userData.country}</p>
      {/* Add more user data fields as needed */}
    </div>
  );
};

export default UserProfileComponent;
