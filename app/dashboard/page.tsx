"use client";

/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface TopArtist {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  };
}

function Dashboard(): JSX.Element {
  const { data: session } = useSession();
  // Define state variables to hold user data
  const [userData, setUserData] = useState<TopArtist | null>(null);

  useEffect(() => {
    // Fetch user data from the Spotify API
    const fetchUserData = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/top/artists?limit=1",
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`, // You need to replace this with your Spotify access token
            },
          }
        );
        const data: TopArtist = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the fetchUserData function when the component mounts
  }, [session]);

  // Render the user data
  return (
    <div>
      {userData ? (
        <div>
          <h2>Top Artist</h2>
          {userData.items && <p>Name: {userData.items.name}</p>}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;
