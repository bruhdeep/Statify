"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

const SpotifyTopGenre = () => {
  const { data: session } = useSession();
  const [topGenre, setTopGenre] = useState<any>(null);

  useEffect(() => {
    const fetchTopGenre = async () => {
      try {
        // Fetch user's top tracks
        const response = await fetch(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        const data = await response.json();

        // Extract genres from tracks
        const genres = data.items
          .flatMap((track: { artists: any[] }) =>
            track.artists.map((artist) => artist.genres)
          )
          .flat();

        // Count occurrences of each genre
        const genreCounts = genres.reduce(
          (acc: { [x: string]: any }, genre: string | number) => {
            acc[genre] = (acc[genre] || 0) + 1;
            return acc;
          },
          {}
        );

        // Find top genre
        const topGenre = Object.keys(genreCounts).reduce((a, b) =>
          genreCounts[a] > genreCounts[b] ? a : b
        );

        setTopGenre(topGenre);
      } catch (error) {
        console.error("Error fetching top genre:", error);
      }
    };

    fetchTopGenre();
  }, [session]);

  return (
    <div>
      <h2>Top Genre</h2>
      {topGenre ? <p>{topGenre}</p> : <p>Loading top genre...</p>}
    </div>
  );
};

export default SpotifyTopGenre;
