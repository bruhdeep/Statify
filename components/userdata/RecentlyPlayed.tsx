/* eslint-disable @next/next/no-img-element */
// components/RecentlyPlayed.tsx

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const RecentlyPlayed: React.FC = () => {
  const { data: session } = useSession();
  const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/recently-played?limit=10",
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch recently played tracks");
        }

        const data = await response.json();
        if (data && data.items) {
          setRecentlyPlayed(data.items);
        }
      } catch (error) {
        setError("Error fetching recently played tracks");
        console.error(error);
      }
    };

    if (session?.accessToken) {
      fetchRecentlyPlayed();
    }
  }, [session]);

  const getTimeAgo = (timestamp: string): string => {
    const currentTime = new Date();
    const playedTime = new Date(timestamp);
    const difference = Math.floor((currentTime.getTime() - playedTime.getTime()) / 60000); // Convert milliseconds to minutes

    if (difference < 1) {
      return "Just now";
    } else if (difference === 1) {
      return "1 minute ago";
    } else if (difference < 60) {
      return `${difference} minutes ago`;
    } else {
      return "More than an hour ago";
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-5">
      <h2>Recently Played Tracks</h2>
      <br />
      <ul className="">
        {recentlyPlayed.map((track: any, index: number) => (
          <li key={index} className="flex my-3 bg-primary rounded-lg overflow-hidden">
            <img
              src={track.track.album.images[0].url}
              alt={track.track.name}
              style={{ width: "100px", height: "100px" }}
            />
            <div className="p-3">
              <p>
                {track.track.name} by{" "}
                {track.track.artists.map(
                  (artist: any) => artist.name
                ).join(", ")}
              </p>
              <p>Played {getTimeAgo(track.played_at)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyPlayed;
