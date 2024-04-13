/* eslint-disable @next/next/no-img-element */
// components/TopArtist.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface TopArtistProps {
  term: string;
}

const TopArtist: React.FC<TopArtistProps> = ({ term }) => {
  const { data: session } = useSession();
  const [topArtist, setTopArtist] = useState<any>(null);

  useEffect(() => {
    const fetchTopArtist = async () => {
      if (session?.accessToken) {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/me/top/artists?time_range=${term}&limit=1`,
            {
              headers: {
                // Add your Spotify API token or authorization header here if needed
                Authorization: `Bearer ${session?.accessToken}`,
              },
            }
          );
          const data = await response.json();
          if (data && data.items && data.items.length > 0) {
            setTopArtist(data.items[0]);
          }
        } catch (error) {
          console.error("Error fetching top artist:", error);
        }
      }
    };

    fetchTopArtist();
  }, [session, term]);

  return (
    <div className="bg-primary rounded-xl">
      {topArtist && (
        <div className="flex justify-between h-[100%]">
          <div className="p-10">
            <div>
              <p className="text-3xl font-bold">{topArtist.name}</p>
              <br />
              <p className="text-xl">Followers: {topArtist.followers.total}</p>
            </div>
          </div>
          <div className="w-60 min-w-32 h-60 p-3">
            <img
              className="rounded-lg w-full h-full object-cover"
              src={topArtist.images[0].url}
              alt={topArtist.name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopArtist;
