/* eslint-disable @next/next/no-img-element */
// components/TopTrack.tsx
"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface TopTrackProps {
  term: string;
}

const TopTrack: React.FC<TopTrackProps> = ({term}) => {
  const { data: session } = useSession();
  const [topTrack, setTopTrack] = useState<any>(null);

  useEffect(() => {
    const fetchTopTrack = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=1`,
          {
            headers: {
              // Add your Spotify API token or authorization header here if needed
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (data && data.items && data.items.length > 0) {
          setTopTrack(data.items[0]);
        }
      } catch (error) {
        console.error("Error fetching top track:", error);
      }
    };

    fetchTopTrack();
  }, [session]);

  return (
    <div className="bg-primary rounded-xl">
      {topTrack && (
        <div className="flex justify-between h-[100%]">
          <div className="w-[40%] h-[100%] p-3">
            <img
              className="rounded-lg"
              src={topTrack.album.images[0].url}
              alt={topTrack.name}
            />
          </div>
          <div className="p-10">
            <div className="text-right">
              <p className="text-5xl font-bold">{topTrack.name}</p>
              <br />
              <p className="text-xl">Popularity: {topTrack.popularity}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopTrack;
