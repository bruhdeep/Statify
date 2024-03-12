/* eslint-disable @next/next/no-img-element */
// components/TopArtist.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const TopArtist: React.FC = () => {
  const { data: session } = useSession();
  const [topArtist, setTopArtist] = useState<any>(null);

  useEffect(() => {
    const fetchTopArtist = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/top/artists?limit=1&locale=en-US%2Cen%3Bq%3D0.5",
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
    };

    fetchTopArtist();
  }, [session]);

  return (
    <div className="bg-primary">
      {topArtist && (
        <div className="flex justify-between h-[100%]">
          <div className="p-10">
            <div>
              <p className="text-5xl font-bold">{topArtist.name}</p>
              <br />
              <p className="text-xl">Followers: {topArtist.followers.total}</p>
            </div>
          </div>
          <div className="w-[40%] h-[100%] p-3">
            <img
              className="rounded-lg"
              src={topArtist.images[0].url}
              alt={topArtist.name}
            />
          </div>
          {/* <h2>Top Artist</h2>
          <div>
            <img src={topArtist.images[0].url} alt={topArtist.name} />
            <h3>{topArtist.name}</h3>
            
            <p>Genres: {topArtist.genres.join(", ")}</p>
            <p>Popularity: {topArtist.popularity}</p>
            <a href={topArtist.external_urls.spotify}>Open in Spotify</a>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default TopArtist;
