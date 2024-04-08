/* eslint-disable @next/next/no-img-element */
// components/RecentlyPlayed.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const RecentlyPlayed: React.FC = () => {
  const { data: session } = useSession();
  const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10); // Number of tracks to fetch
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
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
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.accessToken) {
      fetchRecentlyPlayed();
    }
  }, [session, limit]);

  const getTimeAgo = (timestamp: string): string => {
    const currentTime = new Date();
    const playedTime = new Date(timestamp);
    const difference = Math.floor(
      (currentTime.getTime() - playedTime.getTime()) / 60000
    ); // Convert milliseconds to minutes

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

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <ul className="">
        {recentlyPlayed.map((track: any, index: number) => (
          <li
            key={index}
            className="flex mb-3 bg-primary rounded-lg overflow-hidden"
          >
            <img
              className="p-2 rounded-xl"
              src={track.track.album.images[0].url}
              alt={track.track.name}
              style={{ width: "100px", height: "100px" }}
            />
            <div className="p-3 grid items-center justify-center">
              <div className="grid">
                <h3 className="whitespace-nowrap overflow-hidden block text-ellipsis">
                  {track.track.name} by{" "}
                  <span className="font-bold">
                    {track.track.artists[0].name}
                  </span>
                </h3>
                <div>
                  <p>Played {getTimeAgo(track.played_at)}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="flex justify-center">
          {limit < 50 && (
            <button className="btn btn-primary w-full lg:w-fit" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentlyPlayed;
